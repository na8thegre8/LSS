"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Car, Users, Warehouse, ChevronDown, ChevronUp } from "lucide-react"

interface SizeVisualizerProps {
  size: number // in square feet
}

export function SizeVisualizer({ size }: SizeVisualizerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Calculate dimensions based on square footage
  // Assuming a square space for simplicity
  const sideLength = Math.sqrt(size)

  // Scale factor (1 foot = 2 pixels)
  const scale = 2

  // Reference objects with their approximate sizes in square feet
  const referenceObjects = [
    { name: "Parking Space", size: 180, icon: Car, count: Math.floor(size / 180) },
    { name: "Office Desk", size: 30, icon: Users, count: Math.floor(size / 30) },
    { name: "Shipping Container", size: 320, icon: Warehouse, count: Math.floor(size / 320) },
  ]

  useEffect(() => {
    if (!isOpen || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Set canvas dimensions
    const maxDimension = Math.min(500, sideLength * scale)
    const canvasScale = maxDimension / (sideLength * scale)

    canvas.width = sideLength * scale * canvasScale
    canvas.height = sideLength * scale * canvasScale

    // Draw floor plan
    ctx.fillStyle = "#f3f4f6" // Light gray background
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw grid (10ft intervals)
    ctx.strokeStyle = "#e5e7eb"
    ctx.lineWidth = 1

    const gridSize = 10 * scale * canvasScale
    for (let x = 0; x <= canvas.width; x += gridSize) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, canvas.height)
      ctx.stroke()
    }

    for (let y = 0; y <= canvas.height; y += gridSize) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(canvas.width, y)
      ctx.stroke()
    }

    // Draw border
    ctx.strokeStyle = "#6b7280"
    ctx.lineWidth = 2
    ctx.strokeRect(0, 0, canvas.width, canvas.height)

    // Add dimensions text
    ctx.fillStyle = "#111827"
    ctx.font = "bold 14px sans-serif"
    ctx.textAlign = "center"

    // Width dimension
    ctx.fillText(`${Math.round(sideLength)}′`, canvas.width / 2, canvas.height - 10)

    // Height dimension
    ctx.save()
    ctx.translate(10, canvas.height / 2)
    ctx.rotate(-Math.PI / 2)
    ctx.fillText(`${Math.round(sideLength)}′`, 0, 0)
    ctx.restore()

    // Draw a human figure for scale (6ft tall)
    const humanHeight = 6 * scale * canvasScale
    const humanWidth = 2 * scale * canvasScale

    ctx.fillStyle = "#ED4337"
    ctx.beginPath()
    // Head
    ctx.arc(humanWidth * 2, humanHeight * 0.85, humanWidth / 2, 0, Math.PI * 2)
    // Body
    ctx.fillRect(humanWidth * 1.5, humanHeight * 0.85, humanWidth, humanHeight * 0.5)
    ctx.fill()

    // Add "for scale" text
    ctx.fillStyle = "#111827"
    ctx.font = "12px sans-serif"
    ctx.fillText("Person for scale (6′)", humanWidth * 2, humanHeight * 1.5)
  }, [isOpen, size, sideLength, scale])

  return (
    <div className="mt-4 border rounded-lg overflow-hidden">
      <Button
        variant="ghost"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-4"
      >
        <span className="font-medium">Visualize {size.toLocaleString()} sq ft</span>
        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </Button>

      {isOpen && (
        <div className="p-4 border-t">
          <div className="flex justify-center mb-4">
            <canvas ref={canvasRef} className="border rounded shadow-sm" style={{ maxWidth: "100%" }}></canvas>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-4">
            {referenceObjects.map((obj, i) => (
              <div key={i} className="text-center p-2 border rounded-lg bg-gray-50">
                <obj.icon className="mx-auto h-8 w-8 text-gray-600 mb-1" />
                <p className="text-sm font-medium">{obj.name}</p>
                <p className="text-xs text-gray-500">{obj.size} sq ft each</p>
                <p className="text-sm font-bold text-[#ED4337]">Fits {obj.count}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
