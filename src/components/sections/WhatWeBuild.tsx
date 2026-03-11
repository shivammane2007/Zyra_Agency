"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Globe, Cpu, Smartphone, LayoutDashboard, Workflow, Wrench } from "lucide-react"
import { PinContainer } from "@/components/ui/3d-pin"
import { SectionLabel } from "@/components/ui/SectionLabel"

const SERVICES = [
  {
    icon: Globe,
    title: "Web Platforms",
    description: "Fast, scalable web platforms built for millions of users.",
  },
  {
    icon: Cpu,
    title: "AI Applications",
    description: "Intelligent tools powered by modern AI models and pipelines.",
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    description: "Native-quality mobile experiences on iOS and Android.",
  },
  {
    icon: LayoutDashboard,
    title: "SaaS Products",
    description: "Full SaaS systems with auth, billing, dashboards, and APIs.",
  },
  {
    icon: Workflow,
    title: "Automation Systems",
    description: "End-to-end automation pipelines that save teams hundreds of hours.",
  },
  {
    icon: Wrench,
    title: "Custom Software",
    description: "Bespoke software engineered to your exact business requirements.",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
}

function GradientHoverCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-zyra-bg-primary p-[1px] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(57,255,135,0.12)]">
      {/* Animated gradient border on hover */}
      <div className="absolute inset-0 bg-zyra-border-default transition-opacity duration-300 group-hover:opacity-0" />
      <div className="absolute inset-[-100%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,var(--color-zyra-accent-neon)_50%,transparent_100%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      
      {/* Inner card content */}
      <div className="relative h-full rounded-2xl bg-zyra-bg-card p-8 z-10">
        {children}
      </div>
    </div>
  )
}

export function WhatWeBuild() {
  return (
    <section id="services" className="py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <SectionLabel className="mb-6">Expertise</SectionLabel>
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariants}
            className="font-heading text-4xl font-bold tracking-tight text-zyra-text-primary sm:text-5xl lg:text-6xl"
          >
            What We Build
          </motion.h2>
        </div>

        <motion.div
          className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {SERVICES.map((service) => {
            const Icon = service.icon
            return (
              <motion.div key={service.title} variants={fadeUpVariants}>
                <PinContainer title={service.title} className="h-full" containerClassName="h-full">
                  <GradientHoverCard>
                    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-zyra-bg-elevated border border-zyra-border-subtle group-hover:border-zyra-accent-neon/30 group-hover:bg-zyra-accent-glow transition-colors duration-300">
                      <Icon className="h-6 w-6 text-zyra-text-primary group-hover:text-zyra-accent-neon transition-colors duration-300" />
                    </div>
                    <h3 className="mb-3 font-heading text-xl font-semibold text-zyra-text-primary">
                      {service.title}
                    </h3>
                    <p className="text-zyra-text-secondary leading-relaxed">
                      {service.description}
                    </p>
                  </GradientHoverCard>
                </PinContainer>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
