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
import { createOrUpdateUser, createInquiry, saveQuestionnaireResponse } from "@/lib/database"
import { useAnalytics } from "@/hooks/use-analytics"
import { InactivityPopup } from "@/components/lead-capture/inactivity-popup"

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

export default function QuestionnaireWizardWithDatabase() {
  const router = useRouter()
  const { track } = useAnalytics()
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
  const [isSubmitting, setIsSubmitting] = useState(false)

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

  // Track step progression
  useEffect(() => {
    track("questionnaire_step_viewed", {
      step: step,
      step_name: getStepName(step),
    })
  }, [step, track])

  const totalSteps = 6
  const progress = Math.round((step / totalSteps) * 100)

  const getStepName = (stepNumber: number) => {
    const stepNames = ["lease_or_buy", "space_type", "size", "location", "timeline", "contact"]
    return stepNames[stepNumber - 1] || "unknown"
  }

  const updateData = (key: keyof QuestionnaireData, value: any) => {
    setData((prev) => ({ ...prev, [key]: value }))

    // Track field completion
    track("questionnaire_field_completed", {
      field: key,
      value: typeof value === "string" ? value : JSON.stringify(value),
      step: step,
    })
  }

  const handleNext = async () => {
    // Show checkmark animation
    setShowCheckmark(true)

    setTimeout(async () => {
      setShowCheckmark(false)

      if (step < totalSteps) {
        setStep(step + 1)
        window.scrollTo(0, 0)
      } else {
        // Final submission
        await handleSubmit()
      }
    }, 300)
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    try {
      console.log("Starting questionnaire submission with data:", data)

      // Track questionnaire completion
      track("questionnaire_completed", {
        lease_or_buy: data.leaseOrBuy,
        space_type: data.spaceType,
        size: data.size,
        location: data.location,
        timeline: data.timeline,
        sms_consent: data.smsConsent,
      })

      // Create or update user in database
      console.log("Creating/updating user...")
      const user = await createOrUpdateUser({
        email: data.email,
        full_name: data.name,
        phone: data.phone,
      })
      console.log("User created/updated:", user)

      // Create inquiry record
      console.log("Creating inquiry...")
      const inquiry = await createInquiry({
        user_id: user.id,
        full_name: data.name,
        email: data.email,
        phone: data.phone,
        inquiry_type: "questionnaire",
        status: "new",
        message: `Questionnaire: ${data.spaceType} space, ${data.size} sq ft in ${data.location}`,
      })
      console.log("Inquiry created:", inquiry)

      // Save detailed questionnaire response
      console.log("Saving questionnaire response...")
      const questionnaireResponse = await saveQuestionnaireResponse({
        user_id: user.id,
        inquiry_id: inquiry.id,
        responses: data,
        space_type: data.spaceType,
        location_preference: data.location,
        size_min: Math.max(500, data.size - 500),
        size_max: data.size + 1000,
        timeline: data.timeline,
        lease_or_buy: data.leaseOrBuy,
      })
      console.log("Questionnaire response saved:", questionnaireResponse)

      // Clear localStorage
      localStorage.removeItem("leaseSmallSpace_questionnaire")

      // Track successful submission
      track("lead_generated", {
        source: "questionnaire",
        user_id: user.id,
        inquiry_id: inquiry.id,
        conversion_type: "questionnaire_completion",
      })

      console.log("Questionnaire submission completed successfully!")

      // Navigate to results page with user data
      const searchParams = new URLSearchParams({
        spaceType: data.spaceType,
        size: data.size.toString(),
        location: data.location,
        timeline: data.timeline,
        userId: user.id,
      })

      router.push(`/results?${searchParams.toString()}`)
    } catch (error) {
      console.error("Error submitting questionnaire:", error)

      // Track submission error
      track("questionnaire_submission_error", {
        error: error instanceof Error ? error.message : "Unknown error",
      })

      // Show error to user
      alert("There was an error submitting your questionnaire. Please try again or contact support.")
    } finally {
      setIsSubmitting(false)
    }
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
        return !!data.email && !!data.phone && !!data.name
      default:
        return false
    }
  }

  return (
    <>
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
          {step === 1 && (
            <LeaseOrBuyStep value={data.leaseOrBuy} onChange={(value) => updateData("leaseOrBuy", value)} />
          )}

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
            disabled={!canProceed() || isSubmitting}
          >
            {isSubmitting ? "Finding Your Matches..." : step === totalSteps ? "Get My Matches" : "Continue"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Inactivity popup - only shows in questionnaire when stuck on a question */}
      <InactivityPopup
        inactivityDelay={30000} // 30 seconds
        exitIntentEnabled={true}
      />
    </>
  )
}
