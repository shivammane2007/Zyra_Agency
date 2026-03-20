"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { SectionLabel } from "@/components/ui/SectionLabel"
import AnimatedTestimonials, { type Testimonial } from "@/components/ui/animated-testimonials"
import { LazyMotion, domAnimation } from "framer-motion"

const TEAM = [
  {
    name: "Strategy Lead",
    role: "Product direction",
    description:
      "Translates business goals into release priorities, product decisions, and measurable roadmap outcomes.",
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=3540&auto=format&fit=crop",
  },
  {
    name: "Design Lead",
    role: "Experience systems",
    description:
      "Shapes visual identity, interfaces, and interaction models that feel premium while staying easy to use.",
    src: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=3322&auto=format&fit=crop",
  },
  {
    name: "Engineering Lead",
    role: "Architecture and delivery",
    description:
      "Owns implementation quality across frontend, backend, integrations, infrastructure, and release mechanics.",
    src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=3540&auto=format&fit=crop",
  },
  {
    name: "QA and Ops",
    role: "Reliability",
    description:
      "Covers validation, launch readiness, analytics, and post-release iteration so the product keeps improving.",
    src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=3388&auto=format&fit=crop",
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

function TeamComponent() {
  const testimonials: Testimonial[] = React.useMemo(
    () => TEAM.map((member) => ({
      quote: member.description,
      name: member.name,
      designation: member.role,
      src: member.src,
    })),
    []
  );

  // Disable autoplay on mobile devices only
  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          className="mt-16"
        >
          <LazyMotion features={domAnimation}>
            <AnimatedTestimonials testimonials={testimonials} autoplay={!isMobile} />
          </LazyMotion>
        </motion.div>
      </div>
    </section>
  )
}
export default React.memo(TeamComponent)