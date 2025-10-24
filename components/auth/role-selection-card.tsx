"use client"

import { BrutalistCard } from "@/components/ui/brutalist-card"

interface RoleSelectionCardProps {
  userEmail: string
  onRoleSelect: (role: "brand" | "creator" | "both") => void
}

export default function RoleSelectionCard({ userEmail, onRoleSelect }: RoleSelectionCardProps) {
  return (
    <BrutalistCard shadow="lg">
      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="space-grotesk text-4xl font-bold">Welcome back</h1>
          <p className="text-lg text-gray-600">What are you here to do?</p>
        </div>

        {/* Role Cards */}
        <div className="space-y-6">
          {/* Brand Card */}
          <button
            onClick={() => onRoleSelect("brand")}
            className="role-card w-full text-left space-y-4 hover:bg-yellow-300 hover:shadow-lg"
          >
            <div className="text-4xl">🎯</div>
            <div>
              <h3 className="space-grotesk text-2xl font-bold">I'm a Brand</h3>
              <p className="text-gray-600 mt-2">Post briefs, hire creators, manage campaigns</p>
            </div>
            <div className="text-sm font-semibold text-black">Continue as Brand →</div>
          </button>

          {/* Creator Card */}
          <button
            onClick={() => onRoleSelect("creator")}
            className="role-card w-full text-left space-y-4 hover:bg-green-300 hover:shadow-lg"
          >
            <div className="text-4xl">✨</div>
            <div>
              <h3 className="space-grotesk text-2xl font-bold">I'm a Creator</h3>
              <p className="text-gray-600 mt-2">Browse briefs, submit content, get paid</p>
            </div>
            <div className="text-sm font-semibold text-black">Continue as Creator →</div>
          </button>
        </div>

        {/* Both Link */}
        <div className="text-center">
          <button
            onClick={() => onRoleSelect("both")}
            className="text-sm underline font-semibold hover:text-orange-500 transition-colors"
          >
            I want to do both → Take me to dashboard
          </button>
        </div>
      </div>
    </BrutalistCard>
  )
}
