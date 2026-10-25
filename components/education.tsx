"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, Award, ExternalLink } from "lucide-react"

const education = [
    {
        degree: "Bachelor of Science in Data Science",
        institution: "GIFT University",
        location: "Gujranwala, Pakistan",
        period: "2022 – 2026",
        grade: "CGPA: 3.68/4.0 (Semesters 7 & 8: 4.0/4.0)",
        coursework: "Machine Learning, Deep Learning, Computer Vision, NLP, Statistical Analysis, Data Visualization, Artificial Intelligence, Generative AI",
    },
    {
        degree: "FSC Pre-Engineering",
        institution: "ACE Group of Colleges",
        location: "Gujranwala, Pakistan",
        period: "2020 – 2022",
        grade: "Grade: A",
        coursework: "Mathematics, Physics, Chemistry",
    },
    {
        degree: "Matriculation in Science",
        institution: "Iqra Huffaz Secondary School",
        location: "Gujranwala, Pakistan",
        period: "2018 – 2020",
        grade: "Grade: A+",
        coursework: "Science, Mathematics, Computer Studies",
    },
]

const certifications = [
    {
        name: "Agentic AI and AI Agents: A Primer for Leaders",
        issuer: "Coursera",
        year: "2025",
        link: "https://coursera.org/share/9a94de4340a1a4c583f75e933ed392c3",
    },
    {
        name: "Programming with Generative AI (IIT)",
        issuer: "Coursera / IIT",
        year: "2025",
        link: "https://coursera.org/share/8ed23e0eaa7ace7f3b00f975fc43d092",
    },
    {
        name: "Applied Data Science with Python",
        issuer: "Coursera",
        year: "2024",
        link: "https://drive.google.com/file/d/1PtjMnD2TLqUscWAKj7cHqflwECT1Nyzc/view",
    },
    {
        name: "Machine Learning with Python",
        issuer: "Coursera",
        year: "2024",
        link: "https://coursera.org",
    },
    {
        name: "Introduction to Computer Vision and Image Processing",
        issuer: "Coursera",
        year: "2024",
        link: "https://coursera.org",
    },
    {
        name: "Deep Learning with PyTorch",
        issuer: "Coursera",
        year: "2024",
        link: "https://coursera.org",
    },
    {
        name: "AI Capstone Project with Deep Learning",
        issuer: "Coursera",
        year: "2025",
        link: "https://coursera.org",
    },
    {
        name: "GitHub Global Campus — Student Developer Pack",
        issuer: "GitHub Education",
        year: "2024 – Present",
        link: "https://education.github.com/pack",
    },
    {
        name: "Prompt Engineering for ChatGPT",
        issuer: "Coursera",
        year: "2025",
        link: "https://coursera.org/share/dc426998f8feabdb2259a990b1c7428e",
    },
    {
        name: "OpenAI GPTs: Creating Custom AI Assistants",
        issuer: "Coursera",
        year: "2025",
        link: "https://coursera.org/share/f54aa14bcfa0cb58f1983b52a878c28e",
    },
]

export default function Education() {
    return (
        <section id="education" className="py-20">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Education & Certifications</h2>
                    <div className="h-1 w-20 bg-gradient-to-r from-primary to-purple-600 mx-auto rounded-full"></div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Education */}
                    <div>
                        <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <GraduationCap className="h-6 w-6 text-primary" />
                            Academic Background
                        </h3>
                        {education.map((edu, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="mb-4"
                            >
                                <Card className="hover:shadow-lg transition-shadow">
                                    <CardHeader className="flex flex-row items-center gap-4 pb-2">
                                        <div className="bg-gradient-to-br from-primary/20 to-purple-500/20 p-3 rounded-full">
                                            <GraduationCap className="h-5 w-5 text-primary" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-lg">{edu.degree}</CardTitle>
                                            <CardDescription>
                                                {edu.institution} {edu.location && `• ${edu.location}`}
                                            </CardDescription>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="pt-0 pl-20">
                                        <div className="flex flex-wrap items-center gap-3 text-sm mb-2">
                                            <span className="text-muted-foreground">{edu.period}</span>
                                            <span className="text-primary font-medium">{edu.grade}</span>
                                        </div>
                                        {edu.coursework && (
                                            <p className="text-xs text-slate-400 mt-1">
                                                <strong className="text-slate-300">Coursework:</strong> {edu.coursework}
                                            </p>
                                        )}
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>

                    {/* Certifications */}
                    <div>
                        <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <Award className="h-6 w-6 text-primary" />
                            Professional Certifications
                        </h3>
                        <Card className="hover:shadow-lg transition-shadow">
                            <CardContent className="pt-6">
                                <ul className="space-y-4">
                                    {certifications.map((cert, index) => (
                                        <motion.li
                                            key={index}
                                            initial={{ opacity: 0, x: 20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.5, delay: index * 0.05 }}
                                            viewport={{ once: true }}
                                            className="flex items-start justify-between"
                                        >
                                            <div className="flex items-start">
                                                <div className="bg-primary/10 p-1 rounded-full mr-3 mt-1">
                                                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                                                </div>
                                                <div>
                                                    <p className="font-medium">{cert.name}</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {cert.issuer} • {cert.year}
                                                    </p>
                                                </div>
                                            </div>
                                            <a
                                                href={cert.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-primary hover:text-primary/80 transition-colors"
                                            >
                                                <ExternalLink className="h-4 w-4" />
                                            </a>
                                        </motion.li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    )
}
