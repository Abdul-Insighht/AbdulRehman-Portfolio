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
  const [activeTab, setActiveTab] = useState<"projects" | "leads" | "chatlogs" | "sync">("projects")
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

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Header Bar */}
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-primary/20 border border-primary/40 text-primary">
              <Shield className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-white">
                  Engineering Control Center
                </h1>
                <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/40 text-[10px]">
                  Live Admin
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Hafiz Abdul Rehman Portfolio CMS & Operations
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              onClick={handleManualSync}
              disabled={isSyncing}
              size="sm"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
            >
              <RefreshCw className={`mr-2 h-4 w-4 ${isSyncing ? "animate-spin" : ""}`} />
              {isSyncing ? "Syncing Repos..." : "Sync from GitHub"}
            </Button>

            <Button asChild variant="outline" size="sm" className="border-slate-700 hover:bg-slate-800 text-slate-300">
              <Link href="/">
                <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />
                Public Site
              </Link>
            </Button>

            <Button
              onClick={handleLogout}
              variant="ghost"
              size="sm"
              className="text-slate-400 hover:text-red-400"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </header>

        {statusMessage && (
          <div className="p-3.5 rounded-xl bg-primary/10 border border-primary/30 text-xs text-primary font-medium flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            <span>{statusMessage}</span>
          </div>
        )}

        {/* Metric Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800">
            <div className="flex items-center justify-between text-muted-foreground mb-2">
              <span className="text-xs font-semibold uppercase">Indexed Repos</span>
              <FolderGit2 className="h-4 w-4 text-primary" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-white">
              {data?.stats.totalProjects || 57}
            </div>
            <p className="text-[11px] text-muted-foreground mt-1">
              {data?.stats.featuredProjects || 14} flagged as featured
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800">
            <div className="flex items-center justify-between text-muted-foreground mb-2">
              <span className="text-xs font-semibold uppercase">Contact Leads</span>
              <Inbox className="h-4 w-4 text-emerald-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-emerald-400">
              {data?.stats.totalLeads || 0}
            </div>
            <p className="text-[11px] text-muted-foreground mt-1">Inquiries via 06 / Contact</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800">
            <div className="flex items-center justify-between text-muted-foreground mb-2">
              <span className="text-xs font-semibold uppercase">AI Bot Chats</span>
              <Brain className="h-4 w-4 text-purple-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-purple-400">
              {data?.stats.totalChatSessions || 0}
            </div>
            <p className="text-[11px] text-muted-foreground mt-1">
              {data?.stats.totalChatMessages || 0} total messages logged
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800">
            <div className="flex items-center justify-between text-muted-foreground mb-2">
              <span className="text-xs font-semibold uppercase">Hiring Intent</span>
              <Users className="h-4 w-4 text-cyan-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-cyan-400">
              {data?.stats.leadsWithContactIntent || 0}
            </div>
            <p className="text-[11px] text-muted-foreground mt-1">Visitors with hiring intent</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-3">
          <button
            onClick={() => setActiveTab("projects")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === "projects"
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-slate-900 text-slate-300 hover:bg-slate-800"
            }`}
          >
            Projects Manager ({data?.projects.length || 57})
          </button>
          <button
            onClick={() => setActiveTab("leads")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === "leads"
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-slate-900 text-slate-300 hover:bg-slate-800"
            }`}
          >
            Contact Leads ({data?.contactLeads.length || 0})
          </button>
          <button
            onClick={() => setActiveTab("chatlogs")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === "chatlogs"
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-slate-900 text-slate-300 hover:bg-slate-800"
            }`}
          >
            AbdulInsight AI Logs ({data?.chatSessions.length || 0})
          </button>
          <button
            onClick={() => setActiveTab("sync")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === "sync"
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-slate-900 text-slate-300 hover:bg-slate-800"
            }`}
          >
            GitHub Sync & Webhooks
          </button>
        </div>

        {/* ── Tab 1: Projects CMS ────────────────────────────────────────── */}
        {activeTab === "projects" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div className="relative max-w-sm flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search repository..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl bg-slate-900 border border-slate-800 text-slate-100 placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                />
              </div>
              <span className="text-xs text-muted-foreground">
                Showing {filteredProjects.length} repositories
              </span>
            </div>

            <div className="rounded-2xl border border-slate-800 overflow-hidden bg-slate-900/80">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
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
                          <Badge variant="outline" className="text-[10px] border-primary/30 text-primary">
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
                            className="inline-flex items-center text-xs text-primary hover:underline"
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

        {/* ── Tab 2: Contact Leads ───────────────────────────────────────── */}
        {activeTab === "leads" && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Direct Client & Project Inquiries</h3>
            {(!data?.contactLeads || data.contactLeads.length === 0) ? (
              <div className="p-12 text-center rounded-2xl bg-slate-900 border border-slate-800 text-muted-foreground">
                <Inbox className="h-8 w-8 mx-auto mb-2 text-slate-500" />
                <p>No contact inquiries submitted yet. Form submissions will appear here live.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {data.contactLeads.map((lead: any) => (
                  <div key={lead.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <strong className="text-base text-white">{lead.name}</strong>
                        <span className="text-xs text-muted-foreground">({lead.email})</span>
                      </div>
                      <Badge className="text-xs bg-primary/10 text-primary border-primary/30">
                        {lead.projectType}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed bg-slate-950 p-3 rounded-xl border border-slate-850">
                      "{lead.description}"
                    </p>
                    <div className="flex justify-between items-center text-xs text-muted-foreground pt-1">
                      <span>Timeline: <strong>{lead.timeline}</strong> • Via: {lead.source}</span>
                      <span>{new Date(lead.createdAt).toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Tab 3: AbdulInsight AI Logs ─────────────────────────────────── */}
        {activeTab === "chatlogs" && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">AbdulInsight AI Conversation Transcripts</h3>
            {(!data?.chatSessions || data.chatSessions.length === 0) ? (
              <div className="p-12 text-center rounded-2xl bg-slate-900 border border-slate-800 text-muted-foreground">
                <Brain className="h-8 w-8 mx-auto mb-2 text-slate-500" />
                <p>No chat sessions recorded yet. Visitor interactions with AbdulInsight AI will be logged here.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {data.chatSessions.map((session: any) => (
                  <div key={session.sessionId} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800">
                      <span className="font-mono text-primary">{session.sessionId}</span>
                      <div className="flex items-center gap-2">
                        {session.hasContactIntent && (
                          <Badge className="bg-emerald-500/20 text-emerald-400 text-[10px]">
                            Hiring Intent Detected
                          </Badge>
                        )}
                        <span className="text-muted-foreground">
                          {new Date(session.startedAt).toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2 text-xs">
                      {session.messages?.map((msg: any) => (
                        <div
                          key={msg.id}
                          className={`p-2.5 rounded-xl ${
                            msg.role === "user"
                              ? "bg-slate-800/80 text-cyan-300 font-medium"
                              : "bg-slate-950 text-slate-300 border border-slate-850"
                          }`}
                        >
                          <span className="text-[10px] uppercase font-bold text-muted-foreground block mb-0.5">
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

        {/* ── Tab 4: GitHub Dynamic Sync & Webhook Info ──────────────────── */}
        {activeTab === "sync" && (
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white mb-2">GitHub Dynamic Sync Settings</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                When you create a new repository or push commits on GitHub under <strong>@Abdul-Insighht</strong>, the portfolio updates automatically.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 text-xs sm:text-sm text-slate-300">
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-muted-foreground">Target GitHub Account:</span>
                <span className="font-mono text-primary">Abdul-Insighht</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-muted-foreground">Webhook Listener Endpoint:</span>
                <span className="font-mono text-cyan-400">/api/webhooks/github</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-muted-foreground">Manual Sync API:</span>
                <span className="font-mono text-slate-200">POST /api/projects/sync</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-muted-foreground">Last Synchronization:</span>
                <span className="text-emerald-400 font-semibold">{new Date(data?.stats.lastSyncedAt || Date.now()).toLocaleString()}</span>
              </div>
            </div>

            <div className="pt-2">
              <Button
                onClick={handleManualSync}
                disabled={isSyncing}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
              >
                <RefreshCw className={`mr-2 h-4 w-4 ${isSyncing ? "animate-spin" : ""}`} />
                {isSyncing ? "Syncing with GitHub..." : "Run Manual Sync Now"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
