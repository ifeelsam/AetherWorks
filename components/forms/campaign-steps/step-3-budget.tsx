"use client"

import type React from "react"

import { useState } from "react"
import type { CampaignBrief } from "@/lib/types"

interface Step3Props {
  data: Partial<CampaignBrief>
  onNext: (data: Partial<CampaignBrief>) => void
  onBack: () => void
}

export default function CampaignStep3({ data, onNext, onBack }: Step3Props) {
  const [formData, setFormData] = useState({
    budgetPerCreator: data.budgetPerCreator || 500,
    paymentToken: data.paymentToken || "USDC",
    paymentStructure: data.paymentStructure || "single",
    milestones: data.milestones || [],
    applicationDeadline:
      data.applicationDeadline || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    contentDueDate: data.contentDueDate || new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    licenseDuration: data.licenseDuration || "1 year",
  })

  const totalBudget = (formData.budgetPerCreator * (data.creatorsNeeded || 5) * 1.02).toFixed(2)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext({
      ...formData,
      applicationDeadline: new Date(formData.applicationDeadline),
      contentDueDate: new Date(formData.contentDueDate),
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-2">
        <h1 className="space-grotesk text-4xl font-bold">Budget & Timeline</h1>
        <p className="text-gray-600">Set payment terms and campaign deadlines</p>
      </div>

      <div className="space-y-6">
        {/* Budget Section */}
        <div className="border-l-4 border-yellow-400 bg-yellow-50 p-6 space-y-4">
          <div>
            <label className="form-label required">Payment Per Creator</label>
            <div className="flex gap-3">
              <input
                type="number"
                value={formData.budgetPerCreator}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, budgetPerCreator: Number.parseFloat(e.target.value) }))
                }
                className="brutalist-input flex-1"
                min="1"
              />
              <select
                value={formData.paymentToken}
                onChange={(e) => setFormData((prev) => ({ ...prev, paymentToken: e.target.value as any }))}
                className="brutalist-input w-32"
              >
                <option value="ETH">ETH</option>
                <option value="USDC">USDC</option>
                <option value="USDT">USDT</option>
              </select>
            </div>
            <p className="form-help-text">≈ ${(formData.budgetPerCreator * 1).toFixed(2)} USD</p>
          </div>

          {/* Total Budget */}
          <div className="bg-green-100 border-4 border-black p-4 font-mono text-sm space-y-1">
            <div>
              {formData.budgetPerCreator} {formData.paymentToken} × {data.creatorsNeeded || 5} creators ={" "}
              {(formData.budgetPerCreator * (data.creatorsNeeded || 5)).toFixed(0)} {formData.paymentToken}
            </div>
            <div>
              Plus platform fee (2%): +{(formData.budgetPerCreator * (data.creatorsNeeded || 5) * 0.02).toFixed(0)}{" "}
              {formData.paymentToken}
            </div>
            <div className="border-t-2 border-black pt-1 font-bold">
              Total to escrow: {totalBudget} {formData.paymentToken}
            </div>
          </div>
        </div>

        {/* Payment Structure */}
        <div>
          <label className="form-label required">Payment Milestones</label>
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                checked={formData.paymentStructure === "single"}
                onChange={() => setFormData((prev) => ({ ...prev, paymentStructure: "single" }))}
              />
              <span>Single payment on delivery</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                checked={formData.paymentStructure === "milestone"}
                onChange={() => setFormData((prev) => ({ ...prev, paymentStructure: "milestone" }))}
              />
              <span>Milestone-based (Recommended)</span>
            </label>
          </div>
        </div>

        {/* Timeline */}
        <div>
          <label className="form-label required">Application Deadline</label>
          <input
            type="date"
            value={formData.applicationDeadline}
            onChange={(e) => setFormData((prev) => ({ ...prev, applicationDeadline: e.target.value }))}
            className="brutalist-input w-full"
          />
        </div>

        <div>
          <label className="form-label required">Final Content Deadline</label>
          <input
            type="date"
            value={formData.contentDueDate}
            onChange={(e) => setFormData((prev) => ({ ...prev, contentDueDate: e.target.value }))}
            className="brutalist-input w-full"
          />
        </div>

        <div>
          <label className="form-label required">License Duration</label>
          <select
            value={formData.licenseDuration}
            onChange={(e) => setFormData((prev) => ({ ...prev, licenseDuration: e.target.value }))}
            className="brutalist-input w-full"
          >
            <option value="6 months">6 months</option>
            <option value="1 year">1 year</option>
            <option value="2 years">2 years</option>
            <option value="5 years">5 years</option>
            <option value="Perpetual">Perpetual</option>
          </select>
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
          Next: License Terms →
        </button>
      </div>
    </form>
  )
}
