"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Sparkles, BookOpen, ExternalLink, Github, FileText, CheckCircle2, Award } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const RESEARCH_PAPERS = [
  {
    id: "fyp-remote-sensing-ot-sam",
    title: "Enhancing Referring Remote Sensing Image Segmentation through Optimal Transport Alignment and Segment Anything Model (SAM)",
    dataset: "Multi-Spectral Aerial & Earth Observation Datasets",
    authors: "Hafiz Abdul Rehman",
    status: "Final Year Project (2026)",
    accuracy: "Optimal Transport Multi-Modal Alignment",
    abstract:
      "A novel cross-modal architecture formulating Wasserstein Optimal Transport distance to align complex natural language referring expressions with fine-grained aerial satellite imagery, adapting Meta's Segment Anything Model (SAM) for boundary-accurate remote sensing segmentation.",
    highlights: [
      "Optimal transport formulation for cross-modal linguistic-spatial alignment",
      "Parameter-efficient fine-tuning of Segment Anything Model (SAM) on satellite imagery",
      "Robust resolution of multi-scale geographic clutter and shadow occlusions",
      "Awarded 4th Place out of 64 engineering teams at GIFT University FYP Display 2026",
    ],
    githubUrl: "https://github.com/Abdul-Insighht",
    tags: ["Optimal Transport", "SAM", "Remote Sensing", "Cross-Modal AI", "PyTorch"],
  },
  {
    id: "survey-referring-remote-sensing",
    title: "A Comprehensive Survey of Referring Remote Sensing Image Segmentation — From Supervised Cross-Modal Learning to Multimodal Foundation Models",
    dataset: "Global Earth Observation Benchmarks",
    authors: "Hafiz Abdul Rehman",
    status: "Survey Paper (In Progress)",
    accuracy: "Exhaustive State-of-the-Art Taxonomy",
    abstract:
      "An in-depth state-of-the-art survey charting the trajectory of Referring Remote Sensing Image Segmentation (RRSIS). Bridges the gap between early supervised multi-modal attention networks and modern multimodal vision-language foundation models.",
    highlights: [
      "Taxonomy of linguistic vision groundings in satellite and drone observation",
      "Comparative benchmark analysis of Transformer backbones and attention gating",
      "Identification of key open challenges in scale-invariance and spatial ambiguity",
    ],
    githubUrl: "https://github.com/Abdul-Insighht",
    tags: ["Survey Paper", "Foundation Models", "Vision-Language", "Earth Observation"],
  },
  {
    id: "covid-tda-cnn-ensemble",
    title: "COVID-19 Detection from CT Scan Images using Topological Data Analysis and CNN Ensemble",
    dataset: "Lung CT Scan Cohort",
    authors: "Hafiz Abdul Rehman",
    status: "Research Paper",
    accuracy: "98.93% Test Accuracy | 99.1% Sensitivity",
    abstract:
      "A non-linear decision fusion framework using the Sugeno Fuzzy Integral and Topological Data Analysis (TDA) persistent homology to aggregate diverse representations from multiple convolutional backbones (VGG-11, GoogLeNet, SqueezeNet, Wide ResNet-50-2), resolving ambiguities in ground-glass opacities.",
    highlights: [
      "98.93% overall diagnostic classification accuracy",
      "99.1% sensitivity on bilateral lung infiltrates",
      "Topological persistent homology capturing multi-scale geometric lesion features",
      "Grad-CAM visual attribution maps providing clinically verifiable explanations",
    ],
    githubUrl: "https://github.com/Abdul-Insighht/COVID-19-Detection-CNN-Ensemble",
    tags: ["Topological Data Analysis", "Fuzzy Ensemble", "CT Radiography", "Grad-CAM"],
  },
  {
    id: "brats-attention-unet",
    title: "3D Brain Tumor Segmentation using Attention U-Net",
    dataset: "BraTS 2020 Benchmark",
    authors: "Hafiz Abdul Rehman",
    status: "Key Research & Clinical Engineering",
    accuracy: "99.64% Validation Accuracy | 0.986 IoU",
    abstract:
      "Engineered an attention-gated 3D U-Net architecture for volumetric multimodal MRI brain tumor segmentation across T1, T1ce, T2, and FLAIR scans, conquering extreme class imbalance with Focal Dice Loss.",
    highlights: [
      "99.64% validation accuracy across BraTS 2020 cohort",
      "0.986 Intersection-over-Union (IoU) on whole tumor volume",
      "Attention gates suppressing background noise while accentuating lesion boundaries",
      "Sub-2-second inference with interactive clinical Streamlit 3D visualization",
    ],
    githubUrl: "https://github.com/Abdul-Insighht/Brain-Tumor-Segmentation-BraTS-2020",
    tags: ["Attention U-Net", "PyTorch", "BraTS 2020", "Medical AI", "Volumetric 3D"],
  },
]

