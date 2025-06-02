"use client"

import { useEffect, useState, useCallback, Suspense } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Loader2, Download, Eye, ChevronLeft, ChevronRight } from "lucide-react"

interface QuestionnaireResponse {
  id: string
  user_id: string
  inquiry_id: string
  responses: any
  space_type: string
  location_preference: string
  size_min: number
  size_max: number
  budget_min: number
  budget_max: number
  timeline: string
  lease_or_buy: string
  completed_at: string
  created_at: string
  full_name?: string
  email?: string
  phone?: string
}

const ITEMS_PER_PAGE = 10

// Loading placeholder component
function LoadingPlaceholder() {
  return (
    <div className="flex items-center justify-center h-64">
      <Loader2 className="h-8 w-8 animate-spin text-green-600" />
    </div>
  )
}

export default function LeadsPage() {
  const [questionnaireResponses, setQuestionnaireResponses] = useState<QuestionnaireResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedResponse, setSelectedResponse] = useState<QuestionnaireResponse | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const [exporting, setExporting] = useState(false)
  const supabase = createClientComponentClient()

  const fetchQuestionnaireResponses = useCallback(
    async (page = 1) => {
      try {
        setLoading(true)
        const from = (page - 1) * ITEMS_PER_PAGE
        const to = from + ITEMS_PER_PAGE - 1

        // Get count first (separate query for better performance)
        const { count } = await supabase.from("questionnaire_responses").select("*", { count: "exact", head: true })

        setTotalCount(count || 0)

        // Direct SQL query with JOIN for better performance
        const { data, error } = await supabase.rpc("get_questionnaire_responses_with_users", {
          page_size: ITEMS_PER_PAGE,
          page_number: page,
        })

        if (error) {
          console.error("Error fetching questionnaire responses:", error)
          // Fallback to regular query if RPC fails
          const { data: fallbackData, error: fallbackError } = await supabase
            .from("questionnaire_responses")
            .select(`
              *,
              users:user_id (
                full_name,
                email,
                phone
              )
            `)
            .order("created_at", { ascending: false })
            .range(from, to)

          if (fallbackError) {
            console.error("Fallback query also failed:", fallbackError)
          } else {
            // Transform the fallback data to match our expected format
            const transformedData = fallbackData.map((item) => ({
              ...item,
              full_name: item.users?.full_name || null,
              email: item.users?.email || null,
              phone: item.users?.phone || null,
            }))
            setQuestionnaireResponses(transformedData || [])
          }
        } else {
          setQuestionnaireResponses(data || [])
        }
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    },
    [supabase],
  )

  useEffect(() => {
    fetchQuestionnaireResponses(currentPage)
  }, [fetchQuestionnaireResponses, currentPage])

  const exportQuestionnaireResponses = async () => {
    try {
      setExporting(true)

      // Use the RPC function for export too
      const { data: allData, error } = await supabase.rpc("get_all_questionnaire_responses_with_users")

      if (error) {
        console.error("Error fetching export data:", error)
        return
      }

      const flattenedData = (allData || []).map((response) => ({
        id: response.id,
        name: response.full_name || "N/A",
        email: response.email || "N/A",
        phone: response.phone || "N/A",
        space_type: response.space_type,
        location_preference: response.location_preference,
        size_min: response.size_min,
        size_max: response.size_max,
        budget_min: response.budget_min,
        budget_max: response.budget_max,
        timeline: response.timeline,
        lease_or_buy: response.lease_or_buy,
        completed_at: response.completed_at,
        created_at: response.created_at,
        // Flatten the responses JSON
        ...(response.responses || {}),
      }))

      // Export to CSV
      if (flattenedData.length === 0) return

      const headers = Object.keys(flattenedData[0])
      const csvRows = [
        headers.join(","),
        ...flattenedData.map((row) =>
          headers
            .map((header) => {
              const cell = row[header] === null ? "" : row[header]
              return typeof cell === "string" && cell.includes(",") ? `"${cell}"` : cell
            })
            .join(","),
        ),
      ]

      const csvString = csvRows.join("\n")
      const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" })

      const link = document.createElement("a")
      const url = URL.createObjectURL(blob)
      link.setAttribute("href", url)
      link.setAttribute("download", "leasesmallspace-questionnaire-responses.csv")
      link.style.visibility = "hidden"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error("Error exporting data:", error)
    } finally {
      setExporting(false)
    }
  }

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Questionnaire Responses</h2>
          <p className="mt-1 text-sm text-gray-600">
            View and manage all questionnaire responses from LeaseSmallSpace.com ({totalCount} total)
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={exportQuestionnaireResponses}
          disabled={exporting || totalCount === 0}
        >
          {exporting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
          Export All CSV
        </Button>
      </div>

      <Suspense fallback={<LoadingPlaceholder />}>
        {loading ? (
          <LoadingPlaceholder />
        ) : questionnaireResponses.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-gray-500">No questionnaire responses yet.</p>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="rounded-md border">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Space Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Size Range
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Location
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {questionnaireResponses.map((response) => (
                      <tr key={response.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {response.full_name || "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{response.email || "N/A"}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {response.space_type || "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {response.size_min && response.size_max
                            ? `${response.size_min.toLocaleString()} - ${response.size_max.toLocaleString()} sq ft`
                            : "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {response.location_preference || "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(response.completed_at || response.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" onClick={() => setSelectedResponse(response)}>
                                <Eye className="h-4 w-4 mr-1" />
                                View
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle>Questionnaire Response Details</DialogTitle>
                              </DialogHeader>
                              {selectedResponse && (
                                <div className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <h4 className="font-semibold text-gray-900">Contact Information</h4>
                                      <p className="text-sm text-gray-600">
                                        <strong>Name:</strong> {selectedResponse.full_name || "N/A"}
                                      </p>
                                      <p className="text-sm text-gray-600">
                                        <strong>Email:</strong> {selectedResponse.email || "N/A"}
                                      </p>
                                      <p className="text-sm text-gray-600">
                                        <strong>Phone:</strong> {selectedResponse.phone || "N/A"}
                                      </p>
                                    </div>
                                    <div>
                                      <h4 className="font-semibold text-gray-900">Space Requirements</h4>
                                      <p className="text-sm text-gray-600">
                                        <strong>Space Type:</strong> {selectedResponse.space_type || "N/A"}
                                      </p>
                                      <p className="text-sm text-gray-600">
                                        <strong>Size:</strong>{" "}
                                        {selectedResponse.size_min && selectedResponse.size_max
                                          ? `${selectedResponse.size_min.toLocaleString()} - ${selectedResponse.size_max.toLocaleString()} sq ft`
                                          : "N/A"}
                                      </p>
                                      <p className="text-sm text-gray-600">
                                        <strong>Location:</strong> {selectedResponse.location_preference || "N/A"}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <h4 className="font-semibold text-gray-900">Budget & Timeline</h4>
                                      <p className="text-sm text-gray-600">
                                        <strong>Budget:</strong>{" "}
                                        {selectedResponse.budget_min && selectedResponse.budget_max
                                          ? `$${selectedResponse.budget_min.toLocaleString()} - $${selectedResponse.budget_max.toLocaleString()}`
                                          : "N/A"}
                                      </p>
                                      <p className="text-sm text-gray-600">
                                        <strong>Timeline:</strong> {selectedResponse.timeline || "N/A"}
                                      </p>
                                      <p className="text-sm text-gray-600">
                                        <strong>Lease/Buy:</strong> {selectedResponse.lease_or_buy || "N/A"}
                                      </p>
                                    </div>
                                    <div>
                                      <h4 className="font-semibold text-gray-900">Submission Info</h4>
                                      <p className="text-sm text-gray-600">
                                        <strong>Completed:</strong>{" "}
                                        {new Date(
                                          selectedResponse.completed_at || selectedResponse.created_at,
                                        ).toLocaleString()}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-700">
                  Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{" "}
                  {Math.min(currentPage * ITEMS_PER_PAGE, totalCount)} of {totalCount} results
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>
                  <span className="text-sm text-gray-700">
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </Suspense>
    </div>
  )
}
