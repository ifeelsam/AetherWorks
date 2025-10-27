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
const PAYMENT_TOKENS = ["ETH", "USDC", "DAI", "USDT"]
const PAYMENT_TERMS = ["On Completion", "Milestone-Based", "Upfront + Completion", "Weekly", "Monthly"]
const LICENSE_TYPES = ["Exclusive", "Non-Exclusive", "Time-Limited Exclusive"]
const LICENSE_DURATIONS = ["30 Days", "90 Days", "180 Days", "1 Year", "2 Years", "Perpetual"]

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
    // Company Information
    name: "",
    website: "",
    industry: "",
    teamSize: "",
    country: "",
    description: "",
    logoUrl: "",
    // Brand Assets
    brandAssets: null as File | null,
    brandAssetName: "",
    brandGuidelines: "",
    // Payment Settings
    preferredToken: "",
    defaultPaymentTerms: "",
    autoPayEnabled: false,
    minPayment: "",
    maxBudget: "",
    // License Preferences
    licenseType: "",
    licenseDuration: "",
    attributionRequired: false,
    commercialUse: false,
    editRights: false,
    licenseNotes: "",
    // Platform Agreement
    termsAccepted: false,
    disputeResolutionAccepted: false,
    escrowTermsAccepted: false,
    privacyPolicyAccepted: false,
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
  
  const handleToggle = (field: string) => {
    setFormData((prev) => ({ ...prev, [field]: !prev[field as keyof typeof prev] }))
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
    else if (stepNumber === 4) { // KYB Verification (Optional) step
      // This step is optional, so no validation required
      return true
    }
    else if (stepNumber === 5) { // Payment Settings step
      const newErrors: Record<string, string> = {}
      
      if (!formData.preferredToken) newErrors.preferredToken = "Please select a token"
      if (!formData.defaultPaymentTerms) newErrors.defaultPaymentTerms = "Please select payment terms"
      
      // Validate minimum payment is a number
      if (formData.minPayment && isNaN(parseFloat(formData.minPayment))) {
        newErrors.minPayment = "Please enter a valid amount"
      }
      
      // Validate maximum budget is a number
      if (formData.maxBudget && isNaN(parseFloat(formData.maxBudget))) {
        newErrors.maxBudget = "Please enter a valid amount"
      }
      
      setErrors(newErrors)
      return Object.keys(newErrors).length === 0
    }
    else if (stepNumber === 6) { // License Preferences step
      const newErrors: Record<string, string> = {}
      
      if (!formData.licenseType) newErrors.licenseType = "Please select a license type"
      if (!formData.licenseDuration) newErrors.licenseDuration = "Please select a duration"
      
      setErrors(newErrors)
      return Object.keys(newErrors).length === 0
    }
    else if (stepNumber === 7) { // Platform Agreement step
      const newErrors: Record<string, string> = {}
      
      if (!formData.termsAccepted) newErrors.termsAccepted = "You must accept the terms of service"
      if (!formData.disputeResolutionAccepted) newErrors.disputeResolutionAccepted = "You must accept the dispute resolution policy"
      if (!formData.escrowTermsAccepted) newErrors.escrowTermsAccepted = "You must accept the escrow terms"
      if (!formData.privacyPolicyAccepted) newErrors.privacyPolicyAccepted = "You must accept the privacy policy"
      
      setErrors(newErrors)
      return Object.keys(newErrors).length === 0
    }
    return true
  }

  const handleAction = async () => {
    setIsLoading(true)
    
    // For steps that require validation
    if (status === "in-progress" && 
        (stepNumber === 2 || // Company Information
         stepNumber === 3 || // Brand Assets 
         stepNumber === 5 || // Payment Settings
         stepNumber === 6 || // License Preferences
         stepNumber === 7    // Platform Agreement
        )) {
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
    
    // For optional steps or steps without forms, just complete them
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
  
  // Render payment settings form for step 5
  const renderPaymentSettingsForm = () => {
    if (stepNumber !== 5 || !isExpanded) return null
    
    return (
      <div className="space-y-6 mt-4">
        {/* Preferred Token */}
        <div>
          <label className="block text-sm font-medium mb-1 required">Preferred Payment Token</label>
          <select
            value={formData.preferredToken}
            onChange={(e) => handleInputChange("preferredToken", e.target.value)}
            className={`brutalist-input w-full ${errors.preferredToken ? "border-red-500" : ""}`}
          >
            <option value="">Select a token</option>
            {PAYMENT_TOKENS.map((token) => (
              <option key={token} value={token}>
                {token}
              </option>
            ))}
          </select>
          {errors.preferredToken && <div className="text-red-500 text-sm mt-1">❌ {errors.preferredToken}</div>}
          <p className="text-xs text-gray-500 mt-1">This will be the default payment method for all campaigns</p>
        </div>

        {/* Default Payment Terms */}
        <div>
          <label className="block text-sm font-medium mb-1 required">Default Payment Terms</label>
          <select
            value={formData.defaultPaymentTerms}
            onChange={(e) => handleInputChange("defaultPaymentTerms", e.target.value)}
            className={`brutalist-input w-full ${errors.defaultPaymentTerms ? "border-red-500" : ""}`}
          >
            <option value="">Select payment terms</option>
            {PAYMENT_TERMS.map((terms) => (
              <option key={terms} value={terms}>
                {terms}
              </option>
            ))}
          </select>
          {errors.defaultPaymentTerms && <div className="text-red-500 text-sm mt-1">❌ {errors.defaultPaymentTerms}</div>}
        </div>

        {/* Min/Max Amounts */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Minimum Payment</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500">$</span>
              </div>
              <input
                type="text"
                value={formData.minPayment}
                onChange={(e) => handleInputChange("minPayment", e.target.value)}
                placeholder="100"
                className={`brutalist-input w-full pl-8 ${errors.minPayment ? "border-red-500" : ""}`}
              />
            </div>
            {errors.minPayment && <div className="text-red-500 text-sm mt-1">❌ {errors.minPayment}</div>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Maximum Budget</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500">$</span>
              </div>
              <input
                type="text"
                value={formData.maxBudget}
                onChange={(e) => handleInputChange("maxBudget", e.target.value)}
                placeholder="5000"
                className={`brutalist-input w-full pl-8 ${errors.maxBudget ? "border-red-500" : ""}`}
              />
            </div>
            {errors.maxBudget && <div className="text-red-500 text-sm mt-1">❌ {errors.maxBudget}</div>}
          </div>
        </div>

        {/* Auto-Pay Toggle */}
        <div className="mt-2">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.autoPayEnabled}
              onChange={() => handleToggle("autoPayEnabled")}
              className="h-5 w-5 brutalist-checkbox"
            />
            <span className="text-sm font-medium">Enable automatic payments for completed tasks</span>
          </label>
          <p className="text-xs text-gray-500 mt-1 ml-7">
            When enabled, payments will automatically be released from escrow when creators complete tasks
          </p>
        </div>
      </div>
    )
  }
  
  // Render license preferences form for step 6
  const renderLicensePreferencesForm = () => {
    if (stepNumber !== 6 || !isExpanded) return null
    
    return (
      <div className="space-y-6 mt-4">
        {/* License Type */}
        <div>
          <label className="block text-sm font-medium mb-1 required">Default License Type</label>
          <select
            value={formData.licenseType}
            onChange={(e) => handleInputChange("licenseType", e.target.value)}
            className={`brutalist-input w-full ${errors.licenseType ? "border-red-500" : ""}`}
          >
            <option value="">Select a license type</option>
            {LICENSE_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.licenseType && <div className="text-red-500 text-sm mt-1">❌ {errors.licenseType}</div>}
          <p className="text-xs text-gray-500 mt-1">
            This determines how creators can use and distribute the content they create for your campaigns
          </p>
        </div>

        {/* License Duration */}
        <div>
          <label className="block text-sm font-medium mb-1 required">Default License Duration</label>
          <select
            value={formData.licenseDuration}
            onChange={(e) => handleInputChange("licenseDuration", e.target.value)}
            className={`brutalist-input w-full ${errors.licenseDuration ? "border-red-500" : ""}`}
          >
            <option value="">Select a duration</option>
            {LICENSE_DURATIONS.map((duration) => (
              <option key={duration} value={duration}>
                {duration}
              </option>
            ))}
          </select>
          {errors.licenseDuration && <div className="text-red-500 text-sm mt-1">❌ {errors.licenseDuration}</div>}
        </div>

        {/* Rights Options */}
        <div className="space-y-3 border-4 border-black p-4">
          <h4 className="font-bold">Default Content Rights</h4>
          
          {/* Attribution */}
          <div>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.attributionRequired}
                onChange={() => handleToggle("attributionRequired")}
                className="h-5 w-5 brutalist-checkbox"
              />
              <span className="text-sm font-medium">Attribution Required</span>
            </label>
            <p className="text-xs text-gray-500 mt-1 ml-7">
              Creators must be credited when their content is used
            </p>
          </div>
          
          {/* Commercial Use */}
          <div>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.commercialUse}
                onChange={() => handleToggle("commercialUse")}
                className="h-5 w-5 brutalist-checkbox"
              />
              <span className="text-sm font-medium">Commercial Use Allowed</span>
            </label>
            <p className="text-xs text-gray-500 mt-1 ml-7">
              Content can be used for commercial purposes
            </p>
          </div>
          
          {/* Edit Rights */}
          <div>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.editRights}
                onChange={() => handleToggle("editRights")}
                className="h-5 w-5 brutalist-checkbox"
              />
              <span className="text-sm font-medium">Modification Rights</span>
            </label>
            <p className="text-xs text-gray-500 mt-1 ml-7">
              You can modify or adapt content after delivery
            </p>
          </div>
        </div>

        {/* Additional License Notes */}
        <div>
          <label className="block text-sm font-medium mb-1">Additional License Notes</label>
          <textarea
            value={formData.licenseNotes}
            onChange={(e) => handleInputChange("licenseNotes", e.target.value)}
            placeholder="Any additional licensing terms or clarifications for creators..."
            className="brutalist-input w-full h-24 resize-none"
          />
          <div className="text-right text-xs text-gray-600 mt-2">{formData.licenseNotes.length}/500</div>
        </div>
      </div>
    )
  }
  
  // Render platform agreement form for step 7
  const renderPlatformAgreementForm = () => {
    if (stepNumber !== 7 || !isExpanded) return null
    
    return (
      <div className="space-y-6 mt-4">
        <div className="border-4 border-black p-6 space-y-4">
          <h4 className="text-lg font-bold">Review and Accept Terms</h4>
          <p className="text-sm text-gray-600">
            Please review and accept the following legal agreements to complete your onboarding and use the platform.
          </p>
          
          {/* Terms of Service */}
          <div className="mt-4">
            <div className="border-2 border-black p-4 h-32 overflow-y-auto mb-2 bg-gray-50">
              <h5 className="font-semibold mb-2">Terms of Service</h5>
              <p className="text-sm text-gray-600">
                By using AetherWorks, you agree to our terms of service which outline your rights and responsibilities as a platform user. 
                These terms govern all interactions, transactions, and activities on the platform. The complete terms of service document 
                can be found <a href="#" className="text-blue-600 underline">here</a>.
              </p>
            </div>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.termsAccepted}
                onChange={() => handleToggle("termsAccepted")}
                className="h-5 w-5 brutalist-checkbox"
              />
              <span className="text-sm font-medium">I accept the Terms of Service</span>
            </label>
            {errors.termsAccepted && <div className="text-red-500 text-sm mt-1">❌ {errors.termsAccepted}</div>}
          </div>
          
          {/* Dispute Resolution */}
          <div className="mt-4">
            <div className="border-2 border-black p-4 h-32 overflow-y-auto mb-2 bg-gray-50">
              <h5 className="font-semibold mb-2">Dispute Resolution Policy</h5>
              <p className="text-sm text-gray-600">
                This policy outlines how disputes between brands and creators are resolved on AetherWorks. It includes the 
                process for filing a dispute, timeframes for resolution, and our arbitration procedures. The complete 
                dispute resolution policy can be found <a href="#" className="text-blue-600 underline">here</a>.
              </p>
            </div>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.disputeResolutionAccepted}
                onChange={() => handleToggle("disputeResolutionAccepted")}
                className="h-5 w-5 brutalist-checkbox"
              />
              <span className="text-sm font-medium">I accept the Dispute Resolution Policy</span>
            </label>
            {errors.disputeResolutionAccepted && <div className="text-red-500 text-sm mt-1">❌ {errors.disputeResolutionAccepted}</div>}
          </div>
          
          {/* Escrow Terms */}
          <div className="mt-4">
            <div className="border-2 border-black p-4 h-32 overflow-y-auto mb-2 bg-gray-50">
              <h5 className="font-semibold mb-2">Escrow Terms</h5>
              <p className="text-sm text-gray-600">
                Our escrow system securely holds funds until work is completed to your satisfaction. This agreement outlines how 
                the escrow system works, including fund release conditions, timeframes, and fees. The complete escrow terms can be 
                found <a href="#" className="text-blue-600 underline">here</a>.
              </p>
            </div>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.escrowTermsAccepted}
                onChange={() => handleToggle("escrowTermsAccepted")}
                className="h-5 w-5 brutalist-checkbox"
              />
              <span className="text-sm font-medium">I accept the Escrow Terms</span>
            </label>
            {errors.escrowTermsAccepted && <div className="text-red-500 text-sm mt-1">❌ {errors.escrowTermsAccepted}</div>}
          </div>
          
          {/* Privacy Policy */}
          <div className="mt-4">
            <div className="border-2 border-black p-4 h-32 overflow-y-auto mb-2 bg-gray-50">
              <h5 className="font-semibold mb-2">Privacy Policy</h5>
              <p className="text-sm text-gray-600">
                Our privacy policy explains how we collect, use, and protect your personal and business information. It includes 
                details on data security, sharing practices, and your privacy rights. The complete privacy policy can be found 
                <a href="#" className="text-blue-600 underline"> here</a>.
              </p>
            </div>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.privacyPolicyAccepted}
                onChange={() => handleToggle("privacyPolicyAccepted")}
                className="h-5 w-5 brutalist-checkbox"
              />
              <span className="text-sm font-medium">I accept the Privacy Policy</span>
            </label>
            {errors.privacyPolicyAccepted && <div className="text-red-500 text-sm mt-1">❌ {errors.privacyPolicyAccepted}</div>}
          </div>
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
              
              {/* Render payment settings form for step 5 */}
              {renderPaymentSettingsForm()}
              
              {/* Render license preferences form for step 6 */}
              {renderLicensePreferencesForm()}
              
              {/* Render platform agreement form for step 7 */}
              {renderPlatformAgreementForm()}

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