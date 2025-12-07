"use client"

/**
 * ============================================================================
 * CREATE COMMITMENT FORM
 * ============================================================================
 * 
 * Form để tạo cam kết chống trì hoãn mới
 * 
 * ============================================================================
 */

import { useState } from "react"
import { useCurrentAccount } from "@iota/dapp-kit"
import { Button, Flex, Text, TextField, TextArea } from "@radix-ui/themes"
import ClipLoader from "react-spinners/ClipLoader"
import { iotaToMist } from "@/hooks/useAntiProcrastination"

interface CreateCommitmentFormProps {
    onSubmit: (params: {
        stakeAmount: number
        arbiter: string
        penaltyRecipient: string
        description: string
        deadline: number
    }) => Promise<void>
    isPending: boolean
    error: Error | null
}

export const CreateCommitmentForm = ({
    onSubmit,
    isPending,
    error,
}: CreateCommitmentFormProps) => {
    const currentAccount = useCurrentAccount()
    const myAddress = currentAccount?.address || ""

    const [stakeIota, setStakeIota] = useState("0.1")
    const [arbiter, setArbiter] = useState("")
    const [penaltyRecipient, setPenaltyRecipient] = useState("")
    const [description, setDescription] = useState("")
    const [deadlineDate, setDeadlineDate] = useState("")
    const [deadlineTime, setDeadlineTime] = useState("")
    const [formError, setFormError] = useState<string | null>(null)

    // Set default penalty recipient to burn address
    const BURN_ADDRESS = "0x0000000000000000000000000000000000000000000000000000000000000000"

    // Validate IOTA address (0x + 64 hex characters = 66 total)
    const isValidAddress = (addr: string): boolean => {
        if (!addr) return false
        const hexRegex = /^0x[a-fA-F0-9]{64}$/
        return hexRegex.test(addr)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setFormError(null)

        // Validate
        if (!stakeIota || parseFloat(stakeIota) <= 0) {
            setFormError("Vui lòng nhập số IOTA hợp lệ")
            return
        }

        if (!isValidAddress(arbiter)) {
            setFormError("Địa chỉ trọng tài không hợp lệ. Địa chỉ IOTA phải bắt đầu bằng 0x và có 64 ký tự hex (tổng 66 ký tự)")
            return
        }

        if (!description.trim()) {
            setFormError("Vui lòng nhập mô tả cam kết")
            return
        }

        if (!deadlineDate || !deadlineTime) {
            setFormError("Vui lòng chọn thời hạn hoàn thành")
            return
        }

        const deadlineTimestamp = new Date(`${deadlineDate}T${deadlineTime}`).getTime()
        if (deadlineTimestamp <= Date.now()) {
            setFormError("Thời hạn phải trong tương lai")
            return
        }

        const finalPenaltyRecipient = penaltyRecipient.trim() || BURN_ADDRESS

        await onSubmit({
            stakeAmount: iotaToMist(parseFloat(stakeIota)),
            arbiter: arbiter.trim(),
            penaltyRecipient: finalPenaltyRecipient,
            description: description.trim(),
            deadline: deadlineTimestamp,
        })
    }

    // Set default deadline to today + 1 day
    const getMinDate = () => {
        const now = new Date()
        return now.toISOString().split("T")[0]
    }

    return (
        <form onSubmit={handleSubmit}>
            <Flex direction="column" gap="4">
                <Text size="5" weight="bold" style={{ marginBottom: "0.5rem" }}>
                    🔒 Tạo Cam Kết Mới
                </Text>

                {/* Stake Amount */}
                <div>
                    <Text size="2" weight="medium" style={{ marginBottom: "0.25rem", display: "block" }}>
                        💰 Số IOTA đặt cọc
                    </Text>
                    <TextField.Root
                        type="number"
                        step="0.01"
                        min="0.01"
                        placeholder="0.1"
                        value={stakeIota}
                        onChange={(e) => setStakeIota(e.target.value)}
                    />
                    <Text size="1" color="gray" style={{ marginTop: "0.25rem" }}>
                        Số tiền này sẽ bị mất nếu bạn không hoàn thành cam kết
                    </Text>
                </div>

                {/* Description */}
                <div>
                    <Text size="2" weight="medium" style={{ marginBottom: "0.25rem", display: "block" }}>
                        📝 Mô tả cam kết
                    </Text>
                    <TextArea
                        placeholder="Ví dụ: Tôi sẽ hoàn thành bài tập Toán chương 5 trước 10 giờ tối nay"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        style={{ minHeight: "80px" }}
                    />
                </div>

                {/* Arbiter Address */}
                <div>
                    <Text size="2" weight="medium" style={{ marginBottom: "0.25rem", display: "block" }}>
                        👨‍⚖️ Địa chỉ Trọng tài (Arbiter)
                    </Text>
                    <Flex gap="2" align="end">
                        <TextField.Root
                            type="text"
                            placeholder="0x..."
                            value={arbiter}
                            onChange={(e) => setArbiter(e.target.value)}
                            style={{ flex: 1 }}
                        />
                        <Button
                            type="button"
                            variant="soft"
                            size="2"
                            onClick={() => setArbiter(myAddress)}
                            disabled={!myAddress}
                        >
                            Dùng địa chỉ của tôi
                        </Button>
                    </Flex>
                    <Text size="1" color="gray" style={{ marginTop: "0.25rem" }}>
                        Người này sẽ xác nhận bạn đã hoàn thành hay chưa.
                        <strong> Để test:</strong> dùng địa chỉ của chính bạn làm trọng tài.
                    </Text>
                </div>

                {/* Penalty Recipient */}
                <div>
                    <Text size="2" weight="medium" style={{ marginBottom: "0.25rem", display: "block" }}>
                        🔥 Địa chỉ nhận tiền phạt (tùy chọn)
                    </Text>
                    <TextField.Root
                        type="text"
                        placeholder="Để trống = Burn address (đốt tiền)"
                        value={penaltyRecipient}
                        onChange={(e) => setPenaltyRecipient(e.target.value)}
                    />
                    <Text size="1" color="gray" style={{ marginTop: "0.25rem" }}>
                        Tiền sẽ được chuyển đến địa chỉ này nếu thất bại (có thể là tổ chức từ thiện)
                    </Text>
                </div>

                {/* Deadline */}
                <div>
                    <Text size="2" weight="medium" style={{ marginBottom: "0.25rem", display: "block" }}>
                        ⏰ Thời hạn hoàn thành
                    </Text>
                    <Flex gap="2">
                        <TextField.Root
                            type="date"
                            min={getMinDate()}
                            value={deadlineDate}
                            onChange={(e) => setDeadlineDate(e.target.value)}
                            style={{ flex: 1 }}
                        />
                        <TextField.Root
                            type="time"
                            value={deadlineTime}
                            onChange={(e) => setDeadlineTime(e.target.value)}
                            style={{ flex: 1 }}
                        />
                    </Flex>
                </div>

                {/* Error Messages */}
                {(formError || error) && (
                    <div style={{
                        padding: "0.75rem",
                        background: "var(--red-a3)",
                        borderRadius: "8px"
                    }}>
                        <Text style={{ color: "var(--red-11)" }}>
                            ❌ {formError || error?.message}
                        </Text>
                    </div>
                )}

                {/* Submit Button */}
                <Button
                    type="submit"
                    size="3"
                    disabled={isPending}
                    style={{ marginTop: "0.5rem" }}
                >
                    {isPending ? (
                        <>
                            <ClipLoader size={16} color="white" />
                            <span style={{ marginLeft: "8px" }}>Đang tạo...</span>
                        </>
                    ) : (
                        "🚀 Tạo Cam Kết"
                    )}
                </Button>
            </Flex>
        </form>
    )
}
