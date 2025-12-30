"use client"

import { useEffect, useState } from "react"
import { publicApi } from "@/lib/api"
import type { Testimonial } from "@/lib/mock-data"
import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations"
import { motion } from "framer-motion"

export function TestimonialsSection({ limit }: { limit?: number }) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])

  useEffect(() => {
    publicApi.getTestimonials().then((data) => {
      setTestimonials(limit ? data.slice(0, limit) : data)
    })
  }, [limit])

  if (testimonials.length === 0) return null

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <FadeIn className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">What Our Clients Say</h2>
          <p className="mt-4 text-lg text-muted-foreground">Success stories from tech professionals worldwide.</p>
        </FadeIn>
        
        <StaggerContainer staggerDelay={0.1} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <StaggerItem key={testimonial.id}>
              <motion.div
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="h-full"
              >
                <Card className="border-none shadow-md hover:shadow-xl transition-shadow h-full">
                  <CardContent className="pt-6">
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
                          className={`h-4 w-4 ${i < testimonial.rating ? "fill-accent text-accent" : "text-muted"}`}
                        />
                      ))}
                    </motion.div>
                    <blockquote className="text-lg italic mb-6">"{testimonial.feedback}"</blockquote>
                    <div>
                      <div className="font-bold text-primary">{testimonial.name}</div>
                      {testimonial.role && <div className="text-sm text-muted-foreground">{testimonial.role}</div>}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
