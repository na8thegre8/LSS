"use client"

import { useEffect, useState, useCallback } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Loader2 } from "lucide-react"
import Download from "lucide-react" // Import Download component

interface Lead {
  id: string
  email: string | null
  full_name?: string | null // Mapped from 'name' field in leads table
  phone?: string | null
  created_at: string
  source?: string | null
  page_captured?: string | null
}

interface Inquiry {
  id: string
  full_name?: string | null
  email?: string | null
  phone?: string | null
  message?: string | null
  created_at: string
  inquiry_type?: string | null
}

interface QuestionnaireResponse {
  id: string
  user_id: string | null
  inquiry_id: string | null
  responses: any // Typically a JSON object
  space_type: string | null
  location_preference: string | null
  size_min: number | null
  size_max: number | null
  budget_min: number | null
  budget_max: number | null
  timeline: string | null
  lease_or_buy: string | null
  completed_at: string | null
  created_at: string
  // Nested user data from the join
  users?: {
    full_name: string | null
    email: string | null
    phone: string | null
  } | null
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [questionnaireResponses, setQuestionnaireResponses] = useState<QuestionnaireResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedResponse, setSelectedResponse] = useState<QuestionnaireResponse | null>(null)
  const [itemCount, setItemCount] = useState(0)
  const supabase = createClientComponentClient()

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      // Fetch leads
      const { data: leadsData, error: leadsError } = await supabase
        .from("leads")
        .select("id, email, name, phone, created_at, source, page_captured")
        .order("created_at", { ascending: false })

      if (leadsError) {
        console.error("Error fetching leads:", leadsError.message)
      } else {
        setLeads((leadsData || []).map((lead) => ({ ...lead, full_name: lead.name })))
      }

      // Fetch inquiries
      const { data: inquiriesData, error: inquiriesError } = await supabase
        .from("inquiries")
        .select("id, full_name, email, phone, message, created_at, inquiry_type")
        .order("created_at", { ascending: false })

      if (inquiriesError) {
        console.error("Error fetching inquiries:", inquiriesError.message)
      } else {
        setInquiries(inquiriesData || [])
      }

      // Fetch questionnaire responses with user data
      const { data: responsesData, error: responsesError } = await supabase
        .from("questionnaire_responses")
        .select(`
           id, user_id, inquiry_id, responses, space_type, location_preference,
           size_min, size_max, budget_min, budget_max, timeline, lease_or_buy,
           completed_at, created_at,
           users:user_id (
             full_name,
             email,
             phone
           )
         `)
        .order("created_at", { ascending: false })

      if (responsesError) {
        console.error("Error fetching questionnaire responses:", responsesError.message)
      } else {
        setQuestionnaireResponses(responsesData || [])
      }
    } catch (error: any) {
      console.error("Error fetching data:", error.message)
    } finally {
      setLoading(false)
    }
  }, [supabase])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  useEffect(() => {
    const fetchCount = async () => {
      setLoading(true)
      try {
        // Basic count query, less likely to cause issues
        const { count, error } = await supabase
          .from("questionnaire_responses")
          .select("*", { count: "exact", head: true })

        if (error) {
          console.error("Error fetching count:", error.message)
        }
        setItemCount(count || 0)
      } catch (e: any) {
        console.error("Fetch count exception:", e.message)
      } finally {
        setLoading(false)
      }
    }
    fetchCount()
  }, [supabase])

  const exportToCSV = (data: any[], filename: string) => {
    if (!data || data.length === 0) {
      console.warn("No data to export for", filename)
      return
    }

    // Dynamically generate headers from the first object, excluding complex objects like 'users' or 'responses'
    // unless they are specifically handled.
    const simpleHeaders = Object.keys(data[0]).filter(
      (header) => typeof data[0][header] !== "object" || data[0][header] === null,
    )

    // Add specific headers for nested objects if needed, e.g., user details
    let allHeaders = [...simpleHeaders]
    if (filename.includes("questionnaire")) {
      allHeaders = [
        "id",
        "name",
        "email",
        "phone",
        "space_type",
        "location_preference",
        "size_min",
        "size_max",
        "budget_min",
        "budget_max",
        "timeline",
        "lease_or_buy",
        "completed_at",
        "created_at",
        "responses_summary",
      ]
    } else if (filename.includes("inquiries")) {
      allHeaders = ["id", "full_name", "email", "phone", "message", "created_at", "inquiry_type"]
    } else if (filename.includes("leads")) {
      allHeaders = ["id", "full_name", "email", "phone", "created_at", "source", "page_captured"]
    }

    const csvRows = [
      allHeaders.join(","), // Header row
      ...data.map((row) => {
        return allHeaders
          .map((header) => {
            let cellValue
            if (filename.includes("questionnaire")) {
              // Special handling for questionnaire data
              if (header === "name") cellValue = row.users?.full_name
              else if (header === "email") cellValue = row.users?.email
              else if (header === "phone") cellValue = row.users?.phone
              else if (header === "responses_summary")
                cellValue = row.responses ? JSON.stringify(row.responses).substring(0, 50) + "..." : "" // Example summary
              else cellValue = row[header]
            } else {
              cellValue = row[header]
            }

            cellValue = cellValue === null || cellValue === undefined ? "" : cellValue
            // Stringify if it's an object (like 'responses' if not summarized)
            if (typeof cellValue === "object" && cellValue !== null) {
              cellValue = JSON.stringify(cellValue)
            }
            // Escape commas within a cell value
            return typeof cellValue === "string" && cellValue.includes(",") ? `"${cellValue}"` : String(cellValue)
          })
          .join(",")
      }),
    ]

    const csvString = csvRows.join("\n")
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", filename)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url) // Clean up
  }

  const exportQuestionnaireResponsesCSV = () => {
    const dataToExport = questionnaireResponses.map((response) => ({
      id: response.id,
      name: response.users?.full_name || "N/A",
      email: response.users?.email || "N/A",
      phone: response.users?.phone || "N/A",
      space_type: response.space_type || "N/A",
      location_preference: response.location_preference || "N/A",
      size_min: response.size_min,
      size_max: response.size_max,
      budget_min: response.budget_min,
      budget_max: response.budget_max,
      timeline: response.timeline || "N/A",
      lease_or_buy: response.lease_or_buy || "N/A",
      completed_at: response.completed_at ? new Date(response.completed_at).toLocaleDateString() : "N/A",
      created_at: new Date(response.created_at).toLocaleDateString(),
      responses: response.responses, // Keep as object for detailed export, or summarize
    }))
    exportToCSV(dataToExport, "leasesmallspace-questionnaire-responses.csv")
  }

  const exportInquiriesCSV = () => {
    exportToCSV(
      inquiries.map((i) => ({ ...i, created_at: new Date(i.created_at).toLocaleDateString() })),
      "leasesmallspace-inquiries.csv",
    )
  }

  const exportLeadsCSV = () => {
    exportToCSV(
      leads.map((l) => ({ ...l, created_at: new Date(l.created_at).toLocaleDateString() })),
      "leasesmallspace-leads.csv",
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen p-6">
        <Loader2 className="h-8 w-8 animate-spin text-green-600" />
        <p className="ml-2">Loading Leads Data...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Leads Management</h2>
          <p className="mt-1 text-sm text-gray-600">View and manage all leads and inquiries from LeaseSmallSpace.com</p>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Questionnaire Responses</h2>
        <p className="text-2xl font-bold text-green-600 mt-2">{itemCount}</p>
        <p className="text-sm text-gray-500">Total Submissions</p>
      </div>
      <p className="text-sm text-gray-500 mt-4">
        Further details and management features (tabs, modals, CSV export) are temporarily disabled to ensure
        deployment. These will be re-implemented in a new chat session.
      </p>
      <Tabs defaultValue="questionnaire-responses" className="space-y-4">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-3">
          <TabsTrigger value="questionnaire-responses">
            Questionnaire Responses ({questionnaireResponses.length})
          </TabsTrigger>
          <TabsTrigger value="inquiries">General Inquiries ({inquiries.length})</TabsTrigger>
          <TabsTrigger value="leads">Lead Captures ({leads.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="questionnaire-responses" className="space-y-4">
          <div className="flex justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={exportQuestionnaireResponsesCSV}
              disabled={questionnaireResponses.length === 0}
            >
              <Download className="mr-2 h-4 w-4" />
              Export Detailed CSV
            </Button>
          </div>
          {questionnaireResponses.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center text-gray-500">No questionnaire responses yet.</CardContent>
            </Card>
          ) : (
            <div className="rounded-md border">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      {[
                        "Name",
                        "Email",
                        "Phone",
                        "Space Type",
                        "Size Range",
                        "Location",
                        "Budget Range",
                        "Timeline",
                        "Lease/Buy",
                        "Date",
                        "Actions",
                      ].map((header) => (
                        <th
                          key={header}
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {questionnaireResponses.map((response) => (
                      <tr key={response.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {response.users?.full_name || "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {response.users?.email || "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {response.users?.phone || "N/A"}
                        </td>
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
                          {response.budget_min && response.budget_max
                            ? `$${response.budget_min.toLocaleString()} - $${response.budget_max.toLocaleString()}`
                            : "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {response.timeline || "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {response.lease_or_buy || "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(response.completed_at || response.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <Dialog
                            onOpenChange={(open) => {
                              if (open) setSelectedResponse(response)
                              else setSelectedResponse(null)
                            }}
                          >
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                View Details
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle>Questionnaire Response Details</DialogTitle>
                              </DialogHeader>
                              {selectedResponse && selectedResponse.id === response.id && (
                                <div className="space-y-4 mt-4">
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                      <h4 className="font-semibold">Contact</h4>
                                      <p>
                                        <strong>Name:</strong> {selectedResponse.users?.full_name || "N/A"}
                                      </p>
                                      <p>
                                        <strong>Email:</strong> {selectedResponse.users?.email || "N/A"}
                                      </p>
                                      <p>
                                        <strong>Phone:</strong> {selectedResponse.users?.phone || "N/A"}
                                      </p>
                                    </div>
                                    <div>
                                      <h4 className="font-semibold">Space Needs</h4>
                                      <p>
                                        <strong>Type:</strong> {selectedResponse.space_type || "N/A"}
                                      </p>
                                      <p>
                                        <strong>Size:</strong>{" "}
                                        {selectedResponse.size_min && selectedResponse.size_max
                                          ? `${selectedResponse.size_min.toLocaleString()} - ${selectedResponse.size_max.toLocaleString()} sq ft`
                                          : "N/A"}
                                      </p>
                                      <p>
                                        <strong>Location:</strong> {selectedResponse.location_preference || "N/A"}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                      <h4 className="font-semibold">Budget & Timeline</h4>
                                      <p>
                                        <strong>Budget:</strong>{" "}
                                        {selectedResponse.budget_min && selectedResponse.budget_max
                                          ? `$${selectedResponse.budget_min.toLocaleString()} - $${selectedResponse.budget_max.toLocaleString()}`
                                          : "N/A"}
                                      </p>
                                      <p>
                                        <strong>Timeline:</strong> {selectedResponse.timeline || "N/A"}
                                      </p>
                                      <p>
                                        <strong>Lease/Buy:</strong> {selectedResponse.lease_or_buy || "N/A"}
                                      </p>
                                    </div>
                                    <div>
                                      <h4 className="font-semibold">Submission</h4>
                                      <p>
                                        <strong>Date:</strong>{" "}
                                        {new Date(
                                          selectedResponse.completed_at || selectedResponse.created_at,
                                        ).toLocaleString()}
                                      </p>
                                    </div>
                                  </div>
                                  {selectedResponse.responses && (
                                    <div>
                                      <h4 className="font-semibold">Full Response (JSON)</h4>
                                      <pre className="text-xs bg-gray-100 p-3 rounded overflow-x-auto max-h-60">
                                        {JSON.stringify(selectedResponse.responses, null, 2)}
                                      </pre>
                                    </div>
                                  )}
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
          )}
        </TabsContent>

        <TabsContent value="inquiries" className="space-y-4">
          <div className="flex justify-end">
            <Button variant="outline" size="sm" onClick={exportInquiriesCSV} disabled={inquiries.length === 0}>
              <Download className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
          </div>
          {inquiries.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center text-gray-500">No general inquiries yet.</CardContent>
            </Card>
          ) : (
            <div className="rounded-md border">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      {["Name", "Email", "Phone", "Date", "Message"].map((header) => (
                        <th
                          key={header}
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {inquiries.map((inquiry) => (
                      <tr key={inquiry.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {inquiry.full_name || "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{inquiry.email || "N/A"}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{inquiry.phone || "N/A"}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(inquiry.created_at).toLocaleDateString()}
                        </td>
                        <td
                          className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate"
                          title={inquiry.message || undefined}
                        >
                          {inquiry.message || "N/A"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="leads" className="space-y-4">
          <div className="flex justify-end">
            <Button variant="outline" size="sm" onClick={exportLeadsCSV} disabled={leads.length === 0}>
              <Download className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
          </div>
          {leads.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center text-gray-500">No lead captures yet.</CardContent>
            </Card>
          ) : (
            <div className="rounded-md border">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      {["Name", "Email", "Phone", "Source", "Date"].map((header) => (
                        <th
                          key={header}
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {leads.map((lead) => (
                      <tr key={lead.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {lead.full_name || "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lead.email || "N/A"}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lead.phone || "N/A"}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {lead.source || lead.page_captured || "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(lead.created_at).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
