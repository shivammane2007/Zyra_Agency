"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Mail, MapPin, Phone } from "lucide-react"
import { useForm } from "react-hook-form"
import { Navbar } from "@/components/navbar/Navbar"
import { Footer } from "@/components/sections/Footer"
import { SectionLabel } from "@/components/ui/SectionLabel"
import { ShootingStars } from "@/components/ui/shooting_star"
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

export default function ContactPage() {
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
      return
    }

    setSubmitMessage(data.message ?? "Inquiry received.")
    reset()
  }

  return (
    <>
      <Navbar />
      <div className="relative isolate">
        <div className="pointer-events-none absolute inset-y-0 left-0 -z-10 hidden w-20 overflow-hidden opacity-35 lg:block xl:w-32 2xl:w-40">
          <ShootingStars className="[mask-image:linear-gradient(to_bottom,transparent_0,black_8rem,black_calc(100%-4rem),transparent_100%)]" />
        </div>
        <div className="pointer-events-none absolute inset-y-0 right-0 -z-10 hidden w-20 overflow-hidden opacity-35 lg:block xl:w-32 2xl:w-40">
          <ShootingStars className="[mask-image:linear-gradient(to_bottom,transparent_0,black_8rem,black_calc(100%-4rem),transparent_100%)]" />
        </div>
        <div className="relative z-10">
          <main className="min-h-screen pt-32">
            <section id="contact" className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
              <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
                <div>
                  <SectionLabel className="mb-6">Contact</SectionLabel>
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
                            <p className="mt-1 text-zyra-text-primary">{item.value}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div className="rounded-[2rem] border border-zyra-border-subtle bg-zyra-bg-card p-8 sm:p-10">
                  <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field label="Name" error={errors.name?.message}>
                        <input
                          {...register("name")}
                          aria-invalid={Boolean(errors.name)}
                          className="h-12 w-full rounded-xl border border-zyra-border-default bg-zyra-bg-primary px-4 text-zyra-text-primary outline-none transition-colors focus:border-zyra-accent-neon"
                          placeholder="Your name"
                        />
                      </Field>
                      <Field label="Email" error={errors.email?.message}>
                        <input
                          {...register("email")}
                          type="email"
                          aria-invalid={Boolean(errors.email)}
                          className="h-12 w-full rounded-xl border border-zyra-border-default bg-zyra-bg-primary px-4 text-zyra-text-primary outline-none transition-colors focus:border-zyra-accent-neon"
                          placeholder="you@company.com"
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
                        />
                      </Field>
                      <Field label="Budget or stage" error={errors.budget?.message}>
                        <input
                          {...register("budget")}
                          aria-invalid={Boolean(errors.budget)}
                          className="h-12 w-full rounded-xl border border-zyra-border-default bg-zyra-bg-primary px-4 text-zyra-text-primary outline-none transition-colors focus:border-zyra-accent-neon"
                          placeholder="Range, phase, or timeline"
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
                      />
                    </Field>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex h-12 items-center justify-center rounded-full bg-zyra-accent-neon px-6 font-medium text-black transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isSubmitting ? "Sending..." : "Send inquiry"}
                    </button>

                    {submitMessage && (
                      <p className="rounded-xl border border-zyra-accent-neon/30 bg-zyra-accent-glow px-4 py-3 text-sm text-zyra-text-primary">
                        {submitMessage}
                      </p>
                    )}

                    {submitError && (
                      <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                        {submitError}
                      </p>
                    )}
                  </form>
                </div>
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