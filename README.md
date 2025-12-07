# 🔒 Anti-Procrastination Vault (Cam Kết Chống Trì Hoãn)

**Đánh vào tâm lý sợ mất tiền để ép bản thân làm việc!**

Một ứng dụng dApp trên IOTA blockchain giúp bạn tạo cam kết hoàn thành công việc với stake IOTA. Nếu không hoàn thành đúng hạn, tiền sẽ bị mất!

## 🎯 Tính năng

- ✅ **Tạo cam kết** với stake IOTA (đặt cọc tiền)
- ✅ **Chỉ định trọng tài** (bạn bè, giáo viên) để xác nhận
- ✅ **Đặt deadline** cho công việc
- ✅ **Nhận lại tiền** khi hoàn thành đúng hạn
- ✅ **Mất tiền** nếu thất bại (chuyển đến burn address hoặc từ thiện)

## 📖 Cách hoạt động

1. **Tạo cam kết**: Gửi IOTA vào contract với mô tả nhiệm vụ
2. **Chọn trọng tài**: Đặt địa chỉ ví của người xác nhận
3. **Đặt deadline**: Chọn thời hạn hoàn thành
4. **Hoàn thành công việc**: Làm xong và báo trọng tài
5. **Kết quả**:
   - ✅ Trọng tài xác nhận "Đã xong" → Nhận lại tiền!
   - ❌ Không hoàn thành hoặc hết hạn → Mất tiền!

## 🚀 Quick Start

```bash
# Install dependencies
npm install --legacy-peer-deps

# Deploy smart contract lên IOTA devnet/testnet
npm run iota-deploy

# Start development server
npm run dev
```

## 📁 Project Structure

```
├── app/                    # Next.js app directory
├── components/
│   ├── AntiProcrastinationVault.tsx  # Main component
│   ├── CreateCommitmentForm.tsx      # Form tạo cam kết
│   ├── CommitmentCard.tsx            # Hiển thị chi tiết cam kết
│   ├── ActionButtons.tsx             # Nút hành động
│   └── LoadCommitmentForm.tsx        # Load cam kết có sẵn
├── hooks/
│   └── useAntiProcrastination.ts     # Hook tương tác contract
├── lib/
│   └── config.ts                     # Cấu hình network & package ID
└── contract/
    └── anti_procrastination/
        └── sources/
            └── anti_procrastination.move  # Smart contract
```

## 🔧 Smart Contract Functions

### `create_commitment`
Tạo cam kết mới với:
- `stake`: Số IOTA đặt cọc
- `arbiter`: Địa chỉ trọng tài
- `penalty_recipient`: Địa chỉ nhận tiền phạt
- `description`: Mô tả cam kết
- `deadline`: Thời hạn (timestamp ms)

### `confirm_completed`
Trọng tài xác nhận đã hoàn thành → Trả tiền cho owner

### `confirm_failed`
Trọng tài xác nhận thất bại → Chuyển tiền đến penalty_recipient

### `claim_expired`
Ai cũng có thể gọi sau deadline → Chuyển tiền đến penalty_recipient

## 💡 Tâm lý học hành vi

Dự án này sử dụng nguyên tắc **Loss Aversion** (sợ mất mát):
- Con người sợ mất tiền hơn là thích được tiền
- Khi đã đặt cọc, bạn sẽ có động lực mạnh mẽ hơn để hoàn thành
- Trọng tài tạo sức ép xã hội thêm

## 📚 Learn More

- [IOTA Documentation](https://wiki.iota.org/)
- [IOTA dApp Kit](https://github.com/iotaledger/dapp-kit)
- [Move Language](https://move-language.github.io/move/)

## 📄 License

MIT
