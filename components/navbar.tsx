"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "./mode-toggle"
import { Menu, X, Github, Linkedin, FileText, Shield, Sparkles } from "lucide-react"

// WhatsApp SVG Icon Component
function WhatsAppIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
    )
}

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const navLinks = [
        { href: "/#meet-hafiz", label: "Meet Hafiz" },
        { href: "/#services", label: "Services" },
        { href: "/#tech-stack", label: "Stack" },
        { href: "/#projects", label: "Projects" },
        { href: "/#visualization", label: "Analytics" },
        { href: "/#research", label: "Research" },
        { href: "/#supervisions", label: "Supervisions" },
        { href: "/#certificates", label: "Certificates" },
        { href: "/#contact", label: "Contact" },
    ]

    return (
        <nav className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md py-3.5">
            <div className="container mx-auto px-4 flex justify-between items-center">
                <Link href="/" className="text-xl font-bold text-teal-gradient flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    Hafiz Abdul Rehman
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center space-x-5 text-sm font-medium">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="hover:text-primary transition-colors text-slate-300 hover:text-white"
                        >
                            {link.label}
                        </Link>
                    ))}

                    {/* Resume Button */}
                    <Link
                        href="/resume"
                        className="flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-primary to-cyan-600 
                                   text-primary-foreground rounded-full text-xs font-semibold
                                   hover:from-primary/90 hover:to-cyan-500 transition-all duration-300
                                   shadow-md shadow-primary/20 hover:scale-105"
                    >
                        <FileText className="h-3.5 w-3.5" />
                        Print CV
                    </Link>

                    {/* Admin Portal Link */}
                    <Link
                        href="/admin/login"
                        className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-primary hover:bg-primary/10 transition-colors border border-slate-800"
                        title="Engineering Control Center / Admin Login"
                    >
                        <Shield className="h-3.5 w-3.5" />
                        Admin
                    </Link>

                    <div className="flex items-center gap-1.5 ml-2 border-l border-slate-800 pl-3">
                        <Link
                            href="https://github.com/Abdul-Insighht"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-primary transition-colors p-1.5 rounded-full hover:bg-primary/10 text-slate-400"
                            title="GitHub @Abdul-Insighht"
                        >
                            <Github className="h-4 w-4" />
                        </Link>
                        <Link
                            href="https://linkedin.com/in/hafiz-abdul-rehman-9990ab329"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-primary transition-colors p-1.5 rounded-full hover:bg-primary/10 text-slate-400"
                            title="LinkedIn"
                        >
                            <Linkedin className="h-4 w-4" />
                        </Link>
                        <Link
                            href="https://wa.me/923283121702"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-primary transition-colors p-1.5 rounded-full hover:bg-primary/10 text-slate-400"
                            title="WhatsApp: +92-3283121702"
                        >
                            <WhatsAppIcon className="h-4 w-4" />
                        </Link>
                        <ModeToggle />
                    </div>
                </div>

                {/* Mobile Navigation Toggle */}
                <div className="lg:hidden flex items-center gap-2">
                    <Link
                        href="/resume"
                        className="flex items-center gap-1 px-3 py-1 bg-primary text-primary-foreground 
                                   rounded-full text-xs font-semibold hover:bg-primary/90 transition-colors"
                    >
                        <FileText className="h-3 w-3" />
                        CV
                    </Link>

                    <ModeToggle />

                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleMenu}
                        aria-label="Toggle Menu"
                        className="p-1 rounded-md hover:bg-primary/10 text-slate-200"
                    >
                        {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </Button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMenuOpen && (
                <div className="lg:hidden px-4 pt-3 pb-6 border-t border-border mt-2 space-y-3 bg-background/95 backdrop-blur-xl">
                    <div className="flex flex-col space-y-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsMenuOpen(false)}
                                className="px-3 py-2 rounded-lg text-sm font-medium hover:bg-primary/10 hover:text-primary transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                        <Link
                            href="/admin/login"
                            onClick={() => setIsMenuOpen(false)}
                            className="flex items-center gap-2 text-xs font-semibold text-primary"
                        >
                            <Shield className="h-4 w-4" />
                            Admin Control Center
                        </Link>

                        <div className="flex items-center gap-3">
                            <a href="https://github.com/Abdul-Insighht" target="_blank" rel="noopener noreferrer">
                                <Github className="h-4 w-4 text-slate-400" />
                            </a>
                            <a href="https://linkedin.com/in/hafiz-abdul-rehman-9990ab329" target="_blank" rel="noopener noreferrer">
                                <Linkedin className="h-4 w-4 text-slate-400" />
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    )
}
