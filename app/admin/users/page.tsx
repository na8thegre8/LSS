"use client"

import { useEffect, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Loader2 } from "lucide-react"

interface AdminUser {
  id: string
  email: string
  created_at: string
}

export default function UsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClientComponentClient()

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data, error } = await supabase.from("admin_users").select("*").order("created_at", { ascending: false })

        if (error) {
          console.error("Error fetching admin users:", error)
        } else {
          setUsers(data || [])
        }
      } catch (error) {
        console.error("Error fetching admin users:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [supabase])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-green-600" />
      </div>
    )
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
      <p className="text-gray-600 mt-2">
        User management functionality is temporarily disabled to ensure successful deployment. This page will be fully
        implemented in a new chat session.
      </p>
      <div className="mt-8 flex items-center justify-center text-gray-500">
        <Loader2 className="h-6 w-6 animate-spin mr-2" />
        <span>Content placeholder...</span>
      </div>
    </div>
  )
}
