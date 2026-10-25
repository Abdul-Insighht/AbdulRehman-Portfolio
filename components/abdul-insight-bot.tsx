"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Brain,
  MessageSquare,
  X,
  Send,
  Sparkles,
  Trash2,
  ExternalLink,
  ChevronDown,
  Bot,
  User,
  ShieldCheck,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: string
  action?: {
    type: string
    label?: string
    url?: string
    target?: string
  }
  followUps?: string[]
  sources?: string[]
  model?: string
}

export default function AbdulInsightBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [sessionId] = useState(() => `session_${Math.random().toString(36).substring(2, 9)}`)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "initial-greeting",
      role: "assistant",
      content:
        "Assalam o Alaikum! I am AbdulInsight AI, the personal assistant for Hafiz Abdul Rehman, an AI & Machine Learning Engineer.\n\nFeel free to ask me about his engineering work at AiBit Soft, research papers (such as the 99.64% BraTS Attention U-Net), real-time YOLO vision systems, or how to get in touch across his 57 repositories.",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      followUps: [
        "What accuracy was achieved in Brain Tumor segmentation?",
        "Tell me about his Computer Vision & YOLO projects.",
        "How can I hire or contact Hafiz Abdul Rehman?",
      ],
      sources: ["Portfolio Factsheet"],
    },
  ])

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom()
      inputRef.current?.focus()
    }
  }, [messages, isOpen, isMinimized])

  const handleSend = async (messageText?: string) => {
    const textToSend = messageText || inputMessage
    if (!textToSend.trim() || isLoading) return

    const userMessage: Message = {
      id: Math.random().toString(36).substring(2, 9),
      role: "user",
      content: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages((prev) => [...prev, userMessage])
    if (!messageText) setInputMessage("")
    setIsLoading(true)

    try {
      const conversationHistory = [...messages, userMessage].map((m) => ({
        role: m.role,
        content: m.content,
      }))

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: conversationHistory,
          sessionId,
        }),
      })

      const data = await response.json()

      if (data.success && data.data) {
        const assistantMessage: Message = {
          id: Math.random().toString(36).substring(2, 9),
          role: "assistant",
          content: data.data.message,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          action: data.data.action,
          followUps: data.data.followUps,
          sources: data.data.sources,
          model: data.data.model,
        }
        setMessages((prev) => [...prev, assistantMessage])
      } else {
        throw new Error(data.error || "Failed to get reply")
      }
    } catch (err: any) {
      const errorMessage: Message = {
        id: Math.random().toString(36).substring(2, 9),
        role: "assistant",
        content:
          "Hafiz Abdul Rehman is reachable directly via email at **hafizrehman3321@gmail.com** or WhatsApp at **+92 328 3121702**. How else can I assist you with his verified technical work?",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        action: {
          type: "open_contact",
          label: "📬 Send Direct Email ↗",
          url: "mailto:hafizrehman3321@gmail.com",
        },
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleClear = () => {
    setMessages([
      {
        id: "cleared-greeting",
        role: "assistant",
        content: "Chat cleared. What project or technical engineering skill would you like to explore?",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        followUps: [
          "Explain the BraTS 2020 Brain Tumor model",
          "What is his experience in Agentic AI?",
          "How to get in touch?",
        ],
      },
    ])
  }

  return (
    <>
      {/* ── 1. Floating Launch Trigger Button ────────────────────────────── */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
        {/* Subtle Greeting Pill on Hover or Initial State */}
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
            onClick={() => setIsOpen(true)}
            className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-full
                       bg-slate-900/90 border border-primary/40 text-slate-200 text-xs font-medium
                       shadow-xl shadow-black/40 backdrop-blur-md cursor-pointer
                       hover:border-primary transition-all duration-300 group"
          >
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Ask <strong className="text-teal-400">AbdulInsight AI</strong></span>
            <Sparkles className="h-3.5 w-3.5 text-primary group-hover:rotate-12 transition-transform" />
          </motion.div>
        )}

        {/* Floating Orb Button */}
        <motion.button
          onClick={() => {
            setIsOpen(!isOpen)
            setIsMinimized(false)
          }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Open AbdulInsight AI"
          className="relative h-14 w-14 rounded-full bg-gradient-to-tr from-primary via-teal-500 to-cyan-400
                     p-0.5 shadow-2xl shadow-primary/40 flex items-center justify-center
                     focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-slate-950"
        >
          {/* Pulsing Outer Ring */}
          <span className="absolute inset-0 rounded-full bg-primary/30 animate-ping pointer-events-none" />

          <div className="h-full w-full rounded-full bg-slate-950/90 flex items-center justify-center backdrop-blur-sm group hover:bg-slate-950/70 transition-colors">
            {isOpen ? (
              <X className="h-6 w-6 text-primary group-hover:rotate-90 transition-transform duration-300" />
            ) : (
              <Brain className="h-6 w-6 text-primary group-hover:scale-110 transition-transform duration-300" />
            )}
          </div>
        </motion.button>
      </div>

      {/* ── 2. Chat Modal Interface ───────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              height: isMinimized ? "64px" : "min(680px, 86vh)",
            }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ duration: 0.3 }}
            className={`fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-32px)] sm:w-[440px]
                       rounded-2xl border border-primary/40 bg-slate-950/95
                       shadow-2xl shadow-primary/20 backdrop-blur-xl flex flex-col overflow-hidden text-slate-100`}
          >
            {/* Header */}
            <div className="px-4 py-3 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-800 border-b border-slate-800 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative h-9 w-9 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center">
                  <Brain className="h-5 w-5 text-primary" />
                  <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 border-2 border-slate-950" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                    AbdulInsight AI
                    <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-primary/40 text-primary">
                      Verified
                    </Badge>
                  </h3>
                  <p className="text-[11px] text-muted-foreground flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    Online • 57 Verified Repositories
                  </p>
                </div>
              </div>

              {/* Window Controls */}
              <div className="flex items-center gap-1 text-slate-400">
                <button
                  onClick={handleClear}
                  title="Clear Conversation"
                  className="p-1.5 rounded-md hover:bg-slate-800 hover:text-white transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  title={isMinimized ? "Expand" : "Minimize"}
                  className="p-1.5 rounded-md hover:bg-slate-800 hover:text-white transition-colors"
                >
                  <ChevronDown className={`h-4 w-4 transition-transform ${isMinimized ? "rotate-180" : ""}`} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  title="Close"
                  className="p-1.5 rounded-md hover:bg-slate-800 hover:text-white transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Chat Body (Hidden when minimized) */}
            {!isMinimized && (
              <>
                {/* Messages Scroll Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs sm:text-sm">
                  {/* Security / Verification Badge */}
                  <div className="flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground bg-slate-900/60 py-1.5 px-3 rounded-full border border-slate-800/80 mx-auto w-fit">
                    <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                    <span>Personal AI Assistant • Grounded in verified engineering work</span>
                  </div>

                  {messages.map((m) => (
                    <div
                      key={m.id}
                      className={`flex flex-col ${m.role === "user" ? "items-end" : "items-start"}`}
                    >
                      <div
                        className={`flex gap-2.5 max-w-[88%] ${
                          m.role === "user" ? "flex-row-reverse" : "flex-row"
                        }`}
                      >
                        {/* Avatar */}
                        <div
                          className={`h-7 w-7 rounded-full flex-shrink-0 flex items-center justify-center text-xs ${
                            m.role === "user"
                              ? "bg-cyan-600 text-white"
                              : "bg-primary/20 text-primary border border-primary/40"
                          }`}
                        >
                          {m.role === "user" ? <User className="h-3.5 w-3.5" /> : <Bot className="h-3.5 w-3.5" />}
                        </div>

                        {/* Message Bubble */}
                        <div
                          className={`rounded-2xl p-3.5 leading-relaxed shadow-sm ${
                            m.role === "user"
                              ? "bg-gradient-to-r from-primary to-cyan-600 text-primary-foreground rounded-tr-none font-medium"
                              : "bg-slate-900/90 border border-slate-800 text-slate-200 rounded-tl-none whitespace-pre-line"
                          }`}
                        >
                          {m.content ? m.content.replace(/\*\*/g, '') : ''}

                          {/* Action Button if attached */}
                          {m.action && m.action.type !== "none" && m.action.url && (
                            <div className="mt-3 pt-2.5 border-t border-slate-800/80">
                              <a
                                href={m.action.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg
                                           bg-primary/20 hover:bg-primary/30 text-primary border border-primary/40 transition-colors"
                              >
                                {m.action.label || "Explore Resource ↗"}
                              </a>
                            </div>
                          )}

                          {/* Sources Cited */}
                          {m.sources && m.sources.length > 0 && (
                            <div className="mt-2 pt-1.5 flex flex-wrap gap-1 text-[10px] text-muted-foreground">
                              <span className="font-semibold text-slate-400">Source:</span>
                              {m.sources.map((src, idx) => (
                                <span key={idx} className="bg-slate-800 px-1.5 py-0.5 rounded text-slate-300">
                                  {src}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Follow-up Suggestion Chips for latest message */}
                      {m.role === "assistant" && m.followUps && m.followUps.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-2 ml-9">
                          {m.followUps.map((question, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleSend(question)}
                              className="text-[11px] text-primary/90 bg-primary/10 hover:bg-primary/20
                                         border border-primary/30 rounded-full px-2.5 py-1 text-left
                                         transition-colors duration-200 flex items-center gap-1"
                            >
                              <Zap className="h-2.5 w-2.5 text-primary" />
                              {question}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Thinking Indicator */}
                  {isLoading && (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground ml-9">
                      <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 px-3 py-2 rounded-2xl rounded-tl-none">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce" />
                        <span className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce delay-100" />
                        <span className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce delay-200" />
                        <span className="text-[11px] text-slate-400 ml-1.5">Consulting portfolio records...</span>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-3 bg-slate-900/90 border-t border-slate-800 flex-shrink-0">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      handleSend()
                    }}
                    className="flex items-center gap-2"
                  >
                    <input
                      ref={inputRef}
                      type="text"
                      placeholder="Ask about Brain Tumor, YOLO, RAG, or hiring..."
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      disabled={isLoading}
                      className="flex-1 bg-slate-950 border border-slate-800 rounded-full px-4 py-2.5 text-xs sm:text-sm text-slate-100 placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all disabled:opacity-50"
                    />
                    <Button
                      type="submit"
                      size="icon"
                      disabled={!inputMessage.trim() || isLoading}
                      className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground h-10 w-10 flex-shrink-0 transition-transform active:scale-95 disabled:opacity-40"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                  <p className="text-[10px] text-center text-muted-foreground mt-1.5">
                    AbdulInsight AI can make mistakes. Verify sensitive details directly.
                  </p>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
