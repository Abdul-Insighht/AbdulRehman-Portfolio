"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Sparkles, BookOpen, ExternalLink, Github, FileText, CheckCircle2, Award } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const RESEARCH_PAPERS = [
  {
    id: "brats-attention-unet",
    title: "Attention U-Net for 3D Multimodal MRI Brain Tumor Segmentation",
    dataset: "BraTS 2020 Benchmark",
    authors: "Hafiz Abdul Rehman",
    status: "Validated Academic Research",
    accuracy: "99.64% Validation Accuracy | 0.986 Mean IoU",
    abstract:
      "This study presents an Attention U-Net architecture engineered for sub-millimeter 3D brain tumor delineation across T1, T1ce, T2, and FLAIR MRI modalities. By integrating soft spatial-channel attention gates, the network suppresses irrelevant background activations while accentuating salient peritumoral edema, necrotic core, and enhancing tumor margins under extreme class imbalance.",
    highlights: [
      "99.64% accuracy across BraTS 2020 validation cohort",
      "0.986 Mean Intersection-over-Union (IoU) on whole tumor volume",
      "Integrated Focal Dice Loss to conquer severe voxel disproportion",
      "Sub-2-second 3D volume inference with interactive Streamlit visualization",
    ],
    githubUrl: "https://github.com/Abdul-Insighht/Brain-Tumor-Segmentation-BraTS-2020",
    tags: ["Attention U-Net", "Medical Imaging", "BraTS 2020", "PyTorch", "PyVista 3D"],
  },
  {
    id: "covid-fuzzy-ensemble",
    title: "Sugeno Fuzzy Integral Non-Linear Ensemble for COVID-19 Radiographic Classification",
    dataset: "Lung CT Scan Cohort",
    authors: "Hafiz Abdul Rehman",
    status: "Published Benchmark",
    accuracy: "98.93% Test Accuracy | 99.1% Sensitivity",
    abstract:
      "A novel non-linear decision fusion framework using the Sugeno Fuzzy Integral to aggregate diverse representations from 4 distinct convolutional neural network backbones (VGG-11, GoogLeNet, SqueezeNet, and Wide ResNet-50-2). The model resolves ambiguity in ground-glass opacities between viral COVID-19 and atypical pneumonia.",
    highlights: [
      "98.93% overall diagnostic classification accuracy",
      "99.1% sensitivity on bilateral infiltrates",
      "Grad-CAM visual attribution maps providing verifiable radiographic explanations",
      "Non-linear Sugeno fuzzy measure calculation outperforming majority voting by 4.2%",
    ],
    githubUrl: "https://github.com/Abdul-Insighht/COVID-19-Detection-CNN-Ensemble",
    tags: ["Ensemble Learning", "Fuzzy Measure", "Grad-CAM", "CT Radiography", "Python"],
  },
  {
    id: "soct-sam-foundation",
    title: "SOCT-SAM: Zero-Shot Foundation Model Adaptation for Optical Coherence Tomography",
    dataset: "Retinal OCT Scans",
    authors: "Hafiz Abdul Rehman",
    status: "Research Repository",
    accuracy: "High-Fidelity Layer Segmentation",
    abstract:
      "Adapting Meta's Segment Anything Model (SAM) with prompt-guided fine-tuning for zero-shot and few-shot segmentation of retinal layers and fluid accumulations in Spectral-Domain Optical Coherence Tomography (SD-OCT).",
    highlights: [
      "Automated prompt generation for retinal boundary localization",
      "Robust performance across noisy speckle optical tomography scans",
      "Comprehensive evaluation against traditional level-set algorithms",
    ],
    githubUrl: "https://github.com/Abdul-Insighht/SOCT-SAM",
    tags: ["Foundation Models", "SAM", "Ophthalmology", "Zero-Shot", "Computer Vision"],
  },
  {
    id: "rrsis-survey",
    title: "Referring Remote Sensing Image Segmentation (RRSIS) Cross-Modal Benchmark",
    dataset: "Multi-Spectral Aerial & Satellite Datasets",
    authors: "Hafiz Abdul Rehman",
    status: "Comprehensive Survey & Codebase",
    accuracy: "Cross-Modal Benchmark",
    abstract:
      "An in-depth investigation into natural language-guided aerial remote sensing object segmentation. Evaluates cross-modal multi-head attention mechanisms and multi-scale feature pyramids on dense geographic satellite scenes.",
    highlights: [
      "Taxonomy of linguistic vision groundings in earth observation",
      "Benchmark comparisons of Transformer backbones on RRSIS-D",
      "Open-source evaluation scripts and standardized metric runners",
    ],
    githubUrl: "https://github.com/Abdul-Insighht/Awesome-RRSIS-Survey",
    tags: ["Remote Sensing", "Cross-Modal Attention", "Satellite AI", "Vision-Language"],
  },
]

export default function ResearchPublications() {
  const [expandedId, setExpandedId] = useState<string | null>("brats-attention-unet")

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
            Empirical Publications & Whitepapers
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 section-underline">
            Research & Academic Contributions
          </h2>
          <p className="mt-6 text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg">
            Investigating novel mathematical architectures, soft attention mechanisms, and non-linear ensembles applied to high-stakes healthcare and remote sensing benchmarks.
          </p>
        </motion.div>

        {/* Papers List */}
        <div className="space-y-6 max-w-5xl mx-auto">
          {RESEARCH_PAPERS.map((paper, idx) => {
            const isExpanded = expandedId === paper.id
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
      </div>
    </section>
  )
}
