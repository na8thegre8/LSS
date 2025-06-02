"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Phone, Mail, User, MessageSquare, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface InactivityPopupProps {
  inactivityDelay?: number // milliseconds
  exitIntentEnabled?: boolean
}

export function InactivityPopup({
  inactivityDelay = 30000, // 30 seconds for testing
  exitIntentEnabled = true,
}: InactivityPopupProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [hasShown, setHasShown] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  })
  const { toast } = useToast()

  // Check if popup has been shown in this session
  useEffect(() => {
    const popupShown = sessionStorage.getItem("leadCaptureShown")
    if (popupShown) {
      setHasShown(true)
    }
  }, [])

  // Inactivity timer
  useEffect(() => {
    if (hasShown) return

    let inactivityTimer: NodeJS.Timeout

    const resetTimer = () => {
      clearTimeout(inactivityTimer)
      inactivityTimer = setTimeout(() => {
        if (!hasShown) {
          setIsOpen(true)
          setHasShown(true)
          sessionStorage.setItem("leadCaptureShown", "true")
        }
      }, inactivityDelay)
    }

    const events = ["mousedown", "mousemove", "keypress", "scroll", "touchstart"]

    // Set initial timer
    resetTimer()

    // Add event listeners
    events.forEach((event) => {
      document.addEventListener(event, resetTimer, true)
    })

    return () => {
      clearTimeout(inactivityTimer)
      events.forEach((event) => {
        document.removeEventListener(event, resetTimer, true)
      })
    }
  }, [inactivityDelay, hasShown])

  // Exit intent detection
  useEffect(() => {
    if (!exitIntentEnabled || hasShown) return

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShown) {
        setIsOpen(true)
        setHasShown(true)
        sessionStorage.setItem("leadCaptureShown", "true")
      }
    }

    document.addEventListener("mouseleave", handleMouseLeave)
    return () => document.removeEventListener("mouseleave", handleMouseLeave)
  }, [exitIntentEnabled, hasShown])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/lead-capture", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          source: "inactivity_popup",
          timestamp: new Date().toISOString(),
          page: window.location.pathname,
        }),
      })

      if (response.ok) {
        toast({
          title: "Thank you!",
          description: "Our expert will contact you within 24 hours.",
        })
        setIsOpen(false)

        // Track conversion
        if (typeof window !== "undefined" && window.gtag) {
          window.gtag("event", "lead_capture", {
            event_category: "engagement",
            event_label: "inactivity_popup",
            value: 1,
          })
        }
      } else {
        throw new Error("Failed to submit")
      }
    } catch (error) {
      toast({
        title: "Oops!",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleClose = () => {
    setIsOpen(false)
    setHasShown(true)
    sessionStorage.setItem("leadCaptureShown", "true")
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-lg bg-white border border-gray-200 shadow-2xl" hideCloseButton>
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>

        <DialogHeader className="text-center space-y-4 pt-2">
          <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
            <MessageSquare className="w-10 h-10 text-green-600" />
          </div>
          <div className="space-y-2">
            <DialogTitle className="text-3xl font-bold text-gray-900">Speak to an Expert</DialogTitle>
            <p className="text-gray-600 text-base leading-relaxed max-w-md mx-auto">
              Get personalized help finding your perfect commercial space. Our experts are standing by to assist you.
            </p>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-8">
          <div className="space-y-2">
            <Label htmlFor="popup-name" className="text-sm font-semibold text-gray-900">
              Full Name
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                id="popup-name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="pl-12 h-12 border-gray-300 focus:border-green-500 focus:ring-green-500 text-base"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="popup-email" className="text-sm font-semibold text-gray-900">
              Email Address
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                id="popup-email"
                type="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="pl-12 h-12 border-gray-300 focus:border-green-500 focus:ring-green-500 text-base"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="popup-phone" className="text-sm font-semibold text-gray-900">
              Phone Number
            </Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                id="popup-phone"
                type="tel"
                placeholder="(555) 123-4567"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className="pl-12 h-12 border-gray-300 focus:border-green-500 focus:ring-green-500 text-base"
                required
              />
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
              <div className="text-sm text-gray-700">
                <p className="font-semibold text-gray-900 mb-2">Our experts will help you with:</p>
                <ul className="space-y-1">
                  <li>• Finding spaces that match your exact requirements</li>
                  <li>• Understanding lease terms and market pricing</li>
                  <li>• Scheduling property tours at your convenience</li>
                  <li>• Negotiating the best possible deals</li>
                </ul>
              </div>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-semibold text-base rounded-lg transition-colors"
          >
            {isSubmitting ? "Connecting you with an expert..." : "Speak to an Expert"}
          </Button>
        </form>

        <p className="text-xs text-gray-500 text-center mt-6 leading-relaxed">
          We respect your privacy. Your information is secure and will never be shared with third parties.
        </p>
      </DialogContent>
    </Dialog>
  )
}
