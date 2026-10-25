import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import SiteLayout from "@/components/site-layout"
import { Toaster } from "@/components/ui/toaster"
import ParticlesBackground from "@/components/particles-background"
import MathNeuralBackground from "@/components/math-neural-background"
import AbdulInsightBot from "@/components/abdul-insight-bot"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "Hafiz Abdul Rehman | Data Scientist & AI/ML Engineer",
    description: "Portfolio showcasing AI/ML projects and skills of Hafiz Abdul Rehman - Data Scientist, ML Engineer, and Computer Vision Expert",
    keywords: ["Data Scientist", "Machine Learning", "Deep Learning", "Computer Vision", "AI Engineer", "Python", "RAG", "Portfolio"],
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
                    <MathNeuralBackground />
                    <ParticlesBackground />
                    <SiteLayout>{children}</SiteLayout>
                    <AbdulInsightBot />
                    <Toaster />
                </ThemeProvider>
            </body>
        </html>
    )
}
