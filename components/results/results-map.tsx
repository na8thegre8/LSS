"use client"

import { useRef } from "react"
import type { Listing } from "@/lib/types"

// Mock Google Maps implementation for preview
export default function ResultsMap({
  listings,
  selectedId,
  onSelectListing,
}: {
  listings: Listing[]
  selectedId: string | null
  onSelectListing: (id: string) => void
}) {
  const mapRef = useRef<HTMLDivElement>(null)

  // In a real implementation, this would use the Google Maps API
  // For this preview, we'll create a simple visual representation

  return (
    <div className="w-full h-full bg-gray-200 relative" ref={mapRef}>
      {/* Map placeholder */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-gray-400 text-center">
          <p className="text-lg font-semibold mb-2">Interactive Map</p>
          <p>In the actual implementation, this would be a Google Maps component</p>
          <p>showing all {listings.length} property locations</p>
        </div>
      </div>

      {/* Map pins */}
      {listings.map((listing, index) => {
        // Calculate pseudo-random positions for the pins
        const left = 20 + ((index * 50) % 70)
        const top = 20 + ((index * 30) % 60)

        return (
          <div
            key={listing.id}
            className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 z-10 ${
              selectedId === listing.id ? "z-20" : ""
            }`}
            style={{ left: `${left}%`, top: `${top}%` }}
            onClick={() => onSelectListing(listing.id)}
          >
            <div
              className={`
              flex items-center justify-center w-10 h-10 rounded-full 
              ${
                selectedId === listing.id
                  ? "bg-[#ED4337] text-white shadow-lg scale-125"
                  : listing.dealScore === "great"
                    ? "bg-[#00A550] text-white"
                    : listing.dealScore === "good"
                      ? "bg-[#00B3B0] text-white"
                      : listing.dealScore === "fair"
                        ? "bg-[#F6C651] text-gray-900"
                        : listing.dealScore === "high"
                          ? "bg-[#F45B5B] text-white"
                          : "bg-[#B0132B] text-white"
              }
              transition-all duration-200
            `}
            >
              <span className="font-bold">${Math.round(listing.price / 1000)}k</span>
            </div>

            {/* Preview popup for selected pin */}
            {selectedId === listing.id && (
              <div className="absolute top-12 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg p-3 w-64 z-30">
                <img
                  src={listing.imageUrl || "/placeholder.svg"}
                  alt={listing.title}
                  className="w-full h-32 object-cover rounded-lg mb-2"
                />
                <h3 className="font-bold text-sm">{listing.title}</h3>
                <p className="text-sm text-gray-600">
                  {listing.size.toLocaleString()} sq ft • ${listing.price.toLocaleString()}/mo
                </p>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
