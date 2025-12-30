"use client"

import { useEffect, useState } from "react"
import { adminApi } from "@/lib/api"
import type { Inquiry } from "@/lib/mock-data"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trash2, Mail, CheckCircle2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    adminApi.getInquiries().then((data) => {
      setInquiries(data)
      setIsLoading(false)
    })
  }, [])

  const toggleStatus = (id: string) => {
    setInquiries(
      inquiries.map((inq) => (inq.id === id ? { ...inq, status: inq.status === "unread" ? "read" : "unread" } : inq)),
    )
    toast({ title: "Updated", description: "Status changed successfully." })
  }

  const deleteInquiry = (id: string) => {
    setInquiries(inquiries.filter((inq) => inq.id !== id))
    toast({ title: "Deleted", description: "Inquiry removed." })
  }

  if (isLoading) return <div className="p-8">Loading inquiries...</div>

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Inquiries</h1>
        <Badge variant="outline">{inquiries.length} Total</Badge>
      </div>

      <div className="border rounded-lg bg-background">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inquiries.map((inq) => (
              <TableRow key={inq.id}>
                <TableCell>
                  <div className="font-medium">{inq.fullName}</div>
                  <div className="text-xs text-muted-foreground">{inq.email}</div>
                </TableCell>
                <TableCell>{inq.inquiryType}</TableCell>
                <TableCell>{new Date(inq.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Badge variant={inq.status === "unread" ? "destructive" : "secondary"}>{inq.status}</Badge>
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button variant="ghost" size="icon" onClick={() => toggleStatus(inq.id)} title="Mark Read/Unread">
                    <CheckCircle2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" asChild>
                    <a href={`mailto:${inq.email}`} title="Reply">
                      <Mail className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteInquiry(inq.id)}
                    className="text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {inquiries.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  No inquiries found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
