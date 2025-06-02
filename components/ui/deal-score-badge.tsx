import { Badge } from "@/components/ui/badge"
import { ArrowUp, ArrowDown, Minus } from "lucide-react"

type DealScoreType = "great" | "good" | "fair" | "high" | "over-market"

interface DealScoreBadgeProps {
  score: DealScoreType
  className?: string
}

export function DealScoreBadge({ score, className = "" }: DealScoreBadgeProps) {
  // Define colors based on the master spec
  const colors = {
    great: {
      bg: "bg-[#00A550]",
      text: "text-white",
      icon: <ArrowUp className="h-3 w-3" aria-hidden="true" />,
    },
    good: {
      bg: "bg-[#00B3B0]",
      text: "text-white",
      icon: <ArrowUp className="h-3 w-3" aria-hidden="true" />,
    },
    fair: {
      bg: "bg-[#F6C651]",
      text: "text-gray-900",
      icon: <Minus className="h-3 w-3" aria-hidden="true" />,
    },
    high: {
      bg: "bg-[#F45B5B]",
      text: "text-white",
      icon: <ArrowDown className="h-3 w-3" aria-hidden="true" />,
    },
    "over-market": {
      bg: "bg-[#B0132B]",
      text: "text-white",
      icon: <ArrowDown className="h-3 w-3" aria-hidden="true" />,
    },
  }

  const { bg, text, icon } = colors[score]
  const label = score
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  return (
    <Badge className={`${bg} ${text} flex items-center gap-1 ${className}`}>
      {label}
      <span className="sr-only">
        {score === "great" || score === "good" ? "positive" : score === "fair" ? "neutral" : "negative"} deal score
      </span>
      {icon}
    </Badge>
  )
}
