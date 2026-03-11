import { AnimatedTestimonials } from "@/components/ui/animated-testimonials"

function AnimatedTestimonialsDemo() {
  const testimonials = [
    {
      quote:
        "We keep strategy close to execution, which means roadmap decisions are grounded in delivery reality from day one.",
      name: "Strategy Lead",
      designation: "Product direction",
      src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop",
    },
    {
      quote:
        "Premium interfaces need more than polish. They need systems that guide users clearly and hold up under product scale.",
      name: "Design Lead",
      designation: "Experience systems",
      src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop",
    },
    {
      quote:
        "Architecture choices are made with launch pressure, maintainability, and operational resilience already in view.",
      name: "Engineering Lead",
      designation: "Architecture and delivery",
      src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop",
    },
  ]

  return <AnimatedTestimonials testimonials={testimonials} autoplay />
}

export { AnimatedTestimonialsDemo }