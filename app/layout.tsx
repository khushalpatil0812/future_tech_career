import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/context/auth-context"
import { PageTransition } from "@/components/animations"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "Future-Tech Career | Professional Career Consultancy",
    template: "%s | Future-Tech Career",
  },
  description: "Expert career guidance, resume writing, and interview prep for tech professionals.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased flex flex-col min-h-screen`}>
        <AuthProvider>
          <Header />
          <main className="flex-grow">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
          <Toaster />
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
