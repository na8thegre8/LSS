"use client"

import { useState } from "react"

export const useGoogleMaps = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState<string | null>("Google Maps API not configured")

  // This hook now just returns an error state since Maps is disabled
  return { isLoaded: false, error: "Google Maps API not configured" }
}
