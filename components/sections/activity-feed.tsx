"use client"

export default function ActivityFeed() {
  const activities = [
    {
      type: "submission",
      text: 'Creator @0x7a3...9f2 submitted "Product Unboxing" for CryptoCo',
      time: "2 hours ago",
      campaign: "Campaign #4829",
    },
    {
      type: "payment",
      text: "2.5 ETH released to @0x9b1...4c8",
      time: "4 hours ago",
      campaign: "View License NFT",
    },
    {
      type: "submission",
      text: 'Creator @0x2f5...8a1 submitted "Tutorial Video" for DefiDAO',
      time: "6 hours ago",
      campaign: "Campaign #4827",
    },
    {
      type: "payment",
      text: "5.0 ETH released to @0x4c2...3d9",
      time: "8 hours ago",
      campaign: "View License NFT",
    },
    {
      type: "submission",
      text: 'Creator @0x8b9...1e4 submitted "Review Video" for WebDAO',
      time: "10 hours ago",
      campaign: "Campaign #4825",
    },
  ]

  return (
    <section className="w-full bg-gray-100 py-24 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="space-grotesk text-5xl md:text-6xl font-black mb-16">Recent Activity</h2>

        <div className="space-y-6">
          {activities.map((activity, idx) => (
            <div
              key={idx}
              className={`brutalist-border brutalist-shadow bg-white p-6 ${idx % 2 === 0 ? "md:mr-12" : "md:ml-12"}`}
            >
              <p className="text-base font-medium mb-2">{activity.text}</p>
              <p className="text-sm text-gray-500">
                {activity.time} - {activity.campaign}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
