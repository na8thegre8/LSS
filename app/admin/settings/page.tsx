"use client"
import type React from "react"
import { Loader2 } from "lucide-react"
import { useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

export default function SettingsPage() {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const supabase = createClientComponentClient()

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    if (newPassword !== confirmPassword) {
      setMessage({ type: "error", text: "New passwords don't match" })
      setLoading(false)
      return
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      })

      if (error) {
        setMessage({ type: "error", text: error.message })
      } else {
        setMessage({ type: "success", text: "Password updated successfully" })
        setCurrentPassword("")
        setNewPassword("")
        setConfirmPassword("")
      }
    } catch (error) {
      setMessage({ type: "error", text: "An unexpected error occurred" })
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleNotificationToggle = async () => {
    setEmailNotifications(!emailNotifications)
    // In a real app, you would save this preference to the database
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
      <p className="text-gray-600 mt-2">
        Account settings and preferences are temporarily disabled for deployment stability. This page will be fully
        implemented in a new chat session.
      </p>
      <div className="mt-8 flex items-center justify-center text-gray-500">
        <Loader2 className="h-6 w-6 animate-spin mr-2" />
        <span>Content placeholder...</span>
      </div>
    </div>
  )
}
