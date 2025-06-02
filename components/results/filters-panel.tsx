"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { X } from "lucide-react"

type SearchParams = {
  zip: string
  type: string
  size: number
  budget: number
  timeline: string
  features: string[]
}

export default function FiltersPanel({
  searchParams,
  onClose,
}: {
  searchParams: SearchParams
  onClose: () => void
}) {
  return (
    <div className="bg-white border-b shadow-md p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Filters</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Location */}
          <div>
            <Label htmlFor="location" className="text-sm font-medium">
              Location
            </Label>
            <Input id="location" placeholder="ZIP or City" defaultValue={searchParams.zip} className="mt-1" />
          </div>

          {/* Space Type */}
          <div>
            <Label className="text-sm font-medium">Space Type</Label>
            <div className="grid grid-cols-2 gap-2 mt-1">
              <div className="flex items-center space-x-2">
                <Checkbox id="type-warehouse" defaultChecked={searchParams.type === "warehouse"} />
                <Label htmlFor="type-warehouse" className="text-sm">
                  Warehouse
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="type-industrial" defaultChecked={searchParams.type === "industrial"} />
                <Label htmlFor="type-industrial" className="text-sm">
                  Industrial
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="type-shop" defaultChecked={searchParams.type === "shop"} />
                <Label htmlFor="type-shop" className="text-sm">
                  Shop
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="type-mixed" defaultChecked={searchParams.type === "mixed-use"} />
                <Label htmlFor="type-mixed" className="text-sm">
                  Mixed-Use
                </Label>
              </div>
            </div>
          </div>

          {/* Size */}
          <div>
            <Label className="text-sm font-medium">Size (sq ft)</Label>
            <div className="mt-4">
              <Slider defaultValue={[searchParams.size]} min={500} max={7500} step={100} className="py-4" />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>500</span>
                <span>7,500</span>
              </div>
            </div>
          </div>

          {/* Price */}
          <div>
            <Label className="text-sm font-medium">Monthly Budget</Label>
            <div className="mt-4">
              <Slider defaultValue={[searchParams.budget || 3000]} min={1000} max={10000} step={100} className="py-4" />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>$1,000</span>
                <span>$10,000+</span>
              </div>
            </div>
          </div>

          {/* Features */}
          <div>
            <Label className="text-sm font-medium">Features</Label>
            <div className="grid grid-cols-2 gap-2 mt-1">
              <div className="flex items-center space-x-2">
                <Checkbox id="feature-dock" defaultChecked={searchParams.features.includes("dock-high")} />
                <Label htmlFor="feature-dock" className="text-sm">
                  Dock-High Door
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="feature-drive" defaultChecked={searchParams.features.includes("drive-in")} />
                <Label htmlFor="feature-drive" className="text-sm">
                  Drive-In Door
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="feature-office" defaultChecked={searchParams.features.includes("office")} />
                <Label htmlFor="feature-office" className="text-sm">
                  Office Space
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="feature-power" defaultChecked={searchParams.features.includes("power")} />
                <Label htmlFor="feature-power" className="text-sm">
                  Heavy Power
                </Label>
              </div>
            </div>
          </div>

          {/* Deal Score */}
          <div>
            <Label className="text-sm font-medium">Deal Score</Label>
            <div className="grid grid-cols-3 gap-2 mt-1">
              <div className="flex items-center space-x-2">
                <Checkbox id="score-great" defaultChecked />
                <Label htmlFor="score-great" className="text-sm">
                  <span className="inline-block w-3 h-3 rounded-full bg-[#00A550] mr-1"></span>
                  Great
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="score-fair" defaultChecked />
                <Label htmlFor="score-fair" className="text-sm">
                  <span className="inline-block w-3 h-3 rounded-full bg-[#F6C651] mr-1"></span>
                  Fair
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="score-over" defaultChecked />
                <Label htmlFor="score-over" className="text-sm">
                  <span className="inline-block w-3 h-3 rounded-full bg-[#B0132B] mr-1"></span>
                  Over Market
                </Label>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6 gap-2">
          <Button variant="outline">Reset</Button>
          <Button className="bg-[#ED4337] hover:bg-[#d13a30] text-white">Apply Filters</Button>
        </div>
      </div>
    </div>
  )
}
