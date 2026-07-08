"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { Github, ExternalLink, Star, Sparkles } from "lucide-react"
import Image from "next/image"

// Featured projects with correct relevant images
const featuredProjects = [
    {
        id: 1,
        title: "Brain Tumor Segmentation",
        description: "Attention U-Net model for 3D brain tumor segmentation on BraTS 2020 MRI dataset, achieving 99.64% validation accuracy and 0.986 IoU with interactive Streamlit visualization.",
        image: "/brain-tumor.png",
        tags: ["Deep Learning", "Medical Imaging", "PyTorch", "Streamlit"],
        githubUrl: "https://github.com/Abdul-Insighht",
        accuracy: "99.64%",
        featured: true,
    },
    {
        id: 2,
        title: "COVID-19 Detection CNN Ensemble",
        description: "Fuzzy integral-based CNN ensemble combining VGG-11, GoogLeNet, SqueezeNet, and Wide ResNet-50-2 for COVID-19 detection from lung CT scans.",
        image: "/covid-detection.png",
        tags: ["Ensemble Learning", "CNN", "Medical AI", "Python"],
        githubUrl: "https://github.com/Abdul-Insighht",
        accuracy: "98.93%",
        featured: true,
    },
    {
        id: 3,
        title: "Real-Time Football Player Tracking",
        description: "Football player detection and team classification using YOLO object detection and ByteTrack for persistent tracking with annotated video generation.",
        image: "/football-tracking.png",
        tags: ["YOLO", "Computer Vision", "Object Tracking", "Sports Analytics"],
        githubUrl: "https://github.com/Abdul-Insighht",
        featured: true,
    },
    {
        id: 4,
        title: "Vehicle Speed Detection System",
        description: "Real-time vehicle speed estimation using YOLO11 with perspective transform for accurate speed calculation and ByteTrack multi-object tracking.",
        image: "/vehicle-speed.png",
        tags: ["YOLO", "Computer Vision", "Traffic Monitoring", "Python"],
        githubUrl: "https://github.com/Abdul-Insighht",
        featured: true,
    },
    {
        id: 5,
        title: "Sign Language to Text & Speech",
        description: "Real-time ASL recognition using CNN achieving 97% accuracy with MediaPipe hand landmark detection and text-to-speech conversion.",
        image: "/sign-language.png",
        tags: ["CNN", "MediaPipe", "Accessibility", "Deep Learning"],
        githubUrl: "https://github.com/Abdul-Insighht",
        accuracy: "97%",
        featured: true,
    },
    {
        id: 6,
        title: "Research Components Extractor",
        description: "Automated research paper analysis using RAG to extract key components including methodology, results, and conclusions with structured output.",
        image: "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?q=80&w=2000",
        tags: ["RAG", "NLP", "Research Tools", "Python"],
        githubUrl: "https://github.com/Abdul-Insighht/Research_Components_Extractor_Using_Rag",
        featured: true,
    },
    {
        id: 7,
        title: "AI Travel Planner",
        description: "Intelligent travel planning application creating personalized itineraries based on budget and preferences, powered by Gemini 2.0 Flash AI.",
        image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2000",
        tags: ["Gemini AI", "Streamlit", "Travel", "Python"],
        githubUrl: "https://github.com/Abdul-Insighht/AI-Global-World-Wide-Travel-Assistant-Planner",
        featured: true,
    },
    {
        id: 8,
        title: "Kidney Disease Classification",
        description: "End-to-end deep learning pipeline for kidney disease classification from CT scans with MLOps workflow using DVC and Docker deployment.",
        image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?q=80&w=2000",
        tags: ["Deep Learning", "MLOps", "Docker", "AWS"],
        githubUrl: "https://github.com/Abdul-Insighht",
        featured: true,
    },
    {
        id: 9,
        title: "Social Distance Violation Detection",
        description: "Real-time social distancing monitoring using YOLO person detection with perspective transformation for accurate distance measurement.",
        image: "/social-distance.png",
        tags: ["YOLO", "Computer Vision", "Public Safety", "Python"],
        githubUrl: "https://github.com/Abdul-Insighht",
        featured: true,
    },
    {
        id: 10,
        title: "AutoStatAgent: Automated EDA",
        description: "Agent-based system for automated statistical analysis and LaTeX report generation with intelligent data exploration and visualization.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000",
        tags: ["Agentic AI", "Data Science", "Automation", "Python"],
        githubUrl: "https://github.com/Abdul-Insighht",
        featured: true,
    },
    {
        id: 11,
        title: "ATS System Using RAG",
        description: "Intelligent Application Tracking System using RAG for automated resume screening and candidate ranking with semantic matching.",
        image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=2000",
        tags: ["RAG", "HR Tech", "NLP", "Python"],
        githubUrl: "https://github.com/Abdul-Insighht",
        featured: true,
    },
    {
        id: 12,
        title: "Sentiment Analysis Dashboard",
        description: "Real-time sentiment analysis dashboard for social media data with visualization and trend tracking using NLP models.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000",
        tags: ["NLP", "Streamlit", "Data Visualization", "Python"],
        githubUrl: "https://github.com/Abdul-Insighht",
        featured: true,
    },
]

