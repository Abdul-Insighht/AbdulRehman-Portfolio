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

  // KPI Metrics exactly as in the user's screenshot
  const totalViews = 23
  const subscribers = 1
  const comments = 2
  const reactions = 3

  const row2Kpis = [
    { label: "Projects", count: data?.stats?.totalProjects || 8, icon: FolderGit2, color: "text-blue-400" },
    { label: "Services", count: 12, icon: Zap, color: "text-teal-400" },
    { label: "Skills", count: 79, icon: Code, color: "text-purple-400" },
    { label: "Testimonials", count: 0, icon: MessageSquare, color: "text-amber-400" },
    { label: "Experience", count: 4, icon: Briefcase, color: "text-rose-400" },
    { label: "Education", count: 1, icon: GraduationCap, color: "text-indigo-400" },
    { label: "Certifications", count: 8, icon: Award, color: "text-cyan-400" },
    { label: "Playbooks", count: 2, icon: BookOpen, color: "text-emerald-400" },
    { label: "Messages", count: data?.stats?.totalLeads || 5, icon: Mail, color: "text-yellow-400" },
    { label: "Achievements", count: 6, icon: Award, color: "text-green-400" },
  ]

  return (
    <div className="min-h-screen bg-[#070A0F] text-slate-100 flex font-sans">
      {/* ── LEFT SIDEBAR ─────────────────────────────────────────────── */}
      <aside
        className={`${
          sidebarCollapsed ? "w-16" : "w-64"
        } transition-all duration-300 bg-[#0B0F17] border-r border-slate-800/80 flex flex-col flex-shrink-0 z-30 select-none`}
      >
        {/* Brand / Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800/80">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center text-white font-bold text-sm shadow-md flex-shrink-0">
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

        {/* Navigation Categories */}
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
                onClick={() => setActiveNav("dashboard")}
                className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left transition-colors ${
                  activeNav === "dashboard"
                    ? "bg-amber-500/15 text-amber-400 font-semibold border-l-2 border-amber-500"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                }`}
              >
                <Activity className="h-4 w-4 flex-shrink-0" />
                {!sidebarCollapsed && <span>Dashboard</span>}
              </button>
              <button
                onClick={() => setActiveNav("ai-assistant")}
                className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left transition-colors ${
                  activeNav === "ai-assistant"
                    ? "bg-amber-500/15 text-amber-400 font-semibold border-l-2 border-amber-500"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                }`}
              >
                <Brain className="h-4 w-4 flex-shrink-0" />
                {!sidebarCollapsed && <span>AI Assistant</span>}
              </button>
              <button
                onClick={() => setActiveNav("github-master")}
                className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left transition-colors ${
                  activeNav === "github-master"
                    ? "bg-amber-500/15 text-amber-400 font-semibold border-l-2 border-amber-500"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                }`}
              >
                <FolderGit2 className="h-4 w-4 flex-shrink-0" />
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
                onClick={() => setActiveNav("analytics")}
                className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left transition-colors ${
                  activeNav === "analytics"
                    ? "bg-amber-500/15 text-amber-400 font-semibold border-l-2 border-amber-500"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                }`}
              >
                <BarChart3 className="h-4 w-4 flex-shrink-0" />
                {!sidebarCollapsed && <span>Analytics</span>}
              </button>
              <button
                onClick={() => setActiveNav("admin-logs")}
                className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left transition-colors ${
                  activeNav === "admin-logs"
                    ? "bg-amber-500/15 text-amber-400 font-semibold border-l-2 border-amber-500"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                }`}
              >
                <Lock className="h-4 w-4 flex-shrink-0" />
                {!sidebarCollapsed && <span>Admin Logs</span>}
              </button>
              <button
                onClick={() => setActiveNav("profile-settings")}
                className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left transition-colors ${
                  activeNav === "profile-settings"
                    ? "bg-amber-500/15 text-amber-400 font-semibold border-l-2 border-amber-500"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                }`}
              >
                <Settings className="h-4 w-4 flex-shrink-0" />
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
                onClick={() => setActiveNav("projects")}
                className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left transition-colors ${
                  activeNav === "projects"
                    ? "bg-amber-500/15 text-amber-400 font-semibold border-l-2 border-amber-500"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                }`}
              >
                <FolderGit2 className="h-4 w-4 flex-shrink-0" />
                {!sidebarCollapsed && <span>Projects</span>}
              </button>
              <button
                onClick={() => setActiveNav("experience")}
                className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left transition-colors ${
                  activeNav === "experience"
                    ? "bg-amber-500/15 text-amber-400 font-semibold border-l-2 border-amber-500"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                }`}
              >
                <Briefcase className="h-4 w-4 flex-shrink-0" />
                {!sidebarCollapsed && <span>Experience</span>}
              </button>
              <button
                onClick={() => setActiveNav("education")}
                className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left transition-colors ${
                  activeNav === "education"
                    ? "bg-amber-500/15 text-amber-400 font-semibold border-l-2 border-amber-500"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                }`}
              >
                <GraduationCap className="h-4 w-4 flex-shrink-0" />
                {!sidebarCollapsed && <span>Education</span>}
              </button>
              <button
                onClick={() => setActiveNav("certifications")}
                className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left transition-colors ${
                  activeNav === "certifications"
                    ? "bg-amber-500/15 text-amber-400 font-semibold border-l-2 border-amber-500"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                }`}
              >
                <Award className="h-4 w-4 flex-shrink-0" />
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
                onClick={() => setActiveNav("messages")}
                className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left transition-colors ${
                  activeNav === "messages"
                    ? "bg-amber-500/15 text-amber-400 font-semibold border-l-2 border-amber-500"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                }`}
              >
                <Mail className="h-4 w-4 flex-shrink-0" />
                {!sidebarCollapsed && <span>Messages</span>}
              </button>
              <button
                onClick={() => setActiveNav("papers")}
                className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left transition-colors ${
                  activeNav === "papers"
                    ? "bg-amber-500/15 text-amber-400 font-semibold border-l-2 border-amber-500"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                }`}
              >
                <BookOpen className="h-4 w-4 flex-shrink-0" />
                {!sidebarCollapsed && <span>Papers & E-Papers</span>}
              </button>
              <button
                onClick={() => setActiveNav("achievements")}
                className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left transition-colors ${
                  activeNav === "achievements"
                    ? "bg-amber-500/15 text-amber-400 font-semibold border-l-2 border-amber-500"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                }`}
              >
                <Award className="h-4 w-4 flex-shrink-0" />
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
                onClick={() => setActiveNav("orders")}
                className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left transition-colors ${
                  activeNav === "orders"
                    ? "bg-amber-500/15 text-amber-400 font-semibold border-l-2 border-amber-500"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                }`}
              >
                <ShoppingCart className="h-4 w-4 flex-shrink-0" />
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
              <ArrowLeft className="h-4 w-4 mr-2" />
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
            <span className="text-xs text-amber-400 font-medium capitalize">{activeNav}</span>
          </div>

          <div className="flex items-center gap-4">
            {/* Notification Bell */}
            <div className="relative">
              <button className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60">
                <Bell className="h-4 w-4" />
              </button>
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-amber-500 ring-2 ring-[#0B0F17]" />
            </div>

            {/* Profile Avatar Pill */}
            <div className="flex items-center gap-3 pl-3 border-l border-slate-800">
              <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-white text-xs font-bold">
                AR
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-bold text-white leading-tight">Hafiz Abdul Rehman</p>
                <p className="text-[10px] text-slate-400 leading-tight">AI/ML Engineer & Data Scientist</p>
              </div>
            </div>

            {/* Open Analytics Button */}
            <Button
              onClick={() => setActiveNav("analytics")}
              size="sm"
              variant="outline"
              className="border-slate-700 bg-slate-900/60 hover:bg-slate-800 text-slate-300 text-xs hidden md:flex"
            >
              Open Analytics
              <ExternalLink className="ml-1.5 h-3 w-3" />
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
              <h1 className="text-xl sm:text-2xl font-extrabold text-white">Dashboard Overview</h1>
              <p className="text-xs text-slate-400 mt-0.5">Manage your portfolio content from here.</p>
            </div>

            <div className="flex items-center gap-2">
              <Button
                onClick={handleManualSync}
                disabled={isSyncing}
                size="sm"
                className="bg-amber-600 hover:bg-amber-500 text-white font-medium text-xs shadow-md"
              >
                <RefreshCw className={`mr-1.5 h-3.5 w-3.5 ${isSyncing ? "animate-spin" : ""}`} />
                {isSyncing ? "Syncing..." : "Sync GitHub Repos"}
              </Button>
            </div>
          </div>

          {statusMessage && (
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300 font-medium flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              <span>{statusMessage}</span>
            </div>
          )}

          {/* ── ROW 1: 4 LARGE KPI CARDS ─────────────────────────────────── */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Total Views */}
            <div className="p-4 rounded-xl bg-[#0D121D] border border-slate-800/80 flex items-center justify-between">
              <div>
                <p className="text-2xl font-black text-white">{totalViews}</p>
                <p className="text-xs text-slate-400 mt-0.5 font-medium">Total Views</p>
              </div>
              <div className="h-8 w-16">
                <svg className="w-full h-full" viewBox="0 0 60 30" fill="none">
                  <path d="M2 24 Q 15 5, 30 18 T 58 8" stroke="#38bdf8" strokeWidth="2.5" fill="none" />
                </svg>
              </div>
            </div>

            {/* Subscribers */}
            <div className="p-4 rounded-xl bg-[#0D121D] border border-slate-800/80 flex items-center justify-between">
              <div>
                <p className="text-2xl font-black text-white">{subscribers}</p>
                <p className="text-xs text-slate-400 mt-0.5 font-medium">Subscribers</p>
              </div>
              <div className="h-8 w-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                <Users className="h-4 w-4" />
              </div>
            </div>

            {/* Comments */}
            <div className="p-4 rounded-xl bg-[#0D121D] border border-slate-800/80 flex items-center justify-between">
              <div>
                <p className="text-2xl font-black text-white">{comments}</p>
                <p className="text-xs text-slate-400 mt-0.5 font-medium">Comments</p>
              </div>
              <div className="h-8 w-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400">
                <MessageSquare className="h-4 w-4" />
              </div>
            </div>

            {/* Reactions */}
            <div className="p-4 rounded-xl bg-[#0D121D] border border-slate-800/80 flex items-center justify-between">
              <div>
                <p className="text-2xl font-black text-white">{reactions}</p>
                <p className="text-xs text-slate-400 mt-0.5 font-medium">Reactions</p>
              </div>
              <div className="h-8 w-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400">
                <Star className="h-4 w-4" />
              </div>
            </div>
          </div>

          {/* ── ROW 2: 10 SUB-METRIC CARDS ──────────────────────────────── */}
          <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2.5">
            {row2Kpis.map((kpi, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-[#0D121D] border border-slate-800/70 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center justify-between mb-1">
                  <kpi.icon className={`h-3.5 w-3.5 ${kpi.color}`} />
                  <span className="text-xs font-mono text-slate-400 font-bold">{kpi.count}</span>
                </div>
                <p className="text-[11px] text-slate-300 font-medium truncate">{kpi.label}</p>
              </div>
            ))}
          </div>

          {/* ── 6 SVG CHARTS SECTION (2 COLUMNS x 3 ROWS) ───────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Chart 1: Content Activity (14-days) */}
            <div className="p-5 rounded-2xl bg-[#0D121D] border border-slate-800/80">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-bold text-white">Content Activity (14-days)</h3>
                  <p className="text-[11px] text-slate-400">Activity volume and audience interactions</p>
                </div>
                <div className="flex items-center gap-3 text-[10px] font-medium">
                  <span className="flex items-center gap-1 text-sky-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-sky-400" /> Views
                  </span>
                  <span className="flex items-center gap-1 text-purple-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-purple-400" /> Interactions
                  </span>
                  <span className="flex items-center gap-1 text-amber-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400" /> Comments
                  </span>
                </div>
              </div>

              {/* SVG Area Chart */}
              <div className="h-44 w-full">
                <svg className="w-full h-full" viewBox="0 0 500 160" preserveAspectRatio="none">
                  {/* Grid Lines */}
                  <line x1="0" y1="40" x2="500" y2="40" stroke="#1E293B" strokeDasharray="3 3" />
                  <line x1="0" y1="80" x2="500" y2="80" stroke="#1E293B" strokeDasharray="3 3" />
                  <line x1="0" y1="120" x2="500" y2="120" stroke="#1E293B" strokeDasharray="3 3" />

                  {/* Views Wave (Sky Blue) */}
                  <path
                    d="M 0 130 Q 80 110, 160 70 T 320 90 T 500 40 L 500 160 L 0 160 Z"
                    fill="rgba(56, 189, 248, 0.08)"
                  />
                  <path
                    d="M 0 130 Q 80 110, 160 70 T 320 90 T 500 40"
                    stroke="#38bdf8"
                    strokeWidth="2"
                    fill="none"
                  />

                  {/* Interactions Wave (Purple) */}
                  <path
                    d="M 0 145 Q 100 130, 200 110 T 360 80 T 500 65"
                    stroke="#a855f7"
                    strokeWidth="2"
                    fill="none"
                  />

                  {/* Comments Wave (Amber) */}
                  <path
                    d="M 0 155 Q 120 150, 240 140 T 380 130 T 500 120"
                    stroke="#f59e0b"
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
            <div className="p-5 rounded-2xl bg-[#0D121D] border border-slate-800/80">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-bold text-white">Subscriber Growth</h3>
                  <p className="text-[11px] text-slate-400">Total active newsletter & research subscribers</p>
                </div>
                <span className="text-xs font-mono text-emerald-400 font-bold">+100% this month</span>
              </div>

              {/* Green Linear Line */}
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

            {/* Chart 3: Content Distribution (Orange Bar Chart matching screenshot) */}
            <div className="p-5 rounded-2xl bg-[#0D121D] border border-slate-800/80">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-bold text-white">Content Distribution</h3>
                  <p className="text-[11px] text-slate-400">Count by portfolio collection</p>
                </div>
                <Badge variant="outline" className="text-[10px] border-amber-500/40 text-amber-400">
                  Published Items
                </Badge>
              </div>

              {/* SVG Deep Orange Bars */}
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
                      className="w-full rounded-t-sm bg-gradient-to-t from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 transition-all"
                      style={{ height: `${(b.val / b.max) * 100}%` }}
                    />
                    <span className="text-[9px] text-slate-500 truncate mt-1 w-full text-center">
                      {b.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Chart 4: Content Breakdown (Donut / Pie Chart) */}
            <div className="p-5 rounded-2xl bg-[#0D121D] border border-slate-800/80">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="text-sm font-bold text-white">Content Breakdown</h3>
                  <p className="text-[11px] text-slate-400">Categorical composition</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 h-44">
                {/* Donut SVG */}
                <div className="relative h-32 w-32 flex-shrink-0">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="15.915" fill="none" stroke="#1E293B" strokeWidth="4" />
                    {/* Services (teal) */}
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
                    {/* Projects (purple) */}
                    <circle
                      cx="18"
                      cy="18"
                      r="15.915"
                      fill="none"
                      stroke="#a855f7"
                      strokeWidth="4"
                      strokeDasharray="40 60"
                      strokeDashoffset="-25"
                    />
                    {/* Achievements (amber) */}
                    <circle
                      cx="18"
                      cy="18"
                      r="15.915"
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth="4"
                      strokeDasharray="15 85"
                      strokeDashoffset="-65"
                    />
                    {/* Messages (sky) */}
                    <circle
                      cx="18"
                      cy="18"
                      r="15.915"
                      fill="none"
                      stroke="#38bdf8"
                      strokeWidth="4"
                      strokeDasharray="20 80"
                      strokeDashoffset="-80"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-xs font-bold text-white">100%</span>
                  </div>
                </div>

                {/* Legend */}
                <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-teal-400" /> Services: 12
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-purple-400" /> Projects: 57
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-amber-400" /> Achievements: 6
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-sky-400" /> Messages: 5
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" /> Experience: 4
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-rose-400" /> Papers: 4
                  </span>
                </div>
              </div>
            </div>

            {/* Chart 5: Skill Proficiency by Category (Radar Chart) */}
            <div className="p-5 rounded-2xl bg-[#0D121D] border border-slate-800/80">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="text-sm font-bold text-white">Skill Proficiency by Category</h3>
                  <p className="text-[11px] text-slate-400">Radial domain competency breakdown</p>
                </div>
              </div>

              {/* Spider / Radar SVG */}
              <div className="h-44 w-full flex items-center justify-center">
                <svg className="w-48 h-48" viewBox="0 0 200 200">
                  {/* Concentric Polygons */}
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

                  {/* Axes Lines */}
                  <line x1="100" y1="100" x2="100" y2="20" stroke="#334155" strokeWidth="1" />
                  <line x1="100" y1="100" x2="170" y2="60" stroke="#334155" strokeWidth="1" />
                  <line x1="100" y1="100" x2="170" y2="140" stroke="#334155" strokeWidth="1" />
                  <line x1="100" y1="100" x2="100" y2="180" stroke="#334155" strokeWidth="1" />
                  <line x1="100" y1="100" x2="30" y2="140" stroke="#334155" strokeWidth="1" />
                  <line x1="100" y1="100" x2="30" y2="60" stroke="#334155" strokeWidth="1" />

                  {/* Data Shape */}
                  <polygon
                    points="100,30 160,68 155,130 100,165 45,130 40,70"
                    fill="rgba(245, 158, 11, 0.25)"
                    stroke="#f59e0b"
                    strokeWidth="1.8"
                  />

                  {/* Labels */}
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

            {/* Chart 6: Engagement Summary (Horizontal Bars matching screenshot) */}
            <div className="p-5 rounded-2xl bg-[#0D121D] border border-slate-800/80">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-bold text-white">Engagement Summary</h3>
                  <p className="text-[11px] text-slate-400">Audience touchpoints overview</p>
                </div>
              </div>

              {/* Horizontal Bars */}
              <div className="space-y-3.5 h-44 flex flex-col justify-center">
                {/* Views */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300 font-medium">Views</span>
                    <span className="text-sky-400 font-bold font-mono">23</span>
                  </div>
                  <div className="h-3 w-full bg-slate-800/60 rounded-full overflow-hidden">
                    <div className="h-full bg-sky-500 rounded-full" style={{ width: "95%" }} />
                  </div>
                </div>

                {/* Comments */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300 font-medium">Comments</span>
                    <span className="text-emerald-400 font-bold font-mono">2</span>
                  </div>
                  <div className="h-3 w-full bg-slate-800/60 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: "20%" }} />
                  </div>
                </div>

                {/* Reactions */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300 font-medium">Reactions</span>
                    <span className="text-purple-400 font-bold font-mono">3</span>
                  </div>
                  <div className="h-3 w-full bg-slate-800/60 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 rounded-full" style={{ width: "30%" }} />
                  </div>
                </div>

                {/* Subscribers */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300 font-medium">Subscribers</span>
                    <span className="text-amber-400 font-bold font-mono">1</span>
                  </div>
                  <div className="h-3 w-full bg-slate-800/60 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: "12%" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── BOTTOM ACTION CARDS (matching screenshot) ──────────────── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {/* Left Card: Want deeper insights? */}
            <div className="p-5 rounded-2xl bg-[#0D121D] border border-slate-800/80 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <BarChart3 className="h-4 w-4 text-amber-400" />
                  <h4 className="text-sm font-bold text-white">Want deeper insights?</h4>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  Explore traffic sources, key paths, content health and repeatable metrics.
                </p>
              </div>
              <div>
                <Button
                  onClick={() => setActiveNav("analytics")}
                  size="sm"
                  className="bg-amber-600 hover:bg-amber-500 text-white font-medium text-xs"
                >
                  Open Analytics →
                </Button>
              </div>
            </div>

            {/* Right Card: Admin Login & Audit Logs */}
            <div className="p-5 rounded-2xl bg-[#0D121D] border border-slate-800/80 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <Lock className="h-4 w-4 text-emerald-400" />
                  <h4 className="text-sm font-bold text-white">Admin Login & Audit Logs</h4>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  Monitor all active logins, exact access timestamps, and complete PII defense tracking.
                </p>
              </div>
              <div>
                <Button
                  onClick={() => setActiveNav("admin-logs")}
                  size="sm"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs"
                >
                  View Admin Logs →
                </Button>
              </div>
            </div>
          </div>

          {/* ── DETAIL PANELS (WHEN NAVIGATING SIDEBAR) ─────────────────── */}
          {/* Projects View */}
          {activeNav === "projects" && (
            <div className="space-y-4 pt-6 border-t border-slate-800/80">
              <div className="flex items-center justify-between gap-4">
                <div className="relative max-w-sm flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search repository..."
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-slate-900 border border-slate-800 text-slate-100 placeholder:text-muted-foreground focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <span className="text-xs text-slate-400">
                  Showing {filteredProjects.length} repositories
                </span>
              </div>

              <div className="rounded-2xl border border-slate-800 overflow-hidden bg-[#0D121D]">
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
                            <Badge variant="outline" className="text-[10px] border-amber-500/30 text-amber-400">
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
                              <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/40 text-[10px]">
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
                              className="inline-flex items-center text-xs text-amber-400 hover:underline"
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

          {/* Messages View */}
          {activeNav === "messages" && (
            <div className="space-y-4 pt-6 border-t border-slate-800/80">
              <h3 className="text-base font-bold text-white">Direct Client Inquiries & Messages</h3>
              {(!data?.contactLeads || data.contactLeads.length === 0) ? (
                <div className="p-10 text-center rounded-2xl bg-[#0D121D] border border-slate-800 text-muted-foreground">
                  <Inbox className="h-7 w-7 mx-auto mb-2 text-slate-500" />
                  <p className="text-xs">No client inquiries submitted yet. Submissions from Contact Form appear here.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {data.contactLeads.map((lead: any) => (
                    <div key={lead.id} className="p-4 rounded-xl bg-[#0D121D] border border-slate-800 space-y-2">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <strong className="text-sm text-white">{lead.name} ({lead.email})</strong>
                        <Badge className="text-xs bg-amber-500/10 text-amber-400 border-amber-500/30">
                          {lead.projectType}
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                        "{lead.description}"
                      </p>
                      <div className="flex justify-between items-center text-[11px] text-muted-foreground">
                        <span>Timeline: <strong>{lead.timeline}</strong></span>
                        <span>{new Date(lead.createdAt).toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* AI Assistant Transcripts View */}
          {activeNav === "ai-assistant" && (
            <div className="space-y-4 pt-6 border-t border-slate-800/80">
              <h3 className="text-base font-bold text-white">AbdulInsight AI Conversation Transcripts</h3>
              {(!data?.chatSessions || data.chatSessions.length === 0) ? (
                <div className="p-10 text-center rounded-2xl bg-[#0D121D] border border-slate-800 text-muted-foreground">
                  <Brain className="h-7 w-7 mx-auto mb-2 text-slate-500" />
                  <p className="text-xs">No chat sessions recorded yet. Visitor interactions with AbdulInsight AI appear here.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {data.chatSessions.map((session: any) => (
                    <div key={session.sessionId} className="p-4 rounded-xl bg-[#0D121D] border border-slate-800 space-y-2.5">
                      <div className="flex items-center justify-between text-xs pb-1.5 border-b border-slate-800">
                        <span className="font-mono text-amber-400">{session.sessionId}</span>
                        <span className="text-muted-foreground">{new Date(session.startedAt).toLocaleString()}</span>
                      </div>
                      <div className="space-y-2 text-xs">
                        {session.messages?.map((msg: any) => (
                          <div
                            key={msg.id}
                            className={`p-2 rounded-lg ${
                              msg.role === "user"
                                ? "bg-slate-800/80 text-amber-300"
                                : "bg-slate-950 text-slate-300 border border-slate-800"
                            }`}
                          >
                            <span className="text-[10px] uppercase font-bold text-slate-500 block mb-0.5">
                              {msg.role === "user" ? "Visitor" : "AbdulInsight AI"}
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

          {/* GitHub Master View */}
          {activeNav === "github-master" && (
            <div className="p-5 rounded-2xl bg-[#0D121D] border border-slate-800 space-y-4 pt-6 border-t border-slate-800/80">
              <h3 className="text-base font-bold text-white">GitHub Dynamic Sync Settings</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Whenever a new repository is created or commits are pushed to <strong>@Abdul-Insighht</strong>, this portfolio synchronizes automatically.
              </p>
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs text-slate-300">
                <div className="flex justify-between py-1 border-b border-slate-800/80">
                  <span className="text-muted-foreground">Target Account:</span>
                  <span className="font-mono text-amber-400">Abdul-Insighht</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/80">
                  <span className="text-muted-foreground">Webhook Endpoint:</span>
                  <span className="font-mono text-sky-400">/api/webhooks/github</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-muted-foreground">Last Sync Time:</span>
                  <span className="text-emerald-400 font-semibold">{new Date(data?.stats.lastSyncedAt || Date.now()).toLocaleString()}</span>
                </div>
              </div>
              <Button
                onClick={handleManualSync}
                disabled={isSyncing}
                size="sm"
                className="bg-amber-600 hover:bg-amber-500 text-white font-medium text-xs"
              >
                <RefreshCw className={`mr-1.5 h-3.5 w-3.5 ${isSyncing ? "animate-spin" : ""}`} />
                {isSyncing ? "Syncing Repos..." : "Run Manual Sync Now"}
              </Button>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
