"use client"

import { useEffect, useState } from "react"
import { adminApi } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { Save, Loader2, Globe } from "lucide-react"

export default function SEOEditorPage() {
  const [seoData, setSeoData] = useState<any>(null)
  const [isSaving, setIsSaving] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    // We can fetch all SEO data if we add a helper, but for now we'll simulate fetching the whole block
    // based on our mock structure
    import("@/lib/mock-data").then((m) => {
      setSeoData({ ...m.mockData.seo })
    })
  }, [])

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await adminApi.updateSEO(seoData)
      toast({ title: "Success", description: "SEO metadata updated." })
    } catch (error) {
      toast({ title: "Error", description: "Failed to save SEO changes.", variant: "destructive" })
    } finally {
      setIsSaving(false)
    }
  }

  if (!seoData) return <div className="p-8">Loading SEO data...</div>

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">SEO Manager</h1>
          <p className="text-muted-foreground">Optimize search engine visibility and social sharing for each page.</p>
        </div>
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
          Save SEO Config
        </Button>
      </div>

      <Tabs defaultValue="home">
        <TabsList className="grid w-full grid-cols-5">
          {Object.keys(seoData).map((page) => (
            <TabsTrigger key={page} value={page} className="capitalize">
              {page}
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(seoData).map(([page, data]: [string, any]) => (
          <TabsContent key={page} value={page}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="mr-2 h-5 w-5 text-primary" />
                  <span className="capitalize">{page} Page Settings</span>
                </CardTitle>
                <CardDescription>Configure tags specifically for the {page} route.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label className="text-sm font-medium">Page Title</label>
                    <span
                      className={data.title.length > 60 ? "text-destructive text-xs" : "text-muted-foreground text-xs"}
                    >
                      {data.title.length}/60
                    </span>
                  </div>
                  <Input
                    value={data.title}
                    onChange={(e) => setSeoData({ ...seoData, [page]: { ...data, title: e.target.value } })}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label className="text-sm font-medium">Meta Description</label>
                    <span
                      className={
                        data.description.length > 160 ? "text-destructive text-xs" : "text-muted-foreground text-xs"
                      }
                    >
                      {data.description.length}/160
                    </span>
                  </div>
                  <Textarea
                    value={data.description}
                    onChange={(e) => setSeoData({ ...seoData, [page]: { ...data, description: e.target.value } })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Keywords (comma separated)</label>
                  <Input
                    value={data.keywords}
                    onChange={(e) => setSeoData({ ...seoData, [page]: { ...data, keywords: e.target.value } })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">OG Image URL</label>
                  <Input
                    value={data.ogImage}
                    onChange={(e) => setSeoData({ ...seoData, [page]: { ...data, ogImage: e.target.value } })}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
