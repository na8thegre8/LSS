"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import LeaseOrBuyStep from "./step-lease-or-buy"
import SpaceTypeStep from "./step-space-type"
import SizeStep from "./step-size"
import LocationStep from "./step-location"
import TimelineStep from "./step-timeline"
import ContactStep from "./step-contact"
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react"

export type QuestionnaireData = {
  leaseOrBuy: string
  spaceType: string
  size: number
  location: string
  timeline: string
  name: string
  email: string
  phone: string
  smsConsent: boolean
}

export default function QuestionnaireWizard() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [data, setData] = useState<QuestionnaireData>({
    leaseOrBuy: "",
    spaceType: "",
    size: 2000,
    location: "",
    timeline: "",
    name: "",
    email: "",
    phone: "",
    smsConsent: true,
  })
  const [showCheckmark, setShowCheckmark] = useState(false)

  // Load saved data from localStorage if available
  useEffect(() => {
    const savedData = localStorage.getItem("leaseSmallSpace_questionnaire")
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData)
        setData((prev) => ({ ...prev, ...parsedData }))
      } catch (e) {
        console.error("Error parsing saved data", e)
      }
    }
  }, [])

  // Save data to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("leaseSmallSpace_questionnaire", JSON.stringify(data))
  }, [data])

  const totalSteps = 6
  const progress = Math.round((step / totalSteps) * 100)

  const updateData = (key: keyof QuestionnaireData, value: any) => {
    setData((prev) => ({ ...prev, [key]: value }))
  }

  const handleNext = () => {
    // Show checkmark animation
    setShowCheckmark(true)

    setTimeout(() => {
      setShowCheckmark(false)

      if (step < totalSteps) {
        setStep(step + 1)
        window.scrollTo(0, 0)
      } else {
        // Submit and navigate to thank you page
        router.push("/thank-you")
      }
    }, 300)
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
      window.scrollTo(0, 0)
    }
  }

  // Check if current step has a valid selection
  const canProceed = () => {
    switch (step) {
      case 1: // Lease or Buy
        return !!data.leaseOrBuy
      case 2: // Space Type
        return !!data.spaceType
      case 3: // Size
        return data.size >= 500
      case 4: // Location
        return !!data.location
      case 5: // Timeline
        return !!data.timeline
      case 6: // Contact
        return !!data.email && !!data.phone
      default:
        return false
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden relative">
      {/* Header with logo and progress */}
      <div className="p-6 border-b bg-gradient-to-r from-blue-50 to-white">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold text-blue-600">LeaseSmallSpace.com</h1>
          <span className="text-sm text-gray-500">
            Step {step} of {totalSteps}
          </span>
        </div>
        <Progress value={progress} className="h-3" />
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>Getting Started</span>
          <span>{progress}% Complete</span>
          <span>Almost Done!</span>
        </div>
      </div>

      {/* Checkmark animation overlay */}
      {showCheckmark && (
        <div className="absolute inset-0 bg-white/90 flex items-center justify-center z-10">
          <div className="bg-green-100 rounded-full p-4">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
        </div>
      )}

      {/* Step content */}
      <div className="p-8">
        {step === 1 && <LeaseOrBuyStep value={data.leaseOrBuy} onChange={(value) => updateData("leaseOrBuy", value)} />}

        {step === 2 && <SpaceTypeStep value={data.spaceType} onChange={(value) => updateData("spaceType", value)} />}

        {step === 3 && <SizeStep value={data.size} onChange={(value) => updateData("size", value)} />}

        {step === 4 && <LocationStep value={data.location} onChange={(value) => updateData("location", value)} />}

        {step === 5 && <TimelineStep value={data.timeline} onChange={(value) => updateData("timeline", value)} />}

        {step === 6 && (
          <ContactStep
            name={data.name}
            email={data.email}
            phone={data.phone}
            smsConsent={data.smsConsent}
            onNameChange={(value) => updateData("name", value)}
            onEmailChange={(value) => updateData("email", value)}
            onPhoneChange={(value) => updateData("phone", value)}
            onSmsConsentChange={(value) => updateData("smsConsent", value)}
          />
        )}
      </div>

      {/* Bottom buttons */}
      <div className="p-6 border-t bg-gray-50 flex justify-between">
        <Button variant="outline" onClick={handleBack} disabled={step === 1} className="flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>

        <Button
          onClick={handleNext}
          className="bg-blue-600 hover:bg-blue-700 text-white h-12 px-8 flex items-center"
          disabled={!canProceed()}
        >
          {step === totalSteps ? "Get My Matches" : "Continue"}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
