
"use client"

import Link from "next/link"
import React, { useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

type PinContainerProps = {
  children: React.ReactNode
  title?: string
  href?: string
  className?: string
  containerClassName?: string
  disabled?: boolean
}

export const PinContainer = (props: PinContainerProps) => {
  const { children, href, className, containerClassName, disabled } = props
  const [transform, setTransform] = useState("rotateX(0deg) translateY(0px) scale(1)")

  const onMouseEnter = () => {
    if (disabled) return
    setTransform("rotateX(12deg) translateY(-8px) scale(0.985)")
  }

  const onMouseLeave = () => {
    if (disabled) return
    setTransform("rotateX(0deg) translateY(0px) scale(1)")
  }

  const content = (
    <>
      <div className="relative h-full w-full [perspective:1000px]">
        <div
          style={{
            transform,
            transformStyle: "preserve-3d",
          }}
          className={cn(
            "relative h-full w-full origin-center transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
            className
          )}
        >
          {children}
        </div>
      </div>
      {!disabled && <PinPerspective />}
    </>
  )

  if (href) {
    return (
      <Link
        className={cn("group/pin relative block h-full w-full", containerClassName)}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        href={href}
      >
        {content}
      </Link>
    )
  }

  return (
    <div
      className={cn("group/pin relative block h-full w-full", containerClassName)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {content}
    </div>
  )
}

export const PinPerspective = () => {
  return (
    <motion.div className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover/pin:opacity-100" />
  )
}