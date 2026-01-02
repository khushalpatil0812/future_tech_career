"use client"

import { useEffect, useState } from "react"
import { publicApi } from "@/lib/api"
import type { Testimonial } from "@/lib/mock-data"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations"
import { motion } from "framer-motion"

export function TestimonialsSection({ limit }: { limit?: number }) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])

  useEffect(() => {
    publicApi.getTestimonials().then((data) => {
      // Filter out testimonials with empty feedback
      const validTestimonials = data.filter(t => t.feedback && t.feedback.trim().length > 0)
      setTestimonials(limit ? validTestimonials.slice(0, limit) : validTestimonials)
    })
  }, [limit])

  if (testimonials.length === 0) return null

  return (
    <section className="py-24 bg-gradient-to-br from-muted/30 via-background to-muted/30 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <FadeIn className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Star className="w-4 h-4 text-primary fill-primary" />
            <span className="text-sm font-medium text-primary">Client Testimonials</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            What Our Clients Say
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Real success stories from professionals who transformed their careers with our guidance
          </p>
        </FadeIn>
        
        <StaggerContainer staggerDelay={0.1} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <StaggerItem key={testimonial.id}>
              <motion.div
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="h-full"
              >
                <Card className="border-2 border-primary/10 shadow-lg hover:shadow-2xl hover:border-primary/30 transition-all duration-300 h-full relative overflow-hidden group">
                  {/* Gradient background on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <CardContent className="pt-8 pb-6 px-6 relative z-10">
                    {/* Quote icon */}
                    <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                      <Quote className="w-16 h-16 text-primary" />
                    </div>
                    
                    {/* Rating stars */}
                    <motion.div 
                      className="flex mb-4"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    >
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${i < testimonial.rating ? "fill-amber-400 text-amber-400" : "text-muted"}`}
                        />
                      ))}
                    </motion.div>
                    
                    {/* Feedback text */}
                    <blockquote className="text-base leading-relaxed mb-6 text-foreground/90 min-h-[80px]">
                      "{testimonial.feedback}"
                    </blockquote>
                    
                    {/* Author info */}
                    <div className="flex items-center gap-3 pt-4 border-t">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-lg">
                        {testimonial.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-bold text-primary">{testimonial.name}</div>
                        {testimonial.role && (
                          <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
        
        {testimonials.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No testimonials available yet. Be the first to share your experience!</p>
          </div>
        )}
      </div>
    </section>
  )
}
