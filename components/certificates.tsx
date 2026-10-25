"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Award, Sparkles, ExternalLink, CheckCircle, ShieldCheck, FileText, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export interface CertificateItem {
  id: string
  title: string
  issuer: string
  issuedYear: string
  credentialId: string
  category: "Deep Learning" | "Computer Vision" | "AI & ML" | "Data Science"
  description: string
  skillsLearned: string[]
  verifyUrl?: string
  previewImage?: string
}

const CERTIFICATES: CertificateItem[] = [
  {
    id: "agentic-ai-leaders",
    title: "Agentic AI and AI Agents: A Primer for Leaders",
    issuer: "Coursera",
    issuedYear: "2025",
    credentialId: "COURSERA-AGENTIC-LEADERS",
    category: "AI & ML",
    description:
      "Comprehensive architectural principles of autonomous AI agents, tool-calling frameworks, memory management, and multi-agent coordination.",
    skillsLearned: ["Autonomous Agents", "Tool Calling", "Multi-Agent Coordination", "LangGraph"],
    verifyUrl: "https://coursera.org/share/9a94de4340a1a4c583f75e933ed392c3",
  },
  {
    id: "programming-genai-iit",
    title: "Programming with Generative AI (IIT)",
    issuer: "Coursera / IIT",
    issuedYear: "2025",
    credentialId: "IIT-GENAI-2025",
    category: "AI & ML",
    description:
      "Advanced prompt engineering, transformer fine-tuning, retrieval-augmented generation pipelines, and multi-turn conversational agents.",
    skillsLearned: ["Generative AI", "Prompt Engineering", "RAG Pipelines", "Transformers"],
    verifyUrl: "https://coursera.org/share/8ed23e0eaa7ace7f3b00f975fc43d092",
  },
  {
    id: "applied-data-science-python",
    title: "Applied Data Science with Python",
    issuer: "Coursera",
    issuedYear: "2024",
    credentialId: "COURSERA-APPLIED-DS",
    category: "Data Science",
    description:
      "Statistical hypothesis testing, feature engineering, exploratory data analysis, Pandas, NumPy, and statistical visualization.",
    skillsLearned: ["Pandas", "Statistical Analysis", "Data Visualization", "Hypothesis Testing"],
    verifyUrl: "https://drive.google.com/file/d/1PtjMnD2TLqUscWAKj7cHqflwECT1Nyzc/view",
  },
  {
    id: "machine-learning-python",
    title: "Machine Learning with Python",
    issuer: "Coursera",
    issuedYear: "2024",
    credentialId: "COURSERA-ML-PY",
    category: "AI & ML",
    description:
      "Supervised and unsupervised learning, gradient descent optimization, regularized regression, classification, clustering, and model validation.",
    skillsLearned: ["Scikit-Learn", "Model Evaluation", "Gradient Descent", "Ensemble Learning"],
    verifyUrl: "https://coursera.org",
  },
  {
    id: "intro-cv-image-processing",
    title: "Introduction to Computer Vision and Image Processing",
    issuer: "Coursera",
    issuedYear: "2024",
    credentialId: "COURSERA-CV-IP",
    category: "Computer Vision",
    description:
      "Spatial filtering, edge detection, morphological operations, contour detection, camera calibration, and feature matching.",
    skillsLearned: ["OpenCV", "Spatial Filtering", "Edge Detection", "Image Segmentation"],
    verifyUrl: "https://coursera.org",
  },
  {
    id: "deep-learning-pytorch",
    title: "Deep Learning with PyTorch",
    issuer: "Coursera",
    issuedYear: "2024",
    credentialId: "COURSERA-DL-PYTORCH",
    category: "Deep Learning",
    description:
      "Constructing and training convolutional neural networks, residual backbones, loss functions, GPU acceleration, and transfer learning.",
    skillsLearned: ["PyTorch", "CNNs", "Transfer Learning", "GPU Training", "Optimization"],
    verifyUrl: "https://coursera.org",
  },
  {
    id: "ai-capstone-deep-learning",
    title: "AI Capstone Project with Deep Learning",
    issuer: "Coursera",
    issuedYear: "2025",
    credentialId: "COURSERA-AI-CAPSTONE",
    category: "Deep Learning",
    description:
      "End-to-end deep learning project lifecycle: data curation, attention U-Net architecture formulation, hyperparameter optimization, and deployment.",
    skillsLearned: ["Attention U-Net", "BraTS 2020", "Model Evaluation", "Streamlit Deployment"],
    verifyUrl: "https://coursera.org",
  },
  {
    id: "github-student-developer-pack",
    title: "GitHub Global Campus — Student Developer Pack",
    issuer: "GitHub Education",
    issuedYear: "2024 – Present",
    credentialId: "GH-CAMPUS-STUDENT-PACK",
    category: "AI & ML",
    description:
      "Recognized member of GitHub Global Campus. Leveraging industry-standard developer toolchains including GitHub Pro, GitHub Actions CI/CD workflows, JetBrains IDE Suite, and cloud infrastructure.",
    skillsLearned: ["GitHub Actions CI/CD", "GitHub Pro", "Cloud Infrastructure (Azure/AWS)", "JetBrains IDE Suite"],
    verifyUrl: "https://education.github.com/pack",
  },
]

