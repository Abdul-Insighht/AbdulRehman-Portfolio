"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function MathNeuralBackground() {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    const mathFormulas = [
        { text: "∇θ L(θ) = E[∇ log πθ(s, a) Q(s, a)]", top: "12%", left: "6%", size: "text-xs", duration: 18 },
        { text: "Attention(Q, K, V) = softmax(QKᵀ / √dₖ) V", top: "22%", right: "8%", size: "text-sm", duration: 24 },
        { text: "L_Dice = 1 - (2|X ∩ Y| + ε) / (|X| + |Y| + ε)", top: "38%", left: "4%", size: "text-xs", duration: 20 },
        { text: "W₁(μ, ν) = inf_γ E_{(x,y)~γ} [||x - y||]", top: "54%", right: "6%", size: "text-xs", duration: 22 },
        { text: "IoU(A, B) = |A ∩ B| / |A ∪ B|  [0.986 IoU]", top: "68%", left: "8%", size: "text-xs", duration: 26 },
        { text: "σ(z) = 1 / (1 + e⁻ᶻ)", top: "82%", right: "12%", size: "text-sm", duration: 19 },
        { text: "D_KL(P || Q) = ∑ P(x) log(P(x) / Q(x))", top: "90%", left: "14%", size: "text-xs", duration: 21 },
        { text: "f(x) = W₂ · ReLU(W₁x + b₁) + b₂", top: "4%", right: "24%", size: "text-xs", duration: 25 },
        { text: "Accuracy: 99.64%  •  Precision: 98.93%", top: "76%", left: "42%", size: "text-[11px]", duration: 23 },
    ]

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none" aria-hidden="true">
            {/* Ambient Neural Gradients */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-teal-500/[0.035] rounded-full blur-[140px]" />
            <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-cyan-500/[0.035] rounded-full blur-[160px]" />

            {/* Matrix Coordinate Lattice Dots */}
            <svg className="absolute inset-0 w-full h-full opacity-[0.035]" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern id="neural-matrix-grid" width="48" height="48" patternUnits="userSpaceOnUse">
                        <circle cx="2" cy="2" r="1" fill="currentColor" className="text-teal-400" />
                        <line x1="2" y1="2" x2="48" y2="2" stroke="currentColor" strokeWidth="0.4" strokeDasharray="2,6" className="text-teal-400" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#neural-matrix-grid)" />
            </svg>

            {/* Floating Scientific Mathematical Equations (Athar Data Scientist Style) */}
            {mathFormulas.map((formula, idx) => (
                <motion.div
                    key={idx}
                    initial={{ opacity: 0.1, y: 0 }}
                    animate={{
                        opacity: [0.08, 0.22, 0.08],
                        y: [-12, 12, -12],
                    }}
                    transition={{
                        duration: formula.duration,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: idx * 1.5,
                    }}
                    style={{
                        position: "absolute",
                        top: formula.top,
                        left: formula.left,
                        right: formula.right,
                    }}
                    className={`font-mono text-teal-400/25 tracking-wide dark:text-cyan-300/30 font-medium ${formula.size}`}
                >
                    {formula.text}
                </motion.div>
            ))}
        </div>
    )
}
