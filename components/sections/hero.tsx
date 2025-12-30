'use client';

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations"
import { motion } from "framer-motion"

interface HeroProps {
  title: string
  subtitle: string
}

export function Hero({ title, subtitle }: HeroProps) {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32 bg-[#1e3a8a] text-white">
      <motion.div 
        className="absolute inset-0 opacity-10"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: "easeOut" }}
      >
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center" />
      </motion.div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-8">
          <FadeIn delay={0.2} direction="down">
            <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm font-medium backdrop-blur-sm">
              <span className="text-[#f59e0b] mr-2">New</span>
              <span>2025 Internship Programs Open</span>
            </div>
          </FadeIn>
          
          <FadeIn delay={0.4}>
            <h1 className="text-5xl font-extrabold tracking-tighter sm:text-6xl lg:text-7xl text-balance">{title}</h1>
          </FadeIn>
          
          <FadeIn delay={0.6}>
            <p className="text-xl md:text-2xl text-white/80 font-medium tracking-widest uppercase">{subtitle}</p>
          </FadeIn>
          
          <StaggerContainer staggerDelay={0.2} className="pt-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <StaggerItem>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    asChild
                    size="lg"
                    className="px-8 bg-[#f59e0b] hover:bg-[#d97706] text-[#1e3a8a] border-none font-bold"
                  >
                    <Link href="/contact">
                      Contact Us Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </motion.div>
              </StaggerItem>
              
              <StaggerItem>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    size="lg"
                    asChild
                    className="px-8 border-white text-white hover:bg-white/10 bg-transparent"
                  >
                    <Link href="/services">Our Services</Link>
                  </Button>
                </motion.div>
              </StaggerItem>
            </div>
          </StaggerContainer>
        </div>
      </div>
    </section>
  )
}

