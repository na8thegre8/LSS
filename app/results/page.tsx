import type { Metadata } from "next"
import ResultsView from "@/components/results/results-view"
import LeadCaptureModal from "@/components/results/lead-capture-modal"

export const metadata: Metadata = {
  title: "Your Matches | LeaseSmallSpace",
  description: "View your matched commercial spaces ranked by value",
}

export default function ResultsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  // Parse search params
  const zip = typeof searchParams.zip === "string" ? searchParams.zip : ""
  const type = typeof searchParams.type === "string" ? searchParams.type : ""
  const size = typeof searchParams.size === "string" ? Number.parseInt(searchParams.size) : 2500
  const budget = typeof searchParams.budget === "string" ? Number.parseInt(searchParams.budget) : 0
  const timeline = typeof searchParams.timeline === "string" ? searchParams.timeline : ""
  const features = typeof searchParams.features === "string" ? searchParams.features.split(",") : []

  return (
    <main className="min-h-screen bg-gray-50">
      <ResultsView
        searchParams={{
          zip,
          type,
          size,
          budget,
          timeline,
          features,
        }}
      />
      <LeadCaptureModal />
    </main>
  )
}
