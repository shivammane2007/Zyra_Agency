"use client"

import { Calendar, Clock3, Code2, FileText, UserRound } from "lucide-react"

import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline"

const timelineData = [
  {
    id: 1,
    title: "Planning",
    date: "Jan 2024",
    content: "Project planning and requirements gathering phase.",
    category: "Planning",
    icon: Calendar,
    relatedIds: [2],
    status: "completed" as const,
    energy: 100,
    highlights: ["Product brief", "Roadmap", "Scope"],
  },
  {
    id: 2,
    title: "Design",
    date: "Feb 2024",
    content: "UI and UX design alongside system architecture definition.",
    category: "Design",
    icon: FileText,
    relatedIds: [1, 3],
    status: "completed" as const,
    energy: 86,
    highlights: ["Flows", "Wireframes", "Design system"],
  },
  {
    id: 3,
    title: "Development",
    date: "Mar 2024",
    content: "Core features implementation and iterative testing.",
    category: "Development",
    icon: Code2,
    relatedIds: [2, 4],
    status: "in-progress" as const,
    energy: 64,
    highlights: ["Frontend", "Backend", "QA"],
  },
  {
    id: 4,
    title: "Testing",
    date: "Apr 2024",
    content: "User testing, performance hardening, and bug fixing.",
    category: "Testing",
    icon: UserRound,
    relatedIds: [3, 5],
    status: "pending" as const,
    energy: 34,
    highlights: ["Regression", "Load test", "Refinement"],
  },
  {
    id: 5,
    title: "Release",
    date: "May 2024",
    content: "Final deployment and controlled production rollout.",
    category: "Release",
    icon: Clock3,
    relatedIds: [4],
    status: "pending" as const,
    energy: 18,
    highlights: ["Deploy", "Observe", "Iterate"],
  },
]

export function RadialOrbitalTimelineDemo() {
  return <RadialOrbitalTimeline timelineData={timelineData} />
}