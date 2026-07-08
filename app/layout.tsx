import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"
import ParticlesBackground from "@/components/particles-background"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "Hafiz Abdul Rehman | Data Scientist & ML Engineer",
    description: "Portfolio showcasing AI/ML projects and skills of Hafiz Abdul Rehman - Data Scientist, ML Engineer, and Computer Vision Expert",
    keywords: ["Data Scientist", "Machine Learning", "Deep Learning", "Computer Vision", "AI Engineer", "Python", "Portfolio"],
    authors: [{ name: "Hafiz Abdul Rehman" }],
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={inter.className}>
                <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
                    <ParticlesBackground />
                    <div className="flex min-h-screen flex-col">
                        <Navbar />
                        <main className="flex-1">{children}</main>
                        <Footer />
                    </div>
                    <Toaster />
                </ThemeProvider>
            </body>
        </html>
    )
}

