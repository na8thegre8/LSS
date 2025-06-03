"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const sizePresets = [
  { label: "Small", size: 1500, description: "Perfect for startups" },
  { label: "Medium", size: 4000, description: "Growing businesses" },
  { label: "Large", size: 7500, description: "Established operations" },
]

interface SizeStepProps {
  value: number
  onChange: (value: number) => void
  onSelectionMade?: () => void
}

export default function SizeStep({ value, onChange, onSelectionMade }: SizeStepProps) {
  const [inputValue, setInputValue] = useState(value.toString())
  const advanceTimerRef = useRef<NodeJS.Timeout | null>(null)

  const clearAdvanceTimer = () => {
    if (advanceTimerRef.current) {
      clearTimeout(advanceTimerRef.current)
      advanceTimerRef.current = null
    }
  }

  const scheduleAdvance = () => {
    clearAdvanceTimer()
    if (onSelectionMade && value >= 500 && value <= 10000) {
      // Ensure value is valid
      advanceTimerRef.current = setTimeout(() => {
        if (onSelectionMade) onSelectionMade()
      }, 10000) // 10 seconds
    }
  }

  useEffect(() => {
    setInputValue(value.toString()) // Sync input with prop value
  }, [value])

  useEffect(() => {
    // Clear timer on component unmount
    return () => clearAdvanceTimer()
  }, [])

  const handleSliderChange = (newValue: number[]) => {
    onChange(newValue[0])
    // setInputValue(newValue[0].toString()) // Already handled by useEffect [value]
    scheduleAdvance()
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentInput = e.target.value
    setInputValue(currentInput)
    const numValue = Number.parseInt(currentInput)
    if (!isNaN(numValue) && numValue >= 500 && numValue <= 10000) {
      onChange(numValue)
      scheduleAdvance()
    } else {
      clearAdvanceTimer() // Clear timer if input is invalid to prevent advancing
    }
  }

  const handlePresetClick = (presetSize: number) => {
    onChange(presetSize)
    // setInputValue(presetSize.toString()) // Already handled by useEffect [value]
    clearAdvanceTimer() // Clear any pending slider timer
    if (onSelectionMade) {
      // Add a small delay for UI feedback
      setTimeout(() => onSelectionMade(), 300)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">How much space do you need?</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          We specialize in spaces from 500 to 10,000 square feet
        </p>
      </div>

      <div className="space-y-8">
        <div className="grid grid-cols-3 gap-4">
          {sizePresets.map((preset) => (
            <Button
              key={preset.size}
              variant={value === preset.size ? "default" : "outline"}
              className={`h-auto p-4 flex flex-col transition-colors duration-150 ${
                value === preset.size
                  ? "bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600"
                  : "hover:bg-gray-100 dark:hover:bg-slate-700"
              }`}
              onClick={() => handlePresetClick(preset.size)}
            >
              <span className="font-bold text-lg">{preset.label}</span>
              <span className="text-sm opacity-80">{preset.size.toLocaleString()} sq ft</span>
              <span className="text-xs opacity-70">{preset.description}</span>
            </Button>
          ))}
        </div>

        <div className="bg-gray-50 dark:bg-slate-800 p-6 rounded-lg">
          <div className="flex items-center gap-4 mb-4">
            <Input
              type="number"
              min={500}
              max={10000}
              value={inputValue}
              onChange={handleInputChange}
              className="w-32 text-center font-bold text-lg dark:bg-slate-700 dark:text-white dark:placeholder-gray-400"
            />
            <span className="text-gray-600 dark:text-gray-300 font-medium">square feet</span>
          </div>

          <Slider
            value={[value]}
            min={500}
            max={10000}
            step={100}
            onValueChange={handleSliderChange} // This is for when the slider value is committed (on release)
            className="py-4"
          />

          <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-2">
            <span>500 sq ft</span>
            <span className="font-medium text-blue-600 dark:text-blue-400">{value.toLocaleString()} sq ft</span>
            <span>10,000 sq ft</span>
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Need more than 10,000 sq ft? We can help with larger spaces too.
          </p>
        </div>
      </div>
    </div>
  )
}
