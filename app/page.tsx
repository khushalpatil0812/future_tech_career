"use client"

import { useState, useEffect } from "react"
import { publicApi } from "@/lib/api"
import { Hero } from "@/components/sections/hero"
import { TestimonialsSection } from "@/components/sections/testimonials"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Briefcase, FileText, Users, Search, Check, Mail, Phone, Linkedin } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { INQUIRY_TYPES, type InquiryType } from "@/lib/constants"

export default function HomePage() {
  const [heroTitle, setHeroTitle] = useState("FUTURE-TECH CAREER")
  const [heroSubtitle, setHeroSubtitle] = useState("HELPING YOU BUILD YOUR CAREER")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    inquiryType: "" as InquiryType,
    message: "",
  })
  const { toast } = useToast()

  useEffect(() => {
    publicApi.getContent().then(content => {
      setHeroTitle(content?.hero?.title || "FUTURE-TECH CAREER")
      setHeroSubtitle(content?.hero?.subtitle || "HELPING YOU BUILD YOUR CAREER")
    }).catch(() => {})
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const response = await publicApi.submitInquiry(formData)
      toast({ title: "Success", description: response.message })
      setFormData({ fullName: "", email: "", phone: "", inquiryType: "" as InquiryType, message: "" })
    } catch (error) {
      toast({ title: "Error", description: "Something went wrong. Please try again.", variant: "destructive" })
    } finally {
      setIsSubmitting(false)
    }
  }

  const SERVICES_DETAIL = [
    {
      title: "Career Guidance",
      price: "Expert Consultation",
      description: "Personalized roadmap to navigate your career trajectory and job assistance.",
      features: ["Strategic planning", "Job assistance", "Industry mapping", "Networking strategy"],
    },
    {
      title: "Resume & CV Writing",
      price: "ATS-Friendly",
      description: "Professional resumes designed to pass ATS filters and grab recruiter attention.",
      features: ["Keyword optimization", "Modern formatting", "Cover letter template", "Multiple revisions"],
    },
    {
      title: "Interview Preparation",
      price: "Confidence Building",
      description: "Master behavioral and technical interviews with expert coaching and mock sessions.",
      features: ["Live mock sessions", "Confidence building", "Body language analysis", "Detailed feedback"],
    },
    {
      title: "LinkedIn Strategy",
      price: "Profile Optimization",
      description: "Build a powerful personal brand and optimize your profile for recruitment.",
      features: ["Profile auditing", "Headline optimization", "Content strategy", "Search visibility"],
    },
    {
      title: "Internship Program",
      price: "With Certification",
      description: "Optional short-term internships designed for skill enhancement and real-world experience.",
      features: ["Skill enhancement", "Project experience", "Professional certification", "Mentorship"],
    },
  ]

  return (
    <>
      <Hero title={heroTitle} subtitle={heroSubtitle} />

      {/* About Section */}
      <section id="about" className="relative py-24 overflow-hidden">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 animate-gradient" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <div className="inline-block">
                <h2 className="text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent animate-gradient">
                  About Us
                </h2>
                <div className="h-1 w-24 mx-auto bg-gradient-to-r from-primary to-accent rounded-full" />
              </div>
              <p className="text-xl text-muted-foreground font-medium">Careers Made Simple</p>
            </div>

            <div className="space-y-6 pt-8">
              <div className="prose prose-slate max-w-none">
                <p className="text-lg leading-relaxed text-muted-foreground text-center">
                  Future Tech Consultancy is a career support and recruitment consultancy helping job seekers explore
                  suitable opportunities and improve job readiness. We provide resume writing, interview preparation,
                  LinkedIn profile optimization, and job search assistance. We also offer optional short-term internships with certification.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
                <div className="group relative p-8 rounded-2xl bg-card/50 backdrop-blur-sm border-2 border-primary/20 hover:border-primary/50 transition-all duration-500 hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-2">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative space-y-4">
                    <h3 className="text-2xl font-bold text-primary flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                      Why Us
                    </h3>
                    <p className="text-lg leading-relaxed text-muted-foreground group-hover:text-foreground transition-colors">
                      We provide honest and ethical career guidance focused on long-term growth. Our approach is practical,
                      transparent, and tailored to each candidate's skills and goals.
                    </p>
                  </div>
                </div>
                <div className="group relative p-8 rounded-2xl bg-card/50 backdrop-blur-sm border-2 border-accent/20 hover:border-accent/50 transition-all duration-500 hover:shadow-xl hover:shadow-accent/20 hover:-translate-y-2">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative space-y-4">
                    <h3 className="text-2xl font-bold text-accent flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                      What We Do
                    </h3>
                    <p className="text-lg leading-relaxed text-muted-foreground group-hover:text-foreground transition-colors">
                      We support job seekers with career guidance and recruitment assistance. Our services include resume writing,
                      interview preparation, LinkedIn optimization, and structured job search support.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-3xl p-1 mt-12 group">
              {/* Animated border gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-secondary opacity-75 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative bg-card rounded-3xl p-8 md:p-12">
                <h3 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">Why Choose Us?</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  {[
                    { value: "1500+", label: "Successful Placements", color: "text-primary" },
                    { value: "98%", label: "Satisfaction Rate", color: "text-accent" },
                    { value: "10+", label: "Years Experience", color: "text-secondary" },
                    { value: "24/7", label: "Support", color: "text-primary" },
                  ].map((stat, idx) => (
                    <div key={idx} className="text-center group/stat hover:scale-110 transition-transform duration-300">
                      <div className={`text-5xl font-bold ${stat.color} mb-3 animate-pulse`}>{stat.value}</div>
                      <div className="text-sm text-muted-foreground font-medium group-hover/stat:text-foreground transition-colors">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="relative py-24 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-medium text-primary">Our Services</span>
            </div>
            <h2 className="text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Our Professional Services
            </h2>
            <p className="text-xl text-muted-foreground">Tailored solutions for every stage of your career journey.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES_DETAIL.map((service, idx) => (
              <Card 
                key={idx} 
                className="group relative overflow-hidden border-2 border-transparent hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2 bg-gradient-to-br from-card to-card/50"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {/* Animated gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Animated border glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-secondary rounded-lg opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500" />
                
                <CardHeader className="relative z-10">
                  <div className="flex justify-between items-start mb-3">
                    <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors duration-300">
                      {service.title}
                    </CardTitle>
                    <span className="text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-full font-semibold group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 animate-pulse group-hover:animate-none">
                      {service.price}
                    </span>
                  </div>
                  <CardDescription className="text-sm leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="relative z-10">
                  <ul className="space-y-3">
                    {service.features.map((feature, fIdx) => (
                      <li 
                        key={fIdx} 
                        className="flex items-start group/item"
                        style={{ animationDelay: `${(idx * 100) + (fIdx * 50)}ms` }}
                      >
                        <div className="relative">
                          <Check className="h-5 w-5 text-primary mr-3 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300" />
                          <div className="absolute inset-0 bg-primary/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        <span className="text-sm text-muted-foreground group-hover/item:text-foreground transition-colors duration-200">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                  
                  {/* Hover indicator */}
                  <div className="mt-6 pt-4 border-t border-border/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-xs text-primary font-medium text-center animate-pulse">
                      Click to learn more →
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-primary/5 to-accent/5" />
        <div className="container mx-auto px-4 relative z-10">
          <TestimonialsSection limit={6} />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-24 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1.5s" }} />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-medium text-primary">Contact Us</span>
            </div>
            <h2 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Get in Touch
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Have questions? Our team is here to help you navigate your next career move.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div className="space-y-8">
              <div className="space-y-6">
                {[
                  { icon: Mail, label: "Email", value: "carreirsfuturetech@gmail.com" },
                  { icon: Phone, label: "Phone", value: "7385552872 / 9270315005" },
                  {
                    icon: Linkedin,
                    label: "LinkedIn",
                    value: "future-tech-career",
                    link: "https://www.linkedin.com/company/future-tech-career/",
                  },
                ].map((item, idx) => (
                  <div key={idx} className="group/contact flex items-center space-x-4 p-4 rounded-xl hover:bg-primary/5 transition-all duration-300 hover:scale-105">
                    <div className="relative w-14 h-14 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center group-hover/contact:shadow-lg group-hover/contact:shadow-primary/30 transition-all duration-300">
                      <item.icon className="h-6 w-6 text-primary group-hover/contact:scale-110 transition-transform duration-300" />
                      <div className="absolute inset-0 rounded-full bg-primary/20 blur-md opacity-0 group-hover/contact:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">{item.label}</div>
                      {item.link ? (
                        <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors">
                          {item.value}
                        </a>
                      ) : (
                        <div className="text-foreground">{item.value}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Card className="relative overflow-hidden border-2 border-primary/20 hover:border-primary/40 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20">
              {/* Card gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
              
              <CardHeader className="relative z-10">
                <CardTitle className="text-2xl">Send us a message</CardTitle>
                <CardDescription>Fill out the form below and we'll get back to you shortly.</CardDescription>
              </CardHeader>
              <CardContent className="relative z-10">"
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Full Name</label>
                    <Input
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Email</label>
                    <Input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Phone</label>
                    <Input
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Inquiry Type</label>
                    <Select
                      required
                      value={formData.inquiryType}
                      onValueChange={(value) => setFormData({ ...formData, inquiryType: value as InquiryType })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select inquiry type" />
                      </SelectTrigger>
                      <SelectContent>
                        {INQUIRY_TYPES.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Message</label>
                    <Textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>
                  <Button type="submit" disabled={isSubmitting} className="w-full">
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  )
}
