"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { CheckCircle, Clock, Mail, Phone, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function ThankYouView() {
  const [formData, setFormData] = useState<any>(null)

  useEffect(() => {
    // Get the form data from localStorage
    const savedData = localStorage.getItem("leaseSmallSpace_questionnaire")
    if (savedData) {
      try {
        setFormData(JSON.parse(savedData))
      } catch (e) {
        console.error("Error parsing saved data", e)
      }
    }
  }, [])

  const handleEmailClick = () => {
    const subject = encodeURIComponent("LeaseSmallSpace.com - Questionnaire Follow-up")
    const body = encodeURIComponent(`Hi there,

I just completed the questionnaire on LeaseSmallSpace.com and wanted to follow up about finding a commercial space.

My details:
- Name: ${formData?.name || "Not provided"}
- Space Type: ${formData?.spaceType || "Not provided"}
- Size: ${formData?.size ? `${formData.size.toLocaleString()} sq ft` : "Not provided"}
- Location: ${formData?.location || "Not provided"}
- Timeline: ${formData?.timeline || "Not provided"}

Please let me know the next steps.

Thank you!`)

    window.location.href = `mailto:hello@leasesmallspace.com?subject=${subject}&body=${body}`
  }

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
          We've received your questionnaire and we're already working on finding your perfect{" "}
          {formData?.spaceType || "commercial"} space.
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
                  You'll receive a personalized list of properties that match your criteria.
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
              Call (303) 555-1234
            </a>
            <button
              onClick={handleEmailClick}
              className="flex items-center justify-center bg-white text-blue-600 border border-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors"
            >
              <Mail className="h-5 w-5 mr-2" />
              Send Email
            </button>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link href="/">
            <Button className="bg-blue-600 hover:bg-blue-700">
              Back to Home <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
