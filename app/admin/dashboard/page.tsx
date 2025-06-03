"use client"

import { useEffect, useState, useCallback } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs" // Standardized import
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, UserCog, Activity, TrendingUp, Loader2, Eye, Download, Plus, Mail, Phone } from "lucide-react"
import Link from "next/link"

interface DashboardStats {
  totalLeads: number
  totalInquiries: number
  adminUsers: number
  recentActivity: number
}

interface RecentLead {
  id: string
  name: string | null // From 'name' column in 'leads' table
  email: string | null
  phone?: string | null
  created_at: string
  source?: string | null
  page_captured?: string | null
}

interface RecentInquiry {
  id: string
  full_name: string | null // From 'full_name' column in 'inquiries' table
  email: string | null
  phone?: string | null
  created_at: string
  inquiry_type?: string | null
  message?: string | null
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalLeads: 0,
    totalInquiries: 0,
    adminUsers: 0,
    recentActivity: 0,
  })
  const [recentLeads, setRecentLeads] = useState<RecentLead[]>([])
  const [recentInquiries, setRecentInquiries] = useState<RecentInquiry[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClientComponentClient()

  const fetchDashboardData = useCallback(async () => {
    setLoading(true)
    try {
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)

      const results = await Promise.all([
        supabase.from("leads").select("*", { count: "exact", head: true }),
        supabase.from("inquiries").select("*", { count: "exact", head: true }),
        supabase.from("admin_users").select("*", { count: "exact", head: true }),
        supabase
          .from("inquiries")
          .select("*", { count: "exact", head: true })
          .gte("created_at", yesterday.toISOString()),
        supabase
          .from("leads")
          .select("id, name, email, phone, created_at, source, page_captured")
          .order("created_at", { ascending: false })
          .limit(5),
        supabase
          .from("inquiries")
          .select("id, full_name, email, phone, created_at, inquiry_type, message")
          .order("created_at", { ascending: false })
          .limit(3),
      ])

      const errors = results.map((r) => r.error).filter(Boolean)
      if (errors.length > 0) {
        errors.forEach((err) => console.error("Dashboard fetch error:", err?.message))
      }

      setStats({
        totalLeads: results[0].count || 0,
        totalInquiries: results[1].count || 0,
        adminUsers: results[2].count || 0,
        recentActivity: results[3].count || 0,
      })
      setRecentLeads(results[4].data || [])
      setRecentInquiries(results[5].data || [])
    } catch (error: any) {
      console.error("Error fetching dashboard data:", error.message)
    } finally {
      setLoading(false)
    }
  }, [supabase])

  useEffect(() => {
    fetchDashboardData()
  }, [fetchDashboardData])

  const statCards = [
    {
      title: "Total Leads",
      value: stats.totalLeads,
      description: "Lead capture submissions",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      href: "/admin/leads",
    },
    {
      title: "Total Inquiries",
      value: stats.totalInquiries,
      description: "Questionnaire submissions",
      icon: Activity,
      color: "text-green-600",
      bgColor: "bg-green-50",
      href: "/admin/leads",
    },
    {
      title: "Admin Users",
      value: stats.adminUsers,
      description: "Active admin accounts",
      icon: UserCog,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      href: "/admin/users",
    },
    {
      title: "Recent Activity",
      value: stats.recentActivity,
      description: "Inquiries in last 24h",
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      href: "/admin/leads",
    },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen p-6">
        <Loader2 className="h-8 w-8 animate-spin text-green-600" />
        <p className="ml-2">Loading Dashboard Data...</p>
      </div>
    )
  }

  return (
    <div className="space-y-8 p-4 md:p-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome to the Admin Dashboard</h1>
            <p className="mt-2 text-gray-600">
              Monitor your LeaseSmallSpace.com platform performance and manage leads effectively.
            </p>
          </div>
          <div className="hidden sm:block">
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>System Operational</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <Link key={stat.title} href={stat.href} passHref>
            <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer border-l-4 border-l-transparent hover:border-l-green-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                <p className="text-sm text-gray-600 mt-1">{stat.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center">
                  <Users className="mr-2 h-5 w-5 text-blue-600" />
                  Recent Lead Captures
                </CardTitle>
                <CardDescription>Latest popup and form submissions</CardDescription>
              </div>
              <Link href="/admin/leads" passHref>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {recentLeads.length > 0 ? (
              <div className="space-y-3">
                {recentLeads.map((lead) => (
                  <div key={lead.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{lead.name || "N/A"}</p>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Mail className="h-3 w-3" />
                        <span>{lead.email || "N/A"}</span>
                      </div>
                      {lead.phone && (
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Phone className="h-3 w-3" />
                          <span>{lead.phone}</span>
                        </div>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">{new Date(lead.created_at).toLocaleDateString()}</p>
                      <p className="text-xs text-gray-400">{lead.source || lead.page_captured || "Website"}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-gray-500">
                <Users className="mx-auto h-12 w-12 text-gray-300 mb-3" />
                <p>No recent lead captures</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center">
                  <Activity className="mr-2 h-5 w-5 text-green-600" />
                  Recent Questionnaires
                </CardTitle>
                <CardDescription>Latest questionnaire submissions</CardDescription>
              </div>
              <Link href="/admin/leads" passHref>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {recentInquiries.length > 0 ? (
              <div className="space-y-3">
                {recentInquiries.map((inquiry) => (
                  <div key={inquiry.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{inquiry.full_name || "N/A"}</p>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Mail className="h-3 w-3" />
                        <span>{inquiry.email || "N/A"}</span>
                      </div>
                      {inquiry.phone && (
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Phone className="h-3 w-3" />
                          <span>{inquiry.phone}</span>
                        </div>
                      )}
                      {inquiry.message && (
                        <p className="text-xs text-gray-500 mt-1 truncate" title={inquiry.message}>
                          {inquiry.message.substring(0, 50)}...
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">{new Date(inquiry.created_at).toLocaleDateString()}</p>
                      <p className="text-xs text-gray-400">{inquiry.inquiry_type || "Questionnaire"}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-gray-500">
                <Activity className="mx-auto h-12 w-12 text-gray-300 mb-3" />
                <p>No recent questionnaires</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="mr-2 h-5 w-5 text-green-600" />
            Quick Actions
          </CardTitle>
          <CardDescription>Common administrative tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/admin/leads" passHref>
              <Button variant="outline" className="w-full justify-start hover:bg-green-50 h-auto p-4">
                <div className="text-left">
                  <div className="flex items-center">
                    <Eye className="mr-2 h-4 w-4" />
                    View All Leads
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Manage all submissions</p>
                </div>
              </Button>
            </Link>
            <Link href="/admin/users" passHref>
              <Button variant="outline" className="w-full justify-start hover:bg-blue-50 h-auto p-4">
                <div className="text-left">
                  <div className="flex items-center">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Admin User
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Create new admin account</p>
                </div>
              </Button>
            </Link>
            <Link href="/admin/leads" passHref>
              <Button variant="outline" className="w-full justify-start hover:bg-purple-50 h-auto p-4">
                <div className="text-left">
                  <div className="flex items-center">
                    <Download className="mr-2 h-4 w-4" />
                    Export Data
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Download CSV reports</p>
                </div>
              </Button>
            </Link>
            <Link href="/admin/settings" passHref>
              <Button variant="outline" className="w-full justify-start hover:bg-orange-50 h-auto p-4">
                <div className="text-left">
                  <div className="flex items-center">
                    <UserCog className="mr-2 h-4 w-4" />
                    Settings
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Update preferences</p>
                </div>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      <p className="text-sm text-gray-500 mt-4">
        Advanced statistics, recent activity, and quick actions are temporarily disabled. These will be re-implemented
        in a new chat session.
      </p>
    </div>
  )
}
