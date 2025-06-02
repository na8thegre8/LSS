"use client"

import { CheckCircle } from "lucide-react"

export default function ConfirmationStep() {
  return (
    <div className="text-center py-6">
      <div className="mx-auto w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-6">
        <CheckCircle className="h-8 w-8 text-green-600" />
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">🎉 Matches are on the way!</h2>

      <p className="text-gray-600 mb-6">
        We're finding the best spaces that match your requirements. You'll receive a text message with links to your top
        matches and a PDF summary via email.
      </p>

      <div className="bg-blue-50 p-4 rounded-lg inline-block">
        <p className="text-blue-700">Click "See Your Top Three Now" to view your top matches now.</p>
      </div>
    </div>
  )
}
