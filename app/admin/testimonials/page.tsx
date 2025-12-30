"use client"

import { useEffect, useState } from "react"
import { adminApi } from "@/lib/api"
import type { Testimonial } from "@/lib/mock-data"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Trash2, Save, EyeOff } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function TestimonialsManagerPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    adminApi.getFeedback()
      .then((data) => {
        const feedbackArray = Array.isArray(data) ? data : []
        setTestimonials(feedbackArray.filter((f) => f.status === "approved"))
        setIsLoading(false)
      })
      .catch((error) => {
        console.error("Error loading testimonials:", error)
        setTestimonials([])
        setIsLoading(false)
      })
  }, [])

  const updateRole = (id: string, role: string) => {
    setTestimonials(testimonials.map((t) => (t.id === id ? { ...t, role } : t)))
  }

  const toggleVisibility = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "approved" ? "rejected" : "approved"
    try {
      await adminApi.updateTestimonialStatus(id, newStatus as any)
      setTestimonials(testimonials.filter((t) => t.id !== id)) // Move out of "approved" list if rejected
      toast({ title: "Success", description: "Visibility toggled." })
    } catch (e) {
      toast({ title: "Error", description: "Action failed.", variant: "destructive" })
    }
  }

  if (isLoading) return <div className="p-8">Loading testimonials...</div>

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Active Testimonials</h1>
        <p className="text-muted-foreground text-sm">Managing testimonials currently displayed on the site.</p>
      </div>

      <div className="border rounded-lg bg-background">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Professional Role</TableHead>
              <TableHead>Feedback</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {testimonials.map((t) => (
              <TableRow key={t.id}>
                <TableCell className="font-medium">{t.name}</TableCell>
                <TableCell>
                  <Input
                    value={t.role || ""}
                    onChange={(e) => updateRole(t.id, e.target.value)}
                    placeholder="e.g. CEO at TechCorp"
                    className="h-8 text-xs"
                  />
                </TableCell>
                <TableCell className="max-w-xs truncate text-xs">{t.feedback}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button variant="ghost" size="icon" onClick={() => toast({ title: "Role Saved" })}>
                    <Save className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleVisibility(t.id, t.status)}
                    title="Hide from site"
                  >
                    <EyeOff className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive"
                    onClick={() => setTestimonials(testimonials.filter((x) => x.id !== t.id))}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {testimonials.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                  No approved testimonials found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
