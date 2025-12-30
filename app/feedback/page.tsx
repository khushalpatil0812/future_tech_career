"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { SEO } from "@/components/seo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"
import { publicApi } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

export default function FeedbackPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      rating: 5,
      feedback: "",
      consent: false,
    },
  })

  async function onSubmit(values: any) {
    setIsSubmitting(true)
    try {
      const response = await publicApi.submitFeedback(values)
      toast({ title: "Thank you!", description: response.message })
      form.reset()
    } catch (error) {
      toast({ title: "Error", description: "Submission failed.", variant: "destructive" })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight mb-4">Share Your Experience</h1>
            <p className="text-xl text-muted-foreground">Your feedback helps us improve our services for everyone.</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem className="text-center">
                    <FormLabel className="text-lg">Overall Rating</FormLabel>
                    <div className="flex justify-center space-x-2 pt-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => field.onChange(star)}
                          className="focus:outline-none transition-transform hover:scale-110"
                        >
                          <Star
                            className={cn(
                              "h-10 w-10",
                              star <= field.value ? "fill-accent text-accent" : "text-muted-foreground",
                            )}
                          />
                        </button>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  rules={{ required: "Name is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="your@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="feedback"
                rules={{ required: "Feedback is required", minLength: { value: 10, message: "Min 10 chars" } }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Feedback</FormLabel>
                    <FormControl>
                      <div className="space-y-2">
                        <Textarea placeholder="Tell us about your experience..." className="min-h-[150px]" {...field} />
                        <div className="text-right">
                          <span className="text-xs text-muted-foreground">{field.value.length} characters</span>
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="consent"
                rules={{ required: "You must consent to proceed" }}
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Display Consent</FormLabel>
                      <FormDescription>I consent to display my feedback as a testimonial on this site.</FormDescription>
                    </div>
                  </FormItem>
                )}
              />

              <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Feedback"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </>
  )
}
