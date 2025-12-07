// Copyright (c) 2024 Anti-Procrastination Vault
// SPDX-License-Identifier: Apache-2.0

/// Anti-Procrastination Vault - Cam Kết Chống Trì Hoãn
/// 
/// Logic:
/// - Người dùng gửi IOTA vào contract với cam kết hoàn thành task trước deadline
/// - Đặt địa chỉ trọng tài (arbiter) để xác nhận
/// - Nếu trọng tài xác nhận "Đã xong" trước deadline → Trả lại tiền
/// - Nếu trọng tài xác nhận "Chưa xong" hoặc hết giờ → Tiền bị burn hoặc chuyển cho charity

module anti_procrastination::vault {
    use iota::coin::{Self, Coin};
    use iota::iota::IOTA;
    use iota::clock::{Self, Clock};
    use iota::event;

    // ============================================================================
    // ERROR CODES
    // ============================================================================
    const ENotArbiter: u64 = 0;
    const ENotOwner: u64 = 1;
    const EDeadlinePassed: u64 = 2;
    const EDeadlineNotPassed: u64 = 3;
    const EAlreadyResolved: u64 = 4;
    const EInvalidDeadline: u64 = 5;

    // ============================================================================
    // COMMITMENT STATUS
    // ============================================================================
    const STATUS_PENDING: u8 = 0;
    const STATUS_COMPLETED: u8 = 1;
    const STATUS_FAILED: u8 = 2;

    // ============================================================================
    // STRUCTS
    // ============================================================================

    /// Commitment - Cam kết chống trì hoãn
    public struct Commitment has key, store {
        id: UID,
        /// Người tạo cam kết
        owner: address,
        /// Trọng tài xác nhận (bạn bè, giáo viên, etc.)
        arbiter: address,
        /// Địa chỉ nhận tiền khi thất bại (charity hoặc burn address)
        penalty_recipient: address,
        /// Mô tả cam kết
        description: vector<u8>,
        /// Deadline (timestamp in milliseconds)
        deadline: u64,
        /// Số tiền đặt cọc (IOTA)
        stake: Coin<IOTA>,
        /// Trạng thái: 0 = pending, 1 = completed, 2 = failed
        status: u8,
        /// Thời gian tạo
        created_at: u64,
    }

    // ============================================================================
    // EVENTS
    // ============================================================================

    /// Event khi tạo cam kết mới
    public struct CommitmentCreated has copy, drop {
        commitment_id: address,
        owner: address,
        arbiter: address,
        stake_amount: u64,
        deadline: u64,
    }

    /// Event khi cam kết được xác nhận hoàn thành
    public struct CommitmentCompleted has copy, drop {
        commitment_id: address,
        owner: address,
        stake_returned: u64,
    }

    /// Event khi cam kết thất bại
    public struct CommitmentFailed has copy, drop {
        commitment_id: address,
        owner: address,
        penalty_recipient: address,
        penalty_amount: u64,
    }

    // ============================================================================
    // ENTRY FUNCTIONS
    // ============================================================================

    /// Tạo cam kết mới
    /// - stake: Số IOTA đặt cọc
    /// - arbiter: Địa chỉ trọng tài
    /// - penalty_recipient: Địa chỉ nhận tiền phạt (charity hoặc burn)
    /// - description: Mô tả cam kết
    /// - deadline: Thời hạn hoàn thành (timestamp ms)
    public fun create_commitment(
        stake: Coin<IOTA>,
        arbiter: address,
        penalty_recipient: address,
        description: vector<u8>,
        deadline: u64,
        clock: &Clock,
        ctx: &mut TxContext
    ) {
        let current_time = clock::timestamp_ms(clock);
        
        // Deadline phải trong tương lai
        assert!(deadline > current_time, EInvalidDeadline);
        
        let stake_amount = coin::value(&stake);
        let commitment_uid = object::new(ctx);
        let commitment_id = object::uid_to_address(&commitment_uid);
        
        let commitment = Commitment {
            id: commitment_uid,
            owner: ctx.sender(),
            arbiter,
            penalty_recipient,
            description,
            deadline,
            stake,
            status: STATUS_PENDING,
            created_at: current_time,
        };

        // Emit event
        event::emit(CommitmentCreated {
            commitment_id,
            owner: ctx.sender(),
            arbiter,
            stake_amount,
            deadline,
        });

        // Share object để trọng tài có thể tương tác
        transfer::share_object(commitment);
    }

