"use client"

import { useState } from "react"
import { BrutalistCard } from "@/components/ui/brutalist-card"

interface AuthCardProps {
  onAuthSuccess: (walletAddress: string, email?: string) => void
}

export default function AuthCard({ onAuthSuccess }: AuthCardProps) {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleWalletConnect = async () => {
    setIsLoading(true)
    // Simulate wallet connection
    const mockWalletAddress = `0x${Math.random().toString(16).slice(2, 10)}`
    setTimeout(() => {
      onAuthSuccess(mockWalletAddress, email)
      setIsLoading(false)
    }, 500)
  }

  return (
    <BrutalistCard shadow="lg">
      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="space-grotesk text-4xl font-bold">Start Creating</h1>
            <p className="text-lg text-gray-600">Connect your wallet to post campaigns and manage briefs on-chain.</p>
          </div>
        </div>

        {/* Email Input */}
        <div className="space-y-2">
          <label className="form-label">Email (Optional)</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="brutalist-input w-full"
          />
        </div>

        {/* Auth Methods */}
        <div className="space-y-3">
          <button
            onClick={handleWalletConnect}
            disabled={isLoading}
            className="w-full border-4 border-black bg-black text-white p-4 font-space-grotesk font-bold text-base hover:bg-gray-900 transition-all disabled:opacity-50"
          >
            {isLoading ? "Connecting..." : "Connect Wallet"}
          </button>

          <button className="w-full border-4 border-black bg-white text-black p-4 font-space-grotesk font-bold text-base hover:bg-gray-50 transition-all">
            Continue with Email
          </button>

          <button className="w-full border-4 border-black bg-white text-black p-4 font-space-grotesk font-bold text-base hover:bg-gray-50 transition-all">
            Continue with Google
          </button>
        </div>

        {/* Security Notice */}
        <div className="border-l-4 border-black bg-gray-50 p-4 space-y-1">
          <p className="font-semibold text-sm">Secured by Privy</p>
          <p className="text-xs text-gray-600">SOC 2 Type II Certified</p>
          <p className="text-xs text-gray-600">Your keys, your custody</p>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600">
          By connecting, you agree to{" "}
          <a href="#" className="underline font-semibold">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="underline font-semibold">
            Privacy Policy
          </a>
        </p>
      </div>
    </BrutalistCard>
  )
}
