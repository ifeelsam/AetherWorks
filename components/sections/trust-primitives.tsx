"use client"

export default function TrustPrimitives() {
  const features = [
    {
      icon: "🔒",
      title: "Escrow Smart Contracts",
      description: "Funds locked until delivery verified. Creators get paid. Brands get content. Always.",
    },
    {
      icon: "📄",
      title: "AetherWorks Licenses",
      description: "Usage rights encoded as NFTs. Verifiable proof for platforms and legal compliance.",
    },
    {
      icon: "⚖️",
      title: "Decentralized Arbitration",
      description: "Neutral arbiters or DAO jurors resolve conflicts. Evidence stored onchain. Stakes aligned.",
    },
    {
      icon: "⭐",
      title: "Portable Identity",
      description: "Your wallet is your resume. Campaign history, ratings, payouts—all verifiable.",
    },
  ]

  return (
    <section className="w-full bg-white py-24 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        <h2 className="space-grotesk text-5xl md:text-6xl font-black text-center mb-4">Trust Through Code,</h2>
        <h2 className="space-grotesk text-5xl md:text-6xl font-black text-center mb-16">Not Promises.</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="brutalist-border brutalist-shadow bg-white p-8 space-y-4">
              <p className="text-5xl">{feature.icon}</p>
              <h3 className="space-grotesk text-xl font-black">{feature.title}</h3>
              <p className="text-base leading-relaxed text-gray-700">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
