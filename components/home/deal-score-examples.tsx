"use client"

import { DealScoreBadge } from "@/components/ui/deal-score-badge"

const propertyExamples = [
  {
    title: "Modern Warehouse",
    location: "Denver, CO",
    size: 2200,
    price: 2750,
    imageUrl: "/placeholder.svg?height=300&width=400",
    dealScore: "great" as const,
  },
  {
    title: "Flex Industrial Space",
    location: "Aurora, CO",
    size: 3000,
    price: 3800,
    imageUrl: "/placeholder.svg?height=300&width=400",
    dealScore: "good" as const,
  },
  {
    title: "Small Shop Space",
    location: "Lakewood, CO",
    size: 1200,
    price: 1850,
    imageUrl: "/placeholder.svg?height=300&width=400",
    dealScore: "fair" as const,
  },
  {
    title: "Mixed-Use Commercial",
    location: "Denver, CO",
    size: 3500,
    price: 4500,
    imageUrl: "/placeholder.svg?height=300&width=400",
    dealScore: "over-market" as const,
  },
]

export default function DealScoreExamples() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Deal Score System</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We analyze market data to rate every property so you know if you're getting a good deal
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {propertyExamples.map((property, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="relative">
                <img
                  src={property.imageUrl || "/placeholder.svg"}
                  alt={property.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-3 left-3">
                  <DealScoreBadge score={property.dealScore} />
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg">{property.title}</h3>
                <p className="text-gray-600 text-sm">{property.location}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-gray-700">{property.size.toLocaleString()} sq ft</span>
                  <span className="font-medium">${property.price.toLocaleString()}/mo</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-700 mb-4">
            Our proprietary algorithm compares each listing to similar spaces in the same area to determine if you're
            getting a good deal.
          </p>
        </div>
      </div>
    </section>
  )
}
