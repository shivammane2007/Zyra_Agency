"use client"

import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion"
import React, { useEffect, useRef, useState } from "react"

interface TimelineEntry {
  title: string
  content: React.ReactNode
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect()
      setHeight(rect.height)
    }
  }, [data])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 15%", "end 60%"],
  })

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const nextIndex = Math.min(data.length - 1, Math.max(0, Math.floor(latest * data.length)))
    setActiveIndex(nextIndex)
  })

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height])
  const opacityTransform = useTransform(scrollYProgress, [0, 0.08], [0.25, 1])

  return (
    <div className="w-full font-sans relative" ref={containerRef}>
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div ref={ref} className="relative pb-6">
          {data.map((item, index) => (
            <div key={item.title} className="flex justify-start pt-10 md:gap-10 md:pt-20">
              <div className="sticky top-28 z-20 flex max-w-xs self-start md:w-full md:max-w-sm md:flex-row md:items-center">
                <div className="absolute left-2.5 flex h-11 w-11 items-center justify-center rounded-full border border-zyra-border-default bg-zyra-bg-secondary shadow-[0_0_0_8px_rgba(8,8,8,0.9)] md:left-3">
                  <div
                    className={index <= activeIndex ? "h-3.5 w-3.5 rounded-full bg-zyra-accent-neon shadow-[0_0_16px_rgba(57,255,135,0.35)]" : "h-3.5 w-3.5 rounded-full bg-zyra-border-default"}
                  />
                </div>
                <h3 className="hidden font-heading text-2xl font-bold tracking-tight text-zyra-text-tertiary md:block md:pl-20 lg:text-4xl">
                  {item.title}
                </h3>
              </div>

              <div className="relative w-full pl-20 pr-4 md:pl-4">
                <h3 className="mb-4 block font-heading text-2xl font-bold tracking-tight text-zyra-text-primary md:hidden">
                  {item.title}
                </h3>
                {item.content}
              </div>
            </div>
          ))}

          <div
            style={{
              height: `${height}px`,
            }}
            className="absolute left-8 top-0 w-[2px] overflow-hidden bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent via-zyra-border-default to-transparent [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
          >
            <motion.div
              style={{
                height: heightTransform,
                opacity: opacityTransform,
              }}
              className="absolute inset-x-0 top-0 w-[2px] rounded-full bg-gradient-to-t from-zyra-accent-neon via-zyra-accent-neon/65 to-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  )
}