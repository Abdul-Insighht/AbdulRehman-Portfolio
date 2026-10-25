"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase, Bot, Cpu, Network, GraduationCap, Building2, CheckCircle2 } from "lucide-react"

const experiences = [
    {
        title: "AI & Machine Learning Engineer",
        company: "AiBit Soft",
        location: "Pakistan (On-site)",
        period: "2026 – Present",
        type: "Full-Time",
        icon: Bot,
        accent: "from-teal-500 to-cyan-500",
        description: [
            "AURA OS — Universal Conversational Multi-Agent Autonomous Assistant: Architected and developed a full-scale autonomous multi-agent OS capable of conversational task delegation, real-time WebSocket communication, and cross-platform mobile delivery via Flutter (Python, FastAPI, WebSockets, Multi-Agent Architecture, LLM Orchestration, AsyncIO, Headless Automation).",
            "Developing LLM-based applications and conversational web extensions for intelligent user interaction and task automation, enabling context-aware multi-turn dialogue.",
            "Building vision-based lip-sync recommendation systems for marketplace applications using real-time facial landmark tracking, enhancing visual content quality and user engagement.",
            "Engineering AI-powered teacher monitoring systems using computer vision to automate classroom attendance, in-time/out-time tracking, and activity detection.",
        ],
        tags: ["AURA OS", "Multi-Agent Systems", "FastAPI", "WebSockets", "Flutter", "Computer Vision", "Facial Landmarks", "LLMs"]
    },
    {
        title: "AI & Machine Learning Engineer (Intern)",
        company: "Nexl Tech",
        location: "Pakistan (On-site)",
        period: "Apr 2025 – Dec 2025",
        type: "Internship",
        icon: Network,
        accent: "from-purple-500 to-indigo-500",
        description: [
            "Developed RAG-based chatbots and LLM applications for enterprise document intelligence using LangChain, Vector Databases (FAISS/Pinecone), and FastAPI.",
            "Designed and trained ML and Deep Learning pipelines (CNN, LSTM, Transformers) with systematic hyperparameter tuning, improving model accuracy and robustness for production deployment.",
        ],
        tags: ["RAG Pipelines", "LangChain", "Vector DB (FAISS/Pinecone)", "FastAPI", "CNN", "LSTM", "Transformers"]
    },
    {
        title: "Data Science & ML Engineer (Intern)",
        company: "Arch Technologies",
        location: "Islamabad, Pakistan (Remote)",
        period: "2025",
        type: "Internship",
        icon: Cpu,
        accent: "from-blue-500 to-cyan-500",
        description: [
            "Delivered end-to-end ML solutions: data preprocessing, feature engineering, model development, evaluation, and visualization using Python, Scikit-learn, and Pandas.",
            "Contributed to predictive modeling workflows supporting business decision-making with interpretable model outputs and automated reporting pipelines.",
        ],
        tags: ["Scikit-learn", "Pandas", "Feature Engineering", "Predictive Modeling", "Model Evaluation"]
    },
    {
        title: "AI/ML Consultant & Developer (Freelance)",
        company: "Upwork",
        location: "Remote (International Clients)",
        period: "2025 – Present",
        type: "Freelance",
        icon: Briefcase,
        accent: "from-emerald-500 to-teal-500",
        description: [
            "Delivered Computer Vision and ML solutions: YOLO-based detection systems, OCR pipelines (EasyOCR/PaddleOCR), image segmentation, and churn prediction models for international clients.",
            "Managed complete project lifecycle — data annotation, model training, evaluation, and documented delivery — maintaining high client satisfaction.",
        ],
        tags: ["YOLOv8/11", "EasyOCR", "PaddleOCR", "Image Segmentation", "Client Delivery"]
    },
    {
        title: "University Work Experience — Learn While You Earn Programme",
        company: "GIFT University",
        location: "Gujranwala, Pakistan",
        period: "2022 – 2026",
        type: "Work-Integrated Learning",
        icon: GraduationCap,
        accent: "from-amber-500 to-orange-500",
        description: [
            "Paid, part-time work-integrated learning programme at GIFT University, running alongside BS Data Science degree study.",
            "Student Facilitator | Student Facilitation Center (SFC): Primary point of contact for students, faculty, and visitors; coordinated teams and helped organize university events.",
            "Library Assistant | University Library: Managed resource cataloguing and inventory systems; supported students and faculty in resource discovery and research navigation.",
            "IT Department Assistant | IT Department: Provided hardware support, troubleshooting, and maintenance for university computing and networking infrastructure.",
            "Sales, Purchasing & Operations Assistant | SFADA — School of Arts and Designing: Managed procurement, vendor coordination, and sales operations, with exposure to budgeting and cost management.",
        ],
        tags: ["Student Facilitation", "Resource Management", "IT Operations", "Vendor Coordination", "Budgeting"]
    },
]

export default function Experience() {
    return (
        <section id="experience" className="py-24 bg-slate-950/50 border-t border-slate-800/80">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-3">
                        <Briefcase className="h-3.5 w-3.5" />
                        Career Trajectory & Industry Roles
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 section-underline">Professional Experience</h2>
                    <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-base">
                        Proven engineering journey spanning autonomous multi-agent OS development, enterprise RAG pipelines, international freelance ML consulting, and university leadership.
                    </p>
                </motion.div>

                <div className="max-w-4xl mx-auto space-y-8">
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.08 }}
                            viewport={{ once: true }}
                        >
                            <Card className="hover:shadow-xl transition-all duration-300 border-l-4 border-l-primary bg-slate-900/80 border-slate-800">
                                <CardHeader className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-3">
                                    <div className="flex items-start gap-4">
                                        <div className={`bg-gradient-to-br ${exp.accent} p-3 rounded-xl text-white shadow-md flex-shrink-0`}>
                                            <exp.icon className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-xl sm:text-2xl font-bold text-white">{exp.title}</CardTitle>
                                            <CardDescription className="text-sm mt-1">
                                                <span className="text-primary font-semibold">{exp.company}</span> • <span className="text-slate-400">{exp.location}</span>
                                            </CardDescription>
                                        </div>
                                    </div>
                                    <div className="flex flex-row sm:flex-col items-start sm:items-end gap-1 flex-shrink-0">
                                        <Badge variant="outline" className="border-primary/40 text-primary text-xs font-mono">
                                            {exp.period}
                                        </Badge>
                                        <span className="text-[11px] text-muted-foreground">{exp.type}</span>
                                    </div>
                                </CardHeader>
                                <CardContent className="pt-2">
                                    <ul className="space-y-2.5 mb-5">
                                        {exp.description.map((item, i) => (
                                            <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
                                                <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-800/80">
                                        {exp.tags.map((tag) => (
                                            <Badge key={tag} variant="secondary" className="text-[11px] bg-slate-800/90 text-slate-300 hover:text-white">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
