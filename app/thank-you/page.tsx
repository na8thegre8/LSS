import type { Metadata } from "next"
import ThankYouView from "@/components/thank-you/thank-you-view"

export const metadata: Metadata = {
  title: "Thank You | LeaseSmallSpace.com",
  description: "We'll be in touch within 24 hours with your property matches",
}

export default function ThankYouPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <ThankYouView />
    </main>
  )
}
