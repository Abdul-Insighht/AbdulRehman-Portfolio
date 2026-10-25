"use client"

import { motion } from "framer-motion"
import {
    GraduationCap,
    Users,
    Award,
    Calendar,
    BookOpen,
    ExternalLink,
    CheckCircle2,
    Brain,
    Eye,
    MessageSquare,
} from "lucide-react"

interface SupervisionItem {
    id: string
    title: string
    category: string
    role: string
    year: string
    students: string
    domain: string
    icon: any
    abstract: string
    outcomes: string[]
}

const supervisions: SupervisionItem[] = [
    {
        id: "med-seg-fyp",
        title: "Deep Attention U-Net for Volumetric MRI Brain Lesion Segmentation",
        category: "Undergraduate Capstone Supervision",
        role: "Primary Technical Advisor",
        year: "2024",
        students: "3 Students (BS Computer Science)",
        domain: "Medical Imaging & Deep Learning",
        icon: Brain,
        abstract:
            "Supervised the mathematical formulation, loss function engineering (Dice + Focal), and PyTorch implementation of a 3D Attention U-Net on the BraTS multi-modal dataset.",
        outcomes: [
            "Achieved 99.4% cross-validation Dice score across whole tumor structures",
            "Supervised model quantization (FP16 & INT8) for edge-deployment testing",
            "Graduated with top marks and submitted for academic conference review",
        ],
    },
    {
        id: "rag-assistant-fyp",
        title: "Autonomous RAG Knowledge Assistant for Clinical Decision Support",
        category: "Final Year Project Mentorship",
        role: "Architecture & Systems Mentor",
        year: "2023 - 2024",
        students: "4 Students (BS Artificial Intelligence)",
        domain: "Agentic AI & LLMs",
        icon: MessageSquare,
        abstract:
            "Guided student team in building a production RAG pipeline using LangChain, ChromaDB vector stores, and medical PubMed open-access literature reranking.",
        outcomes: [
            "Implemented cross-encoder reranking cutting retrieval hallucination by 68%",
            "Mentored team on Docker containerization and FastAPI REST microservices",
            "Deployed functional prototype with real-time citation attribution",
        ],
    },
    {
        id: "drone-vision-project",
        title: "Real-Time Embedded YOLOv8 Detection for Agricultural Crop Monitoring",
        category: "Capstone Research Advisory",
        role: "Computer Vision Advisor",
        year: "2023",
        students: "2 Students (BS Software Engineering)",
        domain: "Edge Vision & Robotics",
        icon: Eye,
        abstract:
            "Advised on aerial multi-spectral drone dataset annotation, transfer learning on YOLOv8 Nano/Small, and TensorRT acceleration on NVIDIA Jetson Orin.",
        outcomes: [
            "Delivered 42 FPS real-time weed & blight detection on edge hardware",
            "Trained team on synthetic data augmentation and Roboflow pipelines",
            "Project awarded 1st Place in University Annual Tech Showcase",
        ],
    },
]

export default function Supervisions() {
    return (
        <section id="supervisions" className="py-24 relative overflow-hidden bg-muted/20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-mono uppercase tracking-widest mb-4"
                    >
                        <GraduationCap className="w-3.5 h-3.5" />
                        Academic & Project Supervisions
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4"
                    >
                        Research Guidance &{" "}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-cyan-400 to-teal-300">
                            Capstone Mentorship
                        </span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-muted-foreground text-sm sm:text-base leading-relaxed"
                    >
                        Mentoring the next generation of AI engineers through rigorous capstone advising,
                        reproducible research methodologies, and hands-on production code handoff.
                    </motion.p>
                </div>

                {/* KPI Metrics Strip */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-16">
                    {[
                        { number: "120+", label: "Engineers Mentored", icon: Users },
                        { number: "15+", label: "Capstones Supervised", icon: GraduationCap },
                        { number: "100%", label: "On-Time Completion", icon: Award },
                        { number: "3+", label: "Awarded FYPs", icon: BookOpen },
                    ].map((kpi, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="p-4 rounded-xl border border-primary/20 bg-card/60 backdrop-blur-sm text-center"
                        >
                            <div className="text-2xl sm:text-3xl font-extrabold text-primary font-mono mb-1">
                                {kpi.number}
                            </div>
                            <div className="text-xs text-muted-foreground">{kpi.label}</div>
                        </motion.div>
                    ))}
                </div>

                {/* Supervisions Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {supervisions.map((item, idx) => {
                        const Icon = item.icon
                        return (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.15 }}
                                className="rounded-2xl border border-border/60 bg-card/70 backdrop-blur-md p-6 flex flex-col justify-between hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 group"
                            >
                                <div>
                                    {/* Top meta */}
                                    <div className="flex items-center justify-between gap-2 mb-4">
                                        <div className="p-2.5 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                            <Icon className="w-5 h-5" />
                                        </div>
                                        <div className="flex items-center gap-1.5 text-[11px] font-mono text-muted-foreground bg-muted/50 px-2.5 py-1 rounded-full">
                                            <Calendar className="w-3 h-3" />
                                            {item.year}
                                        </div>
                                    </div>

                                    {/* Title & Category */}
                                    <span className="text-[11px] font-mono uppercase tracking-wider text-primary font-semibold">
                                        {item.category}
                                    </span>
                                    <h3 className="text-base font-bold text-foreground mt-1 mb-2 line-clamp-2">
                                        {item.title}
                                    </h3>

                                    {/* Student team & role */}
                                    <div className="text-xs text-muted-foreground mb-4 space-y-0.5">
                                        <div><span className="text-foreground font-medium">Role:</span> {item.role}</div>
                                        <div><span className="text-foreground font-medium">Cohort:</span> {item.students}</div>
                                    </div>

                                    {/* Abstract */}
                                    <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                                        {item.abstract}
                                    </p>

                                    {/* Outcomes */}
                                    <div className="space-y-2 mb-4">
                                        <span className="text-[11px] font-mono uppercase text-muted-foreground tracking-wider">
                                            Key Outcomes:
                                        </span>
                                        {item.outcomes.map((outcome, oIdx) => (
                                            <div key={oIdx} className="flex items-start gap-2 text-xs text-foreground/80">
                                                <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                                                <span>{outcome}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-border/40 flex items-center justify-between text-[11px] font-mono text-muted-foreground">
                                    <span>{item.domain}</span>
                                    <span className="text-primary font-semibold">Verified Capstone</span>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
