import { mockData, type Testimonial, type Inquiry } from "./mock-data"

const DELAY = 500

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const publicApi = {
  async getTestimonials(): Promise<Testimonial[]> {
    await sleep(DELAY)
    return mockData.testimonials.filter((t) => t.status === "approved")
  },

  async submitInquiry(
    data: Omit<Inquiry, "id" | "status" | "createdAt">,
  ): Promise<{ success: boolean; message: string }> {
    await sleep(DELAY)
    const newInquiry: Inquiry = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      status: "unread",
      createdAt: new Date().toISOString(),
    }
    mockData.inquiries.push(newInquiry)
    return { success: true, message: "We'll contact you soon!" }
  },

  async submitFeedback(data: {
    name: string
    email?: string
    rating: number
    feedback: string
    consent: boolean
  }): Promise<{ success: boolean; message: string }> {
    await sleep(DELAY)
    const newTestimonial: Testimonial = {
      id: Math.random().toString(36).substr(2, 9),
      name: data.name,
      email: data.email || "",
      rating: data.rating,
      feedback: data.feedback,
      role: null,
      status: "pending",
      createdAt: new Date().toISOString(),
    }
    mockData.testimonials.push(newTestimonial)
    return { success: true, message: "Thank you! Your feedback is under review." }
  },

  async getSEO(page: keyof typeof mockData.seo) {
    await sleep(DELAY)
    return mockData.seo[page]
  },

  async getContent() {
    await sleep(DELAY)
    return mockData.content
  },
}

export const adminApi = {
  async login(credentials: { email: string; password: string }) {
    await sleep(DELAY)
    if (credentials.email === "admin@futuretech.com" && credentials.password === "admin123") {
      const token = "mock-admin-token-" + Date.now()
      localStorage.setItem("admin_token", token)
      return { success: true, token }
    }
    throw new Error("Invalid credentials")
  },

  async getInquiries() {
    await sleep(DELAY)
    return [...mockData.inquiries].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  },

  async getFeedback() {
    await sleep(DELAY)
    return [...mockData.testimonials].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  },

  async updateTestimonialStatus(id: string, status: "approved" | "rejected") {
    await sleep(DELAY)
    const index = mockData.testimonials.findIndex((t) => t.id === id)
    if (index !== -1) {
      mockData.testimonials[index].status = status
      return { success: true }
    }
    throw new Error("Testimonial not found")
  },

  async updateContent(content: typeof mockData.content) {
    await sleep(DELAY)
    mockData.content = content
    return { success: true }
  },

  async updateSEO(seo: typeof mockData.seo) {
    await sleep(DELAY)
    Object.assign(mockData.seo, seo)
    return { success: true }
  },
}
