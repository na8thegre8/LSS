"use client"

import type React from "react"

import { useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function BudgetStep({
  value,
  onChange,
}: {
  value: string
  onChange: (value: string) => void
}) {
  // Default budget value
  const defaultBudget = 3000
  const [sliderValue, setSliderValue] = useState(defaultBudget)
  const [inputValue, setInputValue] = useState(defaultBudget.toString())
  const [notSure, setNotSure] = useState(false)

  // Calculate suggested budget range based on size (assuming average $1.25/sq ft)
  const avgRatePerSqFt = 1.25
  const minSuggested = Math.round(2500 * 1.0) // Using 2500 as a default size
  const maxSuggested = Math.round(2500 * 1.5)

  const handleSliderChange = (newValue: number[]) => {
    setSliderValue(newValue[0])
    setInputValue(newValue[0].toString())
    setNotSure(false)
  }

  const handleSliderCommit = (newValue: number[]) => {
    // Convert to budget range string
    let budgetRange = ""
    if (newValue[0] <= 1000) {
      budgetRange = "1000-2500"
    } else if (newValue[0] <= 2500) {
      budgetRange = "1000-2500"
    } else if (newValue[0] <= 4000) {
      budgetRange = "2500-4000"
    } else if (newValue[0] <= 6000) {
      budgetRange = "4000-6000"
    } else {
      budgetRange = "6000-plus"
    }
    onChange(budgetRange)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
    const numValue = Number.parseInt(e.target.value)
    if (!isNaN(numValue) && numValue > 0) {
      setSliderValue(numValue)
      setNotSure(false)
    }
  }

  const handleBudgetSelect = (budgetRange: string) => {
    onChange(budgetRange)
  }

  const handleNotSure = () => {
    setNotSure(true)
    onChange("not-sure")
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Monthly rent target?</h2>
      <p className="text-gray-500 mb-6">What's your budget for monthly rent</p>

      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <span className="text-gray-500">$</span>
          <Input
            type="number"
            min={1000}
            max={10000}
            value={inputValue}
            onChange={handleInputChange}
            className="w-32"
            disabled={notSure}
          />
          <span className="text-gray-500">per month</span>
          <Button
            variant={notSure ? "default" : "outline"}
            size="sm"
            onClick={handleNotSure}
            className={notSure ? "bg-[#ED4337] text-white" : ""}
          >
            Not Sure
          </Button>
        </div>

        <div>
          <Slider
            value={[sliderValue]}
            min={1000}
            max={10000}
            step={100}
            onValueChange={handleSliderChange}
            onValueCommit={handleSliderCommit}
            className="py-4"
            disabled={notSure}
          />
          <div className="flex justify-between text-sm text-gray-500 mt-2">
            <span>$1,000</span>
            <span>$2,500</span>
            <span>$4,000</span>
            <span>$7,000</span>
            <span>$10,000+</span>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2">
          <Button
            variant="outline"
            className="border-gray-200 hover:border-[#ED4337] hover:bg-[#ED4337]/5"
            onClick={() => handleBudgetSelect("1000-2500")}
          >
            $1K-2.5K
          </Button>
          <Button
            variant="outline"
            className="border-gray-200 hover:border-[#ED4337] hover:bg-[#ED4337]/5"
            onClick={() => handleBudgetSelect("2500-4000")}
          >
            $2.5K-4K
          </Button>
          <Button
            variant="outline"
            className="border-gray-200 hover:border-[#ED4337] hover:bg-[#ED4337]/5"
            onClick={() => handleBudgetSelect("4000-6000")}
          >
            $4K-6K
          </Button>
          <Button
            variant="outline"
            className="border-gray-200 hover:border-[#ED4337] hover:bg-[#ED4337]/5"
            onClick={() => handleBudgetSelect("6000-plus")}
          >
            $6K+
          </Button>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg mt-6">
          <p className="text-blue-700 font-medium">Suggested budget</p>
          <p className="text-blue-600">
            For a 2,500 sq ft space in this area, typical rates range from ${minSuggested} to ${maxSuggested} per month.
          </p>
        </div>
      </div>
    </div>
  )
}
