"use client"

import { useState, useEffect } from "react"
import { TrendingUp } from "lucide-react"

interface RealTimeCounterProps {
  initialCount?: number
  minCount?: number
  maxCount?: number
  updateInterval?: number
  className?: string
  message?: string
}

export function RealTimeCounter({
  initialCount = 12,
  minCount = 8,
  maxCount = 18,
  updateInterval = 8000,
  className = "",
  message = "spaces available this week",
}: RealTimeCounterProps) {
  const [count, setCount] = useState(initialCount)
  const [isIncreasing, setIsIncreasing] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        // More realistic fluctuation - mostly stays the same or changes by 1
        const rand = Math.random()
        let change = 0

        if (rand < 0.7) {
          change = 0 // 70% chance no change
        } else if (rand < 0.85) {
          change = -1 // 15% chance decrease by 1
        } else {
          change = 1 // 15% chance increase by 1
        }

        const newCount = Math.max(minCount, Math.min(maxCount, prev + change))
        setIsIncreasing(change > 0)
        return newCount
      })
    }, updateInterval)

    return () => clearInterval(interval)
  }, [minCount, maxCount, updateInterval])

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <TrendingUp className={`h-4 w-4 ${isIncreasing ? "text-green-500" : "text-blue-600"}`} />
      <span className="text-sm">
        <span className={`font-bold ${isIncreasing ? "text-green-600" : "text-blue-600"}`}>
          {count} {message}
        </span>
      </span>
    </div>
  )
}
