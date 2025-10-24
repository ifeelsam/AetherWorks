"use client"

import type React from "react"

import { useState } from "react"

interface ApplicationFormProps {
  campaignId: string
  onSubmit: () => void
}

export default function ApplicationForm({ campaignId, onSubmit }: ApplicationFormProps) {
  const [formData, setFormData] = useState({
    pitch: "",
    portfolioItems: [] as string[],
    canMeetDeadline: true,
    proposedDeadline: "",
    reason: "",
    notes: "",
    agreeTerms: false,
    agreeOwnership: false,
    agreeLicensing: false,
    agreeEscrow: false,
  })

  const [portfolioOptions] = useState([
    { id: "1", title: "DeFi Tutorial Video", platform: "TikTok", views: "42K", engagement: "5.2%" },
    { id: "2", title: "Product Review - Tech Co", platform: "Instagram", views: "28K", engagement: "4.1%" },
    { id: "3", title: "Lifestyle Content Series", platform: "TikTok", views: "35K", engagement: "6.8%" },
  ])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleTogglePortfolio = (itemId: string) => {
    setFormData((prev) => ({
      ...prev,
      portfolioItems: prev.portfolioItems.includes(itemId)
        ? prev.portfolioItems.filter((id) => id !== itemId)
        : prev.portfolioItems.length < 3
          ? [...prev.portfolioItems, itemId]
          : prev.portfolioItems,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit()
  }

  return (
    <div className="w-full max-w-2xl bg-white border-4 border-black p-8 max-h-[90vh] overflow-y-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="space-grotesk text-4xl font-bold mb-2">Apply to Campaign</h1>
        <p className="text-gray-600">Product Launch Video Series by DeFi Protocol</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Section 1: Proposal Pitch */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            Why are you a good fit? <span className="text-red-500">*</span>
          </label>
          <textarea
            name="pitch"
            value={formData.pitch}
            onChange={handleInputChange}
            placeholder="I have experience creating educational content about DeFi protocols, with over 50K followers interested in crypto..."
            className="w-full border-4 border-black p-4 font-inter text-base h-32 focus:outline-none focus:bg-yellow-100 resize-none"
            required
          />
          <p className="text-xs text-gray-600 mt-2">{formData.pitch.length}/1000</p>
        </div>

        {/* Section 2: Portfolio Selection */}
        <div>
          <label className="block text-sm font-semibold mb-4">
            Relevant Work Samples <span className="text-red-500">*</span>
          </label>
          <p className="text-xs text-gray-600 mb-4">Select 1-3 portfolio items from your profile</p>
          <div className="space-y-3 mb-4">
            {portfolioOptions.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleTogglePortfolio(item.id)}
                className={`w-full border-4 border-black p-4 text-left transition-all ${
                  formData.portfolioItems.includes(item.id)
                    ? "bg-green-300 border-l-8 border-l-green-600"
                    : "bg-white hover:bg-gray-50"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-sm text-gray-600">
                      {item.platform} - {item.views} views - {item.engagement} ER
                    </p>
                  </div>
                  {formData.portfolioItems.includes(item.id) && <span className="font-bold">✓</span>}
                </div>
              </button>
            ))}
          </div>
          <button type="button" className="text-sm font-semibold underline hover:text-orange-500">
            + Add New Portfolio Item
          </button>
        </div>

        {/* Section 3: Timeline */}
        <div>
          <label className="block text-sm font-semibold mb-3">Can you meet the deadline?</label>
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="canMeetDeadline"
                checked={formData.canMeetDeadline}
                onChange={() => setFormData((prev) => ({ ...prev, canMeetDeadline: true }))}
                className="w-4 h-4 border-2 border-black cursor-pointer"
              />
              <span className="text-sm">Yes, I can deliver by Nov 15</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="canMeetDeadline"
                checked={!formData.canMeetDeadline}
                onChange={() => setFormData((prev) => ({ ...prev, canMeetDeadline: false }))}
                className="w-4 h-4 border-2 border-black cursor-pointer"
              />
              <span className="text-sm">I need more time (specify below)</span>
            </label>
          </div>
          {!formData.canMeetDeadline && (
            <div className="mt-4 space-y-3">
              <input
                type="date"
                value={formData.proposedDeadline}
                onChange={(e) => setFormData((prev) => ({ ...prev, proposedDeadline: e.target.value }))}
                className="w-full border-4 border-black p-3 font-inter text-base focus:outline-none focus:bg-yellow-100"
              />
              <textarea
                name="reason"
                value={formData.reason}
                onChange={handleInputChange}
                placeholder="Reason for extended timeline..."
                className="w-full border-4 border-black p-3 font-inter text-base h-20 focus:outline-none focus:bg-yellow-100 resize-none"
              />
            </div>
          )}
        </div>

        {/* Section 4: Rate Confirmation */}
        <div className="border-4 border-green-500 bg-green-100 p-4">
          <p className="text-sm font-semibold mb-3">Rate Agreement</p>
          <div className="space-y-2 text-sm mb-4">
            <p>
              <span className="font-semibold">Campaign offers:</span> 500 USDC
            </p>
            <p>
              <span className="font-semibold">Your profile rate:</span> 200-1,000 USDC{" "}
              <span className="text-green-600">✓</span>
            </p>
          </div>
          <div className="space-y-2 text-sm mb-4 border-t-2 border-green-500 pt-4">
            <p className="font-semibold">Payment Structure:</p>
            <p>125 USDC on concept approval</p>
            <p>375 USDC on final delivery</p>
          </div>
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleInputChange}
              className="w-4 h-4 border-2 border-black cursor-pointer mt-1"
              required
            />
            <span className="text-sm">I accept the offered rate and payment structure</span>
          </label>
        </div>

        {/* Section 5: Additional Notes */}
        <div>
          <label className="block text-sm font-semibold mb-2">Questions or Special Notes (Optional)</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
            placeholder="I have some creative ideas for the hook that I'd love to discuss..."
            className="w-full border-4 border-black p-4 font-inter text-base h-20 focus:outline-none focus:bg-yellow-100 resize-none"
          />
        </div>

        {/* Section 6: Rights Confirmation */}
        <div className="space-y-3 border-t-4 border-black pt-6">
          <p className="text-sm font-semibold">Content Rights Agreement</p>
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="agreeOwnership"
              checked={formData.agreeOwnership}
              onChange={handleInputChange}
              className="w-4 h-4 border-2 border-black cursor-pointer mt-1"
              required
            />
            <span className="text-sm">I have read and agree to the license terms</span>
          </label>
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="agreeLicensing"
              checked={formData.agreeLicensing}
              onChange={handleInputChange}
              className="w-4 h-4 border-2 border-black cursor-pointer mt-1"
              required
            />
            <span className="text-sm">I own all rights to submit this content</span>
          </label>
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="agreeEscrow"
              checked={formData.agreeEscrow}
              onChange={handleInputChange}
              className="w-4 h-4 border-2 border-black cursor-pointer mt-1"
              required
            />
            <span className="text-sm">I understand escrow payment terms</span>
          </label>
          <button type="button" className="text-sm font-semibold underline hover:text-orange-500 mt-2">
            View Full License Agreement
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-6 border-t-4 border-black">
          <button
            type="button"
            className="flex-1 border-4 border-black p-4 font-semibold hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={
              !formData.agreeTerms || !formData.agreeOwnership || !formData.agreeLicensing || !formData.agreeEscrow
            }
            className="flex-1 border-4 border-black bg-black text-white p-4 font-semibold hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submit Application →
          </button>
        </div>
      </form>
    </div>
  )
}
