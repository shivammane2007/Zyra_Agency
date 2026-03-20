"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Dribbble,
  Globe,
  ArrowUpRight
} from "lucide-react";
import { FooterBackgroundGradient, TextHoverEffect } from "@/components/ui/hover-footer";

export function Footer() {
  // Footer link data
  const footerLinksContent = [
    {
      title: "Navigation",
      links: [
        { label: "Philosophy", href: "/#philosophy" },
        { label: "Services", href: "/#services" },
        { label: "Process", href: "/#process" },
        { label: "Projects", href: "/projects" },
      ],
    },
    {
      title: "Helpful Links",
      links: [
        { label: "Team", href: "/#team" },
        { label: "FAQs", href: "/#faq" },
        {
          label: "Careers",
          href: "#",
        },
        { label: "Contact", href: "/#contact" },
      ],
    },
  ];

  // Contact info data
  const contactInfo = [
    {
      icon: <Mail size={18} className="text-zyra-accent-neon" />,
      text: "hello@zyra.agency",
      href: "mailto:hello@zyra.agency",
    },
    {
      icon: <Phone size={18} className="text-zyra-accent-neon" />,
      text: "+91 55501 42098",
      href: "tel:+915550142098",
    },
    {
      icon: <MapPin size={18} className="text-zyra-accent-neon" />,
      text: "Mumbai, India",
    },
  ];

  // Social media icons
  const socialLinks = [
    { icon: <Facebook size={20} />, label: "Facebook", href: "#" },
    { icon: <Instagram size={20} />, label: "Instagram", href: "#" },
    { icon: <Twitter size={20} />, label: "Twitter", href: "#" },
    { icon: <Dribbble size={20} />, label: "Dribbble", href: "#" },
  ];

  return (
    <footer className="relative h-fit rounded-[2.5rem] overflow-hidden m-4 sm:m-8 bg-black/40 border border-zyra-border-subtle backdrop-blur-sm transform-gpu will-change-transform">
      <div className="max-w-7xl mx-auto p-10 sm:p-14 z-10 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 lg:gap-16 pb-12">
          {/* Brand section */}
          <div className="flex flex-col space-y-6">
            <Link href="/" className="group flex items-center gap-3 transition-opacity hover:opacity-90">
              <div className="relative h-10 w-auto flex items-center">
                <Image
                  src="/logo/logo.jpeg"
                  alt="Zyra Logo"
                  width={600}
                  height={800}
                  loading="lazy"
                  quality={60}
                  className="h-8 w-auto object-contain brightness-110 drop-shadow-[0_0_8px_rgba(57,255,135,0.2)]"
                />
              </div>
              <span className="font-heading text-2xl font-bold tracking-tight text-zyra-text-primary">
                Zyra
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-zyra-text-secondary max-w-xs">
              Premium product design and engineering boutique studio based in India. We build high-impact digital experiences for forward-thinking brands.
            </p>
          </div>

          {/* Footer link sections */}
          {footerLinksContent.map((section) => (
            <div key={section.title}>
              <h4 className="text-zyra-text-primary text-lg font-bold font-heading mb-6 tracking-tight">
                {section.title}
              </h4>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.label} className="relative group/link">
                    <Link
                      href={link.href}
                      className="text-zyra-text-secondary hover:text-zyra-accent-neon transition-colors duration-300 flex items-center gap-2"
                    >
                      {link.label}
                      <ArrowUpRight className="h-3 w-3 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact section */}
          <div>
            <h4 className="text-zyra-text-primary text-lg font-bold font-heading mb-6 tracking-tight">
              Get in Touch
            </h4>
            <ul className="space-y-4">
              {contactInfo.map((item, i) => (
                <li key={i} className="flex items-center space-x-3 text-zyra-text-secondary group/contact">
                  {item.icon}
                  {item.href ? (
                    <a
                      href={item.href}
                      className="hover:text-zyra-accent-neon transition-colors duration-300"
                    >
                      {item.text}
                    </a>
                  ) : (
                    <span className="group-hover/contact:text-zyra-text-primary transition-colors duration-300">
                      {item.text}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-zyra-border-subtle to-transparent my-8 opacity-50" />

        {/* Footer bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm space-y-4 md:space-y-0">
          {/* Social icons */}
          <div className="flex space-x-6 text-zyra-text-secondary">
            {socialLinks.map(({ icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="hover:text-zyra-accent-neon transition-all duration-300 hover:scale-110"
              >
                {icon}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-zyra-text-secondary font-medium">
            &copy; {new Date().getFullYear()} Zyra. All rights reserved.
          </p>
        </div>
      </div>

      {/* Text hover effect - Only on larger screens */}
      <div className="lg:flex hidden h-[22rem] -mt-40 -mb-28 pointer-events-none sm:pointer-events-auto">
        <TextHoverEffect text="Zyra" className="z-20" />
      </div>

      <FooterBackgroundGradient />
    </footer>
  );
}