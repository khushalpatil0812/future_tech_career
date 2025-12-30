"use client"

import { useEffect, useState } from "react"
import { adminApi, publicApi } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Save, Loader2 } from "lucide-react"

export default function ContentEditorPage() {
  const [content, setContent] = useState<any>({
    hero: { title: "", subtitle: "" },
    about: { mission: "", vision: "" },
    contact: { email: "", phone: "", address: "" }
  })
  const [isSaving, setIsSaving] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    publicApi.getContent()
      .then(data => {
        setContent({
          hero: data?.hero || { title: "", subtitle: "" },
          about: data?.about || { mission: "", vision: "" },
          contact: data?.contact || { email: "", phone: "", address: "" }
        })
      })
      .catch(() => {
        toast({ 
          title: "Error", 
          description: "Failed to load content. Using defaults.", 
          variant: "destructive" 
        })
      })
      .finally(() => setIsLoading(false))
  }, [])

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await adminApi.updateContent(content)
      toast({ title: "Success", description: "Site content updated successfully." })
    } catch (error) {
      toast({ title: "Error", description: "Failed to save changes.", variant: "destructive" })
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) return <div className="p-8">Loading content...</div>

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Content Editor</h1>
          <p className="text-muted-foreground">Modify the main text content across the website.</p>
        </div>
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
          Save Changes
        </Button>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Home Page Hero</CardTitle>
            <CardDescription>Main headline and subtext displayed on the homepage.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Hero Title</label>
              <Input
                value={content?.hero?.title || ""}
                onChange={(e) => setContent({ ...content, hero: { ...content.hero, title: e.target.value } })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Hero Subtitle</label>
              <Textarea
                value={content?.hero?.subtitle || ""}
                onChange={(e) => setContent({ ...content, hero: { ...content.hero, subtitle: e.target.value } })}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>About Us Section</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Our Mission</label>
              <Textarea
                value={content?.about?.mission || ""}
                onChange={(e) => setContent({ ...content, about: { ...content.about, mission: e.target.value } })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Our Vision</label>
              <Textarea
                value={content?.about?.vision || ""}
                onChange={(e) => setContent({ ...content, about: { ...content.about, vision: e.target.value } })}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Support Email</label>
              <Input
                value={content?.contact?.email || ""}
                onChange={(e) => setContent({ ...content, contact: { ...content.contact, email: e.target.value } })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Phone Number</label>
              <Input
                value={content?.contact?.phone || ""}
                onChange={(e) => setContent({ ...content, contact: { ...content.contact, phone: e.target.value } })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Office Address</label>
              <Input
                value={content?.contact?.address || ""}
                onChange={(e) => setContent({ ...content, contact: { ...content.contact, address: e.target.value } })}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
