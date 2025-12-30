"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { CONTACT_INFO, SITE_NAME } from "@/lib/constants"
import { Mail, Phone, Linkedin } from "lucide-react"

export function Footer() {
  const pathname = usePathname()

  if (pathname.startsWith("/admin")) return null

  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-xl font-bold text-primary mb-4">{SITE_NAME}</h2>
            <p className="text-muted-foreground max-w-xs mb-6">
              Empowering job seekers to explore suitable opportunities and improve job readiness through ethical and
              transparent career practices.
            </p>
            <div className="space-y-3">
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors group"
              >
                <Mail className="h-4 w-4 mr-2 text-primary group-hover:scale-110 transition-transform" />
                {CONTACT_INFO.email}
              </a>
              <div className="flex items-center text-sm text-muted-foreground">
                <Phone className="h-4 w-4 mr-2 text-primary" />
                {CONTACT_INFO.phones.join(" / ")}
              </div>
              <a
                href={CONTACT_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors group"
              >
                <Linkedin className="h-4 w-4 mr-2 text-primary group-hover:scale-110 transition-transform" />
                Follow us on LinkedIn
              </a>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/feedback" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Feedback
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/login"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Admin Access
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
