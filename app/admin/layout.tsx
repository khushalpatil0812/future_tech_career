"use client"

import type React from "react"
import { useAuth } from "@/context/auth-context"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { Loader2 } from "lucide-react"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  // If not authenticated and not loading, the AuthContext's redirect logic will handle it
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
