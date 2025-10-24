"use client"

export default function HowItWorks() {
  const steps = [
    {
      number: "①",
      title: "POST BRIEF",
      description: "Define scope, budget, rights. Fund escrow. Publish onchain.",
      color: "bg-yellow-300",
      textColor: "text-black",
    },
    {
      number: "②",
      title: "CREATORS SUBMIT",
      description: "Discover briefs. Upload content. Get shortlisted. Negotiate terms.",
      color: "bg-green-400",
      textColor: "text-black",
    },
    {
      number: "③",
      title: "AUTO-RELEASE",
      description: "Smart contract verifies delivery. Pays creators. Mints license NFT.",
      color: "bg-orange-500",
      textColor: "text-white",
    },
  ]

  return (
    <section className="w-full bg-white py-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="space-grotesk text-5xl md:text-6xl font-black text-center mb-16">Three Steps. Zero Friction.</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className={`brutalist-border brutalist-shadow brutalist-card p-12 transition-all cursor-pointer ${step.color} ${step.textColor}`}
            >
              <p className="space-grotesk text-8xl font-black mb-6 opacity-50">{step.number}</p>
              <h3 className="space-grotesk text-2xl font-black mb-4">{step.title}</h3>
              <p className="text-base leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
