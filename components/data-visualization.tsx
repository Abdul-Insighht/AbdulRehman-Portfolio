"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
    BarChart3,
    ScatterChart,
    PieChart,
    MapPin,
    LineChart,
    Network,
    Layers,
    Activity,
    Sliders,
    Sparkles,
    CheckCircle2,
    ArrowUpRight,
} from "lucide-react"

interface VizCategory {
    id: string
    title: string
    category: string
    icon: any
    description: string
    metrics: string
    tools: string[]
    examples: string[]
    visualPreview: {
        type: "bar" | "scatter" | "line" | "radar"
        highlight: string
    }
}

const vizCategories: VizCategory[] = [
    {
        id: "model-analytics",
        title: "Model Performance & Loss Curves",
        category: "Deep Learning Evaluation",
        icon: Activity,
        description:
            "ROC-AUC curves, Precision-Recall curves, multi-class confusion matrices, and validation loss trajectories for medical diagnostic pipelines.",
        metrics: "99.64% BraTS U-Net & 98.93% COVID CT Ensemble",
        tools: ["TensorBoard", "Weights & Biases", "Matplotlib", "Seaborn"],
        examples: [
            "BraTS Brain Tumor Segmentation cross-entropy vs Dice loss",
            "COVID CT Fuzzy Rank Ensemble probability distribution calibration",
            "Learning rate schedule decay & early-stopping checkpoints",
        ],
        visualPreview: {
            type: "line",
            highlight: "Epoch 80 Peak F1-Score: 0.9942",
        },
    },
    {
        id: "latent-embeddings",
        title: "High-Dimensional Latent Projections",
        category: "Representation Learning",
        icon: ScatterChart,
        description:
            "t-SNE, UMAP, and PCA dimensionality reduction projections visualizing feature cluster separation across neural backbone layers.",
        metrics: "512-dim to 2D manifold with preserved topology",
        tools: ["UMAP-learn", "OpenTSNE", "Plotly Express", "Scikit-Learn"],
        examples: [
            "Vision Transformer (ViT) patch embedding clustering",
            "Multi-modal text-image contrastive embedding alignment (CLIP)",
            "Pathology slide feature space anomaly isolation",
        ],
        visualPreview: {
            type: "scatter",
            highlight: "Cluster Silhouette Score: 0.884",
        },
    },
    {
        id: "statistical-distribution",
        title: "Statistical & Exploratory EDA",
        category: "Numeric & Tabular Data",
        icon: BarChart3,
        description:
            "Violin plots, kernel density estimations (KDE), outlier box plots, and feature correlation heatmaps with Pearson/Spearman coefficients.",
        metrics: "100K+ Tabular Records Automated Screening",
        tools: ["Seaborn", "Pandas", "Scipy Stats", "Plotly"],
        examples: [
            "Patient biometric distribution & skewness rectification",
            "Feature multicollinearity diagnostics via VIF & heatmaps",
            "Hypothesis testing & p-value significance bounds",
        ],
        visualPreview: {
            type: "bar",
            highlight: "Spearman Rho Rank Matrix: 0.91",
        },
    },
    {
        id: "geospatial-heatmaps",
        title: "Geospatial & Spatial Heatmaps",
        category: "Spatial & Remote Sensing",
        icon: MapPin,
        description:
            "Choropleth mapping, satellite multi-spectral band overlays, and spatial density heatmaps for agricultural and remote sensing analytics.",
        metrics: "Multi-band Sentinel & Landsat GeoTIFF Processing",
        tools: ["Folium", "GeoPandas", "Rasterio", "Plotly Mapbox"],
        examples: [
            "Referring Remote Sensing (RRSIS) segmentation mask overlays",
            "Agricultural crop health NDVI time-lapse heatmaps",
            "Urban infrastructure expansion & terrain change detection",
        ],
        visualPreview: {
            type: "radar",
            highlight: "NDVI Vegetation Index Band Delta: +24%",
        },
    },
    {
        id: "agent-telemetry",
        title: "Agent Telemetry & Knowledge Graphs",
        category: "Agentic AI & RAG",
        icon: Network,
        description:
            "Graph topologies, LangGraph state machine execution paths, vector database retrieval recall histograms, and LLM token latency waterfalls.",
        metrics: "Sub-200ms Token TTFT & Vector Distance Scoring",
        tools: ["NetworkX", "Langfuse", "Graphviz", "D3.js"],
        examples: [
            "Multi-agent reasoning branches & supervisory decision trees",
            "ChromaDB / Pinecone cosine similarity distance distribution",
            "RAG context reranking score waterfalls (Cross-Encoder vs Bi-Encoder)",
        ],
        visualPreview: {
            type: "line",
            highlight: "Average Vector Cosine Similarity: 0.892",
        },
    },
    {
        id: "interactive-dashboards",
        title: "Interactive Production Dashboards",
        category: "Full-Stack BI & Analytics",
        icon: Layers,
        description:
            "Real-time dynamic dashboards with cross-filtering, live model inference counters, client KPI monitors, and downloadable analytical reports.",
        metrics: "Sub-second cross-filter updates & PDF/CSV exports",
        tools: ["Streamlit", "Power BI", "Dash", "Next.js Tailwind"],
        examples: [
            "Real-time computer vision inference throughput monitor",
            "Clinical decision support dashboard for diagnostic triage",
            "Client analytics summary with exportable audit logs",
        ],
        visualPreview: {
            type: "bar",
            highlight: "Real-time Telemetry: 142 FPS aggregate",
        },
    },
]

