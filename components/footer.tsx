"use client"

import { Github, Linkedin, Facebook, Mail, Heart, Phone, Shield, ExternalLink, ArrowUpRight, Sparkles } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

// WhatsApp SVG Icon Component
function WhatsAppIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
    )
}

export default function Footer() {
    return (
        <footer className="bg-slate-950 border-t border-slate-800/80 pt-16 pb-12 text-slate-300">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
                    {/* Col 1: Bio & Status (4 cols) */}
                    <div className="lg:col-span-4 space-y-4">
                        <Link href="/" className="text-xl font-bold text-teal-gradient inline-flex items-center gap-2">
                            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
                            Hafiz Abdul Rehman
                        </Link>
                        <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
                            Data Scientist & AI/ML Engineer specializing in Computer Vision, Medical Deep Learning, and Agentic RAG workflows. Built with empirical rigor and verified public code.
                        </p>
                        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 space-y-1">
                            <p className="text-primary font-semibold">GitHub Engine Status:</p>
                            <p className="text-slate-400">Live dynamic sync enabled • 57 verified repositories indexed.</p>
                        </div>
                    </div>

                    {/* Col 2: Explore (3 cols) */}
                    <div className="lg:col-span-3 space-y-3">
                        <h4 className="text-xs uppercase tracking-wider font-bold text-white">
                            Explore
                        </h4>
                        <ul className="space-y-2 text-sm text-slate-400">
                            <li>
                                <Link href="/#meet-hafiz" className="hover:text-primary transition-colors">
                                    About (Meet Hafiz)
                                </Link>
                            </li>
                            <li>
                                <Link href="/#services" className="hover:text-primary transition-colors">
                                    Services & Offerings
                                </Link>
                            </li>
                            <li>
                                <Link href="/#projects" className="hover:text-primary transition-colors">
                                    Browse Curated Projects
                                </Link>
                            </li>
                            <li>
                                <Link href="/#experience" className="hover:text-primary transition-colors">
                                    Professional Experience
                                </Link>
                            </li>
                            <li>
                                <Link href="/#research" className="hover:text-primary transition-colors">
                                    Research & Publications
                                </Link>
                            </li>
                            <li>
                                <Link href="/#education" className="hover:text-primary transition-colors">
                                    Education & Certifications
                                </Link>
                            </li>
                            <li>
                                <Link href="/#contact" className="hover:text-primary transition-colors">
                                    Contact & Inquiries
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Col 3: Resources (2 cols) */}
                    <div className="lg:col-span-2 space-y-3">
                        <h4 className="text-xs uppercase tracking-wider font-bold text-white">
                            Resources
                        </h4>
                        <ul className="space-y-2 text-sm text-slate-400">
                            <li>
                                <Link href="/resume" className="hover:text-primary transition-colors flex items-center gap-1">
                                    Printable CV / PDF
                                    <ArrowUpRight className="h-3 w-3 text-primary" />
                                </Link>
                            </li>
                            <li>
                                <Link href="/admin/login" className="hover:text-primary transition-colors flex items-center gap-1">
                                    <Shield className="h-3 w-3 text-primary" />
                                    Admin Portal
                                </Link>
                            </li>
                            <li>
                                <Link href="/#research" className="hover:text-primary transition-colors">
                                    Blog & Research
                                </Link>
                            </li>
                            <li>
                                <Link href="/#services" className="hover:text-primary transition-colors">
                                    AI Shop & Solutions
                                </Link>
                            </li>
                            <li>
                                <Link href="/#contact" className="hover:text-primary transition-colors">
                                    Order / Project Status Check
                                </Link>
                            </li>
                            <li>
                                <a
                                    href="https://education.github.com/pack"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-primary transition-colors flex items-center gap-1"
                                >
                                    GitHub Student Pack
                                    <ExternalLink className="h-3 w-3 text-primary" />
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Col 4: Get in Touch & Socials (3 cols) */}
                    <div className="lg:col-span-3 space-y-3">
                        <h4 className="text-xs uppercase tracking-wider font-bold text-white">
                            Get In Touch
                        </h4>
                        <div className="space-y-2 text-sm text-slate-400">
                            <p>
                                <a href="mailto:hafizrehman3321@gmail.com" className="hover:text-primary transition-colors font-mono text-xs">
                                    hafizrehman3321@gmail.com
                                </a>
                            </p>
                            <p>
                                <a href="https://wa.me/923283121702" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                                    WhatsApp: +92 328 3121702
                                </a>
                            </p>
                            <p className="text-xs text-muted-foreground">
                                Typical response time: Within 1 business day.
                            </p>
                        </div>

                        <div className="flex items-center gap-2 pt-2">
                            <a
                                href="https://github.com/Abdul-Insighht"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-lg bg-slate-900 hover:bg-primary/20 text-slate-300 hover:text-primary border border-slate-800 transition-colors"
                                title="GitHub"
                            >
                                <Github className="h-4 w-4" />
                            </a>
                            <a
                                href="https://linkedin.com/in/hafiz-abdul-rehman-9990ab329"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-lg bg-slate-900 hover:bg-primary/20 text-slate-300 hover:text-primary border border-slate-800 transition-colors"
                                title="LinkedIn"
                            >
                                <Linkedin className="h-4 w-4" />
                            </a>
                            <a
                                href="https://wa.me/923283121702"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-lg bg-slate-900 hover:bg-primary/20 text-slate-300 hover:text-primary border border-slate-800 transition-colors"
                                title="WhatsApp"
                            >
                                <WhatsAppIcon className="h-4 w-4" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
                    <p>© {new Date().getFullYear()} Hafiz Abdul Rehman. All engineering rights reserved.</p>
                    <p className="flex items-center gap-1.5">
                        <span>Calibrated with mathematical rigor</span>
                        <span>•</span>
                        <Link href="/admin/login" className="hover:text-primary transition-colors">
                            Admin Login
                        </Link>
                    </p>
                </div>
            </div>
        </footer>
    )
}
