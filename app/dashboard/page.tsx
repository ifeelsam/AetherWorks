"use client"

import { useState } from "react"
import CreatorDashboardTabs from "@/components/dashboard/creator-dashboard-tabs"

export default function CreatorDashboardPage() {
  const [activeTab, setActiveTab] = useState("applications")

  return (
    <main className="min-h-screen w-full bg-white">
      {/* Top Navigation */}
      <nav className="border-b-4 border-black sticky top-0 bg-white z-40">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
          <h1 className="space-grotesk text-4xl font-bold">My Dashboard</h1>
        </div>
      </nav>

      {/* Tab Navigation */}
      <div className="border-b-4 border-black sticky top-20 bg-white z-30">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex gap-8">
          {["applications", "active", "completed", "saved"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 font-semibold border-b-4 transition-colors ${
                activeTab === tab ? "border-black text-black" : "border-transparent text-gray-600 hover:text-black"
              }`}
            >
              {tab === "applications" && "Applications"}
              {tab === "active" && "Active Projects"}
              {tab === "completed" && "Completed"}
              {tab === "saved" && "Saved"}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <CreatorDashboardTabs activeTab={activeTab} />
      </div>
    </main>
  )
}
