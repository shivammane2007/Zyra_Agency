"use client"

import * as React from "react"
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react"
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"
// import { useEffect, useEffectEvent, useMemo, useState } from "react"
import { useEffect, useMemo, useState } from "react"

import { cn } from "@/lib/utils"

export type Testimonial = {
  quote: string
  name: string
  designation: string
  src: string
}

const AnimatedTestimonialsComponent = ({
  testimonials,
  autoplay = false,
  className,
}: {
  testimonials: Testimonial[]
  autoplay?: boolean
  className?: string
}) => {
  const [active, setActive] = useState(0)

  const rotations = useMemo(
    () => testimonials.map((_, index) => ((index % 2 === 0 ? 1 : -1) * (6 + (index % 3) * 2))),
    [testimonials]
  )

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length)
  }

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  // Preload all testimonial images to prevent flickers during transition
  useEffect(() => {
    testimonials.forEach((item) => {
      const img = new window.Image()
      img.src = item.src
    })
  }, [testimonials])

  // const handleAutoAdvance = useEffectEvent(() => {
  //   setActive((prev) => (prev + 1) % testimonials.length)
  // })


  useEffect(() => {
    if (!autoplay || testimonials.length <= 1) return

    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length)
    }, 5200)

    return () => clearInterval(interval)
  }, [autoplay, testimonials.length])

  return (
    <div className={cn("mx-auto w-full max-w-full px-4 py-12 md:max-w-6xl md:px-8 lg:px-12 lg:py-16", className)}>
      <div className="relative grid grid-cols-1 gap-12 rounded-[2rem] border border-zyra-border-subtle bg-[radial-gradient(circle_at_top,rgba(57,255,135,0.1),transparent_36%),linear-gradient(160deg,#121212_0%,#080808_100%)] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.34)] md:grid-cols-[0.95fr_1.05fr] md:gap-16 md:p-10 lg:p-12">
        <div className="relative overflow-hidden rounded-[2rem]">
          <div className="absolute inset-0 -z-10 rounded-[2rem] bg-[radial-gradient(circle_at_center,rgba(57,255,135,0.12),transparent_58%)] blur-3xl" />
          <div className="relative h-[20rem] w-full sm:h-[24rem] md:h-[32rem]">
            <AnimatePresence initial={false} mode="wait">
              <motion.div
                key={testimonials[active].src}
                layout={false}
                initial={{
                  opacity: 0,
                  scale: 0.93,
                  // z: -100,
                  rotate: rotations[active],
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  // z: 0,
                  rotate: 0,
                  zIndex: 999,
                  // y: [0, -18, 0],
                }}
                exit={{
                  opacity: 0,
                  scale: 0.96,
                  // z: 100,
                  rotate: rotations[active],
                }}
                transition={{
                  duration: 0.45,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 origin-bottom pointer-events-auto transform-gpu will-change-transform"
              >
                <div className="absolute inset-0 rounded-[2rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.04)_0%,rgba(255,255,255,0)_36%)]" />
                <Image
                  src={testimonials[active].src}
                  alt={testimonials[active].name}
                  width={700}
                  height={900}
                  priority
                  sizes="(max-width: 768px) 100vw, 700px"
                  draggable={false}
                  className="h-full w-full rounded-[2rem] object-cover object-center"
                />
                <div className="absolute inset-x-0 bottom-0 h-32 rounded-b-[2rem] bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="flex flex-col justify-between py-1 md:py-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={testimonials[active].src}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.24, ease: "easeInOut" }}
            >
              <p className="text-xs uppercase tracking-[0.24em] text-zyra-accent-neon">Core operators</p>
              <h3 className="mt-5 font-heading text-3xl font-bold text-zyra-text-primary sm:text-4xl">
                {testimonials[active].name}
              </h3>
              <p className="mt-3 text-sm uppercase tracking-[0.18em] text-zyra-text-secondary">
                {testimonials[active].designation}
              </p>
              <motion.p className="mt-8 text-lg leading-relaxed text-zyra-text-secondary md:text-xl">
                {testimonials[active].quote.split(" ").map((word, index) => (
                  <motion.span
                    key={`${word}-${index}`}
                    initial={{ filter: "blur(10px)", opacity: 0, y: 5 }}
                    animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.18,
                      ease: "easeInOut",
                      delay: 0.018 * index,
                    }}
                    className="inline-block"
                  >
                    {word}&nbsp;
                  </motion.span>
                ))}
              </motion.p>
            </motion.div>
          </AnimatePresence>

          <div className="mt-10 flex items-center justify-between gap-6 border-t border-white/8 pt-8">
            <div className="text-xs uppercase tracking-[0.22em] text-zyra-text-tertiary">
              {String(active + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
            </div>
            <div className="flex gap-3">
              <button
                onClick={handlePrev}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-zyra-border-default bg-zyra-bg-secondary text-zyra-text-primary transition-colors duration-300 hover:border-zyra-accent-neon hover:bg-zyra-accent-glow hover:text-zyra-accent-neon"
                type="button"
              >
                <IconArrowLeft className="h-5 w-5 transition-transform duration-300 group-hover/button:rotate-12" />
              </button>
              <button
                onClick={handleNext}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-zyra-border-default bg-zyra-bg-secondary text-zyra-text-primary transition-colors duration-300 hover:border-zyra-accent-neon hover:bg-zyra-accent-glow hover:text-zyra-accent-neon"
                type="button"
              >
                <IconArrowRight className="h-5 w-5 transition-transform duration-300 group-hover/button:-rotate-12" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const AnimatedTestimonials = React.memo(AnimatedTestimonialsComponent)