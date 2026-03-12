import * as React from "react"
import { useEffect, useMemo, useRef, useState, type ElementType } from "react"
import { ArrowRight, Link2, Orbit, Zap } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export interface TimelineItem {
  id: number
  title: string
  date: string
  content: string
  category: string
  icon: ElementType
  relatedIds: number[]
  status: "completed" | "in-progress" | "pending"
  energy: number
  highlights?: string[]
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[]
  variant?: "default" | "services"
}

function getStatusStyles(status: TimelineItem["status"]) {
  switch (status) {
    case "completed":
      return "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
    case "in-progress":
      return "border-zyra-accent-neon/30 bg-zyra-accent-glow text-zyra-accent-neon"
    default:
      return "border-white/10 bg-white/5 text-zyra-text-secondary"
  }
}

const RadialOrbitalTimeline = React.memo(({ timelineData, variant = "default" }: RadialOrbitalTimelineProps) => {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({})
  const [rotationAngle, setRotationAngle] = useState(0)
  const [autoRotate, setAutoRotate] = useState(true)
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({})
  const [activeNodeId, setActiveNodeId] = useState<number | null>(timelineData[0]?.id ?? null)
  const [orbitRadius, setOrbitRadius] = useState(220)
  const containerRef = useRef<HTMLDivElement>(null)
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({})
  const isServicesVariant = variant === "services"
  const orbitOffsetX = isServicesVariant ? -28 : -20

  const activeItem = useMemo(
    () => timelineData.find((item) => item.id === activeNodeId) ?? timelineData[0] ?? null,
    [activeNodeId, timelineData]
  )

  useEffect(() => {
    if (!containerRef.current) return

    const updateRadius = () => {
      if (!containerRef.current) return
      const widthFactor = isServicesVariant ? 0.215 : 0.25
      const maxRadius = isServicesVariant ? 232 : 260
      const nextRadius = Math.max(145, Math.min(containerRef.current.offsetWidth * widthFactor, maxRadius))
      setOrbitRadius(nextRadius)
    }

    updateRadius()

    const observer = new ResizeObserver(updateRadius)
    observer.observe(containerRef.current)

    return () => observer.disconnect()
  }, [isServicesVariant])

  // JS-based rotation removed in favor of CSS animation for performance

  const getRelatedItems = (itemId: number) => {
    const currentItem = timelineData.find((item) => item.id === itemId)
    return currentItem ? currentItem.relatedIds : []
  }

  const centerViewOnNode = (nodeId: number) => {
    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId)
    if (nodeIndex === -1) return

    // Since we're using CSS animation, we disable autoRotate when a node is selected.
    // We can still set the rotationAngle for initial static placement if needed,
    // but the CSS animation will take over when autoRotate is true.
    const targetAngle = (nodeIndex / timelineData.length) * 360
    setRotationAngle(270 - targetAngle)
  }

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const isOpen = prev[id]
      const nextState: Record<number, boolean> = {}

      if (!isOpen) {
        nextState[id] = true
        setActiveNodeId(id)
        setAutoRotate(false)

        const nextPulseState: Record<number, boolean> = { [id]: true }
        getRelatedItems(id).forEach((relatedId) => {
          nextPulseState[relatedId] = true
        })
        setPulseEffect(nextPulseState)
        centerViewOnNode(id)
      } else {
        setActiveNodeId(null)
        setAutoRotate(true)
        setPulseEffect({})
      }

      return nextState
    })
  }

  const resetView = () => {
    setExpandedItems({})
    setActiveNodeId(timelineData[0]?.id ?? null)
    setPulseEffect({})
    setAutoRotate(true)
  }

  const isRelatedToActive = (itemId: number) => {
    if (!activeNodeId) return false
    return getRelatedItems(activeNodeId).includes(itemId)
  }

  const calculateNodePosition = (index: number, total: number) => {
    // rotationAngle is now 0 when autoRotate is true to allow CSS animation to handle it.
    const angle = ((index / total) * 360 + rotationAngle) % 360
    const radian = (angle * Math.PI) / 180
    const x = orbitOffsetX + orbitRadius * Math.cos(radian)
    const y = orbitRadius * Math.sin(radian)
    const zIndex = Math.round(100 + 50 * Math.cos(radian))
    const opacity = Math.max(0.42, Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2)))

    return { x, y, zIndex, opacity }
  }

  return (
    <div className="w-full" ref={containerRef}>
      <div className="grid gap-4 md:hidden">
        {timelineData.map((item) => {
          const Icon = item.icon
          const isExpanded = expandedItems[item.id]

          return (
            <Card
              key={item.id}
              className={cn(
                "overflow-hidden rounded-[1.5rem] border border-zyra-border-subtle bg-[linear-gradient(180deg,rgba(20,20,20,0.96)_0%,rgba(11,11,11,1)_100%)]",
                isExpanded && "border-zyra-accent-neon/40"
              )}
            >
              <button className="w-full text-left" onClick={() => toggleItem(item.id)} type="button">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full border border-zyra-accent-neon/20 bg-zyra-accent-glow">
                        <Icon className="h-5 w-5 text-zyra-accent-neon" />
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-[0.24em] text-zyra-accent-neon">{item.date}</p>
                        <CardTitle className="mt-2 text-lg text-zyra-text-primary">{item.title}</CardTitle>
                      </div>
                    </div>
                    <Badge className={cn("border px-3 py-1 text-[10px] uppercase tracking-[0.22em]", getStatusStyles(item.status))}>
                      {item.status === "in-progress" ? "In Progress" : item.status === "completed" ? "Complete" : "Pending"}
                    </Badge>
                  </div>
                </CardHeader>
              </button>
              <CardContent className="space-y-4">
                <p className="text-sm leading-relaxed text-zyra-text-secondary">{item.content}</p>
                {item.highlights?.length ? (
                  <div className="flex flex-wrap gap-2">
                    {item.highlights.map((highlight) => (
                      <span
                        key={highlight}
                        className="rounded-full border border-zyra-border-subtle bg-zyra-bg-secondary px-3 py-1 text-xs text-zyra-text-secondary"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                ) : null}
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div
        className={cn(
          "relative hidden items-center justify-center overflow-hidden rounded-[2rem] border border-zyra-border-subtle bg-[radial-gradient(circle_at_center,rgba(57,255,135,0.12),transparent_48%),linear-gradient(180deg,rgba(14,14,14,0.96)_0%,rgba(7,7,7,1)_100%)] px-6 py-16 md:flex",
          isServicesVariant ? "min-h-[760px] xl:px-10" : "min-h-[820px]"
        )}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            resetView()
          }
        }}
      >
        {/* Orbit Visualization Group - Adjusted position to prevent clipping while maintaining balance */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center transform-gpu will-change-transform lg:-translate-x-12 lg:mr-24">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(57,255,135,0.14),transparent_55%)] opacity-70" />
          <div
            className={cn(
              "pointer-events-none absolute rounded-full border border-zyra-accent-neon/10",
              isServicesVariant ? "h-[21rem] w-[21rem] lg:h-[25rem] lg:w-[25rem]" : "h-[24rem] w-[24rem] lg:h-[28rem] lg:w-[28rem]"
            )}
          />
          <div
            className={cn(
              "pointer-events-none absolute rounded-full border border-white/5",
              isServicesVariant ? "h-[28rem] w-[28rem]" : "h-[32rem] w-[32rem]"
            )}
          />

          <div
            className={cn(
              "pointer-events-none absolute z-10 flex items-center justify-center rounded-full border border-zyra-accent-neon/30 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.28),rgba(57,255,135,0.2)_35%,rgba(57,255,135,0.08)_70%,transparent_100%)] shadow-[0_0_40px_rgba(57,255,135,0.22)]",
              isServicesVariant ? "h-16 w-16" : "h-20 w-20"
            )}
          >
            <div className={cn("absolute rounded-full border border-zyra-accent-neon/15 animate-ping", isServicesVariant ? "h-20 w-20" : "h-24 w-24")} />
            <div className={cn("absolute rounded-full border border-white/8 animate-ping [animation-delay:600ms]", isServicesVariant ? "h-28 w-28" : "h-32 w-32")} />
            <Orbit className={cn("text-zyra-accent-neon", isServicesVariant ? "h-6 w-6" : "h-8 w-8")} />
          </div>

          {/* Orbit Wrapper with CSS Animation */}
          <div
            className={cn(
              "absolute inset-0 flex items-center justify-center transform-gpu will-change-transform",
              autoRotate && "animate-orbit"
            )}
            style={{
              animationPlayState: autoRotate ? "running" : "paused",
              backfaceVisibility: "hidden",
              perspective: 1000
            }}
          >
            {timelineData.map((item, index) => {
              const Icon = item.icon
              const position = calculateNodePosition(index, timelineData.length)
              const isExpanded = Boolean(expandedItems[item.id])
              const isRelated = isRelatedToActive(item.id)
              const isPulsing = Boolean(pulseEffect[item.id])

              return (
                <div
                  key={item.id}
                  ref={(element) => {
                    nodeRefs.current[item.id] = element
                  }}
                  className={cn("absolute transition-all", isServicesVariant ? "duration-500" : "duration-700")}
                  style={{
                    transform: `translate(${position.x}px, ${position.y}px)`,
                    zIndex: isExpanded ? 200 : position.zIndex,
                    opacity: isExpanded ? 1 : position.opacity,
                  }}
                >
                  {/* Counter-rotate content to keep it upright */}
                  <div
                    className={cn(
                      "transform-gpu will-change-transform",
                      autoRotate && "animate-orbit-reverse"
                    )}
                    style={{ animationPlayState: autoRotate ? "running" : "paused" }}
                  >
                    <button
                      className="pointer-events-auto group relative flex cursor-pointer flex-col items-center"
                      onClick={(event) => {
                        event.stopPropagation()
                        toggleItem(item.id)
                      }}
                      type="button"
                    >
                      <span
                        className={cn(
                          "absolute -inset-2 rounded-full bg-[radial-gradient(circle,rgba(57,255,135,0.24)_0%,rgba(57,255,135,0)_70%)] blur-md transition-opacity duration-300",
                          isPulsing || isExpanded ? "opacity-100" : "opacity-0"
                        )}
                        style={{ width: `${item.energy * 0.45 + 44}px`, height: `${item.energy * 0.45 + 44}px` }}
                      />
                      <span
                        className={cn(
                          "relative flex items-center justify-center rounded-full border text-white transition-all duration-300",
                          isServicesVariant ? "h-11 w-11" : "h-12 w-12",
                          isExpanded
                            ? "scale-125 border-zyra-accent-neon bg-zyra-accent-neon text-black shadow-[0_0_26px_rgba(57,255,135,0.34)]"
                            : isRelated
                              ? "border-white/60 bg-white/20 text-white"
                              : "border-white/20 bg-black/60 text-white/85"
                        )}
                      >
                        <Icon className={cn(isServicesVariant ? "h-3.5 w-3.5" : "h-4 w-4")} />
                      </span>
                      <span
                        className={cn(
                          "mt-3 whitespace-nowrap font-semibold uppercase tracking-[0.22em] transition-all duration-300",
                          isServicesVariant ? "text-[10px]" : "text-[11px]",
                          isExpanded ? "text-zyra-text-primary" : "text-zyra-text-secondary"
                        )}
                      >
                        {item.title}
                      </span>
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div
          className={cn(
            "absolute bottom-5 left-1/2 w-[min(100%,28rem)] -translate-x-1/2 px-2 lg:bottom-auto lg:px-0",
            isServicesVariant
              ? "lg:left-6 lg:top-1/2 lg:w-[22rem] lg:-translate-y-1/2 lg:translate-x-0"
              : "lg:left-auto lg:right-0 xl:right-0 lg:top-1/2 lg:w-80 lg:-translate-y-1/2 lg:translate-x-0"
          )}
        >
          <Card className={cn("overflow-hidden rounded-[1.75rem] border border-white/10 bg-black/60 backdrop-blur-xl", isServicesVariant && "bg-black/72")}>
            {activeItem ? (
              <>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <Badge className={cn("border px-3 py-1 text-[10px] uppercase tracking-[0.22em]", getStatusStyles(activeItem.status))}>
                          {activeItem.status === "in-progress"
                            ? "In Progress"
                            : activeItem.status === "completed"
                              ? "Complete"
                              : "Pending"}
                        </Badge>
                        <span className="text-xs font-medium uppercase tracking-[0.2em] text-zyra-text-secondary">{activeItem.date}</span>
                      </div>
                      <CardTitle className={cn("mt-4 text-zyra-text-primary", isServicesVariant ? "text-[1.65rem]" : "text-2xl")}>{activeItem.title}</CardTitle>
                      <p className="mt-2 text-xs uppercase tracking-[0.24em] text-zyra-accent-neon">{activeItem.category}</p>
                    </div>
                    <div className="flex h-11 w-11 items-center justify-center rounded-full border border-zyra-accent-neon/20 bg-zyra-accent-glow">
                      <activeItem.icon className="h-5 w-5 text-zyra-accent-neon" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className={cn("space-y-5 text-sm text-zyra-text-secondary", isServicesVariant && "space-y-4")}>
                  <p className="leading-relaxed">{activeItem.content}</p>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-[0.2em] text-zyra-text-secondary">
                      <span className="flex items-center gap-2">
                        <Zap className="h-3.5 w-3.5 text-zyra-accent-neon" />
                        Energy Level
                      </span>
                      <span className="font-mono text-zyra-text-primary">{activeItem.energy}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-[linear-gradient(90deg,rgba(57,255,135,0.4)_0%,rgba(57,255,135,0.95)_100%)]"
                        style={{ width: `${activeItem.energy}%` }}
                      />
                    </div>
                  </div>

                  {activeItem.highlights?.length ? (
                    <div className="flex flex-wrap gap-2">
                      {activeItem.highlights.map((highlight) => (
                        <span
                          key={highlight}
                          className="rounded-full border border-zyra-border-subtle bg-zyra-bg-secondary px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-zyra-text-secondary"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  ) : null}

                  {activeItem.relatedIds.length ? (
                    <div className="border-t border-white/10 pt-4">
                      <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-zyra-text-secondary">
                        <Link2 className="h-3.5 w-3.5 text-zyra-accent-neon" />
                        Connected Nodes
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {activeItem.relatedIds.map((relatedId) => {
                          const relatedItem = timelineData.find((item) => item.id === relatedId)

                          return relatedItem ? (
                            <Button
                              key={relatedId}
                              variant="outline"
                              size="sm"
                              className="h-8 rounded-full border-white/15 bg-white/5 px-3 text-xs text-zyra-text-primary hover:border-zyra-accent-neon/40 hover:bg-zyra-accent-glow hover:text-zyra-text-primary"
                              onClick={(event) => {
                                event.stopPropagation()
                                toggleItem(relatedId)
                              }}
                              type="button"
                            >
                              {relatedItem.title}
                              <ArrowRight className="ml-1 h-3 w-3" />
                            </Button>
                          ) : null
                        })}
                      </div>
                    </div>
                  ) : null}
                </CardContent>
              </>
            ) : (
              <CardContent className="p-6 text-sm text-zyra-text-secondary">
                Select a node to inspect this delivery phase.
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
})

RadialOrbitalTimeline.displayName = "RadialOrbitalTimeline"

export default RadialOrbitalTimeline
