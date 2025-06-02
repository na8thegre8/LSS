"use client"

import { useEffect, useState, useCallback } from "react"
import { createClientComponentClient } from "@/lib/supabase"
import { Users, UserCog, Activity, TrendingUp } from "lucide-react"

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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <p>Dashboard coming soon...</p>
    </div>
  )
}
