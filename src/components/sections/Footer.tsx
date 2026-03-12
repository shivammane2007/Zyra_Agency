import Link from "next/link"

const FOOTER_LINKS = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/#services" },
  { name: "Projects", href: "/projects" },
  { name: "Team", href: "/#team" },
  { name: "Contact", href: "/#contact" },
]

export function Footer() {
  return (
    <footer className="border-t border-zyra-border-subtle py-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <p className="font-heading text-2xl font-bold tracking-tight text-zyra-text-primary">Zyra</p>
          <p className="mt-2 text-sm text-zyra-text-secondary">
            Premium product design and engineering for ambitious teams.
          </p>
        </div>
        <nav className="flex flex-wrap gap-4 text-sm text-zyra-text-secondary">
          {FOOTER_LINKS.map((link) => (
            <Link key={link.name} href={link.href} className="transition-colors hover:text-zyra-text-primary">
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  )
}