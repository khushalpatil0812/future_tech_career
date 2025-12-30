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
      <section id="about" className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto space-y-12">
            <div className="text-center">
              <h2 className="text-4xl font-bold tracking-tight mb-4">About Us</h2>
              <p className="text-xl text-muted-foreground">Careers Made Simple</p>
            </div>

            <div className="space-y-6 pt-8">
              <div className="prose prose-slate max-w-none">
                <p className="text-lg leading-relaxed text-muted-foreground text-center">
                  Future Tech Consultancy is a career support and recruitment consultancy helping job seekers explore
                  suitable opportunities and improve job readiness. We provide resume writing, interview preparation,
                  LinkedIn profile optimization, and job search assistance. We also offer optional short-term internships with certification.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-primary">Why Us</h3>
                  <p className="text-lg leading-relaxed text-muted-foreground">
                    We provide honest and ethical career guidance focused on long-term growth. Our approach is practical,
                    transparent, and tailored to each candidate's skills and goals.
                  </p>
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-primary">What We Do</h3>
                  <p className="text-lg leading-relaxed text-muted-foreground">
                    We support job seekers with career guidance and recruitment assistance. Our services include resume writing,
                    interview preparation, LinkedIn optimization, and structured job search support.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-primary/5 rounded-2xl p-8 md:p-12 mt-12">
              <h3 className="text-3xl font-bold mb-6 text-center">Why Choose Us?</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">1500+</div>
                  <div className="text-muted-foreground font-medium">Successful Placements</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">98%</div>
                  <div className="text-muted-foreground font-medium">Satisfaction Rate</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">10+</div>
                  <div className="text-muted-foreground font-medium">Years Experience</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">24/7</div>
                  <div className="text-muted-foreground font-medium">Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl font-bold tracking-tight mb-4">Our Professional Services</h2>
            <p className="text-xl text-muted-foreground">Tailored solutions for every stage of your career journey.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES_DETAIL.map((service, idx) => (
              <Card key={idx} className="hover-lift border-transparent hover:border-primary/50 transition-all">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                    <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
                      {service.price}
                    </span>
                  </div>
                  <CardDescription className="text-sm">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start">
                        <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <TestimonialsSection limit={6} />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl font-bold tracking-tight mb-4">Get in Touch</h2>
                <p className="text-xl text-muted-foreground">
                  Have questions? Our team is here to help you navigate your next career move.
                </p>
              </div>

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
                  <div key={idx} className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <item.icon className="h-6 w-6 text-primary" />
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

            <Card>
              <CardHeader>
                <CardTitle>Send us a message</CardTitle>
                <CardDescription>Fill out the form below and we'll get back to you shortly.</CardDescription>
              </CardHeader>
              <CardContent>
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
