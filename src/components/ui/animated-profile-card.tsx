"use client"

import * as React from "react"
import { forwardRef, useCallback, useRef } from "react"
import { useTheme } from "next-themes"
import { useGSAP } from "@gsap/react"
import { gsap } from "gsap"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"

gsap.registerPlugin(useGSAP)

export type SocialItem = {
  id: string
  url: string
  icon: React.ReactNode
  label: string
}

export interface IdentityCardProps extends React.HTMLAttributes<HTMLDivElement> {
  fullName: string
  place: string
  about: string
  avatarUrl: string
  avatarText: string
  scheme?: "plain" | "accented"
  socials?: SocialItem[]
  displayAvatar?: boolean
  titleCss?: React.CSSProperties
  cardCss?: React.CSSProperties
  descClass?: string
  bioClass?: string
  footerClass?: string
}

export const IdentityCardBody = forwardRef<HTMLDivElement, IdentityCardProps>(
  (
    {
      fullName,
      place,
      about,
      avatarUrl,
      avatarText,
      scheme = "plain",
      socials = [],
      displayAvatar = true,
      titleCss,
      cardCss,
      descClass,
      bioClass,
      footerClass,
      className,
      ...rest
    },
    ref
  ) => {
    const isAccent = scheme === "accented"

    return (
      <Card
        ref={ref}
        style={cardCss}
        className={cn(
          "flex h-full flex-col rounded-[1.75rem] border-0 p-7 shadow-none",
          isAccent
            ? "text-[var(--on-accent-foreground)]"
            : "bg-[linear-gradient(180deg,rgba(18,18,18,0.98)_0%,rgba(9,9,9,1)_100%)] text-card-foreground",
          className
        )}
        {...rest}
      >
        <CardHeader className="p-0">
          <div className={cn(!displayAvatar && "invisible")}>
            <Avatar
              className="h-16 w-16 border border-white/10 ring-2 ring-offset-4 ring-offset-card"
              style={
                {
                  "--tw-ring-color": "var(--accent-color)",
                } as React.CSSProperties
              }
            >
              <AvatarImage src={avatarUrl} alt={fullName} />
              <AvatarFallback>{avatarText}</AvatarFallback>
            </Avatar>
          </div>
          <CardDescription
            className={cn("pt-6 text-left text-xs uppercase tracking-[0.22em]", !isAccent && "text-muted-foreground", descClass)}
            style={isAccent ? { color: "var(--on-accent-muted-foreground)" } : {}}
          >
            {place}
          </CardDescription>
          <CardTitle
            className="text-left font-heading text-3xl"
            style={{
              ...(isAccent ? { color: "var(--on-accent-foreground)" } : {}),
              ...titleCss,
            }}
          >
            {fullName}
          </CardTitle>
        </CardHeader>

        <CardContent className="mt-6 flex-grow p-0">
          <p
            className={cn("text-left text-base leading-relaxed", !isAccent && "text-foreground/80", bioClass)}
            style={isAccent ? { opacity: 0.92 } : {}}
          >
            {about}
          </p>
        </CardContent>

        {socials.length > 0 && (
          <CardFooter className={cn("mt-6 p-0", footerClass)}>
            <div
              className={cn("flex items-center gap-4", !isAccent && "text-muted-foreground")}
              style={isAccent ? { color: "var(--on-accent-muted-foreground)" } : undefined}
            >
              {socials.map((item) => (
                <a
                  key={item.id}
                  href={item.url}
                  aria-label={item.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "transition-opacity duration-300",
                    isAccent ? "hover:opacity-75" : "hover:text-foreground"
                  )}
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </CardFooter>
        )}
      </Card>
    )
  }
)
IdentityCardBody.displayName = "IdentityCardBody"

export interface RevealCardProps extends React.HTMLAttributes<HTMLDivElement> {
  base: React.ReactNode
  overlay: React.ReactNode
  accent?: string
  textOnAccent?: string
  mutedOnAccent?: string
}

export const RevealCardContainer = forwardRef<HTMLDivElement, RevealCardProps>(
  (
    {
      base,
      overlay,
      accent = "var(--primary)",
      textOnAccent = "#fff",
      mutedOnAccent = "rgba(255,255,255,0.8)",
      className,
      ...rest
    },
    ref
  ) => {
    const holderRef = useRef<HTMLDivElement>(null)
    const overlayRef = useRef<HTMLDivElement>(null)
    const { resolvedTheme } = useTheme()
    const overlayMode = resolvedTheme === "dark" ? "light" : "dark"

    const assignRef = useCallback(
      (element: HTMLDivElement | null) => {
        holderRef.current = element
        if (typeof ref === "function") ref(element)
        else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = element
      },
      [ref]
    )

    const startClip = "circle(54px at 64px 64px)"
    const expandClip = "circle(160% at 64px 64px)"

    useGSAP(
      () => {
        gsap.set(overlayRef.current, { clipPath: startClip })
      },
      { scope: holderRef }
    )

    const reveal = () => {
      gsap.to(overlayRef.current, {
        clipPath: expandClip,
        duration: 0.8,
        ease: "expo.inOut",
      })
    }

    const conceal = () => {
      gsap.to(overlayRef.current, {
        clipPath: startClip,
        duration: 1,
        ease: "expo.out(1, 1)",
      })
    }

    return (
      <div
        ref={assignRef}
        onMouseEnter={reveal}
        onMouseLeave={conceal}
        style={
          {
            "--accent-color": accent,
            "--on-accent-foreground": textOnAccent,
            "--on-accent-muted-foreground": mutedOnAccent,
            borderColor: "var(--accent-color)",
          } as React.CSSProperties
        }
        className={cn("relative w-[350px] overflow-hidden rounded-[1.75rem] border-2 shadow-[0_18px_60px_rgba(0,0,0,0.25)]", className)}
        {...rest}
      >
        <div>{base}</div>
        <div ref={overlayRef} className={cn("absolute inset-0 h-full w-full", overlayMode)}>
          {overlay}
        </div>
      </div>
    )
  }
)
RevealCardContainer.displayName = "RevealCardContainer"