"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import AuthCard from "@/components/auth/auth-card"
import RoleSelectionCard from "@/components/auth/role-selection-card"

export default function AuthPage() {
  const router = useRouter()
  const { user, login } = useAuth()
  const [isAuthenticated, setIsAuthenticated] = useState(!!user)
  const [userEmail, setUserEmail] = useState("")

  const handleAuthSuccess = async (walletAddress: string, email?: string) => {
    await login(walletAddress, email)
    setUserEmail(email || "")
    setIsAuthenticated(true)
  }

  const handleRoleSelect = (role: "brand" | "creator" | "both") => {
    if (role === "both") {
      router.push("/dashboard")
    } else if (role === "brand") {
      router.push("/onboarding/brand")
    } else {
      router.push("/dashboard")
    }
  }

  return (
    <main className="min-h-screen w-full bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-[540px]">
        {!isAuthenticated ? (
          <AuthCard onAuthSuccess={handleAuthSuccess} />
        ) : (
          <RoleSelectionCard userEmail={userEmail} onRoleSelect={handleRoleSelect} />
        )}
      </div>
    </main>
  )
}
