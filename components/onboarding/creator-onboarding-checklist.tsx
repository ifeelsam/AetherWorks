"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import CreatorChecklistStep from "@/components/onboarding/creator-checklist-step"

const CHECKLIST_STEPS = [
  {
    id: 1,
    title: "Basic Information",
    description: "Name, bio, location",
    time: "2 min to complete",
    status: "complete",
  },
  {
    id: 2,
    title: "Skills & Categories",
    description: "Select your content specialties",
    time: "Helps brands discover you",
    status: "todo",
  },
  {
    id: 3,
    title: "Portfolio Samples",
    description: "Upload 3-10 best examples",
    time: "Links to public content accepted",
    status: "todo",
  },
  {
    id: 4,
    title: "Connect Socials",
    description: "Link TikTok, Instagram, YouTube",
    time: "Boost credibility & get stats",
    status: "todo",
  },
  {
    id: 5,
    title: "Payment Setup",
    description: "Choose payment tokens",
    time: "Set up withdrawal method",
    status: "todo",
  },
  {
    id: 6,
    title: "Identity Verification",
    description: "Required for campaigns >$1,000",
    time: "1-2 day verification",
    status: "todo",
  },
]

export default function CreatorOnboardingChecklist() {
  const router = useRouter()
  const [steps, setSteps] = useState(CHECKLIST_STEPS)
  const completedCount = steps.filter((s) => s.status === "complete").length

  const handleSkip = () => {
    router.push("/campaigns/browse")
  }

  const handleComplete = () => {
    router.push("/creator/profile")
  }

  return (
    <main className="min-h-screen w-full bg-white p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="space-grotesk text-5xl md:text-6xl font-bold mb-4">Build Your Profile</h1>
              <p className="text-lg text-gray-600">Stand out to brands with a complete creator profile</p>
            </div>
            <button
              onClick={handleSkip}
              className="text-sm font-semibold underline hover:text-orange-500 transition-colors"
            >
              Skip for now →
            </button>
          </div>

          {/* Progress Bar */}
          <div className="border-4 border-black p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold">Progress</span>
              <span className="text-sm font-semibold">
                {completedCount}/{steps.length}
              </span>
            </div>
            <div className="w-full bg-gray-200 h-2 border-2 border-black">
              <div
                className="h-full bg-green-500 transition-all duration-300"
                style={{ width: `${(completedCount / steps.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Checklist Steps */}
        <div className="space-y-6 mb-12">
          {steps.map((step) => (
            <CreatorChecklistStep key={step.id} step={step} />
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={handleSkip}
            className="flex-1 border-4 border-black p-4 font-semibold hover:bg-gray-100 transition-colors"
          >
            Save & Continue Later
          </button>
          <button
            onClick={handleComplete}
            className="flex-1 border-4 border-black bg-black text-white p-4 font-semibold hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all"
          >
            Complete Setup →
          </button>
        </div>
      </div>
    </main>
  )
}
