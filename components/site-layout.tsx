"use client"

import { usePathname } from "next/navigation"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdminRoute = pathname?.startsWith("/admin")

  if (isAdminRoute) {
    // Admin routes have their own full-screen sidebar, header, and navigation
    return <main className="min-h-screen relative z-10">{children}</main>
  }

  // Public routes render the clean public navbar and footer
  return (
    <div className="flex min-h-screen flex-col relative z-10">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
