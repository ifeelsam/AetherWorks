"use client"

import { useState } from "react"
import ChecklistStep from "./checklist-step"

interface OnboardingChecklistProps {
  completedSteps: number
  onStepComplete: (stepIndex: number) => void
  onAllComplete: () => void
}

const STEPS = [
  {
    title: "Company Information",
    description: "Tell us about your brand",
    details: "Required for compliance",
  },
  {
    title: "KYB Verification",
    description: "Verify business identity",
    details: "1-2 business days approval",
  },
  {
    title: "Fund Wallet",
    description: "Deposit SOL or USDC for escrow",
    details: "Current Balance: 0 SOL",
  },
  {
    title: "Payment Settings",
    description: "Choose default payment token",
    details: "SOL, USDC, or USDT",
  },
  {
    title: "Platform Agreement",
    description: "Review and accept terms",
    details: "Escrow terms & dispute resolution",
  },
]

export default function OnboardingChecklist({
  completedSteps,
  onStepComplete,
  onAllComplete,
}: OnboardingChecklistProps) {
  const [expandedStep, setExpandedStep] = useState(0)
  const progressPercentage = (completedSteps / STEPS.length) * 100

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="space-grotesk text-5xl font-bold">Complete Your Profile</h1>
        <p className="text-lg text-gray-600">Required steps to launch your first campaign</p>
      </div>

      {/* Progress Bar */}
      <div className="border-4 border-black bg-white overflow-hidden h-6">
        <div className="bg-green-400 h-full transition-all duration-300" style={{ width: `${progressPercentage}%` }} />
      </div>

      <div className="text-right text-sm font-semibold">
        {completedSteps}/{STEPS.length}
      </div>

      {/* Checklist Cards */}
      <div className="space-y-6">
        {STEPS.map((step, index) => (
          <ChecklistStep
            key={index}
            stepNumber={index + 1}
            title={step.title}
            description={step.description}
            details={step.details}
            status={index < completedSteps ? "completed" : index === expandedStep ? "in-progress" : "pending"}
            isExpanded={index === expandedStep}
            onExpand={() => setExpandedStep(index)}
            onComplete={() => onStepComplete(index)}
          />
        ))}
      </div>

      {/* CTA Button */}
      <div className="pt-8">
        <button
          onClick={onAllComplete}
          disabled={completedSteps < STEPS.length}
          className={`w-full border-4 border-black p-4 font-space-grotesk font-bold text-lg transition-all ${
            completedSteps === STEPS.length
              ? "bg-black text-white hover:shadow-lg"
              : "bg-gray-300 text-gray-600 cursor-not-allowed"
          }`}
        >
          Create First Campaign
        </button>
      </div>
    </div>
  )
}
