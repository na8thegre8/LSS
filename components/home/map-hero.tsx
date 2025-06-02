"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { ArrowRight } from "lucide-react"
import { DealScoreBadge } from "@/components/ui/deal-score-badge"

// Seed listing data as specified in the master spec
const seedListings = [
  {
    type: "warehouse",
    address: "701 W Broadway St",
    cityZip: "Englewood, CO",
    sf: 4800,
    dealBand: "great" as const,
    thumb: "/placeholder.svg?height=120&width=180",
    lat: 39.653,
    lng: -104.99,
  },
  {
    type: "flex",
    address: "1137 W Cedar Ave",
    cityZip: "Denver, CO",
    sf: 4200,
    dealBand: "good" as const,
    thumb: "/placeholder.svg?height=120&width=180",
    lat: 39.688,
    lng: -105.003,
  },
  {
    type: "retail",
    address: "2731 W Hampden Ave",
    cityZip: "Englewood, CO",
    sf: 3100,
    dealBand: "fair" as const,
    thumb: "/placeholder.svg?height=120&width=180",
    lat: 39.654,
    lng: -105.015,
  },
  {
    type: "shop",
    address: "3652 El Rey Ave",
    cityZip: "Boulder, CO",
    sf: 2000,
    dealBand: "high" as const,
    thumb: "/placeholder.svg?height=120&width=180",
    lat: 40.026,
    lng: -105.267,
  },
]

export default function MapHero() {
  const router = useRouter()
  const [location, setLocation] = useState("")
  const [radius, setRadius] = useState(5)
  const [size, setSize] = useState(2500)
  const [isDetectingLocation, setIsDetectingLocation] = useState(false)
  const [locationError, setLocationError] = useState(false)
  const [availableSpaces, setAvailableSpaces] = useState(23)

  // Auto-detect location on component mount
  useEffect(() => {
    if (navigator.geolocation && typeof navigator.geolocation.getCurrentPosition === "function") {
      try {
        setIsDetectingLocation(true)
        const timeoutId = setTimeout(() => {
          setIsDetectingLocation(false)
        }, 3000)

        navigator.geolocation.getCurrentPosition(
          (position) => {
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
      console.log("Geolocation API not available")
      setIsDetectingLocation(false)
    }

    // Simulate real-time counter
    const interval = setInterval(() => {
      setAvailableSpaces((prev) => {
        const change = Math.floor(Math.random() * 3) - 1 // -1, 0, or 1
        return Math.max(20, Math.min(30, prev + change))
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!location) {
      setLocationError(true)
      return
    }

    // Navigate to questionnaire with initial data
    router.push(`/questionnaire?location=${encodeURIComponent(location)}&radius=${radius}&size=${size}`)
  }

  return (
    <section className="relative bg-white overflow-hidden">
      <div className="flex flex-col lg:flex-row h-screen">
        {/* Map Section (60%) */}
        <div className="w-full lg:w-3/5 relative bg-gray-200">
          {/* Map Background */}
          <div className="absolute inset-0 opacity-20">
            <img
              src="/placeholder.svg?height=800&width=1200"
              alt="Map background"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Map Pins */}
          {seedListings.map((listing, index) => {
            // Calculate positions for demo
            const left = 20 + ((index * 50) % 70)
            const top = 20 + ((index * 30) % 60)

            return (
              <div key={index} className="absolute z-10" style={{ left: `${left}%`, top: `${top}%` }}>
                <div
                  className={`
                    flex items-center justify-center w-8 h-12 -ml-4 -mt-12
                    ${
                      listing.dealBand === "great"
                        ? "text-[#00A550]"
                        : listing.dealBand === "good"
                          ? "text-[#00B3B0]"
                          : listing.dealBand === "fair"
                            ? "text-[#F6C651]"
                            : "text-[#F45B5B]"
                    }
                  `}
                >
                  <svg viewBox="0 0 32 46" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    <path
                      d="M16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0ZM16 8C20.4183 8 24 11.5817 24 16C24 20.4183 20.4183 24 16 24C11.5817 24 8 20.4183 8 16C8 11.5817 11.5817 8 16 8Z"
                      fill="currentColor"
                    />
                    <path d="M16 32L8 46H24L16 32Z" fill="currentColor" />
                    <circle cx="16" cy="16" r="12" fill="white" />
                    <text x="16" y="20" textAnchor="middle" fontSize="12" fontWeight="bold" fill="currentColor">
                      ${Math.round(listing.sf / 1000)}k
                    </text>
                  </svg>
                </div>
              </div>
            )
          })}

          {/* Starter Form Overlay */}
          <div className="absolute top-8 left-8 bg-white rounded-lg shadow-lg p-6 w-[420px] z-20">
            <form onSubmit={handleSubmit}>
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Space size</label>
                  <Slider
                    value={[size]}
                    min={300}
                    max={10000}
                    step={100}
                    onValueChange={(value) => setSize(value[0])}
                    className="py-4"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>300 sq ft</span>
                    <span>10,000 sq ft</span>
                  </div>
                  <div className="text-right mt-1">
                    <Button variant="link" size="sm" className="text-xs text-[#ED4337] p-0">
                      Need &gt;10,000 SF?
                    </Button>
                  </div>
                </div>

                <Button type="submit" className="w-full bg-[#ED4337] hover:bg-[#d13a30] text-white h-12">
                  Find My Space <ArrowRight className="ml-2 h-4 w-4" />
                </Button>

                <div className="text-center text-sm text-gray-500">
                  <span className="font-medium">{availableSpaces} spaces</span> currently available
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Listing Stack (40%) */}
        <div className="w-full lg:w-2/5 bg-white p-6 overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">Featured Spaces</h2>

          <div className="space-y-4">
            {seedListings.map((listing, index) => (
              <div
                key={index}
                className="flex border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-24 h-24 flex-shrink-0">
                  <img
                    src={listing.thumb || "/placeholder.svg"}
                    alt={listing.address}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3 flex-grow">
                  <h3 className="font-bold text-sm">{listing.address}</h3>
                  <p className="text-xs text-gray-600">{listing.cityZip}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span
                      className={`text-sm font-medium ${
                        listing.dealBand === "great"
                          ? "text-[#00A550]"
                          : listing.dealBand === "good"
                            ? "text-[#00B3B0]"
                            : listing.dealBand === "fair"
                              ? "text-[#F6C651]"
                              : "text-[#F45B5B]"
                      }`}
                    >
                      {listing.sf.toLocaleString()} sq ft
                    </span>
                    <DealScoreBadge score={listing.dealBand} className="text-xs" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
