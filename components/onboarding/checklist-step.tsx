"use client"

import { useState, useRef } from "react"
import { BrutalistButton } from "@/components/ui/brutalist-button"

interface ChecklistStepProps {
  stepNumber: number
  title: string
  description: string
  details: string
  status: "pending" | "in-progress" | "completed"
  isExpanded: boolean
  onExpand: () => void
  onComplete: () => void
}

const INDUSTRIES = ["DeFi / Finance", "NFTs / Gaming", "Infrastructure / Tools", "Consumer Apps", "Other"]
const TEAM_SIZES = ["1-10", "11-50", "51-200", "201-1000", "1000+"]
const COUNTRIES = ["United States", "Canada", "United Kingdom", "Germany", "France", "Other"]

export default function ChecklistStep({
  stepNumber,
  title,
  description,
  details,
  status,
  isExpanded,
  onExpand,
  onComplete,
}: ChecklistStepProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    website: "",
    industry: "",
    teamSize: "",
    country: "",
    description: "",
    logoUrl: "",
    brandAssets: null as File | null,
    brandAssetName: "",
    brandGuidelines: "",
  })
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const borderColor = {
    pending: "border-l-gray-400",
    "in-progress": "border-l-orange-500",
    completed: "border-l-green-400 bg-green-50",
  }[status]

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null
    if (file) {
      // Check if file is a .zip
      if (!file.name.toLowerCase().endsWith('.zip')) {
        setErrors((prev) => ({ ...prev, brandAssets: "Please upload a ZIP file" }))
        return
      }
      
      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, brandAssets: "File size exceeds 10MB limit" }))
        return
      }
      
      setFormData((prev) => ({
        ...prev,
        brandAssets: file,
        brandAssetName: file.name
      }))
      
      // Clear error if it exists
      if (errors.brandAssets) {
        setErrors((prev) => {
          const newErrors = { ...prev }
          delete newErrors.brandAssets
          return newErrors
        })
      }
    }
  }

  const validateForm = () => {
    if (stepNumber === 2) { // Company Information step
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
    else if (stepNumber === 3) { // Brand Assets step
      const newErrors: Record<string, string> = {}
      
      if (!formData.brandAssets) newErrors.brandAssets = "Brand assets ZIP file is required"
      if (!formData.brandGuidelines.trim()) newErrors.brandGuidelines = "Brand guidelines are required"
      
      setErrors(newErrors)
      return Object.keys(newErrors).length === 0
    }
    return true
  }

  const handleAction = async () => {
    setIsLoading(true)
    
    // For Company Information step, validate the form
    if (stepNumber === 2 && status === "in-progress") {
      if (!validateForm()) {
        setIsLoading(false)
        return
      }
      
      // Simulate form submission
      setTimeout(() => {
        onComplete()
        setIsLoading(false)
      }, 1000)
      return
    }
    
    // For Brand Assets step, validate the form
    if (stepNumber === 3 && status === "in-progress") {
      if (!validateForm()) {
        setIsLoading(false)
        return
      }
      
      // Simulate form submission
      setTimeout(() => {
        onComplete()
        setIsLoading(false)
      }, 1000)
      return
    }
    
    // For other steps, just complete them
    setTimeout(() => {
      onComplete()
      setIsLoading(false)
    }, 500)
  }

  // Render company information form for step 2
  const renderCompanyInfoForm = () => {
    if (stepNumber !== 2 || !isExpanded) return null
    
    return (
      <div className="space-y-6 mt-4">
        {/* Company Name */}
        <div>
          <label className="block text-sm font-medium mb-1 required">Company Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            placeholder="Acme Labs"
            className={`brutalist-input w-full ${errors.name ? "border-red-500" : ""}`}
          />
          {errors.name && <div className="text-red-500 text-sm mt-1">❌ {errors.name}</div>}
        </div>

        {/* Website */}
        <div>
          <label className="block text-sm font-medium mb-1 required">Website URL</label>
          <input
            type="url"
            value={formData.website}
            onChange={(e) => handleInputChange("website", e.target.value)}
            placeholder="https://acme.com"
            className={`brutalist-input w-full ${errors.website ? "border-red-500" : ""}`}
          />
          {errors.website && <div className="text-red-500 text-sm mt-1">❌ {errors.website}</div>}
        </div>

        {/* Industry */}
        <div>
          <label className="block text-sm font-medium mb-1 required">Industry</label>
          <select
            value={formData.industry}
            onChange={(e) => handleInputChange("industry", e.target.value)}
            className={`brutalist-input w-full ${errors.industry ? "border-red-500" : ""}`}
          >
            <option value="">Select an industry</option>
            {INDUSTRIES.map((ind) => (
              <option key={ind} value={ind}>
                {ind}
              </option>
            ))}
          </select>
          {errors.industry && <div className="text-red-500 text-sm mt-1">❌ {errors.industry}</div>}
        </div>

        {/* Team Size */}
        <div>
          <label className="block text-sm font-medium mb-1">Team Size</label>
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
          <label className="block text-sm font-medium mb-1 required">Country of Registration</label>
          <select
            value={formData.country}
            onChange={(e) => handleInputChange("country", e.target.value)}
            className={`brutalist-input w-full ${errors.country ? "border-red-500" : ""}`}
          >
            <option value="">Select a country</option>
            {COUNTRIES.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
          {errors.country && <div className="text-red-500 text-sm mt-1">❌ {errors.country}</div>}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1">About Your Brand</label>
          <textarea
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            placeholder="What does your company do? This helps creators understand your brand..."
            className="brutalist-input w-full h-32 resize-none"
          />
          <div className="text-right text-xs text-gray-600 mt-2">{formData.description.length}/500</div>
        </div>
      </div>
    )
  }
  
  // Render brand assets form for step 3
  const renderBrandAssetsForm = () => {
    if (stepNumber !== 3 || !isExpanded) return null
    
    return (
      <div className="space-y-6 mt-4">
        {/* Brand Assets Zip Upload */}
        <div>
          <label className="block text-sm font-medium mb-1 required">Brand Assets (.zip)</label>
          <div className={`border-4 border-black p-4 text-center cursor-pointer transition-all ${errors.brandAssets ? "border-red-500" : ""}`}
               onClick={() => fileInputRef.current?.click()}>
            <input 
              type="file" 
              ref={fileInputRef}
              accept=".zip"
              onChange={handleFileChange}
              className="hidden" 
            />
            {formData.brandAssets ? (
              <div className="flex items-center justify-center space-x-2">
                <svg className="h-6 w-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>{formData.brandAssetName}</span>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-4">
                <svg className="h-8 w-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                </svg>
                <p className="text-sm">Drop your brand assets .zip file here or <span className="underline">browse</span></p>
                <p className="text-xs text-gray-500 mt-1">Max file size: 10MB</p>
              </div>
            )}
          </div>
          {errors.brandAssets && <div className="text-red-500 text-sm mt-1">❌ {errors.brandAssets}</div>}
        </div>

        {/* Brand Guidelines */}
        <div>
          <label className="block text-sm font-medium mb-1 required">Brand Guidelines</label>
          <textarea
            value={formData.brandGuidelines}
            onChange={(e) => handleInputChange("brandGuidelines", e.target.value)}
            placeholder="Provide brief guidelines for creators on how to use your brand assets, colors, and voice..."
            className={`brutalist-input w-full h-32 resize-none ${errors.brandGuidelines ? "border-red-500" : ""}`}
          />
          <div className="text-right text-xs text-gray-600 mt-2">{formData.brandGuidelines.length}/1000</div>
          {errors.brandGuidelines && <div className="text-red-500 text-sm mt-1">❌ {errors.brandGuidelines}</div>}
        </div>
      </div>
    )
  }

  return (
    <div
      className={`checklist-card ${status} border-4 border-black border-l-8 p-8 cursor-pointer transition-all ${borderColor}`}
      onClick={onExpand}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-4">
            <div className="space-grotesk text-2xl font-bold text-gray-600">STEP {stepNumber}</div>
            <div>
              <h3 className="space-grotesk text-2xl font-bold">{title}</h3>
              <p className="text-gray-600 mt-1">{description}</p>
            </div>
          </div>

          {isExpanded && (
            <div className="mt-6 space-y-4 border-t-4 border-black pt-6">
              <p className="text-gray-600">{details}</p>

              {/* Render company info form for step 2 */}
              {renderCompanyInfoForm()}
              
              {/* Render brand assets form for step 3 */}
              {renderBrandAssetsForm()}

              {status === "completed" && (
                <div className="flex items-center gap-2 text-green-600 font-semibold">
                  <span>✓</span>
                  <span>Completed</span>
                </div>
              )}

              {status === "pending" && (
                <BrutalistButton onClick={(e) => {
                  e.stopPropagation();
                  handleAction();
                }} disabled={isLoading} size="md">
                  {isLoading ? "Loading..." : "Start"}
                </BrutalistButton>
              )}

              {status === "in-progress" && (
                <BrutalistButton onClick={(e) => {
                  e.stopPropagation();
                  handleAction();
                }} disabled={isLoading} size="md">
                  {isLoading ? "Saving..." : "Complete Step"}
                </BrutalistButton>
              )}
            </div>
          )}
        </div>

        <div className="ml-4 text-2xl">{status === "completed" ? "✓" : "→"}</div>
      </div>
    </div>
  )
}