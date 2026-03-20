"use client"

import * as React from "react"
import { useEffect } from "react"
import Lenis from "lenis"

interface SmoothScrollProviderProps {
  children: React.ReactNode
}

/**
 * SmoothScrollProvider integrates the Lenis library for global smooth scrolling.
 * It ensures a fluid scroll experience across the entire website without
 * interfering with existing animations or layout logic.
 */
export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  useEffect(() => {
    // Initialize Lenis with premium-feel directed scroll settings
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      syncTouch: false,
      lerp: 0.08, // Optimal for mobile smoothness
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    // Start the animation loop
    requestAnimationFrame(raf)

    // Cleanup on unmount
    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <div className="relative w-full min-h-screen font-sans antialiased text-zyra-text-primary selection:bg-zyra-accent-neon selection:text-black">
      {children}
    </div>
  )
}
