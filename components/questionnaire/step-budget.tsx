"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DollarSign, Calculator, TrendingUp } from "lucide-react"

interface BudgetStepProps {
  value: string // This is budgetRange like "under-2000", "2000-3500", "not-sure"
  onChange: (value: string) => void // For budgetRange
  selectedSize?: number
  onSelectionMade?: () => void
}

const rangeMidpoints: { [key: string]: number } = {
  "under-2000": 1500,
  "2000-3500": 2750,
  "3500-5000": 4250,
  "5000-7500": 6250,
  "7500-10000": 8750,
  "over-10000": 12000,
}

export default function BudgetStep({
  value, // budgetRange prop
  onChange, // for budgetRange
  selectedSize = 2000,
  onSelectionMade,
}: BudgetStepProps) {
  const [numericalBudgetValue, setNumericalBudgetValue] = useState(4000)
  const [inputValue, setInputValue] = useState("4000")
  const [isNotSure, setIsNotSure] = useState(false)

  const advanceTimerRef = useRef<NodeJS.Timeout | null>(null)

  const ratePerSqFt = 1.35 // Example rate
  const suggestedBudget = Math.round(selectedSize * ratePerSqFt)
  const minSuggested = Math.round(suggestedBudget * 0.8)
  const maxSuggested = Math.round(suggestedBudget * 1.2)

  // Effect to synchronize internal state (numericalBudgetValue, inputValue, isNotSure)
  // with the `value` prop (budgetRange) and `suggestedBudget`.
  useEffect(() => {
    const currentIsNotSure = value === "not-sure"
    setIsNotSure(currentIsNotSure)

    if (currentIsNotSure) {
      // If "not-sure", retain previous numerical values or default to suggestedBudget
      // This avoids resetting the slider/input if user clicks "not-sure" then back
      // No explicit set here, numericalBudgetValue/inputValue keep their state
    } else if (value && rangeMidpoints[value]) {
      const midpoint = rangeMidpoints[value]
      setNumericalBudgetValue(midpoint)
      setInputValue(midpoint.toString())
    } else {
      // Default case (e.g., initial load with empty `value` prop, or invalid range)
      // This also covers when `value` becomes empty string after being "not-sure"
      setNumericalBudgetValue(suggestedBudget)
      setInputValue(suggestedBudget.toString())
    }
  }, [value, suggestedBudget]) // Dependencies: only props or values derived directly from props

  const clearAdvanceTimer = () => {
    if (advanceTimerRef.current) {
      clearTimeout(advanceTimerRef.current)
      advanceTimerRef.current = null
    }
  }

  const scheduleAdvance = () => {
    clearAdvanceTimer()
    if (onSelectionMade && value && value !== "not-sure") {
      advanceTimerRef.current = setTimeout(() => {
        if (onSelectionMade) onSelectionMade()
      }, 10000)
    }
  }

  useEffect(() => {
    return () => clearAdvanceTimer()
  }, [])

  const getBudgetRangeFromNumber = (budget: number): string => {
    if (budget <= 2000) return "under-2000"
    if (budget <= 3500) return "2000-3500"
    if (budget <= 5000) return "3500-5000"
    if (budget <= 7500) return "5000-7500"
    if (budget <= 10000) return "7500-10000"
    return "over-10000"
  }

  const handleSliderChange = (newSliderValue: number[]) => {
    const newNumBudget = newSliderValue[0]
    // Update internal numerical state first
    setNumericalBudgetValue(newNumBudget)
    setInputValue(newNumBudget.toString())
    // Then, notify parent of the change in budget *range*
    onChange(getBudgetRangeFromNumber(newNumBudget))
    // setIsNotSure(false) // This will be handled by useEffect when `value` prop changes
    scheduleAdvance()
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentInput = e.target.value
    setInputValue(currentInput) // Update input field immediately
    const numValue = Number.parseInt(currentInput)
    if (!isNaN(numValue) && numValue > 0) {
      setNumericalBudgetValue(numValue) // Update internal numerical state
      onChange(getBudgetRangeFromNumber(numValue)) // Notify parent
      // setIsNotSure(false) // Handled by useEffect
      scheduleAdvance()
    } else {
      clearAdvanceTimer()
    }
  }

  const handleBudgetPresetSelect = (budgetRange: string) => {
    onChange(budgetRange) // Notify parent. This will trigger the useEffect to update internal states.
    // setIsNotSure(false) // Handled by useEffect
    clearAdvanceTimer()
    if (onSelectionMade) {
      setTimeout(() => onSelectionMade(), 300)
    }
  }

  const handleNotSure = () => {
    onChange("not-sure") // Notify parent. This will trigger the useEffect.
    clearAdvanceTimer()
    if (onSelectionMade) {
      setTimeout(() => onSelectionMade(), 300)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const getBudgetInsight = () => {
    // Use the `isNotSure` state which is synced with the `value` prop
    if (isNotSure) {
      return {
        icon: <Calculator className="h-4 w-4 text-gray-600" />,
        text: "Select a budget or let us know if you're unsure. We can help estimate costs.",
        color: "text-gray-700",
        bgColor: "bg-gray-50",
        borderColor: "border-gray-200",
      }
    }

    const difference = numericalBudgetValue - suggestedBudget
    const percentDiff = Math.abs((difference / suggestedBudget) * 100)

    if (Math.abs(difference) < 500) {
      return {
        icon: <TrendingUp className="h-4 w-4 text-green-600" />,
        text: "Perfect! This budget aligns well with market rates for your space size.",
        color: "text-green-700",
        bgColor: "bg-green-50",
        borderColor: "border-green-200",
      }
    } else if (difference > 0) {
      return {
        icon: <TrendingUp className="h-4 w-4 text-blue-600" />,
        text: `Great budget! This gives you ${percentDiff.toFixed(0)}% more options and premium locations.`,
        color: "text-blue-700",
        bgColor: "bg-blue-50",
        borderColor: "border-blue-200",
      }
    } else {
      return {
        icon: <Calculator className="h-4 w-4 text-orange-600" />,
        text: `We can work with this budget. Consider spaces slightly outside prime areas for better value.`,
        color: "text-orange-700",
        bgColor: "bg-orange-50",
        borderColor: "border-orange-200",
      }
    }
  }
  const insight = getBudgetInsight()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">What's your monthly budget?</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Including rent, utilities, and typical operating expenses for a {selectedSize.toLocaleString()} sq ft space
        </p>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 flex-1">
            <DollarSign className="h-5 w-5 text-gray-400" />
            <Input
              type="number"
              min={1000}
              max={15000}
              step={100}
              value={inputValue}
              onChange={handleInputChange}
              className="text-lg font-semibold dark:bg-slate-700 dark:text-white dark:placeholder-gray-400"
              disabled={isNotSure}
              placeholder="Enter budget"
            />
            <span className="text-gray-500 dark:text-gray-400 whitespace-nowrap">per month</span>
          </div>
          <Button
            variant={isNotSure ? "default" : "outline"}
            size="sm"
            onClick={handleNotSure}
            className={
              isNotSure
                ? "bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600"
                : "hover:bg-gray-100 dark:hover:bg-slate-700"
            }
          >
            Not Sure
          </Button>
        </div>

        <div className="space-y-4">
          <Slider
            value={[numericalBudgetValue]}
            min={1000}
            max={15000}
            step={100}
            onValueChange={handleSliderChange}
            className="py-4"
            disabled={isNotSure}
          />
          <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
            <span>$1K</span>
            <span>$3.5K</span>
            <span>$5K</span>
            <span>$7.5K</span>
            <span>$10K</span>
            <span>$15K+</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {[
            { range: "under-2000", label: "Under $2K" },
            { range: "2000-3500", label: "$2K - $3.5K" },
            { range: "3500-5000", label: "$3.5K - $5K" },
            { range: "5000-7500", label: "$5K - $7.5K" },
            { range: "7500-10000", label: "$7.5K - $10K" },
            { range: "over-10000", label: "$10K+" },
          ].map((opt) => (
            <Button
              key={opt.range}
              variant={value === opt.range && !isNotSure ? "default" : "outline"}
              className={`border-gray-200 dark:border-slate-700 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-slate-700 text-sm py-3 transition-colors duration-150 ${
                value === opt.range && !isNotSure
                  ? "bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600"
                  : ""
              }`}
              onClick={() => handleBudgetPresetSelect(opt.range)}
            >
              {opt.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-4 border dark:border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <Calculator className="h-4 w-4 text-gray-600 dark:text-gray-400" />
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Market Analysis for {selectedSize.toLocaleString()} sq ft
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600 dark:text-gray-400">Average Total Cost:</span>
              <div className="font-semibold text-lg text-gray-900 dark:text-white">
                {formatCurrency(suggestedBudget)}/month
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">Based on size and targeted market</span>
            </div>
            <div>
              <span className="text-gray-600 dark:text-gray-400">Typical Range:</span>
              <div className="font-semibold text-lg text-gray-900 dark:text-white">
                {formatCurrency(minSuggested)} - {formatCurrency(maxSuggested)}
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">Including utilities & expenses</span>
            </div>
          </div>
        </div>

        <div className={`rounded-lg p-4 border ${insight.bgColor} ${insight.borderColor} dark:bg-opacity-20`}>
          <div className="flex items-start gap-3">
            <span className={insight.color}>{insight.icon}</span>
            <div>
              <h4 className={`font-semibold ${insight.color} mb-1`}>Budget Analysis</h4>
              <p className={`text-sm ${insight.color}`}>{insight.text}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 dark:bg-slate-800 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
        <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">
          What's typically included in total monthly cost:
        </h4>
        <ul className="text-sm text-blue-800 dark:text-blue-400 space-y-1">
          <li>• Base rent</li>
          <li>• Utilities (electric, water, gas)</li>
          <li>• Property taxes and insurance</li>
          <li>• Common area maintenance</li>
          <li>• Basic building services</li>
        </ul>
      </div>
    </div>
  )
}