    /// Trọng tài xác nhận HOÀN THÀNH - Trả lại tiền cho owner
    public fun confirm_completed(
        commitment: &mut Commitment,
        clock: &Clock,
        ctx: &mut TxContext
    ) {
        // Chỉ trọng tài mới được xác nhận
        assert!(commitment.arbiter == ctx.sender(), ENotArbiter);
        // Chưa được resolve
        assert!(commitment.status == STATUS_PENDING, EAlreadyResolved);
        // Phải trước deadline
        let current_time = clock::timestamp_ms(clock);
        assert!(current_time <= commitment.deadline, EDeadlinePassed);

        commitment.status = STATUS_COMPLETED;
        
        // Trả lại tiền cho owner
        let stake_amount = coin::value(&commitment.stake);
        let returned_stake = coin::split(&mut commitment.stake, stake_amount, ctx);
        
        event::emit(CommitmentCompleted {
            commitment_id: object::uid_to_address(&commitment.id),
            owner: commitment.owner,
            stake_returned: stake_amount,
        });

        transfer::public_transfer(returned_stake, commitment.owner);
    }

    /// Trọng tài xác nhận THẤT BẠI - Chuyển tiền đến penalty_recipient
    public fun confirm_failed(
        commitment: &mut Commitment,
        ctx: &mut TxContext
    ) {
        // Chỉ trọng tài mới được xác nhận
        assert!(commitment.arbiter == ctx.sender(), ENotArbiter);
        // Chưa được resolve
        assert!(commitment.status == STATUS_PENDING, EAlreadyResolved);

        commitment.status = STATUS_FAILED;
        
        // Chuyển tiền phạt đến penalty_recipient
        let penalty_amount = coin::value(&commitment.stake);
        let penalty = coin::split(&mut commitment.stake, penalty_amount, ctx);
        
        event::emit(CommitmentFailed {
            commitment_id: object::uid_to_address(&commitment.id),
            owner: commitment.owner,
            penalty_recipient: commitment.penalty_recipient,
            penalty_amount,
        });

        transfer::public_transfer(penalty, commitment.penalty_recipient);
    }

    /// Claim sau khi hết hạn (nếu trọng tài không xác nhận) - Tiền bị chuyển đi
    /// Ai cũng có thể gọi hàm này sau deadline
    public fun claim_expired(
        commitment: &mut Commitment,
        clock: &Clock,
        ctx: &mut TxContext
    ) {
        // Chưa được resolve
        assert!(commitment.status == STATUS_PENDING, EAlreadyResolved);
        // Phải sau deadline
        let current_time = clock::timestamp_ms(clock);
        assert!(current_time > commitment.deadline, EDeadlineNotPassed);

        commitment.status = STATUS_FAILED;
        
        // Chuyển tiền đến penalty_recipient
        let penalty_amount = coin::value(&commitment.stake);
        let penalty = coin::split(&mut commitment.stake, penalty_amount, ctx);
        
        event::emit(CommitmentFailed {
            commitment_id: object::uid_to_address(&commitment.id),
            owner: commitment.owner,
            penalty_recipient: commitment.penalty_recipient,
            penalty_amount,
        });

        transfer::public_transfer(penalty, commitment.penalty_recipient);
    }

    // ============================================================================
    // VIEW FUNCTIONS (Read-only)
    // ============================================================================

    /// Lấy thông tin owner
    public fun get_owner(commitment: &Commitment): address {
        commitment.owner
    }

    /// Lấy thông tin arbiter
    public fun get_arbiter(commitment: &Commitment): address {
        commitment.arbiter
    }

    /// Lấy penalty_recipient
    public fun get_penalty_recipient(commitment: &Commitment): address {
        commitment.penalty_recipient
    }

    /// Lấy mô tả
    public fun get_description(commitment: &Commitment): &vector<u8> {
        &commitment.description
    }

    /// Lấy deadline
    public fun get_deadline(commitment: &Commitment): u64 {
        commitment.deadline
    }

    /// Lấy số tiền stake
    public fun get_stake_amount(commitment: &Commitment): u64 {
        coin::value(&commitment.stake)
    }

    /// Lấy status
    public fun get_status(commitment: &Commitment): u8 {
        commitment.status
    }

    /// Lấy thời gian tạo
    public fun get_created_at(commitment: &Commitment): u64 {
        commitment.created_at
    }

    /// Kiểm tra đã hết hạn chưa
    public fun is_expired(commitment: &Commitment, clock: &Clock): bool {
        clock::timestamp_ms(clock) > commitment.deadline
    }

    /// Kiểm tra còn pending không
    public fun is_pending(commitment: &Commitment): bool {
        commitment.status == STATUS_PENDING
    }
}

