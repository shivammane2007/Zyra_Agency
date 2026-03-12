"use client"

import * as React from "react"
import { motion, HTMLMotionProps } from "framer-motion"
import { cn } from "@/lib/utils"

interface GlowCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode
  className?: string
  glowClassName?: string
}

function GlowCardComponent({
  children,
  className,
  glowClassName,
  ...props
}: GlowCardProps) {
  return (
    <motion.div
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-zyra-border-default bg-zyra-bg-card p-8 transition-colors hover:border-zyra-accent-neon/50",
        className
      )}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      {...props}
    >
      <div
        className={cn(
          "absolute inset-0 bg-zyra-accent-glow opacity-0 transition-opacity duration-500 group-hover:opacity-100",
          glowClassName
        )}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}

export const GlowCard = React.memo(GlowCardComponent)
