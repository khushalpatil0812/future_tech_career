"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { CONTACT_INFO, SITE_NAME } from "@/lib/constants"
import { Mail, Phone, Linkedin, ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Footer() {
  const pathname = usePathname()

  if (pathname.startsWith("/admin")) return null

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative border-t overflow-hidden">
      {/* Animated background gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 animate-gradient" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent" />
      
      {/* Decorative floating elements */}
      <div className="absolute top-10 right-20 w-32 h-32 bg-primary/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-10 left-20 w-40 h-40 bg-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2 space-y-4">
            <div className="group">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent mb-2 group-hover:scale-105 transition-transform duration-300">
                {SITE_NAME}
              </h2>
              <div className="h-1 w-16 bg-gradient-to-r from-primary to-accent rounded-full group-hover:w-24 transition-all duration-500" />
            </div>
            <p className="text-muted-foreground max-w-md text-sm leading-relaxed">
              Empowering job seekers to explore suitable opportunities and improve job readiness through ethical and
              transparent career practices.
            </p>
            <div className="space-y-3 pt-2">
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="group/link flex items-center text-sm text-muted-foreground hover:text-primary transition-all duration-300 hover:translate-x-1 p-2 rounded-lg hover:bg-primary/5"
              >
                <div className="relative mr-3">
                  <Mail className="h-4 w-4 text-primary group-hover/link:scale-110 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-sm opacity-0 group-hover/link:opacity-100 transition-opacity duration-300" />
                </div>
                <span className="group-hover/link:font-medium transition-all">{CONTACT_INFO.email}</span>
              </a>
              <div className="group/link flex items-center text-sm text-muted-foreground p-2 rounded-lg hover:bg-accent/5 transition-all duration-300">
                <div className="relative mr-3">
                  <Phone className="h-4 w-4 text-accent" />
                </div>
                <span>{CONTACT_INFO.phones.join(" / ")}</span>
              </div>
              <a
                href={CONTACT_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link flex items-center text-sm text-muted-foreground hover:text-primary transition-all duration-300 hover:translate-x-1 p-2 rounded-lg hover:bg-primary/5"
              >
                <div className="relative mr-3">
                  <Linkedin className="h-4 w-4 text-primary group-hover/link:scale-110 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-sm opacity-0 group-hover/link:opacity-100 transition-opacity duration-300" />
                </div>
                <span className="group-hover/link:font-medium transition-all">Follow us on LinkedIn</span>
              </a>
            </div>
          </div>
          <div className="space-y-4">
            <div className="group">
              <h3 className="font-semibold mb-1 text-foreground group-hover:text-primary transition-colors duration-300">Quick Links</h3>
              <div className="h-0.5 w-8 bg-primary rounded-full group-hover:w-12 transition-all duration-500" />
            </div>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="group/link inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-all duration-300 hover:translate-x-1 py-1">
                  <span className="w-0 h-0.5 bg-primary rounded-full group-hover/link:w-3 mr-0 group-hover/link:mr-2 transition-all duration-300" />
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="group/link inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-all duration-300 hover:translate-x-1 py-1">
                  <span className="w-0 h-0.5 bg-primary rounded-full group-hover/link:w-3 mr-0 group-hover/link:mr-2 transition-all duration-300" />
                  Services
                </Link>
              </li>
              <li>
                <Link href="/feedback" className="group/link inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-all duration-300 hover:translate-x-1 py-1">
                  <span className="w-0 h-0.5 bg-primary rounded-full group-hover/link:w-3 mr-0 group-hover/link:mr-2 transition-all duration-300" />
                  Feedback
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <div className="group">
              <h3 className="font-semibold mb-1 text-foreground group-hover:text-accent transition-colors duration-300">Legal</h3>
              <div className="h-0.5 w-8 bg-accent rounded-full group-hover:w-12 transition-all duration-500" />
            </div>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="group/link inline-flex items-center text-sm text-muted-foreground hover:text-accent transition-all duration-300 hover:translate-x-1 py-1">
                  <span className="w-0 h-0.5 bg-accent rounded-full group-hover/link:w-3 mr-0 group-hover/link:mr-2 transition-all duration-300" />
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="group/link inline-flex items-center text-sm text-muted-foreground hover:text-accent transition-all duration-300 hover:translate-x-1 py-1">
                  <span className="w-0 h-0.5 bg-accent rounded-full group-hover/link:w-3 mr-0 group-hover/link:mr-2 transition-all duration-300" />
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/login"
                  className="group/link inline-flex items-center text-sm text-muted-foreground hover:text-accent transition-all duration-300 hover:translate-x-1 py-1"
                >
                  <span className="w-0 h-0.5 bg-accent rounded-full group-hover/link:w-3 mr-0 group-hover/link:mr-2 transition-all duration-300" />
                  Admin Access
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Enhanced copyright section with gradient border */}
        <div className="mt-12 pt-8 relative">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} <span className="font-semibold text-foreground">{SITE_NAME}</span>. All rights reserved.
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Crafted with <span className="text-red-500 animate-pulse">❤</span> for your career success
              </p>
            </div>
            
            {/* Scroll to top button */}
            <Button
              onClick={scrollToTop}
              variant="outline"
              size="sm"
              className="group relative overflow-hidden border-primary/20 hover:border-primary/50 bg-background/50 backdrop-blur-sm"
            >
              <span className="relative z-10 flex items-center gap-2 text-xs font-medium">
                Back to Top
                <ArrowUp className="h-3.5 w-3.5 group-hover:-translate-y-1 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            </Button>
          </div>
          
          {/* Social proof badges */}
          <div className="mt-6 pt-6 border-t border-border/50">
            <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground">
              <div className="flex items-center gap-2 group hover:text-primary transition-colors">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span>Trusted by 1500+ Professionals</span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-border" />
              <div className="flex items-center gap-2 group hover:text-accent transition-colors">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" style={{ animationDelay: '0.5s' }} />
                <span>98% Success Rate</span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-border" />
              <div className="flex items-center gap-2 group hover:text-secondary transition-colors">
                <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" style={{ animationDelay: '1s' }} />
                <span>10+ Years Experience</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
