"use client"

import { useEffect, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
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
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Admin Users</h1>
      <p>User management coming soon...</p>

      <Card>
        <CardHeader>
          <CardTitle>Admin Users</CardTitle>
          <CardDescription>Users with administrative access to the dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          {users.length === 0 ? (
            <p className="text-center text-gray-500 py-4">No admin users found. Add your first admin user.</p>
          ) : (
            <div className="rounded-md border">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Created
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(user.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
