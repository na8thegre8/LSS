"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { CheckCircle, Clock, Mail, Phone, ArrowRight, Star } from "lucide-react"
import Link from "next/link"

export default function ThankYouView() {
  const [formData, setFormData] = useState<any>(null)

  useEffect(() => {
    // Get the form data from localStorage
    const savedData = localStorage.getItem("rentSmallSpace_questionnaire")
    if (savedData) {
      try {
        setFormData(JSON.parse(savedData))
      } catch (e) {
        console.error("Error parsing saved data", e)
      }
    }
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto text-center">
        {/* Success icon */}
        <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-8">
          <CheckCircle className="h-12 w-12 text-green-600" />
        </div>

        {/* Main message */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Thank You{formData?.name ? `, ${formData.name.split(" ")[0]}` : ""}!
        </h1>

        <p className="text-xl text-gray-600 mb-8">
          We're already working on finding your perfect {formData?.spaceType || "commercial"} space in Colorado.
        </p>

        {/* What happens next */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">What happens next:</h2>

          <div className="space-y-6">
            <div className="flex items-start text-left">
              <div className="bg-blue-100 rounded-full p-2 mr-4 mt-1">
                <Clock className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Within 24 Hours</h3>
                <p className="text-gray-600">
                  Our team will call you to discuss your specific needs and answer any questions.
                </p>
              </div>
            </div>

            <div className="flex items-start text-left">
              <div className="bg-blue-100 rounded-full p-2 mr-4 mt-1">
                <Mail className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Custom Property List</h3>
                <p className="text-gray-600">
                  Receive a personalized list of {formData?.size ? `${formData.size.toLocaleString()} sq ft` : ""}{" "}
                  properties that match your criteria.
                </p>
              </div>
            </div>

            <div className="flex items-start text-left">
              <div className="bg-blue-100 rounded-full p-2 mr-4 mt-1">
                <Star className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Schedule Tours</h3>
                <p className="text-gray-600">
                  We'll coordinate property tours at your convenience and help with the entire process.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact info */}
        <div className="bg-blue-50 rounded-lg p-6 mb-8">
          <h3 className="font-bold text-lg mb-4">Need to reach us immediately?</h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+13035551234"
              className="flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Phone className="h-5 w-5 mr-2" />
              (303) 555-1234
            </a>
            <a
              href="mailto:hello@rentsmallspace.com"
              className="flex items-center justify-center bg-white text-blue-600 border border-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors"
            >
              <Mail className="h-5 w-5 mr-2" />
              hello@rentsmallspace.com
            </a>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link href="/">
            <Button variant="outline" className="mr-4">
              Back to Home
            </Button>
          </Link>
          <Button className="bg-blue-600 hover:bg-blue-700">
            View Our Properties <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {/* Social proof */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500 mb-4">Join hundreds of satisfied Colorado businesses</p>
          <div className="flex justify-center items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
            ))}
            <span className="ml-2 text-sm text-gray-600">4.9/5 from 200+ reviews</span>
          </div>
        </div>
      </div>
    </div>
  )
}
