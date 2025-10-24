"use client"

export default function CtaBanner() {
  return (
    <section className="w-full bg-orange-500 py-24 px-4 md:px-8">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <h2 className="space-grotesk text-5xl md:text-6xl font-black text-black">Ready to Build with AetherWorks?</h2>
        <p className="text-xl md:text-2xl text-black">No waitlist. No approvals. Just connect your wallet.</p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <button className="brutalist-btn brutalist-border brutalist-shadow bg-black text-white px-8 py-4 text-base font-medium">
            For Brands: Post Your First Brief
          </button>
          <button className="brutalist-btn brutalist-border brutalist-shadow bg-white text-black px-8 py-4 text-base font-medium">
            For Creators: Explore Campaigns
          </button>
        </div>
      </div>
    </section>
  )
}
