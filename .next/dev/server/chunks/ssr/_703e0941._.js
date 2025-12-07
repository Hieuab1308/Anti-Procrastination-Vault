module.exports = [
"[project]/components/Wallet-connect.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WalletConnect",
    ()=>WalletConnect
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$iota$2f$dapp$2d$kit$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@iota/dapp-kit/dist/esm/index.js [app-ssr] (ecmascript)");
"use client";
;
;
function WalletConnect() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            padding: "1rem",
            display: "flex",
            justifyContent: "flex-end"
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$iota$2f$dapp$2d$kit$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ConnectButton"], {}, void 0, false, {
            fileName: "[project]/components/Wallet-connect.tsx",
            lineNumber: 8,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/Wallet-connect.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
}),
"[project]/hooks/useAntiProcrastination.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CLOCK_OBJECT_ID",
    ()=>CLOCK_OBJECT_ID,
    "COMMITMENT_STATUS",
    ()=>COMMITMENT_STATUS,
    "CONTRACT_METHODS",
    ()=>CONTRACT_METHODS,
    "CONTRACT_MODULE",
    ()=>CONTRACT_MODULE,
    "formatIota",
    ()=>formatIota,
    "formatTimeRemaining",
    ()=>formatTimeRemaining,
    "getStatusColor",
    ()=>getStatusColor,
    "getStatusText",
    ()=>getStatusText,
    "iotaToMist",
    ()=>iotaToMist,
    "isCommitmentExpired",
    ()=>isCommitmentExpired,
    "mistToIota",
    ()=>mistToIota,
    "useAntiProcrastination",
    ()=>useAntiProcrastination
]);
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$iota$2f$dapp$2d$kit$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@iota/dapp-kit/dist/esm/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$iota$2f$iota$2d$sdk$2f$dist$2f$esm$2f$transactions$2f$Transaction$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@iota/iota-sdk/dist/esm/transactions/Transaction.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/config.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
const CONTRACT_MODULE = "vault";
const CONTRACT_METHODS = {
    CREATE_COMMITMENT: "create_commitment",
    CONFIRM_COMPLETED: "confirm_completed",
    CONFIRM_FAILED: "confirm_failed",
    CLAIM_EXPIRED: "claim_expired"
};
const CLOCK_OBJECT_ID = "0x6";
const COMMITMENT_STATUS = {
    PENDING: 0,
    COMPLETED: 1,
    FAILED: 2
};
// ============================================================================
// DATA EXTRACTION
// ============================================================================
function extractCommitmentData(data) {
    if (data.content?.dataType !== "moveObject") {
        console.log("Data is not a moveObject:", data.content?.dataType);
        return null;
    }
    const fields = data.content.fields;
    if (!fields) {
        console.log("No fields found in object data");
        return null;
    }
    console.log("Commitment fields:", JSON.stringify(fields, null, 2));
    try {
        // Extract stake amount from nested Coin object
        let stakeAmount = 0;
        if (fields.stake && fields.stake.fields && fields.stake.fields.balance) {
            stakeAmount = parseInt(fields.stake.fields.balance, 10) || 0;
        }
        // Decode description from bytes
        let description = "";
        if (fields.description && Array.isArray(fields.description)) {
            description = new TextDecoder().decode(new Uint8Array(fields.description));
        } else if (typeof fields.description === "string") {
            description = fields.description;
        }
        return {
            id: fields.id?.id || data.objectId || "",
            owner: String(fields.owner || ""),
            arbiter: String(fields.arbiter || ""),
            penaltyRecipient: String(fields.penalty_recipient || ""),
            description,
            deadline: parseInt(fields.deadline, 10) || 0,
            stakeAmount,
            status: parseInt(fields.status, 10) || 0,
            createdAt: parseInt(fields.created_at, 10) || 0
        };
    } catch (error) {
        console.error("Error extracting commitment data:", error);
        return null;
    }
}
const useAntiProcrastination = ()=>{
    const currentAccount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$iota$2f$dapp$2d$kit$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCurrentAccount"])();
    const address = currentAccount?.address;
    const packageId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useNetworkVariable"])("packageId");
    const iotaClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$iota$2f$dapp$2d$kit$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIotaClient"])();
    const { mutate: signAndExecute, isPending } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$iota$2f$dapp$2d$kit$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSignAndExecuteTransaction"])();
    const [commitmentId, setCommitmentId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [hash, setHash] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])();
    const [transactionError, setTransactionError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    // Load commitment ID from URL hash
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
    }, []);
    // Fetch commitment data
    const { data: objectData, isPending: isFetching, error: queryError, refetch } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$iota$2f$dapp$2d$kit$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIotaClientQuery"])("getObject", {
        id: commitmentId,
        options: {
            showContent: true,
            showOwner: true
        }
    }, {
        enabled: !!commitmentId
    });
    // Extract commitment data
    const commitmentData = objectData?.data ? extractCommitmentData(objectData.data) : null;
    const isOwner = commitmentData?.owner.toLowerCase() === address?.toLowerCase();
    const isArbiter = commitmentData?.arbiter.toLowerCase() === address?.toLowerCase();
    // ============================================================================
    // CREATE COMMITMENT
    // ============================================================================
    const createCommitment = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (params)=>{
        if (!packageId || !address) return;
        const { stakeAmount, arbiter, penaltyRecipient, description, deadline } = params;
        try {
            setIsLoading(true);
            setTransactionError(null);
            setHash(undefined);
            const tx = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$iota$2f$iota$2d$sdk$2f$dist$2f$esm$2f$transactions$2f$Transaction$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Transaction"]();
            // Split coin để lấy số tiền stake
            const [stakeCoin] = tx.splitCoins(tx.gas, [
                tx.pure.u64(stakeAmount)
            ]);
            // Convert description to bytes
            const descriptionBytes = Array.from(new TextEncoder().encode(description));
            tx.moveCall({
                target: `${packageId}::${CONTRACT_MODULE}::${CONTRACT_METHODS.CREATE_COMMITMENT}`,
                arguments: [
                    stakeCoin,
                    tx.pure.address(arbiter),
                    tx.pure.address(penaltyRecipient),
                    tx.pure.vector("u8", descriptionBytes),
                    tx.pure.u64(deadline),
                    tx.object(CLOCK_OBJECT_ID)
                ]
            });
            signAndExecute({
                transaction: tx
            }, {
                onSuccess: async ({ digest })=>{
                    setHash(digest);
                    try {
                        const { effects } = await iotaClient.waitForTransaction({
                            digest,
                            options: {
                                showEffects: true
                            }
                        });
                        // Find the created Commitment object
                        const createdObject = effects?.created?.find((obj)=>obj.owner && typeof obj.owner === "object" && "Shared" in obj.owner);
                        const newCommitmentId = createdObject?.reference?.objectId;
                        if (newCommitmentId) {
                            setCommitmentId(newCommitmentId);
                            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
                            ;
                        }
                        setIsLoading(false);
                    } catch (waitError) {
                        console.error("Error waiting for transaction:", waitError);
                        setIsLoading(false);
                    }
                },
                onError: (err)=>{
                    const error = err instanceof Error ? err : new Error(String(err));
                    setTransactionError(error);
                    console.error("Error creating commitment:", err);
                    setIsLoading(false);
                }
            });
        } catch (err) {
            const error = err instanceof Error ? err : new Error(String(err));
            setTransactionError(error);
            console.error("Error creating commitment:", err);
            setIsLoading(false);
        }
    }, [
        packageId,
        address,
        signAndExecute,
        iotaClient
    ]);
    // ============================================================================
    // CONFIRM COMPLETED (Arbiter only)
    // ============================================================================
    const confirmCompleted = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (targetCommitmentId)=>{
        if (!packageId) return;
        try {
            setIsLoading(true);
            setTransactionError(null);
            const tx = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$iota$2f$iota$2d$sdk$2f$dist$2f$esm$2f$transactions$2f$Transaction$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Transaction"]();
            tx.moveCall({
                target: `${packageId}::${CONTRACT_MODULE}::${CONTRACT_METHODS.CONFIRM_COMPLETED}`,
                arguments: [
                    tx.object(targetCommitmentId),
                    tx.object(CLOCK_OBJECT_ID)
                ]
            });
            signAndExecute({
                transaction: tx
            }, {
                onSuccess: async ({ digest })=>{
                    setHash(digest);
                    await iotaClient.waitForTransaction({
                        digest
                    });
                    await refetch();
                    setIsLoading(false);
                },
                onError: (err)=>{
                    const error = err instanceof Error ? err : new Error(String(err));
                    setTransactionError(error);
                    console.error("Error confirming completed:", err);
                    setIsLoading(false);
                }
            });
        } catch (err) {
            const error = err instanceof Error ? err : new Error(String(err));
            setTransactionError(error);
            console.error("Error confirming completed:", err);
            setIsLoading(false);
        }
    }, [
        packageId,
        signAndExecute,
        iotaClient,
        refetch
    ]);
    // ============================================================================
    // CONFIRM FAILED (Arbiter only)
    // ============================================================================
    const confirmFailed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (targetCommitmentId)=>{
        if (!packageId) return;
        try {
            setIsLoading(true);
            setTransactionError(null);
            const tx = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$iota$2f$iota$2d$sdk$2f$dist$2f$esm$2f$transactions$2f$Transaction$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Transaction"]();
            tx.moveCall({
                target: `${packageId}::${CONTRACT_MODULE}::${CONTRACT_METHODS.CONFIRM_FAILED}`,
                arguments: [
                    tx.object(targetCommitmentId)
                ]
            });
            signAndExecute({
                transaction: tx
            }, {
                onSuccess: async ({ digest })=>{
                    setHash(digest);
                    await iotaClient.waitForTransaction({
                        digest
                    });
                    await refetch();
                    setIsLoading(false);
                },
                onError: (err)=>{
                    const error = err instanceof Error ? err : new Error(String(err));
                    setTransactionError(error);
                    console.error("Error confirming failed:", err);
                    setIsLoading(false);
                }
            });
        } catch (err) {
            const error = err instanceof Error ? err : new Error(String(err));
            setTransactionError(error);
            console.error("Error confirming failed:", err);
            setIsLoading(false);
        }
    }, [
        packageId,
        signAndExecute,
        iotaClient,
        refetch
    ]);
    // ============================================================================
    // CLAIM EXPIRED (Anyone can call after deadline)
    // ============================================================================
    const claimExpired = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (targetCommitmentId)=>{
        if (!packageId) return;
        try {
            setIsLoading(true);
            setTransactionError(null);
            const tx = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$iota$2f$iota$2d$sdk$2f$dist$2f$esm$2f$transactions$2f$Transaction$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Transaction"]();
            tx.moveCall({
                target: `${packageId}::${CONTRACT_MODULE}::${CONTRACT_METHODS.CLAIM_EXPIRED}`,
                arguments: [
                    tx.object(targetCommitmentId),
                    tx.object(CLOCK_OBJECT_ID)
                ]
            });
            signAndExecute({
                transaction: tx
            }, {
                onSuccess: async ({ digest })=>{
                    setHash(digest);
                    await iotaClient.waitForTransaction({
                        digest
                    });
                    await refetch();
                    setIsLoading(false);
                },
                onError: (err)=>{
                    const error = err instanceof Error ? err : new Error(String(err));
                    setTransactionError(error);
                    console.error("Error claiming expired:", err);
                    setIsLoading(false);
                }
            });
        } catch (err) {
            const error = err instanceof Error ? err : new Error(String(err));
            setTransactionError(error);
            console.error("Error claiming expired:", err);
            setIsLoading(false);
        }
    }, [
        packageId,
        signAndExecute,
        iotaClient,
        refetch
    ]);
    // ============================================================================
    // UTILITY FUNCTIONS
    // ============================================================================
    const loadCommitment = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((newCommitmentId)=>{
        setCommitmentId(newCommitmentId);
        setTransactionError(null);
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
    }, []);
    const clearCommitment = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        setCommitmentId(null);
        setTransactionError(null);
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
    }, []);
    // ============================================================================
    // RETURN VALUES
    // ============================================================================
    const state = {
        isLoading: isLoading && !commitmentId || isPending || isFetching,
        isPending,
        isConfirming: false,
        isConfirmed: !!hash && !isLoading && !isPending,
        hash,
        error: queryError || transactionError
    };
    const actions = {
        createCommitment,
        confirmCompleted,
        confirmFailed,
        claimExpired,
        loadCommitment,
        clearCommitment
    };
    return {
        data: commitmentData,
        actions,
        state,
        commitmentId,
        isOwner,
        isArbiter,
        address,
        refetch
    };
};
const iotaToMist = (iota)=>{
    return Math.floor(iota * 1_000_000_000);
};
const mistToIota = (mist)=>{
    return mist / 1_000_000_000;
};
const formatIota = (mist, decimals = 4)=>{
    const iota = mistToIota(mist);
    return iota.toFixed(decimals) + " IOTA";
};
const getStatusText = (status)=>{
    switch(status){
        case COMMITMENT_STATUS.PENDING:
            return "⏳ Đang chờ xác nhận";
        case COMMITMENT_STATUS.COMPLETED:
            return "✅ Đã hoàn thành";
        case COMMITMENT_STATUS.FAILED:
            return "❌ Thất bại";
        default:
            return "Không xác định";
    }
};
const getStatusColor = (status)=>{
    switch(status){
        case COMMITMENT_STATUS.PENDING:
            return "text-yellow-500";
        case COMMITMENT_STATUS.COMPLETED:
            return "text-green-500";
        case COMMITMENT_STATUS.FAILED:
            return "text-red-500";
        default:
            return "text-gray-500";
    }
};
const isCommitmentExpired = (deadline)=>{
    return Date.now() > deadline;
};
const formatTimeRemaining = (deadline)=>{
    const now = Date.now();
    const diff = deadline - now;
    if (diff <= 0) {
        return "Đã hết hạn";
    }
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff % (1000 * 60 * 60) / (1000 * 60));
    if (hours > 24) {
        const days = Math.floor(hours / 24);
        return `${days} ngày ${hours % 24} giờ`;
    }
    return `${hours} giờ ${minutes} phút`;
};
}),
"[project]/components/CreateCommitmentForm.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CreateCommitmentForm",
    ()=>CreateCommitmentForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
