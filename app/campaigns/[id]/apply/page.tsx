"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import ApplicationForm from "@/components/forms/application-form"

export default function ApplyCampaignPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isSubmitted, setIsSubmitted] = useState(false)

  if (isSubmitted) {
    return (
      <main className="min-h-screen w-full bg-white flex items-center justify-center p-4">
        <div className="max-w-md w-full border-4 border-black p-12 text-center space-y-6">
          <div className="text-5xl">✓</div>
          <h1 className="space-grotesk text-4xl font-bold">Application Submitted!</h1>
          <p className="text-gray-700">Your proposal has been sent to DeFi Protocol for review.</p>
          <div className="border-2 border-black p-4 bg-gray-50">
            <p className="jetbrains-mono text-sm font-mono">Transaction: 0x7a3b...9f2c</p>
            <button className="text-sm font-semibold underline hover:text-orange-500 mt-2">View on Solscan</button>
          </div>
          <div className="space-y-2 text-sm text-gray-700">
            <p className="font-bold">What happens next:</p>
            <ol className="list-decimal list-inside space-y-1">
              <li>Brand reviews your application</li>
              <li>You'll be notified if selected</li>
              <li>Expected response: 24-48 hours</li>
            </ol>
          </div>
          <div className="flex gap-4 pt-4">
            <button
              onClick={() => router.push("/dashboard/creator")}
              className="flex-1 border-4 border-black bg-black text-white p-3 font-semibold hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all"
            >
              View My Applications
            </button>
            <button
              onClick={() => router.push("/campaigns/browse")}
              className="flex-1 border-4 border-black p-3 font-semibold hover:bg-gray-100 transition-colors"
            >
              Browse More
            </button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen w-full bg-black flex items-center justify-center p-4">
      <ApplicationForm campaignId={params.id} onSubmit={() => setIsSubmitted(true)} />
    </main>
  )
}
