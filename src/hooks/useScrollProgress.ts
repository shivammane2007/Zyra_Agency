"use client"

import * as React from "react"
import { useInView } from "framer-motion"

export function useScrollProgress(ref: React.RefObject<HTMLElement | null>, index: number, setActiveStep: (index: number) => void) {
  const isInView = useInView(ref, { margin: "-40% 0px -40% 0px" })
  
  React.useEffect(() => {
    if (isInView) {
      setActiveStep(index)
    }
  }, [isInView, index, setActiveStep])
  
  return isInView
}
