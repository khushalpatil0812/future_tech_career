import { publicApi } from "@/lib/api"
import { Hero } from "@/components/sections/hero"
import { TestimonialsSection } from "@/components/sections/testimonials"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, FileText, Users, Search } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Future-Tech Career | Professional Career Consultancy",
  description: "Expert career guidance, resume writing, and interview prep for tech professionals.",
  keywords: "career consultancy, tech jobs, resume writing, interview prep, career coaching",
  openGraph: {
    title: "Future-Tech Career | Professional Career Consultancy",
    description: "Expert career guidance, resume writing, and interview prep for tech professionals.",
    images: ["https://futuretech-career.com/og-home.jpg"],
  },
}

export default async function HomePage() {
  // Use fallback content to prevent blocking, fetch with timeout
  let content
  try {
    content = await publicApi.getContent()
  } catch (error) {
    // Use default content if API fails or times out
    content = {
      hero: {
        title: "Transform Your Tech Career",
        subtitle: "Expert guidance, personalized strategies, and proven results for tech professionals worldwide.",
      },
    }
  }

  return (
    <>
      <Hero title={content.hero.title} subtitle={content.hero.subtitle} />

      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Career Guidance",
                desc: "Strategic planning for your professional growth.",
                icon: Briefcase,
              },
              {
                title: "Resume Writing",
                desc: "ATS-optimized resumes that get you noticed.",
                icon: FileText,
              },
              {
                title: "Interview Prep",
                desc: "Mock interviews with real industry feedback.",
                icon: Search,
              },
              {
                title: "LinkedIn Strategy",
                desc: "Build a powerful personal brand online.",
                icon: Users,
              },
            ].map((service, idx) => (
              <Card
                key={idx}
                className="text-center hover-lift border-transparent hover:border-primary/50 transition-all"
              >
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-2 group-hover:bg-primary/20 transition-colors">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{service.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSection limit={3} />
    </>
  )
}
