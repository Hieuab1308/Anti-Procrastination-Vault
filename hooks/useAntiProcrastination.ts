"use client"

/**
 * ============================================================================
 * ANTI-PROCRASTINATION VAULT HOOK
 * ============================================================================
 * 
 * Hook để tương tác với smart contract Anti-Procrastination Vault
 * 
 * Chức năng:
 * - Tạo cam kết mới với IOTA stake
 * - Trọng tài xác nhận hoàn thành/thất bại
 * - Claim tiền sau khi hết hạn
 * 
 * ============================================================================
 */

import { useState, useEffect, useCallback } from "react"
import {
    useCurrentAccount,
    useIotaClient,
    useSignAndExecuteTransaction,
    useIotaClientQuery,
} from "@iota/dapp-kit"
import { Transaction } from "@iota/iota-sdk/transactions"
import { useNetworkVariable } from "@/lib/config"
import type { IotaObjectData } from "@iota/iota-sdk/client"

// ============================================================================
// CONTRACT CONFIGURATION
// ============================================================================

export const CONTRACT_MODULE = "vault"
export const CONTRACT_METHODS = {
    CREATE_COMMITMENT: "create_commitment",
    CONFIRM_COMPLETED: "confirm_completed",
    CONFIRM_FAILED: "confirm_failed",
    CLAIM_EXPIRED: "claim_expired",
} as const

// Clock object ID trên IOTA (shared object)
export const CLOCK_OBJECT_ID = "0x6"

// ============================================================================
// STATUS CONSTANTS
// ============================================================================

export const COMMITMENT_STATUS = {
    PENDING: 0,
    COMPLETED: 1,
    FAILED: 2,
} as const

export type CommitmentStatus = number

// ============================================================================
// TYPES
// ============================================================================

export interface CommitmentData {
    id: string
    owner: string
    arbiter: string
    penaltyRecipient: string
    description: string
    deadline: number // timestamp in ms
    stakeAmount: number // in MIST (1 IOTA = 1,000,000,000 MIST)
    status: CommitmentStatus
    createdAt: number
}

export interface CommitmentState {
    isLoading: boolean
    isPending: boolean
    isConfirming: boolean
    isConfirmed: boolean
    hash: string | undefined
    error: Error | null
}

export interface CommitmentActions {
    createCommitment: (params: CreateCommitmentParams) => Promise<void>
    confirmCompleted: (commitmentId: string) => Promise<void>
    confirmFailed: (commitmentId: string) => Promise<void>
    claimExpired: (commitmentId: string) => Promise<void>
    loadCommitment: (commitmentId: string) => void
    clearCommitment: () => void
}

export interface CreateCommitmentParams {
    stakeAmount: number // in MIST
    arbiter: string
    penaltyRecipient: string
    description: string
    deadline: number // timestamp in ms
}

// ============================================================================
// DATA EXTRACTION
// ============================================================================

function extractCommitmentData(data: IotaObjectData): CommitmentData | null {
    if (data.content?.dataType !== "moveObject") {
        console.log("Data is not a moveObject:", data.content?.dataType)
        return null
    }

    const fields = data.content.fields as any
    if (!fields) {
        console.log("No fields found in object data")
        return null
    }

    console.log("Commitment fields:", JSON.stringify(fields, null, 2))

    try {
        // Extract stake amount from nested Coin object
        let stakeAmount = 0
        if (fields.stake && fields.stake.fields && fields.stake.fields.balance) {
            stakeAmount = parseInt(fields.stake.fields.balance, 10) || 0
        }

        // Decode description from bytes
        let description = ""
        if (fields.description && Array.isArray(fields.description)) {
            description = new TextDecoder().decode(new Uint8Array(fields.description))
        } else if (typeof fields.description === "string") {
            description = fields.description
        }

        return {
            id: fields.id?.id || data.objectId || "",
            owner: String(fields.owner || ""),
            arbiter: String(fields.arbiter || ""),
            penaltyRecipient: String(fields.penalty_recipient || ""),
            description,
            deadline: parseInt(fields.deadline, 10) || 0,
            stakeAmount,
            status: (parseInt(fields.status, 10) || 0) as CommitmentStatus,
            createdAt: parseInt(fields.created_at, 10) || 0,
        }
    } catch (error) {
        console.error("Error extracting commitment data:", error)
        return null
    }
}

// ============================================================================
// MAIN HOOK
// ============================================================================

