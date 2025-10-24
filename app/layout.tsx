import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Web3Provider } from "@/lib/web3-provider"
import { AuthProvider } from "@/lib/auth-context"
import "./globals.css"

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["400", "500", "700"] })
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"] })

export const metadata: Metadata = {
  title: "AetherWorks - Create. Connect. Get Paid.",
  description:
    "The decentralized marketplace where Web3 brands meet UGC creators. Smart contracts handle everything—escrow, licensing, payments. No middlemen. No platform fees.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
        style={{ "--font-space-grotesk": spaceGrotesk.style.fontFamily } as React.CSSProperties}
      >
        <Web3Provider>
          <AuthProvider>{children}</AuthProvider>
        </Web3Provider>
        <Analytics />
      </body>
    </html>
  )
}
