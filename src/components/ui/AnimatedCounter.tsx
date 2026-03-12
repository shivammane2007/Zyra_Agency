"use client"

import * as React from "react"
import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion"

interface AnimatedCounterProps {
  value: number
  suffix?: string
  prefix?: string
  duration?: number
  className?: string
}

function AnimatedCounterComponent({ 
  value, 
  suffix = "", 
  prefix = "", 
  duration = 1.5,
  className = ""
}: AnimatedCounterProps) {
  const ref = React.useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => Math.round(latest))

  React.useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, {
        duration: duration,
        ease: "easeOut",
      })

      return () => {
        controls.stop()
      }
    }
  }, [isInView, value, duration, count])

  return (
    <span ref={ref} className={className}>
      {prefix}
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  )
}

export const AnimatedCounter = React.memo(AnimatedCounterComponent)
