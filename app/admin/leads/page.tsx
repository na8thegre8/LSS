"use client"

import { useEffect, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

export default function LeadsPage() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const supabase = createClientComponentClient()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: responses } = await supabase
          .from("questionnaire_responses")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(50)

        setData(responses || [])
      } catch (error) {
        console.error("Error:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [supabase])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Questionnaire Responses ({data.length})</h2>

      <Card>
        <CardContent className="pt-6">
          {data.length === 0 ? (
            <p className="text-center text-gray-500">No responses yet.</p>
          ) : (
            <div className="space-y-4">
              {data.map((item, index) => (
                <div key={index} className="border-b pb-4">
                  <p>
                    <strong>Space Type:</strong> {item.space_type || "N/A"}
                  </p>
                  <p>
                    <strong>Location:</strong> {item.location_preference || "N/A"}
                  </p>
                  <p>
                    <strong>Date:</strong> {new Date(item.created_at).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
