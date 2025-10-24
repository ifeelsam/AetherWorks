"use client"

import { useState } from "react"

interface DashboardTabsProps {
  activeTab: string
}

const MOCK_APPLICATIONS = [
  {
    id: 1,
    brandName: "DeFi Protocol",
    brandLogo: "🔷",
    title: "Product Launch Video Series",
    status: "pending",
    appliedDaysAgo: 2,
    budget: 500,
    deadline: "Nov 15",
  },
  {
    id: 2,
    brandName: "TechCo",
    brandLogo: "💻",
    title: "Product Review Campaign",
    status: "accepted",
    appliedDaysAgo: 5,
    budget: 750,
    deadline: "Nov 20",
  },
  {
    id: 3,
    brandName: "Fashion Brand",
    brandLogo: "👗",
    title: "Lifestyle Content Series",
    status: "rejected",
    appliedDaysAgo: 10,
    budget: 400,
    deadline: "Nov 10",
  },
]

const MOCK_ACTIVE_PROJECTS = [
  {
    id: 1,
    brandName: "TechCo",
    brandLogo: "💻",
    title: "Product Review Campaign",
    progress: 60,
    nextMilestone: "Final Delivery",
    daysLeft: 8,
    payment: 375,
  },
]

const MOCK_COMPLETED = [
  {
    id: 1,
    brandName: "TechBrand",
    brandLogo: "🔧",
    title: "Product Review Campaign",
    completedDate: "Oct 10, 2025",
    earned: 750,
    rating: 5.0,
    review: "Excellent work, very professional!",
  },
]

const MOCK_SAVED = [
  {
    id: 1,
    brandName: "DeFi Protocol",
    brandLogo: "🔷",
    title: "Product Launch Video Series",
    budget: 500,
    deadline: "Oct 30",
  },
]

