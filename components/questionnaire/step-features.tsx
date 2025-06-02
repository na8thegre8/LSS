"use client"

import type React from "react"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

type FeatureOption = {
  id: string
  label: string
  description: string
  icon: React.ReactNode
}

// Import icons
import { ArrowUp, Zap, Building, Fence, Thermometer, Bath, Car, Shield } from "lucide-react"

const features: FeatureOption[] = [
  {
    id: "clear-height",
    label: "High Ceiling (>16')",
    description: "Minimum 16 foot clear height",
    icon: <ArrowUp className="h-5 w-5 text-[#ED4337]" />,
  },
  {
    id: "power",
    label: "3-Phase Power",
    description: "Heavy-duty electrical service",
    icon: <Zap className="h-5 w-5 text-[#ED4337]" />,
  },
  {
    id: "office",
    label: "Office Area",
    description: "Dedicated office space within unit",
    icon: <Building className="h-5 w-5 text-[#ED4337]" />,
  },
  {
    id: "yard",
    label: "Fenced Yard",
    description: "Secure outdoor storage area",
    icon: <Fence className="h-5 w-5 text-[#ED4337]" />,
  },
  {
    id: "hvac",
    label: "Climate Control",
    description: "Heating and air conditioning",
    icon: <Thermometer className="h-5 w-5 text-[#ED4337]" />,
  },
  {
    id: "restroom",
    label: "Private Restroom",
    description: "In-unit bathroom",
    icon: <Bath className="h-5 w-5 text-[#ED4337]" />,
  },
  {
    id: "parking",
    label: "Dedicated Parking",
    description: "Reserved parking spaces",
    icon: <Car className="h-5 w-5 text-[#ED4337]" />,
  },
  {
    id: "security",
    label: "Security System",
    description: "Alarm or surveillance system",
    icon: <Shield className="h-5 w-5 text-[#ED4337]" />,
  },
]

export default function FeaturesStep({
  value,
  spaceType,
  onChange,
}: {
  value: string[]
  spaceType: string
  onChange: (value: string[]) => void
}) {
  const toggleFeature = (id: string) => {
    if (value.includes(id)) {
      onChange(value.filter((item) => item !== id))
    } else {
      onChange([...value, id])
    }
  }

  const handleSkip = () => {
    onChange([])
  }

  // Filter features based on space type if needed
  const relevantFeatures = features.filter((feature) => {
    // You can add logic here to filter features by space type
    return true
  })

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Any must-haves?</h2>
      <p className="text-gray-500 mb-6">Select all features that are essential (optional)</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {relevantFeatures.map((feature) => (
          <div
            key={feature.id}
            className={`flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer border ${
              value.includes(feature.id) ? "border-[#ED4337] bg-[#ED4337]/5" : "border-gray-200"
            }`}
            onClick={() => toggleFeature(feature.id)}
          >
            <div className="flex-shrink-0 mt-0.5">
              <Checkbox
                id={feature.id}
                checked={value.includes(feature.id)}
                onCheckedChange={() => toggleFeature(feature.id)}
              />
            </div>
            <div className="flex-grow">
              <div className="flex items-center">
                <span className="mr-2">{feature.icon}</span>
                <Label htmlFor={feature.id} className="font-medium cursor-pointer">
                  {feature.label}
                </Label>
              </div>
              <p className="text-gray-500 text-sm mt-1">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <Button variant="ghost" onClick={handleSkip} className="text-gray-500">
          Skip this step
        </Button>
      </div>
    </div>
  )
}
