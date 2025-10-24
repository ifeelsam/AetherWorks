"use client"

import { useState } from "react"
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

  const borderColor = {
    pending: "border-l-gray-400",
    "in-progress": "border-l-orange-500",
    completed: "border-l-green-400 bg-green-50",
  }[status]

  const handleAction = async () => {
    setIsLoading(true)
    // Simulate action
    setTimeout(() => {
      onComplete()
      setIsLoading(false)
    }, 500)
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

              {status === "completed" && (
                <div className="flex items-center gap-2 text-green-600 font-semibold">
                  <span>✓</span>
                  <span>Completed</span>
                </div>
              )}

              {status === "pending" && (
                <BrutalistButton onClick={handleAction} disabled={isLoading} size="md">
                  {isLoading ? "Loading..." : "Start"}
                </BrutalistButton>
              )}

              {status === "in-progress" && (
                <BrutalistButton onClick={handleAction} disabled={isLoading} size="md">
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