const SKILL_BADGES = [
  { name: "GitHub Global Campus", level: "Verified", icon: "🐙" },
  { name: "Computer Vision Expert", level: "Verified", icon: "👁️" },
  { name: "Deep Learning & Medical AI", level: "Verified", icon: "🧠" },
  { name: "Agentic AI & RAG", level: "Verified", icon: "🤖" },
  { name: "PyTorch & YOLO", level: "Production", icon: "⚡" },
  { name: "FastAPI & MLOps", level: "Certified", icon: "🚀" },
  { name: "Data Science & Statistics", level: "Advanced", icon: "📊" },
]

export default function Certificates() {
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null)

  return (
    <section id="certificates" className="py-24 relative overflow-hidden bg-slate-950/40 border-t border-slate-800/80">
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
            <Award className="h-3.5 w-3.5" />
            Verified Credentials & Badges
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 section-underline">
            Certifications & Technical Badges
          </h2>
          <p className="mt-6 text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg">
            Continuous professional mastery across Deep Learning, Computer Vision, and Generative AI systems.
          </p>
        </motion.div>

        {/* Badges Ribbon */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-center gap-3 mb-12"
        >
          {SKILL_BADGES.map((b, idx) => (
            <div
              key={idx}
              className="px-4 py-2 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-primary/50 text-slate-200 text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-md transition-all hover:scale-105"
            >
              <span>{b.icon}</span>
              <span>{b.name}</span>
              <span className="text-[10px] text-primary bg-primary/10 px-2 py-0.5 rounded-full font-bold">
                {b.level}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Certificates Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {CERTIFICATES.map((cert, idx) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              viewport={{ once: true }}
              className="p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-950/90 border border-slate-800
                         hover:border-primary/50 transition-all duration-300 shadow-xl flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <Badge variant="outline" className="text-xs bg-primary/15 text-primary border-primary/30">
                    {cert.category}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {cert.issuer} • {cert.issuedYear}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                  {cert.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  {cert.description}
                </p>

                <div className="space-y-1.5 mb-5">
                  <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
                    Core Competencies
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {cert.skillsLearned.map((s, sIdx) => (
                      <span key={sIdx} className="text-xs px-2.5 py-1 rounded-md bg-slate-800/80 text-slate-300 border border-slate-700/60">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[11px] text-muted-foreground font-mono">
                  ID: {cert.credentialId}
                </span>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedCert(cert)}
                  className="text-xs border-primary/40 hover:bg-primary/10 text-primary"
                >
                  <FileText className="mr-1.5 h-3.5 w-3.5" />
                  View Details
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCert(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg rounded-2xl border border-primary/40 bg-slate-900 p-6 sm:p-8 shadow-2xl z-10 text-slate-100"
            >
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-primary/20 text-primary border-primary/40 text-xs">
                  {selectedCert.category}
                </Badge>
                <span className="text-xs text-muted-foreground">{selectedCert.issuedYear}</span>
              </div>

              <h3 className="text-xl font-bold text-white mb-2">{selectedCert.title}</h3>
              <p className="text-sm text-primary mb-4">{selectedCert.issuer}</p>

              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                {selectedCert.description}
              </p>

              <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 mb-6 text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Issuing Body:</span>
                  <span className="font-semibold text-white">{selectedCert.issuer}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Credential Verification ID:</span>
                  <span className="font-mono text-primary">{selectedCert.credentialId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle className="h-3.5 w-3.5" /> Verified
                  </span>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <Button variant="outline" size="sm" onClick={() => setSelectedCert(null)}>
                  Close
                </Button>
                {selectedCert.verifyUrl && (
                  <Button asChild size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                    <a href={selectedCert.verifyUrl} target="_blank" rel="noopener noreferrer">
                      Verify on Issuer Website
                      <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
                    </a>
                  </Button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}
