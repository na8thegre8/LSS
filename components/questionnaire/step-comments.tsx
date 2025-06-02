"use client"

import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export default function CommentsStep({
  value,
  onChange,
  onContinue,
}: {
  value: string
  onChange: (value: string) => void
  onContinue: () => void
}) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-center">Anything else we should know?</h2>

      <Textarea
        placeholder="Add any specific requirements or questions (optional)"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-[120px] mb-6"
        maxLength={120}
      />

      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">{value.length}/120 characters</span>
        <Button variant="ghost" onClick={onContinue} className="text-gray-500">
          Skip this step
        </Button>
      </div>
    </div>
  )
}
