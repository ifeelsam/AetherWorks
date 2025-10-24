"use client"

import CreatorProfileForm from "@/components/forms/creator-profile-form"

export default function CreatorProfilePage() {
  return (
    <main className="min-h-screen w-full bg-white p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-12">
          <h1 className="space-grotesk text-5xl md:text-6xl font-bold mb-4">Creator Profile</h1>
          <p className="text-lg text-gray-600">Tell brands about yourself</p>
        </div>
        <CreatorProfileForm />
      </div>
    </main>
  )
}
