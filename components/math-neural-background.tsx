"use client"

import { useEffect, useState, useMemo } from "react"
import { motion } from "framer-motion"

interface Particle {
  id: number
  content: string
  isEquation: boolean
  x: number
  y: number
  size: number
  opacity: number
  duration: number
  delay: number
  floatY: number
  floatX: number
  rotate: number
  colorClass: string
}

const FORMULAS_AND_SYMBOLS = [
  // Neural & Attention Equations
  "Attention(Q, K, V) = softmax(QKᵀ / √dₖ) V",
  "y = σ(W₂ · ReLU(W₁x + b₁) + b₂)",
  "ReLU(x) = max(0, x)",
  "σ(z) = 1 / (1 + e⁻ᶻ)",
  "f(x) = tanh(x)",
  "L_Dice = 1 - (2|X ∩ Y| + ε) / (|X| + |Y| + ε)",
  "W₁(μ, ν) = inf_γ E_{(x,y)~γ}[||x - y||]",
  "IoU(A, B) = |A ∩ B| / |A ∪ B|  [0.986]",
  "MSE = (1/n) ∑ (yᵢ - ŷᵢ)²",
  "L_CE = -∑ yᵢ log(ŷᵢ)",
  "θ ← θ - η ∇_θ L(θ)",
  "∂L / ∂W = (∂L / ∂ŷ) · (∂ŷ / ∂W)",
  "D_KL(P || Q) = ∑ P(x) log(P(x) / Q(x))",
  "P(A|B) = [P(B|A) P(A)] / P(B)",
  "E[X] = ∫ x f(x) dx",
  "N(μ, σ²)",
  "det(A - λI) = 0",
  "||x||₂ = √(∑ xᵢ²)",
  "Xᵀ X β̂ = Xᵀ y",
  // Empirical Highlights
  "BraTS 2020: 99.64% Acc",
  "COVID TDA: 98.93% Acc",
  "YOLO11: 60+ FPS",
  "AURA OS Multi-Agent",
  "SAM_OT Alignment",
  // Greek & Scientific Math Symbols
  "∇",
  "∂",
  "∫",
  "∑",
  "∏",
  "√",
  "λ",
  "θ",
  "μ",
  "σ",
  "α",
  "β",
  "γ",
  "ε",
  "∞",
  "≈",
]

const COLOR_CLASSES = [
  "text-teal-400/35 dark:text-teal-300/40",
  "text-cyan-400/35 dark:text-cyan-300/40",
  "text-sky-400/30 dark:text-sky-300/35",
  "text-indigo-400/25 dark:text-indigo-300/30",
  "text-emerald-400/30 dark:text-emerald-300/35",
]

export default function MathNeuralBackground() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Generate deterministic particles on client mount to avoid hydration mismatch
  const particles = useMemo<Particle[]>(() => {
    const list: Particle[] = []
    for (let i = 0; i < 38; i++) {
      const content = FORMULAS_AND_SYMBOLS[i % FORMULAS_AND_SYMBOLS.length]
      const isEquation = content.length > 4
      const size = isEquation
        ? 11 + (i % 4) * 2.5
        : 18 + (i % 5) * 6
      const opacity = isEquation
        ? 0.22 + (i % 3) * 0.08
        : 0.16 + (i % 4) * 0.07

      list.push({
        id: i,
        content,
        isEquation,
        x: ((i * 17 + 7) % 94) + 3,
        y: ((i * 23 + 11) % 94) + 3,
        size,
        opacity,
        duration: 16 + (i % 7) * 3,
        delay: (i % 5) * 1.8,
        floatY: -15 - (i % 4) * 10,
        floatX: ((i % 2 === 0 ? 1 : -1) * (12 + (i % 5) * 6)),
        rotate: ((i % 2 === 0 ? 1 : -1) * (4 + (i % 4) * 2)),
        colorClass: COLOR_CLASSES[i % COLOR_CLASSES.length],
      })
    }
    return list
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none" aria-hidden="true">
      {/* 4 Moving Ambient Neural Glow Orbs (Athar Style: Cyan, Teal, Violet, Indigo) */}
      <motion.div
        className="absolute rounded-full filter blur-[100px] pointer-events-none opacity-40"
        style={{
          top: "15%",
          left: "8%",
          width: 520,
          height: 520,
          background: "radial-gradient(circle, rgba(6, 182, 212, 0.28) 0%, rgba(6, 182, 212, 0.08) 45%, transparent 70%)",
        }}
        animate={{
          x: [0, 50, 0, -30, 0],
          y: [0, -35, 0, 40, 0],
          scale: [1, 1.15, 1, 0.95, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute rounded-full filter blur-[110px] pointer-events-none opacity-35"
        style={{
          bottom: "18%",
          right: "12%",
          width: 480,
          height: 480,
          background: "radial-gradient(circle, rgba(20, 184, 166, 0.25) 0%, rgba(20, 184, 166, 0.06) 45%, transparent 70%)",
        }}
        animate={{
          x: [0, -45, 0, 35, 0],
          y: [0, 40, 0, -30, 0],
          scale: [1, 1.2, 1, 0.9, 1],
        }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute rounded-full filter blur-[120px] pointer-events-none opacity-25"
        style={{
          top: "55%",
          left: "40%",
          width: 420,
          height: 420,
          background: "radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, rgba(139, 92, 246, 0.05) 45%, transparent 70%)",
        }}
        animate={{
          x: [0, 35, 0, -45, 0],
          y: [0, -45, 0, 35, 0],
          scale: [1, 1.1, 1, 0.95, 1],
        }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Coordinate Lattice Matrix Grid */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.035]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="neural-matrix-grid-pattern" width="56" height="56" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.2" fill="currentColor" className="text-teal-400" />
            <line x1="2" y1="2" x2="56" y2="2" stroke="currentColor" strokeWidth="0.4" strokeDasharray="2,6" className="text-teal-400" />
            <line x1="2" y1="2" x2="2" y2="56" stroke="currentColor" strokeWidth="0.4" strokeDasharray="2,6" className="text-teal-400" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#neural-matrix-grid-pattern)" />
      </svg>

      {/* 38 Floating Mathematical Equations & Greek Symbols (Athar Data Scientist Style) */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: p.opacity * 0.6, x: 0, y: 0 }}
          animate={{
            x: [0, p.floatX, 0],
            y: [0, p.floatY, 0],
            rotate: [0, p.rotate, 0],
            opacity: [p.opacity * 0.5, p.opacity, p.opacity * 0.5],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: `${p.y}%`,
            fontSize: `${p.size}px`,
            textShadow: "0 0 12px rgba(20, 184, 166, 0.3)",
          }}
          className={`font-mono font-medium tracking-wider whitespace-nowrap ${p.colorClass}`}
        >
          {p.content}
        </motion.div>
      ))}
    </div>
  )
}
