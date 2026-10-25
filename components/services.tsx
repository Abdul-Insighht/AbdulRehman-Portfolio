"use client"

import { motion } from "framer-motion"
import { Sparkles, Eye, Brain, Database, Cloud, Check, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const SERVICES = [
  {
    id: "vision-telemetry",
    title: "Computer Vision & Visual Telemetry",
    category: "Real-Time Perception",
    icon: Eye,
    description:
      "Custom deep learning vision architectures for high-speed object detection, persistent multi-agent tracking, and optical perspective geometry calibration.",
    deliverables: [
      "YOLO11 / ByteTrack multi-object tracking pipelines",
      "Inverse perspective mapping (speed & distance telemetry)",
      "MediaPipe keypoint gesture & pose estimation",
      "GPU-accelerated inference achieving 60+ FPS",
    ],
    idealFor: "Sports analytics, traffic monitoring, surveillance, and industrial robotics.",
  },
  {
    id: "agentic-rag",
    title: "Enterprise Agentic AI & RAG Systems",
    category: "LLM Orchestration",
    icon: Database,
    description:
      "Autonomous tool-calling agents and domain-calibrated RAG pipelines that synthesize complex whitepapers and internal documents into structured data with zero hallucinations.",
    deliverables: [
      "LangChain & LangGraph deterministic agent loops",
      "ChromaDB / Pinecone hybrid vector search retrieval",
      "Pydantic structured schema validation & audit logging",
      "Interactive Streamlit & Next.js conversational interfaces",
    ],
    idealFor: "Legal/medical document search, academic whitepaper extraction, and customer intelligence.",
  },
  {
    id: "medical-ai",
    title: "Medical Deep Learning & Segmentation",
    category: "Clinical AI Diagnostics",
    icon: Brain,
    description:
      "High-precision convolutional and attention-gated neural networks for 3D MRI sub-region segmentation and radiographic CT scan pathology classification.",
    deliverables: [
      "Attention U-Net architectures for MRI / CT volumes",
      "Sugeno fuzzy integral non-linear decision ensembles",
      "Severe class-imbalance loss engineering (Focal Dice)",
      "Grad-CAM visual heatmaps for clinical interpretability",
    ],
    idealFor: "Biomedical research labs, radiology assisted screening, and healthtech platforms.",
  },
  {
    id: "mlops-deployment",
    title: "End-to-End MLOps & API Deployment",
    category: "Production Engineering",
    icon: Cloud,
    description:
      "Bridging the gap between Jupyter prototypes and production by packaging models into scalable Docker containers with asynchronous REST endpoints and versioned data pipelines.",
    deliverables: [
      "FastAPI asynchronous inference microservices",
      "Docker containerization & GPU driver configuration",
      "DVC reproducible dataset and model version tracking",
      "AWS EC2 / S3 automated deployment and monitoring",
    ],
    idealFor: "Startups and enterprises ready to put ML models into live client-facing software.",
  },
]

export default function Services() {
  return (
    <section id="services" className="py-24 relative overflow-hidden bg-slate-950/60 border-t border-slate-800/80">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            Client & Freelance Capabilities
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 section-underline">
            Specialized Engineering Services
          </h2>
          <p className="mt-6 text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg">
            Engineering services delivered with rigorous validation, clean documentation, and production hand-over readiness.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICES.map((srv, idx) => {
            const Icon = srv.icon
            return (
              <motion.div
                key={srv.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="p-8 rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-950/90 border border-slate-800
                           hover:border-primary/50 transition-all duration-300 shadow-xl flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-slate-800/80 text-primary border border-slate-700/60 group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="text-xs font-semibold text-primary/90 bg-primary/10 border border-primary/20 px-3 py-1 rounded-full">
                      {srv.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                    {srv.title}
                  </h3>

                  <p className="text-sm text-slate-300 leading-relaxed mb-6">
                    {srv.description}
                  </p>

                  <div className="space-y-2.5 mb-6">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                      Key Deliverables
                    </p>
                    {srv.deliverables.map((item, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                        <Check className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground italic max-w-[65%] line-clamp-1">
                    {srv.idealFor}
                  </span>
                  <Button asChild size="sm" variant="outline" className="border-primary/40 hover:bg-primary/10 text-primary">
                    <Link href="#contact">
                      Inquire Scope
                      <ArrowUpRight className="ml-1.5 h-3.5 w-3.5" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-14 p-8 rounded-2xl bg-gradient-to-r from-primary/15 via-slate-900 to-cyan-500/10 border border-primary/30 text-center flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div className="text-left">
            <h4 className="text-lg font-bold text-white mb-1">
              Have a custom AI or Computer Vision problem to solve?
            </h4>
            <p className="text-sm text-muted-foreground">
              Most projects begin with a focused 30-minute discovery conversation about constraints, data, and fit.
            </p>
          </div>
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold flex-shrink-0">
            <Link href="#contact">Schedule 30-Min Call</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
