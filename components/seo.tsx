import { useSEOData } from "@/hooks/use-seo-data"
import type { mockData } from "@/lib/mock-data"

export function SEO({ page }: { page: keyof typeof mockData.seo }) {
  const { seo } = useSEOData(page)

  if (!seo) return null

  return (
    <>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="keywords" content={seo.keywords} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.ogImage} />
      <meta property="og:type" content="website" />
    </>
  )
}