export default function DataVisualization() {
    const [activeId, setActiveId] = useState<string>("model-analytics")
    const activeViz = vizCategories.find((v) => v.id === activeId) || vizCategories[0]

    return (
        <section id="visualization" className="py-24 relative overflow-hidden bg-background">
            {/* Ambient Background Gradient */}
            <div className="absolute inset-0 pointer-events-none opacity-30">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-mono uppercase tracking-widest mb-4"
                    >
                        <BarChart3 className="w-3.5 h-3.5" />
                        Visual Analytics & Telemetry
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4"
                    >
                        Data Visualization &{" "}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-cyan-400 to-teal-300">
                            Model Intelligence
                        </span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-muted-foreground text-sm sm:text-base leading-relaxed"
                    >
                        Transforming high-dimensional neural representations, empirical training trajectories,
                        and complex agent topologies into clear, interactive, and actionable visual narratives.
                    </motion.p>
                </div>

                {/* Main Interactive Showcase Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left: Category Navigation Cards (5 cols) */}
                    <div className="lg:col-span-5 space-y-3">
                        <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-2">
                            <Sliders className="w-3.5 h-3.5 text-primary" />
                            Select Visualization Modality ({vizCategories.length})
                        </div>

                        {vizCategories.map((viz) => {
                            const Icon = viz.icon
                            const isActive = viz.id === activeId

                            return (
                                <button
                                    key={viz.id}
                                    onClick={() => setActiveId(viz.id)}
                                    className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-start gap-4 ${
                                        isActive
                                            ? "border-primary/50 bg-primary/10 shadow-lg shadow-primary/5 scale-[1.01]"
                                            : "border-border/50 bg-card/40 hover:bg-card hover:border-border"
                                    }`}
                                >
                                    <div
                                        className={`p-2.5 rounded-lg flex-shrink-0 transition-colors ${
                                            isActive
                                                ? "bg-primary text-primary-foreground shadow-md shadow-primary/30"
                                                : "bg-muted text-muted-foreground"
                                        }`}
                                    >
                                        <Icon className="w-5 h-5" />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between gap-2 mb-1">
                                            <span className="text-sm font-semibold truncate text-foreground">
                                                {viz.title}
                                            </span>
                                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-muted/60 text-muted-foreground whitespace-nowrap">
                                                {viz.category}
                                            </span>
                                        </div>
                                        <p className="text-xs text-muted-foreground line-clamp-1">
                                            {viz.description}
                                        </p>
                                    </div>
                                </button>
                            )
                        })}
                    </div>

                    {/* Right: Detailed Deep-Dive Card (7 cols) */}
                    <motion.div
                        key={activeViz.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                        className="lg:col-span-7 rounded-2xl border border-primary/30 bg-card/80 backdrop-blur-xl p-6 sm:p-8 shadow-xl relative overflow-hidden"
                    >
                        {/* Glow accent */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

                        {/* Card Header */}
                        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-border/50">
                            <div>
                                <span className="text-xs font-mono uppercase tracking-wider text-primary font-semibold">
                                    {activeViz.category}
                                </span>
                                <h3 className="text-2xl font-bold text-foreground mt-1">
                                    {activeViz.title}
                                </h3>
                            </div>
                            <div className="px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono text-primary flex items-center gap-1.5">
                                <Sparkles className="w-3.5 h-3.5" />
                                {activeViz.metrics}
                            </div>
                        </div>

                        {/* Description */}
                        <p className="text-sm text-muted-foreground leading-relaxed mt-6">
                            {activeViz.description}
                        </p>

                        {/* Interactive Visual Graphic Simulation */}
                        <div className="mt-6 p-5 rounded-xl border border-border/60 bg-background/60">
                            <div className="flex items-center justify-between text-xs font-mono text-muted-foreground mb-4">
                                <span className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
                                    Telemetry Stream Simulator
                                </span>
                                <span className="text-primary font-semibold">
                                    {activeViz.visualPreview.highlight}
                                </span>
                            </div>

                            {/* Simulated Chart Bars / Curves */}
                            <div className="space-y-3">
                                {[
                                    { label: "Metric Convergence", val: 94, color: "from-primary to-cyan-400" },
                                    { label: "Validation Stability", val: 98, color: "from-teal-400 to-primary" },
                                    { label: "Cluster Separation", val: 89, color: "from-cyan-400 to-blue-500" },
                                ].map((bar, idx) => (
                                    <div key={idx} className="space-y-1">
                                        <div className="flex justify-between text-xs font-mono">
                                            <span className="text-muted-foreground">{bar.label}</span>
                                            <span className="text-foreground font-semibold">{bar.val}%</span>
                                        </div>
                                        <div className="h-2 w-full bg-muted/40 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${bar.val}%` }}
                                                transition={{ duration: 0.8, delay: idx * 0.15 }}
                                                className={`h-full bg-gradient-to-r ${bar.color} rounded-full`}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Applied Examples */}
                        <div className="mt-6 space-y-2">
                            <h4 className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                                Empirical Implementations:
                            </h4>
                            <div className="space-y-2">
                                {activeViz.examples.map((ex, i) => (
                                    <div
                                        key={i}
                                        className="flex items-start gap-2.5 text-xs text-foreground/90 p-2.5 rounded-lg bg-muted/20 border border-border/30"
                                    >
                                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                                        <span>{ex}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Tools Badges */}
                        <div className="mt-6 pt-6 border-t border-border/50 flex flex-wrap items-center gap-2">
                            <span className="text-xs font-mono text-muted-foreground mr-1">
                                Toolchain:
                            </span>
                            {activeViz.tools.map((tool, i) => (
                                <span
                                    key={i}
                                    className="px-2.5 py-1 rounded-md text-xs font-mono bg-muted/50 border border-border/60 text-foreground"
                                >
                                    {tool}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
