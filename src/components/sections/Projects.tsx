"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { PinContainer } from "@/components/ui/3d-pin"
import { SectionLabel } from "@/components/ui/SectionLabel"

const PROJECTS = [
  {
    category: "AI Operations",
    title: "Atlas Support Copilot",
    summary:
      "An internal agent workspace for support teams with retrieval, triage automation, and workflow analytics.",
    metrics: ["43% faster response handling", "8 integrations", "Role-based dashboard"],
  },
  {
    category: "SaaS Platform",
    title: "Northstar Revenue OS",
    summary:
      "A subscription platform with billing, role permissions, reporting, and onboarding systems for growth teams.",
    metrics: ["Launched in 10 weeks", "Multi-tenant architecture", "Stripe and CRM sync"],
  },
  {
    category: "Healthtech Product",
    title: "Pulse Remote Care",
    summary:
      "A patient operations platform that unified care coordination, scheduling, and clinician visibility across teams.",
    metrics: ["Operational visibility", "Mobile-first workflows", "HIPAA-aware architecture"],
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

export function Projects() {
  return (
    <section id="projects" className="py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <SectionLabel className="mb-6">Selected Work</SectionLabel>
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="font-heading text-4xl font-bold tracking-tight text-zyra-text-primary sm:text-5xl lg:text-6xl"
            >
              Products With Real Operational Depth
            </motion.h2>
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="mt-6 text-lg text-zyra-text-secondary"
            >
              We focus on systems that teams depend on daily, not decorative launch pages with shallow foundations.
            </motion.p>
          </div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 self-start rounded-full border border-zyra-border-default px-5 py-3 text-sm font-medium text-zyra-text-primary transition-colors hover:border-zyra-accent-neon hover:text-zyra-accent-neon"
          >
            View all case studies
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-16 grid gap-6 xl:grid-cols-3">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={project.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ delay: index * 0.08 }}
            >
              <PinContainer title={project.category} className="h-full" containerClassName="h-full">
                <article className="group overflow-hidden rounded-3xl border border-zyra-border-subtle bg-zyra-bg-card">
                  <div className="h-56 bg-[radial-gradient(circle_at_top_left,rgba(57,255,135,0.18),transparent_45%),linear-gradient(160deg,#1a1a1a_0%,#090909_100%)] p-8">
                    <p className="text-xs uppercase tracking-[0.26em] text-zyra-accent-neon">
                      {project.category}
                    </p>
                    <h3 className="mt-4 font-heading text-3xl font-semibold text-zyra-text-primary">
                      {project.title}
                    </h3>
                  </div>
                  <div className="p-8">
                    <p className="leading-relaxed text-zyra-text-secondary">
                      {project.summary}
                    </p>
                    <ul className="mt-6 space-y-3 text-sm text-zyra-text-secondary">
                      {project.metrics.map((metric) => (
                        <li key={metric} className="flex items-center gap-3">
                          <span className="h-2 w-2 rounded-full bg-zyra-accent-neon" />
                          <span>{metric}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </PinContainer>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}