import type { TimelineEvent } from "@/lib/types"

interface StatusTimelineProps {
  timeline: TimelineEvent[]
}

export default function StatusTimeline({ timeline }: StatusTimelineProps) {
  return (
    <div className="border-4 border-black p-8 bg-white">
      <h2 className="space-grotesk text-3xl font-bold mb-8">Application Timeline</h2>

      <div className="space-y-6">
        {timeline.map((event, index) => (
          <div key={event.id} className="flex gap-6">
            {/* Timeline Circle */}
            <div className="flex flex-col items-center flex-shrink-0">
              <div
                className={`w-6 h-6 border-4 border-black rounded-full flex items-center justify-center ${
                  event.completed ? "bg-green-400" : event.current ? "bg-yellow-300" : "bg-white"
                }`}
              >
                {event.completed && <span className="text-black font-bold text-sm">✓</span>}
              </div>
              {index < timeline.length - 1 && (
                <div
                  className={`w-1 h-12 mt-2 ${event.completed ? "bg-green-400" : event.current ? "bg-yellow-300" : "border-l-2 border-dashed border-gray-400"}`}
                />
              )}
            </div>

            {/* Event Content */}
            <div className="pb-6">
              <h3 className="font-semibold text-lg mb-1">{event.title}</h3>
              <p className="text-sm text-gray-600 font-mono mb-2">{event.timestamp.toLocaleString()}</p>
              <p className="text-sm text-gray-700">{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
