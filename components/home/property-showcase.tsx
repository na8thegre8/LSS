"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MapPin, Square, DollarSign, ArrowRight, Lock, CheckCircle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"

const featuredProperties = [
  {
    id: 1,
    title: "Retail Storefront",
    location: "Centennial, CO",
    size: 2200,
    price: 3900,
    type: "Retail",
    availability: "Available Now",
    image: "/images/retail-centennial.jpg",
    features: ["Street visibility", "Foot traffic", "Parking"],
  },
  {
    id: 2,
    title: "Industrial Unit",
    location: "Brighton, CO",
    size: 1800,
    price: 2200,
    type: "Industrial",
    availability: "Available Now",
    image: "/images/brighton-flex-space.jpg",
    features: ["Front office", "Warehouse back", "Parking"],
  },
  {
    id: 3,
    title: "Flex Space",
    location: "Broomfield, CO",
    size: 5500,
    price: 6500,
    type: "Flex Space",
    availability: "August 1st",
    image: "/images/broomfield-flex-space.jpg",
    features: ["Ample Parking", "Drive-In (2x)", "Heavy Power"],
  },
]

export default function PropertyShowcase() {
  const [modalOpen, setModalOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [selectedProperty, setSelectedProperty] = useState<string>("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  })

  const handleGetInfo = (propertyTitle: string, propertyLocation: string) => {
    setSelectedProperty(`${propertyTitle} - ${propertyLocation}`)
    setModalOpen(true)
    setSubmitted(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real implementation, this would submit the lead data
    setSubmitted(true)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <>
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Available Properties</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Move-in ready spaces across Colorado. These won't last long.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((property) => (
              <div
                key={property.id}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="relative">
                  <img
                    src={property.image || "/placeholder.svg"}
                    alt={property.title}
                    className="w-full h-48 object-cover"
                    style={{
                      imageRendering: "crisp-edges",
                      backfaceVisibility: "hidden",
                      transform: "translateZ(0)",
                    }}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-green-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                      {property.availability}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-blue-600 text-white text-sm font-bold px-3 py-1 rounded-full">
                      {property.type}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-bold text-xl mb-2">{property.title}</h3>

                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{property.location}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center">
                      <Square className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-sm">{property.size.toLocaleString()} sq ft</span>
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-sm font-bold">${property.price.toLocaleString()}/mo</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {property.features.map((feature, index) => (
                        <span key={index} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Button
                    onClick={() => handleGetInfo(property.title, property.location)}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    Get More Info
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" variant="outline" className="mr-4">
              View All Properties
            </Button>
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Find My Perfect Space <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Lead Capture Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-md">
          {!submitted ? (
            <>
              <DialogHeader>
                <DialogTitle>Get More Information</DialogTitle>
                <DialogDescription>
                  Interested in {selectedProperty}? Get detailed information, photos, and availability.
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Your full name"
                    required
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="focus:ring-2 focus:ring-[#ED4337]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@company.com"
                    required
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="focus:ring-2 focus:ring-[#ED4337]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="(303) 555-1234"
                    required
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="focus:ring-2 focus:ring-[#ED4337]"
                  />
                </div>

                <div className="flex items-center text-xs text-gray-500 mt-4">
                  <Lock className="h-3 w-3 mr-1" />
                  <span>Your info is never sold to brokers</span>
                </div>

                <DialogFooter className="mt-6">
                  <Button type="submit" className="w-full bg-[#ED4337] hover:bg-[#d13a30] text-white">
                    Send Me Information
                  </Button>
                </DialogFooter>
              </form>
            </>
          ) : (
            <div className="py-8 text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <DialogTitle className="mb-2">Thank You!</DialogTitle>
              <DialogDescription>
                We've sent detailed information about {selectedProperty} to your email. A space specialist will reach
                out shortly.
              </DialogDescription>
              <Button onClick={() => setModalOpen(false)} className="mt-6 bg-[#ED4337] hover:bg-[#d13a30] text-white">
                Continue Browsing
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
