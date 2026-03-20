import Navbar from "@/components/navbar/Navbar"
import { CTA } from "@/components/sections/CTA"
import { Footer } from "@/components/sections/Footer"
import { Philosophy } from "@/components/sections/Philosophy"
import Team from "@/components/sections/Team"
import { SectionLabel } from "@/components/ui/SectionLabel"
import { PracticalEffect } from "@/components/ui/practical_effect"

export default function TeamPage() {
  return (
    <>
      <Navbar />
      <div className="relative isolate">
        <PracticalEffect className="-z-10 opacity-40 [mask-image:linear-gradient(to_bottom,transparent_0,black_8rem,black_calc(100%-4rem),transparent_100%)]" />
        <div className="relative z-10">
          <main className="min-h-screen pt-32">
            <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
              <SectionLabel className="mb-6">Team</SectionLabel>
              <h1 className="max-w-4xl font-heading text-5xl font-bold tracking-tight text-zyra-text-primary sm:text-6xl lg:text-7xl">
                A Tight Senior Team With Product Judgment
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-zyra-text-secondary">
                Our operating model stays lean so decision-makers work directly with the people shaping design, architecture, and release quality.
              </p>
            </section>
            <Team />
            <Philosophy />
            <CTA />
          </main>
          <Footer />
        </div>
      </div>
    </>
  )
}