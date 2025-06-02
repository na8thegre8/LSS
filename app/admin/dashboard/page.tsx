"use client"

import { useEffect, useState, useCallback } from "react"
import { createClientComponentClient } from "@/lib/supabase"
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

interface RecentItem {
  id: string
  name: string
  email: string
  phone?: string
  created_at: string
  type: "lead" | "inquiry"
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalLeads: 0,
    totalInquiries: 0,
    adminUsers: 0,
    recentActivity: 0,
  })
  const [recentItems, setRecentItems] = useState<RecentItem[]>([])
  const [loading, setLoading] = useState(true)
  const [statsLoading, setStatsLoading] = useState(true)
  const [recentLoading, setRecentLoading] = useState(true)
  const supabase = createClientComponentClient()

  // Optimized stats fetching with parallel queries
  const fetchStats = useCallback(async () => {
    try {
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)

      // Run all count queries in parallel for faster loading
      const [leadsResult, inquiriesResult, adminResult, recentResult] = await Promise.all([
        supabase.from("leads").select("*", { count: "exact", head: true }),
        supabase.from("inquiries").select("*", { count: "exact", head: true }),
        supabase.from("admin_users").select("*", { count: "exact", head: true }),
        supabase
          .from("inquiries")
          .select("*", { count: "exact", head: true })
          .gte("created_at", yesterday.toISOString()),
      ])

      setStats({
        totalLeads: leadsResult.count || 0,
        totalInquiries: inquiriesResult.count || 0,
        adminUsers: adminResult.count || 0,
        recentActivity: recentResult.count || 0,
      })
    } catch (error) {
      console.error("Error fetching stats:", error)
    } finally {
      setStatsLoading(false)
    }
  }, [supabase])

  // Optimized recent items fetching with single query
  const fetchRecentItems = useCallback(async () => {
    try {
      // Fetch recent leads and inquiries in parallel, limit to 5 total
      const [leadsResult, inquiriesResult] = await Promise.all([
        supabase
          .from("leads")
          .select("id, name, email, phone, created_at")
          .order("created_at", { ascending: false })
          .limit(3),
        supabase
          .from("inquiries")
          .select("id, full_name, email, phone, created_at")
          .order("created_at", { ascending: false })
          .limit(3),
      ])

      const leads = (leadsResult.data || []).map((item) => ({
        id: item.id,
        name: item.name || "Unknown",
        email: item.email || "",
        phone: item.phone,
        created_at: item.created_at,
        type: "lead" as const,
      }))

      const inquiries = (inquiriesResult.data || []).map((item) => ({
        id: item.id,
        name: item.full_name || "Unknown",
        email: item.email || "",
        phone: item.phone,
        created_at: item.created_at,
        type: "inquiry" as const,
      }))

      // Combine and sort by date, take top 5
      const combined = [...leads, ...inquiries]
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, 5)

      setRecentItems(combined)
    } catch (error) {
      console.error("Error fetching recent items:", error)
    } finally {
      setRecentLoading(false)
    }
  }, [supabase])

  useEffect(() => {
    // Load stats and recent items in parallel
    Promise.all([fetchStats(), fetchRecentItems()]).finally(() => {
      setLoading(false)
    })
  }, [fetchStats, fetchRecentItems])

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
      description: "Last 24 hours",
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      href: "/admin/leads",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
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

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <Link key={stat.title} href={stat.href}>
            <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer border-l-4 border-l-transparent hover:border-l-green-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                {statsLoading ? (
                  <div className="flex items-center space-x-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-sm text-gray-500">Loading...</span>
                  </div>
                ) : (
                  <>
                    <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                    <p className="text-sm text-gray-600 mt-1">{stat.description}</p>
                  </>
                )}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center">
                  <Activity className="mr-2 h-5 w-5 text-green-600" />
                  Recent Activity
                </CardTitle>
                <CardDescription>Latest leads and inquiries</CardDescription>
              </div>
              <Link href="/admin/leads">
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {recentLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-green-600" />
              </div>
            ) : recentItems.length > 0 ? (
              <div className="space-y-3">
                {recentItems.map((item) => (
                  <div
                    key={`${item.type}-${item.id}`}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <p className="font-medium text-gray-900">{item.name}</p>
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            item.type === "lead" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"
                          }`}
                        >
                          {item.type === "lead" ? "Lead" : "Inquiry"}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600 mt-1">
                        <Mail className="h-3 w-3" />
                        <span>{item.email}</span>
                      </div>
                      {item.phone && (
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Phone className="h-3 w-3" />
                          <span>{item.phone}</span>
                        </div>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">{new Date(item.created_at).toLocaleDateString()}</p>
                      <p className="text-xs text-gray-400">{new Date(item.created_at).toLocaleTimeString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-gray-500">
                <Activity className="mx-auto h-12 w-12 text-gray-300 mb-3" />
                <p>No recent activity</p>
                <p className="text-sm">New submissions will appear here</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-green-600" />
              Quick Actions
            </CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-3">
              <Link href="/admin/leads">
                <Button variant="outline" className="w-full justify-start hover:bg-green-50 h-auto p-4">
                  <div className="text-left">
                    <div className="flex items-center">
                      <Eye className="mr-2 h-4 w-4" />
                      View All Leads & Responses
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Manage questionnaires and lead captures</p>
                  </div>
                </Button>
              </Link>
              <Link href="/admin/users">
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
              <Link href="/admin/leads">
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
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Status - Simplified */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="mr-2 h-5 w-5 text-blue-600" />
            System Overview
          </CardTitle>
          <CardDescription>Platform metrics and status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {statsLoading ? (
                  <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                ) : (
                  stats.totalLeads + stats.totalInquiries
                )}
              </div>
              <div className="text-sm text-gray-600">Total Submissions</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">
                {statsLoading ? (
                  <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                ) : stats.recentActivity > 0 ? (
                  `${Math.round((stats.recentActivity / (stats.totalInquiries || 1)) * 100)}%`
                ) : (
                  "0%"
                )}
              </div>
              <div className="text-sm text-gray-600">Daily Activity Rate</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">
                {statsLoading ? <Loader2 className="h-6 w-6 animate-spin mx-auto" /> : stats.adminUsers}
              </div>
              <div className="text-sm text-gray-600">Admin Users</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">100%</div>
              <div className="text-sm text-gray-600">System Uptime</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
