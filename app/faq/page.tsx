import type { Metadata } from "next"
import FAQView from "@/components/faq/faq-view"

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Rent Small Spaces Colorado",
  description:
    "Answers to frequently asked questions about renting small commercial spaces in Colorado. Learn about finding warehouse, retail, shop, flex spaces, lease terms, and more.",
  keywords:
    "warehouse space for rent, small commercial spaces Colorado, flexible lease terms commercial, move-in ready commercial spaces, retail space for lease Colorado, Triple Net lease NNN, flex space rental, small retail space near me, affordable warehouse rental Colorado",
}

export default function FAQPage() {
  return <FAQView />
}
