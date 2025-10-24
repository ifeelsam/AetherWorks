"use client"

import { useState } from "react"
import CampaignFilters from "@/components/campaigns/campaign-filters"
import CampaignCard from "@/components/campaigns/campaign-card"

const MOCK_CAMPAIGNS = [
  {
    id: 1,
    brandName: "DeFi Protocol",
    brandLogo: "🔷",
    isVerified: true,
    title: "Product Launch Video Series",
    description: "Looking for authentic creators to showcase our new DeFi protocol in 30-60s TikTok-style videos...",
    format: "Short Video",
    category: "DeFi",
    budget: 500,
    creatorsNeeded: 5,
    applicants: 12,
    deadline: "Oct 30",
    postedDaysAgo: 2,
    tags: ["Video", "DeFi", "Tutorial"],
    isSaved: false,
    isApplied: false,
  },
  {
    id: 2,
    brandName: "TechCo",
    brandLogo: "💻",
    isVerified: true,
    title: "Product Review Campaign",
    description: "We need creators to review our new AI tool and share honest feedback with their audiences...",
    format: "Long Video",
    category: "Tech Products",
    budget: 750,
    creatorsNeeded: 8,
    applicants: 24,
    deadline: "Nov 5",
    postedDaysAgo: 5,
    tags: ["Video", "Tech", "Review"],
    isSaved: true,
    isApplied: false,
  },
  {
    id: 3,
    brandName: "Fashion Brand",
    brandLogo: "👗",
    isVerified: false,
    title: "Lifestyle Content Series",
    description:
      "Create authentic lifestyle content featuring our new collection. We're looking for diverse creators...",
    format: "Photography",
    category: "Lifestyle",
    budget: 400,
    creatorsNeeded: 10,
    applicants: 18,
    deadline: "Nov 10",
    postedDaysAgo: 1,
    tags: ["Photography", "Lifestyle", "Fashion"],
    isSaved: false,
    isApplied: true,
  },
]

export default function BrowseCampaignsPage() {
  const [filters, setFilters] = useState({
    budgetMin: 100,
    budgetMax: 5000,
    contentTypes: [] as string[],
    categories: [] as string[],
    timeline: "",
    licenseType: [] as string[],
    verifiedOnly: false,
  })

  const [sortBy, setSortBy] = useState("latest")
  const [campaigns] = useState(MOCK_CAMPAIGNS)

  const filteredCampaigns = campaigns.filter((campaign) => {
    if (campaign.budget < filters.budgetMin || campaign.budget > filters.budgetMax) return false
    if (filters.contentTypes.length > 0 && !filters.contentTypes.includes(campaign.format)) return false
    if (filters.categories.length > 0 && !filters.categories.includes(campaign.category)) return false
    if (filters.verifiedOnly && !campaign.isVerified) return false
    return true
  })

  return (
    <main className="min-h-screen w-full bg-white">
      {/* Top Navigation */}
      <nav className="border-b-4 border-black sticky top-0 bg-white z-40">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <div className="space-grotesk text-2xl font-bold">Campaign Briefs</div>
          <div className="flex items-center gap-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border-2 border-black px-3 py-2 font-semibold text-sm focus:outline-none focus:bg-yellow-100"
            >
              <option value="latest">Latest</option>
              <option value="budget-high">Budget (High-Low)</option>
              <option value="deadline">Deadline (Urgent)</option>
              <option value="best-match">Best Match</option>
            </select>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Left Sidebar Filters */}
        <CampaignFilters filters={filters} setFilters={setFilters} />

        {/* Main Content */}
        <div className="flex-1 p-4 md:p-8">
          <div className="max-w-4xl">
            <p className="text-gray-600 mb-8">Showing {filteredCampaigns.length} campaigns</p>

            {filteredCampaigns.length > 0 ? (
              <div className="space-y-6">
                {filteredCampaigns.map((campaign) => (
                  <CampaignCard key={campaign.id} campaign={campaign} />
                ))}
              </div>
            ) : (
              <div className="border-4 border-black p-12 text-center">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="space-grotesk text-2xl font-bold mb-2">No campaigns found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your filters or check back later for new briefs.</p>
                <button
                  onClick={() =>
                    setFilters({
                      budgetMin: 100,
                      budgetMax: 5000,
                      contentTypes: [],
                      categories: [],
                      timeline: "",
                      licenseType: [],
                      verifiedOnly: false,
                    })
                  }
                  className="border-4 border-black px-6 py-3 font-semibold hover:bg-orange-300 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
