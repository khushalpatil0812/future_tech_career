"use client"

import type React from "react"
import { useAuth } from "@/context/auth-context"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { Button } from "@/components/ui/button"
import { Loader2, ExternalLink, Home } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth()
  const pathname = usePathname()
  const router = useRouter()
  
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
    <div className="flex flex-col min-h-screen">
      {/* Admin Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-white font-bold text-sm">FT</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-primary">Admin Dashboard</h1>
                <p className="text-xs text-muted-foreground">Future-Tech Career</p>
              </div>
            </div>
          </div>
          
          <Button
            onClick={() => router.push("/")}
            variant="outline"
            size="sm"
            className="gap-2"
          >
            <Home className="h-4 w-4" />
            View Website
            <ExternalLink className="h-3 w-3" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1">
        <div className="w-64 border-r bg-muted/30">
          <AdminSidebar />
        </div>
        <main className="flex-1 p-8 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
