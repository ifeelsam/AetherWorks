"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import CompanyInfoForm from "@/components/forms/company-info-form"
import type { CompanyInfo } from "@/lib/types"

export default function CompanyInfoPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (data: CompanyInfo) => {
    setIsSubmitting(true)
    // Save to localStorage for now
    localStorage.setItem("companyInfo", JSON.stringify(data))
    setTimeout(() => {
      setIsSubmitting(false)
      router.push("/onboarding/brand")
    }, 500)
  }

  return (
    <main className="min-h-screen w-full bg-white p-8">
      <div className="max-w-2xl mx-auto">
        <CompanyInfoForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      </div>
    </main>
  )
}
