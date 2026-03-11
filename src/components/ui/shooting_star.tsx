"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface ShootingStar {
  id: number
  x: number
  y: number
  angle: number
  scale: number
  speed: number
  distance: number
}

interface ShootingStarsProps {
  minSpeed?: number
  maxSpeed?: number
  minDelay?: number
  maxDelay?: number
  starColor?: string
  trailColor?: string
  starWidth?: number
  starHeight?: number
  className?: string
}

const getRandomStartPoint = () => {
  const side = Math.floor(Math.random() * 4)
  const offset = Math.random() * window.innerWidth

  switch (side) {
    case 0:
      return { x: offset, y: 0, angle: 45 }
    case 1:
      return { x: window.innerWidth, y: offset, angle: 135 }
    case 2:
      return { x: offset, y: window.innerHeight, angle: 225 }
    case 3:
      return { x: 0, y: offset, angle: 315 }
    default:
      return { x: 0, y: 0, angle: 45 }
  }
}

export function ShootingStars({
  minSpeed = 12,
  maxSpeed = 26,
  minDelay = 1600,
  maxDelay = 4200,
  starColor = "#39ff87",
  trailColor = "rgba(57, 255, 135, 0.15)",
  starWidth = 120,
  starHeight = 1.5,
  className,
}: ShootingStarsProps) {
  const [star, setStar] = React.useState<ShootingStar | null>(null)
  const animationFrameRef = React.useRef<number | null>(null)
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)
  const gradientId = React.useId()

  React.useEffect(() => {
    const spawnStar = () => {
      const { x, y, angle } = getRandomStartPoint()

      setStar({
        id: Date.now(),
        x,
        y,
        angle,
        scale: 1,
        speed: Math.random() * (maxSpeed - minSpeed) + minSpeed,
        distance: 0,
      })

      const randomDelay = Math.random() * (maxDelay - minDelay) + minDelay
      timeoutRef.current = setTimeout(spawnStar, randomDelay)
    }

    spawnStar()

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [maxDelay, maxSpeed, minDelay, minSpeed])

  React.useEffect(() => {
    const moveStar = () => {
      setStar((previousStar) => {
        if (!previousStar) {
          return null
        }

        const angleInRadians = (previousStar.angle * Math.PI) / 180
        const nextX = previousStar.x + previousStar.speed * Math.cos(angleInRadians)
        const nextY = previousStar.y + previousStar.speed * Math.sin(angleInRadians)
        const nextDistance = previousStar.distance + previousStar.speed
        const nextScale = 1 + nextDistance / 240

        if (
          nextX < -200 ||
          nextX > window.innerWidth + 200 ||
          nextY < -200 ||
          nextY > window.innerHeight + 200
        ) {
          return null
        }

        return {
          ...previousStar,
          x: nextX,
          y: nextY,
          distance: nextDistance,
          scale: nextScale,
        }
      })

      animationFrameRef.current = window.requestAnimationFrame(moveStar)
    }

    animationFrameRef.current = window.requestAnimationFrame(moveStar)

    return () => {
      if (animationFrameRef.current) {
        window.cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  return (
    <svg
      aria-hidden="true"
      className={cn("absolute inset-0 h-full w-full", className)}
      preserveAspectRatio="none"
    >
      {star ? (
        <rect
          key={star.id}
          x={star.x}
          y={star.y}
          width={starWidth * star.scale}
          height={starHeight}
          fill={`url(#${gradientId})`}
          transform={`rotate(${star.angle}, ${star.x + (starWidth * star.scale) / 2}, ${star.y + starHeight / 2})`}
        />
      ) : null}

      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: trailColor, stopOpacity: 0 }} />
          <stop offset="75%" style={{ stopColor: trailColor, stopOpacity: 0.55 }} />
          <stop offset="100%" style={{ stopColor: starColor, stopOpacity: 1 }} />
        </linearGradient>
      </defs>
    </svg>
  )
}