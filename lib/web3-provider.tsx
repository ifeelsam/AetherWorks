"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface Web3ContextType {
  account: string | null
  isConnected: boolean
  balance: string
  isLoading: boolean
  connectWallet: () => Promise<void>
  disconnectWallet: () => void
  publishCampaign: (campaignData: any) => Promise<string>
  fundEscrow: (amount: string, token: string) => Promise<string>
}

const Web3Context = createContext<Web3ContextType | undefined>(undefined)

export function Web3Provider({ children }: { children: React.ReactNode }) {
  const [account, setAccount] = useState<string | null>(null)
  const [balance, setBalance] = useState("0")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Check for existing wallet connection
    const storedAccount = localStorage.getItem("walletAccount")
    if (storedAccount) {
      setAccount(storedAccount)
      // Simulate balance fetch
      setBalance("3000")
    }
  }, [])

  const connectWallet = async () => {
    setIsLoading(true)
    try {
      // Simulate wallet connection
      const mockAccount = `0x${Math.random().toString(16).slice(2, 42)}`
      setAccount(mockAccount)
      localStorage.setItem("walletAccount", mockAccount)
      setBalance("3000")
    } catch (error) {
      console.error("Failed to connect wallet:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const disconnectWallet = () => {
    setAccount(null)
    setBalance("0")
    localStorage.removeItem("walletAccount")
  }

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

      // Update balance
      const newBalance = (Number.parseFloat(balance) - Number.parseFloat(amount)).toString()
      setBalance(newBalance)
      localStorage.setItem("walletBalance", newBalance)

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
        account,
        isConnected: !!account,
        balance,
        isLoading,
        connectWallet,
        disconnectWallet,
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
