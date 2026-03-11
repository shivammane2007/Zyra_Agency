"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Lightbulb, Layers, Code, ShieldCheck, Rocket } from "lucide-react"
import { SectionLabel } from "@/components/ui/SectionLabel"
import { Timeline } from "@/components/ui/timeline"

const STEPS = [
  {
    number: "01",
    icon: Lightbulb,
    title: "Idea",
    description:
      "Every great product begins with a clear idea. We help founders refine concepts and validate product vision before a single line of code is written.",
  },
  {
    number: "02",
    icon: Layers,
    title: "Design",
    description:
      "Our designers craft intuitive interfaces and user experiences that people love. Every pixel is intentional, every flow is user-tested.",
  },
  {
    number: "03",
    icon: Code,
    title: "Engineering",
    description:
      "Our engineers build scalable and high-performance systems using modern technologies. Clean architecture, typed code, reviewed and battle-tested.",
  },
  {
    number: "04",
    icon: ShieldCheck,
    title: "Testing",
    description:
      "Every feature is rigorously tested to ensure reliability and performance. Automated suites, load testing, and QA before every release.",
  },
  {
    number: "05",
    icon: Rocket,
    title: "Launch",
    description:
      "We deploy products globally with optimized infrastructure, monitoring, and rollback safety. Your product goes live — ready to scale.",
  },
]

export function BuildWorkflow() {
  const timelineData = React.useMemo(
    () =>
      STEPS.map((step) => {
        const Icon = step.icon

        return {
          title: step.number,
          content: (
            <div className="rounded-[1.75rem] border border-zyra-border-subtle bg-[linear-gradient(180deg,rgba(20,20,20,0.96)_0%,rgba(11,11,11,1)_100%)] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.2)] sm:p-8">
              <div className="mb-5 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-zyra-accent-neon/20 bg-zyra-accent-glow">
                  <Icon className="h-6 w-6 text-zyra-accent-neon" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-zyra-accent-neon">Step {step.number}</p>
                  <h3 className="mt-2 font-heading text-2xl font-semibold text-zyra-text-primary sm:text-3xl">{step.title}</h3>
                </div>
              </div>
              <p className="max-w-2xl text-base leading-relaxed text-zyra-text-secondary sm:text-lg">{step.description}</p>
            </div>
          ),
        }
      }),
    []
  )

  return (
    <section id="process" className="bg-zyra-bg-primary py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 md:mb-24 flex flex-col items-center text-center lg:items-start lg:text-left">
          <SectionLabel className="mb-6">Workflow</SectionLabel>
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
            }}
            className="font-heading text-4xl font-bold tracking-tight text-zyra-text-primary sm:text-5xl lg:text-6xl"
          >
            From Idea to Global Product
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.1 } }
            }}
            className="mt-6 max-w-2xl text-lg text-zyra-text-secondary"
          >
            Zyra turns ideas into scalable software using a structured engineering workflow.
          </motion.p>
        </div>

        <div className="mt-20 rounded-[2rem] border border-zyra-border-subtle bg-zyra-bg-card/40 py-4 backdrop-blur-sm">
          <div className="mx-auto max-w-4xl px-4 pt-10 text-center sm:px-8">
            <SectionLabel className="mb-4">Milestones</SectionLabel>
            <h3 className="font-heading text-3xl font-bold tracking-tight text-zyra-text-primary sm:text-4xl">
              A More Detailed View of the Delivery Sequence
            </h3>
            <p className="mt-4 text-base leading-relaxed text-zyra-text-secondary sm:text-lg">
              The same workflow, broken into clear milestones so strategy, design, engineering, and launch decisions stay visible throughout delivery.
            </p>
          </div>
          <Timeline data={timelineData} />
        </div>
      </div>
    </section>
  )
}
