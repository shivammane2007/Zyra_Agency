"use client"

import { motion } from "framer-motion"
import { Quote } from "lucide-react"
import { AnimatedCounter } from "@/components/ui/AnimatedCounter"
import { SectionLabel } from "@/components/ui/SectionLabel"

const STATS = [
  { value: 32, suffix: "%", label: "Average ops efficiency gain" },
  { value: 3, suffix: "x", label: "Faster product experimentation" },
  { value: 18, suffix: "+", label: "Integrated product systems" },
]

const QUOTES = [
  {
    quote:
      "Zyra moved like an internal product team. Design, architecture, and delivery all stayed aligned from week one.",
    author: "Founder, SaaS analytics company",
  },
  {
    quote:
      "They were able to turn a messy brief into a clear product system and a production-ready release plan extremely fast.",
    author: "Head of Operations, healthcare platform",
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
}

export function Results() {
  return (
    <section id="results" className="py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <SectionLabel className="mb-6">Results</SectionLabel>
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="font-heading text-4xl font-bold tracking-tight text-zyra-text-primary sm:text-5xl lg:text-6xl"
          >
            Outcomes That Compound After Launch
          </motion.h2>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="grid gap-6 md:grid-cols-3">
            {STATS.map((stat) => (
              <motion.div
                key={stat.label}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="rounded-3xl border border-zyra-border-subtle bg-zyra-bg-card p-8"
              >
                <div className="font-heading text-4xl font-bold text-zyra-text-primary sm:text-5xl">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="mt-4 leading-relaxed text-zyra-text-secondary">{stat.label}</p>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="rounded-3xl border border-zyra-border-subtle bg-zyra-bg-card p-8"
          >
            <Quote className="h-8 w-8 text-zyra-accent-neon" />
            <div className="mt-8 space-y-8">
              {QUOTES.map((item) => (
                <blockquote key={item.author}>
                  <p className="text-lg leading-relaxed text-zyra-text-primary">
                    {item.quote}
                  </p>
                  <footer className="mt-4 text-sm uppercase tracking-[0.2em] text-zyra-text-secondary">
                    {item.author}
                  </footer>
                </blockquote>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}