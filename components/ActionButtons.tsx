"use client"

/**
 * ============================================================================
 * ARBITER ACTIONS
 * ============================================================================
 * 
 * Các nút hành động cho trọng tài và sau khi hết hạn
 * 
 * ============================================================================
 */

import { Button, Flex, Text, Card } from "@radix-ui/themes"
import ClipLoader from "react-spinners/ClipLoader"
import {
    CommitmentData,
    COMMITMENT_STATUS,
    isCommitmentExpired,
} from "@/hooks/useAntiProcrastination"

interface ActionButtonsProps {
    commitment: CommitmentData
    isArbiter: boolean
    isOwner: boolean
    isPending: boolean
    onConfirmCompleted: () => Promise<void>
    onConfirmFailed: () => Promise<void>
    onClaimExpired: () => Promise<void>
}

export const ActionButtons = ({
    commitment,
    isArbiter,
    isOwner,
    isPending,
    onConfirmCompleted,
    onConfirmFailed,
    onClaimExpired,
}: ActionButtonsProps) => {
    const isExpired = isCommitmentExpired(commitment.deadline)
    const isPendingStatus = commitment.status === COMMITMENT_STATUS.PENDING

    // Không hiển thị nếu cam kết đã được xử lý
    if (!isPendingStatus) {
        return (
            <Card style={{ padding: "1rem", background: "var(--gray-a2)" }}>
                <Text size="3" color="gray" align="center" style={{ display: "block" }}>
                    {commitment.status === COMMITMENT_STATUS.COMPLETED
                        ? "✅ Cam kết này đã được xác nhận hoàn thành. Tiền đã được trả lại cho người tạo."
                        : "❌ Cam kết này đã thất bại. Tiền đã được chuyển đến địa chỉ phạt."}
                </Text>
            </Card>
        )
    }

    return (
        <Card style={{ padding: "1.5rem" }}>
            <Text size="4" weight="bold" style={{ marginBottom: "1rem", display: "block" }}>
                ⚡ Hành động
            </Text>

            {/* Arbiter Actions - Chưa hết hạn */}
            {isArbiter && !isExpired && (
                <Flex direction="column" gap="3">
                    <Text size="2" color="gray" style={{ marginBottom: "0.5rem" }}>
                        👨‍⚖️ Với tư cách Trọng tài, bạn có thể xác nhận cam kết:
                    </Text>

                    <Flex gap="3" wrap="wrap">
                        <Button
                            size="3"
                            color="green"
                            onClick={onConfirmCompleted}
                            disabled={isPending}
                            style={{ flex: "1 1 150px" }}
                        >
                            {isPending ? (
                                <ClipLoader size={16} color="white" />
                            ) : (
                                "✅ Đã hoàn thành"
                            )}
                        </Button>

                        <Button
                            size="3"
                            color="red"
                            onClick={onConfirmFailed}
                            disabled={isPending}
                            style={{ flex: "1 1 150px" }}
                        >
                            {isPending ? (
                                <ClipLoader size={16} color="white" />
                            ) : (
                                "❌ Chưa hoàn thành"
                            )}
                        </Button>
                    </Flex>

                    <Text size="1" color="gray" style={{ marginTop: "0.5rem" }}>
                        ⚠️ Hành động này không thể hoàn tác. Hãy cân nhắc kỹ trước khi xác nhận!
                    </Text>
                </Flex>
            )}

            {/* Arbiter Actions - Đã hết hạn */}
            {isArbiter && isExpired && (
                <Flex direction="column" gap="3">
                    <Text size="2" color="red" style={{ marginBottom: "0.5rem" }}>
                        ⏰ Cam kết đã hết hạn. Bạn vẫn có thể xác nhận thất bại:
                    </Text>

                    <Button
                        size="3"
                        color="red"
                        onClick={onConfirmFailed}
                        disabled={isPending}
                    >
                        {isPending ? (
                            <ClipLoader size={16} color="white" />
                        ) : (
                            "❌ Xác nhận thất bại"
                        )}
                    </Button>
                </Flex>
            )}

            {/* Claim Expired - Ai cũng có thể gọi sau deadline */}
            {isExpired && !isArbiter && (
                <Flex direction="column" gap="3">
                    <Text size="2" color="orange" style={{ marginBottom: "0.5rem" }}>
                        ⏰ Cam kết đã hết hạn và trọng tài chưa xác nhận.
                        {isOwner && " Tiền của bạn có thể bị claim bởi bất kỳ ai!"}
                    </Text>

                    <Button
                        size="3"
                        color="orange"
                        onClick={onClaimExpired}
                        disabled={isPending}
                    >
                        {isPending ? (
                            <ClipLoader size={16} color="white" />
                        ) : (
                            "⚡ Claim hết hạn"
                        )}
                    </Button>

                    <Text size="1" color="gray">
                        Tiền sẽ được chuyển đến địa chỉ phạt đã được đặt.
                    </Text>
                </Flex>
            )}

            {/* Owner waiting */}
            {isOwner && !isArbiter && !isExpired && (
                <Flex direction="column" gap="2">
                    <Text size="2" color="blue">
                        ⏳ Đang chờ trọng tài xác nhận cam kết của bạn.
                    </Text>
                    <Text size="2" color="gray">
                        Hãy đảm bảo bạn đã hoàn thành nhiệm vụ và liên hệ trọng tài để xác nhận!
                    </Text>
                </Flex>
            )}

            {/* Not owner, not arbiter, not expired */}
            {!isOwner && !isArbiter && !isExpired && (
                <Text size="2" color="gray">
                    👀 Bạn chỉ có thể xem cam kết này. Chỉ trọng tài mới có quyền xác nhận.
                </Text>
            )}
        </Card>
    )
}
