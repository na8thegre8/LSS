"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowRight, Phone } from "lucide-react"

const faqData = [
  {
    question: "Where can I find available commercial spaces to rent?",
    answer:
      "Find available warehouse, retail, shop, and flex spaces quickly by clicking our 'See Availability' button. We update listings regularly for prime Colorado cities such as Denver, Westminster, Littleton, Golden, Boulder, Northglenn, Lakewood, Aurora, and Ken Caryl.",
  },
  {
    question: "Why do I need to fill out a questionnaire before seeing available units?",
    answer:
      "Our brief questionnaire helps match you precisely with spaces tailored to your exact needs—such as location, size, budget, and required features—saving you valuable time by presenting only the best-fit spaces.",
  },
  {
    question: "What should I consider when renting my first commercial space?",
    answer:
      "When renting your first commercial space, important considerations include your monthly budget, lease flexibility, space size, essential amenities (loading docks, parking, high electrical power), and ideal location for business operations. Our experts streamline this process, helping you select the perfect small commercial space.",
  },
  {
    question: "Are the listed commercial spaces move-in ready?",
    answer:
      "Yes! All listed warehouse, retail, flex, and shop spaces are move-in ready, allowing you to occupy quickly and begin operating without unnecessary delays.",
  },
  {
    question: "What does 'flexible lease terms' mean?",
    answer:
      "Flexible lease terms mean you aren't stuck in rigid, long-term contracts. Choose from month-to-month, quarterly, or annual leases designed to adapt to your evolving business needs.",
  },
  {
    question: "What size commercial spaces do you offer?",
    answer:
      "We specialize in small, affordable commercial spaces between 500 and 10,000 sq ft, ideal for startups, retailers, contractors, e-commerce businesses, and small warehouses across Colorado.",
  },
  {
    question: "Do you provide transparent pricing without hidden fees?",
    answer:
      "Our simplified Triple Net (NNN) lease includes quarterly reconciliations, ensuring transparent billing, predictable budgeting, and no unexpected annual or hidden fees.",
  },
  {
    question: "Which Colorado cities do you serve?",
    answer:
      "Our commercial spaces are available throughout key Colorado cities, including Denver, Westminster, Littleton, Golden, Boulder, Northglenn, Lakewood, Aurora, and Ken Caryl.",
  },
  {
    question: "Can I tour a commercial space before leasing?",
    answer:
      "Yes! After completing the simple questionnaire, an expert from our team will arrange a convenient, personalized tour of your selected commercial spaces.",
  },
  {
    question: "How quickly can I move into my commercial space?",
    answer:
      "Our spaces are designed for immediate occupancy, typically allowing businesses to move in within just days of signing a lease.",
  },
]

export default function FAQView() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Form submitted:", formData)
    setIsSubmitted(true)
    setTimeout(() => {
      setIsOpen(false)
      setIsSubmitted(false)
      setFormData({ fullName: "", email: "", phone: "" })
    }, 2000)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions About Renting Small Spaces
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Find quick answers to common questions about renting small commercial warehouse, retail, flex, and shop
            spaces across Colorado cities including Denver, Westminster, Littleton, Golden, Boulder, Northglenn,
            Lakewood, Aurora, and Ken Caryl. Can't find your answer? Speak directly with one of our space experts today.
          </p>

          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-4">
                Speak to an Expert Now <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-center">Get Your Questions Answered Fast!</DialogTitle>
                <p className="text-gray-600 text-center">
                  Leave your details, and our space expert will contact you shortly.
                </p>
              </DialogHeader>

              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                    Submit
                  </Button>
                </form>
              ) : (
                <div className="text-center py-8">
                  <div className="text-green-600 text-lg font-semibold mb-2">Thank you!</div>
                  <p className="text-gray-600">A Lease Small Spaces expert will reach out shortly.</p>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqData.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-gray-200 rounded-lg px-6 py-2 bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 hover:text-blue-600 py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 leading-relaxed pb-6">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Still Have Questions?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Our Colorado commercial space experts are here to help you find the perfect small space for your business.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4">
                  Speak to an Expert Now <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </DialogTrigger>
            </Dialog>

            <a href="tel:+13035551234">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-4"
              >
                <Phone className="mr-2 h-5 w-5" />
                Call (303) 555-1234
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
