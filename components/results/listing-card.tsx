"use client"

import { Button } from "@/components/ui/button"
import { Building2, MapPin, DollarSign, Ruler, Calendar, Phone, ExternalLink } from "lucide-react"
import type { Listing, DealScore } from "@/lib/types"
import { DealScoreBadge } from "@/components/ui/deal-score-badge"

// Helper function to get deal score badge color
const getDealScoreBadge = (score: DealScore) => {
  return <DealScoreBadge score={score} />
}

export default function ListingCard({
  listing,
  isSelected,
  onSelect,
}: {
  listing: Listing
  isSelected: boolean
  onSelect: () => void
}) {
  return (
    <div
      className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
        isSelected ? "bg-blue-50 border-l-4 border-[#ED4337]" : ""
      }`}
      onClick={onSelect}
      data-listing-card
    >
      <div className="flex flex-col md:flex-row gap-4">
        {/* Image */}
        <div className="relative md:w-1/3">
          <img
            src={listing.imageUrl || "/placeholder.svg"}
            alt={listing.title}
            className="w-full h-48 md:h-32 object-cover rounded-lg"
          />
          <div className="absolute top-2 left-2">{getDealScoreBadge(listing.dealScore)}</div>
        </div>

        {/* Content */}
        <div className="md:w-2/3">
          <h3 className="font-bold text-lg">{listing.title}</h3>

          <div className="flex items-center text-gray-600 text-sm mt-1">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{listing.location}</span>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-3">
            <div className="flex items-center text-gray-700">
              <DollarSign className="h-4 w-4 mr-1 text-gray-500" />
              <span>${listing.price.toLocaleString()}/mo</span>
            </div>
            <div className="flex items-center text-gray-700">
              <Ruler className="h-4 w-4 mr-1 text-gray-500" />
              <span>{listing.size.toLocaleString()} sq ft</span>
            </div>
            <div className="flex items-center text-gray-700">
              <Building2 className="h-4 w-4 mr-1 text-gray-500" />
              <span>{listing.type}</span>
            </div>
            <div className="flex items-center text-gray-700">
              <Calendar className="h-4 w-4 mr-1 text-gray-500" />
              <span>{listing.availability}</span>
            </div>
          </div>

          <div className="flex gap-2 mt-4">
            <Button size="sm" className="bg-[#ED4337] hover:bg-[#d13a30] text-white">
              <Phone className="mr-2 h-4 w-4" />
              Request Info
            </Button>
            <Button size="sm" variant="outline">
              <ExternalLink className="mr-2 h-4 w-4" />
              View Details
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
