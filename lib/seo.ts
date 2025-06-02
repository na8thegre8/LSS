// SEO optimization utilities

export const generateStructuredData = (type: "Organization" | "LocalBusiness" | "RealEstateAgent", data: any) => {
  const baseSchema = {
    "@context": "https://schema.org",
    "@type": type,
  }

  switch (type) {
    case "Organization":
      return {
        ...baseSchema,
        name: "LeaseSmallSpace",
        url: "https://leasesmallspace.com",
        logo: "https://leasesmallspace.com/images/logo-green-warehouse-updated.png",
        description: "Colorado's premier small commercial real estate platform",
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+1-303-555-0123",
          contactType: "customer service",
        },
      }

    case "LocalBusiness":
      return {
        ...baseSchema,
        name: "LeaseSmallSpace",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Denver",
          addressRegion: "CO",
          addressCountry: "US",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 39.7392,
          longitude: -104.9903,
        },
        openingHours: "Mo-Fr 08:00-18:00",
        telephone: "+1-303-555-0123",
      }

    default:
      return baseSchema
  }
}

export const generateMetaTags = (page: string, customData?: any) => {
  const baseUrl = "https://leasesmallspace.com"

  const pages = {
    home: {
      title: "LeaseSmallSpace.com | Colorado's Premier Small Commercial Properties",
      description:
        "Find your perfect small commercial space in Colorado. Warehouses, shops, and flex spaces available now. Quick approval, flexible terms.",
      keywords: "commercial real estate, warehouse rental, office space, flex space, Colorado",
    },
    questionnaire: {
      title: "Find Your Perfect Space | LeaseSmallSpace Questionnaire",
      description:
        "Answer a few questions to get matched with ideal commercial properties in Colorado. Free consultation and personalized recommendations.",
      keywords: "commercial space finder, property matching, business space rental",
    },
    results: {
      title: "Your Property Matches | LeaseSmallSpace Results",
      description: "View your personalized commercial property matches with Deal Scores and detailed information.",
      keywords: "commercial property results, space matches, property listings",
    },
    faq: {
      title: "Frequently Asked Questions | LeaseSmallSpace",
      description: "Get answers to common questions about leasing commercial space in Colorado.",
      keywords: "commercial lease FAQ, rental questions, property help",
    },
  }

  return pages[page as keyof typeof pages] || pages.home
}
