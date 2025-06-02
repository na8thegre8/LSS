"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { AlertCircle, Clock } from "lucide-react"

export function ExitIntentModal() {
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")

  useEffect(() => {
    // Track mouse movement to detect exit intent
    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger if mouse leaves from the top of the page
      if (e.clientY <= 0) {
        // Check if we have partial form data in localStorage
        const savedData = localStorage.getItem("rentSmallSpace_questionnaire")
        if (savedData) {
          try {
            const parsedData = JSON.parse(savedData)
            // Only show if they've started the form but not completed it
            if (parsedData && !parsedData.email) {
              setOpen(true)
            }
          } catch (e) {
            console.error("Error parsing saved data", e)
          }
        }
      }
    }

    // Add event listener
    document.addEventListener("mouseleave", handleMouseLeave)

    // Also set a timer to show the modal after 30 seconds of inactivity
    const inactivityTimer = setTimeout(() => {
      const savedData = localStorage.getItem("rentSmallSpace_questionnaire")
      if (savedData) {
        try {
          const parsedData = JSON.parse(savedData)
          if (parsedData && !parsedData.email) {
            setOpen(true)
          }
        } catch (e) {
          console.error("Error parsing saved data", e)
        }
      }
    }, 30000) // 30 seconds

    // Cleanup
    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave)
      clearTimeout(inactivityTimer)
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Save email to localStorage
    const savedData = localStorage.getItem("rentSmallSpace_questionnaire")
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData)
        parsedData.email = email
        parsedData.phone = phone
        localStorage.setItem("rentSmallSpace_questionnaire", JSON.stringify(parsedData))
      } catch (e) {
        console.error("Error updating saved data", e)
      }
    }
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Don't miss out on your perfect space!</DialogTitle>
          <DialogDescription>
            We'll save your progress and send you available properties that match your needs.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="flex items-center gap-2 text-amber-600 bg-amber-50 p-3 rounded-md">
            <AlertCircle className="h-5 w-5 flex-shrink-0" />
            <p className="text-sm">Small spaces in Colorado are being leased quickly.</p>
          </div>

          <div className="bg-blue-50 p-4 rounded-md mb-4">
            <div className="flex items-center text-blue-800 mb-2">
              <Clock className="h-5 w-5 mr-2 text-blue-600" />
              <span className="font-medium">We'll call you within 24 hours</span>
            </div>
            <p className="text-sm text-blue-700 pl-7">Our Colorado specialists will help you find the perfect space</p>
          </div>

          <div className="space-y-3">
            <Input
              id="exit-email"
              type="email"
              placeholder="Your email address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              id="exit-phone"
              type="tel"
              placeholder="Your phone number"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <DialogFooter className="mt-6">
            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white">
              Send Me Available Properties
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
