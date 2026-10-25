"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Sparkles, Layers, Cpu, Eye, Brain, Database, Cloud, Code2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface TechDomain {
  id: string
  title: string
  description: string
  icon: any
  badgeColor: string
  skills: { name: string; level: string; icon: string }[]
}

const TECH_DOMAINS: TechDomain[] = [
  {
    id: "computer-vision",
    title: "Computer Vision & Visual Telemetry",
    description: "Real-time edge & cloud detection, multi-agent tracking, optical perspective calibration, and landmark extraction.",
    icon: Eye,
    badgeColor: "bg-cyan-500/15 text-cyan-400 border-cyan-500/30",
    skills: [
      { name: "YOLO (v8/11)", level: "Production", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
      { name: "OpenCV", level: "Advanced", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/opencv/opencv-original.svg" },
      { name: "ByteTrack", level: "Production", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
      { name: "MediaPipe", level: "Production", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg" },
      { name: "SAM (Segment Anything)", level: "Research", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg" },
      { name: "Inverse Perspective Homography", level: "Specialized", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/numpy/numpy-original.svg" },
      { name: "Albumentations", level: "Advanced", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
    ],
  },
  {
    id: "deep-learning",
    title: "Deep Learning & Medical Diagnostics",
    description: "Multimodal 3D segmentation, Sugeno fuzzy integral decision ensembles, attention gates, and loss function engineering.",
    icon: Brain,
    badgeColor: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    skills: [
      { name: "PyTorch", level: "Core", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg" },
      { name: "Attention U-Net", level: "Expert (99.64%)", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg" },
      { name: "Fuzzy Integral Ensembles", level: "Research (98.93%)", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg" },
      { name: "TensorFlow & Keras", level: "Advanced", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg" },
      { name: "Torchvision", level: "Advanced", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg" },
      { name: "BraTS & CT Preprocessing", level: "Specialized", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
      { name: "Grad-CAM Interpretability", level: "Production", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
    ],
  },
  {
    id: "agentic-ai",
    title: "Agentic AI, RAG & LLM Workflows",
    description: "Deterministic tool-calling, semantic vector retrieval, structured Pydantic schema validation, and multi-agent coordination.",
    icon: Database,
    badgeColor: "bg-purple-500/15 text-purple-400 border-purple-500/30",
    skills: [
      { name: "LangChain & LangGraph", level: "Production", icon: "https://python.langchain.com/img/brand/wordmark.png" },
      { name: "ChromaDB", level: "Production", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
      { name: "Google Gemini 2.0 API", level: "Expert", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg" },
      { name: "Groq Llama-3.3", level: "Production", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
      { name: "Ollama (Local Models)", level: "Advanced", icon: "https://ollama.com/public/ollama.png" },
      { name: "Pydantic Structured Outputs", level: "Core", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
      { name: "Hugging Face Hub", level: "Advanced", icon: "https://huggingface.co/front/assets/huggingface_logo-noborder.svg" },
    ],
  },
  {
    id: "backend-mlops",
    title: "Backend, MLOps & API Deployment",
    description: "Containerized model microservices, asynchronous REST endpoints, reproducible data pipelines, and CI/CD.",
    icon: Cloud,
    badgeColor: "bg-blue-500/15 text-blue-400 border-blue-500/30",
    skills: [
      { name: "FastAPI", level: "Production", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg" },
      { name: "Docker", level: "Production", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
      { name: "DVC (Data Version Control)", level: "Production", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" },
      { name: "Flask", level: "Advanced", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flask/flask-original.svg" },
      { name: "Streamlit", level: "Production", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
      { name: "AWS S3 & EC2", level: "Intermediate", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
      { name: "Next.js 14", level: "Full-Stack", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" },
    ],
  },
  {
    id: "data-science",
    title: "Data Science, Analytics & Math",
    description: "Exploratory data analysis, automated LaTeX reporting, hypothesis testing, and multidimensional visualization.",
    icon: Cpu,
    badgeColor: "bg-amber-500/15 text-amber-400 border-amber-500/30",
    skills: [
      { name: "Pandas", level: "Expert", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg" },
      { name: "NumPy", level: "Expert", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/numpy/numpy-original.svg" },
      { name: "Scikit-Learn", level: "Expert", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg" },
      { name: "SciPy", level: "Advanced", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
      { name: "Matplotlib & Seaborn", level: "Advanced", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/matplotlib/matplotlib-original.svg" },
      { name: "PostgreSQL", level: "Intermediate", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" },
      { name: "SQL", level: "Advanced", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azuresqldatabase/azuresqldatabase-original.svg" },
    ],
  },
]

export default function TechStack() {
  const [selectedDomain, setSelectedDomain] = useState<string>("all")

  const displayedDomains =
    selectedDomain === "all"
      ? TECH_DOMAINS
      : TECH_DOMAINS.filter((d) => d.id === selectedDomain)

  return (
    <section id="tech-stack" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            Engineering Stack & Domain Breakdown
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 section-underline">
            Technologies & Frameworks by Domain
          </h2>
          <p className="mt-6 text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg">
            Specialized toolchains segmented by domain: from low-latency Computer Vision to Medical Deep Learning and Agentic RAG pipelines.
          </p>

          {/* Domain Tab Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            <button
              onClick={() => setSelectedDomain("all")}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all border ${
                selectedDomain === "all"
                  ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/25"
                  : "bg-slate-800/80 hover:bg-slate-800 text-slate-300 border-slate-700/60"
              }`}
            >
              All Domains (5 Domains)
            </button>
            {TECH_DOMAINS.map((domain) => {
              const Icon = domain.icon
              const isActive = selectedDomain === domain.id
              return (
                <button
                  key={domain.id}
                  onClick={() => setSelectedDomain(domain.id)}
                  className={`px-3.5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all flex items-center gap-1.5 border ${
                    isActive
                      ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/25"
                      : "bg-slate-800/80 hover:bg-slate-800 text-slate-300 border-slate-700/60 hover:border-primary/40"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {domain.title.split("&")[0].trim()}
                </button>
              )
            })}
          </div>
        </motion.div>

        {/* Domain Cards Grid */}
        <div className="space-y-8">
          {displayedDomains.map((domain, domainIdx) => {
            const Icon = domain.icon
            return (
              <motion.div
                key={domain.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: domainIdx * 0.08 }}
                viewport={{ once: true }}
                className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-950/90 border border-slate-800 hover:border-primary/40 transition-all duration-300 shadow-xl"
              >
                {/* Domain Header */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800/80">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-slate-800 border border-slate-700/70 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                        {domain.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                        {domain.description}
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline" className={`text-xs px-3 py-1 font-semibold ${domain.badgeColor}`}>
                    {domain.skills.length} Specialized Tools
                  </Badge>
                </div>

                {/* Skills Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
                  {domain.skills.map((skill, sIdx) => (
                    <div
                      key={sIdx}
                      className="p-3 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/40 hover:border-primary/50 transition-all duration-200 flex flex-col items-center text-center group cursor-default"
                    >
                      <div className="h-8 w-8 mb-2 flex items-center justify-center">
                        <img
                          src={skill.icon}
                          alt={skill.name}
                          className="h-6 w-6 object-contain group-hover:scale-110 transition-transform duration-200"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                      </div>
                      <span className="text-xs font-semibold text-slate-200 group-hover:text-primary transition-colors line-clamp-1">
                        {skill.name}
                      </span>
                      <span className="text-[10px] text-muted-foreground mt-0.5">
                        {skill.level}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
