"use client"

import type React from "react"
import { useAuth } from "@/context/auth-context"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { Loader2 } from "lucide-react"
import { usePathname } from "next/navigation"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth()
  const pathname = usePathname()
  
  // Check if we're on the login page
  const isLoginPage = pathname === "/admin/login"

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  // Allow login page to render without authentication
  if (isLoginPage) {
    return <>{children}</>
  }

  // If not authenticated and not on login page, return null (redirect will happen)
  if (!isAuthenticated) return null

  return (
    <div className="flex flex-col md:flex-row container mx-auto px-4 py-8 min-h-screen gap-8">
      <div className="w-full md:w-64">
        <AdminSidebar />
      </div>
      <main className="flex-grow min-w-0">{children}</main>
    </div>
  )
}
