"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowDown, Brain, Code, Database, Sparkles, Cpu, Eye, ShieldCheck, ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

export default function Hero() {
    return (
        <section className="py-20 md:py-28 relative overflow-hidden">
            {/* Animated Background with Math & Neural Matrix Accents */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-cyan-500/10 animate-gradient"></div>
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"></div>

                {/* Subtle Neural Math Lattice (Athar inspired) */}
                <div
                    className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
                    style={{
                        backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
                        backgroundSize: "28px 28px",
                    }}
                />

                {/* Floating Glow Orbs */}
                <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full filter blur-3xl animate-pulse-glow"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/15 rounded-full filter blur-3xl animate-pulse-glow delay-1000"></div>
            </div>

            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl mx-auto text-center"
                >
                    {/* Welcome Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                        className="mb-6 inline-flex"
                    >
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-primary/30 text-sm text-slate-300 shadow-md">
                            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                            <Sparkles className="h-4 w-4 text-primary" />
                            AI Engineering • Computer Vision • Medical Deep Learning
                        </span>
                    </motion.div>

                    {/* Name */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 tracking-tight"
                    >
                        Hi, I'm{" "}
                        <span className="text-teal-gradient">
                            Hafiz Abdul Rehman
                        </span>
                    </motion.h1>

                    {/* Title */}
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-2xl md:text-3xl font-semibold text-primary mb-6"
                    >
                        Data Scientist | AI/ML Engineer | Computer Vision Expert
                    </motion.h2>

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-lg md:text-xl mb-8 text-muted-foreground max-w-2xl mx-auto leading-relaxed"
                    >
                        Transforming complex data into actionable insights. Specialized in
                        Deep Learning, Computer Vision, and Agentic AI systems with verified clinical & telemetry metrics.
                    </motion.p>

                    {/* Skill Badges */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="flex flex-wrap justify-center gap-2.5 mb-10"
                    >
                        <Badge variant="secondary" className="text-xs sm:text-sm px-3.5 py-1.5 flex items-center gap-1.5 hover:bg-primary/20 hover:text-primary transition-colors">
                            <Brain className="h-3.5 w-3.5 text-primary" />
                            Attention U-Net (99.64% Acc)
                        </Badge>
                        <Badge variant="secondary" className="text-xs sm:text-sm px-3.5 py-1.5 flex items-center gap-1.5 hover:bg-primary/20 hover:text-primary transition-colors">
                            <Eye className="h-3.5 w-3.5 text-cyan-400" />
                            YOLO11 & ByteTrack
                        </Badge>
                        <Badge variant="secondary" className="text-xs sm:text-sm px-3.5 py-1.5 flex items-center gap-1.5 hover:bg-primary/20 hover:text-primary transition-colors">
                            <Database className="h-3.5 w-3.5 text-purple-400" />
                            Agentic AI & RAG
                        </Badge>
                        <Badge variant="secondary" className="text-xs sm:text-sm px-3.5 py-1.5 flex items-center gap-1.5 hover:bg-primary/20 hover:text-primary transition-colors">
                            <Cpu className="h-3.5 w-3.5 text-amber-400" />
                            Fuzzy Ensemble (98.93% Acc)
                        </Badge>
                        <Badge variant="secondary" className="text-xs sm:text-sm px-3.5 py-1.5 hover:bg-primary/20 hover:text-primary transition-colors">
                            PyTorch
                        </Badge>
                        <Badge variant="secondary" className="text-xs sm:text-sm px-3.5 py-1.5 hover:bg-primary/20 hover:text-primary transition-colors">
                            FastAPI & MLOps
                        </Badge>
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="flex flex-wrap gap-4 justify-center"
                    >
                        <Button asChild size="lg" className="text-base sm:text-lg px-8 py-6 bg-primary hover:bg-primary/90 text-primary-foreground teal-glow">
                            <Link href="#projects">View Curated Catalog</Link>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="text-base sm:text-lg px-8 py-6 border-2 border-primary/50 hover:bg-primary/10 hover:border-primary teal-glow">
                            <Link href="#contact">Have a Problem to Solve?</Link>
                        </Button>
                    </motion.div>

                    {/* Stats Counter */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="grid grid-cols-3 gap-6 mt-14 max-w-lg mx-auto p-4 rounded-2xl bg-slate-900/60 border border-slate-800"
                    >
                        <div className="text-center">
                            <div className="text-2xl md:text-4xl font-extrabold text-primary">57+</div>
                            <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">GitHub Repos</div>
                        </div>
                        <div className="text-center border-x border-slate-800">
                            <div className="text-2xl md:text-4xl font-extrabold text-cyan-400">99.64%</div>
                            <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Model Accuracy</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl md:text-4xl font-extrabold text-teal-400">3+</div>
                            <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Years Experience</div>
                        </div>
                    </motion.div>

                    {/* ── Proof Strip (Ibadat Ali inspired) ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mt-12 pt-8 border-t border-slate-800/80"
                    >
                        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-left hover:border-primary/40 transition-colors">
                            <strong className="block text-sm font-semibold text-white">Agents with purpose</strong>
                            <span className="text-xs text-slate-400 mt-1 block">Tools, retrieval, and clear boundaries</span>
                        </div>
                        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-left hover:border-primary/40 transition-colors">
                            <strong className="block text-sm font-semibold text-white">AI engineered end to end</strong>
                            <span className="text-xs text-slate-400 mt-1 block">Models, APIs, and usable products</span>
                        </div>
                        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-left hover:border-primary/40 transition-colors">
                            <strong className="block text-sm font-semibold text-white">Built to hand over</strong>
                            <span className="text-xs text-slate-400 mt-1 block">Evaluation, documentation, and delivery</span>
                        </div>
                        <Link
                            href="#projects"
                            className="p-4 rounded-xl bg-gradient-to-br from-primary/15 to-cyan-500/10 border border-primary/40 text-left flex flex-col justify-between group hover:border-primary hover:bg-primary/20 transition-all"
                        >
                            <span className="text-[11px] text-primary font-bold uppercase tracking-wider">Explore 57 Repos</span>
                            <span className="text-xs sm:text-sm font-semibold text-white flex items-center justify-between group-hover:text-primary transition-colors">
                                View Curated Catalog
                                <ArrowUpRight className="h-4 w-4 text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </span>
                        </Link>
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce"
            >
                <Link href="#meet-hafiz" aria-label="Scroll down">
                    <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/20 hover:text-primary">
                        <ArrowDown className="h-5 w-5" />
                    </Button>
                </Link>
            </motion.div>
        </section>
    )
}
