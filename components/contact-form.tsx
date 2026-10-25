"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Send, CheckCircle2, Copy, Check, MessageSquare, Linkedin, Github, FileText, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"

export default function ContactForm() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "",
    timeline: "",
    description: "",
    source: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const [statusMessage, setStatusMessage] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("hafizrehman3321@gmail.com")
    setIsCopied(true)
    toast({
      title: "Email Copied!",
      description: "hafizrehman3321@gmail.com copied to your clipboard.",
    })
    setTimeout(() => setIsCopied(false), 2500)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatusMessage("")

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (data.success) {
        setStatusMessage("✓ Message received! Hafiz Abdul Rehman will reply within one business day.")
        setFormData({
          name: "",
          email: "",
          projectType: "",
          timeline: "",
          description: "",
          source: "",
        })
        toast({
          title: "Inquiry Sent Successfully",
          description: "Thank you for reaching out. I will reply within 1 business day.",
        })
      } else {
        setStatusMessage(data.error || "Failed to submit. Please email directly.")
      }
    } catch (err) {
      setStatusMessage("Network error. Please email directly at hafizrehman3321@gmail.com")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-slate-950/60 border-t border-slate-800/80">
      <div className="container mx-auto px-4">
        {/* Section Index & Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-3xl mb-14"
        >
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">
            06 / Contact
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">
            Have a useful problem to solve?
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            Share the context, constraints, and what a useful outcome would look like. I’ll reply within <span className="text-teal-400 font-semibold underline decoration-primary/50">one business day</span>.
          </p>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Most projects begin with a focused 30-minute conversation about the problem, constraints, and fit.
          </p>
        </motion.div>

        {/* Contact Grid: Form on Left, Direct Contact on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form Column (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Your Name *
                  </label>
                  <Input
                    name="name"
                    required
                    placeholder="e.g. Alex Johnson"
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-slate-950 border-slate-700/80 text-slate-100 placeholder:text-muted-foreground focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Email Address *
                  </label>
                  <Input
                    name="email"
                    type="email"
                    required
                    placeholder="alex@company.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-slate-950 border-slate-700/80 text-slate-100 placeholder:text-muted-foreground focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Project Domain / Scope
                  </label>
                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className="w-full h-10 px-3 rounded-md bg-slate-950 border border-slate-700/80 text-slate-100 text-sm focus:border-primary focus:outline-none"
                  >
                    <option value="">Select scope</option>
                    <option value="Computer Vision System">Computer Vision (YOLO / Tracking / Video)</option>
                    <option value="Agentic AI & RAG Pipeline">Agentic AI & RAG Pipeline</option>
                    <option value="Medical Deep Learning">Medical Deep Learning / Segmentation</option>
                    <option value="Data Science & Forecasting">Data Science, Analytics & Forecasting</option>
                    <option value="Full-Stack AI Product">Full-Stack AI Application</option>
                    <option value="Technical Consultation">Technical Consultation</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Target Timeline
                  </label>
                  <select
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleChange}
                    className="w-full h-10 px-3 rounded-md bg-slate-950 border border-slate-700/80 text-slate-100 text-sm focus:border-primary focus:outline-none"
                  >
                    <option value="Exploring / not urgent">Exploring / not urgent</option>
                    <option value="ASAP (within 2 weeks)">ASAP (within 2 weeks)</option>
                    <option value="Within 1 month">Within 1 month</option>
                    <option value="1–3 months">1–3 months</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Tell me about the problem & context *
                </label>
                <Textarea
                  name="description"
                  required
                  rows={4}
                  placeholder="Describe the data format, current bottlenecks, desired model metrics, and what a successful delivery looks like..."
                  value={formData.description}
                  onChange={handleChange}
                  className="bg-slate-950 border-slate-700/80 text-slate-100 placeholder:text-muted-foreground focus:border-primary leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  How did you find my portfolio?
                </label>
                <select
                  name="source"
                  value={formData.source}
                  onChange={handleChange}
                  className="w-full h-10 px-3 rounded-md bg-slate-950 border border-slate-700/80 text-slate-100 text-sm focus:border-primary focus:outline-none"
                >
                  <option value="LinkedIn">LinkedIn</option>
                  <option value="GitHub">GitHub</option>
                  <option value="Kaggle">Kaggle</option>
                  <option value="Google Search">Google Search</option>
                  <option value="Referral">Personal Referral</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8"
                >
                  {isSubmitting ? (
                    "Sending Inquiry..."
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>

                {statusMessage && (
                  <p className="text-xs text-teal-400 font-medium">
                    {statusMessage}
                  </p>
                )}
              </div>
            </form>
          </motion.div>

          {/* Direct Contact Column (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-4"
          >
            {/* Direct Contact Card */}
            <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 shadow-xl space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider font-semibold text-primary">
                  Direct Contact
                </span>
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>

              <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-between gap-3">
                <div className="truncate">
                  <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-semibold">
                    Primary Email
                  </p>
                  <p className="text-sm font-mono text-slate-100 truncate">
                    hafizrehman3321@gmail.com
                  </p>
                </div>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={handleCopyEmail}
                  className="flex-shrink-0 border-primary/40 hover:bg-primary/10 text-primary text-xs"
                >
                  {isCopied ? (
                    <>
                      <Check className="mr-1 h-3.5 w-3.5 text-emerald-400" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="mr-1 h-3.5 w-3.5" />
                      Copy Email
                    </>
                  )}
                </Button>
              </div>

              {/* Direct Communication Channels */}
              <div className="space-y-3">
                <a
                  href="mailto:hafizrehman3321@gmail.com"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900 hover:bg-slate-800/80 border border-slate-800 hover:border-primary/40 transition-all text-sm text-slate-200 group"
                >
                  <span className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-primary" />
                    <span>Send Direct Email</span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </a>

                <a
                  href="https://wa.me/923283121702"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900 hover:bg-slate-800/80 border border-slate-800 hover:border-primary/40 transition-all text-sm text-slate-200 group"
                >
                  <span className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-emerald-400" />
                    <span>WhatsApp • +92 328 3121702</span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-emerald-400 transition-colors" />
                </a>

                <a
                  href="https://linkedin.com/in/hafiz-abdul-rehman-9990ab329"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900 hover:bg-slate-800/80 border border-slate-800 hover:border-primary/40 transition-all text-sm text-slate-200 group"
                >
                  <span className="flex items-center gap-3">
                    <Linkedin className="h-4 w-4 text-blue-400" />
                    <span>LinkedIn Profile</span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-blue-400 transition-colors" />
                </a>

                <a
                  href="https://github.com/Abdul-Insighht"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900 hover:bg-slate-800/80 border border-slate-800 hover:border-primary/40 transition-all text-sm text-slate-200 group"
                >
                  <span className="flex items-center gap-3">
                    <Github className="h-4 w-4 text-slate-300" />
                    <span>GitHub Repositories (@Abdul-Insighht)</span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-white transition-colors" />
                </a>

                <a
                  href="/resume"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-gradient-to-r from-primary/10 to-cyan-500/10 hover:from-primary/20 hover:to-cyan-500/20 border border-primary/40 transition-all text-sm text-slate-100 group"
                >
                  <span className="flex items-center gap-3">
                    <FileText className="h-4 w-4 text-primary" />
                    <span className="font-semibold">Printable CV / PDF View</span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
