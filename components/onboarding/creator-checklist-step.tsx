interface CreatorChecklistStepProps {
  step: {
    id: number
    title: string
    description: string
    time: string
    status: "complete" | "todo"
  }
}

export default function CreatorChecklistStep({ step }: CreatorChecklistStepProps) {
  const isComplete = step.status === "complete"

  return (
    <div className="border-4 border-black p-6 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="space-grotesk text-sm font-bold text-gray-600">STEP {step.id}</span>
            {isComplete && <span className="text-sm font-bold text-green-500">Complete ✓</span>}
          </div>
          <h3 className="space-grotesk text-xl font-bold mb-2">{step.title}</h3>
          <p className="text-gray-600 text-sm">{step.description}</p>
          <p className="text-gray-500 text-xs mt-1">{step.time}</p>
        </div>
        <button
          className={`ml-4 px-4 py-2 border-2 border-black font-semibold text-sm whitespace-nowrap ${
            isComplete ? "bg-green-300 text-black" : "bg-white text-black hover:bg-orange-300 transition-colors"
          }`}
        >
          {isComplete ? "✓ Done" : "Start →"}
        </button>
      </div>
    </div>
  )
}
