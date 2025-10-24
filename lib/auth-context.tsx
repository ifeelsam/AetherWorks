"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { AuthUser, UserRole } from "./types"

interface AuthContextType {
  user: AuthUser | null
  isLoading: boolean
  login: (walletAddress: string, email?: string) => Promise<void>
  logout: () => void
  setRole: (role: UserRole) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem("authUser")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (walletAddress: string, email?: string) => {
    const newUser: AuthUser = {
      id: `user_${Date.now()}`,
      email,
      walletAddress,
      role: "brand",
      createdAt: new Date(),
    }
    setUser(newUser)
    localStorage.setItem("authUser", JSON.stringify(newUser))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("authUser")
  }

  const setRole = (role: UserRole) => {
    if (user) {
      const updatedUser = { ...user, role }
      setUser(updatedUser)
      localStorage.setItem("authUser", JSON.stringify(updatedUser))
    }
  }

  return <AuthContext.Provider value={{ user, isLoading, login, logout, setRole }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
