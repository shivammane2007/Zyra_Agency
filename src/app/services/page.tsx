import { Navbar } from "@/components/navbar/Navbar"
import { CTA } from "@/components/sections/CTA"
import { Capabilities } from "@/components/sections/Capabilities"
import { Footer } from "@/components/sections/Footer"
import { ProcessTimeline } from "@/components/sections/ProcessTimeline"
import { WhatWeBuild } from "@/components/sections/WhatWeBuild"
import { SectionLabel } from "@/components/ui/SectionLabel"

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32">
        <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
          <SectionLabel className="mb-6">Services</SectionLabel>
          <h1 className="max-w-4xl font-heading text-5xl font-bold tracking-tight text-zyra-text-primary sm:text-6xl lg:text-7xl">
            Design, Engineering, and Product Delivery in One System
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-zyra-text-secondary">
            Zyra combines product strategy, interface design, full-stack engineering, and launch operations for teams that need experienced execution.
          </p>
        </section>
        <WhatWeBuild />
        <Capabilities />
        <ProcessTimeline />
        <CTA />
      </main>
      <Footer />
    </>
  )
}