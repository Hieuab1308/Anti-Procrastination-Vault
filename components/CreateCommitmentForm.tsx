"use client"

/**
 * ============================================================================
 * CREATE COMMITMENT FORM
 * ============================================================================
 * 
 * Form to create a new anti-procrastination commitment
 * 
 * ============================================================================
 */

import { useState, useEffect } from "react"
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

    // Set default deadline to 1 hour from now on first render
    useEffect(() => {
        const oneHourLater = new Date(Date.now() + 60 * 60 * 1000)
        setDeadlineDate(oneHourLater.toISOString().split("T")[0])
        setDeadlineTime(oneHourLater.toTimeString().slice(0, 5))
    }, [])

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
            setFormError("Please enter a valid IOTA amount")
            return
        }

        if (!isValidAddress(arbiter)) {
            setFormError("Invalid arbiter address. IOTA address must start with 0x and have 64 hex characters (66 total)")
            return
        }

        if (!description.trim()) {
            setFormError("Please enter a commitment description")
            return
        }

        if (!deadlineDate || !deadlineTime) {
            setFormError("Please select a deadline")
            return
        }

        const deadlineTimestamp = new Date(`${deadlineDate}T${deadlineTime}`).getTime()
        if (deadlineTimestamp <= Date.now()) {
            setFormError("Deadline must be in the future")
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
                    🔒 Create New Commitment
                </Text>

                {/* Stake Amount */}
                <div>
                    <Text size="2" weight="medium" style={{ marginBottom: "0.25rem", display: "block" }}>
                        💰 IOTA Stake Amount
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
                        This amount will be lost if you don't complete your commitment
                    </Text>
                </div>

                {/* Description */}
                <div>
                    <Text size="2" weight="medium" style={{ marginBottom: "0.25rem", display: "block" }}>
                        📝 Commitment Description
                    </Text>
                    <TextArea
                        placeholder="E.g.: I will finish my Math homework Chapter 5 before 10 PM tonight"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        style={{ minHeight: "80px" }}
                    />
                </div>

                {/* Arbiter Address */}
                <div>
                    <Text size="2" weight="medium" style={{ marginBottom: "0.25rem", display: "block" }}>
                        👨‍⚖️ Arbiter Address
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
                            Use my address
                        </Button>
                    </Flex>
                    <Text size="1" color="gray" style={{ marginTop: "0.25rem" }}>
                        This person will verify if you completed your task.
                        <strong> For testing:</strong> use your own address as arbiter.
                    </Text>
                </div>

                {/* Penalty Recipient */}
                <div>
                    <Text size="2" weight="medium" style={{ marginBottom: "0.25rem", display: "block" }}>
                        🔥 Penalty Recipient Address (optional)
                    </Text>
                    <TextField.Root
                        type="text"
                        placeholder="Leave empty = Burn address"
                        value={penaltyRecipient}
                        onChange={(e) => setPenaltyRecipient(e.target.value)}
                    />
                    <Text size="1" color="gray" style={{ marginTop: "0.25rem" }}>
                        Funds will be sent here if you fail (can be a charity address)
                    </Text>
                </div>

                {/* Deadline */}
                <div>
                    <Text size="2" weight="medium" style={{ marginBottom: "0.25rem", display: "block" }}>
                        ⏰ Deadline
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
                            <span style={{ marginLeft: "8px" }}>Creating...</span>
                        </>
                    ) : (
                        "🚀 Create Commitment"
                    )}
                </Button>
            </Flex>
        </form>
    )
}
