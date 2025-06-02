"use client"

import { Button } from "@/components/ui/button"
import { Clock, Zap, Calendar, Users } from "lucide-react"

const timelineOptions = [
  {
    id: "asap",
    title: "ASAP",
    subtitle: "Within 1-2 weeks",
    icon: <Zap className="h-6 w-6" />,
    urgent: true,
    description: "Ready to move immediately",
  },
  {
    id: "30days",
    title: "Within 30 Days",
    subtitle: "This month",
    icon: <Clock className="h-6 w-6" />,
    urgent: false,
    description: "Planning ahead",
  },
  {
    id: "60days",
    title: "1-2 Months",
    subtitle: "Next quarter",
    icon: <Calendar className="h-6 w-6" />,
    urgent: false,
    description: "Strategic planning",
  },
  {
    id: "flexible",
    title: "Just Exploring",
    subtitle: "No rush",
    icon: <Users className="h-6 w-6" />,
    urgent: false,
    description: "Gathering information",
  },
]

export default function TimelineStep({
  value,
  onChange,
}: {
  value: string
  onChange: (value: string) => void
}) {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">When do you need to move in?</h2>
        <p className="text-lg text-gray-600">This helps us prioritize your search</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {timelineOptions.map((option) => (
          <Button
            key={option.id}
            variant={value === option.id ? "default" : "outline"}
            className={`h-24 p-6 flex flex-col items-start text-left relative ${
              value === option.id ? "bg-blue-600 hover:bg-blue-700" : ""
            }`}
            onClick={() => onChange(option.id)}
          >
            {option.urgent && (
              <div className="absolute top-2 right-2">
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">Priority</span>
              </div>
            )}

            <div className="flex items-center mb-2">
              <div className={`mr-3 ${value === option.id ? "text-white" : "text-blue-600"}`}>{option.icon}</div>
              <div>
                <div className="font-bold text-lg">{option.title}</div>
                <div className={`text-sm ${value === option.id ? "text-blue-100" : "text-gray-600"}`}>
                  {option.subtitle}
                </div>
              </div>
            </div>

            <div className={`text-sm ${value === option.id ? "text-blue-100" : "text-gray-500"}`}>
              {option.description}
            </div>
          </Button>
        ))}
      </div>
    </div>
  )
}
