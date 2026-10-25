"use client"

import { motion } from "framer-motion"
import { Sparkles, Brain, Eye, Cpu, Database, CheckCircle2, ArrowUpRight, Github, Linkedin, Mail, MapPin } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function MeetHafiz() {
  return (
    <section id="meet-hafiz" className="py-24 relative overflow-hidden bg-slate-950/40 border-y border-slate-800/60">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-3xl mb-12"
        >
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">
            01 / Meet Hafiz Abdul Rehman
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">
            AI Engineering Built on Evidence, Rigor, & Deliverability
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            I don’t build toy AI prototypes. I engineer production-grade computer vision systems, clinically validated medical deep learning networks, and bounded agentic RAG workflows designed to survive real-world constraints.
          </p>
        </motion.div>

        {/* Narrative & Visual Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Portrait Card & Bio Meta (4 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-4"
          >
            <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 relative group overflow-hidden shadow-xl">
              {/* Glow Accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full filter blur-2xl pointer-events-none" />

              <div className="relative mb-5 flex items-center gap-4">
                <div className="relative h-20 w-20 rounded-2xl overflow-hidden border-2 border-primary/50 shadow-lg shadow-primary/20 flex-shrink-0 bg-slate-900">
                  <div className="h-full w-full bg-gradient-to-tr from-slate-800 to-slate-900 flex items-center justify-center text-primary font-bold text-2xl">
                    AR
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Hafiz Abdul Rehman</h3>
                  <p className="text-xs text-primary font-medium">AI & Machine Learning Engineer</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                    <MapPin className="h-3 w-3 text-slate-400" />
                    Pakistan • Worldwide Remote
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                Bachelor of Science in Data Science (2022 – 2026) from <strong>GIFT University</strong> (CGPA: 3.68/4.0, Semesters 7 & 8: 4.0/4.0). AI & Machine Learning Engineer at AiBit Soft developing AURA OS multi-agent assistant, real-time computer vision telemetry, and enterprise RAG pipelines.
              </p>

              {/* Credibility Checklist */}
              <div className="space-y-2.5 text-xs text-slate-300 border-t border-slate-800/80 pt-4 mb-6">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                  <span>99.64% MRI Tumor Segmentation on BraTS 2020</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                  <span>98.93% COVID-19 Radiographic CNN Ensemble</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                  <span>57 Verified Public GitHub Repositories</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                  <span>Real-Time 60+ FPS YOLO Multi-Object Telemetry</span>
                </div>
              </div>

              {/* Social Channels / "Find Me On" */}
              <div className="border-t border-slate-800/80 pt-4">
                <p className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground mb-2.5">
                  Find me on
                </p>
                <div className="flex flex-wrap gap-2">
                  <a
                    href="https://github.com/Abdul-Insighht"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-slate-800 hover:bg-primary/20 text-slate-300 hover:text-primary transition-colors border border-slate-700/60"
                    title="GitHub @Abdul-Insighht"
                  >
                    <Github className="h-4 w-4" />
                  </a>
                  <a
                    href="https://linkedin.com/in/hafiz-abdul-rehman-9990ab329"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-slate-800 hover:bg-primary/20 text-slate-300 hover:text-primary transition-colors border border-slate-700/60"
                    title="LinkedIn"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                  <a
                    href="mailto:hafizrehman3321@gmail.com"
                    className="p-2 rounded-lg bg-slate-800 hover:bg-primary/20 text-slate-300 hover:text-primary transition-colors border border-slate-700/60"
                    title="Direct Email"
                  >
                    <Mail className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Three Engineering Core Pillars (8 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-8 space-y-4"
          >
            {/* Pillar 1: Medical AI & Deep Learning */}
            <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-primary/50 transition-all duration-300">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  <Brain className="h-5 w-5" />
                </div>
                <h4 className="text-base sm:text-lg font-bold text-white">
                  Medical Deep Learning & Non-Linear Ensembles
                </h4>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Specialized in deep segmentation architectures (Attention U-Net, 3D Convolutions, and Fuzzy Integral decision fusion). Rather than treating medical images as generic arrays, I formulate domain-specific loss functions (Focal Tversky, Dice Loss) to conquer extreme class imbalances and guarantee sub-millimeter clinical delineation.
              </p>
            </div>

            {/* Pillar 2: Real-Time Computer Vision */}
            <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-primary/50 transition-all duration-300">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-xl bg-cyan-500/15 text-cyan-400 border border-cyan-500/30">
                  <Eye className="h-5 w-5" />
                </div>
                <h4 className="text-base sm:text-lg font-bold text-white">
                  Real-Time Computer Vision & Optical Telemetry
                </h4>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Engineering high-throughput video pipelines using YOLO11, ByteTrack association, and 4-point inverse perspective mapping (homography). Whether tracking fast occluded soccer players or measuring highway velocity without radar, my systems achieve 60+ FPS throughput on GPU hardware.
              </p>
            </div>

            {/* Pillar 3: Agentic AI & RAG */}
            <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-primary/50 transition-all duration-300">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-xl bg-purple-500/15 text-purple-400 border border-purple-500/30">
                  <Database className="h-5 w-5" />
                </div>
                <h4 className="text-base sm:text-lg font-bold text-white">
                  Bounded Agentic AI & Structured RAG Architectures
                </h4>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Constructing autonomous LLM agents that operate within rigorous programmatic boundaries. Utilizing recursive semantic chunking, ChromaDB vector indexing, and structured schema verification (Pydantic / Gemini structured outputs) to automate complex tasks like scientific research paper component extraction with zero hallucinations.
              </p>
            </div>

            {/* Quick Action Navigation */}
            <div className="pt-2 flex flex-wrap gap-4">
              <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="#services">
                  Inspect Freelance Services
                  <ArrowUpRight className="ml-1.5 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
                <Link href="#research">
                  Review Research Publications
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
