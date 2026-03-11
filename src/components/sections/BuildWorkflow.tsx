"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Lightbulb, Layers, Code, ShieldCheck, Rocket } from "lucide-react"
import { SectionLabel } from "@/components/ui/SectionLabel"
import { useScrollProgress } from "@/hooks/useScrollProgress"
import { cn } from "@/lib/utils"

const STEPS = [
  {
    number: "01",
    icon: Lightbulb,
    title: "Idea",
    description:
      "Every great product begins with a clear idea. We help founders refine concepts and validate product vision before a single line of code is written.",
  },
  {
    number: "02",
    icon: Layers,
    title: "Design",
    description:
      "Our designers craft intuitive interfaces and user experiences that people love. Every pixel is intentional, every flow is user-tested.",
  },
  {
    number: "03",
    icon: Code,
    title: "Engineering",
    description:
      "Our engineers build scalable and high-performance systems using modern technologies. Clean architecture, typed code, reviewed and battle-tested.",
  },
  {
    number: "04",
    icon: ShieldCheck,
    title: "Testing",
    description:
      "Every feature is rigorously tested to ensure reliability and performance. Automated suites, load testing, and QA before every release.",
  },
  {
    number: "05",
    icon: Rocket,
    title: "Launch",
    description:
      "We deploy products globally with optimized infrastructure, monitoring, and rollback safety. Your product goes live — ready to scale.",
  },
]

const scaleFade = {
  initial: { opacity: 0, scale: 0.92 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 1.05 },
  transition: { duration: 0.4 },
}

