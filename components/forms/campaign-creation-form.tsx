"use client"

import { useState } from "react"
import type { CampaignBrief } from "@/lib/types"
import CampaignStep1 from "./campaign-steps/step-1-basic"
import CampaignStep2 from "./campaign-steps/step-2-content"
import CampaignStep3 from "./campaign-steps/step-3-budget"
import CampaignStep4 from "./campaign-steps/step-4-license"
import CampaignStep5 from "./campaign-steps/step-5-review"

const STEPS = ["Basic Info", "Content Details", "Budget & Timeline", "License Terms", "Review & Publish"]

export default function CampaignCreationForm() {
  const [currentStep, setCurrentStep] = useState(0)
  const [campaignData, setCampaignData] = useState<Partial<CampaignBrief>>({
    contentFormats: [],
    usageRights: [],
    milestones: [],
  })

  const handleNext = (stepData: Partial<CampaignBrief>) => {
    setCampaignData((prev) => ({ ...prev, ...stepData }))
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handlePublish = async () => {
    // Save campaign to localStorage for now
    localStorage.setItem("campaign", JSON.stringify(campaignData))
    console.log("Campaign published:", campaignData)
    // Show success modal
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-80 bg-black text-white p-8 fixed left-0 top-0 bottom-0 overflow-y-auto">
        <h2 className="space-grotesk text-2xl font-bold mb-8">Campaign Brief</h2>

        <div className="space-y-4">
          {STEPS.map((step, index) => (
            <div
              key={index}
              className={`stepper-step ${index === currentStep ? "active" : ""} ${index < currentStep ? "completed" : ""} ${index > currentStep ? "pending" : ""}`}
            >
              <div className="w-6 h-6 flex items-center justify-center border-2 border-white rounded-full text-sm font-bold">
                {index < currentStep ? "✓" : index + 1}
              </div>
              <span className="text-sm">{step}</span>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-700 space-y-2">
          <p className="text-xs text-gray-400">Auto-saving draft</p>
          <p className="text-xs text-gray-500">Last saved: 2 min ago</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-80 p-16">
        <div className="max-w-3xl">
          {currentStep === 0 && <CampaignStep1 data={campaignData} onNext={handleNext} />}
          {currentStep === 1 && <CampaignStep2 data={campaignData} onNext={handleNext} onBack={handleBack} />}
          {currentStep === 2 && <CampaignStep3 data={campaignData} onNext={handleNext} onBack={handleBack} />}
          {currentStep === 3 && <CampaignStep4 data={campaignData} onNext={handleNext} onBack={handleBack} />}
          {currentStep === 4 && <CampaignStep5 data={campaignData} onBack={handleBack} onPublish={handlePublish} />}
        </div>
      </div>
    </div>
  )
}
