"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

interface CampaignCardProps {
  campaign: {
    id: number
    brandName: string
    brandLogo: string
    isVerified: boolean
    title: string
    description: string
    format: string
    category: string
    budget: number
    creatorsNeeded: number
    applicants: number
    deadline: string
    postedDaysAgo: number
    tags: string[]
    isSaved: boolean
    isApplied: boolean
  }
}

export default function CampaignCard({ campaign }: CampaignCardProps) {
  const router = useRouter()
  const [isSaved, setIsSaved] = useState(campaign.isSaved)

  return (
    <div
      onClick={() => router.push(`/campaigns/${campaign.id}`)}
      className={`border-4 border-black p-8 cursor-pointer transition-all hover:translate-y-[-4px] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] ${
        isSaved ? "border-l-8 border-l-yellow-300" : ""
      } ${campaign.isApplied ? "border-l-8 border-l-green-500" : ""}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="text-4xl">{campaign.brandLogo}</div>
          <div>
            <div className="flex items-center gap-2">
              <span className="space-grotesk text-xl font-bold">{campaign.brandName}</span>
              {campaign.isVerified && <span className="text-xs font-bold text-green-500">✓ Verified</span>}
            </div>
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation()
            setIsSaved(!isSaved)
          }}
          className="text-2xl hover:opacity-70"
        >
          {isSaved ? "⭐" : "☆"}
        </button>
      </div>

      {/* Title */}
      <h3 className="space-grotesk text-2xl font-bold mb-4">{campaign.title}</h3>

      {/* Divider */}
      <div className="border-t-2 border-black my-4" />

      {/* Description */}
      <p className="text-gray-700 text-sm mb-4 line-clamp-2">{campaign.description}</p>
      <button className="text-sm font-semibold underline hover:text-orange-500 mb-4">Read More</button>

      {/* Divider */}
      <div className="border-t-2 border-black my-4" />

      {/* Meta Info */}
      <div className="flex gap-4 text-sm text-gray-600 mb-4">
        <span>📹 {campaign.format}</span>
        <span>💰 {campaign.category}</span>
      </div>

      {/* Divider */}
      <div className="border-t-2 border-black my-4" />

      {/* Budget */}
      <div className="jetbrains-mono text-2xl font-bold text-green-500 mb-4">{campaign.budget} USDC per creator</div>

      {/* Stats */}
      <p className="text-sm text-gray-600 mb-4">
        Creators Needed: {campaign.creatorsNeeded} - Applied: {campaign.applicants}
      </p>
      <p className="text-sm text-gray-600 mb-4">
        Deadline: {campaign.deadline} - Posted {campaign.postedDaysAgo} days ago
      </p>

      {/* Divider */}
      <div className="border-t-2 border-black my-4" />

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {campaign.tags.map((tag) => (
          <span key={tag} className="border-2 border-black px-3 py-1 text-xs font-semibold">
            {tag}
          </span>
        ))}
      </div>

      {/* Divider */}
      <div className="border-t-2 border-black my-4" />

      {/* Buttons */}
      <div className="flex gap-4">
        <button className="flex-1 border-4 border-black p-3 font-semibold hover:bg-orange-300 transition-colors">
          View Brief →
        </button>
        {campaign.isApplied ? (
          <button className="flex-1 border-4 border-green-500 bg-green-300 p-3 font-semibold cursor-default">
            Applied ✓
          </button>
        ) : (
          <button className="flex-1 border-4 border-black p-3 font-semibold hover:bg-green-300 transition-colors">
            Apply Now
          </button>
        )}
      </div>
    </div>
  )
}
