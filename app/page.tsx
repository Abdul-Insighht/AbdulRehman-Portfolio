import { Suspense } from "react"
import Hero from "@/components/hero"
import MeetHafiz from "@/components/meet-hafiz"
import About from "@/components/about"
import Services from "@/components/services"
import TechStack from "@/components/tech-stack"
import Projects from "@/components/projects"
import DataVisualization from "@/components/data-visualization"
import ResearchPublications from "@/components/research-publications"
import Supervisions from "@/components/supervisions"
import Certificates from "@/components/certificates"
import Experience from "@/components/experience"
import Education from "@/components/education"
import ContactForm from "@/components/contact-form"
import Signature from "@/components/signature"
import Loading from "@/components/loading"

export default function Home() {
    return (
        <div>
            <Suspense fallback={<Loading />}>
                <Hero />
                <MeetHafiz />
                <About />
                <Services />
                <TechStack />
                <Projects />
                <DataVisualization />
                <ResearchPublications />
                <Supervisions />
                <Certificates />
                <Experience />
                <Education />
                <ContactForm />
                <Signature />
            </Suspense>
        </div>
    )
}
