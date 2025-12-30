export interface Testimonial {
  id: string
  name: string
  email: string
  rating: number
  feedback: string
  role: string | null
  status: "pending" | "approved" | "rejected"
  createdAt: string
}

export interface Inquiry {
  id: string
  fullName: string
  email: string
  phone: string
  inquiryType: string
  message: string
  isRead: boolean
  createdAt: string
}

export interface SiteContent {
  hero: {
    title: string
    subtitle: string
  }
  about: {
    mission: string
    vision: string
  }
  contact: {
    email: string
    phone: string
    address: string
  }
}

export const mockData = {
  testimonials: [
    {
      id: "1",
      name: "Alex Johnson",
      email: "alex@example.com",
      rating: 5,
      feedback: "Future-Tech helped me land my dream job at a top tech firm. Their resume optimization is top-notch!",
      role: "Software Engineer at Google",
      status: "approved",
      createdAt: new Date().toISOString(),
    },
    {
      id: "2",
      name: "Sarah Chen",
      email: "sarah@example.com",
      rating: 5,
      feedback:
        "The interview prep sessions were game-changers. I felt so much more confident during the actual process.",
      role: "Product Manager at Meta",
      status: "approved",
      createdAt: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      id: "3",
      name: "Michael Ross",
      email: "michael@example.com",
      rating: 4,
      feedback: "Great experience overall. The LinkedIn optimization really increased my profile visibility.",
      role: "Data Scientist",
      status: "approved",
      createdAt: new Date(Date.now() - 172800000).toISOString(),
    },
  ] as Testimonial[],
  inquiries: [] as Inquiry[],
  content: {
    hero: {
      title: "FUTURE-TECH CAREER",
      subtitle: "HELPING YOU BUILD YOUR CAREER",
    },
    about: {
      mission:
        "Future Tech Consultancy is a career support and recruitment consultancy helping job seekers explore suitable opportunities and improve job readiness. We provide resume writing, interview preparation, LinkedIn profile optimization, and job search assistance.",
      vision:
        "We follow ethical and transparent career practices, offering optional short-term internships with certification for skill enhancement.",
    },
    contact: {
      email: "carreirsfuturetech@gmail.com",
      phone: "7385552872 / 9270315005",
      address: "LinkedIn: future-tech-career",
    },
  } as SiteContent,
  seo: {
    home: {
      title: "Future-Tech Career | Professional Career Consultancy",
      description: "Expert career guidance, resume writing, and interview prep for tech professionals.",
      keywords: "career consultancy, tech jobs, resume writing, interview prep, career coaching",
      ogImage: "https://futuretech-career.com/og-home.jpg",
    },
    about: {
      title: "About Us | Future-Tech Career",
      description: "Learn about our mission to help tech professionals reach their full potential.",
      keywords: "about future-tech, career experts, our team",
      ogImage: "https://futuretech-career.com/og-about.jpg",
    },
    services: {
      title: "Our Services | Future-Tech Career",
      description: "Comprehensive career services including resume optimization and interview coaching.",
      keywords: "career services, resume writing, linkedin optimization",
      ogImage: "https://futuretech-career.com/og-services.jpg",
    },
    contact: {
      title: "Contact Us | Future-Tech Career",
      description: "Get in touch with our career experts today.",
      keywords: "contact career coach, help with resume",
      ogImage: "https://futuretech-career.com/og-contact.jpg",
    },
    feedback: {
      title: "Client Feedback | Future-Tech Career",
      description: "Read what our clients say about our career consultancy services.",
      keywords: "reviews, testimonials, client feedback",
      ogImage: "https://futuretech-career.com/og-feedback.jpg",
    },
  },
}
