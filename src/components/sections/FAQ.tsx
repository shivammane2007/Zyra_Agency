"use client"

import { SectionLabel } from "@/components/ui/SectionLabel"
import FAQs from "@/components/ui/text-reveal-faqs"
import { motion } from "framer-motion"

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
}

export function FAQSection() {
  return (
    <section id="faq" className="py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="flex flex-col mb-16 items-start"
        >
          <SectionLabel className="mb-6">FAQ</SectionLabel>
        </motion.div>
        
        <FAQs />
      </div>
    </section>
  )
}
