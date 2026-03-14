"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion, AnimatePresence } from "framer-motion"
import { Mail, MapPin, Phone } from "lucide-react"
import { useForm } from "react-hook-form"
import { Navbar } from "@/components/navbar/Navbar"
import { Footer } from "@/components/sections/Footer"
import { Calendar } from "@/components/ui/calendar"
import { LocationTag } from "@/components/ui/location-tag"
import { WorldMap } from "@/components/ui/map"
import { PracticalEffect } from "@/components/ui/practical_effect"
import { SectionLabel } from "@/components/ui/SectionLabel"
import { TextDisperse } from "@/components/ui/text-disperse"
import { contactSchema, type ContactFormValues } from "@/lib/contact-schema"

const CONTACT_DETAILS = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@zyra.agency",
  },
  {
    icon: Phone,
    label: "Call",
    value: "+1 (555) 014-2098",
  },
  {
    icon: MapPin,
    label: "Base",
    value: "Remote-first, global delivery",
  },
]

const CONTACT_ROUTES = [
  {
    start: { lat: 37.7749, lng: -122.4194, label: "San Francisco" },
    end: { lat: 51.5074, lng: -0.1278, label: "London" },
  },
  {
    start: { lat: 51.5074, lng: -0.1278, label: "London" },
    end: { lat: 25.2048, lng: 55.2708, label: "Dubai" },
  },
  {
    start: { lat: 25.2048, lng: 55.2708, label: "Dubai" },
    end: { lat: 28.6139, lng: 77.209, label: "New Delhi" },
  },
  {
    start: { lat: 1.3521, lng: 103.8198, label: "Singapore" },
    end: { lat: -33.8688, lng: 151.2093, label: "Sydney" },
  },
]

