"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"

interface AuthContextType {
  isAuthenticated: boolean
  isLoading: boolean
  login: (token: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const token = localStorage.getItem("admin_token")
    if (token) {
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  }, [])

  // Protection logic
  useEffect(() => {
    if (!isLoading && pathname.startsWith("/admin") && pathname !== "/admin/login" && !isAuthenticated) {
      router.push("/admin/login")
    }
  }, [isAuthenticated, isLoading, pathname, router])

  const login = (token: string) => {
    localStorage.setItem("admin_token", token)
    setIsAuthenticated(true)
    router.push("/admin/dashboard")
  }

  const logout = () => {
    localStorage.removeItem("admin_token")
    setIsAuthenticated(false)
    router.push("/admin/login")
  }

  return <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