/**
 * ============================================================================
 * CREATE COMMITMENT FORM
 * ============================================================================
 * 
 * Form để tạo cam kết chống trì hoãn mới
 * 
 * ============================================================================
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$iota$2f$dapp$2d$kit$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@iota/dapp-kit/dist/esm/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$button$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/themes/dist/esm/components/button.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$flex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/themes/dist/esm/components/flex.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/themes/dist/esm/components/text.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$text$2d$field$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__TextField$3e$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/themes/dist/esm/components/text-field.js [app-ssr] (ecmascript) <export * as TextField>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$text$2d$area$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/themes/dist/esm/components/text-area.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$spinners$2f$ClipLoader$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-spinners/ClipLoader.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useAntiProcrastination$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useAntiProcrastination.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
const CreateCommitmentForm = ({ onSubmit, isPending, error })=>{
    const currentAccount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$iota$2f$dapp$2d$kit$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCurrentAccount"])();
    const myAddress = currentAccount?.address || "";
    const [stakeIota, setStakeIota] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("0.1");
    const [arbiter, setArbiter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [penaltyRecipient, setPenaltyRecipient] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [description, setDescription] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [deadlineDate, setDeadlineDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [deadlineTime, setDeadlineTime] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [formError, setFormError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    // Set default penalty recipient to burn address
    const BURN_ADDRESS = "0x0000000000000000000000000000000000000000000000000000000000000000";
    // Validate IOTA address (0x + 64 hex characters = 66 total)
    const isValidAddress = (addr)=>{
        if (!addr) return false;
        const hexRegex = /^0x[a-fA-F0-9]{64}$/;
        return hexRegex.test(addr);
    };
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setFormError(null);
        // Validate
        if (!stakeIota || parseFloat(stakeIota) <= 0) {
            setFormError("Vui lòng nhập số IOTA hợp lệ");
            return;
        }
        if (!isValidAddress(arbiter)) {
            setFormError("Địa chỉ trọng tài không hợp lệ. Địa chỉ IOTA phải bắt đầu bằng 0x và có 64 ký tự hex (tổng 66 ký tự)");
            return;
        }
        if (!description.trim()) {
            setFormError("Vui lòng nhập mô tả cam kết");
            return;
        }
        if (!deadlineDate || !deadlineTime) {
            setFormError("Vui lòng chọn thời hạn hoàn thành");
            return;
        }
        const deadlineTimestamp = new Date(`${deadlineDate}T${deadlineTime}`).getTime();
        if (deadlineTimestamp <= Date.now()) {
            setFormError("Thời hạn phải trong tương lai");
            return;
        }
        const finalPenaltyRecipient = penaltyRecipient.trim() || BURN_ADDRESS;
        await onSubmit({
            stakeAmount: (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useAntiProcrastination$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["iotaToMist"])(parseFloat(stakeIota)),
            arbiter: arbiter.trim(),
            penaltyRecipient: finalPenaltyRecipient,
            description: description.trim(),
            deadline: deadlineTimestamp
        });
    };
    // Set default deadline to today + 1 day
    const getMinDate = ()=>{
        const now = new Date();
        return now.toISOString().split("T")[0];
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
        onSubmit: handleSubmit,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$flex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Flex"], {
            direction: "column",
            gap: "4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Text"], {
                    size: "5",
                    weight: "bold",
                    style: {
                        marginBottom: "0.5rem"
                    },
                    children: "🔒 Tạo Cam Kết Mới"
                }, void 0, false, {
                    fileName: "[project]/components/CreateCommitmentForm.tsx",
                    lineNumber: 108,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Text"], {
                            size: "2",
                            weight: "medium",
                            style: {
                                marginBottom: "0.25rem",
                                display: "block"
                            },
                            children: "💰 Số IOTA đặt cọc"
                        }, void 0, false, {
                            fileName: "[project]/components/CreateCommitmentForm.tsx",
                            lineNumber: 114,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$text$2d$field$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__TextField$3e$__["TextField"].Root, {
                            type: "number",
                            step: "0.01",
                            min: "0.01",
                            placeholder: "0.1",
                            value: stakeIota,
                            onChange: (e)=>setStakeIota(e.target.value)
                        }, void 0, false, {
                            fileName: "[project]/components/CreateCommitmentForm.tsx",
                            lineNumber: 117,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Text"], {
                            size: "1",
                            color: "gray",
                            style: {
                                marginTop: "0.25rem"
                            },
                            children: "Số tiền này sẽ bị mất nếu bạn không hoàn thành cam kết"
                        }, void 0, false, {
                            fileName: "[project]/components/CreateCommitmentForm.tsx",
                            lineNumber: 125,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/CreateCommitmentForm.tsx",
                    lineNumber: 113,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Text"], {
                            size: "2",
                            weight: "medium",
                            style: {
                                marginBottom: "0.25rem",
                                display: "block"
                            },
                            children: "📝 Mô tả cam kết"
                        }, void 0, false, {
                            fileName: "[project]/components/CreateCommitmentForm.tsx",
                            lineNumber: 132,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$text$2d$area$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TextArea"], {
                            placeholder: "Ví dụ: Tôi sẽ hoàn thành bài tập Toán chương 5 trước 10 giờ tối nay",
                            value: description,
                            onChange: (e)=>setDescription(e.target.value),
                            style: {
                                minHeight: "80px"
                            }
                        }, void 0, false, {
                            fileName: "[project]/components/CreateCommitmentForm.tsx",
                            lineNumber: 135,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/CreateCommitmentForm.tsx",
                    lineNumber: 131,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Text"], {
                            size: "2",
                            weight: "medium",
                            style: {
                                marginBottom: "0.25rem",
                                display: "block"
                            },
                            children: "👨‍⚖️ Địa chỉ Trọng tài (Arbiter)"
                        }, void 0, false, {
                            fileName: "[project]/components/CreateCommitmentForm.tsx",
                            lineNumber: 145,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$flex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Flex"], {
                            gap: "2",
                            align: "end",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$text$2d$field$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__TextField$3e$__["TextField"].Root, {
                                    type: "text",
                                    placeholder: "0x...",
                                    value: arbiter,
                                    onChange: (e)=>setArbiter(e.target.value),
                                    style: {
                                        flex: 1
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/components/CreateCommitmentForm.tsx",
                                    lineNumber: 149,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$button$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                    type: "button",
                                    variant: "soft",
                                    size: "2",
                                    onClick: ()=>setArbiter(myAddress),
                                    disabled: !myAddress,
                                    children: "Dùng địa chỉ của tôi"
                                }, void 0, false, {
                                    fileName: "[project]/components/CreateCommitmentForm.tsx",
                                    lineNumber: 156,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/CreateCommitmentForm.tsx",
                            lineNumber: 148,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Text"], {
                            size: "1",
                            color: "gray",
                            style: {
                                marginTop: "0.25rem"
                            },
                            children: [
                                "Người này sẽ xác nhận bạn đã hoàn thành hay chưa.",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                    children: " Để test:"
                                }, void 0, false, {
                                    fileName: "[project]/components/CreateCommitmentForm.tsx",
                                    lineNumber: 168,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                " dùng địa chỉ của chính bạn làm trọng tài."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/CreateCommitmentForm.tsx",
                            lineNumber: 166,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/CreateCommitmentForm.tsx",
                    lineNumber: 144,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Text"], {
                            size: "2",
                            weight: "medium",
                            style: {
                                marginBottom: "0.25rem",
                                display: "block"
                            },
                            children: "🔥 Địa chỉ nhận tiền phạt (tùy chọn)"
                        }, void 0, false, {
                            fileName: "[project]/components/CreateCommitmentForm.tsx",
                            lineNumber: 174,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$text$2d$field$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__TextField$3e$__["TextField"].Root, {
                            type: "text",
                            placeholder: "Để trống = Burn address (đốt tiền)",
                            value: penaltyRecipient,
                            onChange: (e)=>setPenaltyRecipient(e.target.value)
                        }, void 0, false, {
                            fileName: "[project]/components/CreateCommitmentForm.tsx",
                            lineNumber: 177,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Text"], {
                            size: "1",
                            color: "gray",
                            style: {
                                marginTop: "0.25rem"
                            },
                            children: "Tiền sẽ được chuyển đến địa chỉ này nếu thất bại (có thể là tổ chức từ thiện)"
                        }, void 0, false, {
                            fileName: "[project]/components/CreateCommitmentForm.tsx",
                            lineNumber: 183,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/CreateCommitmentForm.tsx",
                    lineNumber: 173,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Text"], {
                            size: "2",
                            weight: "medium",
                            style: {
                                marginBottom: "0.25rem",
                                display: "block"
                            },
                            children: "⏰ Thời hạn hoàn thành"
                        }, void 0, false, {
                            fileName: "[project]/components/CreateCommitmentForm.tsx",
                            lineNumber: 190,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$flex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Flex"], {
                            gap: "2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$text$2d$field$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__TextField$3e$__["TextField"].Root, {
                                    type: "date",
                                    min: getMinDate(),
                                    value: deadlineDate,
                                    onChange: (e)=>setDeadlineDate(e.target.value),
                                    style: {
                                        flex: 1
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/components/CreateCommitmentForm.tsx",
                                    lineNumber: 194,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$text$2d$field$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__TextField$3e$__["TextField"].Root, {
                                    type: "time",
                                    value: deadlineTime,
                                    onChange: (e)=>setDeadlineTime(e.target.value),
                                    style: {
                                        flex: 1
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/components/CreateCommitmentForm.tsx",
                                    lineNumber: 201,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/CreateCommitmentForm.tsx",
                            lineNumber: 193,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/CreateCommitmentForm.tsx",
                    lineNumber: 189,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0)),
                (formError || error) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        padding: "0.75rem",
                        background: "var(--red-a3)",
                        borderRadius: "8px"
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Text"], {
                        style: {
                            color: "var(--red-11)"
                        },
                        children: [
                            "❌ ",
                            formError || error?.message
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/CreateCommitmentForm.tsx",
                        lineNumber: 217,
                        columnNumber: 25
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/components/CreateCommitmentForm.tsx",
                    lineNumber: 212,
                    columnNumber: 21
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$button$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                    type: "submit",
                    size: "3",
                    disabled: isPending,
                    style: {
                        marginTop: "0.5rem"
                    },
                    children: isPending ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$spinners$2f$ClipLoader$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                size: 16,
                                color: "white"
                            }, void 0, false, {
                                fileName: "[project]/components/CreateCommitmentForm.tsx",
                                lineNumber: 232,
                                columnNumber: 29
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    marginLeft: "8px"
                                },
                                children: "Đang tạo..."
                            }, void 0, false, {
                                fileName: "[project]/components/CreateCommitmentForm.tsx",
                                lineNumber: 233,
                                columnNumber: 29
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true) : "🚀 Tạo Cam Kết"
                }, void 0, false, {
                    fileName: "[project]/components/CreateCommitmentForm.tsx",
                    lineNumber: 224,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/components/CreateCommitmentForm.tsx",
            lineNumber: 107,
            columnNumber: 13
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/components/CreateCommitmentForm.tsx",
        lineNumber: 106,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/components/CommitmentCard.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CommitmentCard",
    ()=>CommitmentCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
/**
 * ============================================================================
 * COMMITMENT CARD
 * ============================================================================
 * 
 * Hiển thị thông tin chi tiết của một cam kết
 * 
 * ============================================================================
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/themes/dist/esm/components/box.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$card$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/themes/dist/esm/components/card.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$flex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/themes/dist/esm/components/flex.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/themes/dist/esm/components/text.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$badge$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/themes/dist/esm/components/badge.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$separator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/themes/dist/esm/components/separator.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useAntiProcrastination$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useAntiProcrastination.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
const CommitmentCard = ({ commitment, isOwner, isArbiter, currentAddress })=>{
    const [timeRemaining, setTimeRemaining] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [isExpired, setIsExpired] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // Update countdown timer
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const updateTimer = ()=>{
            setTimeRemaining((0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useAntiProcrastination$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatTimeRemaining"])(commitment.deadline));
            setIsExpired((0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useAntiProcrastination$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isCommitmentExpired"])(commitment.deadline));
        };
        updateTimer();
        const interval = setInterval(updateTimer, 1000 * 60) // Update every minute
        ;
        return ()=>clearInterval(interval);
    }, [
        commitment.deadline
    ]);
    const getStatusBadge = ()=>{
        switch(commitment.status){
            case __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useAntiProcrastination$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COMMITMENT_STATUS"].PENDING:
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$badge$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                    color: "yellow",
                    size: "2",
                    children: "⏳ Đang chờ"
                }, void 0, false, {
                    fileName: "[project]/components/CommitmentCard.tsx",
                    lineNumber: 55,
                    columnNumber: 24
                }, ("TURBOPACK compile-time value", void 0));
            case __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useAntiProcrastination$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COMMITMENT_STATUS"].COMPLETED:
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$badge$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                    color: "green",
                    size: "2",
                    children: "✅ Hoàn thành"
                }, void 0, false, {
                    fileName: "[project]/components/CommitmentCard.tsx",
                    lineNumber: 57,
                    columnNumber: 24
                }, ("TURBOPACK compile-time value", void 0));
            case __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useAntiProcrastination$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COMMITMENT_STATUS"].FAILED:
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$badge$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                    color: "red",
                    size: "2",
                    children: "❌ Thất bại"
                }, void 0, false, {
                    fileName: "[project]/components/CommitmentCard.tsx",
                    lineNumber: 59,
                    columnNumber: 24
                }, ("TURBOPACK compile-time value", void 0));
            default:
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$badge$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                    color: "gray",
                    size: "2",
                    children: "Không xác định"
                }, void 0, false, {
                    fileName: "[project]/components/CommitmentCard.tsx",
                    lineNumber: 61,
                    columnNumber: 24
                }, ("TURBOPACK compile-time value", void 0));
        }
    };
    const shortenAddress = (addr)=>{
        if (addr.length <= 16) return addr;
        return `${addr.slice(0, 8)}...${addr.slice(-6)}`;
    };
    const formatDate = (timestamp)=>{
        return new Date(timestamp).toLocaleString("vi-VN", {
            dateStyle: "medium",
            timeStyle: "short"
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$card$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
        style: {
            padding: "1.5rem"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$flex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Flex"], {
                justify: "between",
                align: "center",
                style: {
                    marginBottom: "1rem"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Text"], {
                        size: "5",
                        weight: "bold",
                        children: "📋 Chi tiết Cam kết"
                    }, void 0, false, {
                        fileName: "[project]/components/CommitmentCard.tsx",
                        lineNumber: 81,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    getStatusBadge()
                ]
            }, void 0, true, {
                fileName: "[project]/components/CommitmentCard.tsx",
                lineNumber: 80,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$separator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Separator"], {
                size: "4",
                style: {
                    marginBottom: "1rem"
                }
            }, void 0, false, {
                fileName: "[project]/components/CommitmentCard.tsx",
                lineNumber: 85,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Box"], {
                style: {
                    marginBottom: "1rem"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Text"], {
                        size: "2",
                        color: "gray",
                        style: {
                            display: "block",
                            marginBottom: "0.25rem"
                        },
                        children: "Mô tả cam kết:"
                    }, void 0, false, {
                        fileName: "[project]/components/CommitmentCard.tsx",
                        lineNumber: 89,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Text"], {
                        size: "3",
                        weight: "medium",
                        style: {
                            display: "block",
                            padding: "0.75rem",
                            background: "var(--gray-a3)",
                            borderRadius: "8px",
                            whiteSpace: "pre-wrap"
                        },
                        children: [
                            '"',
                            commitment.description,
                            '"'
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/CommitmentCard.tsx",
                        lineNumber: 92,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/CommitmentCard.tsx",
                lineNumber: 88,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$flex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Flex"], {
                gap: "4",
                wrap: "wrap",
                style: {
                    marginBottom: "1rem"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Box"], {
                        style: {
                            flex: "1 1 200px"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Text"], {
                                size: "2",
                                color: "gray",
                                style: {
                                    display: "block",
                                    marginBottom: "0.25rem"
                                },
                                children: "💰 Số tiền đặt cọc:"
                            }, void 0, false, {
                                fileName: "[project]/components/CommitmentCard.tsx",
                                lineNumber: 106,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Text"], {
                                size: "4",
                                weight: "bold",
                                color: "blue",
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useAntiProcrastination$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatIota"])(commitment.stakeAmount)
                            }, void 0, false, {
                                fileName: "[project]/components/CommitmentCard.tsx",
                                lineNumber: 109,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/CommitmentCard.tsx",
                        lineNumber: 105,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Box"], {
                        style: {
                            flex: "1 1 200px"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Text"], {
                                size: "2",
                                color: "gray",
                                style: {
                                    display: "block",
                                    marginBottom: "0.25rem"
                                },
                                children: "⏰ Thời hạn:"
                            }, void 0, false, {
                                fileName: "[project]/components/CommitmentCard.tsx",
                                lineNumber: 115,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Text"], {
                                size: "3",
                                weight: "medium",
                                children: formatDate(commitment.deadline)
                            }, void 0, false, {
                                fileName: "[project]/components/CommitmentCard.tsx",
                                lineNumber: 118,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            commitment.status === __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useAntiProcrastination$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COMMITMENT_STATUS"].PENDING && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Text"], {
                                size: "2",
                                color: isExpired ? "red" : "green",
                                style: {
                                    display: "block",
                                    marginTop: "0.25rem"
                                },
                                children: [
                                    isExpired ? "🔴 " : "🟢 ",
                                    timeRemaining
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/CommitmentCard.tsx",
                                lineNumber: 122,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/CommitmentCard.tsx",
                        lineNumber: 114,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/CommitmentCard.tsx",
                lineNumber: 104,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$separator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Separator"], {
                size: "4",
                style: {
                    marginBottom: "1rem"
                }
            }, void 0, false, {
                fileName: "[project]/components/CommitmentCard.tsx",
                lineNumber: 133,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$flex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Flex"], {
                direction: "column",
                gap: "2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$flex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Flex"], {
                        align: "center",
                        gap: "2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Text"], {
                                size: "2",
                                color: "gray",
                                style: {
                                    width: "120px"
                                },
                                children: "👤 Người tạo:"
                            }, void 0, false, {
                                fileName: "[project]/components/CommitmentCard.tsx",
                                lineNumber: 138,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Text"], {
                                size: "2",
                                style: {
                                    fontFamily: "monospace"
                                },
                                children: shortenAddress(commitment.owner)
                            }, void 0, false, {
                                fileName: "[project]/components/CommitmentCard.tsx",
                                lineNumber: 139,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            isOwner && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$badge$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                color: "blue",
                                size: "1",
                                children: "Bạn"
                            }, void 0, false, {
                                fileName: "[project]/components/CommitmentCard.tsx",
                                lineNumber: 142,
                                columnNumber: 33
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/CommitmentCard.tsx",
                        lineNumber: 137,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$flex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Flex"], {
                        align: "center",
                        gap: "2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Text"], {
                                size: "2",
                                color: "gray",
                                style: {
                                    width: "120px"
                                },
                                children: "👨‍⚖️ Trọng tài:"
                            }, void 0, false, {
                                fileName: "[project]/components/CommitmentCard.tsx",
                                lineNumber: 146,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Text"], {
                                size: "2",
                                style: {
                                    fontFamily: "monospace"
                                },
                                children: shortenAddress(commitment.arbiter)
                            }, void 0, false, {
                                fileName: "[project]/components/CommitmentCard.tsx",
                                lineNumber: 147,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            isArbiter && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$badge$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                color: "purple",
                                size: "1",
                                children: "Bạn"
                            }, void 0, false, {
                                fileName: "[project]/components/CommitmentCard.tsx",
                                lineNumber: 150,
                                columnNumber: 35
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/CommitmentCard.tsx",
                        lineNumber: 145,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$flex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Flex"], {
                        align: "center",
                        gap: "2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Text"], {
                                size: "2",
                                color: "gray",
                                style: {
                                    width: "120px"
                                },
                                children: "🔥 Nhận phạt:"
                            }, void 0, false, {
                                fileName: "[project]/components/CommitmentCard.tsx",
                                lineNumber: 154,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Text"], {
                                size: "2",
                                style: {
                                    fontFamily: "monospace"
                                },
                                children: commitment.penaltyRecipient === "0x0000000000000000000000000000000000000000000000000000000000000000" ? "Burn Address (đốt tiền)" : shortenAddress(commitment.penaltyRecipient)
                            }, void 0, false, {
                                fileName: "[project]/components/CommitmentCard.tsx",
                                lineNumber: 155,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/CommitmentCard.tsx",
                        lineNumber: 153,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/CommitmentCard.tsx",
                lineNumber: 136,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$separator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Separator"], {
                size: "4",
                style: {
                    margin: "1rem 0"
                }
            }, void 0, false, {
                fileName: "[project]/components/CommitmentCard.tsx",
                lineNumber: 163,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            commitment.status === __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useAntiProcrastination$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COMMITMENT_STATUS"].PENDING && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Box"], {
                style: {
                    padding: "0.75rem",
                    background: isArbiter ? "var(--purple-a3)" : "var(--blue-a3)",
                    borderRadius: "8px"
                },
                children: isArbiter ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Text"], {
                    size: "2",
                    color: "purple",
                    children: [
                        "🎯 ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                            children: "Bạn là Trọng tài!"
                        }, void 0, false, {
                            fileName: "[project]/components/CommitmentCard.tsx",
                            lineNumber: 174,
                            columnNumber: 32
                        }, ("TURBOPACK compile-time value", void 0)),
                        " Bạn có quyền xác nhận cam kết này đã hoàn thành hay thất bại."
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/CommitmentCard.tsx",
                    lineNumber: 173,
                    columnNumber: 25
                }, ("TURBOPACK compile-time value", void 0)) : isOwner ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Text"], {
                    size: "2",
                    color: "blue",
                    children: [
                        "📌 ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                            children: "Đây là cam kết của bạn."
                        }, void 0, false, {
                            fileName: "[project]/components/CommitmentCard.tsx",
                            lineNumber: 178,
                            columnNumber: 32
                        }, ("TURBOPACK compile-time value", void 0)),
                        " Hãy hoàn thành trước deadline để nhận lại tiền!"
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/CommitmentCard.tsx",
                    lineNumber: 177,
                    columnNumber: 25
                }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Text"], {
                    size: "2",
                    color: "gray",
                    children: "👀 Bạn đang xem cam kết của người khác."
                }, void 0, false, {
                    fileName: "[project]/components/CommitmentCard.tsx",
                    lineNumber: 181,
                    columnNumber: 25
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/components/CommitmentCard.tsx",
                lineNumber: 167,
                columnNumber: 17
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Box"], {
                style: {
                    marginTop: "1rem"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Text"], {
                    size: "1",
                    color: "gray",
                    children: [
                        "ID: ",
                        commitment.id
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/CommitmentCard.tsx",
                    lineNumber: 190,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/components/CommitmentCard.tsx",
                lineNumber: 189,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/CommitmentCard.tsx",
        lineNumber: 78,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/components/ActionButtons.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ActionButtons",
    ()=>ActionButtons
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
/**
 * ============================================================================
 * ARBITER ACTIONS
 * ============================================================================
 * 
 * Các nút hành động cho trọng tài và sau khi hết hạn
 * 
 * ============================================================================
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$button$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/themes/dist/esm/components/button.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$flex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/themes/dist/esm/components/flex.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/themes/dist/esm/components/text.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$card$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/themes/dist/esm/components/card.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$spinners$2f$ClipLoader$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-spinners/ClipLoader.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useAntiProcrastination$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useAntiProcrastination.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
const ActionButtons = ({ commitment, isArbiter, isOwner, isPending, onConfirmCompleted, onConfirmFailed, onClaimExpired })=>{
    const isExpired = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useAntiProcrastination$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isCommitmentExpired"])(commitment.deadline);
    const isPendingStatus = commitment.status === __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useAntiProcrastination$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COMMITMENT_STATUS"].PENDING;
    // Không hiển thị nếu cam kết đã được xử lý
    if (!isPendingStatus) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$card$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
            style: {
                padding: "1rem",
                background: "var(--gray-a2)"
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Text"], {
                size: "3",
                color: "gray",
                align: "center",
                style: {
                    display: "block"
                },
                children: commitment.status === __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useAntiProcrastination$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COMMITMENT_STATUS"].COMPLETED ? "✅ Cam kết này đã được xác nhận hoàn thành. Tiền đã được trả lại cho người tạo." : "❌ Cam kết này đã thất bại. Tiền đã được chuyển đến địa chỉ phạt."
            }, void 0, false, {
                fileName: "[project]/components/ActionButtons.tsx",
                lineNumber: 47,
                columnNumber: 17
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/components/ActionButtons.tsx",
            lineNumber: 46,
            columnNumber: 13
        }, ("TURBOPACK compile-time value", void 0));
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$card$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
        style: {
            padding: "1.5rem"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Text"], {
                size: "4",
                weight: "bold",
                style: {
                    marginBottom: "1rem",
                    display: "block"
                },
                children: "⚡ Hành động"
            }, void 0, false, {
                fileName: "[project]/components/ActionButtons.tsx",
                lineNumber: 58,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            isArbiter && !isExpired && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$flex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Flex"], {
                direction: "column",
                gap: "3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Text"], {
                        size: "2",
                        color: "gray",
                        style: {
                            marginBottom: "0.5rem"
                        },
                        children: "👨‍⚖️ Với tư cách Trọng tài, bạn có thể xác nhận cam kết:"
                    }, void 0, false, {
                        fileName: "[project]/components/ActionButtons.tsx",
                        lineNumber: 65,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$flex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Flex"], {
                        gap: "3",
                        wrap: "wrap",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$button$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                size: "3",
                                color: "green",
                                onClick: onConfirmCompleted,
                                disabled: isPending,
                                style: {
                                    flex: "1 1 150px"
                                },
                                children: isPending ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$spinners$2f$ClipLoader$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    size: 16,
                                    color: "white"
                                }, void 0, false, {
                                    fileName: "[project]/components/ActionButtons.tsx",
                                    lineNumber: 78,
                                    columnNumber: 33
                                }, ("TURBOPACK compile-time value", void 0)) : "✅ Đã hoàn thành"
                            }, void 0, false, {
                                fileName: "[project]/components/ActionButtons.tsx",
                                lineNumber: 70,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$button$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                size: "3",
                                color: "red",
                                onClick: onConfirmFailed,
                                disabled: isPending,
                                style: {
                                    flex: "1 1 150px"
                                },
                                children: isPending ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$spinners$2f$ClipLoader$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    size: 16,
                                    color: "white"
                                }, void 0, false, {
                                    fileName: "[project]/components/ActionButtons.tsx",
                                    lineNumber: 92,
                                    columnNumber: 33
                                }, ("TURBOPACK compile-time value", void 0)) : "❌ Chưa hoàn thành"
                            }, void 0, false, {
                                fileName: "[project]/components/ActionButtons.tsx",
                                lineNumber: 84,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/ActionButtons.tsx",
                        lineNumber: 69,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Text"], {
                        size: "1",
                        color: "gray",
                        style: {
                            marginTop: "0.5rem"
                        },
                        children: "⚠️ Hành động này không thể hoàn tác. Hãy cân nhắc kỹ trước khi xác nhận!"
                    }, void 0, false, {
                        fileName: "[project]/components/ActionButtons.tsx",
                        lineNumber: 99,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/ActionButtons.tsx",
                lineNumber: 64,
                columnNumber: 17
            }, ("TURBOPACK compile-time value", void 0)),
            isArbiter && isExpired && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$flex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Flex"], {
                direction: "column",
                gap: "3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Text"], {
                        size: "2",
                        color: "red",
                        style: {
                            marginBottom: "0.5rem"
                        },
                        children: "⏰ Cam kết đã hết hạn. Bạn vẫn có thể xác nhận thất bại:"
                    }, void 0, false, {
                        fileName: "[project]/components/ActionButtons.tsx",
                        lineNumber: 108,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$button$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                        size: "3",
                        color: "red",
                        onClick: onConfirmFailed,
                        disabled: isPending,
                        children: isPending ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$spinners$2f$ClipLoader$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            size: 16,
                            color: "white"
                        }, void 0, false, {
                            fileName: "[project]/components/ActionButtons.tsx",
                            lineNumber: 119,
                            columnNumber: 29
                        }, ("TURBOPACK compile-time value", void 0)) : "❌ Xác nhận thất bại"
                    }, void 0, false, {
                        fileName: "[project]/components/ActionButtons.tsx",
                        lineNumber: 112,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/ActionButtons.tsx",
                lineNumber: 107,
                columnNumber: 17
            }, ("TURBOPACK compile-time value", void 0)),
            isExpired && !isArbiter && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$flex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Flex"], {
                direction: "column",
                gap: "3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Text"], {
                        size: "2",
                        color: "orange",
                        style: {
                            marginBottom: "0.5rem"
                        },
                        children: [
                            "⏰ Cam kết đã hết hạn và trọng tài chưa xác nhận.",
                            isOwner && " Tiền của bạn có thể bị claim bởi bất kỳ ai!"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/ActionButtons.tsx",
                        lineNumber: 130,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$button$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                        size: "3",
                        color: "orange",
                        onClick: onClaimExpired,
                        disabled: isPending,
                        children: isPending ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$spinners$2f$ClipLoader$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            size: 16,
                            color: "white"
                        }, void 0, false, {
                            fileName: "[project]/components/ActionButtons.tsx",
                            lineNumber: 142,
                            columnNumber: 29
                        }, ("TURBOPACK compile-time value", void 0)) : "⚡ Claim hết hạn"
                    }, void 0, false, {
                        fileName: "[project]/components/ActionButtons.tsx",
                        lineNumber: 135,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Text"], {
                        size: "1",
                        color: "gray",
                        children: "Tiền sẽ được chuyển đến địa chỉ phạt đã được đặt."
                    }, void 0, false, {
                        fileName: "[project]/components/ActionButtons.tsx",
                        lineNumber: 148,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/ActionButtons.tsx",
                lineNumber: 129,
                columnNumber: 17
            }, ("TURBOPACK compile-time value", void 0)),
            isOwner && !isArbiter && !isExpired && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$flex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Flex"], {
                direction: "column",
                gap: "2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Text"], {
                        size: "2",
                        color: "blue",
                        children: "⏳ Đang chờ trọng tài xác nhận cam kết của bạn."
                    }, void 0, false, {
                        fileName: "[project]/components/ActionButtons.tsx",
                        lineNumber: 157,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Text"], {
                        size: "2",
                        color: "gray",
                        children: "Hãy đảm bảo bạn đã hoàn thành nhiệm vụ và liên hệ trọng tài để xác nhận!"
                    }, void 0, false, {
                        fileName: "[project]/components/ActionButtons.tsx",
                        lineNumber: 160,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/ActionButtons.tsx",
                lineNumber: 156,
                columnNumber: 17
            }, ("TURBOPACK compile-time value", void 0)),
            !isOwner && !isArbiter && !isExpired && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Text"], {
                size: "2",
                color: "gray",
                children: "👀 Bạn chỉ có thể xem cam kết này. Chỉ trọng tài mới có quyền xác nhận."
            }, void 0, false, {
                fileName: "[project]/components/ActionButtons.tsx",
                lineNumber: 168,
                columnNumber: 17
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/ActionButtons.tsx",
        lineNumber: 57,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/components/LoadCommitmentForm.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LoadCommitmentForm",
    ()=>LoadCommitmentForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
/**
 * ============================================================================
 * LOAD COMMITMENT FORM
 * ============================================================================
 * 
 * Form để load một cam kết đã tồn tại
 * 
 * ============================================================================
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$button$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/themes/dist/esm/components/button.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$flex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/themes/dist/esm/components/flex.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/themes/dist/esm/components/text.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$text$2d$field$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__TextField$3e$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/themes/dist/esm/components/text-field.js [app-ssr] (ecmascript) <export * as TextField>");
"use client";
;
;
;
const LoadCommitmentForm = ({ onLoad })=>{
    const [commitmentId, setCommitmentId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const handleSubmit = (e)=>{
        e.preventDefault();
        setError(null);
        if (!commitmentId.trim()) {
            setError("Vui lòng nhập ID cam kết");
            return;
        }
        if (!commitmentId.startsWith("0x")) {
            setError("ID cam kết phải bắt đầu bằng 0x");
            return;
        }
        onLoad(commitmentId.trim());
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
        onSubmit: handleSubmit,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$flex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Flex"], {
            direction: "column",
            gap: "3",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Text"], {
                    size: "3",
                    weight: "medium",
                    children: "🔍 Hoặc xem cam kết đã tồn tại"
                }, void 0, false, {
                    fileName: "[project]/components/LoadCommitmentForm.tsx",
                    lineNumber: 44,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$flex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Flex"], {
                    gap: "2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$text$2d$field$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__TextField$3e$__["TextField"].Root, {
                            style: {
                                flex: 1
                            },
                            type: "text",
                            placeholder: "Nhập ID cam kết (0x...)",
                            value: commitmentId,
                            onChange: (e)=>setCommitmentId(e.target.value)
                        }, void 0, false, {
                            fileName: "[project]/components/LoadCommitmentForm.tsx",
                            lineNumber: 49,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$button$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                            type: "submit",
                            variant: "soft",
                            children: "Xem"
                        }, void 0, false, {
                            fileName: "[project]/components/LoadCommitmentForm.tsx",
                            lineNumber: 56,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/LoadCommitmentForm.tsx",
                    lineNumber: 48,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0)),
                error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Text"], {
                    size: "2",
                    color: "red",
                    children: error
                }, void 0, false, {
                    fileName: "[project]/components/LoadCommitmentForm.tsx",
                    lineNumber: 62,
                    columnNumber: 21
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/components/LoadCommitmentForm.tsx",
            lineNumber: 43,
            columnNumber: 13
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/components/LoadCommitmentForm.tsx",
        lineNumber: 42,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/components/AntiProcrastinationVault.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
/**
 * ============================================================================
 * ANTI-PROCRASTINATION VAULT - MAIN INTEGRATION
 * ============================================================================
 * 
 * Component chính của ứng dụng Anti-Procrastination Vault
 * 
 * Tính năng:
 * - Tạo cam kết mới với IOTA stake
 * - Xem chi tiết cam kết
 * - Trọng tài xác nhận hoàn thành/thất bại
 * - Claim tiền sau khi hết hạn
 * 
 * ============================================================================
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$iota$2f$dapp$2d$kit$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@iota/dapp-kit/dist/esm/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useAntiProcrastination$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useAntiProcrastination.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$button$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/themes/dist/esm/components/button.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$container$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/themes/dist/esm/components/container.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$flex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/themes/dist/esm/components/flex.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$heading$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/themes/dist/esm/components/heading.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/themes/dist/esm/components/text.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$card$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/themes/dist/esm/components/card.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$separator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/themes/dist/esm/components/separator.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$spinners$2f$ClipLoader$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-spinners/ClipLoader.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$CreateCommitmentForm$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/CreateCommitmentForm.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$CommitmentCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/CommitmentCard.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ActionButtons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ActionButtons.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$LoadCommitmentForm$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/LoadCommitmentForm.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
;
const AntiProcrastinationVault = ()=>{
    const currentAccount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$iota$2f$dapp$2d$kit$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCurrentAccount"])();
    const { data, actions, state, commitmentId, isOwner, isArbiter, address } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useAntiProcrastination$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAntiProcrastination"])();
    const isConnected = !!currentAccount;
    // ============================================================================
    // NOT CONNECTED
    // ============================================================================
    if (!isConnected) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "1rem",
                background: "linear-gradient(135deg, var(--gray-a2) 0%, var(--blue-a2) 100%)"
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$card$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                style: {
                    maxWidth: "500px",
                    width: "100%",
                    padding: "2rem"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$flex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Flex"], {
                    direction: "column",
                    align: "center",
                    gap: "4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Text"], {
                            size: "8",
                            children: "🔒"
                        }, void 0, false, {
                            fileName: "[project]/components/AntiProcrastinationVault.tsx",
                            lineNumber: 59,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$heading$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Heading"], {
                            size: "6",
                            align: "center",
                            children: "Anti-Procrastination Vault"
                        }, void 0, false, {
                            fileName: "[project]/components/AntiProcrastinationVault.tsx",
                            lineNumber: 60,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Text"], {
                            size: "3",
                            color: "gray",
                            align: "center",
                            children: "Cam kết chống trì hoãn với IOTA"
                        }, void 0, false, {
                            fileName: "[project]/components/AntiProcrastinationVault.tsx",
                            lineNumber: 63,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$separator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Separator"], {
                            size: "4"
                        }, void 0, false, {
                            fileName: "[project]/components/AntiProcrastinationVault.tsx",
                            lineNumber: 66,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Text"], {
                            align: "center",
                            color: "gray",
                            children: "Kết nối ví IOTA của bạn để bắt đầu tạo cam kết và ép bản thân hoàn thành công việc!"
                        }, void 0, false, {
                            fileName: "[project]/components/AntiProcrastinationVault.tsx",
                            lineNumber: 67,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/AntiProcrastinationVault.tsx",
                    lineNumber: 58,
                    columnNumber: 21
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/components/AntiProcrastinationVault.tsx",
                lineNumber: 57,
                columnNumber: 17
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/components/AntiProcrastinationVault.tsx",
            lineNumber: 49,
            columnNumber: 13
        }, ("TURBOPACK compile-time value", void 0));
    }
    // ============================================================================
    // MAIN VIEW
    // ============================================================================
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            minHeight: "100vh",
            padding: "1rem",
            background: "linear-gradient(135deg, var(--gray-a2) 0%, var(--blue-a2) 100%)"
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$container$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Container"], {
            style: {
                maxWidth: "800px",
                margin: "0 auto"
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$flex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Flex"], {
                    direction: "column",
                    align: "center",
                    gap: "2",
                    style: {
                        marginBottom: "2rem"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Text"], {
                            size: "8",
                            children: "🔒"
                        }, void 0, false, {
                            fileName: "[project]/components/AntiProcrastinationVault.tsx",
                            lineNumber: 89,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$heading$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Heading"], {
                            size: "7",
                            align: "center",
                            children: "Anti-Procrastination Vault"
                        }, void 0, false, {
                            fileName: "[project]/components/AntiProcrastinationVault.tsx",
                            lineNumber: 90,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Text"], {
                            size: "3",
                            color: "gray",
                            align: "center",
                            children: "Đánh vào tâm lý sợ mất tiền để ép bản thân làm việc"
                        }, void 0, false, {
                            fileName: "[project]/components/AntiProcrastinationVault.tsx",
                            lineNumber: 93,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/AntiProcrastinationVault.tsx",
                    lineNumber: 88,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0)),
                !commitmentId ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$flex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Flex"], {
                    direction: "column",
                    gap: "4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$card$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                            style: {
                                padding: "1.5rem"
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$CreateCommitmentForm$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CreateCommitmentForm"], {
                                onSubmit: actions.createCommitment,
                                isPending: state.isPending,
                                error: state.error
                            }, void 0, false, {
                                fileName: "[project]/components/AntiProcrastinationVault.tsx",
                                lineNumber: 103,
                                columnNumber: 29
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/components/AntiProcrastinationVault.tsx",
                            lineNumber: 102,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$card$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                            style: {
                                padding: "1.5rem"
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$LoadCommitmentForm$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LoadCommitmentForm"], {
                                onLoad: actions.loadCommitment
                            }, void 0, false, {
                                fileName: "[project]/components/AntiProcrastinationVault.tsx",
                                lineNumber: 112,
                                columnNumber: 29
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/components/AntiProcrastinationVault.tsx",
                            lineNumber: 111,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$card$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                            style: {
                                padding: "1.5rem",
                                background: "var(--blue-a2)"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$heading$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Heading"], {
                                    size: "4",
                                    style: {
                                        marginBottom: "1rem"
                                    },
                                    children: "📖 Cách hoạt động"
                                }, void 0, false, {
                                    fileName: "[project]/components/AntiProcrastinationVault.tsx",
                                    lineNumber: 117,
                                    columnNumber: 29
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$flex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Flex"], {
                                    direction: "column",
                                    gap: "3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$flex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Flex"], {
                                            gap: "3",
                                            align: "start",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Text"], {
                                                    size: "4",
                                                    children: "1️⃣"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/AntiProcrastinationVault.tsx",
                                                    lineNumber: 122,
                                                    columnNumber: 37
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Text"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                            children: "Tạo cam kết:"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/AntiProcrastinationVault.tsx",
                                                            lineNumber: 124,
                                                            columnNumber: 41
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        " Gửi IOTA vào contract với mô tả nhiệm vụ và deadline."
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/AntiProcrastinationVault.tsx",
                                                    lineNumber: 123,
                                                    columnNumber: 37
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/AntiProcrastinationVault.tsx",
                                            lineNumber: 121,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$flex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Flex"], {
                                            gap: "3",
                                            align: "start",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Text"], {
                                                    size: "4",
                                                    children: "2️⃣"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/AntiProcrastinationVault.tsx",
                                                    lineNumber: 128,
                                                    columnNumber: 37
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Text"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                            children: "Chọn trọng tài:"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/AntiProcrastinationVault.tsx",
                                                            lineNumber: 130,
                                                            columnNumber: 41
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        " Đặt địa chỉ ví của bạn bè/giáo viên làm người xác nhận."
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/AntiProcrastinationVault.tsx",
                                                    lineNumber: 129,
                                                    columnNumber: 37
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/AntiProcrastinationVault.tsx",
                                            lineNumber: 127,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$flex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Flex"], {
                                            gap: "3",
                                            align: "start",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Text"], {
                                                    size: "4",
                                                    children: "3️⃣"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/AntiProcrastinationVault.tsx",
                                                    lineNumber: 134,
                                                    columnNumber: 37
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Text"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                            children: "Hoàn thành:"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/AntiProcrastinationVault.tsx",
                                                            lineNumber: 136,
                                                            columnNumber: 41
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        " Làm việc và báo cho trọng tài khi xong."
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/AntiProcrastinationVault.tsx",
                                                    lineNumber: 135,
                                                    columnNumber: 37
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/AntiProcrastinationVault.tsx",
                                            lineNumber: 133,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$flex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Flex"], {
                                            gap: "3",
                                            align: "start",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Text"], {
                                                    size: "4",
                                                    children: "✅"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/AntiProcrastinationVault.tsx",
                                                    lineNumber: 140,
                                                    columnNumber: 37
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Text"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                            children: "Thành công:"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/AntiProcrastinationVault.tsx",
                                                            lineNumber: 142,
                                                            columnNumber: 41
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        " Trọng tài xác nhận → Nhận lại tiền!"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/AntiProcrastinationVault.tsx",
                                                    lineNumber: 141,
                                                    columnNumber: 37
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/AntiProcrastinationVault.tsx",
                                            lineNumber: 139,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$flex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Flex"], {
                                            gap: "3",
                                            align: "start",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Text"], {
                                                    size: "4",
                                                    children: "❌"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/AntiProcrastinationVault.tsx",
                                                    lineNumber: 146,
                                                    columnNumber: 37
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Text"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                            children: "Thất bại:"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/AntiProcrastinationVault.tsx",
                                                            lineNumber: 148,
                                                            columnNumber: 41
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        " Không hoàn thành hoặc hết hạn → Mất tiền!"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/AntiProcrastinationVault.tsx",
                                                    lineNumber: 147,
                                                    columnNumber: 37
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/AntiProcrastinationVault.tsx",
                                            lineNumber: 145,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/AntiProcrastinationVault.tsx",
                                    lineNumber: 120,
                                    columnNumber: 29
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/AntiProcrastinationVault.tsx",
                            lineNumber: 116,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/AntiProcrastinationVault.tsx",
                    lineNumber: 100,
                    columnNumber: 21
                }, ("TURBOPACK compile-time value", void 0)) : /* Commitment Loaded */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$flex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Flex"], {
                    direction: "column",
                    gap: "4",
                    children: [
                        state.isLoading && !data && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$card$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                            style: {
                                padding: "2rem"
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$flex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Flex"], {
                                justify: "center",
                                align: "center",
                                gap: "3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$spinners$2f$ClipLoader$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        size: 24
                                    }, void 0, false, {
                                        fileName: "[project]/components/AntiProcrastinationVault.tsx",
                                        lineNumber: 161,
                                        columnNumber: 37
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Text"], {
                                        children: "Đang tải cam kết..."
                                    }, void 0, false, {
                                        fileName: "[project]/components/AntiProcrastinationVault.tsx",
                                        lineNumber: 162,
                                        columnNumber: 37
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/AntiProcrastinationVault.tsx",
                                lineNumber: 160,
                                columnNumber: 33
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/components/AntiProcrastinationVault.tsx",
                            lineNumber: 159,
                            columnNumber: 29
                        }, ("TURBOPACK compile-time value", void 0)),
                        state.error && !data && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$card$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                            style: {
                                padding: "1.5rem",
                                background: "var(--red-a3)"
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$flex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Flex"], {
                                direction: "column",
                                gap: "3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Text"], {
                                        style: {
                                            color: "var(--red-11)"
                                        },
                                        children: [
                                            "❌ Lỗi: ",
                                            state.error.message || "Không thể tải cam kết"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/AntiProcrastinationVault.tsx",
                                        lineNumber: 171,
                                        columnNumber: 37
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Text"], {
                                        size: "2",
                                        color: "gray",
                                        children: [
                                            "ID: ",
                                            commitmentId
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/AntiProcrastinationVault.tsx",
                                        lineNumber: 174,
                                        columnNumber: 37
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$button$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "soft",
                                        onClick: actions.clearCommitment,
                                        children: "← Quay lại"
                                    }, void 0, false, {
                                        fileName: "[project]/components/AntiProcrastinationVault.tsx",
                                        lineNumber: 177,
                                        columnNumber: 37
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/AntiProcrastinationVault.tsx",
                                lineNumber: 170,
                                columnNumber: 33
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/components/AntiProcrastinationVault.tsx",
                            lineNumber: 169,
                            columnNumber: 29
                        }, ("TURBOPACK compile-time value", void 0)),
                        data && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$button$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "ghost",
                                    onClick: actions.clearCommitment,
                                    style: {
                                        alignSelf: "flex-start"
                                    },
                                    children: "← Tạo cam kết mới"
                                }, void 0, false, {
                                    fileName: "[project]/components/AntiProcrastinationVault.tsx",
                                    lineNumber: 191,
                                    columnNumber: 33
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$CommitmentCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CommitmentCard"], {
                                    commitment: data,
                                    isOwner: isOwner,
                                    isArbiter: isArbiter,
                                    currentAddress: address
                                }, void 0, false, {
                                    fileName: "[project]/components/AntiProcrastinationVault.tsx",
                                    lineNumber: 200,
                                    columnNumber: 33
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ActionButtons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ActionButtons"], {
                                    commitment: data,
                                    isArbiter: isArbiter,
                                    isOwner: isOwner,
                                    isPending: state.isPending,
                                    onConfirmCompleted: ()=>actions.confirmCompleted(commitmentId),
                                    onConfirmFailed: ()=>actions.confirmFailed(commitmentId),
                                    onClaimExpired: ()=>actions.claimExpired(commitmentId)
                                }, void 0, false, {
                                    fileName: "[project]/components/AntiProcrastinationVault.tsx",
                                    lineNumber: 208,
                                    columnNumber: 33
                                }, ("TURBOPACK compile-time value", void 0)),
                                state.hash && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$card$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                                    style: {
                                        padding: "1rem",
                                        background: "var(--green-a2)"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Text"], {
                                            size: "2",
                                            color: "green",
                                            children: "✅ Giao dịch thành công!"
                                        }, void 0, false, {
                                            fileName: "[project]/components/AntiProcrastinationVault.tsx",
                                            lineNumber: 221,
                                            columnNumber: 41
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Text"], {
                                            size: "1",
                                            style: {
                                                fontFamily: "monospace",
                                                display: "block",
                                                marginTop: "0.5rem",
                                                wordBreak: "break-all"
                                            },
                                            children: [
                                                "Hash: ",
                                                state.hash
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/AntiProcrastinationVault.tsx",
                                            lineNumber: 224,
                                            columnNumber: 41
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/AntiProcrastinationVault.tsx",
                                    lineNumber: 220,
                                    columnNumber: 37
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/AntiProcrastinationVault.tsx",
                    lineNumber: 156,
                    columnNumber: 21
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$flex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Flex"], {
                    justify: "center",
                    style: {
                        marginTop: "3rem",
                        paddingBottom: "2rem"
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$themes$2f$dist$2f$esm$2f$components$2f$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Text"], {
                        size: "1",
                        color: "gray",
                        align: "center",
                        children: "💡 Mẹo: Đặt số tiền đủ lớn để bạn sợ mất, nhưng không quá lớn để ảnh hưởng tài chính!"
                    }, void 0, false, {
                        fileName: "[project]/components/AntiProcrastinationVault.tsx",
                        lineNumber: 241,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/components/AntiProcrastinationVault.tsx",
                    lineNumber: 240,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/components/AntiProcrastinationVault.tsx",
            lineNumber: 86,
            columnNumber: 13
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/components/AntiProcrastinationVault.tsx",
        lineNumber: 81,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = AntiProcrastinationVault;
}),
];

//# sourceMappingURL=_703e0941._.js.map