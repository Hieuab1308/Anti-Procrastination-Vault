"use client"

/**
 * ============================================================================
 * ANTI-PROCRASTINATION VAULT - MAIN INTEGRATION
 * ============================================================================
 * 
 * Main component for the Anti-Procrastination Vault application
 * 
 * Features:
 * - Create new commitments with IOTA stake
 * - View commitment details
 * - Arbiter can confirm completion/failure
 * - Claim funds after expiration
 * 
 * ============================================================================
 */

import { useCurrentAccount } from "@iota/dapp-kit"
import { useAntiProcrastination } from "@/hooks/useAntiProcrastination"
import { Button, Container, Flex, Heading, Text, Card, Separator } from "@radix-ui/themes"
import ClipLoader from "react-spinners/ClipLoader"

import { CreateCommitmentForm } from "@/components/CreateCommitmentForm"
import { CommitmentCard } from "@/components/CommitmentCard"
import { ActionButtons } from "@/components/ActionButtons"
import { LoadCommitmentForm } from "@/components/LoadCommitmentForm"

const AntiProcrastinationVault = () => {
    const currentAccount = useCurrentAccount()
    const {
        data,
        actions,
        state,
        commitmentId,
        isOwner,
        isArbiter,
        address,
    } = useAntiProcrastination()

    const isConnected = !!currentAccount

    // ============================================================================
    // NOT CONNECTED
    // ============================================================================

    if (!isConnected) {
        return (
            <div style={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "1rem",
                background: "linear-gradient(135deg, var(--gray-a2) 0%, var(--blue-a2) 100%)",
            }}>
                <Card style={{ maxWidth: "500px", width: "100%", padding: "2rem" }}>
                    <Flex direction="column" align="center" gap="4">
                        <Text size="8">🔒</Text>
                        <Heading size="6" align="center">
                            Anti-Procrastination Vault
                        </Heading>
                        <Text size="3" color="gray" align="center">
                            Beat procrastination with IOTA
                        </Text>
                        <Separator size="4" />
                        <Text align="center" color="gray">
                            Connect your IOTA wallet to start creating commitments and force yourself to get things done!
                        </Text>
                    </Flex>
                </Card>
            </div>
        )
    }

    // ============================================================================
    // MAIN VIEW
    // ============================================================================

    return (
        <div style={{
            minHeight: "100vh",
            padding: "1rem",
            background: "linear-gradient(135deg, var(--gray-a2) 0%, var(--blue-a2) 100%)",
        }}>
            <Container style={{ maxWidth: "800px", margin: "0 auto" }}>
                {/* Header */}
                <Flex direction="column" align="center" gap="2" style={{ marginBottom: "2rem" }}>
                    <Text size="8">🔒</Text>
                    <Heading size="7" align="center">
                        Anti-Procrastination Vault
                    </Heading>
                    <Text size="3" color="gray" align="center">
                        Use loss aversion to force yourself to work
                    </Text>
                </Flex>

                {/* No Commitment Loaded */}
                {!commitmentId ? (
                    <Flex direction="column" gap="4">
                        {/* Create Form */}
                        <Card style={{ padding: "1.5rem" }}>
                            <CreateCommitmentForm
                                onSubmit={actions.createCommitment}
                                isPending={state.isPending}
                                error={state.error}
                            />
                        </Card>

                        {/* Load Existing */}
                        <Card style={{ padding: "1.5rem" }}>
                            <LoadCommitmentForm onLoad={actions.loadCommitment} />
                        </Card>

                        {/* How it works */}
                        <Card style={{ padding: "1.5rem", background: "var(--blue-a2)" }}>
                            <Heading size="4" style={{ marginBottom: "1rem" }}>
                                📖 How It Works
                            </Heading>
                            <Flex direction="column" gap="3">
                                <Flex gap="3" align="start">
                                    <Text size="4">1️⃣</Text>
                                    <Text>
                                        <strong>Create commitment:</strong> Stake IOTA with a task description and deadline.
                                    </Text>
                                </Flex>
                                <Flex gap="3" align="start">
                                    <Text size="4">2️⃣</Text>
                                    <Text>
                                        <strong>Set arbiter:</strong> Choose a friend/teacher's wallet address as the verifier.
                                    </Text>
                                </Flex>
                                <Flex gap="3" align="start">
                                    <Text size="4">3️⃣</Text>
                                    <Text>
                                        <strong>Complete task:</strong> Do the work and notify your arbiter when done.
                                    </Text>
                                </Flex>
                                <Flex gap="3" align="start">
                                    <Text size="4">✅</Text>
                                    <Text>
                                        <strong>Success:</strong> Arbiter confirms → Get your money back!
                                    </Text>
                                </Flex>
                                <Flex gap="3" align="start">
                                    <Text size="4">❌</Text>
                                    <Text>
                                        <strong>Failure:</strong> Incomplete or expired → Lose your money!
                                    </Text>
                                </Flex>
                            </Flex>
                        </Card>
                    </Flex>
                ) : (
                    /* Commitment Loaded */
                    <Flex direction="column" gap="4">
                        {/* Loading */}
                        {state.isLoading && !data && (
                            <Card style={{ padding: "2rem" }}>
                                <Flex justify="center" align="center" gap="3">
                                    <ClipLoader size={24} />
                                    <Text>Loading commitment...</Text>
                                </Flex>
                            </Card>
                        )}

                        {/* Error */}
                        {state.error && !data && (
                            <Card style={{ padding: "1.5rem", background: "var(--red-a3)" }}>
                                <Flex direction="column" gap="3">
                                    <Text style={{ color: "var(--red-11)" }}>
                                        ❌ Error: {state.error.message || "Unable to load commitment"}
                                    </Text>
                                    <Text size="2" color="gray">
                                        ID: {commitmentId}
                                    </Text>
                                    <Button
                                        variant="soft"
                                        onClick={actions.clearCommitment}
                                    >
                                        ← Go Back
                                    </Button>
                                </Flex>
                            </Card>
                        )}

                        {/* Commitment Data */}
                        {data && (
                            <>
                                {/* Back Button */}
                                <Button
                                    variant="ghost"
                                    onClick={actions.clearCommitment}
                                    style={{ alignSelf: "flex-start" }}
                                >
                                    ← Create new commitment
                                </Button>

                                {/* Commitment Card */}
                                <CommitmentCard
                                    commitment={data}
                                    isOwner={isOwner}
                                    isArbiter={isArbiter}
                                    currentAddress={address}
                                />

                                {/* Action Buttons */}
                                <ActionButtons
                                    commitment={data}
                                    isArbiter={isArbiter}
                                    isOwner={isOwner}
                                    isPending={state.isPending}
                                    onConfirmCompleted={() => actions.confirmCompleted(commitmentId)}
                                    onConfirmFailed={() => actions.confirmFailed(commitmentId)}
                                    onClaimExpired={() => actions.claimExpired(commitmentId)}
                                />

                                {/* Transaction Hash */}
                                {state.hash && (
                                    <Card style={{ padding: "1rem", background: "var(--green-a2)" }}>
                                        <Text size="2" color="green">
                                            ✅ Transaction successful!
                                        </Text>
                                        <Text size="1" style={{
                                            fontFamily: "monospace",
                                            display: "block",
                                            marginTop: "0.5rem",
                                            wordBreak: "break-all"
                                        }}>
                                            Hash: {state.hash}
                                        </Text>
                                    </Card>
                                )}
                            </>
                        )}
                    </Flex>
                )}

                {/* Footer */}
                <Flex justify="center" style={{ marginTop: "3rem", paddingBottom: "2rem" }}>
                    <Text size="1" color="gray" align="center">
                        💡 Tip: Stake enough to feel the fear of losing, but not so much it hurts your finances!
                    </Text>
                </Flex>
            </Container>
        </div>
    )
}

export default AntiProcrastinationVault
