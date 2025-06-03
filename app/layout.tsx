import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { Navigation } from "@/components/navigation/navigation"
import { Footer } from "@/components/footer/footer"
import { ConditionalPopup } from "@/components/layout/conditional-popup"

// This metadata remains unchanged and is correctly exported from a Server Component
export const metadata: Metadata = {
  title: "LeaseSmallSpace.com | Colorado's Premier Small Commercial Properties",
  description:
    "Find your perfect small commercial space in Colorado. Warehouses, shops, and flex spaces available now. Quick approval, flexible terms.",
  generator: "LeaseSmallSpace.com",
  keywords: "commercial real estate, warehouse rental, office space, flex space, Colorado commercial property",
  authors: [{ name: "LeaseSmallSpace Team" }],
  openGraph: {
    title: "LeaseSmallSpace.com | Colorado Commercial Properties",
    description: "Find your perfect small commercial space in Colorado",
    url: "https://leasesmallspace.com",
    siteName: "LeaseSmallSpace",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LeaseSmallSpace.com | Colorado Commercial Properties",
    description: "Find your perfect small commercial space in Colorado",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

// Define the paths where the inactivity popup should be active
const popupEnabledPaths = ["/questionnaire", "/nnn-lease-guide", "/why-rent-small-space", "/faq"]

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background font-sans antialiased">
        {/* This is the original structure that includes Navigation and Footer */}
        <div className="relative flex min-h-screen flex-col">
          <Navigation />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        {/* Use the new client component here, passing the enabled paths */}
        <ConditionalPopup enabledPaths={popupEnabledPaths} />
      </body>
    </html>
  )
}
