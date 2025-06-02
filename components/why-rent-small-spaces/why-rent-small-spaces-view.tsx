"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Calendar,
  CheckCircle,
  XCircle,
  Zap,
  Store,
  PenToolIcon as Tool,
  Shield,
  MapPin,
  ArrowRight,
} from "lucide-react"

export default function WhyRentSmallSpacesView() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real implementation, this would send the form data to a server
    setFormSubmitted(true)
    // Close the modal after 3 seconds
    setTimeout(() => {
      setIsModalOpen(false)
      setFormSubmitted(false)
    }, 3000)
  }

  return (
    <div className="w-full">
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="w-full lg:w-1/2 mb-12 lg:mb-0">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
                Why Use Lease Small Space for your Commercial Space Needs
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Affordable, flexible, convenient warehouse, retail, industrial, shop, and flex spaces—perfect for
                startups, retailers, contractors, and first-time commercial tenants.
              </p>
              <Button
                onClick={() => setIsModalOpen(true)}
                size="lg"
                className="bg-white text-blue-700 hover:bg-blue-50 text-lg px-8 py-4 h-auto"
              >
                Speak to an Expert Now
              </Button>
            </div>
            <div className="w-full lg:w-1/2 lg:pl-12">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl h-80">
                <img
                  src="/images/warehouse-meeting.png"
                  alt="Business professionals meeting in warehouse - contractors, business owners, and property experts discussing commercial space solutions"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Traditional vs Rent Small Space Comparison */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12 text-center">
            The Problem with Traditional Commercial Leasing
          </h2>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Traditional Leasing Problems */}
            <div className="bg-red-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-red-800">Traditional Leasing Is Broken</h3>
              <p className="text-gray-700 mb-6">
                The conventional commercial real estate model wasn't designed for small businesses. It's filled with
                unnecessary complexity, hidden costs, and frustrating delays that hurt your bottom line and slow your
                growth.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <XCircle className="h-5 w-5 text-red-500" />
                  </div>
                  <p className="ml-3 text-gray-700">Long-term commitments (3-5+ years)</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <XCircle className="h-5 w-5 text-red-500" />
                  </div>
                  <p className="ml-3 text-gray-700">Expensive broker fees and commissions</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <XCircle className="h-5 w-5 text-red-500" />
                  </div>
                  <p className="ml-3 text-gray-700">Weeks or months of negotiations</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <XCircle className="h-5 w-5 text-red-500" />
                  </div>
                  <p className="ml-3 text-gray-700">Complicated legal processes and paperwork</p>
                </div>
              </div>
            </div>

            {/* Rent Small Space Solution */}
            <div className="bg-blue-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-blue-800">The Lease Small Space Difference</h3>
              <p className="text-gray-700 mb-6">
                We've reimagined commercial leasing for small businesses. Direct access to owners, simplified processes,
                and flexible terms that grow with your business.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="ml-3">
                    <h4 className="font-medium text-gray-900">Direct Owner Access</h4>
                    <p className="text-gray-600">
                      No middlemen or brokers—work directly with owners who understand your needs.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="ml-3">
                    <h4 className="font-medium text-gray-900">Simplified Process</h4>
                    <p className="text-gray-600">From inquiry to move-in within days, not months.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="ml-3">
                    <h4 className="font-medium text-gray-900">Growth-Friendly</h4>
                    <p className="text-gray-600">Easily upgrade to larger spaces as your business expands.</p>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <Button onClick={() => setIsModalOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white">
                  Find My Perfect Space <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Small Spaces Are Smart Choice */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 text-center">
            Why Small Spaces Are the Smart Choice
          </h2>

          <p className="text-lg text-gray-700 mb-12 max-w-4xl mx-auto text-center">
            Lease Small Spaces focuses on commercial space for rent in Denver, providing practical solutions for
            businesses seeking industrial space for rent, retail space for lease, convenient shop space, and versatile
            flex space. We eliminate traditional leasing hassles, offering immediate availability and flexible terms
            tailored to your growth.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all hover:translate-y-[-4px]">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Flexible Leasing Terms</h3>
              <p className="text-gray-600">Month-to-month or short-term leases.</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all hover:translate-y-[-4px]">
              <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Immediate Move-in Ready</h3>
              <p className="text-gray-600">Spaces ready now—no waiting, no hassle.</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all hover:translate-y-[-4px]">
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
                <Store className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Sized Just Right</h3>
              <p className="text-gray-600">
                Units from 500–10,000 sq ft, ideal for retail, contractors, warehouses, and flex use.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all hover:translate-y-[-4px]">
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
                <Tool className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Turnkey Convenience</h3>
              <p className="text-gray-600">Private loading docks, overhead doors, forklifts, pallet jacks included.</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all hover:translate-y-[-4px]">
              <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure & Reliable</h3>
              <p className="text-gray-600">24/7 security, fenced premises, video surveillance.</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all hover:translate-y-[-4px]">
              <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Local Expertise</h3>
              <p className="text-gray-600">Deep knowledge of Denver's commercial real estate landscape.</p>
            </div>
          </div>

          {/* Space Type Showcase with Icons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Warehouse Space</h4>
              <p className="text-sm text-gray-600">High ceilings, loading docks, industrial features</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
              <div className="bg-green-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Store className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Retail Space</h4>
              <p className="text-sm text-gray-600">Street-facing, customer access, display areas</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
              <div className="bg-orange-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 10h16M4 14h16M4 18h16"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 6V18a2 2 0 01-2 2H6a2 2 0 01-2-2V6"
                  />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Shop Space</h4>
              <p className="text-sm text-gray-600">Workshop areas, equipment storage, contractor-friendly</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
              <div className="bg-purple-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2z"
                  />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h2m-2 4h2m4-4h2m-2 4h2" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 16h6" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Flex Space</h4>
              <p className="text-sm text-gray-600">Adaptable layouts, office-warehouse combo</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tailored to Your Business Needs */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 text-center">
            Perfect Spaces for Startups, Contractors, Retailers, and E-commerce
          </h2>

          <p className="text-lg text-gray-700 mb-12 max-w-4xl mx-auto text-center">
            Whether you're launching a startup, operating a growing retail shop, or need versatile industrial property
            for lease Denver, we simplify commercial leasing. Find your perfect warehouse space for rent Denver,
            conveniently located small retail space, or adaptable flex space for lease in Denver CO without unnecessary
            complexity.
          </p>

          <div className="flex flex-col md:flex-row items-center bg-blue-50 rounded-2xl overflow-hidden shadow-lg">
            <div className="w-full md:w-1/2">
              <img
                src="/placeholder.svg?height=600&width=800"
                alt="Small business owner in retail space"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-full md:w-1/2 p-8 md:p-12">
              <h3 className="text-2xl font-bold mb-4">The Lease Small Space Difference</h3>

              <div className="space-y-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white">
                      <CheckCircle className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-900">Direct Owner Access</h4>
                    <p className="mt-2 text-gray-600">
                      No middlemen or brokers—work directly with owners who understand your needs.
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white">
                      <CheckCircle className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-900">Simplified Process</h4>
                    <p className="mt-2 text-gray-600">From inquiry to move-in within days, not months.</p>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white">
                      <CheckCircle className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-900">Growth-Friendly</h4>
                    <p className="mt-2 text-gray-600">Easily upgrade to larger spaces as your business expands.</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Button onClick={() => setIsModalOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white">
                  Find My Perfect Space <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof & Trust Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12 text-center">
            Trusted by Colorado Businesses
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="bg-blue-100 rounded-full p-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-lg text-gray-700 italic">
                    "Found our perfect warehouse space for rent Denver quickly—Lease Small Spaces made it easy."
                  </p>
                  <p className="mt-3 text-gray-600 font-medium">— Sarah K., E-commerce Business Owner</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="bg-blue-100 rounded-full p-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-lg text-gray-700 italic">
                    "Secured our retail space for lease in Denver CO without hassle—highly recommend!"
                  </p>
                  <p className="mt-3 text-gray-600 font-medium">— Jason P., Local Retailer</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            <div className="w-32 h-16 bg-white rounded-lg shadow-sm flex items-center justify-center p-2">
              <img
                src="/placeholder.svg?height=60&width=120"
                alt="Denver Metro Chamber"
                className="max-h-full max-w-full"
              />
            </div>
            <div className="w-32 h-16 bg-white rounded-lg shadow-sm flex items-center justify-center p-2">
              <img src="/placeholder.svg?height=60&width=120" alt="Colorado REIA" className="max-h-full max-w-full" />
            </div>
            <div className="w-32 h-16 bg-white rounded-lg shadow-sm flex items-center justify-center p-2">
              <img
                src="/placeholder.svg?height=60&width=120"
                alt="Better Business Bureau"
                className="max-h-full max-w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Local SEO Content Block */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 text-center">
            Commercial Leasing Experts in Denver, Colorado
          </h2>

          <p className="text-lg text-gray-700 mb-12 max-w-4xl mx-auto text-center">
            Specializing in convenient commercial space for rent Denver, we match businesses with ideal locations.
            Whether you seek restaurant space for lease near me, warehouse space for rent Denver, flex space, or prefer
            direct commercial property for lease by owner, our local expertise ensures your leasing experience is
            efficient and effective.
          </p>

          <div className="text-center">
            <Button
              onClick={() => setIsModalOpen(true)}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-4 h-auto"
            >
              Find the Perfect Space
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Get Your Questions Answered Fast!</DialogTitle>
            <DialogDescription>
              Tell us how to reach you, and an expert from our team will contact you shortly.
            </DialogDescription>
          </DialogHeader>

          {formSubmitted ? (
            <div className="py-6 text-center">
              <div className="bg-green-100 text-green-800 p-4 rounded-lg mb-4">
                <CheckCircle className="h-12 w-12 mx-auto mb-2 text-green-600" />
                <p className="font-medium text-lg">Thank you! A Lease Small Spaces expert will contact you shortly.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <Input id="name" placeholder="Your name" required />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <Input id="email" type="email" placeholder="you@example.com" required />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <Input id="phone" type="tel" placeholder="(303) 555-1234" required />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message (Optional)
                </label>
                <Textarea id="message" placeholder="Tell us about your space needs..." />
              </div>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                Submit
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
