"use client"

import type React from "react"

import { useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const sizePresets = [
  { label: "Small", size: 1500, description: "Perfect for startups" },
  { label: "Medium", size: 4000, description: "Growing businesses" },
  { label: "Large", size: 7500, description: "Established operations" },
]

export default function SizeStep({
  value,
  onChange,
}: {
  value: number
  onChange: (value: number) => void
}) {
  const [inputValue, setInputValue] = useState(value.toString())

  const handleSliderChange = (newValue: number[]) => {
    onChange(newValue[0])
    setInputValue(newValue[0].toString())
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
    const numValue = Number.parseInt(e.target.value)
    if (!isNaN(numValue) && numValue >= 500 && numValue <= 10000) {
      onChange(numValue)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">How much space do you need?</h2>
        <p className="text-lg text-gray-600">We specialize in spaces from 500 to 10,000 square feet</p>
      </div>

      <div className="space-y-8">
        {/* Quick presets */}
        <div className="grid grid-cols-3 gap-4">
          {sizePresets.map((preset) => (
            <Button
              key={preset.size}
              variant={value === preset.size ? "default" : "outline"}
              className={`h-auto p-4 flex flex-col ${value === preset.size ? "bg-blue-600 hover:bg-blue-700" : ""}`}
              onClick={() => {
                onChange(preset.size)
                setInputValue(preset.size.toString())
              }}
            >
              <span className="font-bold text-lg">{preset.label}</span>
              <span className="text-sm opacity-80">{preset.size.toLocaleString()} sq ft</span>
              <span className="text-xs opacity-70">{preset.description}</span>
            </Button>
          ))}
        </div>

        {/* Custom input */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="flex items-center gap-4 mb-4">
            <Input
              type="number"
              min={500}
              max={10000}
              value={inputValue}
              onChange={handleInputChange}
              className="w-32 text-center font-bold text-lg"
            />
            <span className="text-gray-600 font-medium">square feet</span>
          </div>

          <Slider
            value={[value]}
            min={500}
            max={10000}
            step={100}
            onValueChange={handleSliderChange}
            className="py-4"
          />

          <div className="flex justify-between text-sm text-gray-500 mt-2">
            <span>500 sq ft</span>
            <span className="font-medium text-blue-600">{value.toLocaleString()} sq ft</span>
            <span>10,000 sq ft</span>
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-500">Need more than 10,000 sq ft? We can help with larger spaces too.</p>
        </div>
      </div>
    </div>
  )
}
