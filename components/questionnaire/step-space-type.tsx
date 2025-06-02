"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Warehouse, Building2, Store, Wrench } from "lucide-react"

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

export default function SpaceTypeStep({
  value,
  onChange,
}: {
  value: string
  onChange: (value: string) => void
}) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">What type of space do you need?</h2>
        <p className="text-lg text-gray-600">Choose the option that best fits your business</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {spaceTypes.map((type) => (
          <Card
            key={type.id}
            className={`cursor-pointer transition-all hover:shadow-lg ${
              value === type.id ? "ring-2 ring-blue-600 shadow-lg" : "hover:shadow-md"
            }`}
            onClick={() => onChange(type.id)}
          >
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div
                  className={`p-3 rounded-lg ${
                    value === type.id ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {type.icon}
                </div>

                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">{type.title}</h3>
                  <p className="text-gray-700 mb-3">{type.description}</p>
                  <p className="text-sm text-gray-500">{type.examples}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
