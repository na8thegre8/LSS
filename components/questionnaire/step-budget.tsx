"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DollarSign, Calculator, TrendingUp } from "lucide-react"

interface BudgetStepProps {
  value: string
  onChange: (value: string) => void
  selectedSize?: number // Get the size from previous step
}

export default function BudgetStep({ value, onChange, selectedSize = 2000 }: BudgetStepProps) {
  const [budgetValue, setBudgetValue] = useState(4000)
  const [inputValue, setInputValue] = useState("4000")
  const [notSure, setNotSure] = useState(false)

  // Calculate suggested budget based on size (1.35 per sq ft)
  const ratePerSqFt = 1.35
  const suggestedBudget = Math.round(selectedSize * ratePerSqFt)
  const minSuggested = Math.round(suggestedBudget * 0.8)
  const maxSuggested = Math.round(suggestedBudget * 1.2)

  // Initialize with suggested budget
  useEffect(() => {
    if (!value || value === "") {
      setBudgetValue(suggestedBudget)
      setInputValue(suggestedBudget.toString())
    }
  }, [suggestedBudget, value])

  const handleSliderChange = (newValue: number[]) => {
    setBudgetValue(newValue[0])
    setInputValue(newValue[0].toString())
    setNotSure(false)
    updateBudgetRange(newValue[0])
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputVal = e.target.value
    setInputValue(inputVal)
    const numValue = Number.parseInt(inputVal)
    if (!isNaN(numValue) && numValue > 0) {
      setBudgetValue(numValue)
      setNotSure(false)
      updateBudgetRange(numValue)
    }
  }

  const updateBudgetRange = (budget: number) => {
    let budgetRange = ""
    if (budget <= 2000) {
      budgetRange = "under-2000"
    } else if (budget <= 3500) {
      budgetRange = "2000-3500"
    } else if (budget <= 5000) {
      budgetRange = "3500-5000"
    } else if (budget <= 7500) {
      budgetRange = "5000-7500"
    } else if (budget <= 10000) {
      budgetRange = "7500-10000"
    } else {
      budgetRange = "over-10000"
    }
    onChange(budgetRange)
  }

  const handleBudgetSelect = (budgetRange: string) => {
    setNotSure(false)
    onChange(budgetRange)

    // Update slider to middle of range
    const rangeMidpoints: { [key: string]: number } = {
      "under-2000": 1500,
      "2000-3500": 2750,
      "3500-5000": 4250,
      "5000-7500": 6250,
      "7500-10000": 8750,
      "over-10000": 12000,
    }

    const midpoint = rangeMidpoints[budgetRange] || 4000
    setBudgetValue(midpoint)
    setInputValue(midpoint.toString())
  }

  const handleNotSure = () => {
    setNotSure(true)
    onChange("not-sure")
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
    const difference = budgetValue - suggestedBudget
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
        <h2 className="text-2xl font-bold text-gray-900 mb-2">What's your monthly budget?</h2>
        <p className="text-gray-600">
          Including rent, utilities, and typical operating expenses for a {selectedSize.toLocaleString()} sq ft space
        </p>
      </div>

      {/* Budget Input Section */}
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
              className="text-lg font-semibold"
              disabled={notSure}
              placeholder="Enter budget"
            />
            <span className="text-gray-500 whitespace-nowrap">per month</span>
          </div>
          <Button
            variant={notSure ? "default" : "outline"}
            size="sm"
            onClick={handleNotSure}
            className={notSure ? "bg-blue-600 text-white" : ""}
          >
            Not Sure
          </Button>
        </div>

        {/* Budget Slider */}
        <div className="space-y-4">
          <Slider
            value={[budgetValue]}
            min={1000}
            max={15000}
            step={100}
            onValueChange={handleSliderChange}
            className="py-4"
            disabled={notSure}
          />
          <div className="flex justify-between text-sm text-gray-500">
            <span>$1K</span>
            <span>$3.5K</span>
            <span>$5K</span>
            <span>$7.5K</span>
            <span>$10K</span>
            <span>$15K+</span>
          </div>
        </div>

        {/* Quick Budget Options */}
        <div className="grid grid-cols-3 gap-3">
          <Button
            variant="outline"
            className="border-gray-200 hover:border-blue-500 hover:bg-blue-50 text-sm py-3"
            onClick={() => handleBudgetSelect("under-2000")}
          >
            Under $2K
          </Button>
          <Button
            variant="outline"
            className="border-gray-200 hover:border-blue-500 hover:bg-blue-50 text-sm py-3"
            onClick={() => handleBudgetSelect("2000-3500")}
          >
            $2K - $3.5K
          </Button>
          <Button
            variant="outline"
            className="border-gray-200 hover:border-blue-500 hover:bg-blue-50 text-sm py-3"
            onClick={() => handleBudgetSelect("3500-5000")}
          >
            $3.5K - $5K
          </Button>
          <Button
            variant="outline"
            className="border-gray-200 hover:border-blue-500 hover:bg-blue-50 text-sm py-3"
            onClick={() => handleBudgetSelect("5000-7500")}
          >
            $5K - $7.5K
          </Button>
          <Button
            variant="outline"
            className="border-gray-200 hover:border-blue-500 hover:bg-blue-50 text-sm py-3"
            onClick={() => handleBudgetSelect("7500-10000")}
          >
            $7.5K - $10K
          </Button>
          <Button
            variant="outline"
            className="border-gray-200 hover:border-blue-500 hover:bg-blue-50 text-sm py-3"
            onClick={() => handleBudgetSelect("over-10000")}
          >
            $10K+
          </Button>
        </div>
      </div>

      {/* Market Analysis Section */}
      <div className="space-y-4">
        <div className="bg-gray-50 rounded-lg p-4 border">
          <div className="flex items-center gap-2 mb-2">
            <Calculator className="h-4 w-4 text-gray-600" />
            <h3 className="font-semibold text-gray-900">Market Analysis for {selectedSize.toLocaleString()} sq ft</h3>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Average Total Cost:</span>
              <div className="font-semibold text-lg">{formatCurrency(suggestedBudget)}/month</div>
              <span className="text-xs text-gray-500">Based on size and targeted market</span>
            </div>
            <div>
              <span className="text-gray-600">Typical Range:</span>
              <div className="font-semibold text-lg">
                {formatCurrency(minSuggested)} - {formatCurrency(maxSuggested)}
              </div>
              <span className="text-xs text-gray-500">Including utilities & expenses</span>
            </div>
          </div>
        </div>

        {/* Budget Insight */}
        {!notSure && (
          <div className={`rounded-lg p-4 border ${insight.bgColor} ${insight.borderColor}`}>
            <div className="flex items-start gap-3">
              {insight.icon}
              <div>
                <h4 className={`font-semibold ${insight.color} mb-1`}>Budget Analysis</h4>
                <p className={`text-sm ${insight.color}`}>{insight.text}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* What's Included */}
      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
        <h4 className="font-semibold text-blue-900 mb-2">What's typically included in total monthly cost:</h4>
        <ul className="text-sm text-blue-800 space-y-1">
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
