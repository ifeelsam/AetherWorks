"use client"

import Link from "next/link"
import type { ApplicationStatus } from "@/lib/types"

interface ApplicationActionsProps {
  status: ApplicationStatus
  onWithdraw: () => void
  campaignTitle: string
}

export default function ApplicationActions({ status, onWithdraw, campaignTitle }: ApplicationActionsProps) {
  if (status === "pending") {
    return (
      <div className="bg-black text-white border-4 border-black p-8">
        <h3 className="space-grotesk text-2xl font-bold mb-4">Available Actions</h3>
        <p className="text-gray-300 mb-6">
          ⏳ Your application is being reviewed by the brand. You'll be notified of any updates.
        </p>
        <div className="flex gap-4">
          <button className="flex-1 border-4 border-white bg-white text-black p-3 font-semibold hover:bg-gray-100 transition-colors">
            Message Brand
          </button>
          <button
            onClick={onWithdraw}
            className="flex-1 border-4 border-red-500 bg-red-500 text-white p-3 font-semibold hover:shadow-[8px_8px_0px_0px_rgba(255,0,0,0.5)] transition-all"
          >
            Withdraw Application
          </button>
        </div>
      </div>
    )
  }

  if (status === "shortlisted") {
    return (
      <div className="bg-black text-white border-4 border-black p-8">
        <h3 className="space-grotesk text-2xl font-bold mb-2">🎉 You've been shortlisted!</h3>
        <p className="text-gray-300 mb-6">
          The brand is interested in your proposal and may reach out with follow-up questions. Keep an eye on your
          messages.
        </p>
        <div className="flex gap-4">
          <button className="flex-1 border-4 border-white bg-white text-black p-3 font-semibold hover:bg-gray-100 transition-colors">
            Message Brand
          </button>
          <button
            onClick={onWithdraw}
            className="flex-1 border-4 border-red-500 bg-red-500 text-white p-3 font-semibold hover:shadow-[8px_8px_0px_0px_rgba(255,0,0,0.5)] transition-all"
          >
            Withdraw Application
          </button>
        </div>
      </div>
    )
  }

  if (status === "accepted") {
    return (
      <div className="bg-green-400 border-4 border-black p-8 space-y-6">
        <h2 className="space-grotesk text-3xl font-bold">✓ Congratulations! You've been selected!</h2>

        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Next Steps:</h3>
          <ol className="space-y-2 text-sm">
            <li>1. Review project agreement</li>
            <li>2. Confirm acceptance</li>
            <li>3. Start milestone 1: Concept submission</li>
          </ol>
        </div>

        <div className="border-4 border-black p-6 bg-white space-y-4">
          <h3 className="font-semibold">Project Agreement</h3>
          <div className="space-y-2 text-sm">
            <p>
              <span className="font-semibold">Campaign:</span> {campaignTitle}
            </p>
            <p>
              <span className="font-semibold">Payment:</span> 500 USDC (via escrow)
            </p>
            <p>
              <span className="font-semibold">Timeline:</span> Nov 15, 2025
            </p>
            <p>
              <span className="font-semibold">License:</span> Non-exclusive, 1 year
            </p>
          </div>
          <button className="text-sm font-semibold underline hover:text-orange-500">View Full Contract</button>
        </div>

        <label className="flex items-start gap-3 cursor-pointer">
          <input type="checkbox" className="w-4 h-4 border-2 border-black mt-1" required />
          <span className="text-sm">
            I have reviewed and agree to the project terms <span className="text-red-600">*</span>
          </span>
        </label>

        <div className="flex gap-4">
          <button className="flex-1 border-4 border-black bg-white text-black p-3 font-semibold hover:bg-gray-100 transition-colors">
            Decline Offer
          </button>
          <button className="flex-1 border-4 border-black bg-black text-white p-3 font-semibold hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all">
            Accept & Start Project →
          </button>
        </div>
      </div>
    )
  }

  if (status === "rejected") {
    return (
      <div className="bg-red-500 text-white border-4 border-black p-8 space-y-6">
        <h2 className="space-grotesk text-3xl font-bold">Application Not Selected</h2>
        <p>Unfortunately, the brand has selected other creators for this campaign.</p>

        <div className="bg-white text-black border-4 border-black p-6">
          <p className="text-sm">
            "We received many strong applications and had to make difficult choices. Your portfolio was great but we
            went with creators who had more DeFi content experience. Keep an eye out for future opportunities!"
          </p>
        </div>

        <div>
          <p className="font-semibold mb-3">Don't let this discourage you! Here's what you can do:</p>
          <ul className="space-y-2 text-sm">
            <li>• Keep building your portfolio</li>
            <li>• Apply to similar campaigns</li>
            <li>• Request feedback from the brand</li>
          </ul>
        </div>

        <div className="flex gap-4">
          <Link
            href="/campaigns/browse"
            className="flex-1 border-4 border-white bg-white text-black p-3 font-semibold hover:bg-gray-100 transition-colors text-center"
          >
            Browse Similar Campaigns
          </Link>
          <Link
            href="/dashboard/creator"
            className="flex-1 border-4 border-white bg-white text-black p-3 font-semibold hover:bg-gray-100 transition-colors text-center"
          >
            Return to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  if (status === "withdrawn") {
    return (
      <div className="bg-gray-400 border-4 border-black p-8 space-y-6">
        <h2 className="space-grotesk text-3xl font-bold">Application Withdrawn</h2>
        <p>You withdrew this application on Oct 22, 2025.</p>
        <p>
          <span className="font-semibold">Reason:</span> Found a better-fit opportunity
        </p>

        <div className="flex gap-4">
          <Link
            href="/campaigns/browse"
            className="flex-1 border-4 border-black bg-white text-black p-3 font-semibold hover:bg-gray-100 transition-colors text-center"
          >
            Browse Other Campaigns
          </Link>
          <Link
            href="/dashboard/creator"
            className="flex-1 border-4 border-black bg-white text-black p-3 font-semibold hover:bg-gray-100 transition-colors text-center"
          >
            Return to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  return null
}
