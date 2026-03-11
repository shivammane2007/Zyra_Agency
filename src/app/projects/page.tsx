import { Navbar } from "@/components/navbar/Navbar"
import { CTA } from "@/components/sections/CTA"
import { Footer } from "@/components/sections/Footer"
import { Projects } from "@/components/sections/Projects"
import { Results } from "@/components/sections/Results"
import { SectionLabel } from "@/components/ui/SectionLabel"

export default function ProjectsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32">
        <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
          <SectionLabel className="mb-6">Projects</SectionLabel>
          <h1 className="max-w-4xl font-heading text-5xl font-bold tracking-tight text-zyra-text-primary sm:text-6xl lg:text-7xl">
            Product Work Built for Scale, Clarity, and Daily Use
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-zyra-text-secondary">
            We build software that sits inside real operational workflows. These examples show the kinds of systems Zyra is designed to deliver.
          </p>
        </section>
        <Projects />
        <Results />
        <CTA />
      </main>
      <Footer />
    </>
  )
}