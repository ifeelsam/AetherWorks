import Link from "next/link"
import type { CampaignBrief } from "@/lib/types"

interface CampaignOverviewProps {
  campaign: CampaignBrief
}

export default function CampaignOverview({ campaign }: CampaignOverviewProps) {
  return (
    <div className="border-4 border-black p-8 bg-white space-y-6">
      <h2 className="space-grotesk text-3xl font-bold">Campaign Details</h2>

      {/* Campaign Brief */}
      <div className="border-b-4 border-black pb-6">
        <h3 className="font-semibold text-lg mb-3">Campaign Brief</h3>
        <p className="text-gray-700 leading-relaxed mb-4">{campaign.description}</p>
        <Link href={`/campaigns/${campaign.id}`} className="font-semibold text-orange-500 hover:underline">
          View Full Campaign Brief
        </Link>
      </div>

      {/* Deliverables */}
      <div className="border-b-4 border-black pb-6">
        <h3 className="font-semibold text-lg mb-3">Deliverables Required</h3>
        <ul className="space-y-2 text-gray-700">
          {campaign.deliverables.map((d) => (
            <li key={d.id} className="flex items-start gap-2">
              <span className="font-bold">•</span>
              <span>
                {d.quantity}x {d.type.toLowerCase()} ({Object.values(d.specs).join(", ")})
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Compensation */}
      <div className="border-b-4 border-black pb-6">
        <h3 className="font-semibold text-lg mb-3">Compensation</h3>
        <div className="border-4 border-black p-4 bg-gray-50 mb-4">
          <p className="font-mono text-2xl font-bold mb-4">{campaign.budgetPerCreator} USDC</p>
          <div className="space-y-2 text-sm">
            {campaign.milestones?.map((m) => (
              <p key={m.id}>
                - {m.name}: {m.amount} USDC
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="border-b-4 border-black pb-6">
        <h3 className="font-semibold text-lg mb-3">Timeline</h3>
        <div className="space-y-2 text-sm">
          <p>
            <span className="font-semibold">Application Deadline:</span>{" "}
            {campaign.applicationDeadline.toLocaleDateString()}
          </p>
          <p>
            <span className="font-semibold">Content Due Date:</span> {campaign.contentDueDate.toLocaleDateString()}
          </p>
          <p>
            <span className="font-semibold">Total Duration:</span> ~3 weeks
          </p>
        </div>
      </div>

      {/* License Terms */}
      <div>
        <h3 className="font-semibold text-lg mb-3">License Terms</h3>
        <div className="space-y-2 text-sm">
          <p>
            <span className="font-semibold">Type:</span> {campaign.exclusivity} usage license
          </p>
          <p>
            <span className="font-semibold">Duration:</span> {campaign.licenseDuration}
          </p>
          <p>
            <span className="font-semibold">Territory:</span> {campaign.territory}
          </p>
          <p>
            <span className="font-semibold">Usage:</span> {campaign.usageRights.join(", ")}
          </p>
          <p>
            <span className="font-semibold">Your Rights:</span> You retain copyright ownership
          </p>
        </div>
        <Link href="#" className="font-semibold text-orange-500 hover:underline mt-3 inline-block">
          View Full License Agreement
        </Link>
      </div>
    </div>
  )
}
