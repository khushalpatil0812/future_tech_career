import { publicApi } from "@/lib/api"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us | Future-Tech Career",
  description: "Learn about our mission to help tech professionals reach their full potential.",
  keywords: "about future-tech, career experts, our team",
  openGraph: {
    title: "About Us | Future-Tech Career",
    description: "Learn about our mission to help tech professionals reach their full potential.",
    images: ["https://futuretech-career.com/og-about.jpg"],
  },
}

export default async function AboutPage() {
  const content = await publicApi.getContent()

  return (
    <>
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-3xl mx-auto space-y-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight mb-4">About Us</h1>
            <p className="text-xl text-muted-foreground">Careers Made Simple</p>
          </div>

          <div className="space-y-6 pt-8">
            <div className="prose prose-slate max-w-none">
              <p className="text-lg leading-relaxed text-muted-foreground">
                Future Tech Consultancy is a career support and recruitment consultancy helping job seekers explore
                suitable opportunities and improve job readiness. We provide resume writing, interview preparation,
                LinkedIn profile optimization, and job search assistance.
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground">
                We also offer optional short-term internships with certification. We follow ethical and transparent
                career practices.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-primary">Why Us</h2>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  We provide honest and ethical career guidance focused on long-term growth. Our approach is practical,
                  transparent, and tailored to each candidate's skills and goals. We focus on improving job readiness
                  and confidence rather than making false promises.
                </p>
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-primary">What We Do</h2>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  We support job seekers with career guidance and recruitment assistance to improve job readiness. Our
                  services include resume writing, interview preparation, LinkedIn profile optimization, and structured
                  job search support.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-primary/5 rounded-2xl p-8 md:p-12 mt-12">
            <h2 className="text-3xl font-bold mb-6 text-center">Why Choose Future-Tech Career?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-center">
              <div className="p-6 rounded-xl hover:bg-primary/10 transition-colors duration-300">
                <div className="text-5xl mb-3">👥</div>
                <div className="text-4xl font-bold text-primary mb-2">50+</div>
                <div className="text-muted-foreground font-medium">Candidates Successfully Placed</div>
              </div>
              <div className="p-6 rounded-xl hover:bg-accent/10 transition-colors duration-300">
                <div className="text-5xl mb-3">⭐</div>
                <div className="text-4xl font-bold text-accent mb-2">95%</div>
                <div className="text-muted-foreground font-medium">Client Satisfaction Rate</div>
              </div>
              <div className="p-6 rounded-xl hover:bg-secondary/10 transition-colors duration-300">
                <div className="text-5xl mb-3">📅</div>
                <div className="text-4xl font-bold text-secondary mb-2">3+</div>
                <div className="text-muted-foreground font-medium">Years of Industry Experience</div>
              </div>
              <div className="p-6 rounded-xl hover:bg-primary/10 transition-colors duration-300">
                <div className="text-5xl mb-3">💬</div>
                <div className="text-4xl font-bold text-primary mb-2">24/7</div>
                <div className="text-muted-foreground font-medium">Career Support Availability</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
