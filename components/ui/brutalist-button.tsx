import type React from "react"

interface BrutalistButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger"
  size?: "sm" | "md" | "lg"
  children: React.ReactNode
}

export function BrutalistButton({ variant = "primary", size = "md", className = "", ...props }: BrutalistButtonProps) {
  const baseStyles = "brutalist-btn font-space-grotesk font-bold transition-all"

  const variantStyles = {
    primary: "bg-black text-white border-4 border-black",
    secondary: "bg-white text-black border-4 border-black",
    danger: "bg-red-600 text-white border-4 border-red-600",
  }

  const sizeStyles = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  }

  return <button className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`} {...props} />
}
