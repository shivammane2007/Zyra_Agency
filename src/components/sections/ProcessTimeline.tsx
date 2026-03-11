"use client"

import { motion } from "framer-motion"
import { FileSearch, Figma, Hammer, Radar } from "lucide-react"
import { SectionLabel } from "@/components/ui/SectionLabel"

const PHASES = [
  {
    icon: FileSearch,
    phase: "Week 01",
    title: "Discovery Sprint",
    description:
      "We align on business goals, user journeys, and technical constraints to define what should be built first.",
    deliverables: ["Product brief", "Scope map", "Technical recommendation"],
  },
  {
    icon: Figma,
    phase: "Week 02-03",
    title: "Design Direction",
    description:
      "Wireframes and polished interface systems convert product assumptions into validated screens and flows.",
    deliverables: ["UX flows", "Design system", "High-fidelity screens"],
  },
  {
    icon: Hammer,
    phase: "Week 04-08",
    title: "Build Cycle",
    description:
      "Engineering proceeds in scoped milestones with reviews, demos, and continuous QA across the stack.",
    deliverables: ["Core product build", "Integrations", "Staging deployment"],
  },
  {
    icon: Radar,
    phase: "Week 09+",
    title: "Launch and Iterate",
    description:
      "After release, we track user behavior, measure product health, and prioritize the next wave of improvements.",
    deliverables: ["Production rollout", "Monitoring", "Growth backlog"],
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

export function ProcessTimeline() {
  return (
    <section id="timeline" className="py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <SectionLabel className="mb-6">Timeline</SectionLabel>
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="font-heading text-4xl font-bold tracking-tight text-zyra-text-primary sm:text-5xl lg:text-6xl"
          >
            A Clear Delivery Rhythm
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mt-6 max-w-3xl text-lg text-zyra-text-secondary"
          >
            Every engagement follows a visible sequence so product decisions, design quality, and engineering progress stay aligned.
          </motion.p>
        </div>

        <div className="relative mt-16 flex flex-col gap-0">
          {/* Vertical timeline line */}
          <div className="absolute left-8 top-8 bottom-8 hidden w-px bg-gradient-to-b from-zyra-accent-neon/60 via-zyra-accent-neon/20 to-transparent lg:block" />

          {PHASES.map((phase, index) => {
            const Icon = phase.icon

            return (
              <motion.article
                key={phase.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                transition={{ delay: index * 0.06 }}
                className="flex flex-col items-start gap-8 py-10 lg:flex-row lg:items-start lg:gap-16 lg:py-12"
              >
                {/* Left: icon visual box */}
                <div className="flex-shrink-0">
                  <div className="relative overflow-hidden rounded-3xl border border-zyra-border-subtle bg-zyra-bg-card p-8">
                    <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-zyra-accent-neon to-transparent" />
                    <div className="flex h-16 w-16 items-center justify-center rounded-lg border border-zyra-accent-neon/20 bg-zyra-accent-glow">
                      <Icon className="h-8 w-8 text-zyra-accent-neon" />
                    </div>
                    <p className="mt-4 text-xs uppercase tracking-[0.24em] text-zyra-accent-neon">
                      {phase.phase}
                    </p>
                  </div>
                </div>

                {/* Right: step content */}
                <div className="flex flex-col">
                  <h3 className="font-heading text-2xl font-semibold text-zyra-text-primary">
                    {phase.title}
                  </h3>
                  <p className="mt-4 max-w-xl text-zyra-text-secondary leading-relaxed">
                    {phase.description}
                  </p>
                  <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-sm text-zyra-text-secondary">
                    {phase.deliverables.map((item) => (
                      <li key={item} className="flex items-center gap-3">
                        <span className="h-2 w-2 rounded-full bg-zyra-accent-neon" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}