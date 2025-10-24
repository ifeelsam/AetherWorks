import Link from "next/link"

export default function SimilarCampaigns() {
  const campaigns = [
    {
      id: "1",
      title: "NFT Launch Video Campaign",
      brand: "CryptoDAO",
      budget: 600,
      category: "Video Content",
      deadline: "Nov 5",
      matches: ["Video format", "Crypto category", "Educational tone"],
    },
    {
      id: "2",
      title: "Web3 Education Series",
      brand: "BlockAcademy",
      budget: 800,
      category: "Educational Content",
      deadline: "Nov 10",
      matches: ["Educational focus", "Crypto niche", "Series format"],
    },
  ]

  return (
    <div className="border-4 border-black p-8 bg-white space-y-6">
      <h2 className="space-grotesk text-3xl font-bold">Similar Opportunities</h2>
      <p className="text-gray-600">You might be interested in these campaigns:</p>

      <div className="space-y-4">
        {campaigns.map((campaign) => (
          <div
            key={campaign.id}
            className="border-4 border-black p-6 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-lg mb-1">{campaign.title}</h3>
                <p className="text-sm text-gray-600">
                  {campaign.brand} • <span className="bg-green-300 px-2 py-1 text-xs font-semibold">Open</span>
                </p>
              </div>
            </div>

            <p className="text-sm mb-4">
              💰 {campaign.budget} USDC • {campaign.category} • Deadline: {campaign.deadline}
            </p>

            <div className="mb-4">
              <p className="text-xs font-semibold text-gray-600 mb-2">Similar to your application:</p>
              <div className="flex flex-wrap gap-2">
                {campaign.matches.map((match, i) => (
                  <span key={i} className="text-xs bg-yellow-200 border-2 border-black px-2 py-1">
                    ✓ {match}
                  </span>
                ))}
              </div>
            </div>

            <Link href={`/campaigns/${campaign.id}`} className="font-semibold text-orange-500 hover:underline">
              View Campaign →
            </Link>
          </div>
        ))}
      </div>

      <div className="text-center">
        <Link href="/campaigns/browse" className="font-semibold text-orange-500 hover:underline">
          View All Campaigns →
        </Link>
      </div>
    </div>
  )
}
