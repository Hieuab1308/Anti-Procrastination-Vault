"use client"

/**
 * ============================================================================
 * LOAD COMMITMENT FORM
 * ============================================================================
 * 
 * Form để load một cam kết đã tồn tại
 * 
 * ============================================================================
 */

import { useState } from "react"
import { Button, Flex, Text, TextField } from "@radix-ui/themes"

interface LoadCommitmentFormProps {
    onLoad: (commitmentId: string) => void
}

export const LoadCommitmentForm = ({ onLoad }: LoadCommitmentFormProps) => {
    const [commitmentId, setCommitmentId] = useState("")
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)

        if (!commitmentId.trim()) {
            setError("Vui lòng nhập ID cam kết")
            return
        }

        if (!commitmentId.startsWith("0x")) {
            setError("ID cam kết phải bắt đầu bằng 0x")
            return
        }

        onLoad(commitmentId.trim())
    }

    return (
        <form onSubmit={handleSubmit}>
            <Flex direction="column" gap="3">
                <Text size="3" weight="medium">
                    🔍 Hoặc xem cam kết đã tồn tại
                </Text>

                <Flex gap="2">
                    <TextField.Root
                        style={{ flex: 1 }}
                        type="text"
                        placeholder="Nhập ID cam kết (0x...)"
                        value={commitmentId}
                        onChange={(e) => setCommitmentId(e.target.value)}
                    />
                    <Button type="submit" variant="soft">
                        Xem
                    </Button>
                </Flex>

                {error && (
                    <Text size="2" color="red">
                        {error}
                    </Text>
                )}
            </Flex>
        </form>
    )
}
