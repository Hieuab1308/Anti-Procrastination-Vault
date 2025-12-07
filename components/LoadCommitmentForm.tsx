"use client"

/**
 * ============================================================================
 * LOAD COMMITMENT FORM
 * ============================================================================
 * 
 * Form to load an existing commitment
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
            setError("Please enter a commitment ID")
            return
        }

        if (!commitmentId.startsWith("0x")) {
            setError("Commitment ID must start with 0x")
            return
        }

        onLoad(commitmentId.trim())
    }

    return (
        <form onSubmit={handleSubmit}>
            <Flex direction="column" gap="3">
                <Text size="3" weight="medium">
                    🔍 Or view an existing commitment
                </Text>

                <Flex gap="2">
                    <TextField.Root
                        style={{ flex: 1 }}
                        type="text"
                        placeholder="Enter commitment ID (0x...)"
                        value={commitmentId}
                        onChange={(e) => setCommitmentId(e.target.value)}
                    />
                    <Button type="submit" variant="soft">
                        View
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
