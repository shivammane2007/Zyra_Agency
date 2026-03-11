import { BookOpen, Cloud, Github, Workflow } from "lucide-react"

import { IdentityCardBody, RevealCardContainer } from "@/components/ui/animated-profile-card"

const profile = {
  avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1200&auto=format&fit=crop",
  avatarText: "FS",
  fullName: "Frontend Systems",
  place: "Customer product surfaces",
  about: "Production-ready UI systems with Next.js, React, TypeScript, and Tailwind CSS.",
  socials: [
    {
      id: "gh",
      url: "https://github.com/vercel/next.js",
      label: "GitHub",
      icon: <Github className="h-5 w-5" />,
    },
    {
      id: "docs",
      url: "https://nextjs.org/docs",
      label: "Docs",
      icon: <BookOpen className="h-5 w-5" />,
    },
    {
      id: "deploy",
      url: "https://vercel.com",
      label: "Deploy",
      icon: <Cloud className="h-5 w-5" />,
    },
  ],
}

export default function ProfileCardDemo() {
  return (
    <div className="flex min-h-[500px] w-full items-center justify-center bg-background p-6">
      <RevealCardContainer
        accent="#b7ffc8"
        textOnAccent="#08130d"
        mutedOnAccent="#254131"
        className="w-full max-w-[22rem]"
        base={<IdentityCardBody {...profile} scheme="plain" displayAvatar={false} />}
        overlay={
          <IdentityCardBody
            {...profile}
            scheme="accented"
            cardCss={{ backgroundColor: "var(--accent-color)" }}
            socials={[
              ...profile.socials,
              {
                id: "workflows",
                url: "https://tailwindcss.com/docs",
                label: "Workflows",
                icon: <Workflow className="h-5 w-5" />,
              },
            ]}
          />
        }
      />
    </div>
  )
}