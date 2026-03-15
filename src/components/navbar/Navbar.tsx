"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, X, ArrowRight } from "lucide-react"
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion"
import { cn } from "@/lib/utils"

const NAV_LINKS = [
  { name: "Philosophy", href: "/#philosophy", type: "scroll" },
  { name: "Services", href: "/#services", type: "scroll" },
  { name: "Process", href: "/#process", type: "scroll" },
  { name: "Projects", href: "/#projects", type: "scroll" },
  { name: "Team", href: "/#team", type: "scroll" },
  { name: "Contact", href: "/#contact", type: "scroll" },
]

function MagneticButton({ children, className, href }: { children: React.ReactNode; className?: string; href: string }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 }
  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
    const centerX = left + width / 2
    const centerY = top + height / 2
    const distanceX = clientX - centerX
    const distanceY = clientY - centerY

    x.set(distanceX * 0.35)
    y.set(distanceY * 0.35)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative"
    >
      <Link href={href} className={className}>
        {children}
      </Link>
    </motion.div>
  )
}
import Image from "next/image"

function NavbarComponent() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const [activeSection, setActiveSection] = React.useState("")
  
  const { scrollY } = useScroll()
  
  // Dynamic header heights and transitions
  const headerHeight = useTransform(scrollY, [0, 80], ["5.5rem", "4.25rem"])
  const headerBg = useTransform(
    scrollY,
    [0, 80],
    ["rgba(8, 8, 8, 0)", "rgba(8, 8, 8, 0.75)"]
  )
  const headerBlur = useTransform(scrollY, [0, 80], ["blur(0px)", "blur(16px)"])
  const headerBorder = useTransform(
    scrollY,
    [0, 80],
    ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.08)"]
  )
  const logoScale = useTransform(scrollY, [0, 80], [1, 0.9])


  React.useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -50% 0px", // Focus on the center area of the viewport
      threshold: 0,
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    const sections = ["philosophy", "services", "process", "projects", "team", "faq", "contact"]
    sections.forEach((id) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => {
      sections.forEach((id) => {
        const element = document.getElementById(id)
        if (element) observer.unobserve(element)
      })
    }
  }, [])

  React.useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
  }, [isMobileMenuOpen])

  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, type: string) => {
    if (type === "scroll" && window.location.pathname === "/") {
      e.preventDefault()
      const targetId = href.split("#")[1]
      const element = document.getElementById(targetId)
      if (element) {
        // Immediate state update to prevent incorrect highlighting during scroll
        setActiveSection(targetId)
        
        const offset = window.scrollY > 20 ? 68 : 88
        const elementPosition = element.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - offset

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        })
      }
      setIsMobileMenuOpen(false)
    } else {
      // For page links or if we are not on the homepage, let the Link component handle it
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <>
      <motion.header
        style={{ 
          height: headerHeight,
          backgroundColor: headerBg,
          backdropFilter: headerBlur,
          borderBottomColor: headerBorder
        }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-transparent transition-colors duration-300 transform-gpu will-change-[height,background-color,backdrop-filter]"
      >
        <div className="mx-auto h-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-full items-center justify-between">
            {/* Logo */}
            <motion.div style={{ scale: logoScale }} className="flex-shrink-0 origin-left">
              <Link
                href="/"
                className="group relative flex items-center transition-opacity hover:opacity-90"
                onClick={(e) => {
                  if (window.location.pathname === "/") {
                    e.preventDefault()
                    window.scrollTo({ top: 0, behavior: "smooth" })
                    setActiveSection("")
                  }
                }}
              >
                <div className="relative flex items-center gap-3">
                  <div className="relative h-10 w-auto sm:h-12 flex items-center">
                    <Image
                      src="/logo/logo.jpeg"
                      alt="Zyra Logo"
                      width={120}
                      height={48}
                      className="h-8 w-auto sm:h-10 object-contain brightness-110 drop-shadow-[0_0_8px_rgba(57,255,135,0.2)]"
                      priority
                    />
                  </div>
                  <span className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-zyra-text-primary">
                    Zyra
                  </span>
                </div>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-10">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.href.split("#")[1]
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavLinkClick(e, link.href, link.type)}
                    className={cn(
                      "relative text-sm font-medium transition-all duration-300 hover:text-zyra-text-primary",
                      isActive
                        ? "text-zyra-accent-neon [text-shadow:0_0_12px_rgba(57,255,135,0.4)]"
                        : "text-zyra-text-secondary"
                    )}
                  >
                    {link.name}
                    {isActive && (
                      <motion.div
                        layoutId="nav-active"
                        className="absolute -bottom-1 left-0 right-0 h-px bg-zyra-accent-neon shadow-[0_0_8px_rgba(57,255,135,0.8)]"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                )
              })}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-6">
              <MagneticButton
                href="/start-project"
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full border border-zyra-accent-neon bg-transparent px-6 py-2.5 text-sm font-semibold text-zyra-text-primary transition-all hover:border-zyra-accent-white hover:shadow-[0_0_20px_rgba(57,255,135,0.3)]"
              >
                <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-150%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(150%)]">
                  <div className="relative h-full w-8 bg-zyra-accent-glow" />
                </div>
                <span className="relative z-10">Start Project</span>
              </MagneticButton>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-4 lg:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md p-2 text-zyra-text-primary transition-colors hover:bg-zyra-bg-elevated"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-expanded={isMobileMenuOpen}
                aria-label="Toggle mobile menu"
              >
                <AnimatePresence mode="wait">
                  {isMobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ opacity: 0, rotate: -90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: 90 }}
                    >
                      <X className="h-6 w-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ opacity: 0, rotate: 90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: -90 }}
                    >
                      <Menu className="h-6 w-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence mode="wait">
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-zyra-bg-primary/90 pt-24 sm:pt-32 transform-gpu will-change-[opacity,backdrop-filter]"
          >
            <div className="flex h-full flex-col px-6 transform-gpu">
              <nav className="flex flex-col gap-8">
                {NAV_LINKS.map((link, idx) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={(e) => handleNavLinkClick(e, link.href, link.type)}
                      className={cn(
                        "flex items-center justify-between border-b border-zyra-border-subtle pb-4 text-3xl font-medium transition-colors hover:text-zyra-accent-neon",
                        activeSection === link.href.split("#")[1]
                          ? "text-zyra-accent-neon"
                          : "text-zyra-text-primary"
                      )}
                    >
                      {link.name}
                      <ArrowRight className="h-6 w-6 opacity-30 group-hover:opacity-100" />
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-12 mt-auto flex flex-col gap-4"
              >
                <Link
                  href="/start-project"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex w-full items-center justify-center rounded-full bg-zyra-accent-neon py-5 text-center text-lg font-bold text-black transition-all hover:shadow-[0_0_30px_rgba(57,255,135,0.4)] active:scale-95"
                >
                  Start Your Project
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export const Navbar = React.memo(NavbarComponent)
