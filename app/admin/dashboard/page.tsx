"use client"

import { useEffect, useState } from "react"
import { adminApi } from "@/lib/api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, Star, CheckCircle, Clock } from "lucide-react"
import type { Inquiry, Testimonial } from "@/lib/mock-data"
import { logger } from "@/lib/logger"

export default function DashboardPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [feedback, setFeedback] = useState<Testimonial[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string>("")

  useEffect(() => {
    const loadData = async () => {
      try {
        const [inqData, feedbackData] = await Promise.all([
          adminApi.getInquiries(), 
          adminApi.getFeedback()
        ])
        
        // Ensure we always have arrays and normalize the data
        const normalizedInquiries = Array.isArray(inqData) ? inqData.map((inq: any) => ({
          ...inq,
          createdAt: Array.isArray(inq.createdAt) 
            ? new Date(inq.createdAt[0], inq.createdAt[1] - 1, inq.createdAt[2], inq.createdAt[3] || 0, inq.createdAt[4] || 0, inq.createdAt[5] || 0).toISOString()
            : inq.createdAt
        })) : []
        
        const normalizedFeedback = Array.isArray(feedbackData) ? feedbackData.map((fb: any) => ({
          ...fb,
          createdAt: Array.isArray(fb.createdAt)
            ? new Date(fb.createdAt[0], fb.createdAt[1] - 1, fb.createdAt[2], fb.createdAt[3] || 0, fb.createdAt[4] || 0, fb.createdAt[5] || 0).toISOString()
            : fb.createdAt
        })) : []
        
        setInquiries(normalizedInquiries)
        setFeedback(normalizedFeedback)
      } catch (error: any) {
        logger.error("Error loading dashboard data:", error)
        setError(error?.message || "Failed to load data")
        setInquiries([])
        setFeedback([])
      } finally {
        setIsLoading(false)
      }
    }
    
    loadData()
  }, [])

  if (isLoading) return <div className="p-8 text-center">Loading stats...</div>

  if (error) {
    return (
      <div className="p-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 className="text-red-800 font-semibold">Error loading data</h3>
          <p className="text-red-600 text-sm mt-2">{error}</p>
        </div>
      </div>
    )
  }

  const stats = [
    {
      title: "Total Inquiries",
      value: inquiries.length,
      icon: MessageSquare,
      color: "text-blue-500",
      description: `${inquiries.filter((i) => !i.isRead).length} unread`,
    },
    {
      title: "Pending Feedback",
      value: feedback.filter((f) => f.status === "pending").length,
      icon: Clock,
      color: "text-orange-500",
      description: "Needs review",
    },
    {
      title: "Active Testimonials",
      value: feedback.filter((f) => f.status === "approved").length,
      icon: Star,
      color: "text-yellow-500",
      description: "Displaying on site",
    },
    {
      title: "Success Rate",
      value: "98%",
      icon: CheckCircle,
      color: "text-green-500",
      description: "Client satisfaction",
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>
        <p className="text-muted-foreground">Welcome back! Here is what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <Card key={idx}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Recent Inquiries</CardTitle>
          </CardHeader>
          <CardContent>
            {inquiries.length === 0 ? (
              <p className="text-sm text-muted-foreground">No inquiries yet.</p>
            ) : (
              <ul className="space-y-4">
                {inquiries.slice(0, 5).map((inq) => (
                  <li key={inq.id} className="flex items-center justify-between border-b pb-2 last:border-0">
                    <div>
                      <p className="font-medium text-sm">{inq.fullName}</p>
                      <p className="text-xs text-muted-foreground">{inq.inquiryType}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {new Date(inq.createdAt).toLocaleDateString()}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pending Feedback</CardTitle>
          </CardHeader>
          <CardContent>
            {feedback.filter((f) => f.status === "pending").length === 0 ? (
              <p className="text-sm text-muted-foreground">No pending feedback.</p>
            ) : (
              <ul className="space-y-4">
                {feedback
                  .filter((f) => f.status === "pending")
                  .slice(0, 5)
                  .map((f) => (
                    <li key={f.id} className="flex items-center justify-between border-b pb-2 last:border-0">
                      <div>
                        <p className="font-medium text-sm">{f.name}</p>
                        <p className="text-xs text-muted-foreground">Rating: {f.rating}/5</p>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {new Date(f.createdAt).toLocaleDateString()}
                      </span>
                    </li>
                  ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
