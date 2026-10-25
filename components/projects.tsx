"use client"

import { useState, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"
import { Github, ExternalLink, Star, Sparkles, RefreshCw, Search, BookOpen, GitFork } from "lucide-react"
import Image from "next/image"
import { Project, ProjectDomain } from "@/types/project"
import { DOMAIN_FILTERS, INITIAL_CURATED_PROJECTS } from "@/data/curated-projects"
import ProjectModal from "@/components/project-modal"

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>(INITIAL_CURATED_PROJECTS)
  const [activeDomain, setActiveDomain] = useState<ProjectDomain>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [isSyncing, setIsSyncing] = useState(false)
  const [lastSynced, setLastSynced] = useState<string | null>(null)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Fetch live projects from /api/projects on mount
  useEffect(() => {
    async function loadProjects() {
      try {
        const res = await fetch("/api/projects")
        if (res.ok) {
          const data = await res.json()
          if (data.success && data.projects?.length > 0) {
            setProjects(data.projects)
            if (data.lastSyncedAt) {
              setLastSynced(new Date(data.lastSyncedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
            }
          }
        }
      } catch (err) {
        console.warn("Using fallback curated projects:", err)
      }
    }
    loadProjects()
  }, [])

  // Manual one-click sync handler
  const handleSync = async () => {
    setIsSyncing(true)
    try {
      const res = await fetch("/api/projects/sync", { method: "POST" })
      const data = await res.json()
      if (data.success) {
        // Reload projects
        const refreshRes = await fetch("/api/projects")
        if (refreshRes.ok) {
          const refreshData = await refreshRes.json()
          if (refreshData.projects) {
            setProjects(refreshData.projects)
            setLastSynced(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
          }
        }
      }
    } catch (err) {
      console.error("Sync error:", err)
    } finally {
      setIsSyncing(false)
    }
  }

  // Calculate live tab counts
  const domainCounts = useMemo(() => {
    const counts: Record<string, number> = { all: projects.length }
    projects.forEach((p) => {
      counts[p.domain] = (counts[p.domain] || 0) + 1
    })
    return counts
  }, [projects])

  // Filtered project list
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchesDomain = activeDomain === "all" || p.domain === activeDomain
      const matchesSearch =
        searchQuery === "" ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        p.language?.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesDomain && matchesSearch
    })
  }, [projects, activeDomain, searchQuery])

  const openCaseStudy = (project: Project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  // Domain badge styling helper
  const getDomainBadgeClass = (domain: ProjectDomain) => {
    switch (domain) {
      case "agentic-ai":
        return "bg-purple-500/20 text-purple-300 border-purple-500/30"
      case "computer-vision":
        return "bg-cyan-500/20 text-cyan-300 border-cyan-500/30"
      case "deep-learning":
        return "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
      case "data-science":
        return "bg-teal-500/20 text-teal-300 border-teal-500/30"
      case "web-fullstack":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30"
      default:
        return "bg-slate-500/20 text-slate-300 border-slate-500/30"
    }
  }

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-muted/20 via-background to-muted/20" />

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            Curated Engineering Catalog
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 section-underline">
            Featured Projects & Repositories
          </h2>
          <p className="mt-6 text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg">
            Production-grade systems across Computer Vision, Agentic AI, Medical Deep Learning, and Real-Time Telemetry.
          </p>

          {/* Sync Status Banner */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Live GitHub Sync Active ({projects.length} Repositories Indexed)
            </span>
            {lastSynced && (
              <span>• Synced at {lastSynced}</span>
            )}
            <button
              onClick={handleSync}
              disabled={isSyncing}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-700 disabled:opacity-50"
              title="Sync latest repos from GitHub"
            >
              <RefreshCw className={`h-3 w-3 ${isSyncing ? "animate-spin text-primary" : ""}`} />
              {isSyncing ? "Syncing..." : "Sync from GitHub"}
            </button>
          </div>
        </motion.div>

        {/* Controls: Domain Tabs & Search Bar */}
        <div className="mb-10 space-y-4">
          {/* Domain Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {DOMAIN_FILTERS.map((tab) => {
              const count = domainCounts[tab.id] || 0
              const isActive = activeDomain === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveDomain(tab.id)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 flex items-center gap-2 border ${
                    isActive
                      ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/25 scale-105"
                      : "bg-slate-800/80 hover:bg-slate-800 text-slate-300 border-slate-700/60 hover:border-primary/50"
                  }`}
                >
                  {tab.label}
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                      isActive ? "bg-black/30 text-white" : "bg-slate-700 text-slate-300"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Search Box */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by model, tech (e.g. YOLO, PyTorch, RAG)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm rounded-full bg-slate-900/90 border border-slate-700/70 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary text-slate-200 placeholder:text-muted-foreground transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-white"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Projects Grid */}
        <AnimatePresence mode="popLayout">
          {filteredProjects.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-16 text-muted-foreground"
            >
              <p className="text-lg">No projects match the selected criteria.</p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setActiveDomain("all")
                  setSearchQuery("")
                }}
                className="mt-4"
              >
                Reset Filters
              </Button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id || project.slug}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.4) }}
                  className="group"
                >
                  <Card
                    className="h-full flex flex-col overflow-hidden 
                               border-2 border-slate-700/50 bg-gradient-to-br from-slate-800/90 to-slate-900/90
                               transition-all duration-500 hover:border-primary hover:shadow-2xl hover:shadow-primary/20
                               hover:-translate-y-2 relative"
                    style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.3)" }}
                  >
                    {/* Dotted border hover effect */}
                    <div
                      className="absolute inset-[-6px] rounded-xl border-2 border-dashed border-transparent 
                                  group-hover:border-primary/40 transition-all duration-300 pointer-events-none z-10"
                    />

                    {/* Image Container with Overlay */}
                    <div className="relative h-48 w-full overflow-hidden bg-slate-950">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-90" />

                      {/* Domain Badge */}
                      <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-20">
                        <Badge
                          variant="outline"
                          className={`text-[11px] font-semibold backdrop-blur-md border ${getDomainBadgeClass(
                            project.domain
                          )}`}
                        >
                          {project.domainLabel}
                        </Badge>
                        {project.featured && (
                          <Badge className="bg-gradient-to-r from-yellow-500 to-amber-500 text-black text-[10px] font-bold flex items-center gap-1 shadow-md">
                            <Star className="h-3 w-3 fill-current" />
                            Featured
                          </Badge>
                        )}
                      </div>

                      {/* Accuracy / Metric Badge */}
                      {project.accuracy && (
                        <div className="absolute top-3 right-3 bg-gradient-to-r from-primary to-cyan-500 text-primary-foreground px-2.5 py-1 rounded-full text-xs font-bold shadow-lg z-20">
                          {project.accuracy}
                        </div>
                      )}

                      {/* Stars / GitHub meta badge */}
                      {project.stars > 0 && (
                        <div className="absolute bottom-2 right-3 flex items-center gap-2 text-[11px] text-slate-300 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-full z-20">
                          <span className="flex items-center gap-0.5">
                            ★ {project.stars}
                          </span>
                          {project.forks > 0 && (
                            <span className="flex items-center gap-0.5">
                              <GitFork className="h-3 w-3" /> {project.forks}
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Card Content */}
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg text-primary group-hover:text-cyan-400 transition-colors duration-300 flex items-center justify-between">
                        <span className="line-clamp-1">{project.title}</span>
                        <Sparkles className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 ml-1 text-cyan-400" />
                      </CardTitle>

                      {/* Tech Tags */}
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {project.tags.slice(0, 3).map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="text-[11px] bg-primary/15 text-primary border border-primary/25"
                          >
                            {tag}
                          </Badge>
                        ))}
                        {project.tags.length > 3 && (
                          <Badge variant="outline" className="text-[10px] border-slate-700 text-slate-400">
                            +{project.tags.length - 3}
                          </Badge>
                        )}
                      </div>
                    </CardHeader>

                    <CardContent className="flex-grow pb-3">
                      <CardDescription className="text-sm line-clamp-3 text-slate-300 group-hover:text-white transition-colors duration-300">
                        {project.description}
                      </CardDescription>
                    </CardContent>

                    {/* Card Footer with Dual Action Buttons */}
                    <CardFooter className="pt-0 grid grid-cols-2 gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openCaseStudy(project)}
                        className="w-full text-xs border-slate-700 hover:bg-slate-800 text-slate-200 hover:text-white"
                      >
                        <BookOpen className="mr-1.5 h-3.5 w-3.5 text-primary" />
                        Case Study
                      </Button>

                      <Button
                        asChild
                        variant="default"
                        size="sm"
                        className="w-full text-xs bg-gradient-to-r from-primary to-cyan-600 hover:from-primary/90 hover:to-cyan-500 
                                   shadow-md shadow-primary/20 border border-primary/40 text-primary-foreground"
                      >
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="mr-1.5 h-3.5 w-3.5" />
                          GitHub
                        </a>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>

        {/* GitHub Full Catalog Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center mt-14"
        >
          <p className="text-muted-foreground mb-4">
            Showing {filteredProjects.length} of {projects.length} repositories from @Abdul-Insighht
          </p>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-2 border-primary/50 hover:bg-primary/10 hover:border-primary 
                       transition-all duration-300 group relative overflow-hidden"
          >
            <a
              href="https://github.com/Abdul-Insighht?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="text-base sm:text-lg"
            >
              <span
                className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 
                               translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"
              />
              <ExternalLink className="mr-2 h-5 w-5" />
              View Full Repositories on GitHub
            </a>
          </Button>
        </motion.div>
      </div>

      {/* Case Study Modal Popup */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  )
}
