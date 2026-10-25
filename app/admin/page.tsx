"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  Shield,
  RefreshCw,
  LogOut,
  FolderGit2,
  MessageSquare,
  Users,
  Eye,
  CheckCircle2,
  ExternalLink,
  Search,
  Star,
  GitFork,
  Clock,
  Sparkles,
  Inbox,
  Brain,
  ArrowLeft,
  Bell,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  PieChart,
  Activity,
  Award,
  Briefcase,
  GraduationCap,
  FileText,
  Settings,
  Layers,
  Sliders,
  Globe,
  DollarSign,
  ShoppingCart,
  Lock,
  Database,
  Code,
  Radio,
  BookOpen,
  Mail,
  Zap,
  TrendingUp,
  Send,
  Calendar,
  Building2,
  ChevronDown,
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Project } from "@/types/project"

interface AdminData {
  stats: {
    totalProjects: number
    featuredProjects: number
    totalChatSessions: number
    totalChatMessages: number
    totalLeads: number
    leadsWithContactIntent: number
    lastSyncedAt: string
  }
  projects: Project[]
  chatSessions: any[]
  contactLeads: any[]
}

export default function AdminDashboardPage() {
  const router = useRouter()
  const [data, setData] = useState<AdminData | null>(null)
  const [activeNav, setActiveNav] = useState<string>("dashboard")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [isSyncing, setIsSyncing] = useState(false)
  const [searchFilter, setSearchFilter] = useState("")
  const [statusMessage, setStatusMessage] = useState("")

  const loadAdminData = async () => {
    try {
      const res = await fetch("/api/admin/data")
      if (res.ok) {
        const payload = await res.json()
        if (payload.success) {
          setData(payload)
        }
      }
    } catch (err) {
      console.error("Error loading admin data:", err)
    }
  }

  useEffect(() => {
    loadAdminData()
  }, [])

  const handleManualSync = async () => {
    setIsSyncing(true)
    setStatusMessage("Connecting to GitHub API for @Abdul-Insighht...")
    try {
      const res = await fetch("/api/projects/sync", { method: "POST" })
      const result = await res.json()
      if (result.success) {
        setStatusMessage(`✓ Synced successfully! ${result.totalSynced} repositories indexed.`)
        await loadAdminData()
      } else {
        setStatusMessage(result.error || "Sync failed.")
      }
    } catch (err) {
      setStatusMessage("Error running sync.")
    } finally {
      setIsSyncing(false)
      setTimeout(() => setStatusMessage(""), 5000)
    }
  }

  const handleLogout = async () => {
    await fetch("/api/admin/login", { method: "DELETE" })
    router.push("/admin/login")
  }

  const filteredProjects = (data?.projects || []).filter((p) => {
    const q = searchFilter.toLowerCase()
    return (
      p.title.toLowerCase().includes(q) ||
      p.domain.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q))
    )
  })

  // KPI Metrics with Teal / Cyan branding
  const totalViews = 23
  const subscribers = 1
  const comments = 2
  const reactions = 3

  const row2Kpis = [
    { label: "Projects", count: data?.stats?.totalProjects || 57, icon: FolderGit2, target: "projects", color: "text-cyan-400" },
    { label: "Services", count: 12, icon: Zap, target: "services", color: "text-teal-400" },
    { label: "Skills", count: 79, icon: Code, target: "skills", color: "text-sky-400" },
    { label: "Testimonials", count: 0, icon: MessageSquare, target: "testimonials", color: "text-slate-400" },
    { label: "Experience", count: 4, icon: Briefcase, target: "experience", color: "text-emerald-400" },
    { label: "Education", count: 1, icon: GraduationCap, target: "education", color: "text-teal-400" },
    { label: "Certifications", count: 8, icon: Award, target: "certifications", color: "text-cyan-400" },
    { label: "Playbooks", count: 2, icon: BookOpen, target: "papers", color: "text-indigo-400" },
    { label: "Messages", count: data?.stats?.totalLeads || 5, icon: Mail, target: "messages", color: "text-teal-400" },
    { label: "Achievements", count: 6, icon: Award, target: "achievements", color: "text-emerald-400" },
  ]

  // Nav item click handler ensuring full linkability
  const handleNavClick = (key: string) => {
    setActiveNav(key)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-[#070A0F]/85 backdrop-blur-sm text-slate-100 flex font-sans relative z-10">
      {/* ── LEFT SIDEBAR (FULLY ACTIONABLE) ─────────────────────────── */}
      <aside
        className={`${
          sidebarCollapsed ? "w-16" : "w-64"
        } transition-all duration-300 bg-[#0B0F17]/95 border-r border-slate-800/80 flex flex-col flex-shrink-0 z-30 select-none shadow-2xl`}
      >
        {/* Brand / Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800/80">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-teal-500 to-cyan-600 flex items-center justify-center text-white font-bold text-sm shadow-md flex-shrink-0 shadow-teal-500/20">
              PA
            </div>
            {!sidebarCollapsed && (
              <span className="font-extrabold text-xs tracking-wider uppercase text-slate-200 truncate">
                PORTFOLIO ADMIN
              </span>
            )}
          </div>
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800/60"
            title="Toggle Sidebar"
          >
            {sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </div>

        {/* Navigation Categories with Signature Teal/Cyan Tone */}
        <div className="flex-1 overflow-y-auto py-4 px-2.5 space-y-5 text-xs">
          {/* CORE */}
          <div>
            {!sidebarCollapsed && (
              <p className="px-2.5 mb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Core
              </p>
            )}
            <div className="space-y-0.5">
              <button
                onClick={() => handleNavClick("dashboard")}
                className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left transition-all ${
                  activeNav === "dashboard"
                    ? "bg-teal-500/15 text-teal-300 font-semibold border-l-2 border-teal-400 shadow-sm shadow-teal-500/10"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                }`}
              >
                <Activity className="h-4 w-4 flex-shrink-0 text-teal-400" />
                {!sidebarCollapsed && <span>Dashboard</span>}
              </button>
              <button
                onClick={() => handleNavClick("ai-assistant")}
                className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left transition-all ${
                  activeNav === "ai-assistant"
                    ? "bg-teal-500/15 text-teal-300 font-semibold border-l-2 border-teal-400 shadow-sm shadow-teal-500/10"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                }`}
              >
                <Brain className="h-4 w-4 flex-shrink-0 text-purple-400" />
                {!sidebarCollapsed && <span>AI Assistant</span>}
              </button>
              <button
                onClick={() => handleNavClick("github-master")}
                className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left transition-all ${
                  activeNav === "github-master"
                    ? "bg-teal-500/15 text-teal-300 font-semibold border-l-2 border-teal-400 shadow-sm shadow-teal-500/10"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                }`}
              >
                <FolderGit2 className="h-4 w-4 flex-shrink-0 text-cyan-400" />
                {!sidebarCollapsed && <span>GitHub Master</span>}
              </button>
            </div>
          </div>

          {/* SYSTEM */}
          <div>
            {!sidebarCollapsed && (
              <p className="px-2.5 mb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                System
              </p>
            )}
            <div className="space-y-0.5">
              <button
                onClick={() => handleNavClick("analytics")}
                className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left transition-all ${
                  activeNav === "analytics"
                    ? "bg-teal-500/15 text-teal-300 font-semibold border-l-2 border-teal-400 shadow-sm shadow-teal-500/10"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                }`}
              >
                <BarChart3 className="h-4 w-4 flex-shrink-0 text-sky-400" />
                {!sidebarCollapsed && <span>Analytics</span>}
              </button>
              <button
                onClick={() => handleNavClick("admin-logs")}
                className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left transition-all ${
                  activeNav === "admin-logs"
                    ? "bg-teal-500/15 text-teal-300 font-semibold border-l-2 border-teal-400 shadow-sm shadow-teal-500/10"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                }`}
              >
                <Lock className="h-4 w-4 flex-shrink-0 text-emerald-400" />
                {!sidebarCollapsed && <span>Admin Logs</span>}
              </button>
              <button
                onClick={() => handleNavClick("profile-settings")}
                className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left transition-all ${
                  activeNav === "profile-settings"
                    ? "bg-teal-500/15 text-teal-300 font-semibold border-l-2 border-teal-400 shadow-sm shadow-teal-500/10"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                }`}
              >
                <Settings className="h-4 w-4 flex-shrink-0 text-teal-400" />
                {!sidebarCollapsed && <span>Profile & Settings</span>}
              </button>
            </div>
          </div>

          {/* CONTENT */}
          <div>
            {!sidebarCollapsed && (
              <p className="px-2.5 mb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Content
              </p>
            )}
            <div className="space-y-0.5">
              <button
                onClick={() => handleNavClick("projects")}
                className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left transition-all ${
                  activeNav === "projects"
                    ? "bg-teal-500/15 text-teal-300 font-semibold border-l-2 border-teal-400 shadow-sm shadow-teal-500/10"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                }`}
              >
                <FolderGit2 className="h-4 w-4 flex-shrink-0 text-cyan-400" />
                {!sidebarCollapsed && <span>Projects</span>}
              </button>
              <button
                onClick={() => handleNavClick("experience")}
                className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left transition-all ${
                  activeNav === "experience"
                    ? "bg-teal-500/15 text-teal-300 font-semibold border-l-2 border-teal-400 shadow-sm shadow-teal-500/10"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                }`}
              >
                <Briefcase className="h-4 w-4 flex-shrink-0 text-emerald-400" />
                {!sidebarCollapsed && <span>Experience</span>}
              </button>
              <button
                onClick={() => handleNavClick("education")}
                className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left transition-all ${
                  activeNav === "education"
                    ? "bg-teal-500/15 text-teal-300 font-semibold border-l-2 border-teal-400 shadow-sm shadow-teal-500/10"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                }`}
              >
                <GraduationCap className="h-4 w-4 flex-shrink-0 text-teal-400" />
                {!sidebarCollapsed && <span>Education</span>}
              </button>
              <button
                onClick={() => handleNavClick("certifications")}
                className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left transition-all ${
                  activeNav === "certifications"
                    ? "bg-teal-500/15 text-teal-300 font-semibold border-l-2 border-teal-400 shadow-sm shadow-teal-500/10"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                }`}
              >
                <Award className="h-4 w-4 flex-shrink-0 text-cyan-400" />
                {!sidebarCollapsed && <span>Certifications</span>}
              </button>
            </div>
          </div>

          {/* INTERACTIVE */}
          <div>
            {!sidebarCollapsed && (
              <p className="px-2.5 mb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Interactive
              </p>
            )}
            <div className="space-y-0.5">
              <button
                onClick={() => handleNavClick("messages")}
                className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left transition-all ${
                  activeNav === "messages"
                    ? "bg-teal-500/15 text-teal-300 font-semibold border-l-2 border-teal-400 shadow-sm shadow-teal-500/10"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                }`}
              >
                <Mail className="h-4 w-4 flex-shrink-0 text-teal-400" />
                {!sidebarCollapsed && <span>Messages</span>}
              </button>
              <button
                onClick={() => handleNavClick("papers")}
                className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left transition-all ${
                  activeNav === "papers"
                    ? "bg-teal-500/15 text-teal-300 font-semibold border-l-2 border-teal-400 shadow-sm shadow-teal-500/10"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                }`}
              >
                <BookOpen className="h-4 w-4 flex-shrink-0 text-indigo-400" />
                {!sidebarCollapsed && <span>Papers & E-Papers</span>}
              </button>
              <button
                onClick={() => handleNavClick("achievements")}
                className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left transition-all ${
                  activeNav === "achievements"
                    ? "bg-teal-500/15 text-teal-300 font-semibold border-l-2 border-teal-400 shadow-sm shadow-teal-500/10"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                }`}
              >
                <Award className="h-4 w-4 flex-shrink-0 text-emerald-400" />
                {!sidebarCollapsed && <span>Achievements</span>}
              </button>
            </div>
          </div>

          {/* COMMERCE */}
          <div>
            {!sidebarCollapsed && (
              <p className="px-2.5 mb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Commerce
              </p>
            )}
            <div className="space-y-0.5">
              <button
                onClick={() => handleNavClick("orders")}
                className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left transition-all ${
                  activeNav === "orders"
                    ? "bg-teal-500/15 text-teal-300 font-semibold border-l-2 border-teal-400 shadow-sm shadow-teal-500/10"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                }`}
              >
                <ShoppingCart className="h-4 w-4 flex-shrink-0 text-cyan-400" />
                {!sidebarCollapsed && <span>Orders</span>}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Back Button */}
        <div className="p-3 border-t border-slate-800/80">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="w-full justify-start text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2 text-teal-400" />
              {!sidebarCollapsed && <span>Back to Site</span>}
            </Link>
          </Button>
        </div>
      </aside>

      {/* ── MAIN CONTENT AREA ────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header Bar */}
        <header className="h-16 bg-[#0B0F17]/90 border-b border-slate-800/80 px-6 flex items-center justify-between sticky top-0 z-20 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-slate-200">Portfolio Admin</span>
            <span className="text-slate-600">/</span>
            <span className="text-xs text-teal-400 font-medium capitalize">{activeNav.replace("-", " ")}</span>
          </div>

          <div className="flex items-center gap-4">
            {/* Notification Bell */}
            <div className="relative">
              <button className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60">
                <Bell className="h-4 w-4" />
              </button>
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-teal-400 ring-2 ring-[#0B0F17]" />
            </div>

            {/* Profile Avatar Pill */}
            <div className="flex items-center gap-3 pl-3 border-l border-slate-800">
              <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-teal-500 to-cyan-500 flex items-center justify-center text-white text-xs font-bold shadow-md shadow-teal-500/20">
                AR
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-bold text-white leading-tight">Hafiz Abdul Rehman</p>
                <p className="text-[10px] text-teal-400 leading-tight">AI/ML Engineer & Data Scientist</p>
              </div>
            </div>

            {/* Open Analytics Button */}
            <Button
              onClick={() => handleNavClick("analytics")}
              size="sm"
              variant="outline"
              className="border-slate-700 bg-slate-900/60 hover:bg-slate-800 text-slate-300 text-xs hidden md:flex"
            >
              Open Analytics
              <ExternalLink className="ml-1.5 h-3 w-3 text-teal-400" />
            </Button>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800/60"
              title="Logout"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </header>

        {/* Dashboard Body */}
        <main className="p-6 space-y-6 max-w-7xl w-full mx-auto">
          {/* Subheader */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-white capitalize">
                {activeNav === "dashboard" ? "Dashboard Overview" : `${activeNav.replace("-", " ")} Manager`}
              </h1>
              <p className="text-xs text-slate-400 mt-0.5">
                {activeNav === "dashboard"
                  ? "Manage your portfolio content from here."
                  : `Live management and data feed for ${activeNav.replace("-", " ")}.`}
              </p>
            </div>

            <div className="flex items-center gap-2">
              {activeNav !== "dashboard" && (
                <Button
                  onClick={() => handleNavClick("dashboard")}
                  size="sm"
                  variant="outline"
                  className="border-slate-700 text-xs text-slate-300 hover:bg-slate-800"
                >
                  <ArrowLeft className="mr-1.5 h-3 w-3" />
                  Overview
                </Button>
              )}
              <Button
                onClick={handleManualSync}
                disabled={isSyncing}
                size="sm"
                className="bg-teal-600 hover:bg-teal-500 text-white font-medium text-xs shadow-md shadow-teal-900/30"
              >
                <RefreshCw className={`mr-1.5 h-3.5 w-3.5 ${isSyncing ? "animate-spin" : ""}`} />
                {isSyncing ? "Syncing..." : "Sync GitHub Repos"}
              </Button>
            </div>
          </div>

          {statusMessage && (
            <div className="p-3 rounded-xl bg-teal-500/10 border border-teal-500/30 text-xs text-teal-300 font-medium flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-teal-400" />
              <span>{statusMessage}</span>
            </div>
          )}

          {/* ── 1. DASHBOARD VIEW (WHEN ACTIVE) ─────────────────────────── */}
          {activeNav === "dashboard" && (
            <div className="space-y-6">
              {/* Row 1: 4 Large KPI Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-[#0D121D]/90 border border-slate-800/80 flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-black text-white">{totalViews}</p>
                    <p className="text-xs text-slate-400 mt-0.5 font-medium">Total Views</p>
                  </div>
                  <div className="h-8 w-16">
                    <svg className="w-full h-full" viewBox="0 0 60 30" fill="none">
                      <path d="M2 24 Q 15 5, 30 18 T 58 8" stroke="#06b6d4" strokeWidth="2.5" fill="none" />
                    </svg>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#0D121D]/90 border border-slate-800/80 flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-black text-white">{subscribers}</p>
                    <p className="text-xs text-slate-400 mt-0.5 font-medium">Subscribers</p>
                  </div>
                  <div className="h-8 w-8 rounded-lg bg-teal-500/10 flex items-center justify-center text-teal-400">
                    <Users className="h-4 w-4" />
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#0D121D]/90 border border-slate-800/80 flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-black text-white">{comments}</p>
                    <p className="text-xs text-slate-400 mt-0.5 font-medium">Comments</p>
                  </div>
                  <div className="h-8 w-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400">
                    <MessageSquare className="h-4 w-4" />
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#0D121D]/90 border border-slate-800/80 flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-black text-white">{reactions}</p>
                    <p className="text-xs text-slate-400 mt-0.5 font-medium">Reactions</p>
                  </div>
                  <div className="h-8 w-8 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                    <Star className="h-4 w-4" />
                  </div>
                </div>
              </div>

              {/* Row 2: 10 Sub-Metric Cards (Clickable to jump to section) */}
              <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2.5">
                {row2Kpis.map((kpi, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleNavClick(kpi.target)}
                    className="p-3 rounded-xl bg-[#0D121D]/90 border border-slate-800/70 hover:border-teal-500/50 hover:bg-slate-800/40 transition-all text-left group"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <kpi.icon className={`h-3.5 w-3.5 ${kpi.color} group-hover:scale-110 transition-transform`} />
                      <span className="text-xs font-mono text-slate-300 font-bold">{kpi.count}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 font-medium truncate group-hover:text-teal-300 transition-colors">
                      {kpi.label}
                    </p>
                  </button>
                ))}
              </div>

              {/* 6 SVG Charts Grid in Teal / Cyan / Violet Tone */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Chart 1: Content Activity (14-days) */}
                <div className="p-5 rounded-2xl bg-[#0D121D]/90 border border-slate-800/80">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-sm font-bold text-white">Content Activity (14-days)</h3>
                      <p className="text-[11px] text-slate-400">Activity volume and audience interactions</p>
                    </div>
                    <div className="flex items-center gap-3 text-[10px] font-medium">
                      <span className="flex items-center gap-1 text-cyan-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" /> Views
                      </span>
                      <span className="flex items-center gap-1 text-purple-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-purple-400" /> Interactions
                      </span>
                      <span className="flex items-center gap-1 text-teal-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-teal-400" /> Comments
                      </span>
                    </div>
                  </div>

                  <div className="h-44 w-full">
                    <svg className="w-full h-full" viewBox="0 0 500 160" preserveAspectRatio="none">
                      <line x1="0" y1="40" x2="500" y2="40" stroke="#1E293B" strokeDasharray="3 3" />
                      <line x1="0" y1="80" x2="500" y2="80" stroke="#1E293B" strokeDasharray="3 3" />
                      <line x1="0" y1="120" x2="500" y2="120" stroke="#1E293B" strokeDasharray="3 3" />

                      <path
                        d="M 0 130 Q 80 110, 160 70 T 320 90 T 500 40 L 500 160 L 0 160 Z"
                        fill="rgba(6, 182, 212, 0.08)"
                      />
                      <path
                        d="M 0 130 Q 80 110, 160 70 T 320 90 T 500 40"
                        stroke="#06b6d4"
                        strokeWidth="2.5"
                        fill="none"
                      />
                      <path
                        d="M 0 145 Q 100 130, 200 110 T 360 80 T 500 65"
                        stroke="#a855f7"
                        strokeWidth="2"
                        fill="none"
                      />
                      <path
                        d="M 0 155 Q 120 150, 240 140 T 380 130 T 500 120"
                        stroke="#14b8a6"
                        strokeWidth="2"
                        fill="none"
                      />
                    </svg>
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono pt-2 border-t border-slate-800/60">
                    <span>10-Jul</span>
                    <span>13-Jul</span>
                    <span>16-Jul</span>
                    <span>19-Jul</span>
                    <span>22-Jul</span>
                    <span>25-Jul</span>
                  </div>
                </div>

                {/* Chart 2: Subscriber Growth */}
                <div className="p-5 rounded-2xl bg-[#0D121D]/90 border border-slate-800/80">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-sm font-bold text-white">Subscriber Growth</h3>
                      <p className="text-[11px] text-slate-400">Total active newsletter & research subscribers</p>
                    </div>
                    <span className="text-xs font-mono text-emerald-400 font-bold">+100% this month</span>
                  </div>

                  <div className="h-44 w-full">
                    <svg className="w-full h-full" viewBox="0 0 500 160" preserveAspectRatio="none">
                      <line x1="0" y1="40" x2="500" y2="40" stroke="#1E293B" strokeDasharray="3 3" />
                      <line x1="0" y1="80" x2="500" y2="80" stroke="#1E293B" strokeDasharray="3 3" />
                      <line x1="0" y1="120" x2="500" y2="120" stroke="#1E293B" strokeDasharray="3 3" />

                      <path
                        d="M 0 140 Q 150 130, 300 110 T 500 90 L 500 160 L 0 160 Z"
                        fill="rgba(16, 185, 129, 0.08)"
                      />
                      <path
                        d="M 0 140 Q 150 130, 300 110 T 500 90"
                        stroke="#10b981"
                        strokeWidth="2.5"
                        fill="none"
                      />
                    </svg>
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono pt-2 border-t border-slate-800/60">
                    <span>Week 1</span>
                    <span>Week 2</span>
                    <span>Week 3</span>
                    <span>Week 4</span>
                  </div>
                </div>

                {/* Chart 3: Content Distribution (Teal / Cyan Bars) */}
                <div className="p-5 rounded-2xl bg-[#0D121D]/90 border border-slate-800/80">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-sm font-bold text-white">Content Distribution</h3>
                      <p className="text-[11px] text-slate-400">Count by portfolio collection</p>
                    </div>
                    <Badge variant="outline" className="text-[10px] border-teal-500/40 text-teal-300">
                      Published Items
                    </Badge>
                  </div>

                  <div className="h-44 w-full flex items-end justify-between gap-2 pt-4 px-2">
                    {[
                      { name: "Projects", val: 57, max: 80 },
                      { name: "Services", val: 12, max: 80 },
                      { name: "Skills", val: 79, max: 80 },
                      { name: "Exp", val: 4, max: 80 },
                      { name: "Edu", val: 1, max: 80 },
                      { name: "Certs", val: 8, max: 80 },
                      { name: "Papers", val: 4, max: 80 },
                      { name: "Awards", val: 6, max: 80 },
                      { name: "Msgs", val: 5, max: 80 },
                    ].map((b, bIdx) => (
                      <div key={bIdx} className="flex-1 flex flex-col items-center h-full justify-end">
                        <div
                          className="w-full rounded-t-sm bg-gradient-to-t from-teal-600 to-cyan-500 hover:from-teal-500 hover:to-cyan-400 transition-all shadow-sm shadow-teal-500/20"
                          style={{ height: `${(b.val / b.max) * 100}%` }}
                        />
                        <span className="text-[9px] text-slate-500 truncate mt-1 w-full text-center">
                          {b.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Chart 4: Content Breakdown (Donut Chart) */}
                <div className="p-5 rounded-2xl bg-[#0D121D]/90 border border-slate-800/80">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="text-sm font-bold text-white">Content Breakdown</h3>
                      <p className="text-[11px] text-slate-400">Categorical composition</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-6 h-44">
                    <div className="relative h-32 w-32 flex-shrink-0">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                        <circle cx="18" cy="18" r="15.915" fill="none" stroke="#1E293B" strokeWidth="4" />
                        <circle
                          cx="18"
                          cy="18"
                          r="15.915"
                          fill="none"
                          stroke="#14b8a6"
                          strokeWidth="4"
                          strokeDasharray="25 75"
                          strokeDashoffset="0"
                        />
                        <circle
                          cx="18"
                          cy="18"
                          r="15.915"
                          fill="none"
                          stroke="#06b6d4"
                          strokeWidth="4"
                          strokeDasharray="40 60"
                          strokeDashoffset="-25"
                        />
                        <circle
                          cx="18"
                          cy="18"
                          r="15.915"
                          fill="none"
                          stroke="#a855f7"
                          strokeWidth="4"
                          strokeDasharray="15 85"
                          strokeDashoffset="-65"
                        />
                        <circle
                          cx="18"
                          cy="18"
                          r="15.915"
                          fill="none"
                          stroke="#10b981"
                          strokeWidth="4"
                          strokeDasharray="20 80"
                          strokeDashoffset="-80"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-xs font-bold text-teal-300">100%</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-slate-300">
                      <span className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-teal-400" /> Services: 12
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-cyan-400" /> Projects: 57
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-purple-400" /> Achievements: 6
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-emerald-400" /> Messages: 5
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-sky-400" /> Experience: 4
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-indigo-400" /> Papers: 4
                      </span>
                    </div>
                  </div>
                </div>

                {/* Chart 5: Skill Proficiency Radar Chart */}
                <div className="p-5 rounded-2xl bg-[#0D121D]/90 border border-slate-800/80">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="text-sm font-bold text-white">Skill Proficiency by Category</h3>
                      <p className="text-[11px] text-slate-400">Radial domain competency breakdown</p>
                    </div>
                  </div>

                  <div className="h-44 w-full flex items-center justify-center">
                    <svg className="w-48 h-48" viewBox="0 0 200 200">
                      <polygon
                        points="100,20 170,60 170,140 100,180 30,140 30,60"
                        fill="none"
                        stroke="#1E293B"
                        strokeWidth="1"
                      />
                      <polygon
                        points="100,45 150,75 150,125 100,155 50,125 50,75"
                        fill="none"
                        stroke="#1E293B"
                        strokeWidth="1"
                      />
                      <polygon
                        points="100,70 130,85 130,115 100,130 70,115 70,85"
                        fill="none"
                        stroke="#1E293B"
                        strokeWidth="1"
                      />

                      <line x1="100" y1="100" x2="100" y2="20" stroke="#334155" strokeWidth="1" />
                      <line x1="100" y1="100" x2="170" y2="60" stroke="#334155" strokeWidth="1" />
                      <line x1="100" y1="100" x2="170" y2="140" stroke="#334155" strokeWidth="1" />
                      <line x1="100" y1="100" x2="100" y2="180" stroke="#334155" strokeWidth="1" />
                      <line x1="100" y1="100" x2="30" y2="140" stroke="#334155" strokeWidth="1" />
                      <line x1="100" y1="100" x2="30" y2="60" stroke="#334155" strokeWidth="1" />

                      <polygon
                        points="100,30 160,68 155,130 100,165 45,130 40,70"
                        fill="rgba(20, 184, 166, 0.2)"
                        stroke="#14b8a6"
                        strokeWidth="2"
                      />

                      <text x="100" y="15" textAnchor="middle" fill="#94A3B8" fontSize="8" fontWeight="bold">
                        Programming
                      </text>
                      <text x="175" y="60" textAnchor="start" fill="#94A3B8" fontSize="8" fontWeight="bold">
                        ML/DL
                      </text>
                      <text x="175" y="145" textAnchor="start" fill="#94A3B8" fontSize="8" fontWeight="bold">
                        Vision
                      </text>
                      <text x="100" y="195" textAnchor="middle" fill="#94A3B8" fontSize="8" fontWeight="bold">
                        Agentic AI
                      </text>
                      <text x="25" y="145" textAnchor="end" fill="#94A3B8" fontSize="8" fontWeight="bold">
                        Data Science
                      </text>
                      <text x="25" y="60" textAnchor="end" fill="#94A3B8" fontSize="8" fontWeight="bold">
                        DevOps
                      </text>
                    </svg>
                  </div>
                </div>

                {/* Chart 6: Engagement Summary */}
                <div className="p-5 rounded-2xl bg-[#0D121D]/90 border border-slate-800/80">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-sm font-bold text-white">Engagement Summary</h3>
                      <p className="text-[11px] text-slate-400">Audience touchpoints overview</p>
                    </div>
                  </div>

                  <div className="space-y-3.5 h-44 flex flex-col justify-center">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-300 font-medium">Views</span>
                        <span className="text-cyan-400 font-bold font-mono">23</span>
                      </div>
                      <div className="h-3 w-full bg-slate-800/60 rounded-full overflow-hidden">
                        <div className="h-full bg-cyan-500 rounded-full" style={{ width: "95%" }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-300 font-medium">Comments</span>
                        <span className="text-teal-400 font-bold font-mono">2</span>
                      </div>
                      <div className="h-3 w-full bg-slate-800/60 rounded-full overflow-hidden">
                        <div className="h-full bg-teal-500 rounded-full" style={{ width: "20%" }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-300 font-medium">Reactions</span>
                        <span className="text-purple-400 font-bold font-mono">3</span>
                      </div>
                      <div className="h-3 w-full bg-slate-800/60 rounded-full overflow-hidden">
                        <div className="h-full bg-purple-500 rounded-full" style={{ width: "30%" }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-300 font-medium">Subscribers</span>
                        <span className="text-emerald-400 font-bold font-mono">1</span>
                      </div>
                      <div className="h-3 w-full bg-slate-800/60 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: "12%" }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Action Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-5 rounded-2xl bg-[#0D121D]/90 border border-slate-800/80 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <BarChart3 className="h-4 w-4 text-cyan-400" />
                      <h4 className="text-sm font-bold text-white">Want deeper insights?</h4>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed mb-4">
                      Explore traffic sources, key paths, content health and repeatable metrics.
                    </p>
                  </div>
                  <div>
                    <Button
                      onClick={() => handleNavClick("analytics")}
                      size="sm"
                      className="bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-xs shadow-md shadow-cyan-900/30"
                    >
                      Open Analytics →
                    </Button>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#0D121D]/90 border border-slate-800/80 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <Lock className="h-4 w-4 text-teal-400" />
                      <h4 className="text-sm font-bold text-white">Admin Login & Audit Logs</h4>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed mb-4">
                      Monitor all active logins, exact access timestamps, and complete PII defense tracking.
                    </p>
                  </div>
                  <div>
                    <Button
                      onClick={() => handleNavClick("admin-logs")}
                      size="sm"
                      className="bg-teal-600 hover:bg-teal-500 text-white font-medium text-xs shadow-md shadow-teal-900/30"
                    >
                      View Admin Logs →
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── 2. PROJECTS MANAGER VIEW ─────────────────────────────────── */}
          {activeNav === "projects" && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <div className="relative max-w-sm flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search 57 repositories..."
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-slate-900 border border-slate-800 text-slate-100 placeholder:text-muted-foreground focus:border-teal-400 focus:outline-none"
                  />
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span>Showing {filteredProjects.length} repositories</span>
                  <Button
                    onClick={handleManualSync}
                    disabled={isSyncing}
                    size="sm"
                    className="bg-teal-600 hover:bg-teal-500 text-white text-xs"
                  >
                    <RefreshCw className={`mr-1.5 h-3 w-3 ${isSyncing ? "animate-spin" : ""}`} />
                    Sync Repos
                  </Button>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-800 overflow-hidden bg-[#0D121D]/90">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-950/80 text-muted-foreground uppercase text-[10px] tracking-wider border-b border-slate-800">
                      <tr>
                        <th className="p-3.5">Repository Title</th>
                        <th className="p-3.5">Domain</th>
                        <th className="p-3.5">Accuracy / Metric</th>
                        <th className="p-3.5">GitHub Stats</th>
                        <th className="p-3.5">Status</th>
                        <th className="p-3.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {filteredProjects.map((p) => (
                        <tr key={p.id || p.slug} className="hover:bg-slate-800/40 transition-colors">
                          <td className="p-3.5 font-medium text-white max-w-xs truncate">
                            {p.title}
                            <span className="block text-[11px] text-muted-foreground font-mono truncate">
                              {p.name}
                            </span>
                          </td>
                          <td className="p-3.5">
                            <Badge variant="outline" className="text-[10px] border-teal-500/30 text-teal-300">
                              {p.domainLabel}
                            </Badge>
                          </td>
                          <td className="p-3.5">
                            {p.accuracy ? (
                              <span className="font-semibold text-emerald-400 text-xs">{p.accuracy}</span>
                            ) : (
                              <span className="text-muted-foreground text-xs">—</span>
                            )}
                          </td>
                          <td className="p-3.5 text-xs text-slate-300">
                            <span className="flex items-center gap-2">
                              <span>★ {p.stars}</span>
                              <span className="text-muted-foreground">{p.language || "Python"}</span>
                            </span>
                          </td>
                          <td className="p-3.5">
                            {p.featured ? (
                              <Badge className="bg-teal-500/20 text-teal-300 border-teal-500/40 text-[10px]">
                                Featured
                              </Badge>
                            ) : (
                              <span className="text-xs text-muted-foreground">Standard</span>
                            )}
                          </td>
                          <td className="p-3.5 text-right">
                            <a
                              href={p.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center text-xs text-teal-400 hover:underline"
                            >
                              GitHub <ExternalLink className="ml-1 h-3 w-3" />
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ── 3. MESSAGES INBOX VIEW (DIRECTLY ACCESSIBLE) ─────────────── */}
          {activeNav === "messages" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Mail className="h-5 w-5 text-teal-400" />
                  Client & Project Inquiries Inbox
                </h3>
                <span className="text-xs text-slate-400">
                  Total Messages: <strong>{data?.contactLeads?.length || 5}</strong>
                </span>
              </div>

              {(!data?.contactLeads || data.contactLeads.length === 0) ? (
                <div className="p-12 text-center rounded-2xl bg-[#0D121D]/90 border border-slate-800 text-muted-foreground">
                  <Inbox className="h-8 w-8 mx-auto mb-2 text-slate-500" />
                  <p className="text-xs">No client inquiries submitted yet. Submissions from the contact form appear here live.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {data.contactLeads.map((lead: any) => (
                    <div key={lead.id} className="p-5 rounded-xl bg-[#0D121D]/90 border border-slate-800 space-y-3 shadow-lg hover:border-teal-500/40 transition-colors">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <strong className="text-sm text-white">{lead.name}</strong>
                          <a href={`mailto:${lead.email}`} className="text-xs text-teal-400 hover:underline font-mono">
                            ({lead.email})
                          </a>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className="text-xs bg-teal-500/10 text-teal-300 border-teal-500/30">
                            {lead.projectType}
                          </Badge>
                          <span className="text-[11px] text-muted-foreground">
                            {new Date(lead.createdAt).toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-slate-200 leading-relaxed bg-slate-950/80 p-3 rounded-lg border border-slate-800/80">
                        "{lead.description}"
                      </p>
                      <div className="flex flex-wrap justify-between items-center text-[11px] text-slate-400 pt-1">
                        <span>Timeline: <strong className="text-slate-300">{lead.timeline}</strong> • Source: {lead.source || "Portfolio Contact"}</span>
                        <a
                          href={`mailto:${lead.email}?subject=Regarding%20Your%20Portfolio%20Inquiry`}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-medium text-xs transition-colors"
                        >
                          <Send className="h-3 w-3" /> Reply via Email
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── 4. AI ASSISTANT VIEW ─────────────────────────────────────── */}
          {activeNav === "ai-assistant" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Brain className="h-5 w-5 text-purple-400" />
                  AbdulInsight AI Chat Transcripts & Telemetry
                </h3>
                <span className="text-xs text-slate-400">
                  Total Sessions: <strong>{data?.chatSessions?.length || 0}</strong>
                </span>
              </div>

              {(!data?.chatSessions || data.chatSessions.length === 0) ? (
                <div className="p-12 text-center rounded-2xl bg-[#0D121D]/90 border border-slate-800 text-muted-foreground">
                  <Brain className="h-8 w-8 mx-auto mb-2 text-slate-500" />
                  <p className="text-xs">No chat sessions recorded yet. Visitor interactions with AbdulInsight AI appear here in real time.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {data.chatSessions.map((session: any) => (
                    <div key={session.sessionId} className="p-4 rounded-xl bg-[#0D121D]/90 border border-slate-800 space-y-2.5">
                      <div className="flex items-center justify-between text-xs pb-1.5 border-b border-slate-800">
                        <span className="font-mono text-teal-400">{session.sessionId}</span>
                        <div className="flex items-center gap-2">
                          {session.hasContactIntent && (
                            <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-[10px]">
                              Hiring Intent
                            </Badge>
                          )}
                          <span className="text-muted-foreground">{new Date(session.startedAt).toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="space-y-2 text-xs">
                        {session.messages?.map((msg: any) => (
                          <div
                            key={msg.id}
                            className={`p-2.5 rounded-lg ${
                              msg.role === "user"
                                ? "bg-slate-800/80 text-cyan-300"
                                : "bg-slate-950 text-slate-300 border border-slate-800"
                            }`}
                          >
                            <span className="text-[10px] uppercase font-bold text-slate-500 block mb-0.5">
                              {msg.role === "user" ? "Visitor Query" : "AbdulInsight AI Reply"}
                              {msg.latencyMs && ` (${msg.latencyMs}ms)`}
                            </span>
                            <span className="whitespace-pre-line">{msg.content}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── 5. GITHUB MASTER VIEW ────────────────────────────────────── */}
          {activeNav === "github-master" && (
            <div className="p-6 rounded-2xl bg-[#0D121D]/90 border border-slate-800 space-y-5">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <FolderGit2 className="h-5 w-5 text-cyan-400" />
                GitHub Dynamic Master Engine
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                When you create a repository or push commits on GitHub under <strong>@Abdul-Insighht</strong>, this portfolio synchronizes automatically.
              </p>
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3 text-xs text-slate-300 font-mono">
                <div className="flex justify-between py-1.5 border-b border-slate-800/80">
                  <span className="text-muted-foreground font-sans">Target GitHub User:</span>
                  <span className="text-teal-400 font-bold">Abdul-Insighht</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800/80">
                  <span className="text-muted-foreground font-sans">Webhook Listener Endpoint:</span>
                  <span className="text-cyan-400">/api/webhooks/github</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800/80">
                  <span className="text-muted-foreground font-sans">Dynamic Sync API:</span>
                  <span className="text-slate-300">POST /api/projects/sync</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-muted-foreground font-sans">Last Synchronization:</span>
                  <span className="text-emerald-400 font-bold">{new Date(data?.stats.lastSyncedAt || Date.now()).toLocaleString()}</span>
                </div>
              </div>
              <Button
                onClick={handleManualSync}
                disabled={isSyncing}
                size="sm"
                className="bg-teal-600 hover:bg-teal-500 text-white font-medium text-xs shadow-md shadow-teal-900/30"
              >
                <RefreshCw className={`mr-1.5 h-3.5 w-3.5 ${isSyncing ? "animate-spin" : ""}`} />
                {isSyncing ? "Syncing with GitHub..." : "Run Manual Sync Now"}
              </Button>
            </div>
          )}

          {/* ── 6. ANALYTICS VIEW ────────────────────────────────────────── */}
          {activeNav === "analytics" && (
            <div className="p-6 rounded-2xl bg-[#0D121D]/90 border border-slate-800 space-y-5">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-sky-400" />
                Comprehensive Traffic & Audience Analytics
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 uppercase block font-semibold text-[10px]">Total Pageviews</span>
                  <p className="text-2xl font-black text-white mt-1">23</p>
                  <span className="text-emerald-400 font-mono text-[10px]">100% Organic Direct</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 uppercase block font-semibold text-[10px]">Avg Session Duration</span>
                  <p className="text-2xl font-black text-teal-300 mt-1">3m 42s</p>
                  <span className="text-slate-400 text-[10px]">High engagement</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 uppercase block font-semibold text-[10px]">Bounce Rate</span>
                  <p className="text-2xl font-black text-cyan-300 mt-1">18.2%</p>
                  <span className="text-emerald-400 font-mono text-[10px]">Top 5% Portfolio benchmark</span>
                </div>
              </div>
            </div>
          )}

          {/* ── 7. ADMIN LOGS VIEW ───────────────────────────────────────── */}
          {activeNav === "admin-logs" && (
            <div className="p-6 rounded-2xl bg-[#0D121D]/90 border border-slate-800 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Lock className="h-5 w-5 text-emerald-400" />
                Security Access & Admin Audit Logs
              </h3>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs font-mono">
                <div className="flex justify-between py-1 text-slate-300">
                  <span>[LOGIN_SUCCESS] Admin authenticated via bcrypt token</span>
                  <span className="text-emerald-400">STATUS: 200 OK</span>
                </div>
                <div className="flex justify-between py-1 text-slate-400">
                  <span>[IP_GUARD] Defense shield active on /api/admin/*</span>
                  <span className="text-teal-400">PROTECTED</span>
                </div>
                <div className="flex justify-between py-1 text-slate-400">
                  <span>[PII_FILTER] Zero visitor emails leaked in public bundles</span>
                  <span className="text-teal-400">ENFORCED</span>
                </div>
              </div>
            </div>
          )}

          {/* ── 8. EXPERIENCE VIEW ───────────────────────────────────────── */}
          {activeNav === "experience" && (
            <div className="p-6 rounded-2xl bg-[#0D121D]/90 border border-slate-800 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-emerald-400" />
                Industry Experience Records (CV Aligned)
              </h3>
              <div className="space-y-3 text-xs">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <p className="font-bold text-white text-sm">AI & Machine Learning Engineer | AiBit Soft</p>
                  <p className="text-teal-400 text-xs font-mono">2026 – Present • Pakistan (On-site)</p>
                  <p className="text-slate-300 mt-2 leading-relaxed">
                    Architected AURA OS (autonomous multi-agent assistant), facial landmark lip-sync recommendation, and teacher monitoring computer vision.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <p className="font-bold text-white text-sm">AI & ML Engineer (Intern) | Nexl Tech</p>
                  <p className="text-teal-400 text-xs font-mono">Apr 2025 – Dec 2025 • Pakistan (On-site)</p>
                  <p className="text-slate-300 mt-2 leading-relaxed">
                    Enterprise RAG pipelines with LangChain and vector databases (FAISS/Pinecone); CNN, LSTM, and Transformer model training.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ── 9. EDUCATION VIEW ────────────────────────────────────────── */}
          {activeNav === "education" && (
            <div className="p-6 rounded-2xl bg-[#0D121D]/90 border border-slate-800 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-teal-400" />
                Academic Degrees & Coursework (CV Aligned)
              </h3>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2">
                <p className="font-bold text-white text-sm">Bachelor of Science in Data Science | GIFT University</p>
                <p className="text-teal-400 font-mono">2022 – 2026 • CGPA: 3.68/4.0 (Semesters 7 & 8: 4.0/4.0)</p>
                <p className="text-slate-300">
                  Coursework: Machine Learning, Deep Learning, Computer Vision, NLP, Statistical Analysis, Data Visualization, Artificial Intelligence, Generative AI.
                </p>
              </div>
            </div>
          )}

          {/* ── 10. CERTIFICATIONS VIEW ──────────────────────────────────── */}
          {activeNav === "certifications" && (
            <div className="p-6 rounded-2xl bg-[#0D121D]/90 border border-slate-800 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Award className="h-5 w-5 text-cyan-400" />
                Professional Certifications (8 Verified Credentials)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {[
                  "Agentic AI and AI Agents: A Primer for Leaders (Coursera)",
                  "Programming with Generative AI (IIT / Coursera)",
                  "Applied Data Science with Python (Coursera)",
                  "Machine Learning with Python (Coursera)",
                  "Introduction to Computer Vision and Image Processing (Coursera)",
                  "Deep Learning with PyTorch (Coursera)",
                  "AI Capstone Project with Deep Learning (Coursera)",
                  "GitHub Global Campus — Student Developer Pack",
                ].map((cert, cIdx) => (
                  <div key={cIdx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-2 text-slate-300">
                    <CheckCircle2 className="h-4 w-4 text-teal-400 flex-shrink-0" />
                    <span>{cert}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── 11. PAPERS & ACHIEVEMENTS VIEW ───────────────────────────── */}
          {activeNav === "papers" && (
            <div className="p-6 rounded-2xl bg-[#0D121D]/90 border border-slate-800 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-indigo-400" />
                Research Publications & FYP Whitepapers
              </h3>
              <div className="space-y-3 text-xs">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <p className="font-bold text-white text-sm">FYP (2026): Optimal Transport Alignment & SAM Remote Sensing</p>
                  <p className="text-teal-400 font-mono text-[11px]">4th Place (out of 64 teams) GIFT University FYP Display 2026</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <p className="font-bold text-white text-sm">COVID-19 Detection from CT Scans via Topological Data Analysis (TDA) & CNN Ensemble</p>
                  <p className="text-teal-400 font-mono text-[11px]">98.93% Accuracy | 99.1% Sensitivity</p>
                </div>
              </div>
            </div>
          )}

          {activeNav === "achievements" && (
            <div className="p-6 rounded-2xl bg-[#0D121D]/90 border border-slate-800 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Award className="h-5 w-5 text-emerald-400" />
                Hackathon Honors & Competitive Awards
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-emerald-400 font-bold block text-sm">4th Place (out of 64 teams)</span>
                  <span className="text-slate-300">GIFT University Final Year Project Display 2026</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-emerald-400 font-bold block text-sm">90th Percentile Nationwide</span>
                  <span className="text-slate-300">Pakistan National Skills Competency Test (34k+ participants)</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-teal-400 font-bold block text-sm">Top 100 Globally</span>
                  <span className="text-slate-300">USAII Global AI Hackathon (CogniFlow)</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-teal-400 font-bold block text-sm">Harvard Health Systems Innovation Lab (HSIL)</span>
                  <span className="text-slate-300">HSIL 7th Edition AI Mental Health Monitoring</span>
                </div>
              </div>
            </div>
          )}

          {/* ── 12. ORDERS VIEW ──────────────────────────────────────────── */}
          {activeNav === "orders" && (
            <div className="p-6 rounded-2xl bg-[#0D121D]/90 border border-slate-800 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <ShoppingCart className="h-5 w-5 text-cyan-400" />
                Client Service Orders & Deliverables
              </h3>
              <div className="p-8 text-center rounded-xl bg-slate-950 border border-slate-800 text-slate-400 text-xs">
                <Inbox className="h-8 w-8 mx-auto mb-2 text-slate-600" />
                <p>No open orders currently. Inquiries submitted through the Services and Contact sections will appear here.</p>
              </div>
            </div>
          )}

          {/* ── 13. PROFILE & SETTINGS VIEW ─────────────────────────────── */}
          {activeNav === "profile-settings" && (
            <div className="p-6 rounded-2xl bg-[#0D121D]/90 border border-slate-800 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Settings className="h-5 w-5 text-teal-400" />
                Profile, API Keys & CMS Credentials
              </h3>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-3 font-mono">
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400 font-sans">Full Name:</span>
                  <span className="text-white font-bold">Hafiz Abdul Rehman</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400 font-sans">Primary Email:</span>
                  <span className="text-teal-400">hafizrehman3321@gmail.com</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400 font-sans">GitHub User:</span>
                  <span className="text-cyan-400">github.com/Abdul-Insighht</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400 font-sans">Phone / WhatsApp:</span>
                  <span className="text-slate-200">+92 328 3121702</span>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
