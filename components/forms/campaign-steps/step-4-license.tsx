"use client"

import type React from "react"

import { useState } from "react"
import type { CampaignBrief } from "@/lib/types"

interface Step4Props {
  data: Partial<CampaignBrief>
  onNext: (data: Partial<CampaignBrief>) => void
  onBack: () => void
}

const USAGE_OPTIONS = [
  "Organic social media posts",
  "Paid advertising (Meta, TikTok, Google)",
  "Website & landing pages",
  "Email marketing",
  "Print materials",
  "Retail & POS displays",
]

export default function CampaignStep4({ data, onNext, onBack }: Step4Props) {
  const [formData, setFormData] = useState({
    ownershipType: data.ownershipType || "license",
    usageRights: data.usageRights || [],
    territory: data.territory || "worldwide",
    exclusivity: data.exclusivity || "non-exclusive",
    allowModifications: data.allowModifications !== undefined ? data.allowModifications : true,
  })

  const handleUsageToggle = (usage: string) => {
    setFormData((prev) => ({
      ...prev,
      usageRights: prev.usageRights.includes(usage)
        ? prev.usageRights.filter((u) => u !== usage)
        : [...prev.usageRights, usage],
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-2">
        <h1 className="space-grotesk text-4xl font-bold">License & Rights</h1>
        <p className="text-gray-600">Define content ownership and usage rights</p>
      </div>

      {/* Warning Box */}
      <div className="border-4 border-orange-500 bg-orange-50 p-6">
        <p className="font-semibold">⚠️ License terms are encoded on-chain and legally binding. Review carefully.</p>
      </div>

      <div className="space-y-6">
        {/* Ownership Type */}
        <div>
          <label className="form-label required">Content Ownership</label>
          <div className="space-y-3">
            <label className="border-4 border-black p-6 cursor-pointer hover:bg-gray-50 transition-colors">
              <input
                type="radio"
                checked={formData.ownershipType === "license"}
                onChange={() => setFormData((prev) => ({ ...prev, ownershipType: "license" }))}
                className="mr-3"
              />
              <span className="font-bold">Creator Retains Ownership (License to Use)</span>
              <p className="text-sm text-gray-600 mt-2">
                You receive usage rights. Creator keeps copyright. More affordable, common for UGC.
              </p>
              <p className="text-xs text-green-600 mt-2">Most Popular</p>
            </label>

            <label className="border-4 border-black p-6 cursor-pointer hover:bg-gray-50 transition-colors">
              <input
                type="radio"
                checked={formData.ownershipType === "full-rights"}
                onChange={() => setFormData((prev) => ({ ...prev, ownershipType: "full-rights" }))}
                className="mr-3"
              />
              <span className="font-bold">Full Rights Transfer (Work for Hire)</span>
              <p className="text-sm text-gray-600 mt-2">
                You own all rights to content. Creator waives copyright claims. Higher cost, exclusive control.
              </p>
            </label>
          </div>
        </div>

        {/* Usage Rights */}
        <div>
          <label className="form-label required">Permitted Usage</label>
          <div className="space-y-2">
            {USAGE_OPTIONS.map((usage) => (
              <label
                key={usage}
                className="flex items-center gap-3 cursor-pointer p-4 border-4 border-black hover:bg-gray-50"
              >
                <input
                  type="checkbox"
                  checked={formData.usageRights.includes(usage)}
                  onChange={() => handleUsageToggle(usage)}
                  className="w-5 h-5"
                />
                <span>{usage}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Territory */}
        <div>
          <label className="form-label required">Geographic Rights</label>
          <div className="space-y-2">
            <label className="flex items-center gap-3">
              <input
                type="radio"
                checked={formData.territory === "worldwide"}
                onChange={() => setFormData((prev) => ({ ...prev, territory: "worldwide" }))}
              />
              <span>Worldwide</span>
            </label>
            <label className="flex items-center gap-3">
              <input
                type="radio"
                checked={formData.territory === "specific"}
                onChange={() => setFormData((prev) => ({ ...prev, territory: "specific" }))}
              />
              <span>Specific countries/regions</span>
            </label>
          </div>
        </div>

        {/* Exclusivity */}
        <div>
          <label className="form-label required">Exclusivity Terms</label>
          <div className="space-y-2">
            <label className="flex items-center gap-3">
              <input
                type="radio"
                checked={formData.exclusivity === "non-exclusive"}
                onChange={() => setFormData((prev) => ({ ...prev, exclusivity: "non-exclusive" }))}
              />
              <span>Non-exclusive - Creator can work with competitors</span>
            </label>
            <label className="flex items-center gap-3">
              <input
                type="radio"
                checked={formData.exclusivity === "category"}
                onChange={() => setFormData((prev) => ({ ...prev, exclusivity: "category" }))}
              />
              <span>Exclusive (Category) - Creator cannot create similar content for competitors</span>
            </label>
            <label className="flex items-center gap-3">
              <input
                type="radio"
                checked={formData.exclusivity === "full"}
                onChange={() => setFormData((prev) => ({ ...prev, exclusivity: "full" }))}
              />
              <span>Fully Exclusive - Creator cannot create any content for other brands</span>
            </label>
          </div>
        </div>

        {/* Modifications */}
        <div>
          <label className="form-label required">Can you edit the content?</label>
          <div className="space-y-2">
            <label className="flex items-center gap-3">
              <input
                type="radio"
                checked={formData.allowModifications === true}
                onChange={() => setFormData((prev) => ({ ...prev, allowModifications: true }))}
              />
              <span>Yes, we can edit/adapt the content</span>
            </label>
            <label className="flex items-center gap-3">
              <input
                type="radio"
                checked={formData.allowModifications === false}
                onChange={() => setFormData((prev) => ({ ...prev, allowModifications: false }))}
              />
              <span>No modifications allowed</span>
            </label>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex gap-4 pt-8">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 border-4 border-black bg-white text-black p-4 font-space-grotesk font-bold hover:bg-gray-50"
        >
          ← Back
        </button>
        <button
          type="submit"
          className="flex-1 border-4 border-black bg-black text-white p-4 font-space-grotesk font-bold hover:shadow-lg"
        >
          Next: Review & Publish →
        </button>
      </div>
    </form>
  )
}
