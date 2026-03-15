"use client"

import * as React from "react"
import { motion, Variants } from "framer-motion"
import { Brain, Palette, Bug, Rocket } from "lucide-react"
import { PinContainer } from "@/components/ui/3d-pin"
import { SectionLabel } from "@/components/ui/SectionLabel"
import { GlowCard } from "@/components/ui/GlowCard"

const PILLARS = [
  {
    icon: Brain,
    title: "Think",
    description: "Strategy and system architecture that scales from day one.",
  },
  {
    icon: Palette,
    title: "Create",
    description: "Product design and full-stack development crafted for users.",
  },
  {
    icon: Bug,
    title: "Debug",
    description: "Rigorous testing, optimization, and reliability engineering.",
  },
  {
    icon: Rocket,
    title: "Deploy",
    description: "Global launch infrastructure and continuous delivery.",
  },
]

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
}

export function Philosophy() {
  return (
    <section id="philosophy" className="py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <SectionLabel className="mb-6">Philosophy</SectionLabel>
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariants}
            className="font-heading text-4xl font-bold tracking-tight text-zyra-text-primary sm:text-5xl lg:text-6xl"
          >
            How We Build Great Software
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariants}
            className="mt-6 max-w-2xl text-lg text-zyra-text-secondary"
          >
            Our four-pillar philosophy drives every product we ship.
          </motion.p>
        </div>

        <motion.div
          className="mt-20 grid gap-8 sm:grid-cols-2 lg:mt-24"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon
            return (
              <motion.div key={pillar.title} variants={fadeUpVariants}>
                <PinContainer title={pillar.title} containerClassName="h-full" className="h-full">
                  <GlowCard className="h-full">
                    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-zyra-accent-glow border border-zyra-accent-neon/20">
                      <Icon className="h-6 w-6 text-zyra-accent-neon" />
                    </div>
                    <h3 className="mb-3 font-heading text-xl font-semibold text-zyra-text-primary">
                      {pillar.title}
                    </h3>
                    <p className="text-zyra-text-secondary leading-relaxed">
                      {pillar.description}
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
