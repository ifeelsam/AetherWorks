import type React from "react"

interface BrutalistCardProps {
  children: React.ReactNode
  className?: string
  shadow?: "sm" | "md" | "lg"
}

export function BrutalistCard({ children, className = "", shadow = "md" }: BrutalistCardProps) {
  const shadowClass = {
    sm: "brutalist-shadow-sm",
    md: "brutalist-shadow",
    lg: "brutalist-shadow-lg",
  }[shadow]

  return <div className={`border-4 border-black bg-white p-8 ${shadowClass} ${className}`}>{children}</div>
}
