"use client"

/**
 * ============================================================================
 * ARBITER ACTIONS
 * ============================================================================
 * 
 * Action buttons for arbiter and expired commitments
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

    // Don't show if commitment is already resolved
    if (!isPendingStatus) {
        return (
            <Card style={{ padding: "1rem", background: "var(--gray-a2)" }}>
                <Text size="3" color="gray" align="center" style={{ display: "block" }}>
                    {commitment.status === COMMITMENT_STATUS.COMPLETED
                        ? "✅ This commitment has been confirmed as completed. Funds have been returned to the owner."
                        : "❌ This commitment has failed. Funds have been sent to the penalty address."}
                </Text>
            </Card>
        )
    }

    return (
        <Card style={{ padding: "1.5rem" }}>
            <Text size="4" weight="bold" style={{ marginBottom: "1rem", display: "block" }}>
                ⚡ Actions
            </Text>

            {/* Arbiter Actions - Not expired */}
            {isArbiter && !isExpired && (
                <Flex direction="column" gap="3">
                    <Text size="2" color="gray" style={{ marginBottom: "0.5rem" }}>
                        👨‍⚖️ As the Arbiter, you can verify this commitment:
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
                                "✅ Mark Completed"
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
                                "❌ Mark Failed"
                            )}
                        </Button>
                    </Flex>

                    <Text size="1" color="gray" style={{ marginTop: "0.5rem" }}>
                        ⚠️ This action cannot be undone. Please verify carefully before confirming!
                    </Text>
                </Flex>
            )}

            {/* Arbiter Actions - Expired */}
            {isArbiter && isExpired && (
                <Flex direction="column" gap="3">
                    <Text size="2" color="red" style={{ marginBottom: "0.5rem" }}>
                        ⏰ Commitment has expired. You can still confirm failure:
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
                            "❌ Confirm Failed"
                        )}
                    </Button>
                </Flex>
            )}

            {/* Claim Expired - Anyone can call after deadline */}
            {isExpired && !isArbiter && (
                <Flex direction="column" gap="3">
                    <Text size="2" color="orange" style={{ marginBottom: "0.5rem" }}>
                        ⏰ Commitment has expired and arbiter hasn't verified yet.
                        {isOwner && " Your funds can be claimed by anyone!"}
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
                            "⚡ Claim Expired"
                        )}
                    </Button>

                    <Text size="1" color="gray">
                        Funds will be sent to the penalty address.
                    </Text>
                </Flex>
            )}

            {/* Owner waiting */}
            {isOwner && !isArbiter && !isExpired && (
                <Flex direction="column" gap="2">
                    <Text size="2" color="blue">
                        ⏳ Waiting for arbiter to verify your commitment.
                    </Text>
                    <Text size="2" color="gray">
                        Make sure you've completed your task and contact your arbiter to verify!
                    </Text>
                </Flex>
            )}

            {/* Not owner, not arbiter, not expired */}
            {!isOwner && !isArbiter && !isExpired && (
                <Text size="2" color="gray">
                    👀 You can only view this commitment. Only the arbiter can verify it.
                </Text>
            )}
        </Card>
    )
}
