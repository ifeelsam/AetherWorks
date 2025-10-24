"use client"

interface CampaignFiltersProps {
  filters: {
    budgetMin: number
    budgetMax: number
    contentTypes: string[]
    categories: string[]
    timeline: string
    licenseType: string[]
    verifiedOnly: boolean
  }
  setFilters: (filters: any) => void
}

const CONTENT_FORMATS = [
  "Short Video",
  "Long Video",
  "Photography",
  "Written Content",
  "Design/Graphics",
  "Audio/Podcast",
]
const CATEGORIES = ["Crypto & DeFi", "NFTs & Gaming", "Tech Products", "Lifestyle", "Education"]
const TIMELINES = ["This week", "Next 2 weeks", "This month", "Flexible"]

export default function CampaignFilters({ filters, setFilters }: CampaignFiltersProps) {
  const handleBudgetChange = (type: "min" | "max", value: number) => {
    setFilters({
      ...filters,
      [type === "min" ? "budgetMin" : "budgetMax"]: value,
    })
  }

  const handleToggleContentType = (type: string) => {
    setFilters({
      ...filters,
      contentTypes: filters.contentTypes.includes(type)
        ? filters.contentTypes.filter((t) => t !== type)
        : [...filters.contentTypes, type],
    })
  }

  const handleToggleCategory = (category: string) => {
    setFilters({
      ...filters,
      categories: filters.categories.includes(category)
        ? filters.categories.filter((c) => c !== category)
        : [...filters.categories, category],
    })
  }

  return (
    <aside className="w-72 border-r-4 border-black p-6 bg-white sticky top-20 h-[calc(100vh-80px)] overflow-y-auto">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h3 className="space-grotesk text-2xl font-bold">Filters</h3>
          <button
            onClick={() =>
              setFilters({
                budgetMin: 100,
                budgetMax: 5000,
                contentTypes: [],
                categories: [],
                timeline: "",
                licenseType: [],
                verifiedOnly: false,
              })
            }
            className="text-sm font-semibold underline hover:text-orange-500"
          >
            Clear All
          </button>
        </div>

        {/* Budget Range */}
        <div>
          <label className="block text-sm font-semibold mb-4">Budget Per Creator</label>
          <div className="space-y-3">
            <div className="flex gap-2">
              <input
                type="number"
                value={filters.budgetMin}
                onChange={(e) => handleBudgetChange("min", Number.parseInt(e.target.value))}
                className="flex-1 border-2 border-black p-2 text-sm focus:outline-none focus:bg-yellow-100"
              />
              <span className="font-semibold">to</span>
              <input
                type="number"
                value={filters.budgetMax}
                onChange={(e) => handleBudgetChange("max", Number.parseInt(e.target.value))}
                className="flex-1 border-2 border-black p-2 text-sm focus:outline-none focus:bg-yellow-100"
              />
            </div>
            <p className="text-xs text-gray-600">
              ${filters.budgetMin} - ${filters.budgetMax}+
            </p>
          </div>
        </div>

        {/* Content Type */}
        <div>
          <label className="block text-sm font-semibold mb-3">Content Format</label>
          <div className="space-y-2">
            {CONTENT_FORMATS.map((format) => (
              <label key={format} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.contentTypes.includes(format)}
                  onChange={() => handleToggleContentType(format)}
                  className="w-4 h-4 border-2 border-black cursor-pointer"
                />
                <span className="text-sm">{format}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-semibold mb-3">Industry/Niche</label>
          <div className="space-y-2">
            {CATEGORIES.map((category) => (
              <label key={category} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.categories.includes(category)}
                  onChange={() => handleToggleCategory(category)}
                  className="w-4 h-4 border-2 border-black cursor-pointer"
                />
                <span className="text-sm">{category}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div>
          <label className="block text-sm font-semibold mb-3">Deadline</label>
          <div className="space-y-2">
            {TIMELINES.map((timeline) => (
              <label key={timeline} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="timeline"
                  checked={filters.timeline === timeline}
                  onChange={() => setFilters({ ...filters, timeline })}
                  className="w-4 h-4 border-2 border-black cursor-pointer"
                />
                <span className="text-sm">{timeline}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Verified Only */}
        <div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.verifiedOnly}
              onChange={(e) => setFilters({ ...filters, verifiedOnly: e.target.checked })}
              className="w-4 h-4 border-2 border-black cursor-pointer"
            />
            <span className="text-sm font-semibold">Verified brands only</span>
          </label>
        </div>

        {/* Apply Button */}
        <button className="w-full border-4 border-black bg-black text-white p-3 font-semibold hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all">
          Apply Filters
        </button>
      </div>
    </aside>
  )
}
