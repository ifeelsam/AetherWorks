import type { Application } from "@/lib/types"

interface ApplicationHeaderProps {
  application: Application
}

const statusConfig = {
  pending: { bg: "bg-yellow-300", text: "text-black", label: "⏳ UNDER REVIEW" },
  shortlisted: { bg: "bg-orange-500", text: "text-black", label: "⭐ SHORTLISTED" },
  accepted: { bg: "bg-green-400", text: "text-black", label: "✓ ACCEPTED" },
  rejected: { bg: "bg-red-500", text: "text-white", label: "✗ DECLINED" },
  withdrawn: { bg: "bg-gray-400", text: "text-black", label: "← WITHDRAWN" },
}

export default function ApplicationHeader({ application }: ApplicationHeaderProps) {
  const config = statusConfig[application.status]

  return (
    <div className={`${config.bg} border-4 border-black p-8 relative`}>
      <div className="flex items-start gap-6">
        {/* Brand Logo */}
        <div className="flex-shrink-0">
          <img
            src={application.brandLogo || "/placeholder.svg?height=80&width=80&query=brand"}
            alt={application.brandName}
            className="w-20 h-20 border-4 border-black"
          />
        </div>

        {/* Content */}
        <div className="flex-1">
          <h1 className="space-grotesk text-4xl font-bold mb-2">{application.campaign.title}</h1>
          <p className="text-lg mb-4">
            {application.brandName}
            {application.brandVerified && <span className="ml-2">✓ Verified</span>}
          </p>
          <div className="space-y-1 font-mono text-sm">
            <p>Application ID: #{application.id}</p>
            <p>Submitted: {application.submittedAt.toLocaleString()}</p>
          </div>
        </div>

        {/* Status Badge */}
        <div
          className={`${config.bg} border-4 border-black p-4 font-bold text-center whitespace-nowrap ${config.text}`}
        >
          {config.label}
        </div>
      </div>
    </div>
  )
}
