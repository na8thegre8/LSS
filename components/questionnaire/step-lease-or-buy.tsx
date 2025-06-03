"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Home, Key, Clock } from "lucide-react"

interface LeaseOrBuyStepProps {
  value: string
  onChange: (value: string) => void
  onSelectionMade?: () => void
}

const options = [
  {
    id: "lease",
    title: "Lease",
    subtitle: "Rent monthly",
    description: "Flexible terms, quick move-in",
    icon: <Key className="h-8 w-8" />,
    popular: true,
    benefits: ["Move in fast", "Flexible terms", "No large down payment"],
  },
  {
    id: "buy",
    title: "Buy",
    subtitle: "Purchase property",
    description: "Build equity, long-term investment",
    icon: <Home className="h-8 w-8" />,
    popular: false,
    benefits: ["Build equity", "Tax benefits", "Long-term stability"],
  },
]

export default function LeaseOrBuyStep({ value, onChange, onSelectionMade }: LeaseOrBuyStepProps) {
  const handleSelect = (optionId: string) => {
    onChange(optionId)
    if (onSelectionMade) {
      // Adding a small delay for UI feedback before advancing
      setTimeout(() => onSelectionMade(), 300)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Looking to lease or buy?</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">We have both options available across Colorado</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {options.map((option) => (
          <Card
            key={option.id}
            className={`cursor-pointer transition-all hover:shadow-lg relative ${
              value === option.id
                ? "ring-2 ring-blue-600 shadow-lg dark:ring-blue-500 bg-blue-50 dark:bg-slate-800"
                : "hover:shadow-md dark:bg-slate-800 dark:hover:bg-slate-700"
            }`}
            onClick={() => handleSelect(option.id)}
            tabIndex={0}
            onKeyPress={(e) => {
              if (e.key === "Enter" || e.key === " ") handleSelect(option.id)
            }}
          >
            {option.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-600 text-white text-sm font-bold px-3 py-1 rounded-full">Most Popular</span>
              </div>
            )}

            <CardContent className="p-8 text-center">
              <div
                className={`inline-flex p-4 rounded-full mb-4 ${
                  value === option.id
                    ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
                    : "bg-gray-100 text-gray-600 dark:bg-slate-700 dark:text-gray-300"
                }`}
              >
                {option.icon}
              </div>

              <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">{option.title}</h3>
              <p className="text-blue-600 dark:text-blue-400 font-medium mb-3">{option.subtitle}</p>
              <p className="text-gray-600 dark:text-gray-300 mb-6">{option.description}</p>

              <div className="space-y-2">
                {option.benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-center text-sm text-gray-700 dark:text-gray-300"
                  >
                    <Clock className="h-4 w-4 mr-2 text-green-500" />
                    {benefit}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center mt-8">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Not sure? Our team can help you decide what's best for your business.
        </p>
      </div>
    </div>
  )
}
