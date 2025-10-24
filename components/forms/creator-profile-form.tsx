"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"

const CONTENT_TYPES = [
  { id: "video-short", label: "Video Content", description: "TikTok, YouTube, Reels" },
  { id: "photography", label: "Photography", description: "Product shots, Stills" },
  { id: "written", label: "Written Content", description: "Blogs, Threads, Copy" },
  { id: "audio", label: "Audio/Podcast", description: "Voice, Narration" },
  { id: "design", label: "Graphic Design", description: "Graphics, Illustrations" },
  { id: "3d", label: "3D/Animation", description: "Motion, 3D Assets" },
]

const CATEGORIES = [
  "Crypto & DeFi",
  "NFTs",
  "Gaming",
  "Tech Products",
  "Lifestyle",
  "Fashion",
  "Food & Beverage",
  "Travel",
  "Finance",
  "Education",
  "B2B SaaS",
  "Healthcare",
  "Real Estate",
  "Events",
]

const AUDIENCE_SEGMENTS = [
  "Gen Z (18-24)",
  "Millennials (25-40)",
  "Gen X (41-56)",
  "Web3 natives",
  "Tech enthusiasts",
  "Crypto investors",
  "General consumers",
  "Business professionals",
]

export default function CreatorProfileForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    displayName: "",
    bio: "",
    location: "",
    languages: [] as string[],
    contentTypes: [] as string[],
    categories: [] as string[],
    equipment: "",
    rateMin: 200,
    rateMax: 1000,
    availability: "available",
    turnaround: "3-7",
    restrictions: "",
    audience: [] as string[],
  })

  const [selectedLanguage, setSelectedLanguage] = useState("")
  const [portfolioItems, setPortfolioItems] = useState<Array<{ id: string; title: string; type: string }>>([])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddLanguage = () => {
    if (selectedLanguage && !formData.languages.includes(selectedLanguage)) {
      setFormData((prev) => ({
        ...prev,
        languages: [...prev.languages, selectedLanguage],
      }))
      setSelectedLanguage("")
    }
  }

  const handleRemoveLanguage = (lang: string) => {
    setFormData((prev) => ({
      ...prev,
      languages: prev.languages.filter((l) => l !== lang),
    }))
  }

  const handleToggleContentType = (typeId: string) => {
    setFormData((prev) => ({
      ...prev,
      contentTypes: prev.contentTypes.includes(typeId)
        ? prev.contentTypes.filter((t) => t !== typeId)
        : [...prev.contentTypes, typeId],
    }))
  }

  const handleToggleCategory = (category: string) => {
    setFormData((prev) => ({
      ...prev,
      categories:
        prev.categories.includes(category) && prev.categories.length > 1
          ? prev.categories.filter((c) => c !== category)
          : prev.categories.includes(category)
            ? prev.categories.filter((c) => c !== category)
            : prev.categories.length < 5
              ? [...prev.categories, category]
              : prev.categories,
    }))
  }

  const handleToggleAudience = (segment: string) => {
    setFormData((prev) => ({
      ...prev,
      audience: prev.audience.includes(segment)
        ? prev.audience.filter((a) => a !== segment)
        : [...prev.audience, segment],
    }))
  }

  const handleSave = () => {
    router.push("/campaigns/browse")
  }

  return (
    <form className="space-y-12">
      {/* Section 1: Basic Info */}
      <div className="space-y-6">
        <h2 className="space-grotesk text-3xl font-bold">Basic Information</h2>

        <div>
          <label className="block text-sm font-semibold mb-2">
            Display Name / Creator Handle <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="displayName"
            value={formData.displayName}
            onChange={handleInputChange}
            placeholder="Alex Creates"
            className="w-full border-4 border-black p-4 font-inter text-base focus:outline-none focus:bg-yellow-100"
          />
          <p className="text-xs text-gray-600 mt-2">This is how brands will see you</p>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">
            Profile Picture <span className="text-red-500">*</span>
          </label>
          <div className="border-4 border-black p-8 flex flex-col items-center justify-center bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors">
            <div className="text-4xl mb-2">📷</div>
            <p className="font-semibold">Upload</p>
            <p className="text-xs text-gray-600 mt-2">PNG, JPG up to 2MB</p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            placeholder="Los Angeles, CA"
            className="w-full border-4 border-black p-4 font-inter text-base focus:outline-none focus:bg-yellow-100"
          />
          <p className="text-xs text-gray-600 mt-2">City, State/Country</p>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">
            Bio <span className="text-red-500">*</span>
          </label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            placeholder="I create authentic product reviews and lifestyle content for Web3 brands. Specializing in crypto and tech..."
            className="w-full border-4 border-black p-4 font-inter text-base h-32 focus:outline-none focus:bg-yellow-100 resize-none"
          />
          <p className="text-xs text-gray-600 mt-2">{formData.bio.length}/500</p>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Languages Spoken</label>
          <div className="flex gap-2 mb-3">
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="flex-1 border-4 border-black p-3 font-inter text-base focus:outline-none focus:bg-yellow-100"
            >
              <option value="">Select language</option>
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
              <option value="German">German</option>
              <option value="Hindi">Hindi</option>
              <option value="Mandarin">Mandarin</option>
            </select>
            <button
              type="button"
              onClick={handleAddLanguage}
              className="border-4 border-black px-4 font-semibold hover:bg-green-300 transition-colors"
            >
              + Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.languages.map((lang) => (
              <div key={lang} className="border-4 border-black px-3 py-1 flex items-center gap-2 bg-black text-white">
                <span className="text-sm font-semibold">{lang}</span>
                <button type="button" onClick={() => handleRemoveLanguage(lang)} className="font-bold hover:opacity-70">
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section 2: Content Expertise */}
      <div className="space-y-6 pt-8 border-t-4 border-black">
        <h2 className="space-grotesk text-3xl font-bold">Content Expertise</h2>

        <div>
          <label className="block text-sm font-semibold mb-4">
            What type of content do you create? <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CONTENT_TYPES.map((type) => (
              <button
                key={type.id}
                type="button"
                onClick={() => handleToggleContentType(type.id)}
                className={`border-4 border-black p-4 text-left transition-all ${
                  formData.contentTypes.includes(type.id)
                    ? "bg-green-300 border-l-8 border-l-green-500"
                    : "bg-white hover:bg-gray-50"
                }`}
              >
                <div className="font-semibold">{type.label}</div>
                <div className="text-sm text-gray-600">{type.description}</div>
                {formData.contentTypes.includes(type.id) && <div className="text-sm font-bold mt-2">✓</div>}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-4">
            Content Specialties <span className="text-red-500">*</span> (Select 1-5)
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => handleToggleCategory(category)}
                className={`border-2 border-black px-3 py-2 text-sm font-semibold transition-all ${
                  formData.categories.includes(category) ? "bg-black text-white" : "bg-white hover:bg-gray-100"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-600">Selected: {formData.categories.length}/5</p>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Equipment & Software (Optional)</label>
          <textarea
            name="equipment"
            value={formData.equipment}
            onChange={handleInputChange}
            placeholder="Camera: Sony A7III&#10;Editing: Premiere Pro, After Effects&#10;Microphone: Blue Yeti..."
            className="w-full border-4 border-black p-4 font-inter text-base h-24 focus:outline-none focus:bg-yellow-100 resize-none"
          />
        </div>
      </div>

      {/* Section 3: Audience & Reach */}
      <div className="space-y-6 pt-8 border-t-4 border-black">
        <h2 className="space-grotesk text-3xl font-bold">Audience & Reach</h2>

        <div className="border-4 border-yellow-300 bg-yellow-100 p-4">
          <p className="text-sm font-semibold">💡 Connect social accounts to auto-fill stats</p>
          <div className="flex gap-2 mt-3">
            <button type="button" className="border-2 border-black px-3 py-1 text-xs font-semibold hover:bg-yellow-300">
              Connect TikTok
            </button>
            <button type="button" className="border-2 border-black px-3 py-1 text-xs font-semibold hover:bg-yellow-300">
              Connect Instagram
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-4">Who is your audience?</label>
          <div className="space-y-2">
            {AUDIENCE_SEGMENTS.map((segment) => (
              <label key={segment} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.audience.includes(segment)}
                  onChange={() => handleToggleAudience(segment)}
                  className="w-4 h-4 border-2 border-black cursor-pointer"
                />
                <span className="text-sm">{segment}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Section 4: Work Preferences */}
      <div className="space-y-6 pt-8 border-t-4 border-black">
        <h2 className="space-grotesk text-3xl font-bold">Work Preferences</h2>

        <div>
          <label className="block text-sm font-semibold mb-2">Your Rate Range (Per Deliverable)</label>
          <div className="flex gap-4 items-center">
            <div className="flex-1">
              <input
                type="number"
                value={formData.rateMin}
                onChange={(e) => setFormData((prev) => ({ ...prev, rateMin: Number.parseInt(e.target.value) }))}
                className="w-full border-4 border-black p-3 font-inter text-base focus:outline-none focus:bg-yellow-100"
              />
            </div>
            <span className="font-bold">to</span>
            <div className="flex-1">
              <input
                type="number"
                value={formData.rateMax}
                onChange={(e) => setFormData((prev) => ({ ...prev, rateMax: Number.parseInt(e.target.value) }))}
                className="w-full border-4 border-black p-3 font-inter text-base focus:outline-none focus:bg-yellow-100"
              />
            </div>
            <span className="font-semibold">USDC</span>
          </div>
          <p className="text-xs text-gray-600 mt-2">Brands will see this range when browsing creators. Be realistic.</p>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">
            Current Availability <span className="text-red-500">*</span>
          </label>
          <select
            name="availability"
            value={formData.availability}
            onChange={handleInputChange}
            className="w-full border-4 border-black p-3 font-inter text-base focus:outline-none focus:bg-yellow-100"
          >
            <option value="available">Available immediately</option>
            <option value="1-2weeks">Available in 1-2 weeks</option>
            <option value="limited">Limited availability</option>
            <option value="notaking">Not taking new work</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Typical Turnaround Time</label>
          <select
            name="turnaround"
            value={formData.turnaround}
            onChange={handleInputChange}
            className="w-full border-4 border-black p-3 font-inter text-base focus:outline-none focus:bg-yellow-100"
          >
            <option value="1-3">1-3 days</option>
            <option value="3-7">3-7 days</option>
            <option value="1-2weeks">1-2 weeks</option>
            <option value="2-4weeks">2-4 weeks</option>
            <option value="negotiable">Negotiable per project</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Content I Won't Create (Optional)</label>
          <textarea
            name="restrictions"
            value={formData.restrictions}
            onChange={handleInputChange}
            placeholder="No political content, alcohol, gambling, or adult products."
            className="w-full border-4 border-black p-4 font-inter text-base h-20 focus:outline-none focus:bg-yellow-100 resize-none"
          />
        </div>
      </div>

      {/* Navigation */}
      <div className="flex gap-4 pt-8 border-t-4 border-black">
        <button
          type="button"
          className="flex-1 border-4 border-black p-4 font-semibold hover:bg-gray-100 transition-colors"
        >
          Save Draft
        </button>
        <button
          type="button"
          onClick={handleSave}
          className="flex-1 border-4 border-black bg-black text-white p-4 font-semibold hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all"
        >
          Save & Continue →
        </button>
      </div>
    </form>
  )
}
