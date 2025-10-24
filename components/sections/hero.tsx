"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"

export default function Hero() {
  const router = useRouter()
  return (
    <section className="w-full min-h-screen bg-white flex items-center justify-center px-4 md:px-8">
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-center">
        {/* Left Column */}
        <div className="md:col-span-2 space-y-8">
          <div>
            <h1 className="space-grotesk text-5xl md:text-7xl font-black leading-tight mb-6">
              Create. Connect.
              <br />
              Get Paid with AetherWorks.
            </h1>
            <p className="text-lg md:text-xl leading-relaxed max-w-md text-gray-700">
              The decentralized marketplace where Web3 brands meet UGC creators. Smart contracts handle
              everything—escrow, licensing, payments. No middlemen. No platform fees eating your earnings.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button onClick={() => router.push("/auth")} className="brutalist-btn brutalist-border brutalist-shadow bg-black/80 text-white px-8 py-4 text-base font-medium hover:bg-black">
              Launch Campaign
            </button>
            <Link href="/auth/role-selection" className="brutalist-btn brutalist-border brutalist-shadow bg-gray-300 text-black px-8 py-4 text-base font-medium hover:bg-black hover:text-white">
              Browse Briefs
            </Link>
          </div>

          {/* Micro-copy */}
          <p className="text-sm text-gray-500">Connect wallet to start - Base native</p>
        </div>

        {/* Right Column - Stats Card */}
        <div className="md:col-span-1">
          <div className="brutalist-border brutalist-shadow bg-white p-8 space-y-0">
            
            <div className="border-b-4 border-black py-6">
              <p className="text-sm font-medium mb-2">ACTIVE CAMPAIGNS</p>
              <p className="space-grotesk text-6xl font-black">3+</p>
            </div>
            <div className="border-b-4 border-black py-6">
              <p className="text-sm font-medium mb-2">TOTAL PAYOUTS</p>
              <p className="space-grotesk text-4xl font-black">100+ USDC</p>
            </div>
            <div className="py-6">
              <p className="text-sm font-medium mb-2">CREATORS PAID</p>
              <p className="space-grotesk text-4xl font-black">50+</p>

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
