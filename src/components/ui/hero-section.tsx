"use client"

import { useEffect, useRef } from "react"

export function HeroBackground() {
  const gradientRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const gradient = gradientRef.current

    function onMouseMove(e: MouseEvent) {
      if (gradient) {
        gradient.style.left = e.clientX - 192 + "px"
        gradient.style.top = e.clientY - 192 + "px"
        gradient.style.opacity = "1"
      }
    }

    function onMouseLeave() {
      if (gradient) gradient.style.opacity = "0"
    }

    function onClick(e: MouseEvent) {
      const ripple = document.createElement("div")
      ripple.style.position = "fixed"
      ripple.style.left = e.clientX + "px"
      ripple.style.top = e.clientY + "px"
      ripple.style.width = "4px"
      ripple.style.height = "4px"
      ripple.style.background = "rgba(57,255,135,0.55)"
      ripple.style.borderRadius = "50%"
      ripple.style.transform = "translate(-50%, -50%)"
      ripple.style.pointerEvents = "none"
      ripple.style.animation = "hero-pulse-glow 1s ease-out forwards"
      ripple.style.zIndex = "9999"
      document.body.appendChild(ripple)
      setTimeout(() => ripple.remove(), 1000)
    }

    document.addEventListener("mousemove", onMouseMove)
    document.addEventListener("mouseleave", onMouseLeave)
    document.addEventListener("click", onClick)

    return () => {
      document.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("mouseleave", onMouseLeave)
      document.removeEventListener("click", onClick)
    }
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Animated SVG grid */}
      <svg
        className="absolute inset-0 h-full w-full pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="zyra-hero-grid"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 60 0 L 0 0 0 60"
              fill="none"
              stroke="rgba(57,255,135,0.07)"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#zyra-hero-grid)" />

        {/* Animated grid lines */}
        <line
          x1="0" y1="20%" x2="100%" y2="20%"
          className="hero-grid-line"
          style={{ animationDelay: "0.5s" }}
        />
        <line
          x1="0" y1="80%" x2="100%" y2="80%"
          className="hero-grid-line"
          style={{ animationDelay: "1s" }}
        />
        <line
          x1="20%" y1="0" x2="20%" y2="100%"
          className="hero-grid-line"
          style={{ animationDelay: "1.5s" }}
        />
        <line
          x1="80%" y1="0" x2="80%" y2="100%"
          className="hero-grid-line"
          style={{ animationDelay: "2s" }}
        />
        <line
          x1="50%" y1="0" x2="50%" y2="100%"
          className="hero-grid-line"
          style={{ animationDelay: "2.5s", opacity: 0.04 }}
        />
        <line
          x1="0" y1="50%" x2="100%" y2="50%"
          className="hero-grid-line"
          style={{ animationDelay: "3s", opacity: 0.04 }}
        />

        {/* Intersection dots */}
        <circle cx="20%" cy="20%" r="2" className="hero-detail-dot" style={{ animationDelay: "3s" }} />
        <circle cx="80%" cy="20%" r="2" className="hero-detail-dot" style={{ animationDelay: "3.2s" }} />
        <circle cx="20%" cy="80%" r="2" className="hero-detail-dot" style={{ animationDelay: "3.4s" }} />
        <circle cx="80%" cy="80%" r="2" className="hero-detail-dot" style={{ animationDelay: "3.6s" }} />
        <circle cx="50%" cy="50%" r="1.5" className="hero-detail-dot" style={{ animationDelay: "4s" }} />
      </svg>

      {/* Floating neon particles */}
      <div className="hero-floating-element" style={{ top: "22%", left: "14%" }} />
      <div className="hero-floating-element" style={{ top: "62%", left: "84%", animationDelay: "0.8s" }} />
      <div className="hero-floating-element" style={{ top: "38%", left: "9%", animationDelay: "1.6s" }} />
      <div className="hero-floating-element" style={{ top: "78%", left: "91%", animationDelay: "2.4s" }} />
      <div className="hero-floating-element" style={{ top: "15%", left: "72%", animationDelay: "3.2s" }} />
      <div className="hero-floating-element" style={{ top: "88%", left: "28%", animationDelay: "4s" }} />

      {/* Corner accent marks */}
      <div className="absolute top-8 left-8 hero-corner-element" style={{ animationDelay: "4s" }}>
        <div className="absolute top-0 left-0 h-2 w-2 opacity-25 bg-zyra-accent-neon" />
      </div>
      <div className="absolute top-8 right-8 hero-corner-element" style={{ animationDelay: "4.2s" }}>
        <div className="absolute top-0 right-0 h-2 w-2 opacity-25 bg-zyra-accent-neon" />
      </div>
      <div className="absolute bottom-8 left-8 hero-corner-element" style={{ animationDelay: "4.4s" }}>
        <div className="absolute bottom-0 left-0 h-2 w-2 opacity-25 bg-zyra-accent-neon" />
      </div>
      <div className="absolute bottom-8 right-8 hero-corner-element" style={{ animationDelay: "4.6s" }}>
        <div className="absolute bottom-0 right-0 h-2 w-2 opacity-25 bg-zyra-accent-neon" />
      </div>

      {/* Mouse-following radial glow */}
      <div
        ref={gradientRef}
        className="fixed pointer-events-none h-96 w-96 rounded-full blur-3xl transition-all duration-500 ease-out opacity-0"
        style={{
          background:
            "radial-gradient(circle, rgba(57,255,135,0.08) 0%, transparent 100%)",
        }}
      />
    </div>
  )
}
