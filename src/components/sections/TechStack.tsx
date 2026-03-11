"use client"

import { motion } from "framer-motion"
import { SectionLabel } from "@/components/ui/SectionLabel"

const STACK = [
  { label: "Frontend", items: ["Next.js", "React", "TypeScript", "Tailwind CSS"] },
  { label: "Backend", items: ["Node.js", "Python", "PostgreSQL", "REST and RPC APIs"] },
  { label: "AI", items: ["RAG pipelines", "Agent workflows", "Prompt systems", "Evaluation loops"] },
  { label: "Ops", items: ["Vercel", "Docker", "CI/CD", "Observability"] },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
}

export function TechStack() {
  return (
    <section id="tech-stack" className="py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <SectionLabel className="mb-6">Stack</SectionLabel>
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="font-heading text-4xl font-bold tracking-tight text-zyra-text-primary sm:text-5xl lg:text-6xl"
          >
            Modern Technology, Chosen Pragmatically
          </motion.h2>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-4">
          {STACK.map((group, index) => (
            <motion.article
              key={group.label}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ delay: index * 0.06 }}
              className="rounded-3xl border border-zyra-border-subtle bg-zyra-bg-card p-8"
            >
              <p className="text-xs uppercase tracking-[0.24em] text-zyra-accent-neon">
                {group.label}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-zyra-border-default bg-zyra-bg-primary px-4 py-2 text-sm text-zyra-text-secondary"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}