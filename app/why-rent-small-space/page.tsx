import type { Metadata } from "next"
import WhyRentSmallSpacesView from "@/components/why-rent-small-spaces/why-rent-small-spaces-view"

export const metadata: Metadata = {
  title: "Why Lease Small Spaces? | Warehouse, Retail, Flex & Industrial Leasing in Denver, CO",
  description:
    "Discover why leasing small warehouse, retail, industrial, flex, and shop spaces is ideal for startups, contractors, and small businesses in Denver, Colorado. Affordable, flexible, immediate leasing solutions.",
}

export default function WhyRentSmallSpacePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <WhyRentSmallSpacesView />
    </main>
  )
}
