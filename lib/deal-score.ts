/**
 * Calculate a deal score for a commercial property listing
 *
 * @param advertizedRent - The advertized monthly rent
 * @param marketRent - The estimated market rent for similar properties
 * @param features - Array of property features that might affect the score
 * @param immediateOccupancy - Whether the property is available immediately
 * @param vacancyRate - The vacancy rate in the area (0-1)
 * @returns A score from 0-100 and the corresponding category
 */
export function calculateDealScore(
  advertizedRent: number,
  marketRent: number,
  features: string[],
  immediateOccupancy: boolean,
  vacancyRate: number,
): { score: number; category: "great" | "good" | "fair" | "high" | "over-market" } {
  // Base score calculation
  let score = ((marketRent - advertizedRent) / marketRent) * 50 + 50

  // Feature bonuses
  const featureBonus = calculateFeatureBonus(features)
  score += featureBonus

  // Timing bonus for immediate occupancy
  if (immediateOccupancy) {
    score += 5
  }

  // Vacancy penalty (high vacancy = less desirable area)
  const vacancyPenalty = vacancyRate * 10
  score -= vacancyPenalty

  // Clamp score between 0-100
  score = Math.max(0, Math.min(100, score))

  // Determine category with more granularity
  let category: "great" | "good" | "fair" | "high" | "over-market"
  if (score >= 80) {
    category = "great"
  } else if (score >= 65) {
    category = "good"
  } else if (score >= 50) {
    category = "fair"
  } else if (score >= 35) {
    category = "high"
  } else {
    category = "over-market"
  }

  return { score, category }
}

/**
 * Calculate bonus points based on property features
 */
function calculateFeatureBonus(features: string[]): number {
  let bonus = 0

  // Valuable features that might justify higher rent
  if (features.includes("dock-high")) bonus += 3
  if (features.includes("drive-in")) bonus += 2
  if (features.includes("power")) bonus += 3
  if (features.includes("clear-height")) bonus += 2
  if (features.includes("hvac")) bonus += 2
  if (features.includes("office")) bonus += 2

  // Cap the feature bonus at 10 points
  return Math.min(bonus, 10)
}
