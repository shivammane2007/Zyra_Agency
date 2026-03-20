"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import DottedMap from "dotted-map"
import Image from "next/image"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

interface MapProps {
  dots?: Array<{
    start: { lat: number; lng: number; label?: string }
    end: { lat: number; lng: number; label?: string }
  }>
  lineColor?: string
  showLabels?: boolean
  labelClassName?: string
  animationDuration?: number
  loop?: boolean
  className?: string
}

export function WorldMap({
  dots = [],
  lineColor = "#39ff87",
  showLabels = true,
  labelClassName = "text-sm",
  animationDuration = 2,
  loop = true,
  className,
}: MapProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null)
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const map = useMemo(() => new DottedMap({ height: 100, grid: "diagonal" }), [])

  const svgMap = useMemo(
    () =>
      map.getSVG({
        radius: 0.22,
        color: !mounted || theme === "dark" ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.05)",
        shape: "circle",
      }),
    [map, theme, mounted]
  )

  const projectPoint = (lat: number, lng: number) => {
    const safeLat = Number.isFinite(lat) ? lat : 0
    const safeLng = Number.isFinite(lng) ? lng : 0
    const x = (safeLng + 180) * (800 / 360)
    const y = (90 - safeLat) * (400 / 180)
    return { x, y }
  }

  const createCurvedPath = (
    start: { x: number; y: number },
    end: { x: number; y: number }
  ) => {
    const midX = (start.x + end.x) / 2
    const midY = Math.min(start.y, end.y) - 50
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`
  }

  const staggerDelay = 0.3
  const totalAnimationTime = dots.length * staggerDelay + animationDuration
  const pauseTime = 2
  const fullCycleDuration = totalAnimationTime + pauseTime

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-[2rem] border border-zyra-border-subtle bg-[radial-gradient(circle_at_top,rgba(57,255,135,0.08),transparent_42%),linear-gradient(180deg,rgba(20,20,20,0.98)_0%,rgba(8,8,8,1)_100%)] font-sans aspect-[2/1] md:aspect-[2.35/1]",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(57,255,135,0.03)_0%,transparent_28%,transparent_72%,rgba(57,255,135,0.03)_100%)]" />
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        className="pointer-events-none h-full w-full select-none object-cover opacity-90 [mask-image:linear-gradient(to_bottom,transparent,white_12%,white_88%,transparent)]"
        alt="world map"
        height={495}
        width={1056}
        draggable={false}
      />

      <svg
        ref={svgRef}
        viewBox="0 0 800 400"
        className="absolute inset-0 h-full w-full select-none"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="6%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="94%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>

          <filter id="glow">
            <feMorphology operator="dilate" radius="0.5" />
            <feGaussianBlur stdDeviation="1" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {dots.map((dot, index) => {
          const startPoint = projectPoint(dot.start.lat, dot.start.lng)
          const endPoint = projectPoint(dot.end.lat, dot.end.lng)
          const path = createCurvedPath(startPoint, endPoint)

          const startTime = (index * staggerDelay) / fullCycleDuration
          const endTime = (index * staggerDelay + animationDuration) / fullCycleDuration
          const resetTime = totalAnimationTime / fullCycleDuration

          return (
            <g key={`path-group-${index}`}>
              <motion.path
                d={path}
                fill="none"
                stroke="url(#path-gradient)"
                strokeWidth="1.15"
                initial={{ pathLength: 0 }}
                animate={
                  loop
                    ? {
                        pathLength: [0, 0, 1, 1, 0],
                      }
                    : {
                        pathLength: 1,
                      }
                }
                transition={
                  loop
                    ? {
                        duration: fullCycleDuration,
                        times: [0, startTime, endTime, resetTime, 1],
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatDelay: 0,
                      }
                    : {
                        duration: animationDuration,
                        delay: index * staggerDelay,
                        ease: "easeInOut",
                      }
                }
              />

              {loop ? (
                <motion.circle
                  r="4"
                  fill={lineColor}
                  initial={{ offsetDistance: "0%", opacity: 0 }}
                  animate={{
                    offsetDistance: [null, "0%", "100%", "100%", "100%"],
                    opacity: [0, 0, 1, 0, 0],
                  }}
                  transition={{
                    duration: fullCycleDuration,
                    times: [0, startTime, endTime, resetTime, 1],
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatDelay: 0,
                  }}
                  style={{
                    offsetPath: `path('${path}')`,
                  }}
                />
              ) : null}
            </g>
          )
        })}

        {dots.map((dot, index) => {
          const startPoint = projectPoint(dot.start.lat, dot.start.lng)
          const endPoint = projectPoint(dot.end.lat, dot.end.lng)

          return (
            <g key={`points-group-${index}`}>
              <g key={`start-${index}`}>
                <motion.g
                  onHoverStart={() => setHoveredLocation(dot.start.label || `Location ${index + 1}`)}
                  onHoverEnd={() => setHoveredLocation(null)}
                  className="cursor-pointer"
                  whileHover={{ scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <circle cx={startPoint.x} cy={startPoint.y} r="3" fill={lineColor} filter="url(#glow)" className="drop-shadow-lg" />
                  <circle cx={startPoint.x} cy={startPoint.y} r="3" fill={lineColor} opacity="0.5">
                    <animate attributeName="r" from="3" to="12" dur="2s" begin="0s" repeatCount="indefinite" />
                    <animate attributeName="opacity" from="0.6" to="0" dur="2s" begin="0s" repeatCount="indefinite" />
                  </circle>
                </motion.g>

                {showLabels && dot.start.label ? (
                  <motion.g
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 * index + 0.3, duration: 0.5 }}
                    className="pointer-events-none"
                  >
                    <foreignObject x={startPoint.x - 56} y={startPoint.y - 36} width="112" height="32" className="block">
                      <div className="flex h-full items-center justify-center">
                        <span
                          className={cn(
                            "rounded-md border border-zyra-border-default bg-zyra-bg-secondary/95 px-2 py-0.5 font-medium text-zyra-text-primary shadow-sm backdrop-blur-sm",
                            labelClassName
                          )}
                        >
                          {dot.start.label}
                        </span>
                      </div>
                    </foreignObject>
                  </motion.g>
                ) : null}
              </g>

              <g key={`end-${index}`}>
                <motion.g
                  onHoverStart={() => setHoveredLocation(dot.end.label || `Destination ${index + 1}`)}
                  onHoverEnd={() => setHoveredLocation(null)}
                  className="cursor-pointer"
                  whileHover={{ scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <circle cx={endPoint.x} cy={endPoint.y} r="3" fill={lineColor} filter="url(#glow)" className="drop-shadow-lg" />
                  <circle cx={endPoint.x} cy={endPoint.y} r="3" fill={lineColor} opacity="0.5">
                    <animate attributeName="r" from="3" to="12" dur="2s" begin="0.5s" repeatCount="indefinite" />
                    <animate attributeName="opacity" from="0.6" to="0" dur="2s" begin="0.5s" repeatCount="indefinite" />
                  </circle>
                </motion.g>

                {showLabels && dot.end.label ? (
                  <motion.g
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 * index + 0.5, duration: 0.5 }}
                    className="pointer-events-none"
                  >
                    <foreignObject x={endPoint.x - 56} y={endPoint.y - 36} width="112" height="32" className="block">
                      <div className="flex h-full items-center justify-center">
                        <span
                          className={cn(
                            "rounded-md border border-zyra-border-default bg-zyra-bg-secondary/95 px-2 py-0.5 font-medium text-zyra-text-primary shadow-sm backdrop-blur-sm",
                            labelClassName
                          )}
                        >
                          {dot.end.label}
                        </span>
                      </div>
                    </foreignObject>
                  </motion.g>
                ) : null}
              </g>
            </g>
          )
        })}
      </svg>

      <AnimatePresence>
        {hoveredLocation ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-4 left-4 rounded-lg border border-zyra-border-default bg-zyra-bg-secondary/90 px-3 py-2 text-sm font-medium text-zyra-text-primary backdrop-blur-sm sm:hidden"
          >
            {hoveredLocation}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}