"use client"

import type React from "react"

import { useState } from "react"
import type { CampaignBrief } from "@/lib/types"

interface Step1Props {
  data: Partial<CampaignBrief>
  onNext: (data: Partial<CampaignBrief>) => void
}

const CATEGORIES = [
  "Product Reviews & Unboxing",
  "Tutorial & How-To",
  "Testimonial & Social Proof",
  "Brand Story & Culture",
  "Event Coverage",
  "Other",
]

const FORMATS = [
  "Short-form video (< 60s)",
  "Long-form video (1-10 min)",
  "Static image",
  "Carousel (2-10 images)",
  "Written post/thread",
  "Audio/Podcast clip",
]

export default function CampaignStep1({ data, onNext }: Step1Props) {
  const [formData, setFormData] = useState({
    title: data.title || "",
    description: data.description || "",
    category: data.category || "",
    contentFormats: data.contentFormats || [],
    creatorsNeeded: data.creatorsNeeded || 5,
  })

  const handleFormatToggle = (format: string) => {
    setFormData((prev) => ({
      ...prev,
      contentFormats: prev.contentFormats.includes(format)
        ? prev.contentFormats.filter((f) => f !== format)
        : [...prev.contentFormats, format],
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-2">
        <h1 className="space-grotesk text-4xl font-bold">Basic Information</h1>
        <p className="text-gray-600">Campaign overview and requirements</p>
      </div>

      <div className="space-y-6">
        {/* Campaign Title */}
        <div>
          <label className="form-label required">Campaign Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
            placeholder="Product Launch Video Series"
            className="brutalist-input w-full"
            maxLength={100}
          />
          <div className="text-right text-xs text-gray-600 mt-2">{formData.title.length}/100</div>
        </div>

        {/* Description */}
        <div>
          <label className="form-label required">Brief Description</label>
          <p className="form-help-text mb-3">Explain your campaign goals, target audience, and key messaging</p>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
            placeholder="Describe your campaign..."
            className="brutalist-input w-full h-40 resize-none"
            maxLength={2000}
          />
          <div className="text-right text-xs text-gray-600 mt-2">{formData.description.length}/2000</div>
        </div>

        {/* Category */}
        <div>
          <label className="form-label required">Category</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
            className="brutalist-input w-full"
          >
            <option value="">Select a category</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Content Formats */}
        <div>
          <label className="form-label required">Content Format</label>
          <div className="space-y-3">
            {FORMATS.map((format) => (
              <label
                key={format}
                className="flex items-center gap-3 cursor-pointer p-4 border-4 border-black hover:bg-gray-50 transition-colors"
              >
                <input
                  type="checkbox"
                  checked={formData.contentFormats.includes(format)}
                  onChange={() => handleFormatToggle(format)}
                  className="w-5 h-5"
                />
                <span className="font-medium">{format}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Creators Needed */}
        <div>
          <label className="form-label required">How many creators do you need?</label>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setFormData((prev) => ({ ...prev, creatorsNeeded: Math.max(1, prev.creatorsNeeded - 1) }))}
              className="border-4 border-black bg-white w-12 h-12 font-bold text-lg hover:bg-gray-50"
            >
              −
            </button>
            <input
              type="number"
              value={formData.creatorsNeeded}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, creatorsNeeded: Number.parseInt(e.target.value) || 1 }))
              }
              className="brutalist-input w-24 text-center"
              min="1"
              max="50"
            />
            <button
              type="button"
              onClick={() =>
                setFormData((prev) => ({ ...prev, creatorsNeeded: Math.min(50, prev.creatorsNeeded + 1) }))
              }
              className="border-4 border-black bg-white w-12 h-12 font-bold text-lg hover:bg-gray-50"
            >
              +
            </button>
          </div>
          <p className="form-help-text">You'll review all submissions and select your preferred creators</p>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex gap-4 pt-8">
        <button
          type="submit"
          className="flex-1 border-4 border-black bg-black text-white p-4 font-space-grotesk font-bold hover:shadow-lg transition-all"
        >
          Next: Content Details →
        </button>
      </div>
    </form>
  )
}
