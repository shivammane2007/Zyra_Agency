"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { SectionLabel } from "@/components/ui/SectionLabel"

const TEAM = [
  {
    name: "Strategy Lead",
    role: "Product direction",
    description:
      "Translates business goals into release priorities, product decisions, and measurable roadmap outcomes.",
  },
  {
    name: "Design Lead",
    role: "Experience systems",
    description:
      "Shapes visual identity, interfaces, and interaction models that feel premium while staying easy to use.",
  },
  {
    name: "Engineering Lead",
    role: "Architecture and delivery",
    description:
      "Owns implementation quality across frontend, backend, integrations, infrastructure, and release mechanics.",
  },
  {
    name: "QA and Ops",
    role: "Reliability",
    description:
      "Covers validation, launch readiness, analytics, and post-release iteration so the product keeps improving.",
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

export function Team() {
  return (
    <section id="team" className="py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <SectionLabel className="mb-6">Team</SectionLabel>
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="font-heading text-4xl font-bold tracking-tight text-zyra-text-primary sm:text-5xl lg:text-6xl"
            >
              Senior Execution Without Agency Bloat
            </motion.h2>
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="mt-6 text-lg text-zyra-text-secondary"
            >
              Small, focused senior teams outperform oversized delivery chains when the goal is product quality and speed.
            </motion.p>
          </div>
          <Link
            href="/team"
            className="inline-flex items-center gap-2 self-start rounded-full border border-zyra-border-default px-5 py-3 text-sm font-medium text-zyra-text-primary transition-colors hover:border-zyra-accent-neon hover:text-zyra-accent-neon"
          >
            Meet the team
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {TEAM.map((member, index) => (
            <motion.article
              key={member.name}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ delay: index * 0.06 }}
              className="rounded-3xl border border-zyra-border-subtle bg-zyra-bg-card p-8"
            >
              <div className="mb-8 h-40 rounded-2xl bg-[radial-gradient(circle_at_top,rgba(57,255,135,0.18),transparent_50%),linear-gradient(160deg,#171717_0%,#0b0b0b_100%)]" />
              <p className="text-xs uppercase tracking-[0.24em] text-zyra-accent-neon">
                {member.role}
              </p>
              <h3 className="mt-4 font-heading text-2xl font-semibold text-zyra-text-primary">
                {member.name}
              </h3>
              <p className="mt-4 leading-relaxed text-zyra-text-secondary">
                {member.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}