export default function StartProjectPage() {
  const [submitMessage, setSubmitMessage] = React.useState<string | null>(null)
  const [submitError, setSubmitError] = React.useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      budget: "",
      message: "",
    },
  })

  const onSubmit = async (values: ContactFormValues) => {
    setSubmitMessage(null)
    setSubmitError(null)

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })

    const data = (await response.json()) as {
      success: boolean
      message?: string
      error?: string
    }

    if (!response.ok || !data.success) {
      setSubmitError(data.error ?? "Unable to process your inquiry right now. Please try again.")
      // Auto-dismiss error after 7 seconds
      setTimeout(() => setSubmitError(null), 7000)
      return
    }

    setSubmitMessage(data.message ?? "Inquiry received.")
    reset()
    // Auto-dismiss success message after 7 seconds
    setTimeout(() => setSubmitMessage(null), 7000)
  }

  return (
    <>
      <Navbar />
      <div className="relative isolate">
        <PracticalEffect className="-z-10 opacity-40 [mask-image:linear-gradient(to_bottom,transparent_0,black_8rem,black_calc(100%-4rem),transparent_100%)]" />
        <div className="relative z-10">
          <main className="min-h-screen pt-32">
            <section id="start-project" className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
              <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
                <div>
                  <SectionLabel className="mb-6">Start Project</SectionLabel>
                  <h1 className="max-w-3xl font-heading text-5xl font-bold tracking-tight text-zyra-text-primary sm:text-6xl lg:text-7xl">
                    Tell Us What You Need to Build Next
                  </h1>
                  <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zyra-text-secondary">
                    Share the product context, the current bottleneck, and the speed you need. We will respond with the clearest next step.
                  </p>

                  <div className="mt-10 space-y-4">
                    {CONTACT_DETAILS.map((item) => {
                      const Icon = item.icon

                      return (
                        <div
                          key={item.label}
                          className="flex items-center gap-4 rounded-2xl border border-zyra-border-subtle bg-zyra-bg-card p-5"
                        >
                          <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-zyra-accent-neon/20 bg-zyra-accent-glow">
                            <Icon className="h-5 w-5 text-zyra-accent-neon" />
                          </div>
                          <div>
                            <p className="text-xs uppercase tracking-[0.2em] text-zyra-text-secondary">{item.label}</p>
                            {item.label === "Call" ? (
                              <div className="mt-1 h-8 overflow-visible">
                                <TextDisperse
                                  aria-label={item.value}
                                  className="w-fit justify-start gap-[0.01em] text-[1.05rem] font-medium leading-none text-zyra-text-primary"
                                >
                                  555-014-2098
                                </TextDisperse>
                              </div>
                            ) : (
                              <p className="mt-1 text-zyra-text-primary">{item.value}</p>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div className="flex min-h-[420px] flex-col rounded-[2rem] border border-zyra-border-subtle bg-zyra-bg-card p-8 sm:p-10">
                  <form className="flex h-full flex-col" onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className="space-y-5">
                      <div className="grid gap-5 sm:grid-cols-2">
                        <Field label="Name" error={errors.name?.message}>
                          <input
                            {...register("name")}
                            aria-invalid={Boolean(errors.name)}
                            className="h-12 w-full rounded-xl border border-zyra-border-default bg-zyra-bg-primary px-4 text-zyra-text-primary outline-none transition-colors focus:border-zyra-accent-neon"
                            placeholder="Your name"
                            suppressHydrationWarning
                          />
                        </Field>
                        <Field label="Email" error={errors.email?.message}>
                          <input
                            {...register("email")}
                            type="email"
                            aria-invalid={Boolean(errors.email)}
                            className="h-12 w-full rounded-xl border border-zyra-border-default bg-zyra-bg-primary px-4 text-zyra-text-primary outline-none transition-colors focus:border-zyra-accent-neon"
                            placeholder="you@company.com"
                            suppressHydrationWarning
                          />
                        </Field>
                      </div>

                      <div className="grid gap-5 sm:grid-cols-2">
                        <Field label="Company" error={errors.company?.message}>
                          <input
                            {...register("company")}
                            aria-invalid={Boolean(errors.company)}
                            className="h-12 w-full rounded-xl border border-zyra-border-default bg-zyra-bg-primary px-4 text-zyra-text-primary outline-none transition-colors focus:border-zyra-accent-neon"
                            placeholder="Company or team"
                            suppressHydrationWarning
                          />
                        </Field>
                        <Field label="Budget or stage" error={errors.budget?.message}>
                          <input
                            {...register("budget")}
                            aria-invalid={Boolean(errors.budget)}
                            className="h-12 w-full rounded-xl border border-zyra-border-default bg-zyra-bg-primary px-4 text-zyra-text-primary outline-none transition-colors focus:border-zyra-accent-neon"
                            placeholder="Range, phase, or timeline"
                            suppressHydrationWarning
                          />
                        </Field>
                      </div>

                      <Field label="Project details" error={errors.message?.message}>
                        <textarea
                          {...register("message")}
                          rows={6}
                          aria-invalid={Boolean(errors.message)}
                          className="w-full rounded-xl border border-zyra-border-default bg-zyra-bg-primary px-4 py-3 text-zyra-text-primary outline-none transition-colors focus:border-zyra-accent-neon"
                          placeholder="What are you building, what is blocked, and what outcome matters most?"
                          suppressHydrationWarning
                        />
                      </Field>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex h-12 items-center justify-center rounded-full bg-zyra-accent-neon px-6 font-medium text-black transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                        suppressHydrationWarning
                      >
                        {isSubmitting ? "Sending..." : "Send inquiry"}
                      </button>

                      <AnimatePresence mode="wait">
                        {submitMessage && (
                          <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="rounded-xl border border-zyra-accent-neon/30 bg-zyra-accent-glow px-4 py-3 text-sm text-zyra-text-primary"
                          >
                            {submitMessage}
                          </motion.p>
                        )}
                      </AnimatePresence>

                      <AnimatePresence mode="wait">
                        {submitError && (
                          <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300"
                          >
                            {submitError}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>

                    <div className="flex flex-1 items-center justify-center pt-8">
                      <LocationTag city="San Francisco" country="USA" timezone="PST" />
                    </div>
                  </form>
                </div>
              </div>

              <div className="mt-16">
                <div className="mb-8 max-w-3xl">
                  <SectionLabel className="mb-4">Scheduling</SectionLabel>
                  <h2 className="font-heading text-3xl font-bold tracking-tight text-zyra-text-primary sm:text-4xl">
                    Book Time When a Short Working Session Is Faster
                  </h2>
                  <p className="mt-4 text-lg leading-relaxed text-zyra-text-secondary">
                    If you already know the problem but need sharper direction, use a focused intro call to align on priorities, technical scope, and the right next step.
                  </p>
                </div>

                <Calendar />
              </div>

              <div className="mt-16">
                <div className="mb-8 max-w-3xl">
                  <SectionLabel className="mb-4">Global Delivery</SectionLabel>
                  <h2 className="font-heading text-3xl font-bold tracking-tight text-zyra-text-primary sm:text-4xl">
                    Remote Collaboration Across Product Hubs
                  </h2>
                  <p className="mt-4 text-lg leading-relaxed text-zyra-text-secondary">
                    Zyra works with teams across North America, Europe, the Middle East, Asia, and Oceania with a delivery model designed for async clarity.
                  </p>
                </div>

                <WorldMap dots={CONTACT_ROUTES} lineColor="#39ff87" className="shadow-[0_24px_80px_rgba(0,0,0,0.28)]" />
              </div>
            </section>
          </main>
          <Footer />
        </div>
      </div>
    </>
  )
}

function Field({
  children,
  error,
  label,
}: {
  children: React.ReactNode
  error?: string
  label: string
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-zyra-text-primary">{label}</span>
      {children}
      {error ? <span className="mt-2 block text-sm text-red-400">{error}</span> : null}
    </label>
  )
}
