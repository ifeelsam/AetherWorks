import type { Application } from "@/lib/types"

interface SubmissionDetailsProps {
  application: Application
}

export default function SubmissionDetails({ application }: SubmissionDetailsProps) {
  return (
    <div className="border-4 border-yellow-300 bg-yellow-100 p-8 space-y-6">
      <h2 className="space-grotesk text-3xl font-bold">Your Proposal</h2>

      <div className="border-b-4 border-yellow-300 pb-4">
        <p className="text-sm font-mono text-gray-600">Submitted on: {application.submittedAt.toLocaleString()}</p>
      </div>

      {/* Pitch */}
      <div className="border-b-4 border-yellow-300 pb-6">
        <h3 className="font-semibold text-lg mb-3">Why You're a Good Fit</h3>
        <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">{application.proposal.pitch}</p>
      </div>

      {/* Portfolio Samples */}
      <div className="border-b-4 border-yellow-300 pb-6">
        <h3 className="font-semibold text-lg mb-4">Portfolio Samples Attached</h3>
        <div className="space-y-4">
          {application.proposal.portfolioItems.map((item) => (
            <div key={item.id} className="border-4 border-black p-4 bg-white">
              <div className="flex gap-4">
                <img
                  src={item.thumbnail || "/placeholder.svg?height=100&width=100&query=video"}
                  alt={item.title}
                  className="w-24 h-24 border-4 border-black flex-shrink-0"
                />
                <div className="flex-1">
                  <h4 className="font-semibold mb-1">{item.title}</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    {item.platform} • {item.views.toLocaleString()} views • {item.engagement}% ER
                  </p>
                  <p className="text-sm text-gray-600 mb-3">Duration: {item.duration}</p>
                  <button className="text-sm font-semibold border-2 border-black px-3 py-1 hover:bg-black hover:text-white transition-colors">
                    View Video
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Confirmations */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-green-600 font-bold">✓</span>
          <span className="text-sm">Can deliver by {application.campaign.contentDueDate.toLocaleDateString()}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-green-600 font-bold">✓</span>
          <span className="text-sm">Accepted offered rate: {application.campaign.budgetPerCreator} USDC</span>
        </div>
      </div>

      {/* Additional Notes */}
      {application.proposal.notes && (
        <div className="border-t-4 border-yellow-300 pt-6">
          <h3 className="font-semibold text-lg mb-3">Additional Notes</h3>
          <p className="text-gray-800 leading-relaxed">{application.proposal.notes}</p>
        </div>
      )}
    </div>
  )
}
