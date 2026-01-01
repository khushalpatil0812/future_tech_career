"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, MessageSquare, Star, Settings, Shield, LogOut, CheckCircle, Building2, Handshake, Briefcase, Users, Building, FileText, Target } from "lucide-react"
import { useAuth } from "@/context/auth-context"

const ADMIN_LINKS = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Inquiries", href: "/admin/inquiries", icon: MessageSquare },
  { name: "Feedback", href: "/admin/feedback", icon: Star },
  { name: "Testimonials", href: "/admin/testimonials", icon: CheckCircle },
  { name: "Manage Testimonials", href: "/admin/testimonials-manage", icon: Star },
  { name: "Companies", href: "/admin/companies", icon: Building2 },
  { name: "Partners", href: "/admin/partners", icon: Handshake },
  { name: "Job Openings", href: "/admin/job-openings", icon: Briefcase },
  { name: "Candidates", href: "/admin/candidates", icon: Users },
  { name: "Clients", href: "/admin/clients", icon: Building },
  { name: "Contracts", href: "/admin/contracts", icon: FileText },
  { name: "Resource Requirements", href: "/admin/resource-requirements", icon: Target },
  { name: "Content", href: "/admin/content", icon: Settings },
  { name: "SEO", href: "/admin/seo", icon: Shield },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const { logout } = useAuth()

  return (
    <aside className="border rounded-lg bg-card/50 backdrop-blur flex flex-col md:h-[calc(100vh-128px)] md:sticky md:top-24">
      <div className="flex-grow p-4 flex md:flex-col overflow-x-auto md:overflow-x-visible space-x-2 md:space-x-0 md:space-y-2 no-scrollbar">
        {ADMIN_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
              pathname === link.href ? "bg-primary text-primary-foreground" : "hover:bg-muted text-muted-foreground",
            )}
          >
            <link.icon className="h-4 w-4" />
            <span>{link.name}</span>
          </Link>
        ))}
      </div>
      <div className="p-4 border-t">
        <button
          onClick={logout}
          className="flex items-center space-x-3 px-3 py-2 w-full rounded-md text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  )
}
