"use client"

import { useEffect, useState } from "react"
import { adminApi } from "@/lib/api"
import type { Testimonial } from "@/lib/mock-data"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, X, Trash2, Star } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function FeedbackManagerPage() {
  const [feedback, setFeedback] = useState<Testimonial[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    adminApi.getFeedback()
      .then((data) => {
        setFeedback(Array.isArray(data) ? data : [])
        setIsLoading(false)
      })
      .catch((error) => {
        console.error("Error loading feedback:", error)
        setFeedback([])
        setIsLoading(false)
      })
  }, [])

  const handleStatusChange = async (id: string, status: "approved" | "rejected") => {
    try {
      await adminApi.updateTestimonialStatus(id, status)
      setFeedback(feedback.map((f) => (f.id === id ? { ...f, status } : f)))
      toast({ title: "Success", description: `Feedback ${status}.` })
    } catch (error) {
      toast({ title: "Error", description: "Failed to update status.", variant: "destructive" })
    }
  }

  const deleteFeedback = (id: string) => {
    setFeedback(feedback.filter((f) => f.id !== id))
    toast({ title: "Deleted", description: "Feedback removed." })
  }

  if (isLoading) return <div className="p-8">Loading feedback...</div>

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Feedback Manager</h1>
        <Badge variant="outline">{feedback.filter((f) => f.status === "pending").length} Pending</Badge>
      </div>

      <div className="border rounded-lg bg-background">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Client</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Feedback</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {feedback.map((f) => (
              <TableRow key={f.id}>
                <TableCell>
                  <div className="font-medium">{f.name}</div>
                  <div className="text-xs text-muted-foreground">{f.email}</div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Star className="h-3 w-3 fill-yellow-500 text-yellow-500 mr-1" />
                    <span>{f.rating}/5</span>
                  </div>
                </TableCell>
                <TableCell className="max-w-xs truncate" title={f.feedback}>
                  {f.feedback}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={f.status === "approved" ? "default" : f.status === "pending" ? "outline" : "destructive"}
                  >
                    {f.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right space-x-2">
                  {f.status !== "approved" && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-green-600"
                      onClick={() => handleStatusChange(f.id, "approved")}
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                  )}
                  {f.status !== "rejected" && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-orange-600"
                      onClick={() => handleStatusChange(f.id, "rejected")}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                  <Button variant="ghost" size="icon" className="text-destructive" onClick={() => deleteFeedback(f.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
