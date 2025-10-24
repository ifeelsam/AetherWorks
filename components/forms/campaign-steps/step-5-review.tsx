"use client"

import { useState } from "react"
import { useWeb3 } from "@/lib/web3-provider"
import { CampaignService } from "@/lib/campaign-service"
import { EscrowService } from "@/lib/escrow-service"
import type { CampaignBrief } from "@/lib/types"

interface Step5Props {
  data: Partial<CampaignBrief>
  onBack: () => void
  onPublish: () => Promise<void>
}

export default function CampaignStep5({ data, onBack, onPublish }: Step5Props) {
  const { account, publishCampaign, fundEscrow } = useWeb3()
  const [isPublishing, setIsPublishing] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [agreed, setAgreed] = useState(false)
  const [txHash, setTxHash] = useState("")
  const [error, setError] = useState("")

  const handlePublish = async () => {
    if (!account) {
      setError("Please connect your wallet first")
      return
    }

    setIsPublishing(true)
    setError("")

    try {
      // Publish campaign to blockchain
      const campaignTxHash = await publishCampaign(data)
      setTxHash(campaignTxHash)

      // Fund escrow
      const escrowAmount = (data.budgetPerCreator || 0) * (data.creatorsNeeded || 0) * 1.02
      await fundEscrow(escrowAmount.toString(), data.paymentToken || "USDC")

      // Save campaign record
      await CampaignService.publishCampaign(data, account)

      // Create escrow record
      await EscrowService.depositFunds(`campaign_${Date.now()}`, escrowAmount, data.paymentToken || "USDC", account)

      await onPublish()
      setIsPublishing(false)
      setShowSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to publish campaign")
      setIsPublishing(false)
    }
  }

  if (showSuccess) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="border-4 border-black bg-white p-16 max-w-md text-center space-y-6">
          <div className="text-6xl">✓</div>
          <h2 className="space-grotesk text-3xl font-bold">Campaign Published!</h2>
          <p className="text-gray-600">
            Your campaign is now live on-chain. Creators can now discover and submit proposals.
          </p>
          <div className="font-mono text-xs break-all bg-gray-100 p-3 border-2 border-black">{txHash}</div>
          <p className="text-xs text-gray-600">
            <a
              href={`https://basescan.org/tx/${txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              View on Basescan
            </a>
          </p>
          <div className="space-y-3">
            <button className="w-full border-4 border-black bg-black text-white p-4 font-bold hover:shadow-lg">
              Go to Campaign Dashboard
            </button>
            <button className="w-full border-4 border-black bg-white text-black p-4 font-bold hover:bg-gray-50">
              Create Another Campaign
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="space-grotesk text-4xl font-bold">Review Campaign</h1>
        <p className="text-gray-600">Confirm details before publishing to blockchain</p>
      </div>

      {/* Campaign Summary */}
      <div className="border-4 border-black bg-white p-12 space-y-8">
        <div>
          <h3 className="space-grotesk text-2xl font-bold mb-4">Basic Information</h3>
          <div className="space-y-2 text-sm">
            <div>
              <span className="font-semibold">Title:</span> {data.title}
            </div>
            <div>
              <span className="font-semibold">Category:</span> {data.category}
            </div>
            <div>
              <span className="font-semibold">Creators Needed:</span> {data.creatorsNeeded}
            </div>
          </div>
        </div>

        <div className="border-t-4 border-black pt-8">
          <h3 className="space-grotesk text-2xl font-bold mb-4">Budget & Timeline</h3>
          <div className="space-y-2 text-sm">
            <div>
              <span className="font-semibold">Per Creator:</span> {data.budgetPerCreator} {data.paymentToken}
            </div>
            <div>
              <span className="font-semibold">Application Deadline:</span>{" "}
              {data.applicationDeadline?.toString().split("T")[0]}
            </div>
            <div>
              <span className="font-semibold">Content Due:</span> {data.contentDueDate?.toString().split("T")[0]}
            </div>
          </div>
        </div>

        <div className="border-t-4 border-black pt-8">
          <h3 className="space-grotesk text-2xl font-bold mb-4">License Terms</h3>
          <div className="space-y-2 text-sm">
            <div>
              <span className="font-semibold">Type:</span>{" "}
              {data.ownershipType === "license" ? "Non-exclusive usage license" : "Full rights transfer"}
            </div>
            <div>
              <span className="font-semibold">Duration:</span> {data.licenseDuration}
            </div>
            <div>
              <span className="font-semibold">Territory:</span> {data.territory}
            </div>
          </div>
        </div>
      </div>

      {/* Escrow Confirmation */}
      <div className="border-4 border-black bg-green-50 p-6 space-y-3">
        <p className="font-bold">💰 Escrow Wallet Funding</p>
        <p className="text-sm">Current Balance: 3,000 USDC ✓</p>
        <p className="text-sm">
          Required: {((data.budgetPerCreator || 0) * (data.creatorsNeeded || 0) * 1.02).toFixed(0)} {data.paymentToken}
        </p>
        <p className="text-sm text-green-600 font-semibold">Status: ✓ Sufficient funds</p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="border-4 border-red-500 bg-red-50 p-4">
          <p className="text-red-600 font-semibold">Error: {error}</p>
        </div>
      )}

      {/* Checklist */}
      <div className="space-y-3">
        <label className="flex items-start gap-3 cursor-pointer">
          <input type="checkbox" className="mt-1" />
          <span className="text-sm">All campaign details are correct</span>
        </label>
        <label className="flex items-start gap-3 cursor-pointer">
          <input type="checkbox" className="mt-1" />
          <span className="text-sm">License terms are reviewed</span>
        </label>
        <label className="flex items-start gap-3 cursor-pointer">
          <input type="checkbox" className="mt-1" />
          <span className="text-sm">Escrow funds will be locked</span>
        </label>
        <label className="flex items-start gap-3 cursor-pointer">
          <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-1" />
          <span className="text-sm">By publishing, you agree to the Platform Service Agreement and Escrow Terms</span>
        </label>
      </div>

      {/* Navigation */}
      <div className="flex gap-4 pt-8">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 border-4 border-black bg-white text-black p-4 font-space-grotesk font-bold hover:bg-gray-50"
        >
          ← Back to Edit
        </button>
        <button
          onClick={handlePublish}
          disabled={!agreed || isPublishing || !account}
          className="flex-1 border-4 border-black bg-black text-white p-4 font-space-grotesk font-bold hover:shadow-lg disabled:opacity-50"
        >
          {isPublishing ? "Publishing..." : "Publish Campaign to Chain"}
        </button>
      </div>
    </div>
  )
}
