"use client"

import { useState, useEffect, useRef } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import ApplicationHeader from "@/components/applications/application-header"
import StatusTimeline from "@/components/applications/status-timeline"
import CampaignOverview from "@/components/applications/campaign-overview"
import SubmissionDetails from "@/components/applications/submission-details"
import MessageThread from "@/components/applications/message-thread"
import ApplicationActions from "@/components/applications/application-actions"
import SimilarCampaigns from "@/components/applications/similar-campaigns"
import WithdrawModal from "@/components/applications/withdraw-modal"
import { Skeleton } from "@/components/ui/skeleton"
import type { Application } from "@/lib/types"

export default function ApplicationDetailPage() {
  const params = useParams()
  const applicationId = params.id as string
  const [application, setApplication] = useState<Application | null>(null)
  const [loading, setLoading] = useState(true)
  const [showWithdrawModal, setShowWithdrawModal] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        // Simulate API call - replace with actual endpoint
        await new Promise((resolve) => setTimeout(resolve, 1000))
        const mockData: Application = {
          id: applicationId,
          campaignId: "camp-123",
          creatorId: "creator-1",
          creatorName: "Alex Chen",
          creatorAvatar: "/creator-avatar.png",
          brandId: "brand-1",
          brandName: "DeFi Protocol",
          brandLogo: "/generic-brand-logo.png",
          brandVerified: true,
          status: "pending",
          proposal: {
            pitch:
              "I have over 3 years of experience creating educational content about DeFi protocols, with a focus on making complex topics accessible to mainstream audiences. My TikTok account (@alexcrypto) has 45K followers who are actively interested in learning about Web3 and DeFi.\n\nI've successfully worked with 5 other crypto brands, creating content that averages 25K views per video with a 6.8% engagement rate. I'm excited about this project because I've been following your protocol's development and genuinely believe in its value proposition.",
            portfolioItems: [
              {
                id: "1",
                title: "DeFi Tutorial Video",
                platform: "TikTok",
                views: 42000,
                engagement: 5.2,
                duration: "58s",
                thumbnail: "/video-thumbnail.png",
              },
              {
                id: "2",
                title: "Product Explainer Video",
                platform: "Instagram Reels",
                views: 28000,
                engagement: 4.8,
                duration: "45s",
                thumbnail: "/video-thumbnail.png",
              },
            ],
            canMeetDeadline: true,
            notes:
              "I have some creative ideas for the hook that focus on real-world use cases rather than technical jargon. Would love to discuss during kickoff if selected!",
          },
          submittedAt: new Date("2025-10-22T01:47:00"),
          viewedAt: new Date("2025-10-22T15:22:00"),
          messages: [
            {
              id: "msg-1",
              senderId: "brand-1",
              senderName: "DeFi Protocol",
              senderRole: "brand",
              content:
                "Hi Alex! We loved your portfolio samples. Your DeFi tutorial video had exactly the tone we're looking for. Can you confirm you're comfortable discussing yield farming in simple terms?",
              timestamp: new Date("2025-10-22T16:35:00"),
              read: true,
            },
            {
              id: "msg-2",
              senderId: "creator-1",
              senderName: "You",
              senderRole: "creator",
              content:
                "I actually have experience explaining yield farming concepts to my audience. Happy to share some ideas during kickoff.",
              timestamp: new Date("2025-10-22T17:12:00"),
              read: true,
            },
          ],
          timeline: [
            {
              id: "t1",
              status: "pending",
              title: "Application Submitted",
              description: "Received by brand",
              timestamp: new Date("2025-10-22T01:47:00"),
              completed: true,
              current: false,
            },
            {
              id: "t2",
              status: "pending",
              title: "Application Viewed",
              description: "Brand reviewed",
              timestamp: new Date("2025-10-22T15:22:00"),
              completed: true,
              current: false,
            },
            {
              id: "t3",
              status: "pending",
              title: "Under Review",
              description: "Awaiting decision",
              timestamp: new Date(),
              completed: false,
              current: true,
            },
            {
              id: "t4",
              status: "pending",
              title: "Decision Expected",
              description: "Within 48 hours",
              timestamp: new Date(Date.now() + 48 * 60 * 60 * 1000),
              completed: false,
              current: false,
            },
            {
              id: "t5",
              status: "pending",
              title: "Project Kick-off",
              description: "If selected",
              timestamp: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
              completed: false,
              current: false,
            },
          ],
          campaign: {
            title: "Product Launch Video Series",
            description:
              "Looking for authentic creators to showcase our new DeFi protocol in 30-60s TikTok-style videos. Content should be educational yet entertaining...",
            category: "DeFi",
            contentFormats: ["TikTok", "Instagram Reels"],
            creatorsNeeded: 3,
            deliverables: [
              {
                id: "d1",
                type: "Video",
                quantity: 3,
                specs: { duration: "30-60s", format: "MP4/MOV", resolution: "1080p" },
              },
            ],
            budgetPerCreator: 500,
            paymentToken: "USDC",
            paymentStructure: "milestone",
            milestones: [
              { id: "m1", name: "Concept Approval", percentage: 25, amount: 125 },
              { id: "m2", name: "Final Delivery", percentage: 75, amount: 375 },
            ],
            applicationDeadline: new Date("2025-10-30"),
            contentDueDate: new Date("2025-11-15"),
            licenseDuration: "1 year from delivery",
            ownershipType: "license",
            usageRights: ["Social media (organic + paid)", "Website", "Email"],
            territory: "Worldwide",
            exclusivity: "non-exclusive",
            allowModifications: false,
          },
        }
        setApplication(mockData)
      } catch (error) {
        console.error("Failed to load application:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchApplication()
  }, [applicationId])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [application?.messages])

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Skeleton className="h-12 w-64 mb-8" />
          <Skeleton className="h-64 w-full mb-8" />
          <Skeleton className="h-96 w-full mb-8" />
        </div>
      </div>
    )
  }

  if (!application) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center border-4 border-black p-8 max-w-md">
          <h1 className="space-grotesk text-3xl font-bold mb-4">⚠️ Failed to Load Application</h1>
          <p className="text-gray-600 mb-6">
            We couldn't retrieve this application. Please check your connection and try again.
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => window.location.reload()}
              className="flex-1 border-4 border-black p-3 font-semibold hover:bg-gray-100 transition-colors"
            >
              Retry
            </button>
            <Link
              href="/dashboard/creator"
              className="flex-1 border-4 border-black p-3 font-semibold hover:bg-gray-100 transition-colors text-center"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Top Navigation */}
      <div className="sticky top-0 z-40 bg-white border-b-4 border-black">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/dashboard/creator" className="flex items-center gap-2 font-semibold hover:text-orange-500">
            ← Back to Dashboard
          </Link>
          <h1 className="space-grotesk text-xl font-bold">My Applications</h1>
          <div className="flex items-center gap-4 text-sm">
            <Link href="/creator/profile" className="hover:text-orange-500">
              Profile
            </Link>
            <span className="border-l-2 border-black pl-4">Wallet: 2,450 USDC</span>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="max-w-4xl mx-auto px-4 py-6 text-sm text-gray-600 border-b-2 border-gray-300">
        <Link href="/dashboard/creator" className="hover:text-orange-500">
          Dashboard
        </Link>
        {" > "}
        <Link href="/dashboard/creator?tab=applications" className="hover:text-orange-500">
          Applications
        </Link>
        {" > "}
        <span className="text-black font-semibold">{application.campaign.title}</span>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Application Header */}
        <ApplicationHeader application={application} />

        {/* Status Timeline */}
        <StatusTimeline timeline={application.timeline} />

        {/* Campaign Overview */}
        <CampaignOverview campaign={application.campaign} />

        {/* Submission Details */}
        <SubmissionDetails application={application} />

        {/* Message Thread */}
        <MessageThread
          messages={application.messages}
          messagesEndRef={messagesEndRef}
          applicationStatus={application.status}
        />

        {/* Actions Section */}
        <ApplicationActions
          status={application.status}
          onWithdraw={() => setShowWithdrawModal(true)}
          campaignTitle={application.campaign.title}
        />

        {/* Similar Campaigns - Show if rejected or withdrawn */}
        {(application.status === "rejected" || application.status === "withdrawn") && <SimilarCampaigns />}
      </div>

      {/* Withdraw Modal */}
      {showWithdrawModal && (
        <WithdrawModal campaignTitle={application.campaign.title} onClose={() => setShowWithdrawModal(false)} />
      )}
    </div>
  )
}
