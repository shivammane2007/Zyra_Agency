"use client"

import { ChevronRight } from "lucide-react"
import { HeroBackground } from "@/components/ui/hero-section"
import { Button } from "@/components/ui/button"

interface HeroProps {
  eyebrow?: string
  title?: string
  subtitle?: string
  ctaLabel?: string
  ctaHref?: string
}

export function Hero({
  eyebrow = "Available for New Projects",
  title = "Design is Everything",
  subtitle = "Unleashing creativity through bold visuals, seamless interfaces, and limitless possibilities.",
  ctaLabel = "Let's Go",
  ctaHref = "#",
}: HeroProps) {
  return (
    <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden px-6 text-center">
      {/* Grid background */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:60px_60px]" />
      {/* Top gradient fade */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black via-black/80 to-transparent" />
      {/* Subtle noise texture */}
      <div className="absolute inset-0 -z-10 opacity-20 bg-[url('/noise.png')]"/>
      {/* Bottom horizon glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120%] h-[220px] bg-gradient-to-t from-white/20 via-white/10 to-transparent blur-[80px] opacity-60 rounded-[100%]" />

      <div className="max-w-5xl mx-auto">
        {/* Top badge */}
        <div className="mb-6 flex justify-center">
          <span className="rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs tracking-widest text-white/70">
            NEXT-GEN PRODUCTIVITY
          </span>
        </div>
        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-[1.1]">
          Build smarter tools for modern teams
        </h1>
        {/* Subheading */}
        <p className="mt-6 text-lg md:text-xl text-white/60 max-w-3xl mx-auto">
          Streamline your workflow and boost productivity with intuitive solutions. Security, speed, and simplicity—all in one platform.
        </p>
        {/* CTA */}
        <div className="mt-10 flex justify-center">
          <button className="rounded-lg bg-white text-black px-6 py-3 font-medium hover:bg-white/90 transition">
            Get Started
          </button>
        </div>
      </div>
    </section>
  )
}
