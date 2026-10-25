"use client"

import { useState } from "react"
import Link from "next/link"
import { ModeToggle } from "./mode-toggle"
import { Menu, X, FileText, Shield, Github, Linkedin } from "lucide-react"

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
        { href: "/#meet-hafiz", label: "About" },
        { href: "/#experience", label: "Experience" },
        { href: "/#projects", label: "Projects" },
        { href: "/#research", label: "Research" },
        { href: "/#services", label: "Services" },
        { href: "/#contact", label: "Contact" },
    ]

    return (
        <nav className="sticky top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur-md py-3 transition-colors">
            <div className="container mx-auto px-4 sm:px-6 flex justify-between items-center">
                {/* Brand Logo */}
                <Link href="/" className="text-lg sm:text-xl font-bold text-teal-gradient flex items-center gap-2.5">
                    <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                    </span>
                    <span className="tracking-tight">Hafiz Abdul Rehman</span>
                </Link>

                {/* Desktop Navigation Links */}
                <div className="hidden md:flex items-center space-x-7 text-sm font-medium">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-muted-foreground hover:text-primary transition-colors text-xs uppercase tracking-wider font-semibold"
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* Right Action Icons & Buttons */}
                <div className="hidden md:flex items-center space-x-3.5">
                    <Link
                        href="https://github.com/Abdul-Insighht"
                        target="_blank"
                        rel="noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors p-1.5"
                        title="GitHub @Abdul-Insighht"
                    >
                        <Github className="w-4 h-4" />
                    </Link>

                    <Link
                        href="https://linkedin.com/in/hafiz-abdul-rehman-9990ab329"
                        target="_blank"
                        rel="noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors p-1.5"
                        title="LinkedIn"
                    >
                        <Linkedin className="w-4 h-4" />
                    </Link>

                    <Link
                        href="/resume"
                        className="flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-primary to-cyan-600 
                                   text-primary-foreground rounded-full text-xs font-semibold
                                   hover:from-primary/90 hover:to-cyan-500 transition-all duration-300 shadow-sm"
                    >
                        <FileText className="w-3.5 h-3.5" />
                        <span>CV / Resume</span>
                    </Link>

                    <Link
                        href="/admin"
                        className="p-1.5 rounded-full border border-border/80 text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
                        title="Admin Control Center"
                    >
                        <Shield className="w-4 h-4" />
                    </Link>

                    <ModeToggle />
                </div>

                {/* Mobile Menu Button */}
                <div className="flex md:hidden items-center space-x-2">
                    <Link
                        href="/resume"
                        className="px-2.5 py-1 bg-primary text-primary-foreground rounded-full text-[11px] font-semibold"
                    >
                        CV
                    </Link>
                    <ModeToggle />
                    <button
                        onClick={toggleMenu}
                        className="p-2 text-muted-foreground hover:text-foreground focus:outline-none"
                        aria-label="Toggle Navigation Menu"
                    >
                        {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            {isMenuOpen && (
                <div className="md:hidden border-b border-border bg-background/95 backdrop-blur-xl px-4 py-4 space-y-3">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setIsMenuOpen(false)}
                            className="block text-sm font-medium text-muted-foreground hover:text-primary py-1.5"
                        >
                            {link.label}
                        </Link>
                    ))}
                    <div className="pt-3 border-t border-border flex items-center justify-between text-xs">
                        <Link
                            href="/admin"
                            onClick={() => setIsMenuOpen(false)}
                            className="flex items-center gap-1.5 text-muted-foreground hover:text-primary"
                        >
                            <Shield className="w-3.5 h-3.5" />
                            <span>Admin Portal</span>
                        </Link>
                        <div className="flex items-center gap-3">
                            <a href="https://wa.me/923283121702" target="_blank" rel="noreferrer" className="text-emerald-500">
                                <WhatsAppIcon className="w-4 h-4" />
                            </a>
                            <a href="https://github.com/Abdul-Insighht" target="_blank" rel="noreferrer" className="text-muted-foreground">
                                <Github className="w-4 h-4" />
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    )
}
