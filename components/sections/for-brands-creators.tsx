"use client"

export default function ForBrandsCreators() {
  return (
    <section className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* For Brands */}
        <div className="bg-black text-white p-12 md:p-16 space-y-8">
          <h2 className="space-grotesk text-4xl md:text-5xl font-black">For Brands</h2>
          <ul className="space-y-4 text-lg md:text-xl leading-relaxed">
            <li>• Post campaigns with onchain briefs</li>
            <li>• Escrow protects your budget</li>
            <li>• Own perpetual content licenses as NFTs</li>
            <li>• No upfront platform fees</li>
            <li>• Dispute resolution built-in</li>
            <li>• Analytics dashboard for ROI tracking</li>
          </ul>
          <button className="secondary-btn brutalist-border secondary-shadow bg-white text-black px-8 py-4 text-base font-medium">
            Create First Campaign →
          </button>
        </div>

        {/* For Creators */}
        <div className="bg-white text-black p-12 md:p-16 space-y-8 border-l-4 md:border-l-0 md:border-t-4 border-black">
          <h2 className="space-grotesk text-4xl md:text-5xl font-black">For Creators</h2>
          <ul className="space-y-4 text-lg md:text-xl leading-relaxed">
            <li>• Browse Web3 brand opportunities</li>
            <li>• Submit concepts or finished work</li>
            <li>• Get paid in stablecoins</li>
            <li>• Retain IP unless selling exclusive rights</li>
            <li>• Build onchain reputation</li>
            <li>• Zero subscription fees</li>
          </ul>
          <button className="brutalist-btn brutalist-border brutalist-shadow bg-black text-white px-8 py-4 text-base font-medium">
            Find Your First Brief
          </button>
        </div>
      </div>
    </section>
  )
}
