import type { Metadata } from "next"
import NNNLeaseGuideView from "@/components/nnn-lease-guide/nnn-lease-guide-view"

export const metadata: Metadata = {
  title: "NNN Lease Guide | Simplified Triple Net Leases in Denver, CO",
  description:
    "Simplified NNN Lease Guide explaining triple net leases clearly. Learn why Rent Small Spaces offers simpler quarterly reconciliations, transparent fees, and easy leasing.",
}

export default function NNNLeaseGuidePage() {
  return <NNNLeaseGuideView />
}
