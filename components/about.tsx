"use client"

import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { MapPin, Phone, Mail } from "lucide-react"
import Image from "next/image"

const skills = [
    { name: "Machine Learning", level: 90 },
    { name: "Deep Learning", level: 88 },
    { name: "Computer Vision", level: 85 },
    { name: "Python", level: 92 },
    { name: "Data Analysis", level: 88 },
    { name: "NLP", level: 82 },
    { name: "RAG Systems", level: 85 },
    { name: "Agentic AI", level: 80 },
    { name: "TensorFlow/PyTorch", level: 88 },
]

export default function About() {
    return (
        <section id="about" className="py-20">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 section-underline">About Me</h2>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Profile Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="flex justify-center"
                    >
                        <div className="relative">
                            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary/50 profile-glow">
                                <Image
                                    src="/profile.png"
                                    alt="Hafiz Abdul Rehman"
                                    width={320}
                                    height={320}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <div className="absolute -bottom-4 -right-4 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium">
                                3+ Years Exp
                            </div>
                        </div>
                    </motion.div>

                    {/* Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-2xl font-bold mb-4">Hafiz Abdul Rehman</h3>

                        <div className="flex flex-col space-y-3 mb-6">
                            <div className="flex items-center text-muted-foreground">
                                <MapPin className="h-5 w-5 mr-3 text-primary" />
                                <span>Gujranwala, Punjab, Pakistan</span>
                            </div>
                            <div className="flex items-center text-muted-foreground">
                                <Mail className="h-5 w-5 mr-3 text-primary" />
                                <a href="mailto:hafizrehman3321@gmail.com" className="hover:text-primary transition-colors">
                                    hafizrehman3321@gmail.com
                                </a>
                            </div>
                            <div className="flex items-center text-muted-foreground">
                                <Phone className="h-5 w-5 mr-3 text-primary" />
                                <span>+92 328 3121702</span>
                            </div>
                        </div>

                        <p className="text-muted-foreground mb-6 leading-relaxed">
                            Senior Data Scientist specializing in Machine Learning, Deep Learning, and Computer Vision.
                            I develop and deploy advanced AI solutions including foundation models, knowledge distillation
                            frameworks, and real-time computer vision systems. Experienced in medical imaging, intelligent
                            transportation systems, security surveillance, and healthcare analytics. Passionate about
                            building Agentic AI systems and RAG-powered applications.
                        </p>
                    </motion.div>
                </div>

                {/* Skills */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="mt-20"
                >
                    <h3 className="text-2xl font-bold mb-8 text-center">Technical Skills</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {skills.map((skill, index) => (
                            <motion.div
                                key={skill.name}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.02, y: -4 }}
                                className="group cursor-pointer"
                            >
                                <Card className="overflow-hidden border-2 border-slate-700/50 bg-gradient-to-br from-slate-800/90 to-slate-900/90
                                                hover:border-primary hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 relative"
                                    style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
                                    {/* Dotted border effect on hover */}
                                    <div className="absolute inset-[-4px] rounded-xl border-2 border-dashed border-transparent 
                                                    group-hover:border-primary/40 transition-all duration-300 pointer-events-none" />

                                    <CardContent className="p-6">
                                        <div className="flex justify-between items-center mb-3">
                                            <h4 className="font-semibold text-white group-hover:text-primary transition-colors duration-300">{skill.name}</h4>
                                            <span className="text-primary font-bold text-lg">{skill.level}%</span>
                                        </div>
                                        <div className="w-full bg-slate-700 rounded-full h-4 overflow-hidden relative">
                                            {/* Animated bar */}
                                            <motion.div
                                                className="bg-gradient-to-r from-primary to-cyan-500 h-4 rounded-full relative"
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${skill.level}%` }}
                                                transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
                                                viewport={{ once: true }}
                                            >
                                                {/* Shine animation on hover */}
                                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent 
                                                               -translate-x-full group-hover:translate-x-[200%] transition-transform duration-1000" />
                                            </motion.div>
                                            {/* Glow effect */}
                                            <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                                style={{
                                                    boxShadow: 'inset 0 0 10px hsl(172 66% 50% / 0.3)',
                                                }} />
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
