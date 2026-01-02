'use client';

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Award, Users, TrendingUp } from "lucide-react"
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations"
import { motion } from "framer-motion"

interface HeroProps {
  title: string
  subtitle: string
}

export function Hero({ title, subtitle }: HeroProps) {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32 bg-gradient-to-br from-[#1e3a8a] via-[#1e40af] to-[#1e3a8a] text-white">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20" />
      </div>
      
      {/* Floating orbs */}
      <motion.div 
        className="absolute top-20 left-10 w-72 h-72 bg-[#f59e0b] rounded-full filter blur-3xl opacity-20"
        animate={{ 
          y: [0, 30, 0],
          x: [0, 20, 0],
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut" 
        }}
      />
      <motion.div 
        className="absolute bottom-20 right-10 w-96 h-96 bg-[#3b82f6] rounded-full filter blur-3xl opacity-20"
        animate={{ 
          y: [0, -40, 0],
          x: [0, -30, 0],
        }}
        transition={{ 
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut" 
        }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-8">
          <FadeIn delay={0.2} direction="down">
            <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-sm hover:bg-white/20 transition-all duration-300">
              <Award className="w-4 h-4 text-[#f59e0b] mr-2" />
              <span className="text-[#f59e0b] mr-2 font-bold">Trusted</span>
              <span>by 50+ Professionals</span>
            </div>
          </FadeIn>
          
          <FadeIn delay={0.4}>
            <h1 className="text-5xl font-extrabold tracking-tighter sm:text-6xl lg:text-7xl text-balance leading-tight">
              {title}
            </h1>
          </FadeIn>
          
          <FadeIn delay={0.6}>
            <p className="text-xl md:text-2xl text-white/90 font-medium tracking-wide">
              {subtitle}
            </p>
          </FadeIn>
          
          <FadeIn delay={0.8}>
            <p className="text-base md:text-lg text-white/70 max-w-2xl">
              Expert career guidance, professional resume writing, and personalized job search support to accelerate your tech career
            </p>
          </FadeIn>
          
          <StaggerContainer staggerDelay={0.2} className="pt-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <StaggerItem>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    asChild
                    size="lg"
                    className="px-8 py-6 bg-[#f59e0b] hover:bg-[#d97706] text-[#1e3a8a] border-none font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
                  >
                    <Link href="/contact">
                      Get Started Today
                      <ArrowRight className="ml-2 h-5 w-5" />
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
                    className="px-8 py-6 border-2 border-white text-white hover:bg-white/10 bg-transparent text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Link href="/services">Explore Services</Link>
                  </Button>
                </motion.div>
              </StaggerItem>
            </div>
          </StaggerContainer>
          
          {/* Trust indicators */}
          <FadeIn delay={1.0}>
            <div className="flex flex-wrap justify-center gap-8 mt-12 pt-8 border-t border-white/20">
              <div className="flex items-center gap-2 text-white/80">
                <Users className="w-5 h-5 text-[#f59e0b]" />
                <span className="text-sm font-medium">50+ Placements</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <TrendingUp className="w-5 h-5 text-[#f59e0b]" />
                <span className="text-sm font-medium">95% Success Rate</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <Award className="w-5 h-5 text-[#f59e0b]" />
                <span className="text-sm font-medium">Industry Experts</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}