export default function Projects() {
    return (
        <section id="projects" className="py-20 relative overflow-hidden">
            {/* Background Effect */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-b from-muted/20 via-background to-muted/20" />

            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 section-underline">Featured Projects</h2>
                    <p className="mt-8 text-muted-foreground max-w-2xl mx-auto">
                        Showcasing my best work in Machine Learning, Deep Learning, Computer Vision, and AI-powered applications.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featuredProjects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.05 }}
                            viewport={{ once: true }}
                            className="group"
                        >
                            <Card className="h-full flex flex-col overflow-hidden 
                                            border-2 border-slate-700/50 bg-gradient-to-br from-slate-800/90 to-slate-900/90
                                            transition-all duration-500 hover:border-primary hover:shadow-2xl hover:shadow-primary/20
                                            hover:-translate-y-3 relative cursor-pointer"
                                style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
                                {/* Dotted border effect */}
                                <div className="absolute inset-[-6px] rounded-xl border-2 border-dashed border-transparent 
                                                group-hover:border-primary/40 transition-all duration-300 pointer-events-none z-10" />

                                {/* Image Container with Overlay */}
                                <div className="relative h-48 w-full overflow-hidden">
                                    <Image
                                        src={project.image.startsWith('/') ? `${process.env.NEXT_PUBLIC_BASE_PATH || ''}${project.image}` : project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                                    />
                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80" />

                                    {project.accuracy && (
                                        <motion.div
                                            initial={{ scale: 0.8, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            className="absolute top-3 right-3 bg-gradient-to-r from-primary to-cyan-500 text-primary-foreground px-3 py-1 rounded-full text-sm font-bold shadow-lg"
                                        >
                                            {project.accuracy}
                                        </motion.div>
                                    )}
                                    {project.featured && (
                                        <motion.div
                                            initial={{ scale: 0.8, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            className="absolute top-3 left-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-black px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg"
                                        >
                                            <Star className="h-3 w-3 fill-current" />
                                            Featured
                                        </motion.div>
                                    )}
                                </div>

                                <CardHeader className="pb-2">
                                    <CardTitle className="text-lg text-primary group-hover:text-cyan-400 transition-colors duration-300 flex items-center gap-2">
                                        {project.title}
                                        <Sparkles className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </CardTitle>
                                    <div className="flex flex-wrap gap-1.5 mt-2">
                                        {project.tags.slice(0, 3).map((tag) => (
                                            <Badge
                                                key={tag}
                                                variant="secondary"
                                                className="text-xs bg-primary/20 text-primary border border-primary/30 hover:bg-primary/30 hover:border-primary/50 transition-all duration-300"
                                            >
                                                {tag}
                                            </Badge>
                                        ))}
                                        {project.tags.length > 3 && (
                                            <Badge variant="outline" className="text-xs border-primary/50 hover:bg-primary/10 text-white">
                                                +{project.tags.length - 3}
                                            </Badge>
                                        )}
                                    </div>
                                </CardHeader>

                                <CardContent className="flex-grow pb-2">
                                    <CardDescription className="text-sm line-clamp-3 text-slate-300 group-hover:text-white transition-colors duration-300">
                                        {project.description}
                                    </CardDescription>
                                </CardContent>

                                <CardFooter className="pt-0">
                                    <Button
                                        asChild
                                        variant="default"
                                        size="sm"
                                        className="w-full bg-gradient-to-r from-primary to-cyan-600 hover:from-primary/90 hover:to-cyan-500 
                                                   transition-all duration-300 shadow-lg shadow-primary/30 hover:shadow-primary/50
                                                   border border-primary/50 hover:border-primary"
                                    >
                                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                            <Github className="mr-2 h-4 w-4" />
                                            View on GitHub
                                        </a>
                                    </Button>
                                </CardFooter>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center mt-12"
                >
                    <p className="text-muted-foreground mb-4">
                        Explore all 34 projects on my GitHub profile
                    </p>
                    <Button
                        asChild
                        variant="outline"
                        size="lg"
                        className="border-2 border-primary/50 hover:bg-primary/10 hover:border-primary 
                                   transition-all duration-300 group relative overflow-hidden"
                    >
                        <a
                            href="https://github.com/Abdul-Insighht?tab=repositories"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-lg"
                        >
                            <span className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 
                                           translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                            <ExternalLink className="mr-2 h-5 w-5" />
                            View All Projects on GitHub
                        </a>
                    </Button>
                </motion.div>
            </div>
        </section>
    )
}
