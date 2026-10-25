"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Shield, Lock, Mail, ArrowLeft, Sparkles, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("hafizrehman3321@gmail.com")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (data.success) {
        router.push("/admin")
      } else {
        setError(data.error || "Invalid credentials.")
      }
    } catch (err) {
      setError("Network error logging in.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[400px] bg-primary/10 rounded-full filter blur-[120px]" />
      </div>

      <div className="w-full max-w-md">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center text-xs text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />
            Back to Public Portfolio
          </Link>
        </div>

        {/* Login Card */}
        <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 shadow-2xl relative">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-xl bg-primary/15 border border-primary/30 text-primary">
              <Shield className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Engineering Control Center</h1>
              <p className="text-xs text-muted-foreground">Admin Authentication Portal</p>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-xs text-red-400">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-9 bg-slate-950 border-slate-800 focus:border-primary text-slate-100 text-sm"
                  placeholder="hafizrehman3321@gmail.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Admin Security Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-9 bg-slate-950 border-slate-800 focus:border-primary text-slate-100 text-sm"
                  placeholder="Enter password..."
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2.5 mt-2"
            >
              {isLoading ? "Authenticating..." : "Sign In to Admin Dashboard"}
            </Button>
          </form>

          {/* Helper credentials note */}
          <div className="mt-6 pt-4 border-t border-slate-800/80 text-[11px] text-muted-foreground space-y-1">
            <p className="font-semibold text-slate-300">Default Access Credentials:</p>
            <p>Email: <span className="text-primary font-mono">hafizrehman3321@gmail.com</span></p>
            <p>Password: <span className="text-primary font-mono">AbdulInsight2026!</span> (or <span className="font-mono">admin123</span>)</p>
          </div>
        </div>
      </div>
    </div>
  )
}
