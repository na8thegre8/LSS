"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Warehouse, Building2, Store, Wrench } from "lucide-react" // Correct lucide-react imports

interface SpaceTypeStepProps {
  value: string
  onChange: (value: string) => void
  onSelectionMade?: () => void // New prop for auto-advancing
}

const spaceTypes = [
  {
    id: "warehouse",
    title: "Warehouse",
    description: "Storage, distribution, light manufacturing",
    icon: <Warehouse className="h-8 w-8" />,
    examples: "Loading docks, high ceilings, drive-in doors",
  },
  {
    id: "flex",
    title: "Flex Space",
    description: "Office + warehouse combo",
    icon: <Building2 className="h-8 w-8" />,
    examples: "Front office, back warehouse, versatile",
  },
  {
    id: "retail",
    title: "Retail/Storefront",
    description: "Customer-facing businesses",
    icon: <Store className="h-8 w-8" />,
    examples: "Street visibility, parking, foot traffic",
  },
  {
    id: "workshop",
    title: "Workshop/Shop",
    description: "Trades, repair, manufacturing",
    icon: <Wrench className="h-8 w-8" />,
    examples: "Heavy power, ventilation, equipment space",
  },
]

export default function SpaceTypeStep({ value, onChange, onSelectionMade }: SpaceTypeStepProps) {
  const handleSelect = (typeId: string) => {
    onChange(typeId)
    if (onSelectionMade) {
      // Call onSelectionMade after a short delay to allow UI to update if needed
      // and for the user to see their selection briefly.
      setTimeout(() => {
        onSelectionMade()
      }, 300) // 300ms delay, adjust as needed
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">What type of space do you need?</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">Choose the option that best fits your business</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {spaceTypes.map((type) => (
          <Card
            key={type.id}
            className={`cursor-pointer transition-all hover:shadow-lg ${
              value === type.id
                ? "ring-2 ring-blue-600 shadow-lg dark:ring-blue-500 bg-blue-50 dark:bg-slate-800"
                : "hover:shadow-md dark:bg-slate-800 dark:hover:bg-slate-700"
            }`}
            onClick={() => handleSelect(type.id)}
            tabIndex={0} // Make it focusable
            onKeyPress={(e) => {
              if (e.key === "Enter" || e.key === " ") handleSelect(type.id)
            }} // Allow selection with Enter/Space
          >
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div
                  className={`p-3 rounded-lg ${
                    value === type.id
                      ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
                      : "bg-gray-100 text-gray-600 dark:bg-slate-700 dark:text-gray-300"
                  }`}
                >
                  {type.icon}
                </div>

                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{type.title}</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">{type.description}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{type.examples}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
