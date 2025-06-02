import type { Metadata } from "next"
import Hero from "@/components/home/hero"
import TrustIndicators from "@/components/home/trust-indicators"
import PropertyShowcase from "@/components/home/property-showcase"
import WhyRentSmallSpace from "@/components/home/why-rent-small-space"
import Testimonials from "@/components/home/testimonials"
import CTA from "@/components/home/cta"

export const metadata: Metadata = {
  title: "LeaseSmallSpace.com | Colorado's Premier Small Commercial Properties",
  description:
    "Find your perfect small commercial space in Colorado. Warehouses, shops, and flex spaces available now. Quick approval, flexible terms.",
}

export default function HomePage() {
  return (
    <main className="flex flex-col min-h-screen">
      <Hero />
      <TrustIndicators />
      <PropertyShowcase />
      <WhyRentSmallSpace />
      <Testimonials />
      <CTA />
    </main>
  )
}
