"use client"

/**
 * ============================================================================
 * COMMITMENT CARD
 * ============================================================================
 * 
 * Display detailed information of a commitment
 * 
 * ============================================================================
 */

import { useEffect, useState } from "react"
import { Box, Card, Flex, Text, Badge, Separator } from "@radix-ui/themes"
import {
    CommitmentData,
    COMMITMENT_STATUS,
    formatIota,
    isCommitmentExpired,
    formatTimeRemaining,
} from "@/hooks/useAntiProcrastination"

interface CommitmentCardProps {
    commitment: CommitmentData
    isOwner: boolean
    isArbiter: boolean
    currentAddress?: string
}

export const CommitmentCard = ({
    commitment,
    isOwner,
    isArbiter,
}: CommitmentCardProps) => {
    const [timeRemaining, setTimeRemaining] = useState<string>("")
    const [isExpired, setIsExpired] = useState(false)

    // Update countdown timer
    useEffect(() => {
        const updateTimer = () => {
            setTimeRemaining(formatTimeRemaining(commitment.deadline))
            setIsExpired(isCommitmentExpired(commitment.deadline))
        }

        updateTimer()
        const interval = setInterval(updateTimer, 1000 * 60) // Update every minute
        return () => clearInterval(interval)
    }, [commitment.deadline])

    const getStatusBadge = () => {
        switch (commitment.status) {
            case COMMITMENT_STATUS.PENDING:
                return <Badge color="yellow" size="2">⏳ Pending</Badge>
            case COMMITMENT_STATUS.COMPLETED:
                return <Badge color="green" size="2">✅ Completed</Badge>
            case COMMITMENT_STATUS.FAILED:
                return <Badge color="red" size="2">❌ Failed</Badge>
            default:
                return <Badge color="gray" size="2">Unknown</Badge>
        }
    }

    const shortenAddress = (addr: string) => {
        if (addr.length <= 16) return addr
        return `${addr.slice(0, 8)}...${addr.slice(-6)}`
    }

    const formatDate = (timestamp: number) => {
        return new Date(timestamp).toLocaleString("en-US", {
            dateStyle: "medium",
            timeStyle: "short",
        })
    }

    return (
        <Card style={{ padding: "1.5rem" }}>
            {/* Header */}
            <Flex justify="between" align="center" style={{ marginBottom: "1rem" }}>
                <Text size="5" weight="bold">📋 Commitment Details</Text>
                {getStatusBadge()}
            </Flex>

            <Separator size="4" style={{ marginBottom: "1rem" }} />

            {/* Description */}
            <Box style={{ marginBottom: "1rem" }}>
                <Text size="2" color="gray" style={{ display: "block", marginBottom: "0.25rem" }}>
                    Description:
                </Text>
                <Text size="3" weight="medium" style={{
                    display: "block",
                    padding: "0.75rem",
                    background: "var(--gray-a3)",
                    borderRadius: "8px",
                    whiteSpace: "pre-wrap",
                }}>
                    "{commitment.description}"
                </Text>
            </Box>

            {/* Stake Amount */}
            <Flex gap="4" wrap="wrap" style={{ marginBottom: "1rem" }}>
                <Box style={{ flex: "1 1 200px" }}>
                    <Text size="2" color="gray" style={{ display: "block", marginBottom: "0.25rem" }}>
                        💰 Stake Amount:
                    </Text>
                    <Text size="4" weight="bold" color="blue">
                        {formatIota(commitment.stakeAmount)}
                    </Text>
                </Box>

                <Box style={{ flex: "1 1 200px" }}>
                    <Text size="2" color="gray" style={{ display: "block", marginBottom: "0.25rem" }}>
                        ⏰ Deadline:
                    </Text>
                    <Text size="3" weight="medium">
                        {formatDate(commitment.deadline)}
                    </Text>
                    {commitment.status === COMMITMENT_STATUS.PENDING && (
                        <Text
                            size="2"
                            color={isExpired ? "red" : "green"}
                            style={{ display: "block", marginTop: "0.25rem" }}
                        >
                            {isExpired ? "🔴 " : "🟢 "}{timeRemaining}
                        </Text>
                    )}
                </Box>
            </Flex>

            <Separator size="4" style={{ marginBottom: "1rem" }} />

            {/* Addresses */}
            <Flex direction="column" gap="2">
                <Flex align="center" gap="2">
                    <Text size="2" color="gray" style={{ width: "120px" }}>👤 Owner:</Text>
                    <Text size="2" style={{ fontFamily: "monospace" }}>
                        {shortenAddress(commitment.owner)}
                    </Text>
                    {isOwner && <Badge color="blue" size="1">You</Badge>}
                </Flex>

                <Flex align="center" gap="2">
                    <Text size="2" color="gray" style={{ width: "120px" }}>👨‍⚖️ Arbiter:</Text>
                    <Text size="2" style={{ fontFamily: "monospace" }}>
                        {shortenAddress(commitment.arbiter)}
                    </Text>
                    {isArbiter && <Badge color="purple" size="1">You</Badge>}
                </Flex>

                <Flex align="center" gap="2">
                    <Text size="2" color="gray" style={{ width: "120px" }}>🔥 Penalty To:</Text>
                    <Text size="2" style={{ fontFamily: "monospace" }}>
                        {commitment.penaltyRecipient === "0x0000000000000000000000000000000000000000000000000000000000000000"
                            ? "Burn Address"
                            : shortenAddress(commitment.penaltyRecipient)}
                    </Text>
                </Flex>
            </Flex>

            <Separator size="4" style={{ margin: "1rem 0" }} />

            {/* Role Information */}
            {commitment.status === COMMITMENT_STATUS.PENDING && (
                <Box style={{
                    padding: "0.75rem",
                    background: isArbiter ? "var(--purple-a3)" : "var(--blue-a3)",
                    borderRadius: "8px",
                }}>
                    {isArbiter ? (
                        <Text size="2" color="purple">
                            🎯 <strong>You are the Arbiter!</strong> You can confirm whether this commitment is completed or failed.
                        </Text>
                    ) : isOwner ? (
                        <Text size="2" color="blue">
                            📌 <strong>This is your commitment.</strong> Complete it before the deadline to get your money back!
                        </Text>
                    ) : (
                        <Text size="2" color="gray">
                            👀 You are viewing someone else's commitment.
                        </Text>
                    )}
                </Box>
            )}

            {/* Commitment ID */}
            <Box style={{ marginTop: "1rem" }}>
                <Text size="1" color="gray">
                    ID: {commitment.id}
                </Text>
            </Box>
        </Card>
    )
}
