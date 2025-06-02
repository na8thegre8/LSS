"use client"

import { useState, useEffect } from "react"

export const useGoogleMaps = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadGoogleMaps = async () => {
      try {
        // Check if Google Maps is already loaded
        if (window.google && window.google.maps) {
          setIsLoaded(true)
          return
        }

        // Fetch the script URL from our API route
        const response = await fetch("/api/google-maps-script")
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || "Failed to load Google Maps")
        }

        // Load the script
        const script = document.createElement("script")
        script.src = data.scriptUrl
        script.async = true
        script.onload = () => setIsLoaded(true)
        script.onerror = () => setError("Failed to load Google Maps script")

        document.head.appendChild(script)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error")
      }
    }

    loadGoogleMaps()
  }, [])

  return { isLoaded, error }
}
