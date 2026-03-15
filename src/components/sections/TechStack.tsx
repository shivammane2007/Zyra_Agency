"use client"

import { motion } from "framer-motion"
import { BookOpen, Bot, Boxes, Cloud, Github, Server } from "lucide-react"
import { IdentityCardBody, RevealCardContainer, type SocialItem } from "@/components/ui/animated-profile-card"
import { SectionLabel } from "@/components/ui/SectionLabel"

const STACK = [
  {
    label: "Frontend Systems",
    place: "Client product surfaces",
    about:
      "Next.js, React, TypeScript, and Tailwind CSS used to build interfaces that stay fast, legible, and production-ready.",
    avatarUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1200&auto=format&fit=crop",
    avatarText: "FE",
    accent: "#b7ffc8",
    textOnAccent: "#08130d",
    mutedOnAccent: "#254131",
    socials: [
      { id: "gh-fe", url: "https://github.com/vercel/next.js", icon: <Github className="h-4.5 w-4.5" />, label: "Next.js repo" },
      { id: "docs-fe", url: "https://nextjs.org/docs", icon: <BookOpen className="h-4.5 w-4.5" />, label: "Frontend docs" },
      { id: "stack-fe", url: "https://react.dev/", icon: <Boxes className="h-4.5 w-4.5" />, label: "React" },
    ] satisfies SocialItem[],
  },
  {
    label: "Backend Systems",
    place: "Services and data flows",
    about:
      "Node.js, Python, PostgreSQL, and RPC-oriented service layers selected for maintainability, throughput, and integration depth.",
    avatarUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1200&auto=format&fit=crop",
    avatarText: "BE",
    accent: "#d3ffd9",
    textOnAccent: "#08130d",
    mutedOnAccent: "#2b4a36",
    socials: [
      { id: "gh-be", url: "https://github.com/nodejs/node", icon: <Github className="h-4.5 w-4.5" />, label: "Node repo" },
      { id: "docs-be", url: "https://www.postgresql.org/docs/", icon: <BookOpen className="h-4.5 w-4.5" />, label: "PostgreSQL docs" },
      { id: "stack-be", url: "https://www.python.org/", icon: <Server className="h-4.5 w-4.5" />, label: "Backend stack" },
    ] satisfies SocialItem[],
  },
  {
    label: "AI Systems",
    place: "Retrieval and agent loops",
    about:
      "RAG pipelines, agent workflows, prompt systems, and evaluation loops designed around observability and repeatable product behavior.",
    avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1200&auto=format&fit=crop",
    avatarText: "AI",
    accent: "#c6ffd1",
    textOnAccent: "#08130d",
    mutedOnAccent: "#2a4835",
    socials: [
      { id: "gh-ai", url: "https://github.com/langchain-ai/langchain", icon: <Github className="h-4.5 w-4.5" />, label: "AI repo" },
      { id: "docs-ai", url: "https://platform.openai.com/docs", icon: <BookOpen className="h-4.5 w-4.5" />, label: "Platform docs" },
      { id: "stack-ai", url: "https://python.langchain.com/", icon: <Bot className="h-4.5 w-4.5" />, label: "Agent systems" },
    ] satisfies SocialItem[],
  },
  {
    label: "Ops Systems",
    place: "Release and runtime reliability",
    about:
      "Vercel, Docker, CI/CD, and observability tooling used to keep deployments predictable, rollback-safe, and measurable.",
    avatarUrl: "https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=1200&auto=format&fit=crop",
    avatarText: "OP",
    accent: "#d9ffe3",
    textOnAccent: "#08130d",
    mutedOnAccent: "#324d3c",
    socials: [
      { id: "gh-ops", url: "https://github.com/docker", icon: <Github className="h-4.5 w-4.5" />, label: "Docker repo" },
      { id: "docs-ops", url: "https://vercel.com/docs", icon: <BookOpen className="h-4.5 w-4.5" />, label: "Ops docs" },
      { id: "stack-ops", url: "https://vercel.com/", icon: <Cloud className="h-4.5 w-4.5" />, label: "Deployment stack" },
    ] satisfies SocialItem[],
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
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mt-6 max-w-3xl text-lg leading-relaxed text-zyra-text-secondary"
          >
            Every layer is selected for delivery clarity. Hover each profile to reveal the applied system behind product interfaces, backend flows, AI workflows, and runtime operations.
          </motion.p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {STACK.map((group, index) => (
            <motion.div
              key={group.label}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ delay: index * 0.06 }}
            >
              <RevealCardContainer
                accent={group.accent}
                textOnAccent={group.textOnAccent}
                mutedOnAccent={group.mutedOnAccent}
                className="h-full w-full"
                base={
                  <IdentityCardBody
                    fullName={group.label}
                    place={group.place}
                    about={group.about}
                    avatarUrl={group.avatarUrl}
                    avatarText={group.avatarText}
                    scheme="plain"
                    displayAvatar={false}
                    socials={group.socials}
                  />
                }
                overlay={
                  <IdentityCardBody
                    fullName={group.label}
                    place={group.place}
                    about={group.about}
                    avatarUrl={group.avatarUrl}
                    avatarText={group.avatarText}
                    scheme="accented"
                    displayAvatar={true}
                    socials={group.socials}
                    cardCss={{ backgroundColor: "var(--accent-color)" }}
                  />
                }
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}