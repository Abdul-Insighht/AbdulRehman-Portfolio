"use client"

import { Printer, ArrowLeft, Mail, Phone, MapPin, Github, Globe, ExternalLink, Award, BookOpen, Briefcase, GraduationCap, Code } from "lucide-react"
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
      <article className="max-w-4xl mx-auto bg-slate-900/95 border border-slate-800 p-8 sm:p-12 rounded-2xl shadow-2xl print:shadow-none print:border-none print:p-0 print:bg-white text-slate-200 print:text-black">
        {/* Header */}
        <header className="border-b border-slate-800 print:border-black/20 pb-5 mb-6 text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white print:text-black">
            HAFIZ ABDUL REHMAN
          </h1>
          <p className="text-lg font-semibold text-primary print:text-teal-800 mt-1">
            AI & Machine Learning Engineer
          </p>

          {/* Contact Bar */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 mt-3 text-xs text-slate-300 print:text-black/80 font-mono">
            <span>+92 328 3121702</span>
            <span>•</span>
            <a href="mailto:hafizrehman3321@gmail.com" className="hover:text-primary">hafizrehman3321@gmail.com</a>
            <span>•</span>
            <span>Gujranwala, Pakistan</span>
            <span>•</span>
            <a href="https://github.com/Abdul-Insighht" target="_blank" rel="noopener noreferrer" className="hover:text-primary">github.com/Abdul-Insighht</a>
            <span>•</span>
            <a href="https://abdulrehman-portfolio-beta.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-primary">Portfolio</a>
          </div>
        </header>

        {/* Professional Summary */}
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-primary print:text-teal-900 border-b border-slate-800 print:border-black/20 pb-1 mb-2">
            Professional Summary
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 print:text-black/90 leading-relaxed text-justify">
            AI & Machine Learning Engineer with hands-on industry and research experience building end-to-end intelligent systems across Machine Learning, Deep Learning, Computer Vision, and Generative AI. Proven track record delivering production-ready solutions including RAG pipelines, LLM-based chatbots, multi-agent AI systems, document intelligence, OCR, YOLO-based object detection, and image segmentation. Experienced in full ML lifecycle from data annotation and model training to deployment with FastAPI, Streamlit, and Docker. International freelance delivery experience via Upwork.
          </p>
        </section>

        {/* Education */}
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-primary print:text-teal-900 border-b border-slate-800 print:border-black/20 pb-1 mb-2">
            Education
          </h2>
          <div className="text-xs sm:text-sm">
            <div className="flex justify-between items-baseline font-semibold text-white print:text-black">
              <span>Bachelor of Science in Data Science</span>
              <span className="font-mono text-xs">2022 – 2026</span>
            </div>
            <div className="flex justify-between text-xs text-slate-400 print:text-black/70 mb-1">
              <span>GIFT University, Gujranwala, Pakistan</span>
              <span className="font-semibold text-primary print:text-teal-800">CGPA: 3.68/4.0 (Semesters 7 & 8: 4.0/4.0)</span>
            </div>
            <p className="text-[11px] text-slate-400 print:text-black/60">
              <strong>Relevant Coursework:</strong> Machine Learning, Deep Learning, Computer Vision, NLP, Statistical Analysis, Data Visualization, Artificial Intelligence, Generative AI
            </p>
          </div>
        </section>

        {/* Professional Experience */}
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-primary print:text-teal-900 border-b border-slate-800 print:border-black/20 pb-1 mb-3">
            Professional Experience
          </h2>
          <div className="space-y-4 text-xs sm:text-sm">
            {/* AiBit Soft */}
            <div>
              <div className="flex justify-between items-baseline font-semibold text-white print:text-black">
                <span>AI & Machine Learning Engineer | <span className="text-primary print:text-teal-800">AiBit Soft</span></span>
                <span className="font-mono text-xs">2026 – Present</span>
              </div>
              <p className="text-[11px] text-slate-400 print:text-black/70 mb-1">Pakistan (On-site)</p>
              <ul className="list-disc pl-4 space-y-1 text-xs text-slate-300 print:text-black/85">
                <li>
                  <strong>AURA OS — Universal Conversational Multi-Agent Autonomous Assistant</strong> (Python, FastAPI, WebSockets, Multi-Agent Architecture, LLM Orchestration, AsyncIO, Headless Automation, Flutter): Architected and developed a full-scale autonomous multi-agent OS capable of conversational task delegation, real-time WebSocket communication, and cross-platform mobile delivery via Flutter.
                </li>
                <li>
                  Developing LLM-based applications and conversational web extensions for intelligent user interaction and task automation, enabling context-aware multi-turn dialogue.
                </li>
                <li>
                  Building vision-based lip-sync recommendation systems for marketplace applications using real-time facial landmark tracking, enhancing visual content quality and user engagement.
                </li>
                <li>
                  Engineering AI-powered teacher monitoring systems using computer vision to automate classroom attendance, in-time/out-time tracking, and activity detection.
                </li>
              </ul>
            </div>

            {/* Nexl Tech */}
            <div>
              <div className="flex justify-between items-baseline font-semibold text-white print:text-black">
                <span>AI & Machine Learning Engineer (Intern) | <span className="text-primary print:text-teal-800">Nexl Tech</span></span>
                <span className="font-mono text-xs">Apr 2025 – Dec 2025</span>
              </div>
              <p className="text-[11px] text-slate-400 print:text-black/70 mb-1">Pakistan (On-site)</p>
              <ul className="list-disc pl-4 space-y-1 text-xs text-slate-300 print:text-black/85">
                <li>
                  Developed RAG-based chatbots and LLM applications for enterprise document intelligence using LangChain, Vector Databases (FAISS/Pinecone), and FastAPI.
                </li>
                <li>
                  Designed and trained ML and Deep Learning pipelines (CNN, LSTM, Transformers) with systematic hyperparameter tuning, improving model accuracy and robustness for production deployment.
                </li>
              </ul>
            </div>

            {/* Arch Technologies */}
            <div>
              <div className="flex justify-between items-baseline font-semibold text-white print:text-black">
                <span>Data Science & ML Engineer (Intern) | <span className="text-primary print:text-teal-800">Arch Technologies</span></span>
                <span className="font-mono text-xs">2025</span>
              </div>
              <p className="text-[11px] text-slate-400 print:text-black/70 mb-1">Islamabad, Pakistan (Remote)</p>
              <ul className="list-disc pl-4 space-y-1 text-xs text-slate-300 print:text-black/85">
                <li>
                  Delivered end-to-end ML solutions: data preprocessing, feature engineering, model development, evaluation, and visualization using Python, Scikit-learn, and Pandas.
                </li>
                <li>
                  Contributed to predictive modeling workflows supporting business decision-making with interpretable model outputs and automated reporting pipelines.
                </li>
              </ul>
            </div>

            {/* Upwork */}
            <div>
              <div className="flex justify-between items-baseline font-semibold text-white print:text-black">
                <span>AI/ML Consultant & Developer (Freelance) | <span className="text-primary print:text-teal-800">Upwork</span></span>
                <span className="font-mono text-xs">2025 – Present</span>
              </div>
              <p className="text-[11px] text-slate-400 print:text-black/70 mb-1">Remote (International Clients)</p>
              <ul className="list-disc pl-4 space-y-1 text-xs text-slate-300 print:text-black/85">
                <li>
                  Delivered Computer Vision and ML solutions: YOLO-based detection systems, OCR pipelines (EasyOCR/PaddleOCR), image segmentation, and churn prediction models for international clients.
                </li>
                <li>
                  Managed complete project lifecycle — data annotation, model training, evaluation, and documented delivery — maintaining high client satisfaction.
                </li>
              </ul>
            </div>

            {/* University Work Experience */}
            <div>
              <div className="flex justify-between items-baseline font-semibold text-white print:text-black">
                <span>UNIVERSITY WORK EXPERIENCE — LEARN WHILE YOU EARN PROGRAMME</span>
                <span className="font-mono text-xs">2022 – 2026</span>
              </div>
              <p className="text-[11px] text-slate-400 print:text-black/70 mb-1">
                Paid, part-time work-integrated learning programme at GIFT University, running alongside degree study.
              </p>
              <ul className="list-disc pl-4 space-y-1 text-xs text-slate-300 print:text-black/85">
                <li>
                  <strong>Student Facilitator | Student Facilitation Center (SFC):</strong> Primary point of contact for students, faculty, and visitors; coordinated teams and helped organize university events.
                </li>
                <li>
                  <strong>Library Assistant | University Library:</strong> Managed resource cataloguing and inventory systems; supported students and faculty in resource discovery and research navigation.
                </li>
                <li>
                  <strong>IT Department Assistant | IT Department:</strong> Provided hardware support, troubleshooting, and maintenance for university computing and networking infrastructure.
                </li>
                <li>
                  <strong>Sales, Purchasing & Operations Assistant | SFADA — School of Arts and Designing:</strong> Managed procurement, vendor coordination, and sales operations, with exposure to budgeting and cost management.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Key Projects */}
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-primary print:text-teal-900 border-b border-slate-800 print:border-black/20 pb-1 mb-3">
            Key Projects
          </h2>
          <div className="space-y-3 text-xs sm:text-sm">
            <div>
              <strong className="text-white print:text-black">3D Brain Tumor Segmentation</strong> — <span className="text-slate-400 print:text-black/70">Attention U-Net · PyTorch · BraTS 2020</span>
              <p className="text-xs text-slate-300 print:text-black/80">Achieved 99.64% validation accuracy and 0.986 IoU on 3D MRI volumes using attention-gated U-Net architecture for volumetric medical image segmentation.</p>
            </div>
            <div>
              <strong className="text-white print:text-black">Application Tracking System via RAG</strong> — <span className="text-slate-400 print:text-black/70">LangChain · LLMs · Vector DB · FastAPI</span>
              <p className="text-xs text-slate-300 print:text-black/80">Intelligent ATS chatbot for automated resume screening and candidate ranking using retrieval-augmented generation, reducing manual screening effort significantly.</p>
            </div>
            <div>
              <strong className="text-white print:text-black">Fire & Smoke Detection — Drone Surveillance</strong> — <span className="text-slate-400 print:text-black/70">YOLOv8 · PyTorch · OpenCV</span>
              <p className="text-xs text-slate-300 print:text-black/80">Trained YOLOv8 on 22,000+ aerial images for real-time fire/smoke detection with automated alerting system deployable on drone surveillance feeds.</p>
            </div>
            <div>
              <strong className="text-white print:text-black">PPE Safety Compliance System</strong> — <span className="text-slate-400 print:text-black/70">YOLOv8 · OpenCV · Streamlit</span>
              <p className="text-xs text-slate-300 print:text-black/80">Deployed helmet and safety-vest detection on live CCTV feeds achieving 91% precision, enabling automated industrial safety compliance monitoring.</p>
            </div>
            <div>
              <strong className="text-white print:text-black">GmailDraft — AI Email Assistant</strong> — <span className="text-slate-400 print:text-black/70">Next.js · Llama 3.3 · Gmail API</span>
              <p className="text-xs text-slate-300 print:text-black/80">Autonomous background agent monitoring Gmail inboxes, classifying intent, and auto-generating contextual draft replies, reducing manual email handling time.</p>
            </div>
            <div>
              <strong className="text-white print:text-black">Invoice Data Extraction (OCR Pipeline)</strong> — <span className="text-slate-400 print:text-black/70">EasyOCR · PaddleOCR · Python</span>
              <p className="text-xs text-slate-300 print:text-black/80">OCR pipeline converting scanned invoices to structured Excel output, eliminating manual data entry for business clients.</p>
            </div>
          </div>
        </section>

        {/* Research */}
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-primary print:text-teal-900 border-b border-slate-800 print:border-black/20 pb-1 mb-2">
            Research
          </h2>
          <ul className="list-disc pl-4 space-y-1.5 text-xs text-slate-300 print:text-black/85">
            <li>
              <strong>Final Year Project (2026):</strong> Enhancing Referring Remote Sensing Image Segmentation through Optimal Transport Alignment and Segment Anything Model (SAM)
            </li>
            <li>
              <strong>Survey Paper (In Progress):</strong> A Comprehensive Survey of Referring Remote Sensing Image Segmentation — From Supervised Cross-Modal Learning to Multimodal Foundation Models
            </li>
            <li>
              <strong>Research Paper:</strong> COVID-19 Detection from CT Scan Images using Topological Data Analysis and CNN Ensemble
            </li>
          </ul>
        </section>

        {/* Achievements & Awards */}
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-primary print:text-teal-900 border-b border-slate-800 print:border-black/20 pb-1 mb-2">
            Achievements & Awards
          </h2>
          <ul className="list-disc pl-4 space-y-1 text-xs text-slate-300 print:text-black/85">
            <li><strong>4th Place (out of 64 teams)</strong> — GIFT University Final Year Project Display 2026</li>
            <li><strong>90th Percentile</strong> — Pakistan National Skills Competency Test 2026 (34,000+ participants)</li>
            <li><strong>Top 100 Globally</strong> — USAII Global AI Hackathon: Built CogniFlow, AI cognitive load estimation and action planning system</li>
            <li><strong>Harvard Health Systems Innovation Lab (HSIL), 7th Edition (Onsite):</strong> AI mental health monitoring platform with digital phenotyping and CBT-based interventions</li>
            <li><strong>lablab.ai — Bright Data Hackathon:</strong> VendorSentinel, AI-powered vendor risk intelligence platform with real-time web data and risk scoring engine</li>
            <li><strong>lablab.ai — Enterprise AI Hackathon:</strong> NeuralNexus, multi-agent financial intelligence system for contradiction detection and proactive insight surfacing</li>
          </ul>
        </section>

        {/* Technical Skills */}
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-primary print:text-teal-900 border-b border-slate-800 print:border-black/20 pb-1 mb-2">
            Technical Skills
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300 print:text-black/90">
            <div><strong className="text-white print:text-black">Programming:</strong> Python · SQL · R · C++ · Java</div>
            <div><strong className="text-white print:text-black">Machine Learning:</strong> Scikit-learn · XGBoost · LightGBM · CatBoost · Feature Engineering · Model Evaluation</div>
            <div><strong className="text-white print:text-black">Deep Learning:</strong> PyTorch · TensorFlow · Keras · CNNs · LSTM · Transformers · Transfer Learning · Fine-Tuning</div>
            <div><strong className="text-white print:text-black">Computer Vision:</strong> OpenCV · YOLOv8/v11 · U-Net · SAM · DeepSORT · ByteTrack · EasyOCR · PaddleOCR · Tesseract</div>
            <div><strong className="text-white print:text-black">LLMs & GenAI:</strong> LangChain · RAG Pipelines · Multi-Agent Systems · Hugging Face · Prompt Engineering · Vector Databases</div>
            <div><strong className="text-white print:text-black">Data Science:</strong> Pandas · NumPy · Matplotlib · Statistical Analysis · Data Visualization · Power BI</div>
            <div className="sm:col-span-2"><strong className="text-white print:text-black">Tools & DevOps:</strong> Git/GitHub · Docker · FastAPI · Streamlit · WebSockets · AsyncIO · MySQL · PostgreSQL · MongoDB</div>
          </div>
        </section>

        {/* Certifications */}
        <section>
          <h2 className="text-xs font-bold uppercase tracking-wider text-primary print:text-teal-900 border-b border-slate-800 print:border-black/20 pb-1 mb-2">
            Certifications
          </h2>
          <p className="text-xs text-slate-300 print:text-black/90 leading-relaxed">
            Agentic AI and AI Agents: A Primer for Leaders · Programming with Generative AI (IIT) · Applied Data Science with Python · Machine Learning with Python · Introduction to Computer Vision and Image Processing · Deep Learning with PyTorch · AI Capstone Project with Deep Learning · GitHub Global Campus — Student Developer Pack
          </p>
        </section>
      </article>
    </div>
  )
}
