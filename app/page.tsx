import { Suspense } from "react"
import Hero from "@/components/hero"
import About from "@/components/about"
import TechStack from "@/components/tech-stack"
import Experience from "@/components/experience"
import Education from "@/components/education"
import Projects from "@/components/projects"
import Loading from "@/components/loading"

export default function Home() {
    return (
        <div>
            <Suspense fallback={<Loading />}>
                <Hero />
                <About />
                <TechStack />
                <Experience />
                <Education />
                <Projects />
            </Suspense>
        </div>
    )
}

