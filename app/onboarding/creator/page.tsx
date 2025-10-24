"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { BrutalistCard } from "@/components/ui/brutalist-card"
import CreatorOnboardingChecklist from "@/components/onboarding/creator-onboarding-checklist"

export default function CreatorOnboardingPage() {
  const router = useRouter()
  const [showChecklist, setShowChecklist] = useState(false)
  const [userStats] = useState({
    totalEarned: 2450,
    campaignsCompleted: 8,
    rating: 4.9,
  })

  if (showChecklist) {
    return <CreatorOnboardingChecklist />
  }

  return (
    <main className="min-h-screen w-full bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-[540px]">
        <BrutalistCard shadow="lg">
          <div className="space-y-8">
            {/* Header */}
            <div className="space-y-4">
              <h1 className="space-grotesk text-4xl font-bold">Welcome back</h1>
              <p className="text-lg text-gray-600">Let's set up your profile</p>
            </div>

            {/* Stats Section - if returning user */}
            <div className="border-4 border-black p-6 space-y-4">
              <h3 className="space-grotesk text-xl font-bold">Your Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Earned:</span>
                  <span className="jetbrains-mono text-2xl font-bold text-green-500">{userStats.totalEarned} USDC</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Campaigns:</span>
                  <span className="font-semibold">{userStats.campaignsCompleted} completed</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Rating:</span>
                  <span className="font-semibold">★★★★★ {userStats.rating}/5.0</span>
                </div>
              </div>
            </div>

            {/* Action Cards */}
            <div className="space-y-6">
              {/* Browse Campaigns Card */}
              <button
                onClick={() => router.push("/campaigns/browse")}
                className="w-full text-left border-4 border-black p-8 space-y-4 hover:bg-green-300 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 cursor-pointer"
              >
                <div className="text-4xl">🎯</div>
                <div>
                  <h3 className="space-grotesk text-2xl font-bold">Browse Campaigns</h3>
                  <p className="text-gray-600 mt-2">Find new opportunities and submit proposals</p>
                </div>
                <div className="text-sm font-semibold text-black">Start Browsing →</div>
              </button>

              {/* Complete Profile Card */}
              <button
                onClick={() => setShowChecklist(true)}
                className="w-full text-left border-4 border-black p-8 space-y-4 hover:bg-yellow-300 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 cursor-pointer"
              >
                <div className="text-4xl">✨</div>
                <div>
                  <h3 className="space-grotesk text-2xl font-bold">Complete Your Profile</h3>
                  <p className="text-gray-600 mt-2">Add portfolio, skills, and verification to win more briefs</p>
                </div>
                <div className="text-sm font-semibold text-black">Set Up Profile →</div>
              </button>
            </div>
          </div>
        </BrutalistCard>
      </div>
    </main>
  )
}
