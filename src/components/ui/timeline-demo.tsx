import React from "react"
import { Timeline } from "@/components/ui/timeline"

export function TimelineDemo() {
  const data = [
    {
      title: "Discovery",
      content: <p className="text-sm text-zyra-text-secondary">Problem framing, technical constraints, and roadmap alignment.</p>,
    },
    {
      title: "Design",
      content: <p className="text-sm text-zyra-text-secondary">UX direction, interface systems, and production-ready design decisions.</p>,
    },
    {
      title: "Launch",
      content: <p className="text-sm text-zyra-text-secondary">Build completion, QA, release execution, and post-launch iteration.</p>,
    },
  ]

  return <Timeline data={data} />
}