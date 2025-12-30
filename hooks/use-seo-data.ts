"use client"

import { useEffect, useState } from "react"
import { publicApi } from "@/lib/api"
import type { mockData } from "@/lib/mock-data"

type PageKey = keyof typeof mockData.seo

export function useSEOData(page: PageKey) {
  const [seo, setSeo] = useState<(typeof mockData.seo)[PageKey] | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    publicApi.getSEO(page).then((data) => {
      setSeo(data)
      setIsLoading(false)
    })
  }, [page])

  return { seo, isLoading }
}
