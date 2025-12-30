import { mockData, type Testimonial, type Inquiry } from "./mock-data"
import { logger } from "./logger"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const publicApi = {
  async getTestimonials(): Promise<Testimonial[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/testimonials/active`, {
        next: { revalidate: 300 }, // Cache for 5 minutes
        signal: AbortSignal.timeout(5000), // 5 second timeout
      })
      if (!response.ok) throw new Error("Failed to fetch testimonials")
      const data = await response.json()
      // Backend returns ApiResponse wrapper with data property
      return data.data || data
    } catch (error) {
      logger.error("Error fetching testimonials:", error)
      return mockData.testimonials.filter((t) => t.status === "approved")
    }
  },

  async submitInquiry(
    data: Omit<Inquiry, "id" | "status" | "createdAt">,
  ): Promise<{ success: boolean; message: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/inquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!response.ok) throw new Error("Failed to submit inquiry")
      return await response.json()
    } catch (error) {
      logger.error("Error submitting inquiry:", error)
      throw error
    }
  },

  async submitFeedback(data: {
    name: string
    email?: string
    rating: number
    feedback: string
    consent: boolean
  }): Promise<{ success: boolean; message: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!response.ok) throw new Error("Failed to submit feedback")
      return await response.json()
    } catch (error) {
      logger.error("Error submitting feedback:", error)
      throw error
    }
  },

  async getSEO(page: keyof typeof mockData.seo) {
    try {
      const response = await fetch(`${API_BASE_URL}/seo/${page}`, {
        next: { revalidate: 600 }, // Cache for 10 minutes
        signal: AbortSignal.timeout(5000),
      })
      if (!response.ok) throw new Error("Failed to fetch SEO data")
      const data = await response.json()
      // Backend returns ApiResponse wrapper with data property
      return data.data || data
    } catch (error) {
      logger.error("Error fetching SEO data:", error)
      return mockData.seo[page]
    }
  },

  async getContent() {
    try {
      const response = await fetch(`${API_BASE_URL}/content`, {
        next: { revalidate: 600 }, // Cache for 10 minutes
        signal: AbortSignal.timeout(5000),
      })
      if (!response.ok) throw new Error("Failed to fetch content")
      const data = await response.json()
      // Backend returns ApiResponse wrapper with data property
      const contentArray = data.data || data
      return contentArray.reduce((acc: any, item: any) => {
        acc[item.section] = { title: item.section, content: item.content }
        return acc
      }, {})
    } catch (error) {
      logger.error("Error fetching content:", error)
      return mockData.content
    }
  },
}

export const adminApi = {
  async login(credentials: { email: string; password: string }) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      })
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Invalid credentials")
      }
      const result = await response.json()
      // Backend returns ApiResponse wrapper with data property
      const data = result.data || result
      if (data.token) {
        localStorage.setItem("admin_token", data.token)
      }
      return data
    } catch (error) {
      logger.error("Login error:", error)
      throw error
    }
  },

  async getInquiries() {
    try {
      const token = localStorage.getItem("admin_token")
      const response = await fetch(`${API_BASE_URL}/admin/inquiries`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!response.ok) throw new Error("Failed to fetch inquiries")
      const result = await response.json()
      // Backend returns ApiResponse wrapper with PaginationResponse inside
      const data = result.data || result
      // PaginationResponse has items array
      return data.items || data
    } catch (error) {
      logger.error("Error fetching inquiries:", error)
      return []
    }
  },

  async getFeedback() {
    try {
      const token = localStorage.getItem("admin_token")
      const response = await fetch(`${API_BASE_URL}/admin/feedback`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!response.ok) throw new Error("Failed to fetch feedback")
      const result = await response.json()
      // Backend returns ApiResponse wrapper with PaginationResponse inside
      const data = result.data || result
      // PaginationResponse has items array
      return data.items || data
    } catch (error) {
      logger.error("Error fetching feedback:", error)
      return []
    }
  },

  async updateTestimonialStatus(id: string, status: "approved" | "rejected") {
    try {
      const token = localStorage.getItem("admin_token")
      const response = await fetch(`${API_BASE_URL}/admin/testimonials/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      })
      if (!response.ok) throw new Error("Failed to update status")
      return await response.json()
    } catch (error) {
      logger.error("Error updating testimonial status:", error)
      throw error
    }
  },

  async updateContent(content: typeof mockData.content) {
    try {
      const token = localStorage.getItem("admin_token")
      const response = await fetch(`${API_BASE_URL}/admin/content`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(content),
      })
      if (!response.ok) throw new Error("Failed to update content")
      return await response.json()
    } catch (error) {
      logger.error("Error updating content:", error)
      throw error
    }
  },

  async updateSEO(seo: typeof mockData.seo) {
    try {
      const token = localStorage.getItem("admin_token")
      const response = await fetch(`${API_BASE_URL}/admin/seo`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(seo),
      })
      if (!response.ok) throw new Error("Failed to update SEO")
      return await response.json()
    } catch (error) {
      logger.error("Error updating SEO:", error)
      throw error
    }
  },
}
