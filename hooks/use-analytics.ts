"use client"

import { useEffect, useState } from "react"
import { trackEvent } from "@/lib/database"

export function useAnalytics() {
  const [sessionId] = useState(() => {
    if (typeof window !== "undefined") {
      return Math.random().toString(36).substring(2, 15)
    }
    return null
  })

  const track = async (eventName: string, properties?: any, userId?: string) => {
    try {
      await trackEvent(eventName, properties, userId, sessionId)
    } catch (error) {
      console.error("Analytics tracking failed:", error)
    }
  }

  // Track page views automatically
  useEffect(() => {
    if (typeof window !== "undefined") {
      track("page_view", {
        page: window.location.pathname,
        referrer: document.referrer,
      })
    }
  }, [])

  return { track, sessionId }
}
