"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { PinContainer } from "@/components/ui/3d-pin"
import { SectionLabel } from "@/components/ui/SectionLabel"

export function CTA() {
  return (
    <section id="contact" className="py-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <PinContainer title="Start Here" className="h-full" containerClassName="h-full" disabled>
            <div className="overflow-hidden rounded-[2rem] border border-zyra-border-subtle bg-[radial-gradient(circle_at_top,rgba(57,255,135,0.14),transparent_45%),linear-gradient(160deg,#151515_0%,#090909_100%)] p-10 text-center sm:p-16">
              <SectionLabel className="mb-6">Start Here</SectionLabel>
              <h2 className="font-heading text-4xl font-bold tracking-tight text-zyra-text-primary sm:text-5xl lg:text-6xl">
                Bring the Next Version of Your Product Into Focus
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zyra-text-secondary">
                If you need a senior team to shape, build, and launch a serious digital product, Zyra is set up for that work.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/start-project"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-zyra-accent-neon px-6 py-3 font-medium text-black transition-opacity hover:opacity-90"
                >
                  Start a project
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/projects"
                  className="inline-flex items-center justify-center rounded-full border border-zyra-border-default px-6 py-3 font-medium text-zyra-text-primary transition-colors hover:border-zyra-accent-neon hover:text-zyra-accent-neon"
                >
                  Review our work
                </Link>
              </div>
            </div>
          </PinContainer>
        </motion.div>
      </div>
    </section>
  )
}