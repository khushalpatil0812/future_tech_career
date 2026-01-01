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
      logger.log("Submitting inquiry to:", `${API_BASE_URL}/inquiries`)
      logger.log("Data:", data)
      
      const response = await fetch(`${API_BASE_URL}/inquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      
      logger.log("Response status:", response.status)
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: "Unknown error" }))
        logger.error("API Error:", JSON.stringify(errorData))
        
        // Extract validation error message
        const errorMessage = errorData.message || errorData.error || "Failed to submit inquiry"
        throw new Error(errorMessage)
      }
      
      const result = await response.json()
      logger.log("API Response:", result)
      return result
    } catch (error: any) {
      logger.error("Error submitting inquiry:", error)
      
      // Provide more specific error messages
      if (error.message?.includes("Failed to fetch")) {
        throw new Error("Cannot connect to server. Please check if the backend is running.")
      }
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

  // Job Openings API
  async getJobOpenings(params?: { page?: number; size?: number; status?: string; department?: string }) {
    try {
      const token = localStorage.getItem("admin_token")
      const queryParams = new URLSearchParams()
      if (params?.page !== undefined) queryParams.append("page", params.page.toString())
      if (params?.size !== undefined) queryParams.append("size", params.size.toString())
      if (params?.status) queryParams.append("status", params.status)
      if (params?.department) queryParams.append("department", params.department)
      
      const response = await fetch(`${API_BASE_URL}/admin/job-openings?${queryParams}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!response.ok) throw new Error("Failed to fetch job openings")
      const result = await response.json()
      return result.data || result
    } catch (error) {
      logger.error("Error fetching job openings:", error)
      throw error
    }
  },

  async createJobOpening(data: any) {
    try {
      const token = localStorage.getItem("admin_token")
      const response = await fetch(`${API_BASE_URL}/admin/job-openings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      })
      if (!response.ok) throw new Error("Failed to create job opening")
      return await response.json()
    } catch (error) {
      logger.error("Error creating job opening:", error)
      throw error
    }
  },

  async updateJobOpening(id: string, data: any) {
    try {
      const token = localStorage.getItem("admin_token")
      const response = await fetch(`${API_BASE_URL}/admin/job-openings/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      })
      if (!response.ok) throw new Error("Failed to update job opening")
      return await response.json()
    } catch (error) {
      logger.error("Error updating job opening:", error)
      throw error
    }
  },

  async deleteJobOpening(id: string) {
    try {
      const token = localStorage.getItem("admin_token")
      const response = await fetch(`${API_BASE_URL}/admin/job-openings/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!response.ok) throw new Error("Failed to delete job opening")
      return await response.json()
    } catch (error) {
      logger.error("Error deleting job opening:", error)
      throw error
    }
  },

  // Candidates API
  async getCandidates(params?: { page?: number; size?: number; jobOpeningId?: string; interviewStage?: string }) {
    try {
      const token = localStorage.getItem("admin_token")
      const queryParams = new URLSearchParams()
      if (params?.page !== undefined) queryParams.append("page", params.page.toString())
      if (params?.size !== undefined) queryParams.append("size", params.size.toString())
      if (params?.jobOpeningId) queryParams.append("jobOpeningId", params.jobOpeningId)
      if (params?.interviewStage) queryParams.append("interviewStage", params.interviewStage)
      
      const response = await fetch(`${API_BASE_URL}/admin/candidates?${queryParams}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!response.ok) throw new Error("Failed to fetch candidates")
      const result = await response.json()
      return result.data || result
    } catch (error) {
      logger.error("Error fetching candidates:", error)
      throw error
    }
  },

  async createCandidate(data: any) {
    try {
      const token = localStorage.getItem("admin_token")
      const response = await fetch(`${API_BASE_URL}/admin/candidates`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      })
      if (!response.ok) throw new Error("Failed to create candidate")
      return await response.json()
    } catch (error) {
      logger.error("Error creating candidate:", error)
      throw error
    }
  },

  async updateCandidate(id: string, data: any) {
    try {
      const token = localStorage.getItem("admin_token")
      const response = await fetch(`${API_BASE_URL}/admin/candidates/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      })
      if (!response.ok) throw new Error("Failed to update candidate")
      return await response.json()
    } catch (error) {
      logger.error("Error updating candidate:", error)
      throw error
    }
  },

  async updateCandidateInterviewStage(id: string, interviewStage: string) {
    try {
      const token = localStorage.getItem("admin_token")
      const response = await fetch(`${API_BASE_URL}/admin/candidates/${id}/interview-stage`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ interviewStage }),
      })
      if (!response.ok) throw new Error("Failed to update interview stage")
      return await response.json()
    } catch (error) {
      logger.error("Error updating interview stage:", error)
      throw error
    }
  },

  async updateCandidateHRNotes(id: string, hrNotes: string) {
    try {
      const token = localStorage.getItem("admin_token")
      const response = await fetch(`${API_BASE_URL}/admin/candidates/${id}/hr-notes`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ hrNotes }),
      })
      if (!response.ok) throw new Error("Failed to update HR notes")
      return await response.json()
    } catch (error) {
      logger.error("Error updating HR notes:", error)
      throw error
    }
  },

  async deleteCandidate(id: string) {
    try {
      const token = localStorage.getItem("admin_token")
      const response = await fetch(`${API_BASE_URL}/admin/candidates/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!response.ok) throw new Error("Failed to delete candidate")
      return await response.json()
    } catch (error) {
      logger.error("Error deleting candidate:", error)
      throw error
    }
  },

  // Clients API
  async getClients(params?: { page?: number; size?: number; status?: string; search?: string }) {
    try {
      const token = localStorage.getItem("admin_token")
      const queryParams = new URLSearchParams()
      if (params?.page !== undefined) queryParams.append("page", params.page.toString())
      if (params?.size !== undefined) queryParams.append("size", params.size.toString())
      if (params?.status) queryParams.append("status", params.status)
      if (params?.search) queryParams.append("search", params.search)
      
      const response = await fetch(`${API_BASE_URL}/admin/clients?${queryParams}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!response.ok) throw new Error("Failed to fetch clients")
      const result = await response.json()
      return result.data || result
    } catch (error) {
      logger.error("Error fetching clients:", error)
      throw error
    }
  },

  async getActiveClients() {
    try {
      const token = localStorage.getItem("admin_token")
      const response = await fetch(`${API_BASE_URL}/admin/clients/active`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!response.ok) throw new Error("Failed to fetch active clients")
      const result = await response.json()
      return result.data || result
    } catch (error) {
      logger.error("Error fetching active clients:", error)
      throw error
    }
  },

  async createClient(data: any) {
    try {
      const token = localStorage.getItem("admin_token")
      const response = await fetch(`${API_BASE_URL}/admin/clients`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      })
      if (!response.ok) throw new Error("Failed to create client")
      return await response.json()
    } catch (error) {
      logger.error("Error creating client:", error)
      throw error
    }
  },

  async updateClient(id: string, data: any) {
    try {
      const token = localStorage.getItem("admin_token")
      const response = await fetch(`${API_BASE_URL}/admin/clients/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      })
      if (!response.ok) throw new Error("Failed to update client")
      return await response.json()
    } catch (error) {
      logger.error("Error updating client:", error)
      throw error
    }
  },

  async deleteClient(id: string) {
    try {
      const token = localStorage.getItem("admin_token")
      const response = await fetch(`${API_BASE_URL}/admin/clients/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!response.ok) throw new Error("Failed to delete client")
      return await response.json()
    } catch (error) {
      logger.error("Error deleting client:", error)
      throw error
    }
  },

  // Contracts API
  async getContracts(params?: { page?: number; size?: number; clientId?: string; status?: string }) {
    try {
      const token = localStorage.getItem("admin_token")
      const queryParams = new URLSearchParams()
      if (params?.page !== undefined) queryParams.append("page", params.page.toString())
      if (params?.size !== undefined) queryParams.append("size", params.size.toString())
      if (params?.clientId) queryParams.append("clientId", params.clientId)
      if (params?.status) queryParams.append("status", params.status)
      
      const response = await fetch(`${API_BASE_URL}/admin/contracts?${queryParams}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!response.ok) throw new Error("Failed to fetch contracts")
      const result = await response.json()
      return result.data || result
    } catch (error) {
      logger.error("Error fetching contracts:", error)
      throw error
    }
  },

  async getExpiringContracts(days: number = 30) {
    try {
      const token = localStorage.getItem("admin_token")
      const response = await fetch(`${API_BASE_URL}/admin/contracts/expiring?days=${days}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!response.ok) throw new Error("Failed to fetch expiring contracts")
      const result = await response.json()
      return result.data || result
    } catch (error) {
      logger.error("Error fetching expiring contracts:", error)
      throw error
    }
  },

  async createContract(data: any) {
    try {
      const token = localStorage.getItem("admin_token")
      const response = await fetch(`${API_BASE_URL}/admin/contracts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      })
      if (!response.ok) throw new Error("Failed to create contract")
      return await response.json()
    } catch (error) {
      logger.error("Error creating contract:", error)
      throw error
    }
  },

  async updateContract(id: string, data: any) {
    try {
      const token = localStorage.getItem("admin_token")
      const response = await fetch(`${API_BASE_URL}/admin/contracts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      })
      if (!response.ok) throw new Error("Failed to update contract")
      return await response.json()
    } catch (error) {
      logger.error("Error updating contract:", error)
      throw error
    }
  },

  async deleteContract(id: string) {
    try {
      const token = localStorage.getItem("admin_token")
      const response = await fetch(`${API_BASE_URL}/admin/contracts/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!response.ok) throw new Error("Failed to delete contract")
      return await response.json()
    } catch (error) {
      logger.error("Error deleting contract:", error)
      throw error
    }
  },

  // Resource Requirements API
  async getResourceRequirements(params?: { page?: number; size?: number; clientId?: string; status?: string }) {
    try {
      const token = localStorage.getItem("admin_token")
      const queryParams = new URLSearchParams()
      if (params?.page !== undefined) queryParams.append("page", params.page.toString())
      if (params?.size !== undefined) queryParams.append("size", params.size.toString())
      if (params?.clientId) queryParams.append("clientId", params.clientId)
      if (params?.status) queryParams.append("status", params.status)
      
      const response = await fetch(`${API_BASE_URL}/admin/resource-requirements?${queryParams}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!response.ok) throw new Error("Failed to fetch resource requirements")
      const result = await response.json()
      return result.data || result
    } catch (error) {
      logger.error("Error fetching resource requirements:", error)
      throw error
    }
  },

  async createResourceRequirement(data: any) {
    try {
      const token = localStorage.getItem("admin_token")
      const response = await fetch(`${API_BASE_URL}/admin/resource-requirements`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      })
      if (!response.ok) throw new Error("Failed to create resource requirement")
      return await response.json()
    } catch (error) {
      logger.error("Error creating resource requirement:", error)
      throw error
    }
  },

  async updateResourceRequirement(id: string, data: any) {
    try {
      const token = localStorage.getItem("admin_token")
      const response = await fetch(`${API_BASE_URL}/admin/resource-requirements/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      })
      if (!response.ok) throw new Error("Failed to update resource requirement")
      return await response.json()
    } catch (error) {
      logger.error("Error updating resource requirement:", error)
      throw error
    }
  },

  async updateResourceRequirementStatus(id: string, status: string) {
    try {
      const token = localStorage.getItem("admin_token")
      const response = await fetch(`${API_BASE_URL}/admin/resource-requirements/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      })
      if (!response.ok) throw new Error("Failed to update resource requirement status")
      return await response.json()
    } catch (error) {
      logger.error("Error updating resource requirement status:", error)
      throw error
    }
  },

  async deleteResourceRequirement(id: string) {
    try {
      const token = localStorage.getItem("admin_token")
      const response = await fetch(`${API_BASE_URL}/admin/resource-requirements/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!response.ok) throw new Error("Failed to delete resource requirement")
      return await response.json()
    } catch (error) {
      logger.error("Error deleting resource requirement:", error)
      throw error
    }
  },
}
