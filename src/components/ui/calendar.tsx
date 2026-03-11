"use client"

import React from "react"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]

const CalendarDay: React.FC<{ day: number | string; isHeader?: boolean; isAccent?: boolean }> = ({
  day,
  isHeader,
  isAccent,
}) => {
  return (
    <div
      className={cn(
        "col-span-1 row-span-1 flex h-8 w-8 items-center justify-center",
        isHeader ? "" : "rounded-xl",
        isHeader ? "text-zyra-text-secondary" : "text-zyra-text-tertiary",
        isAccent ? "bg-zyra-accent-neon text-black shadow-[0_0_18px_rgba(57,255,135,0.2)]" : ""
      )}
    >
      <span className={cn("font-medium", isHeader ? "text-[10px] tracking-[0.22em]" : "text-sm")}>{day}</span>
    </div>
  )
}

export function Calendar() {
  const currentDate = new Date()
  const currentMonth = currentDate.toLocaleString("default", { month: "long" })
  const currentYear = currentDate.getFullYear()
  const firstDayOfMonth = new Date(currentYear, currentDate.getMonth(), 1)
  const firstDayOfWeek = firstDayOfMonth.getDay()
  const daysInMonth = new Date(currentYear, currentDate.getMonth() + 1, 0).getDate()
  const bookingLink = "https://cal.com/aliimam/designali"
  const accentDays = new Set([currentDate.getDate(), Math.min(currentDate.getDate() + 4, daysInMonth), Math.max(currentDate.getDate() - 3, 1)])

  const renderCalendarDays = () => {
    return [
      ...dayNames.map((day) => <CalendarDay key={`header-${day}`} day={day} isHeader />),
      ...Array.from({ length: firstDayOfWeek }).map((_, index) => (
        <div key={`empty-start-${index}`} className="col-span-1 row-span-1 h-8 w-8" />
      )),
      ...Array.from({ length: daysInMonth }).map((_, index) => {
        const day = index + 1
        return <CalendarDay key={`date-${day}`} day={day} isAccent={accentDays.has(day)} />
      }),
    ]
  }

  return (
    <BentoCard linkTo={bookingLink} className="h-full">
      <div className="grid h-full gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
        <div>
          <p className="mb-3 text-xs uppercase tracking-[0.24em] text-zyra-accent-neon">Book a Call</p>
          <h2 className="mb-4 font-heading text-2xl font-semibold text-zyra-text-primary md:text-4xl">
            Any questions about the product direction?
          </h2>
          <p className="mb-4 max-w-md text-sm leading-relaxed text-zyra-text-secondary md:text-base">
            If the scope is still taking shape, a short working session is usually the fastest way to clarify priorities and next steps.
          </p>
          <div className="flex items-center gap-4">
            <Button className="mt-2 rounded-2xl bg-zyra-accent-neon px-5 text-black hover:bg-zyra-accent-neon/90">
              Book Now
            </Button>
            <div className="hidden text-xs uppercase tracking-[0.22em] text-zyra-text-tertiary sm:block">30 min intro</div>
          </div>
        </div>

        <div className="transition-all duration-500 ease-out lg:group-hover:translate-x-2 lg:group-hover:-translate-y-1">
          <div className="w-full rounded-[24px] border border-zyra-border-default bg-zyra-bg-secondary/60 p-2 transition-colors duration-200 group-hover:border-zyra-accent-neon/40">
            <div
              className="rounded-2xl border border-white/5 bg-zyra-bg-card p-4"
              style={{ boxShadow: "0px 2px 1.5px 0px rgba(165,174,184,0.12) inset" }}
            >
              <div className="flex items-center space-x-2">
                <p className="text-sm text-zyra-text-primary">
                  <span className="font-medium">
                    {currentMonth}, {currentYear}
                  </span>
                </p>
                <span className="h-1 w-1 rounded-full bg-zyra-text-tertiary" />
                <p className="text-xs uppercase tracking-[0.18em] text-zyra-text-tertiary">30 min call</p>
              </div>
              <div className="mt-4 grid grid-cols-7 gap-2 px-2 sm:px-4">{renderCalendarDays()}</div>
            </div>
          </div>
        </div>
      </div>
    </BentoCard>
  )
}

interface BentoCardProps {
  children: React.ReactNode
  className?: string
  showHoverGradient?: boolean
  hideOverflow?: boolean
  linkTo?: string
}

export function BentoCard({
  children,
  className = "",
  showHoverGradient = true,
  hideOverflow = true,
  linkTo,
}: BentoCardProps) {
  const cardContent = (
    <div
      className={cn(
        "group relative flex flex-col rounded-[2rem] border border-zyra-border-subtle bg-[radial-gradient(circle_at_top,rgba(57,255,135,0.08),transparent_45%),linear-gradient(160deg,#111111_0%,#090909_100%)] p-6 transition-colors hover:bg-[radial-gradient(circle_at_top,rgba(57,255,135,0.11),transparent_45%),linear-gradient(160deg,#141414_0%,#090909_100%)] sm:p-8",
        hideOverflow ? "overflow-hidden" : "",
        className
      )}
    >
      {linkTo ? (
        <div className="absolute right-6 top-6 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-zyra-border-default bg-zyra-bg-secondary/95 opacity-0 transition-all duration-300 ease-in-out group-hover:translate-y-[-4px] group-hover:opacity-100">
          <ArrowUpRight className="h-5 w-5 text-zyra-accent-neon" />
        </div>
      ) : null}
      {showHoverGradient ? (
        <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-tl from-zyra-accent-neon/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100" />
      ) : null}
      <div className="relative z-10">{children}</div>
    </div>
  )

  if (linkTo) {
    return linkTo.startsWith("/") ? (
      <Link href={linkTo} className="block h-full">
        {cardContent}
      </Link>
    ) : (
      <a href={linkTo} target="_blank" rel="noopener noreferrer" className="block h-full">
        {cardContent}
      </a>
    )
  }

  return cardContent
}