"use client"

import type React from "react"

import { useState } from "react"
import type { CompanyInfo } from "@/lib/types"

interface CompanyInfoFormProps {
  onSubmit: (data: CompanyInfo) => Promise<void>
  isSubmitting: boolean
}

const INDUSTRIES = ["DeFi / Finance", "NFTs / Gaming", "Infrastructure / Tools", "Consumer Apps", "Other"]

const TEAM_SIZES = ["1-10", "11-50", "51-200", "201-1000", "1000+"]

const COUNTRIES = ["United States", "Canada", "United Kingdom", "Germany", "France", "Other"]

export default function CompanyInfoForm({ onSubmit, isSubmitting }: CompanyInfoFormProps) {
  const [formData, setFormData] = useState<CompanyInfo>({
    name: "",
    website: "",
    industry: "",
    teamSize: "",
    country: "",
    description: "",
    logoUrl: "",
    socialLinks: {},
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [socialLinks, setSocialLinks] = useState<Array<{ platform: string; url: string }>>([])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = "Company name is required"
    if (!formData.website.trim()) newErrors.website = "Website URL is required"
    if (!formData.industry) newErrors.industry = "Industry is required"
    if (!formData.country) newErrors.country = "Country is required"

    // Validate URL
    if (formData.website && !formData.website.startsWith("http")) {
      newErrors.website = "Valid website URL required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    const socialLinksObj = socialLinks.reduce(
      (acc, link) => {
        if (link.url) acc[link.platform] = link.url
        return acc
      },
      {} as Record<string, string>,
    )

    await onSubmit({
      ...formData,
      socialLinks: socialLinksObj,
    })
  }

  const handleInputChange = (field: keyof CompanyInfo, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="space-grotesk text-5xl font-bold">Company Information</h1>
        <p className="text-lg text-gray-600">Basic details about your brand or organization</p>
      </div>

      {/* Form Container */}
      <div className="border-4 border-black bg-white p-12 space-y-8">
        {/* Company Name */}
        <div>
          <label className="form-label required">Company Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            placeholder="Acme Labs"
            className={`brutalist-input w-full ${errors.name ? "error" : ""}`}
          />
          {errors.name && <div className="form-error">❌ {errors.name}</div>}
        </div>

        {/* Website */}
        <div>
          <label className="form-label required">Website URL</label>
          <input
            type="url"
            value={formData.website}
            onChange={(e) => handleInputChange("website", e.target.value)}
            placeholder="https://acme.com"
            className={`brutalist-input w-full ${errors.website ? "error" : ""}`}
          />
          {errors.website && <div className="form-error">❌ {errors.website}</div>}
        </div>

        {/* Industry */}
        <div>
          <label className="form-label required">Industry</label>
          <select
            value={formData.industry}
            onChange={(e) => handleInputChange("industry", e.target.value)}
            className={`brutalist-input w-full ${errors.industry ? "error" : ""}`}
          >
            <option value="">Select an industry</option>
            {INDUSTRIES.map((ind) => (
              <option key={ind} value={ind}>
                {ind}
              </option>
            ))}
          </select>
          {errors.industry && <div className="form-error">❌ {errors.industry}</div>}
        </div>

        {/* Team Size */}
        <div>
          <label className="form-label">Team Size</label>
          <select
            value={formData.teamSize}
            onChange={(e) => handleInputChange("teamSize", e.target.value)}
            className="brutalist-input w-full"
          >
            <option value="">Select team size</option>
            {TEAM_SIZES.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        {/* Country */}
        <div>
          <label className="form-label required">Country of Registration</label>
          <select
            value={formData.country}
            onChange={(e) => handleInputChange("country", e.target.value)}
            className={`brutalist-input w-full ${errors.country ? "error" : ""}`}
          >
            <option value="">Select a country</option>
            {COUNTRIES.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
          {errors.country && <div className="form-error">❌ {errors.country}</div>}
        </div>

        {/* Description */}
        <div>
          <label className="form-label">About Your Brand</label>
          <textarea
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            placeholder="What does your company do? This helps creators understand your brand..."
            className="brutalist-input w-full h-32 resize-none"
          />
          <div className="text-right text-xs text-gray-600 mt-2">{formData.description.length}/500</div>
        </div>

        {/* Logo Upload */}
        <div>
          <label className="form-label">Brand Logo</label>
          <div className="border-4 border-dashed border-black bg-gray-50 p-8 text-center cursor-pointer hover:bg-gray-100 transition-colors">
            <p className="font-semibold">Click to upload or drag and drop</p>
            <p className="text-sm text-gray-600 mt-2">PNG, JPG up to 5MB</p>
          </div>
        </div>

        {/* Social Links */}
        <div>
          <label className="form-label">Social Media</label>
          <div className="space-y-3">
            {socialLinks.map((link, index) => (
              <div key={index} className="flex gap-3">
                <select
                  value={link.platform}
                  onChange={(e) => {
                    const newLinks = [...socialLinks]
                    newLinks[index].platform = e.target.value
                    setSocialLinks(newLinks)
                  }}
                  className="brutalist-input flex-1"
                >
                  <option value="">Select platform</option>
                  <option value="twitter">Twitter</option>
                  <option value="discord">Discord</option>
                  <option value="telegram">Telegram</option>
                  <option value="linkedin">LinkedIn</option>
                </select>
                <input
                  type="url"
                  value={link.url}
                  onChange={(e) => {
                    const newLinks = [...socialLinks]
                    newLinks[index].url = e.target.value
                    setSocialLinks(newLinks)
                  }}
                  placeholder="https://..."
                  className="brutalist-input flex-1"
                />
                <button
                  type="button"
                  onClick={() => setSocialLinks(socialLinks.filter((_, i) => i !== index))}
                  className="border-4 border-black bg-white px-4 hover:bg-gray-50"
                >
                  ×
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => setSocialLinks([...socialLinks, { platform: "", url: "" }])}
              className="text-sm underline font-semibold hover:text-orange-500"
            >
              + Add Social Link
            </button>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          type="button"
          className="flex-1 border-4 border-black bg-white text-black p-4 font-space-grotesk font-bold hover:bg-gray-50 transition-all"
        >
          Back
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 border-4 border-black bg-black text-white p-4 font-space-grotesk font-bold hover:shadow-lg transition-all disabled:opacity-50"
        >
          {isSubmitting ? "Saving..." : "Save & Continue"}
        </button>
      </div>
    </form>
  )
}