const AWARDS_ACHIEVEMENTS = [
  {
    id: "gift-fyp-display",
    title: "4th Place (out of 64 teams)",
    organization: "GIFT University Final Year Project Display 2026",
    year: "2026",
    badge: "Finalist & Winner",
    description: "Awarded 4th place for developing the Optimal Transport Alignment and Segment Anything Model (SAM) remote sensing system among 64 competing teams.",
  },
  {
    id: "national-skills-test",
    title: "90th Percentile Nationwide",
    organization: "Pakistan National Skills Competency Test (34,000+ participants)",
    year: "2026",
    badge: "Top 10% Nationwide",
    description: "Ranked in the 90th percentile among 34,000+ national candidates in competitive technical and data science competencies.",
  },
  {
    id: "usaii-cogniflow",
    title: "Top 100 Globally — CogniFlow",
    organization: "USAII Global AI Hackathon",
    year: "2025",
    badge: "Global Finalist",
    description: "Built CogniFlow: an AI cognitive load estimation and action planning system utilizing multimodal behavioral telemetry.",
  },
  {
    id: "harvard-hsil",
    title: "Harvard Health Systems Innovation Lab (HSIL)",
    organization: "HSIL 7th Edition (Onsite)",
    year: "2025",
    badge: "Healthcare Innovation",
    description: "AI mental health monitoring platform with digital phenotyping, behavioral telemetry, and CBT-based interventions.",
  },
  {
    id: "brightdata-vendorsentinel",
    title: "VendorSentinel — Bright Data Hackathon",
    organization: "lablab.ai & Bright Data",
    year: "2025",
    badge: "Risk Intelligence",
    description: "AI-powered vendor risk intelligence platform integrating real-time web scraping data with an automated risk scoring engine.",
  },
  {
    id: "lablab-neuralnexus",
    title: "NeuralNexus — Enterprise AI Hackathon",
    organization: "lablab.ai Enterprise AI",
    year: "2025",
    badge: "Multi-Agent AI",
    description: "Multi-agent financial intelligence system for automatic cross-document contradiction detection and proactive insight surfacing.",
  },
]

export default function ResearchPublications() {
  const [expandedId, setExpandedId] = useState<string | null>("fyp-remote-sensing-ot-sam")

  return (
    <section id="research" className="py-24 relative overflow-hidden bg-slate-900/30">
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
            <BookOpen className="h-3.5 w-3.5" />
            Empirical Publications & Research
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 section-underline">
            Research & Academic Contributions
          </h2>
          <p className="mt-6 text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg">
            Investigating mathematical loss formulations, Optimal Transport cross-modal alignment, topological data analysis, and attention mechanisms.
          </p>
        </motion.div>

        {/* Papers List */}
        <div className="space-y-6 max-w-5xl mx-auto mb-20">
          {RESEARCH_PAPERS.map((paper, idx) => {
            return (
              <motion.div
                key={paper.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                viewport={{ once: true }}
                className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900/95 to-slate-950/95 border border-slate-800
                           hover:border-primary/50 transition-all duration-300 shadow-xl"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/30">
                      {paper.status}
                    </Badge>
                    <Badge variant="secondary" className="text-xs bg-slate-800 text-slate-300">
                      {paper.dataset}
                    </Badge>
                  </div>
                  {paper.accuracy && (
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full">
                      {paper.accuracy}
                    </span>
                  )}
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 hover:text-primary transition-colors">
                  {paper.title}
                </h3>
                <p className="text-xs text-muted-foreground mb-4">
                  By <strong className="text-slate-300">{paper.authors}</strong> • GIFT University Research
                </p>

                <p className="text-sm text-slate-300 leading-relaxed mb-5">
                  {paper.abstract}
                </p>

                {/* Methodology Highlights */}
                <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/50 mb-6">
                  <p className="text-xs font-bold uppercase tracking-wider text-primary mb-2.5">
                    Empirical Highlights & Contributions
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-300">
                    {paper.highlights.map((h, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Meta & Actions */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800">
                  <div className="flex flex-wrap gap-1.5">
                    {paper.tags.map((t) => (
                      <Badge key={t} variant="secondary" className="text-[11px] bg-slate-800/80 text-slate-300">
                        {t}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center gap-3">
                    <Button asChild size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                      <a href={paper.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-1.5 h-4 w-4" />
                        Inspect Code & Weights
                      </a>
                    </Button>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Achievements & Awards Subsection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Award className="h-3.5 w-3.5" />
            Competitive Honors & Hackathons
          </div>
          <h3 className="text-2xl md:text-4xl font-bold text-white mb-3">
            Achievements & Recognition
          </h3>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto">
            Recognized across university displays, nationwide competency benchmarks, and international hackathons.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {AWARDS_ACHIEVEMENTS.map((award, i) => (
            <motion.div
              key={award.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-teal-500/40 transition-all flex flex-col justify-between shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <Badge variant="outline" className="border-teal-500/30 text-teal-300 bg-teal-500/10 text-xs">
                    {award.badge}
                  </Badge>
                  <span className="text-xs text-muted-foreground font-mono">{award.year}</span>
                </div>
                <h4 className="text-lg font-bold text-white mb-1.5">{award.title}</h4>
                <p className="text-xs font-medium text-primary mb-3">{award.organization}</p>
                <p className="text-xs text-slate-300 leading-relaxed">{award.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
