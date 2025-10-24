"use client"

import { useState } from "react"

interface WithdrawModalProps {
  campaignTitle: string
  onClose: () => void
}

export default function WithdrawModal({ campaignTitle, onClose }: WithdrawModalProps) {
  const [reason, setReason] = useState("")
  const [notes, setNotes] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async () => {
    setSubmitting(true)
    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 500))
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white border-4 border-black p-12 max-w-md w-full mx-4 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
        <button onClick={onClose} className="float-right text-2xl font-bold hover:text-orange-500">
          ×
        </button>

        <h2 className="space-grotesk text-3xl font-bold mb-4">Withdraw Application?</h2>
        <p className="text-gray-600 mb-6">Are you sure you want to withdraw your application for "{campaignTitle}"?</p>
        <p className="text-sm text-gray-500 mb-6">This action cannot be undone.</p>

        <div className="space-y-4 mb-6 border-t-4 border-black pt-6">
          <label className="block">
            <span className="text-sm font-semibold mb-2 block">Reason (Optional)</span>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full border-4 border-black p-3 focus:outline-none focus:bg-yellow-100"
            >
              <option value="">Select a reason...</option>
              <option value="better-opportunity">Found a better opportunity</option>
              <option value="timeline">Timeline doesn't work</option>
              <option value="rate">Rate doesn't match expectations</option>
              <option value="fit">Brand isn't a good fit</option>
              <option value="other">Other (please specify)</option>
            </select>
          </label>

          {reason === "other" && (
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Please tell us why..."
              className="w-full border-4 border-black p-3 h-24 focus:outline-none focus:bg-yellow-100 resize-none"
            />
          )}
        </div>

        <div className="flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 border-4 border-black bg-white text-black p-3 font-semibold hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="flex-1 border-4 border-red-500 bg-red-500 text-white p-3 font-semibold hover:shadow-[8px_8px_0px_0px_rgba(255,0,0,0.5)] transition-all disabled:opacity-50"
          >
            {submitting ? "Withdrawing..." : "Confirm Withdrawal"}
          </button>
        </div>
      </div>
    </div>
  )
}
