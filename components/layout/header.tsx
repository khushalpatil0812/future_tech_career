"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { SITE_NAME } from "@/lib/constants"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import Image from "next/image"

const NAV_LINKS = [
  { name: "Home", href: "#" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Contact", href: "#contact" },
]

const scrollToSection = (href: string, callback?: () => void) => {
  if (href === "#") {
    window.scrollTo({ top: 0, behavior: "smooth" })
  } else {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }
  callback?.()
}

export function Header() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  // Skip header on admin routes
  if (pathname.startsWith("/admin")) return null

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 sm:h-16 items-center justify-between px-3 sm:px-4 md:px-6">
        <button onClick={() => scrollToSection("#")} className="flex items-center space-x-1.5 sm:space-x-2 cursor-pointer">
          <Image src="/images/logo.png" alt={SITE_NAME} width={40} height={40} className="h-8 w-8 sm:h-10 sm:w-10" />
          <span className="text-base sm:text-lg md:text-xl font-bold text-primary hidden sm:inline-block">{SITE_NAME}</span>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex md:items-center md:space-x-4 lg:space-x-6">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollToSection(link.href)}
              className="text-sm font-medium transition-colors hover:text-primary text-muted-foreground"
            >
              {link.name}
            </button>
          ))}
          <Button onClick={() => scrollToSection("#contact")} variant="default" size="sm">
            Get Started
          </Button>
        </nav>

        {/* Mobile Nav */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t bg-background p-4 flex flex-col space-y-4">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollToSection(link.href, () => setIsOpen(false))}
              className="text-sm font-medium transition-colors hover:text-primary text-muted-foreground text-left"
            >
              {link.name}
            </button>
          ))}
          <Button onClick={() => scrollToSection("#contact", () => setIsOpen(false))} className="w-full">
            Get Started
          </Button>
        </div>
      )}
    </header>
  )
}