// Left visual components for each step
function StepVisual({ step }: { step: number }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={step}
        variants={scaleFade}
        initial="initial"
        animate="animate"
        exit="exit"
        className="absolute inset-0 flex items-center justify-center p-8"
      >
        <div className="relative flex aspect-square w-full max-w-md items-center justify-center rounded-3xl border border-zyra-border-subtle bg-zyra-bg-secondary p-8 shadow-2xl overflow-hidden">
          {/* Radial gradient background based on step */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background: `radial-gradient(circle at center, var(--color-zyra-accent-neon) 0%, transparent 70%)`,
              filter: `hue-rotate(${step * 15}deg)`,
              transition: "filter 0.5s ease",
            }}
          />

          {/* Actual visuals per step */}
          {step === 0 && (
             <div className="relative flex items-center justify-center">
               <motion.div
                 animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                 transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                 className="absolute h-32 w-32 rounded-full border border-zyra-accent-neon/30 bg-zyra-accent-glow"
               />
               <motion.div
                 animate={{ scale: [1, 1.1, 1], rotate: [0, 90, 180, 360] }}
                 transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                 className="absolute h-48 w-48 rounded-full border border-dashed border-zyra-accent-neon/20"
               />
               <Lightbulb className="z-10 h-16 w-16 text-zyra-accent-neon" />
             </div>
          )}
          {step === 1 && (
            <div className="relative grid w-full grid-cols-2 gap-4">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: "100%" }}
                transition={{ duration: 0.8 }}
                className="col-span-2 h-12 w-full rounded-md border border-zyra-accent-neon/20 bg-zyra-bg-elevated"
              />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="h-24 w-full rounded-md border border-zyra-accent-neon/20 bg-zyra-bg-elevated"
              />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="h-24 w-full rounded-md border border-zyra-accent-neon/20 bg-zyra-bg-elevated"
              />
            </div>
          )}
          {step === 2 && (
            <div className="relative flex items-center justify-center">
               <motion.svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100">
                  <motion.path
                    d="M 20 50 L 50 20 L 80 50 L 50 80 Z"
                    fill="none"
                    stroke="var(--color-zyra-accent-neon)"
                    strokeWidth="1"
                    strokeDasharray="1 4"
                    animate={{ strokeDashoffset: [0, 20] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                  />
               </motion.svg>
               <Code className="z-10 h-16 w-16 text-zyra-accent-neon" />
            </div>
          )}
          {step === 3 && (
            <div className="relative flex items-center justify-center">
              <motion.div
                initial={{ top: 0, opacity: 0 }}
                animate={{ top: ["0%", "100%", "0%"], opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="absolute left-0 right-0 h-1 bg-zyra-accent-neon/50 shadow-[0_0_10px_var(--color-zyra-accent-neon)]"
              />
              <ShieldCheck className="z-10 h-20 w-20 text-zyra-accent-neon" />
            </div>
          )}
          {step === 4 && (
            <div className="relative flex items-center justify-center">
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              >
                <Rocket className="z-10 h-20 w-20 text-zyra-accent-neon" />
              </motion.div>
              <motion.div
                animate={{ height: ["0%", "100%"], opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 1, ease: "easeOut" }}
                className="absolute bottom-0 h-20 w-1 bg-gradient-to-b from-zyra-accent-neon to-transparent"
              />
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

function StepCard({
  step,
  index,
  isActive,
  setActiveStep,
}: {
  step: (typeof STEPS)[0]
  index: number
  isActive: boolean
  setActiveStep: (i: number) => void
}) {
  const ref = React.useRef<HTMLDivElement>(null)
  
  // Custom hook to update active step when this card is in view
  useScrollProgress(ref, index, setActiveStep)

  const Icon = step.icon

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex min-h-[50vh] flex-col py-20 transition-all duration-700",
        isActive ? "opacity-100 scale-100" : "opacity-40 scale-95"
      )}
    >
      <div
        className={cn(
          "absolute left-0 top-1/2 h-1/2 w-[2px] -translate-y-1/2 rounded-full transition-colors duration-500 hidden lg:block",
          isActive ? "bg-zyra-accent-neon shadow-[0_0_10px_var(--color-zyra-accent-neon)]" : "bg-zyra-border-subtle"
        )}
      />
      
      <div className="lg:pl-16">
        <div className="mb-4 flex items-center gap-4">
          <span className="font-heading text-6xl font-black text-zyra-text-primary/20 tracking-tighter select-none">
            {step.number}
          </span>
          <div
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-lg border transition-colors duration-500",
              isActive
                ? "border-zyra-accent-neon bg-zyra-accent-glow"
                : "border-zyra-border-subtle bg-transparent"
            )}
          >
            <Icon
              className={cn(
                "h-6 w-6 transition-colors duration-500",
                isActive ? "text-zyra-accent-neon" : "text-zyra-text-secondary"
              )}
            />
          </div>
        </div>
        
        <h3 className="mb-4 font-heading text-3xl font-bold text-zyra-text-primary md:text-4xl">
          {step.title}
        </h3>
        
        <p className="max-w-xl text-lg text-zyra-text-secondary leading-relaxed">
          {step.description}
        </p>
      </div>
    </div>
  )
}

export function BuildWorkflow() {
  const [activeStep, setActiveStep] = React.useState(0)

  return (
    <section id="process" className="bg-zyra-bg-primary py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 md:mb-24 flex flex-col items-center text-center lg:items-start lg:text-left">
          <SectionLabel className="mb-6">Workflow</SectionLabel>
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
            }}
            className="font-heading text-4xl font-bold tracking-tight text-zyra-text-primary sm:text-5xl lg:text-6xl"
          >
            From Idea to Global Product
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.1 } }
            }}
            className="mt-6 max-w-2xl text-lg text-zyra-text-secondary"
          >
            Zyra turns ideas into scalable software using a structured engineering workflow.
          </motion.p>
        </div>

        <div className="relative flex flex-col lg:flex-row lg:items-start">
          {/* Mobile Visual Panel (not sticky, shown above steps) */}
          <div className="relative mb-12 flex h-[50vh] min-h-[400px] w-full items-center justify-center lg:hidden">
             <StepVisual step={activeStep} />
          </div>

          {/* Desktop Sticky Visual Panel */}
          <div className="hidden lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-1/2 lg:items-start lg:justify-center lg:pt-20">
            <StepVisual step={activeStep} />
          </div>

          {/* Scrolling Steps Container */}
          <div className="relative w-full lg:w-1/2">
            {STEPS.map((step, index) => (
              <StepCard
                key={step.number}
                step={step}
                index={index}
                isActive={activeStep === index}
                setActiveStep={setActiveStep}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
