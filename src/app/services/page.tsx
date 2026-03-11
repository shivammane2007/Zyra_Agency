import { Navbar } from "@/components/navbar/Navbar"
import { CTA } from "@/components/sections/CTA"
import { Capabilities } from "@/components/sections/Capabilities"
import { Footer } from "@/components/sections/Footer"
import { ProcessTimeline } from "@/components/sections/ProcessTimeline"
import { WhatWeBuild } from "@/components/sections/WhatWeBuild"
import { SectionLabel } from "@/components/ui/SectionLabel"
import { ShootingStars } from "@/components/ui/shooting_star"

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <div className="relative isolate">
        <div className="pointer-events-none absolute inset-y-0 left-0 -z-10 hidden w-20 overflow-hidden opacity-35 lg:block xl:w-32 2xl:w-40">
          <ShootingStars className="[mask-image:linear-gradient(to_bottom,transparent_0,black_8rem,black_calc(100%-4rem),transparent_100%)]" />
        </div>
        <div className="pointer-events-none absolute inset-y-0 right-0 -z-10 hidden w-20 overflow-hidden opacity-35 lg:block xl:w-32 2xl:w-40">
          <ShootingStars className="[mask-image:linear-gradient(to_bottom,transparent_0,black_8rem,black_calc(100%-4rem),transparent_100%)]" />
        </div>
        <div className="relative z-10">
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
        </div>
      </div>
    </>
  )
}