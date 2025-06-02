"use client"

import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { DriveInDoorIcon, DockHighIcon } from "@/components/icons/space-type-icons"
import { ArrowUpDownIcon as ArrowsUpDown, X } from "lucide-react"

type AccessOption = {
  id: string
  label: string
  icon: React.ReactNode
}

const accessOptions: AccessOption[] = [
  {
    id: "drive-in",
    label: "Drive-In",
    icon: <DriveInDoorIcon className="h-10 w-10" />,
  },
  {
    id: "dock-high",
    label: "Dock-High",
    icon: <DockHighIcon className="h-10 w-10" />,
  },
  {
    id: "either",
    label: "Either",
    icon: <ArrowsUpDown className="h-10 w-10" />,
  },
  {
    id: "none",
    label: "None",
    icon: <X className="h-10 w-10" />,
  },
]

export default function AccessNeedsStep({
  value,
  onChange,
}: {
  value: string
  onChange: (value: string) => void
}) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-center">Loading style?</h2>

      <div className="grid grid-cols-2 gap-4">
        {accessOptions.map((option) => (
          <Card
            key={option.id}
            className={`cursor-pointer transition-all hover:shadow-md ${
              value === option.id ? "ring-2 ring-[#ED4337]" : ""
            }`}
            onClick={() => onChange(option.id)}
          >
            <CardContent className="p-6 flex flex-col items-center justify-center text-center">
              <div
                className={`p-4 rounded-full mb-3 ${
                  value === option.id ? "bg-[#ED4337]/10 text-[#ED4337]" : "bg-gray-100 text-gray-500"
                }`}
              >
                {option.icon}
              </div>
              <h3 className="font-medium text-lg">{option.label}</h3>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
