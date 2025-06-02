"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Lock, CheckCircle, AlertCircle } from "lucide-react"

export default function LeadCaptureModal() {
  const [open, setOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [viewCount, setViewCount] = useState(0)
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [smsConsent, setSmsConsent] = useState(true)

  // Show the modal after viewing a few listings or scrolling
  useEffect(() => {
    // Try to get saved contact info from questionnaire
    const savedData = localStorage.getItem("spaceSelector_questionnaire")
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData)
        if (parsedData.email) setEmail(parsedData.email)
        if (parsedData.phone) setPhone(parsedData.phone)
      } catch (e) {
        console.error("Error parsing saved data", e)
      }
    }

    // Track scroll position
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const pageHeight = document.body.scrollHeight - window.innerHeight

      // If user has scrolled more than 30% of the page
      if (scrollPosition > pageHeight * 0.3) {
        setViewCount((prev) => prev + 1)
        if (viewCount >= 2 && !submitted) {
          setOpen(true)
          // Remove scroll listener after showing modal
          window.removeEventListener("scroll", handleScroll)
        }
      }
    }

    // Track listing card clicks
    const trackListingClicks = () => {
      const listingCards = document.querySelectorAll("[data-listing-card]")
      listingCards.forEach((card) => {
        card.addEventListener("click", () => {
          setViewCount((prev) => prev + 1)
          if (viewCount >= 2 && !submitted) {
            setOpen(true)
          }
        })
      })
    }

    // Set up listeners
    window.addEventListener("scroll", handleScroll)
    // Wait for DOM to be ready
    setTimeout(trackListingClicks, 1000)

    // Show modal after a delay as fallback
    const timer = setTimeout(() => {
      if (!submitted) {
        setOpen(true)
      }
    }, 30000) // 30 seconds

    return () => {
      window.removeEventListener("scroll", handleScroll)
      clearTimeout(timer)
    }
  }, [viewCount, submitted])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real implementation, this would submit the lead data
    setSubmitted(true)

    // Save to localStorage
    const savedData = localStorage.getItem("spaceSelector_questionnaire")
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData)
        parsedData.email = email
        parsedData.phone = phone
        localStorage.setItem("spaceSelector_questionnaire", JSON.stringify(parsedData))
      } catch (e) {
        console.error("Error updating saved data", e)
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        {!submitted ? (
          <>
            <DialogHeader>
              <DialogTitle>Unlock 5 Off-Market Deals</DialogTitle>
              <DialogDescription>Get exclusive access to spaces not listed on public marketplaces</DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 py-4">
              <div className="flex items-center gap-2 text-amber-600 bg-amber-50 p-3 rounded-md mb-4">
                <AlertCircle className="h-5 w-5" />
                <p className="text-sm">3 people are looking at similar spaces in this area right now.</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@company.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="focus:ring-2 focus:ring-[#ED4337]"
                />
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="sms"
                  checked={smsConsent}
                  onCheckedChange={(checked) => setSmsConsent(checked as boolean)}
                />
                <Label htmlFor="sms" className="text-sm text-gray-600 leading-tight">
                  I agree to receive text messages about my search. Standard message rates may apply.
                </Label>
              </div>

              <div className="flex items-center text-xs text-gray-500 mt-4">
                <Lock className="h-3 w-3 mr-1" />
                <span>Your info is never sold to brokers</span>
              </div>

              <DialogFooter className="mt-6">
                <Button type="submit" className="w-full bg-[#ED4337] hover:bg-[#d13a30] text-white">
                  Get Off-Market Deals
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
              We've sent 5 exclusive off-market deals to your email. A space specialist will reach out shortly to help
              with your search.
            </DialogDescription>
            <Button onClick={() => setOpen(false)} className="mt-6 bg-[#ED4337] hover:bg-[#d13a30] text-white">
              Continue Browsing
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
