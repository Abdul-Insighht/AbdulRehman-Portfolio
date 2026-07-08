"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface Particle {
    id: number
    x: number
    y: number
    size: number
    duration: number
    delay: number
}

export default function ParticlesBackground() {
    const [particles, setParticles] = useState<Particle[]>([])

    useEffect(() => {
        // Generate random particles
        const generateParticles = () => {
            const newParticles: Particle[] = []
            for (let i = 0; i < 50; i++) {
                newParticles.push({
                    id: i,
                    x: Math.random() * 100,
                    y: Math.random() * 100,
                    size: Math.random() * 4 + 2,
                    duration: Math.random() * 10 + 10,
                    delay: Math.random() * 5,
                })
            }
            setParticles(newParticles)
        }

        generateParticles()
    }, [])

    return (
        <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none">
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background" />

            {/* Animated Orbs */}
            <motion.div
                className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/5 filter blur-[100px]"
                animate={{
                    x: [0, 100, 0],
                    y: [0, -50, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
            <motion.div
                className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-cyan-500/5 filter blur-[100px]"
                animate={{
                    x: [0, -100, 0],
                    y: [0, 50, 0],
                    scale: [1, 1.3, 1],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* Floating Particles */}
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className="absolute rounded-full bg-primary/30"
                    style={{
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                        width: particle.size,
                        height: particle.size,
                    }}
                    animate={{
                        y: [0, -30, 0],
                        opacity: [0.2, 0.6, 0.2],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: particle.duration,
                        delay: particle.delay,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            ))}

            {/* Grid Overlay */}
            <div
                className="absolute inset-0 opacity-[0.015]"
                style={{
                    backgroundImage: `
                        linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
                        linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)
                    `,
                    backgroundSize: '100px 100px',
                }}
            />
        </div>
    )
}
