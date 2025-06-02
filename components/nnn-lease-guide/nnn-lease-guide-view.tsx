"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  DollarSign,
  Shield,
  Building,
  AlertTriangle,
  FileText,
  Calculator,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  ArrowRight,
} from "lucide-react"

export default function NNNLeaseGuideView() {
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
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">Understanding Triple Net (NNN) Leases</h1>
              <p className="text-xl mb-8 text-blue-100">Everything you need to know about NNN leases, simplified.</p>
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
                  src="/images/nnn-lease-expert.jpg"
                  alt="Commercial real estate expert ready to help with NNN lease questions"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NNN Leases Explained Simply */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 text-center">
            What is a Triple Net (NNN) Lease?
          </h2>

          <p className="text-lg text-gray-700 mb-12 max-w-4xl mx-auto text-center">
            A Triple Net (NNN) lease is a commercial lease where the tenant pays for three additional expenses on top of
            their base rent: property taxes, insurance, and common area maintenance (CAM).
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-blue-50 rounded-xl p-6 text-center">
              <div className="bg-blue-600 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <DollarSign className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Property Taxes</h3>
              <p className="text-gray-600">
                Your share of the property taxes based on the percentage of space you occupy in the building.
              </p>
            </div>

            <div className="bg-green-50 rounded-xl p-6 text-center">
              <div className="bg-green-600 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Insurance</h3>
              <p className="text-gray-600">
                Building insurance costs to protect the property structure and common areas.
              </p>
            </div>

            <div className="bg-purple-50 rounded-xl p-6 text-center">
              <div className="bg-purple-600 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Building className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">CAM (Common Area Maintenance)</h3>
              <p className="text-gray-600">
                Maintenance of shared spaces like parking lots, landscaping, and building common areas.
              </p>
            </div>
          </div>

          <div className="mt-12 bg-gray-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-4 text-center">Simple Formula</h3>
            <div className="text-center text-lg">
              <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg font-medium">Base Rent</span>
              <span className="mx-4 text-gray-500">+</span>
              <span className="bg-green-100 text-green-800 px-4 py-2 rounded-lg font-medium">Property Taxes</span>
              <span className="mx-4 text-gray-500">+</span>
              <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-lg font-medium">Insurance</span>
              <span className="mx-4 text-gray-500">+</span>
              <span className="bg-orange-100 text-orange-800 px-4 py-2 rounded-lg font-medium">CAM</span>
              <span className="mx-4 text-gray-500">=</span>
              <span className="bg-gray-800 text-white px-4 py-2 rounded-lg font-bold">Total Monthly Payment</span>
            </div>
          </div>
        </div>
      </section>

      {/* Problems with Traditional NNN Leases */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-red-50 to-orange-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12 text-center">
            Problems with Traditional NNN Leases
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="bg-red-100 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Hidden Fees</h3>
              <p className="text-gray-600">Unexpected charges that appear in reconciliation statements.</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="bg-red-100 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Complicated Billing</h3>
              <p className="text-gray-600">Complex statements that are difficult to understand and verify.</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="bg-red-100 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
                <Calculator className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Surprise Reconciliations</h3>
              <p className="text-gray-600">Large unexpected bills at year-end reconciliation time.</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="bg-red-100 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
                <XCircle className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No Transparency</h3>
              <p className="text-gray-600">Limited visibility into how charges are calculated and allocated.</p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <div className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-4 text-red-600">The Result?</h3>
              <p className="text-lg text-gray-700">
                Tenants often face budget surprises, unclear charges, and frustrating reconciliation processes that can
                strain cash flow and create uncertainty in business planning.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Our NNN Leases Are Better */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 text-center">
            Why Our NNN Leases Are Better
          </h2>

          <p className="text-lg text-gray-700 mb-12 max-w-4xl mx-auto text-center">
            We've simplified the NNN lease process to eliminate surprises and provide complete transparency.
          </p>

          {/* Comparison Table */}
          <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-8 mb-12">
            <h3 className="text-2xl font-bold mb-8 text-center">Traditional vs. Rent Small Spaces</h3>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Traditional Column */}
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h4 className="text-xl font-bold mb-4 text-red-600 flex items-center">
                  <XCircle className="mr-2 h-5 w-5" />
                  Traditional NNN Leases
                </h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <XCircle className="h-5 w-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Annual reconciliation with large surprise bills</span>
                  </li>
                  <li className="flex items-start">
                    <XCircle className="h-5 w-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Complex, hard-to-understand statements</span>
                  </li>
                  <li className="flex items-start">
                    <XCircle className="h-5 w-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Hidden fees and unexpected charges</span>
                  </li>
                  <li className="flex items-start">
                    <XCircle className="h-5 w-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Limited transparency in billing</span>
                  </li>
                  <li className="flex items-start">
                    <XCircle className="h-5 w-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Difficult to budget and plan</span>
                  </li>
                </ul>
              </div>

              {/* Our Approach Column */}
              <div className="bg-white rounded-xl p-6 shadow-md border-2 border-green-200">
                <h4 className="text-xl font-bold mb-4 text-green-600 flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5" />
                  Lease Small Spaces NNN
                </h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Quarterly reconciliation for smaller, manageable adjustments</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Clear, easy-to-understand billing statements</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">No hidden fees - complete transparency</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Full visibility into all charges and calculations</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Predictable costs for better business planning</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Key Benefits */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-blue-50 rounded-xl p-6 text-center">
              <div className="bg-blue-600 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Quarterly Reconciliation</h3>
              <p className="text-gray-600">
                Smaller, more manageable adjustments every quarter instead of large annual surprises.
              </p>
            </div>

            <div className="bg-green-50 rounded-xl p-6 text-center">
              <div className="bg-green-600 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Eye className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Complete Transparency</h3>
              <p className="text-gray-600">
                See exactly how every charge is calculated with detailed, clear documentation.
              </p>
            </div>

            <div className="bg-purple-50 rounded-xl p-6 text-center">
              <div className="bg-purple-600 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">No Hidden Fees</h3>
              <p className="text-gray-600">What you see is what you pay - no surprise charges or unexpected fees.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12 text-center">Frequently Asked Questions</h2>

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="bg-white rounded-lg shadow-sm">
              <AccordionTrigger className="px-6 py-4 text-left">
                How much do NNN charges typically add to my rent?
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                NNN charges typically range from $2-8 per square foot annually, depending on the property type and
                location. We provide detailed estimates upfront so you can budget accurately.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="bg-white rounded-lg shadow-sm">
              <AccordionTrigger className="px-6 py-4 text-left">What's included in CAM charges?</AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                CAM charges cover maintenance of common areas like parking lots, landscaping, snow removal, exterior
                lighting, and shared building systems. We provide a detailed breakdown of all CAM expenses.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="bg-white rounded-lg shadow-sm">
              <AccordionTrigger className="px-6 py-4 text-left">
                How do quarterly reconciliations work?
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                Every quarter, we review actual expenses versus estimates and make small adjustments. This prevents
                large year-end surprises and helps you manage cash flow more effectively.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="bg-white rounded-lg shadow-sm">
              <AccordionTrigger className="px-6 py-4 text-left">
                Can I see documentation for all charges?
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                Absolutely. We provide complete documentation including invoices, receipts, and detailed calculations
                for all NNN charges. Transparency is our priority.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="bg-white rounded-lg shadow-sm">
              <AccordionTrigger className="px-6 py-4 text-left">What if I disagree with a charge?</AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                We encourage questions and provide detailed explanations for any charges. Our transparent process makes
                it easy to understand and verify all expenses.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to Experience Transparent NNN Leasing?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Get answers to your questions and learn how our simplified approach can benefit your business.
          </p>
          <Button
            onClick={() => setIsModalOpen(true)}
            size="lg"
            className="bg-white text-blue-700 hover:bg-blue-50 text-lg px-8 py-4 h-auto"
          >
            Speak to an Expert Now <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
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
                <Textarea id="message" placeholder="Questions about NNN leases..." />
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
