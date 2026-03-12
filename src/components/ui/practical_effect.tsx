"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

interface Particle {
  x: number
  y: number
  originX: number
  originY: number
  vx: number
  vy: number
  size: number
  alpha: number
}

interface BackgroundParticle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  alpha: number
  phase: number
}

interface MouseState {
  x: number
  y: number
  isActive: boolean
}

interface PracticalEffectProps {
  className?: string
}

const PARTICLE_DENSITY = 0.000065
const BG_PARTICLE_DENSITY = 0.000022
const MOUSE_RADIUS = 150
const RETURN_SPEED = 0.055
const DAMPING = 0.92
const REPULSION_STRENGTH = 0.72

const randomRange = (min: number, max: number) => Math.random() * (max - min) + min

export function PracticalEffect({ className }: PracticalEffectProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const particlesRef = React.useRef<Particle[]>([])
  const backgroundParticlesRef = React.useRef<BackgroundParticle[]>([])
  const mouseRef = React.useRef<MouseState>({ x: -1000, y: -1000, isActive: false })
  const frameIdRef = React.useRef<number>(0)
  const lastTimeRef = React.useRef<number>(0)

  const initParticles = React.useCallback((width: number, height: number) => {
    const particleCount = Math.floor(width * height * PARTICLE_DENSITY)
    const newParticles: Particle[] = []

    for (let index = 0; index < particleCount; index++) {
      const x = Math.random() * width
      const y = Math.random() * height

      newParticles.push({
        x,
        y,
        originX: x,
        originY: y,
        vx: 0,
        vy: 0,
        size: randomRange(0.7, 1.8),
        alpha: randomRange(0.14, 0.42),
      })
    }

    particlesRef.current = newParticles

    const bgCount = Math.floor(width * height * BG_PARTICLE_DENSITY)
    const newBgParticles: BackgroundParticle[] = []

    for (let index = 0; index < bgCount; index++) {
      newBgParticles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
        size: randomRange(0.4, 1.2),
        alpha: randomRange(0.04, 0.16),
        phase: Math.random() * Math.PI * 2,
      })
    }

    backgroundParticlesRef.current = newBgParticles
  }, [])

  const renderFrame = React.useCallback((time: number) => {
      const canvas = canvasRef.current
      if (!canvas) return

      const context = canvas.getContext("2d")
      if (!context) return

      lastTimeRef.current = time

      context.clearRect(0, 0, canvas.width, canvas.height)

      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const pulseOpacity = Math.sin(time * 0.00055) * 0.014 + 0.03
      const gradient = context.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        Math.max(canvas.width, canvas.height) * 0.7
      )
      gradient.addColorStop(0, `rgba(57,255,135,${pulseOpacity})`)
      gradient.addColorStop(1, "rgba(0,0,0,0)")

      context.fillStyle = gradient
      context.fillRect(0, 0, canvas.width, canvas.height)

      const bgParticles = backgroundParticlesRef.current
      context.fillStyle = "#39ff87"

      for (let index = 0; index < bgParticles.length; index++) {
        const particle = bgParticles[index]
        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        const twinkle = Math.sin(time * 0.0018 + particle.phase) * 0.5 + 0.5
        context.globalAlpha = particle.alpha * (0.35 + 0.65 * twinkle)
        context.beginPath()
        context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        context.fill()
      }

      context.globalAlpha = 1

      const particles = particlesRef.current
      const mouse = mouseRef.current

      for (let index = 0; index < particles.length; index++) {
        const particle = particles[index]

        const dx = mouse.x - particle.x
        const dy = mouse.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (mouse.isActive && distance < MOUSE_RADIUS && distance > 0.001) {
          const directionX = dx / distance
          const directionY = dy / distance
          const force = (MOUSE_RADIUS - distance) / MOUSE_RADIUS
          const repulsion = force * REPULSION_STRENGTH

          particle.vx -= directionX * repulsion * 4.2
          particle.vy -= directionY * repulsion * 4.2
        }

        particle.vx += (particle.originX - particle.x) * RETURN_SPEED
        particle.vy += (particle.originY - particle.y) * RETURN_SPEED
      }

      for (let index = 0; index < particles.length; index++) {
        const particle = particles[index]

        particle.vx *= DAMPING
        particle.vy *= DAMPING
        particle.x += particle.vx
        particle.y += particle.vy

        const velocity = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy)
        const opacity = Math.min(particle.alpha + velocity * 0.028, 0.5)

        context.beginPath()
        context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        context.fillStyle = `rgba(57,255,135,${opacity})`
        context.fill()
      }

    },
    []
  )

  React.useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current || !canvasRef.current) return

      const { width, height } = containerRef.current.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      const context = canvasRef.current.getContext("2d")

      canvasRef.current.width = width * dpr
      canvasRef.current.height = height * dpr
      canvasRef.current.style.width = `${width}px`
      canvasRef.current.style.height = `${height}px`

      if (context) {
        context.setTransform(1, 0, 0, 1, 0, 0)
        context.scale(dpr, dpr)
      }

      initParticles(width, height)
    }

    window.addEventListener("resize", handleResize)
    handleResize()

    return () => window.removeEventListener("resize", handleResize)
  }, [initParticles])

  React.useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const isInside =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom

      if (!isInside) return

      mouseRef.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
        isActive: true,
      }
    }

    const handlePointerLeave = () => {
      mouseRef.current.isActive = false
    }

    window.addEventListener("pointermove", handlePointerMove)
    window.addEventListener("pointerleave", handlePointerLeave)

    return () => {
      window.removeEventListener("pointermove", handlePointerMove)
      window.removeEventListener("pointerleave", handlePointerLeave)
    }
  }, [])

  React.useEffect(() => {
    const step = (time: number) => {
      renderFrame(time)
      frameIdRef.current = window.requestAnimationFrame(step)
    }

    frameIdRef.current = window.requestAnimationFrame(step)

    return () => {
      window.cancelAnimationFrame(frameIdRef.current)
    }
  }, [renderFrame])

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden bg-transparent", className)}
    >
      <canvas ref={canvasRef} className="block h-full w-full opacity-55" />
    </div>
  )
}