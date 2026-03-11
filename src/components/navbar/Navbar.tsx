"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, X, ArrowRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { ThemeToggle } from "@/components/theme/ThemeToggle"

const NAV_LINKS = [
  { name: "Philosophy", href: "/#philosophy" },
  { name: "Services", href: "/services" },
  { name: "Process", href: "/#process" },
  { name: "Projects", href: "/projects" },
  { name: "Team", href: "/team" },
  { name: "Contact", href: "/contact" },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  React.useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
  }, [isMobileMenuOpen])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "backdrop-blur-xl bg-zyra-bg-primary/60 border-b border-zyra-border-subtle"
            : "bg-transparent border-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link
                href="/"
                className="font-heading text-2xl font-bold tracking-tight text-zyra-text-primary"
              >
                Zyra
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-zyra-text-secondary transition-colors hover:text-zyra-text-primary"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-4">
              <ThemeToggle />
              <Link
                href="/contact"
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-md border border-zyra-accent-neon bg-transparent px-5 py-2.5 text-sm font-medium text-zyra-text-primary transition-all hover:border-zyra-accent-white"
              >
                <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-150%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(150%)]">
                  <div className="relative h-full w-8 bg-zyra-accent-glow" />
                </div>
                <span className="relative z-10">Start Project</span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-4 lg:hidden">
              <ThemeToggle />
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md p-2 text-zyra-text-primary transition-colors hover:bg-zyra-bg-elevated"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-expanded={isMobileMenuOpen}
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-zyra-bg-primary pt-24"
          >
            <div className="flex h-full flex-col px-6">
              <nav className="flex flex-col gap-6">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between border-b border-zyra-border-subtle pb-4 text-2xl font-medium text-zyra-text-primary transition-colors hover:text-zyra-accent-neon"
                  >
                    {link.name}
                    <ArrowRight className="h-5 w-5 opacity-50" />
                  </Link>
                ))}
              </nav>

              <div className="mb-10 mt-auto flex flex-col gap-4">
                <Link
                  href="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex w-full items-center justify-center rounded-md bg-zyra-accent-neon py-4 text-center font-medium text-black transition-opacity hover:opacity-90"
                >
                  Start Your Project
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
