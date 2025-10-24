"use client"

import { useRouter } from "next/navigation"

export default function CampaignDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()

  return (
    <main className="min-h-screen w-full bg-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-600 mb-8">
          <button onClick={() => router.push("/")} className="hover:underline">
            Home
          </button>
          {" > "}
          <button onClick={() => router.push("/campaigns/browse")} className="hover:underline">
            Browse Campaigns
          </button>
          {" > "}
          <span>Product Launch Video Series</span>
        </div>

        {/* Brand Info Bar */}
        <div className="border-4 border-black bg-yellow-100 p-6 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="text-4xl">🔷</div>
            <div>
              <div className="flex items-center gap-2">
                <span className="space-grotesk text-2xl font-bold">DeFi Protocol</span>
                <span className="text-sm font-bold text-green-500">✓ Verified</span>
              </div>
              <p className="text-sm text-gray-600 jetbrains-mono">@defiprotocol.sol</p>
            </div>
          </div>
          <div className="flex gap-4">
            <button className="text-sm font-semibold underline hover:text-orange-500">View Brand Profile</button>
            <button className="text-sm font-semibold underline hover:text-orange-500">View on Solscan</button>
          </div>
        </div>

        {/* Campaign Title */}
        <h1 className="space-grotesk text-5xl font-bold mb-4">Product Launch Video Series</h1>

        {/* Meta Info */}
        <div className="flex items-center gap-4 mb-8 text-sm text-gray-600">
          <span>Posted: 3 days ago</span>
          <span>•</span>
          <span>Deadline: Oct 30, 2025</span>
          <span>•</span>
          <span>12 Applications</span>
        </div>

        {/* Status Badge */}
        <div className="inline-block border-4 border-green-500 bg-green-300 px-4 py-2 font-bold mb-8">
          🟢 ACCEPTING APPLICATIONS
        </div>

        {/* Main Content */}
        <div className="space-y-12">
          {/* Overview Section */}
          <section>
            <h2 className="space-grotesk text-3xl font-bold mb-6">Overview</h2>
            <div className="border-t-4 border-black pt-6">
              <p className="text-gray-700 mb-4">
                We're launching our new DeFi protocol and need authentic creators to explain how it works in engaging
                30-60s videos. Content should be educational yet entertaining, targeting crypto-curious audiences aged
                18-35.
              </p>
              <p className="text-gray-700">
                We're looking for creators who can break down complex topics into simple, relatable narratives. Must be
                comfortable discussing DeFi, yield farming, and protocol mechanics.
              </p>
            </div>
          </section>

          {/* Deliverables Section */}
          <section>
            <h2 className="space-grotesk text-3xl font-bold mb-6">Deliverables</h2>
            <div className="border-4 border-black p-6 space-y-4">
              <div>
                <h3 className="font-bold mb-3">Deliverable #1</h3>
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="font-semibold">Type:</span> Short-form Video
                  </p>
                  <p>
                    <span className="font-semibold">Quantity:</span> 3 videos
                  </p>
                  <p>
                    <span className="font-semibold">Duration:</span> 30-60 seconds each
                  </p>
                  <p>
                    <span className="font-semibold">Format:</span> MP4 or MOV
                  </p>
                  <p>
                    <span className="font-semibold">Resolution:</span> 1080p minimum
                  </p>
                  <p>
                    <span className="font-semibold">Platform:</span> TikTok, Instagram Reels
                  </p>
                </div>
              </div>
              <div className="border-t-2 border-black pt-4">
                <h4 className="font-bold mb-2">Requirements:</h4>
                <ul className="text-sm space-y-1 list-disc list-inside">
                  <li>Hook within first 3 seconds</li>
                  <li>Explain 1 key feature per video</li>
                  <li>Include clear CTA</li>
                  <li>Authentic, not overly scripted</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Brand Guidelines Section */}
          <section>
            <h2 className="space-grotesk text-3xl font-bold mb-6">Brand Guidelines</h2>
            <button className="border-2 border-black px-4 py-2 font-semibold hover:bg-gray-100 mb-6">
              Download Brand Kit PDF
            </button>
            <div className="space-y-4">
              <div>
                <h3 className="font-bold mb-2">Tone:</h3>
                <p className="text-gray-700">Educational, energetic, approachable</p>
              </div>
              <div>
                <h3 className="font-bold mb-2">Must mention:</h3>
                <p className="text-gray-700">Protocol name, key benefits</p>
              </div>
              <div>
                <h3 className="font-bold mb-2">Avoid:</h3>
                <p className="text-gray-700">Financial advice, guaranteed returns</p>
              </div>
              <div>
                <h3 className="font-bold mb-2">Required hashtags:</h3>
                <p className="text-gray-700">#ProtocolName #DeFi</p>
              </div>
            </div>
          </section>

          {/* Budget & Timeline Section */}
          <section>
            <h2 className="space-grotesk text-3xl font-bold mb-6">Compensation & Timeline</h2>
            <div className="border-4 border-black bg-green-100 p-6 mb-6">
              <p className="jetbrains-mono text-3xl font-bold text-green-600 mb-4">500 USDC per creator</p>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-bold">Milestone 1: Concept Approval</p>
                  <p className="text-gray-700">125 USDC (25%)</p>
                </div>
                <div>
                  <p className="font-bold">Milestone 2: Final Delivery</p>
                  <p className="text-gray-700">375 USDC (75%)</p>
                </div>
              </div>
            </div>
            <div className="space-y-3 text-sm">
              <p>
                <span className="font-bold">Application Deadline:</span> Oct 30, 2025
              </p>
              <p>
                <span className="font-bold">Creator Selection:</span> Nov 2, 2025
              </p>
              <p>
                <span className="font-bold">Concept Submission:</span> Nov 5, 2025
              </p>
              <p>
                <span className="font-bold">Final Delivery:</span> Nov 15, 2025
              </p>
              <p>
                <span className="font-bold">Payment Release:</span> Within 48hrs of approval
              </p>
            </div>
          </section>

          {/* License Terms Section */}
          <section>
            <h2 className="space-grotesk text-3xl font-bold mb-6">Rights & Licensing</h2>
            <div className="space-y-4 text-sm">
              <p>
                <span className="font-bold">License Type:</span> Non-exclusive usage license
              </p>
              <p className="text-gray-700">You retain ownership of the content. Brand receives:</p>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>1 year usage rights from delivery</li>
                <li>Worldwide distribution</li>
                <li>Use on: Social media (organic + paid ads), Website, Email</li>
                <li>Content modifications allowed</li>
              </ul>
              <p className="text-gray-700 mt-4">
                <span className="font-bold">After 1 year:</span> License expires, you can resell content to others,
                brand must remove from active campaigns
              </p>
              <button className="text-sm font-semibold underline hover:text-orange-500 mt-4">
                View Full License Agreement
              </button>
            </div>
          </section>

          {/* Requirements Section */}
          <section>
            <h2 className="space-grotesk text-3xl font-bold mb-6">Creator Requirements</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-bold mb-2">Minimum Qualifications:</h3>
                <ul className="text-sm space-y-1 list-disc list-inside">
                  <li>1,000+ followers on TikTok or Instagram</li>
                  <li>Previous UGC or content creation experience</li>
                  <li>Portfolio with video examples</li>
                  <li>Understanding of DeFi concepts</li>
                  <li>Available for 2-week timeline</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-2">Preferred (Not Required):</h3>
                <ul className="text-sm space-y-1 list-disc list-inside">
                  <li>Existing crypto/tech content</li>
                  <li>Verified social accounts</li>
                  <li>5%+ engagement rate</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Application Section */}
          <section className="border-4 border-green-500 bg-green-100 p-8">
            <h2 className="space-grotesk text-3xl font-bold mb-4">Ready to Apply?</h2>
            <p className="text-gray-700 mb-6">
              Review the brief carefully before submitting your proposal. Applications are reviewed within 24-48 hours.
            </p>
            <div className="mb-6 p-4 border-2 border-black bg-white">
              <p className="text-sm font-semibold">
                Escrow Status: <span className="text-green-600">✓ 2,500 USDC Locked</span>
              </p>
            </div>
            <div className="flex gap-4">
              <button className="flex-1 border-4 border-black p-4 font-semibold hover:bg-yellow-300 transition-colors">
                Save Campaign
              </button>
              <button
                onClick={() => router.push(`/campaigns/${params.id}/apply`)}
                className="flex-1 border-4 border-black bg-black text-white p-4 font-semibold hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all"
              >
                Apply Now →
              </button>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