export default function CreatorDashboardTabs({ activeTab }: DashboardTabsProps) {
  const [sortBy, setSortBy] = useState("recent")

  if (activeTab === "applications") {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <p className="text-gray-600">Showing {MOCK_APPLICATIONS.length} applications</p>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border-2 border-black px-3 py-2 font-semibold text-sm focus:outline-none focus:bg-yellow-100"
          >
            <option value="recent">Recent</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>

        {MOCK_APPLICATIONS.map((app) => (
          <div key={app.id} className="border-4 border-black p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="text-3xl">{app.brandLogo}</div>
                <div>
                  <h3 className="space-grotesk text-xl font-bold">{app.title}</h3>
                  <p className="text-sm text-gray-600">{app.brandName}</p>
                </div>
              </div>
              <div
                className={`px-3 py-1 font-bold text-sm ${
                  app.status === "pending" ? "bg-yellow-300" : app.status === "accepted" ? "bg-green-300" : "bg-red-300"
                }`}
              >
                {app.status === "pending" && "Pending"}
                {app.status === "accepted" && "Accepted"}
                {app.status === "rejected" && "Rejected"}
              </div>
            </div>

            <div className="border-t-2 border-black pt-4 text-sm text-gray-600">
              <p>Applied: {app.appliedDaysAgo} days ago</p>
              <p>
                Payment: {app.budget} USDC - Deadline: {app.deadline}
              </p>
            </div>

            <div className="border-t-2 border-black pt-4 flex gap-4">
              <button className="flex-1 border-2 border-black px-4 py-2 font-semibold hover:bg-gray-100 transition-colors text-sm">
                View Application
              </button>
              <button className="flex-1 border-2 border-black px-4 py-2 font-semibold hover:bg-gray-100 transition-colors text-sm">
                Message Brand
              </button>
              {app.status === "pending" && (
                <button className="flex-1 border-2 border-black px-4 py-2 font-semibold hover:bg-red-100 transition-colors text-sm">
                  Withdraw
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (activeTab === "active") {
    return (
      <div className="space-y-6">
        {MOCK_ACTIVE_PROJECTS.map((project) => (
          <div key={project.id} className="border-4 border-black p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="text-3xl">{project.brandLogo}</div>
                <div>
                  <h3 className="space-grotesk text-xl font-bold">{project.title}</h3>
                  <p className="text-sm text-gray-600">{project.brandName}</p>
                </div>
              </div>
              <div className="bg-blue-300 px-3 py-1 font-bold text-sm">In Progress</div>
            </div>

            <div className="border-t-2 border-black pt-4">
              <p className="text-sm font-semibold mb-3">Progress: Milestone 1 Complete</p>
              <div className="w-full bg-gray-200 h-3 border-2 border-black">
                <div className="h-full bg-green-500" style={{ width: `${project.progress}%` }} />
              </div>
            </div>

            <div className="border-t-2 border-black pt-4 text-sm text-gray-600">
              <p>
                Next Milestone: {project.nextMilestone} - Due: {project.daysLeft} days left
              </p>
              <p>Payment: {project.payment} USDC</p>
            </div>

            <div className="border-t-2 border-black pt-4 flex gap-4">
              <button className="flex-1 border-2 border-black px-4 py-2 font-semibold hover:bg-gray-100 transition-colors text-sm">
                View Project
              </button>
              <button className="flex-1 border-2 border-black px-4 py-2 font-semibold hover:bg-green-100 transition-colors text-sm">
                Submit Deliverable
              </button>
              <button className="flex-1 border-2 border-black px-4 py-2 font-semibold hover:bg-gray-100 transition-colors text-sm">
                Message Brand
              </button>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (activeTab === "completed") {
    return (
      <div className="space-y-6">
        {MOCK_COMPLETED.map((project) => (
          <div key={project.id} className="border-4 border-black p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="text-3xl">{project.brandLogo}</div>
                <div>
                  <h3 className="space-grotesk text-xl font-bold">{project.title}</h3>
                  <p className="text-sm text-gray-600">{project.brandName}</p>
                </div>
              </div>
              <div className="bg-green-300 px-3 py-1 font-bold text-sm">Completed ✓</div>
            </div>

            <div className="border-t-2 border-black pt-4 text-sm text-gray-600">
              <p>Completed: {project.completedDate}</p>
              <p className="jetbrains-mono font-bold text-green-600 text-lg mt-2">Earned: {project.earned} USDC</p>
            </div>

            <div className="border-t-2 border-black pt-4">
              <p className="text-sm font-semibold mb-2">Brand Rating: ★★★★★ {project.rating}</p>
              <p className="text-sm text-gray-700">"{project.review}"</p>
            </div>

            <div className="border-t-2 border-black pt-4 flex gap-4">
              <button className="flex-1 border-2 border-black px-4 py-2 font-semibold hover:bg-gray-100 transition-colors text-sm">
                View License NFT
              </button>
              <button className="flex-1 border-2 border-black px-4 py-2 font-semibold hover:bg-gray-100 transition-colors text-sm">
                Request Testimonial
              </button>
              <button className="flex-1 border-2 border-black px-4 py-2 font-semibold hover:bg-gray-100 transition-colors text-sm">
                Re-engage
              </button>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (activeTab === "saved") {
    return (
      <div className="space-y-6">
        {MOCK_SAVED.map((campaign) => (
          <div key={campaign.id} className="border-4 border-black p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="text-3xl">{campaign.brandLogo}</div>
                <div>
                  <h3 className="space-grotesk text-xl font-bold">{campaign.title}</h3>
                  <p className="text-sm text-gray-600">{campaign.brandName}</p>
                </div>
              </div>
              <div className="text-2xl">⭐</div>
            </div>

            <div className="border-t-2 border-black pt-4 text-sm text-gray-600">
              <p>
                Budget: {campaign.budget} USDC - Deadline: {campaign.deadline}
              </p>
            </div>

            <div className="border-t-2 border-black pt-4 flex gap-4">
              <button className="flex-1 border-2 border-black px-4 py-2 font-semibold hover:bg-gray-100 transition-colors text-sm">
                View Brief
              </button>
              <button className="flex-1 border-4 border-black bg-black text-white px-4 py-2 font-semibold hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all text-sm">
                Apply
              </button>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return null
}
