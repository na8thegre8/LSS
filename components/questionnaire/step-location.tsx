"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MapPin, Edit3 } from "lucide-react"
import { useState } from "react"

const coloradoAreas = [
  { id: "denver", name: "Denver", popular: true },
  { id: "arvada", name: "Arvada", popular: true },
  { id: "aurora", name: "Aurora", popular: false },
  { id: "lakewood", name: "Lakewood", popular: false },
  { id: "thornton", name: "Thornton", popular: false },
  { id: "westminster", name: "Westminster", popular: false },
  { id: "greeley", name: "Greeley", popular: false },
  { id: "centennial", name: "Centennial", popular: false },
  { id: "highlands-ranch", name: "Highlands Ranch", popular: false },
  { id: "longmont", name: "Longmont", popular: false },
  { id: "castle-rock", name: "Castle Rock", popular: false },
  { id: "loveland", name: "Loveland", popular: false },
  { id: "broomfield", name: "Broomfield", popular: false },
  { id: "commerce-city", name: "Commerce City", popular: false },
  { id: "parker", name: "Parker", popular: false },
]

export default function LocationStep({
  value,
  onChange,
}: {
  value: string
  onChange: (value: string) => void
}) {
  const [showCustomInput, setShowCustomInput] = useState(false)
  const [customCity, setCustomCity] = useState("")

  const handleCustomCitySubmit = () => {
    if (customCity.trim()) {
      onChange(customCity.trim())
      setShowCustomInput(false)
    }
  }

  const handleCitySelect = (cityId: string) => {
    if (cityId === "other") {
      setShowCustomInput(true)
      setCustomCity("")
    } else {
      onChange(cityId)
      setShowCustomInput(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Where in Colorado?</h2>
        <p className="text-lg text-gray-600">We have properties throughout the state</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {coloradoAreas.map((area) => (
          <Button
            key={area.id}
            variant={value === area.id ? "default" : "outline"}
            className={`h-16 text-left justify-start relative ${
              value === area.id ? "bg-blue-600 hover:bg-blue-700" : ""
            }`}
            onClick={() => handleCitySelect(area.id)}
          >
            <MapPin className="h-5 w-5 mr-3" />
            <div>
              <div className="font-medium">{area.name}</div>
              {area.popular && <div className="text-xs opacity-75">Popular choice</div>}
            </div>
            {area.popular && (
              <div className="absolute top-2 right-2">
                <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">Popular</span>
              </div>
            )}
          </Button>
        ))}

        {/* Other City Button */}
        <Button
          variant={
            showCustomInput || (!coloradoAreas.find((area) => area.id === value) && value) ? "default" : "outline"
          }
          className={`h-16 text-left justify-start ${
            showCustomInput || (!coloradoAreas.find((area) => area.id === value) && value)
              ? "bg-blue-600 hover:bg-blue-700"
              : ""
          }`}
          onClick={() => handleCitySelect("other")}
        >
          <Edit3 className="h-5 w-5 mr-3" />
          <div>
            <div className="font-medium">Type in your city</div>
            <div className="text-xs opacity-75">Other Colorado location</div>
          </div>
        </Button>
      </div>

      {/* Custom City Input */}
      {showCustomInput && (
        <div className="mt-6 p-4 border rounded-lg bg-gray-50">
          <label htmlFor="custom-city" className="block text-sm font-medium text-gray-700 mb-2">
            Enter your city name:
          </label>
          <div className="flex gap-2">
            <Input
              id="custom-city"
              type="text"
              placeholder="e.g., Fort Collins, Boulder, etc."
              value={customCity}
              onChange={(e) => setCustomCity(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleCustomCitySubmit()
                }
              }}
              className="flex-1"
              autoFocus
            />
            <Button onClick={handleCustomCitySubmit} disabled={!customCity.trim()} className="px-6">
              Select
            </Button>
          </div>
        </div>
      )}

      {/* Show selected custom city */}
      {!showCustomInput && value && !coloradoAreas.find((area) => area.id === value) && (
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Selected: <span className="font-medium text-blue-600">{value}</span>
          </p>
        </div>
      )}

      <div className="text-center mt-8">
        <p className="text-sm text-gray-500">We're expanding throughout Colorado.</p>
      </div>
    </div>
  )
}
