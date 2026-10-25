"use client"

import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Github, ExternalLink, Sparkles, CheckCircle2, Layers, AlertCircle, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Project } from "@/types/project"
import Image from "next/image"

interface ProjectModalProps {
  project: Project | null
  isOpen: boolean
  onClose: () => void
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    if (isOpen) {
      document.body.style.overflow = "hidden"
      window.addEventListener("keydown", handleKeyDown)
    }
    return () => {
      document.body.style.overflow = "unset"
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!project) return null

  const caseStudy = project.caseStudy

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl
                       border border-primary/40 bg-slate-900/95 p-6 md:p-8 shadow-2xl
                       shadow-primary/20 text-slate-100 z-10"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Close Case Study"
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400
                         hover:text-white hover:bg-primary/20 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Header Area */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <Badge className="bg-primary/20 text-primary border-primary/40 text-xs px-3 py-1">
                {project.domainLabel}
              </Badge>
              {project.accuracy && (
                <Badge className="bg-gradient-to-r from-emerald-500 to-teal-500 text-black font-semibold text-xs px-3 py-1">
                  {project.accuracy}
                </Badge>
              )}
              {project.stars > 0 && (
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  ★ {project.stars} stars
                </span>
              )}
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 flex items-center gap-2">
              {project.title}
            </h2>

            {caseStudy?.hook && (
              <p className="text-primary font-medium text-base mb-6 italic">
                "{caseStudy.hook}"
              </p>
            )}

            {/* Visual / Banner */}
            <div className="relative h-64 sm:h-80 w-full rounded-xl overflow-hidden mb-6 border border-slate-700/60">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-70" />
            </div>

            {/* Content Grid */}
            <div className="space-y-6 text-sm sm:text-base leading-relaxed">
              {/* Problem Section */}
              {caseStudy?.problem && (
                <div className="rounded-xl p-4 bg-slate-800/60 border border-slate-700/50">
                  <h3 className="text-base font-semibold text-red-400 flex items-center gap-2 mb-2">
                    <AlertCircle className="h-4 w-4" />
                    The Engineering Problem
                  </h3>
                  <p className="text-slate-300">{caseStudy.problem}</p>
                </div>
              )}

              {/* Solution Section */}
              <div className="rounded-xl p-4 bg-slate-800/60 border border-slate-700/50">
                <h3 className="text-base font-semibold text-teal-400 flex items-center gap-2 mb-2">
                  <Sparkles className="h-4 w-4" />
                  Engineered Solution & Approach
                </h3>
                <p className="text-slate-300">
                  {caseStudy?.solution || project.description}
                </p>
              </div>

              {/* Architecture Pipeline */}
              {caseStudy?.architecture && caseStudy.architecture.length > 0 && (
                <div>
                  <h3 className="text-base font-semibold text-primary flex items-center gap-2 mb-3">
                    <Layers className="h-4 w-4" />
                    Pipeline & System Architecture
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {caseStudy.architecture.map((step, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-800/40 border border-slate-700/40 text-xs sm:text-sm text-slate-300"
                      >
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary font-bold flex items-center justify-center text-xs">
                          {idx + 1}
                        </span>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Key Features & Metrics */}
              {caseStudy?.keyFeatures && caseStudy.keyFeatures.length > 0 && (
                <div>
                  <h3 className="text-base font-semibold text-white flex items-center gap-2 mb-3">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    Key Verified Results
                  </h3>
                  <ul className="space-y-2">
                    {caseStudy.keyFeatures.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-slate-300 text-sm">
                        <span className="text-emerald-400 font-bold mt-0.5">•</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tech Stack Pills */}
              <div>
                <h3 className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-2">
                  Technology Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {(caseStudy?.stack || project.tags).map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="text-xs bg-primary/10 text-primary border border-primary/20"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer CTAs */}
            <div className="mt-8 pt-6 border-t border-slate-800 flex flex-wrap gap-4 justify-end">
              <Button
                variant="outline"
                onClick={onClose}
                className="border-slate-700 text-slate-300 hover:bg-slate-800"
              >
                Close
              </Button>
              {project.liveUrl && (
                <Button asChild variant="outline" className="border-primary/50 text-primary hover:bg-primary/10">
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Live Application
                  </a>
                </Button>
              )}
              <Button asChild className="bg-gradient-to-r from-primary to-cyan-600 hover:from-primary/90 text-primary-foreground">
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  Inspect Source on GitHub
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
