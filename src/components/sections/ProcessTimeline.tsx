"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { FileSearch, Figma, Hammer, Radar } from "lucide-react"
import { SectionLabel } from "@/components/ui/SectionLabel"
import RadialOrbitalTimeline, { type TimelineItem } from "@/components/ui/radial-orbital-timeline"

const PHASES = [
  {
    id: 1,
    icon: FileSearch,
    phase: "Week 01",
    title: "Discovery Sprint",
    description:
      "We align on business goals, user journeys, and technical constraints to define what should be built first.",
    deliverables: ["Product brief", "Scope map", "Technical recommendation"],
    status: "completed" as const,
    energy: 100,
    relatedIds: [2],
  },
  {
    id: 2,
    icon: Figma,
    phase: "Week 02-03",
    title: "Design Direction",
    description:
      "Wireframes and polished interface systems convert product assumptions into validated screens and flows.",
    deliverables: ["UX flows", "Design system", "High-fidelity screens"],
    status: "completed" as const,
    energy: 82,
    relatedIds: [1, 3],
  },
  {
    id: 3,
    icon: Hammer,
    phase: "Week 04-08",
    title: "Build Cycle",
    description:
      "Engineering proceeds in scoped milestones with reviews, demos, and continuous QA across the stack.",
    deliverables: ["Core product build", "Integrations", "Staging deployment"],
    status: "in-progress" as const,
    energy: 68,
    relatedIds: [2, 4],
  },
  {
    id: 4,
    icon: Radar,
    phase: "Week 09+",
    title: "Launch and Iterate",
    description:
      "After release, we track user behavior, measure product health, and prioritize the next wave of improvements.",
    deliverables: ["Production rollout", "Monitoring", "Growth backlog"],
    status: "pending" as const,
    energy: 34,
    relatedIds: [3],
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
  const timelineData = React.useMemo<TimelineItem[]>(
    () =>
      PHASES.map((phase) => ({
        id: phase.id,
        title: phase.title,
        date: phase.phase,
        content: phase.description,
        category: "Delivery timeline",
        icon: phase.icon,
        relatedIds: phase.relatedIds,
        status: phase.status,
        energy: phase.energy,
        highlights: phase.deliverables,
      })),
    []
  )

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

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={fadeUp}
          className="mt-16"
        >
          <RadialOrbitalTimeline timelineData={timelineData} />
        </motion.div>
      </div>
    </section>
  )
}