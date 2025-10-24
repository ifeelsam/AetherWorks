"use client"

import { useState, useEffect } from "react"
import { BrutalistCard } from "@/components/ui/brutalist-card"
import { useWeb3 } from "@/lib/web3-provider"

interface AuthCardProps {
  onAuthSuccess: (walletAddress: string, email?: string) => void
}

export default function AuthCard({ onAuthSuccess }: AuthCardProps) {
  const [email, setEmail] = useState("")
  const [showEmailInput, setShowEmailInput] = useState(false)
  const { connectWallet, account, isConnected, connectingWallet } = useWeb3()

  const handleWalletConnect = async () => {
    await connectWallet()
  }

  const handleContinue = () => {
    if (account) {
      onAuthSuccess(account, email)
    }
  }

  // When wallet is connected, show the email input
  useEffect(() => {
    if (isConnected && account) {
      setShowEmailInput(true)
    }
  }, [isConnected, account])

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

        {/* Auth Methods */}
        {!showEmailInput ? (
          <div className="space-y-3">
            <button
              onClick={handleWalletConnect}
              disabled={connectingWallet}
              className="w-full border-4 border-black bg-black text-white p-4 font-space-grotesk font-bold text-base hover:bg-gray-900 transition-all disabled:opacity-50"
            >
              {connectingWallet ? "Connecting..." : "Connect Wallet"}
            </button>
          </div>
        ) : (
          <>
            {/* Connected Wallet */}
            <div className="space-y-2">
              <label className="form-label">Connected Wallet</label>
              <div className="brutalist-input w-full p-4 bg-gray-100 flex items-center justify-between">
                <div className="font-mono text-sm truncate">{account}</div>
                <div className="bg-green-100 text-green-800 px-2 py-1 text-xs font-semibold rounded">Connected</div>
              </div>
            </div>

            {/* Email Input */}
            <div className="space-y-2">
              <label className="form-label">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="brutalist-input w-full"
              />
            </div>

            {/* Continue Button */}
            <button
              onClick={handleContinue}
              className="w-full border-4 border-black bg-black text-white p-4 font-space-grotesk font-bold text-base hover:bg-gray-900 transition-all"
            >
              Continue
            </button>
          </>
        )}

        {/* Security Notice */}
        <div className="border-l-4 border-black bg-gray-50 p-4 space-y-1">
          <p className="font-semibold text-sm">Secured by Blockchain</p>
          <p className="text-xs text-gray-600">Connect with Base Sepolia</p>
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