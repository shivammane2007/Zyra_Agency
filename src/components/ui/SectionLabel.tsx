import * as React from "react"
import { cn } from "@/lib/utils"

interface SectionLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function SectionLabel({ children, className, ...props }: SectionLabelProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-zyra-border-subtle bg-zyra-bg-elevated px-4 py-1.5 text-sm font-medium text-zyra-text-secondary",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
