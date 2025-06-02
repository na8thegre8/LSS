"use client"

import { useEffect, useState } from "react"

export function useAnalytics() {
  const [sessionId] = useState(() => {
    if (typeof window !== "undefined") {
      return Math.random().toString(36).substring(2, 15)
    }
    return null
  })

  const track = async (eventName: string, properties?: any, userId?: string) => {
    try {
      if (typeof window === "undefined") return // Don't run on server

      // Use the server-side API endpoint instead of direct Supabase call
      const response = await fetch("/api/track-event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventName,
          properties,
          userId,
          sessionId,
          pageUrl: window.location.href,
          userAgent: navigator.userAgent,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.warn("Analytics tracking failed:", errorData.error)
      }
    } catch (error) {
      // Gracefully handle errors without breaking the app
      console.warn("Analytics tracking failed:", error)
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
