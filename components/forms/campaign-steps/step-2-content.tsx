"use client"

import type React from "react"

import { useState } from "react"
import type { CampaignBrief } from "@/lib/types"

interface Step2Props {
  data: Partial<CampaignBrief>
  onNext: (data: Partial<CampaignBrief>) => void
  onBack: () => void
}

export default function CampaignStep2({ data, onNext, onBack }: Step2Props) {
  const [formData, setFormData] = useState({
    brandGuidelines: data.brandGuidelines || "",
    references: data.references || [],
    hashtags: data.hashtags || [],
  })

  const [newHashtag, setNewHashtag] = useState("")

  const handleAddHashtag = () => {
    if (newHashtag.trim()) {
      setFormData((prev) => ({
        ...prev,
        hashtags: [...prev.hashtags, newHashtag],
      }))
      setNewHashtag("")
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-2">
        <h1 className="space-grotesk text-4xl font-bold">Content Requirements</h1>
        <p className="text-gray-600">Specify deliverables and creative guidelines</p>
      </div>

      <div className="space-y-6">
        {/* Brand Guidelines */}
        <div>
          <label className="form-label">Brand Guidelines & Do's/Don'ts</label>
          <textarea
            value={formData.brandGuidelines}
            onChange={(e) => setFormData((prev) => ({ ...prev, brandGuidelines: e.target.value }))}
            placeholder="Tone should be energetic and authentic. Must mention our key features..."
            className="brutalist-input w-full h-32 resize-none"
          />
        </div>

        {/* References */}
        <div>
          <label className="form-label">Reference Examples (Optional)</label>
          <p className="form-help-text mb-3">Share examples of content you like</p>
          <div className="space-y-3">
            {formData.references.map((ref, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="url"
                  value={ref}
                  onChange={(e) => {
                    const newRefs = [...formData.references]
                    newRefs[index] = e.target.value
                    setFormData((prev) => ({ ...prev, references: newRefs }))
                  }}
                  placeholder="https://..."
                  className="brutalist-input flex-1"
                />
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      references: prev.references.filter((_, i) => i !== index),
                    }))
                  }
                  className="border-4 border-black bg-white px-4 hover:bg-gray-50"
                >
                  ×
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => setFormData((prev) => ({ ...prev, references: [...prev.references, ""] }))}
              className="text-sm underline font-semibold hover:text-orange-500"
            >
              + Add Reference URL
            </button>
          </div>
        </div>

        {/* Hashtags */}
        <div>
          <label className="form-label">Required Hashtags/Mentions (Optional)</label>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={newHashtag}
              onChange={(e) => setNewHashtag(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddHashtag())}
              placeholder="Type and press Enter"
              className="brutalist-input flex-1"
            />
            <button
              type="button"
              onClick={handleAddHashtag}
              className="border-4 border-black bg-black text-white px-6 font-bold hover:shadow-lg"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.hashtags.map((tag, index) => (
              <div key={index} className="border-2 border-black bg-white px-3 py-1 flex items-center gap-2">
                <span>{tag}</span>
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      hashtags: prev.hashtags.filter((_, i) => i !== index),
                    }))
                  }
                  className="font-bold hover:text-red-500"
                >
                  ×
                </button>
              </div>
            ))}
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
          Next: Budget & Timeline →
        </button>
      </div>
    </form>
  )
}
