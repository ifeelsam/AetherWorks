"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import OnboardingChecklist from "@/components/onboarding/onboarding-checklist"

export default function BrandOnboardingPage() {
  const router = useRouter()
  const [completedSteps, setCompletedSteps] = useState(0)

  const handleStepComplete = (stepIndex: number) => {
    setCompletedSteps(Math.max(completedSteps, stepIndex + 1))
  }

  const handleAllComplete = () => {
    router.push("/campaigns/create")
  }

  return (
    <main className="min-h-screen w-full bg-white p-8">
      <OnboardingChecklist
        completedSteps={completedSteps}
        onStepComplete={handleStepComplete}
        onAllComplete={handleAllComplete}
      />
    </main>
  )
}
