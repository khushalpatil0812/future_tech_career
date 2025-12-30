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
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Feedback", href: "/feedback" },
  { name: "Contact", href: "/contact" },
]

export function Header() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  // Skip header on admin routes
  if (pathname.startsWith("/admin")) return null

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/images/logo.png" alt={SITE_NAME} width={40} height={40} className="h-10 w-auto" />
          <span className="text-xl font-bold text-primary hidden sm:inline-block">{SITE_NAME}</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex md:items-center md:space-x-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === link.href ? "text-primary" : "text-muted-foreground",
              )}
            >
              {link.name}
            </Link>
          ))}
          <Button asChild variant="default" size="sm">
            <Link href="/contact">Get Started</Link>
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
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === link.href ? "text-primary" : "text-muted-foreground",
              )}
            >
              {link.name}
            </Link>
          ))}
          <Button asChild className="w-full">
            <Link href="/contact" onClick={() => setIsOpen(false)}>
              Get Started
            </Link>
          </Button>
        </div>
      )}
    </header>
  )
}
