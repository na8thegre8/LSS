export type DealScore = "great" | "good" | "fair" | "high" | "over-market"

export type Listing = {
  id: string
  title: string
  location: string
  price: number
  size: number
  type: string
  availability: string
  imageUrl: string
  dealScore: DealScore
  features: string[]
  description: string
  lat?: number
  lng?: number
}