export const useAntiProcrastination = () => {
    const currentAccount = useCurrentAccount()
    const address = currentAccount?.address
    const packageId = useNetworkVariable("packageId")
    const iotaClient = useIotaClient()
    const { mutate: signAndExecute, isPending } = useSignAndExecuteTransaction()

    const [commitmentId, setCommitmentId] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [hash, setHash] = useState<string | undefined>()
    const [transactionError, setTransactionError] = useState<Error | null>(null)

    // Load commitment ID from URL hash
    useEffect(() => {
        if (typeof window !== "undefined") {
            const urlHash = window.location.hash.slice(1)
            if (urlHash) setCommitmentId(urlHash)
        }
    }, [])

    // Fetch commitment data
    const {
        data: objectData,
        isPending: isFetching,
        error: queryError,
        refetch
    } = useIotaClientQuery(
        "getObject",
        {
            id: commitmentId!,
            options: { showContent: true, showOwner: true },
        },
        {
            enabled: !!commitmentId,
        }
    )

    // Extract commitment data
    const commitmentData = objectData?.data ? extractCommitmentData(objectData.data) : null
    const isOwner = commitmentData?.owner.toLowerCase() === address?.toLowerCase()
    const isArbiter = commitmentData?.arbiter.toLowerCase() === address?.toLowerCase()

    // ============================================================================
    // CREATE COMMITMENT
    // ============================================================================

    const createCommitment = useCallback(async (params: CreateCommitmentParams) => {
        if (!packageId || !address) return

        const { stakeAmount, arbiter, penaltyRecipient, description, deadline } = params

        try {
            setIsLoading(true)
            setTransactionError(null)
            setHash(undefined)

            const tx = new Transaction()

            // Split coin để lấy số tiền stake
            const [stakeCoin] = tx.splitCoins(tx.gas, [tx.pure.u64(stakeAmount)])

            // Convert description to bytes
            const descriptionBytes = Array.from(new TextEncoder().encode(description))

            tx.moveCall({
                target: `${packageId}::${CONTRACT_MODULE}::${CONTRACT_METHODS.CREATE_COMMITMENT}`,
                arguments: [
                    stakeCoin,
                    tx.pure.address(arbiter),
                    tx.pure.address(penaltyRecipient),
                    tx.pure.vector("u8", descriptionBytes),
                    tx.pure.u64(deadline),
                    tx.object(CLOCK_OBJECT_ID),
                ],
            })

            signAndExecute(
                { transaction: tx as any },
                {
                    onSuccess: async ({ digest }) => {
                        setHash(digest)
                        try {
                            const { effects } = await iotaClient.waitForTransaction({
                                digest,
                                options: { showEffects: true },
                            })

                            // Find the created Commitment object
                            const createdObject = effects?.created?.find(obj =>
                                obj.owner && typeof obj.owner === "object" && "Shared" in obj.owner
                            )

                            const newCommitmentId = createdObject?.reference?.objectId
                            if (newCommitmentId) {
                                setCommitmentId(newCommitmentId)
                                if (typeof window !== "undefined") {
                                    window.location.hash = newCommitmentId
                                }
                            }
                            setIsLoading(false)
                        } catch (waitError) {
                            console.error("Error waiting for transaction:", waitError)
                            setIsLoading(false)
                        }
                    },
                    onError: (err) => {
                        const error = err instanceof Error ? err : new Error(String(err))
                        setTransactionError(error)
                        console.error("Error creating commitment:", err)
                        setIsLoading(false)
                    },
                }
            )
        } catch (err) {
            const error = err instanceof Error ? err : new Error(String(err))
            setTransactionError(error)
            console.error("Error creating commitment:", err)
            setIsLoading(false)
        }
    }, [packageId, address, signAndExecute, iotaClient])

    // ============================================================================
    // CONFIRM COMPLETED (Arbiter only)
    // ============================================================================

    const confirmCompleted = useCallback(async (targetCommitmentId: string) => {
        if (!packageId) return

        try {
            setIsLoading(true)
            setTransactionError(null)

            const tx = new Transaction()
            tx.moveCall({
                target: `${packageId}::${CONTRACT_MODULE}::${CONTRACT_METHODS.CONFIRM_COMPLETED}`,
                arguments: [
                    tx.object(targetCommitmentId),
                    tx.object(CLOCK_OBJECT_ID),
                ],
            })

            signAndExecute(
                { transaction: tx as any },
                {
                    onSuccess: async ({ digest }) => {
                        setHash(digest)
                        await iotaClient.waitForTransaction({ digest })
                        await refetch()
                        setIsLoading(false)
                    },
                    onError: (err) => {
                        const error = err instanceof Error ? err : new Error(String(err))
                        setTransactionError(error)
                        console.error("Error confirming completed:", err)
                        setIsLoading(false)
                    },
                }
            )
        } catch (err) {
            const error = err instanceof Error ? err : new Error(String(err))
            setTransactionError(error)
            console.error("Error confirming completed:", err)
            setIsLoading(false)
        }
    }, [packageId, signAndExecute, iotaClient, refetch])

    // ============================================================================
    // CONFIRM FAILED (Arbiter only)
    // ============================================================================

    const confirmFailed = useCallback(async (targetCommitmentId: string) => {
        if (!packageId) return

        try {
            setIsLoading(true)
            setTransactionError(null)

            const tx = new Transaction()
            tx.moveCall({
                target: `${packageId}::${CONTRACT_MODULE}::${CONTRACT_METHODS.CONFIRM_FAILED}`,
                arguments: [
                    tx.object(targetCommitmentId),
                ],
            })

            signAndExecute(
                { transaction: tx as any },
                {
                    onSuccess: async ({ digest }) => {
                        setHash(digest)
                        await iotaClient.waitForTransaction({ digest })
                        await refetch()
                        setIsLoading(false)
                    },
                    onError: (err) => {
                        const error = err instanceof Error ? err : new Error(String(err))
                        setTransactionError(error)
                        console.error("Error confirming failed:", err)
                        setIsLoading(false)
                    },
                }
            )
        } catch (err) {
            const error = err instanceof Error ? err : new Error(String(err))
            setTransactionError(error)
            console.error("Error confirming failed:", err)
            setIsLoading(false)
        }
    }, [packageId, signAndExecute, iotaClient, refetch])

    // ============================================================================
    // CLAIM EXPIRED (Anyone can call after deadline)
    // ============================================================================

    const claimExpired = useCallback(async (targetCommitmentId: string) => {
        if (!packageId) return

        try {
            setIsLoading(true)
            setTransactionError(null)

            const tx = new Transaction()
            tx.moveCall({
                target: `${packageId}::${CONTRACT_MODULE}::${CONTRACT_METHODS.CLAIM_EXPIRED}`,
                arguments: [
                    tx.object(targetCommitmentId),
                    tx.object(CLOCK_OBJECT_ID),
                ],
            })

            signAndExecute(
                { transaction: tx as any },
                {
                    onSuccess: async ({ digest }) => {
                        setHash(digest)
                        await iotaClient.waitForTransaction({ digest })
                        await refetch()
                        setIsLoading(false)
                    },
                    onError: (err) => {
                        const error = err instanceof Error ? err : new Error(String(err))
                        setTransactionError(error)
                        console.error("Error claiming expired:", err)
                        setIsLoading(false)
                    },
                }
            )
        } catch (err) {
            const error = err instanceof Error ? err : new Error(String(err))
            setTransactionError(error)
            console.error("Error claiming expired:", err)
            setIsLoading(false)
        }
    }, [packageId, signAndExecute, iotaClient, refetch])

    // ============================================================================
    // UTILITY FUNCTIONS
    // ============================================================================

    const loadCommitment = useCallback((newCommitmentId: string) => {
        setCommitmentId(newCommitmentId)
        setTransactionError(null)
        if (typeof window !== "undefined") {
            window.location.hash = newCommitmentId
        }
    }, [])

    const clearCommitment = useCallback(() => {
        setCommitmentId(null)
        setTransactionError(null)
        if (typeof window !== "undefined") {
            window.location.hash = ""
        }
    }, [])

    // ============================================================================
    // RETURN VALUES
    // ============================================================================

    const state: CommitmentState = {
        isLoading: (isLoading && !commitmentId) || isPending || isFetching,
        isPending,
        isConfirming: false,
        isConfirmed: !!hash && !isLoading && !isPending,
        hash,
        error: queryError || transactionError,
    }

    const actions: CommitmentActions = {
        createCommitment,
        confirmCompleted,
        confirmFailed,
        claimExpired,
        loadCommitment,
        clearCommitment,
    }

    return {
        data: commitmentData,
        actions,
        state,
        commitmentId,
        isOwner,
        isArbiter,
        address,
        refetch,
    }
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Convert IOTA to MIST (1 IOTA = 1,000,000,000 MIST)
 */
export const iotaToMist = (iota: number): number => {
    return Math.floor(iota * 1_000_000_000)
}

/**
 * Convert MIST to IOTA
 */
export const mistToIota = (mist: number): number => {
    return mist / 1_000_000_000
}

/**
 * Format MIST amount to display string
 */
export const formatIota = (mist: number, decimals = 4): string => {
    const iota = mistToIota(mist)
    return iota.toFixed(decimals) + " IOTA"
}

/**
 * Get status text
 */
export const getStatusText = (status: CommitmentStatus): string => {
    switch (status) {
        case COMMITMENT_STATUS.PENDING:
            return "⏳ Đang chờ xác nhận"
        case COMMITMENT_STATUS.COMPLETED:
            return "✅ Đã hoàn thành"
        case COMMITMENT_STATUS.FAILED:
            return "❌ Thất bại"
        default:
            return "Không xác định"
    }
}

/**
 * Get status color class
 */
export const getStatusColor = (status: CommitmentStatus): string => {
    switch (status) {
        case COMMITMENT_STATUS.PENDING:
            return "text-yellow-500"
        case COMMITMENT_STATUS.COMPLETED:
            return "text-green-500"
        case COMMITMENT_STATUS.FAILED:
            return "text-red-500"
        default:
            return "text-gray-500"
    }
}

/**
 * Check if commitment is expired
 */
export const isCommitmentExpired = (deadline: number): boolean => {
    return Date.now() > deadline
}

/**
 * Format time remaining
 */
export const formatTimeRemaining = (deadline: number): string => {
    const now = Date.now()
    const diff = deadline - now

    if (diff <= 0) {
        return "Đã hết hạn"
    }

    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

    if (hours > 24) {
        const days = Math.floor(hours / 24)
        return `${days} ngày ${hours % 24} giờ`
    }

    return `${hours} giờ ${minutes} phút`
}
