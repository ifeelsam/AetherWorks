"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { config } from './wagmi-config'

// Create a React-Query client
const queryClient = new QueryClient()

interface Web3ContextType {
  publishCampaign: (campaignData: any) => Promise<string>
  fundEscrow: (amount: string, token: string) => Promise<string>
}

const Web3Context = createContext<Web3ContextType | undefined>(undefined)

function InnerWeb3Provider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false)
  
  const publishCampaign = async (campaignData: any): Promise<string> => {
    setIsLoading(true)
    try {
      // Simulate campaign publishing to blockchain
      const campaignId = `campaign_${Date.now()}`
      const txHash = `0x${Math.random().toString(16).slice(2, 66)}`

      // Store campaign on-chain (simulated)
      const campaignRecord = {
        id: campaignId,
        ...campaignData,
        publishedAt: new Date().toISOString(),
        txHash,
        status: "active",
      }

      localStorage.setItem(`campaign_${campaignId}`, JSON.stringify(campaignRecord))

      return txHash
    } catch (error) {
      console.error("Failed to publish campaign:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const fundEscrow = async (amount: string, token: string): Promise<string> => {
    setIsLoading(true)
    try {
      // Simulate escrow funding
      const txHash = `0x${Math.random().toString(16).slice(2, 66)}`
      return txHash
    } catch (error) {
      console.error("Failed to fund escrow:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Web3Context.Provider
      value={{
        publishCampaign,
        fundEscrow,
      }}
    >
      {children}
    </Web3Context.Provider>
  )
}

export function useWeb3() {
  const context = useContext(Web3Context)
  if (!context) {
    throw new Error("useWeb3 must be used within Web3Provider")
  }
  return context
}

// Main provider that wraps the app with Wagmi
export function Web3Provider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <InnerWeb3Provider>{children}</InnerWeb3Provider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}