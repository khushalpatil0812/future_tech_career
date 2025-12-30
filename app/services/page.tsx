import { TestimonialsSection } from "@/components/sections/testimonials"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Our Services | Future-Tech Career",
  description: "Comprehensive career services including resume optimization and interview coaching.",
  keywords: "career services, resume writing, linkedin optimization",
  openGraph: {
    title: "Our Services | Future-Tech Career",
    description: "Comprehensive career services including resume optimization and interview coaching.",
    images: ["https://futuretech-career.com/og-services.jpg"],
  },
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

export default function ServicesPage() {
  return (
    <>
      <div className="container mx-auto px-4 py-24">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Our Professional Services</h1>
          <p className="text-xl text-muted-foreground">Tailored solutions for every stage of your career journey.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24">
          {SERVICES_DETAIL.map((service, idx) => (
            <Card key={idx} className="flex flex-col">
              <CardHeader>
                <CardTitle className="text-2xl">{service.title}</CardTitle>
                <CardDescription className="text-lg font-semibold text-primary">{service.price}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground mb-6">{service.description}</p>
                <ul className="space-y-3">
                  {service.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start">
                      <Check className="h-5 w-5 text-primary mr-2 shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full mt-8" asChild>
                  <Link href="/contact">Book Now</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <TestimonialsSection />
      </div>
    </>
  )
}
