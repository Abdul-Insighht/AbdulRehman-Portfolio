"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BriefcaseIcon, Bot, Cpu } from "lucide-react"

const experiences = [
    {
        title: "Agentic AI & Machine Learning Engineer (Intern)",
        company: "Nexl Tech",
        period: "Aug 2025 – Present",
        icon: Bot,
        description: [
            "Working on Agentic AI systems including autonomous task planning, tool usage, and multi-agent workflows",
            "Developing and fine-tuning machine learning models for real-world business use cases",
            "Implementing Retrieval-Augmented Generation (RAG) pipelines for intelligent document and chatbot systems",
            "Building end-to-end AI solutions using Python, LangChain, vector databases, and LLM APIs",
            "Collaborating with senior engineers to deploy scalable AI applications with production-ready architecture",
        ],
    },
    {
        title: "Senior Data Scientist & ML Engineer",
        company: "Freelance",
        period: "Dec 2022 – Present",
        icon: Cpu,
        description: [
            "Developed and deployed advanced machine learning & DL models to enhance personalized marketing and operational efficiency",
            "Conducted deep analysis of large datasets using Python and SQL to uncover key business insights",
            "Built and maintained end-to-end ML pipelines, improving model scalability, accuracy, and robustness",
            "Created interactive dashboards with Tableau and Power BI for real-time decision support",
            "Collaborated with cross-functional teams to optimize data pipelines and deliver data-driven solutions",
        ],
    },
]

export default function Experience() {
    return (
        <section id="experience" className="py-20 bg-muted/30">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Professional Experience</h2>
                    <div className="h-1 w-20 bg-gradient-to-r from-primary to-purple-600 mx-auto rounded-full"></div>
                </motion.div>

                <div className="max-w-4xl mx-auto">
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="mb-8"
                        >
                            <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-primary">
                                <CardHeader className="flex flex-row items-start gap-4">
                                    <div className="bg-gradient-to-br from-primary to-purple-600 p-3 rounded-xl text-primary-foreground">
                                        <exp.icon className="h-6 w-6" />
                                    </div>
                                    <div className="flex-1">
                                        <CardTitle className="text-xl">{exp.title}</CardTitle>
                                        <CardDescription className="text-base mt-1">
                                            <span className="text-primary font-medium">{exp.company}</span> | {exp.period}
                                        </CardDescription>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-2">
                                        {exp.description.map((item, i) => (
                                            <li key={i} className="flex items-start">
                                                <span className="mr-2 mt-2 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0"></span>
                                                <span className="text-muted-foreground">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
