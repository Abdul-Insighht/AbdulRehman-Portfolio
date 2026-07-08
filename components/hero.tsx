"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowDown, Brain, Code, Database, Sparkles } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

export default function Hero() {
    return (
        <section className="py-20 md:py-32 relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-cyan-500/10 animate-gradient"></div>
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"></div>
                {/* Floating Orbs */}
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
                    {/* Greeting */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                        className="mb-6"
                    >
                        <span className="inline-flex items-center gap-2 text-lg text-muted-foreground">
                            <Sparkles className="h-5 w-5 text-primary" />
                            Welcome to my portfolio
                        </span>
                    </motion.div>


                    {/* Name */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4"
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
                        className="text-lg md:text-xl mb-8 text-muted-foreground max-w-2xl mx-auto"
                    >
                        Transforming complex data into actionable insights. Specialized in
                        Deep Learning, Computer Vision, and Agentic AI systems.
                    </motion.p>

                    {/* Skill Badges */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="flex flex-wrap justify-center gap-3 mb-10"
                    >
                        <Badge variant="secondary" className="text-sm px-4 py-2 flex items-center gap-2 hover:bg-primary/20 hover:text-primary transition-colors">
                            <Brain className="h-4 w-4" />
                            Machine Learning
                        </Badge>
                        <Badge variant="secondary" className="text-sm px-4 py-2 flex items-center gap-2 hover:bg-primary/20 hover:text-primary transition-colors">
                            <Code className="h-4 w-4" />
                            Deep Learning
                        </Badge>
                        <Badge variant="secondary" className="text-sm px-4 py-2 hover:bg-primary/20 hover:text-primary transition-colors">
                            Computer Vision
                        </Badge>
                        <Badge variant="secondary" className="text-sm px-4 py-2 hover:bg-primary/20 hover:text-primary transition-colors">
                            Agentic AI
                        </Badge>
                        <Badge variant="secondary" className="text-sm px-4 py-2 flex items-center gap-2 hover:bg-primary/20 hover:text-primary transition-colors">
                            <Database className="h-4 w-4" />
                            RAG Systems
                        </Badge>
                        <Badge variant="secondary" className="text-sm px-4 py-2 hover:bg-primary/20 hover:text-primary transition-colors">
                            Python
                        </Badge>
                        <Badge variant="secondary" className="text-sm px-4 py-2 hover:bg-primary/20 hover:text-primary transition-colors">
                            TensorFlow
                        </Badge>
                        <Badge variant="secondary" className="text-sm px-4 py-2 hover:bg-primary/20 hover:text-primary transition-colors">
                            PyTorch
                        </Badge>
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="flex flex-wrap gap-4 justify-center"
                    >
                        <Button asChild size="lg" className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 text-primary-foreground teal-glow">
                            <Link href="#projects">View My Work</Link>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6 border-2 border-primary/50 hover:bg-primary/10 hover:border-primary teal-glow">
                            <Link href="#contact">Get In Touch</Link>
                        </Button>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="grid grid-cols-3 gap-8 mt-16 max-w-lg mx-auto"
                    >
                        <div className="text-center">
                            <div className="text-3xl md:text-4xl font-bold text-primary">30+</div>
                            <div className="text-sm text-muted-foreground">Projects</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl md:text-4xl font-bold text-primary">3+</div>
                            <div className="text-sm text-muted-foreground">Years Experience</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl md:text-4xl font-bold text-primary">34</div>
                            <div className="text-sm text-muted-foreground">GitHub Repos</div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
            >
                <Link href="#about">
                    <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/20 hover:text-primary">
                        <ArrowDown className="h-6 w-6" />
                    </Button>
                </Link>
            </motion.div>
        </section>
    )
}

