"use client"

import { motion } from "framer-motion"
import {
  Bot,
  CloudCog,
  Cpu,
  Gauge,
  Layers3,
  ShieldCheck,
} from "lucide-react"
import { AnimatedCounter } from "@/components/ui/AnimatedCounter"
import { PinContainer } from "@/components/ui/3d-pin"
import { GlowCard } from "@/components/ui/GlowCard"
import { SectionLabel } from "@/components/ui/SectionLabel"

const METRICS = [
  { value: 24, suffix: "+", label: "Products shipped" },
  { value: 99, suffix: "%", label: "Release stability" },
  { value: 12, suffix: "w", label: "Typical launch window" },
  { value: 4, suffix: "x", label: "Faster iteration cycles" },
]

const CAPABILITIES = [
  {
    icon: Layers3,
    title: "Product Systems",
    description:
      "Information architecture, component systems, and UX flows designed to stay coherent as features expand.",
  },
  {
    icon: Cpu,
    title: "Full-Stack Engineering",
    description:
      "Typed frontend and backend delivery across dashboards, APIs, authentication, billing, and infrastructure.",
  },
  {
    icon: Bot,
    title: "AI Workflows",
    description:
      "Model integration, retrieval pipelines, agent orchestration, and internal automation that fit real operations.",
  },
  {
    icon: Gauge,
    title: "Performance Tuning",
    description:
      "Speed, caching, observability, and rendering optimization handled before performance becomes a product risk.",
  },
  {
    icon: ShieldCheck,
    title: "Quality Control",
    description:
      "Release discipline through code review, testing strategy, validation, and deployment safeguards.",
  },
  {
    icon: CloudCog,
    title: "Launch Operations",
    description:
      "Production hosting, monitoring, analytics, and iteration loops set up for continuous post-launch growth.",
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

export function Capabilities() {
  return (
    <section id="capabilities" className="py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <SectionLabel className="mb-6">Capabilities</SectionLabel>
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="font-heading text-4xl font-bold tracking-tight text-zyra-text-primary sm:text-5xl lg:text-6xl"
          >
            Built for Ambitious Teams
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mt-6 max-w-3xl text-lg text-zyra-text-secondary"
          >
            We pair product thinking with delivery depth so founders move from concept to production without stitching together separate vendors.
          </motion.p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
          }}
          className="mt-16 grid gap-4 rounded-3xl border border-zyra-border-subtle bg-zyra-bg-card/50 p-6 sm:grid-cols-2 xl:grid-cols-4"
        >
          {METRICS.map((metric) => (
            <motion.div key={metric.label} variants={fadeUp}>
              <PinContainer title={metric.label} className="h-full" containerClassName="h-full">
                <div className="rounded-2xl border border-zyra-border-subtle bg-zyra-bg-primary/60 p-6 text-center">
                  <div className="font-heading text-4xl font-bold text-zyra-text-primary sm:text-5xl">
                    <AnimatedCounter value={metric.value} suffix={metric.suffix} />
                  </div>
                  <p className="mt-3 text-sm uppercase tracking-[0.22em] text-zyra-text-secondary">
                    {metric.label}
                  </p>
                </div>
              </PinContainer>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
          }}
          className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3"
        >
          {CAPABILITIES.map((item) => {
            const Icon = item.icon

            return (
              <motion.div key={item.title} variants={fadeUp}>
                <PinContainer title={item.title} className="h-full" containerClassName="h-full">
                  <GlowCard className="h-full">
                    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg border border-zyra-accent-neon/20 bg-zyra-accent-glow">
                      <Icon className="h-6 w-6 text-zyra-accent-neon" />
                    </div>
                    <h3 className="font-heading text-2xl font-semibold text-zyra-text-primary">
                      {item.title}
                    </h3>
                    <p className="mt-4 leading-relaxed text-zyra-text-secondary">
                      {item.description}
                    </p>
                  </GlowCard>
                </PinContainer>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}