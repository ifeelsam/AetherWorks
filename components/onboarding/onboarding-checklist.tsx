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
    title: "Connect Your Wallet",
    description: "Set up your wallet for transactions",
    details: "Connect your MetaMask or other Web3 wallet to enable secure transactions on AetherWorks. We support Base Sepolia for testing and Base mainnet for production. Make sure your wallet is properly configured for the correct network.",
  },
  {
    title: "Company Information",
    description: "Tell us about your brand",
    details: "Add your company name, website, industry, and contact information. This helps creators understand who they're working with and establishes your brand identity on AetherWorks.",
  },
  {
    title: "Brand Assets",
    description: "Upload your logo and brand guidelines",
    details: "Help creators understand your visual identity by uploading your logo, brand colors, and style guide. This ensures all content created matches your brand's aesthetic.",
  },
  {
    title: "KYB Verification (Optional)",
    description: "Verify business identity",
    details: "Optional: Complete our Know Your Business (KYB) process to verify your company's legitimacy and earn a verified badge. This helps build trust with creators, but you can skip this step and complete it later. Approval typically takes 1-2 business days.",
  },
  {
    title: "Payment Settings",
    description: "Choose default payment options",
    details: "Select your preferred payment tokens (ETH, USDC), set default payment terms, and configure automatic payments. This streamlines your campaign launch process.",
  },
  {
    title: "License Preferences",
    description: "Define your content licensing terms",
    details: "Set up your preferred content licensing terms for UGC campaigns. Define usage rights, exclusivity options, and attribution requirements that will become part of your smart contracts.",
  },
  {
    title: "Platform Agreement",
    description: "Review and accept terms",
    details: "Review AetherWorks' platform terms, escrow conditions, and dispute resolution process. This legal agreement governs all transactions on the platform.",
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