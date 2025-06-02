"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight } from "lucide-react"
import { RealTimeCounter } from "@/components/ui/real-time-counter"

export default function StandardHero() {
  const router = useRouter()
  const [location, setLocation] = useState("")
  const [radius, setRadius] = useState(5)
  const [isDetectingLocation, setIsDetectingLocation] = useState(false)
  const [locationError, setLocationError] = useState(false)

  // Auto-detect location on component mount
  useEffect(() => {
    // Check if geolocation is available in this environment
    if (navigator.geolocation && typeof navigator.geolocation.getCurrentPosition === "function") {
      try {
        setIsDetectingLocation(true)

        // Set a timeout to handle cases where geolocation takes too long or silently fails
        const timeoutId = setTimeout(() => {
          setIsDetectingLocation(false)
        }, 3000)

        navigator.geolocation.getCurrentPosition(
          (position) => {
            // In a real implementation, this would convert coordinates to ZIP/city
            // For now, we'll just set a placeholder
            setLocation("Denver, CO")
            setIsDetectingLocation(false)
            clearTimeout(timeoutId)
          },
          (error) => {
            console.log("Geolocation error or disabled:", error.message)
            setIsDetectingLocation(false)
            clearTimeout(timeoutId)
          },
          { timeout: 5000, maximumAge: 60000 },
        )
      } catch (e) {
        console.log("Geolocation exception:", e)
        setIsDetectingLocation(false)
      }
    } else {
      // Geolocation not available in this environment
      console.log("Geolocation API not available")
      setIsDetectingLocation(false)
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!location) {
      setLocationError(true)
      return
    }

    // Navigate to questionnaire with initial data
    router.push(`/questionnaire?location=${encodeURIComponent(location)}&radius=${radius}`)
  }

  return (
    <section className="relative bg-white py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="w-full lg:w-1/2 mb-12 lg:mb-0">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Every small warehouse, Flex space, or storefront—one search.
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              We scan 10+ marketplaces hourly and rank spaces by rent-vs-comps.
            </p>

            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6 max-w-md">
              <div className="space-y-6">
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                    Where are you looking?
                  </label>
                  <div className="relative">
                    <Input
                      id="location"
                      type="text"
                      placeholder={isDetectingLocation ? "Detecting your location..." : "ZIP or City"}
                      value={location}
                      onChange={(e) => {
                        setLocation(e.target.value)
                        setLocationError(false)
                      }}
                      className={locationError ? "border-red-500" : ""}
                      disabled={isDetectingLocation}
                    />
                    {locationError && <p className="text-red-500 text-sm mt-1">Please enter a location</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Search radius</label>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant={radius === 5 ? "default" : "outline"}
                      className={radius === 5 ? "bg-[#ED4337] hover:bg-[#d13a30] flex-1" : "flex-1"}
                      onClick={() => setRadius(5)}
                    >
                      5 mi
                    </Button>
                    <Button
                      type="button"
                      variant={radius === 10 ? "default" : "outline"}
                      className={radius === 10 ? "bg-[#ED4337] hover:bg-[#d13a30] flex-1" : "flex-1"}
                      onClick={() => setRadius(10)}
                    >
                      10 mi
                    </Button>
                  </div>
                </div>

                <Button type="submit" className="w-full bg-[#ED4337] hover:bg-[#d13a30] text-white h-12">
                  Find Spaces <ArrowRight className="ml-2 h-4 w-4" />
                </Button>

                <RealTimeCounter className="justify-center" />
              </div>
            </form>
          </div>

          <div className="w-full lg:w-1/2 lg:pl-12">
            <div className="relative rounded-lg overflow-hidden shadow-xl">
              {/* This would be a WebP/GIF in production */}
              <div className="relative">
                <img
                  src="/placeholder.svg?height=600&width=800"
                  alt="SpaceSelector app showing map with property listings"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <div className="inline-block bg-green-500 text-white text-sm font-bold px-3 py-1 rounded-full mb-2">
                    Great Deal ▲
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
