"use client"

import { Printer, ArrowLeft, Download, Mail, Phone, MapPin, Globe, Github, Linkedin, ExternalLink } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ResumePage() {
  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-8 print:p-0 print:bg-white print:text-black">
      {/* Top Action Bar (Hidden on print) */}
      <div className="max-w-4xl mx-auto mb-8 flex items-center justify-between print:hidden">
        <Button asChild variant="outline" size="sm" className="border-slate-700 hover:bg-slate-800 text-slate-300">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Portfolio
          </Link>
        </Button>

        <div className="flex items-center gap-3">
          <Button onClick={handlePrint} size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
            <Printer className="mr-2 h-4 w-4" />
            Print / Save as PDF
          </Button>
        </div>
      </div>

      {/* Main Resume Sheet */}
      <article className="max-w-4xl mx-auto bg-slate-900/90 border border-slate-800 p-8 sm:p-12 rounded-2xl shadow-2xl print:shadow-none print:border-none print:p-0 print:bg-white">
        {/* Header */}
        <header className="border-b border-slate-800 print:border-black/20 pb-6 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white print:text-black">
                Hafiz Abdul Rehman
              </h1>
              <p className="text-lg font-semibold text-primary print:text-teal-700 mt-1">
                Data Scientist | AI/ML Engineer | Computer Vision Expert
              </p>
            </div>
          </div>

          {/* Contact Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5 mt-4 text-xs text-slate-300 print:text-black/80">
            <span className="flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5 text-primary" />
              hafizrehman3321@gmail.com
            </span>
            <span className="flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5 text-primary" />
              +92 328 3121702
            </span>
            <span className="flex items-center gap-1.5">
              <Github className="h-3.5 w-3.5 text-primary" />
              github.com/Abdul-Insighht
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-primary" />
              Pakistan (Open to Global Remote)
            </span>
          </div>
        </header>

        {/* Executive Summary */}
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-primary print:text-teal-800 mb-2">
            Professional Summary
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 print:text-black/90 leading-relaxed">
            Data Scientist & AI/ML Engineer with over 3 years of hands-on experience and 57 public GitHub repositories specializing in Medical Deep Learning, Real-Time Computer Vision (YOLO, ByteTrack), and Agentic RAG workflows. Demonstrated track record achieving 99.64% MRI brain tumor segmentation accuracy on BraTS 2020 and 98.93% on COVID-19 CT scan fuzzy ensembles. Proven capability translating theoretical models into production Dockerized microservices and client-ready web systems.
          </p>
        </section>

        {/* Technical Competencies by Domain */}
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-primary print:text-teal-800 mb-2">
            Technical Competencies
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300 print:text-black/90">
            <div className="p-2.5 rounded-lg bg-slate-800/40 print:bg-slate-100 border border-slate-800 print:border-none">
              <strong className="block text-white print:text-black font-semibold mb-1">Computer Vision & Telemetry</strong>
              <span>YOLO (v8/11), OpenCV, ByteTrack, MediaPipe, SAM, Perspective Transforms, Albumentations</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-800/40 print:bg-slate-100 border border-slate-800 print:border-none">
              <strong className="block text-white print:text-black font-semibold mb-1">Deep Learning & Medical AI</strong>
              <span>PyTorch, Attention U-Net, Sugeno Fuzzy Ensembles, TensorFlow, CNNs, Focal Dice Loss, Grad-CAM</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-800/40 print:bg-slate-100 border border-slate-800 print:border-none">
              <strong className="block text-white print:text-black font-semibold mb-1">Agentic AI & RAG</strong>
              <span>LangChain, LangGraph, ChromaDB, Gemini 2.0 Flash, Groq, Pydantic Structured Outputs, HuggingFace</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-800/40 print:bg-slate-100 border border-slate-800 print:border-none">
              <strong className="block text-white print:text-black font-semibold mb-1">Backend, MLOps & Languages</strong>
              <span>Python, FastAPI, Docker, DVC, AWS EC2/S3, Streamlit, Git, Next.js, PostgreSQL, SQL</span>
            </div>
          </div>
        </section>

        {/* Key Selected Engineering Projects */}
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-primary print:text-teal-800 mb-3">
            Key Engineering Projects & Validated Outcomes
          </h2>
          <div className="space-y-3.5 text-xs sm:text-sm text-slate-300 print:text-black/90">
            <div>
              <div className="flex justify-between items-start font-semibold text-white print:text-black">
                <span>Brain Tumor Segmentation (BraTS 2020) — PyTorch & Attention U-Net</span>
                <span className="text-primary print:text-teal-700 font-bold">99.64% Acc | 0.986 IoU</span>
              </div>
              <p className="text-xs text-slate-400 print:text-black/70 mt-0.5">
                Engineered 3D soft attention-gated U-Net to segment multimodal brain MRI scans. Formulated Focal Dice Loss to conquer extreme voxel disproportion and built an interactive Streamlit slice visualizer.
              </p>
            </div>

            <div>
              <div className="flex justify-between items-start font-semibold text-white print:text-black">
                <span>COVID-19 Detection CNN Ensemble — Sugeno Fuzzy Integral</span>
                <span className="text-primary print:text-teal-700 font-bold">98.93% Acc | 99.1% Sens</span>
              </div>
              <p className="text-xs text-slate-400 print:text-black/70 mt-0.5">
                Constructed non-linear decision fusion combining VGG-11, GoogLeNet, SqueezeNet, and Wide ResNet-50-2 for CT lung scans with Grad-CAM attribution explaining ground-glass opacity diagnosis.
              </p>
            </div>

            <div>
              <div className="flex justify-between items-start font-semibold text-white print:text-black">
                <span>Real-Time Football Player Tracking System — YOLO & ByteTrack</span>
                <span className="text-primary print:text-teal-700 font-bold">60+ FPS Real-Time</span>
              </div>
              <p className="text-xs text-slate-400 print:text-black/70 mt-0.5">
                Autonomous sports analytics tracking multiple players simultaneously using YOLO detection, ByteTrack Kalman filtering, and HSV color-space K-Means clustering for team jersey identification.
              </p>
            </div>

            <div>
              <div className="flex justify-between items-start font-semibold text-white print:text-black">
                <span>Vehicle Speed Detection & Traffic Telemetry — YOLO11 & Homography</span>
                <span className="text-primary print:text-teal-700 font-bold">±2.5 km/h Precision</span>
              </div>
              <p className="text-xs text-slate-400 print:text-black/70 mt-0.5">
                Applied 4-point inverse perspective calibration to 2D highway camera streams, computing ground-plane velocity derivative and automatically flagging over-speed violations.
              </p>
            </div>

            <div>
              <div className="flex justify-between items-start font-semibold text-white print:text-black">
                <span>Research Components Extractor — Agentic RAG Pipeline</span>
                <span className="text-primary print:text-teal-700 font-bold">96.4% Precision</span>
              </div>
              <p className="text-xs text-slate-400 print:text-black/70 mt-0.5">
                Constructed an automated RAG toolchain utilizing ChromaDB vector search and Gemini 2.0 to extract structured methodology, results, and equations from scientific whitepapers into LaTeX tables.
              </p>
            </div>
          </div>
        </section>

        {/* Capstone Supervisions & Mentorship */}
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-primary print:text-teal-800 mb-2">
            Academic Supervisions & Mentorship
          </h2>
          <div className="space-y-2 text-xs text-slate-300 print:text-black/90">
            <div>
              <strong className="text-white print:text-black font-semibold">Primary Technical Advisor — 3D Attention U-Net MRI Brain Lesion FYP (2024)</strong>
              <p className="text-xs text-slate-400 print:text-black/70">Supervised 3 undergraduate engineers implementing volumetric segmentation pipelines and model quantization, achieving 99.4% Dice score.</p>
            </div>
            <div>
              <strong className="text-white print:text-black font-semibold">Architecture Mentor — Clinical Decision Support RAG Assistant (2023 - 2024)</strong>
              <p className="text-xs text-slate-400 print:text-black/70">Advised student team on ChromaDB vector indexing and cross-encoder reranking, reducing medical retrieval hallucinations by 68%.</p>
            </div>
          </div>
        </section>

        {/* Education & Academic Rigor */}
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-primary print:text-teal-800 mb-2">
            Education
          </h2>
          <div className="flex justify-between text-xs sm:text-sm text-slate-300 print:text-black/90">
            <div>
              <strong className="text-white print:text-black">GIFT University</strong>
              <p className="text-xs text-slate-400 print:text-black/70">Bachelor of Science in Computer Science / Data Science</p>
              <p className="text-xs text-muted-foreground print:text-black/60">Focus: Deep Learning, Computer Vision, Mathematical Modeling, AI Engineering</p>
            </div>
            <span className="text-xs text-muted-foreground print:text-black/70">Graduated</span>
          </div>
        </section>

        {/* Certifications & Badges */}
        <section>
          <h2 className="text-sm font-bold uppercase tracking-wider text-primary print:text-teal-800 mb-2">
            Professional Certifications
          </h2>
          <ul className="text-xs text-slate-300 print:text-black/90 space-y-1 list-disc pl-4">
            <li><strong>GitHub Global Campus — Student Developer Pack</strong> — GitHub Education (GitHub Pro, CI/CD, JetBrains Suite)</li>
            <li><strong>Deep Learning Specialization</strong> — DeepLearning.AI / Coursera (CNNs, Sequence Models, Attention)</li>
            <li><strong>Computer Vision & YOLO Mastery</strong> — OpenCV.org (Real-time detection, ByteTrack, MediaPipe)</li>
            <li><strong>Machine Learning: Supervised & Unsupervised</strong> — Stanford Online (Optimization, Regularization)</li>
            <li><strong>Generative AI & LLMs with RAG</strong> — AWS & DeepLearning.AI (LangChain, ChromaDB, PEFT)</li>
          </ul>
        </section>
      </article>
    </div>
  )
}
