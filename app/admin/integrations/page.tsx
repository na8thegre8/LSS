"use client"
import { Loader2 } from "lucide-react"

const integrations = [
  {
    name: "GitHub",
    description: "Code repository & version control",
    icon: "Github",
    url: "https://github.com/na8thegr8/LSS",
    color: "text-gray-900",
    bgColor: "bg-gray-100",
  },
  {
    name: "Supabase",
    description: "Database, authentication, backend",
    icon: "Database",
    url: "https://app.supabase.com",
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    name: "Resend",
    description: "Transactional email sending",
    icon: "Mail",
    url: "https://resend.com",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    name: "Google Tag Manager",
    description: "Tag management & analytics",
    icon: "BarChart4",
    url: "https://tagmanager.google.com",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
  {
    name: "GoDaddy",
    description: "Domain & DNS management",
    icon: "Globe",
    url: "https://godaddy.com",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    name: "Vercel",
    description: "Hosting & automatic deployment",
    icon: "Rocket",
    url: "https://vercel.com",
    color: "text-black",
    bgColor: "bg-gray-100",
  },
]

export default function IntegrationsPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-900">Integrations</h1>
      <p className="text-gray-600 mt-2">
        Integrations management is temporarily disabled for deployment stability. This page will be fully implemented in
        a new chat session.
      </p>
      <div className="mt-8 flex items-center justify-center text-gray-500">
        <Loader2 className="h-6 w-6 animate-spin mr-2" />
        <span>Content placeholder...</span>
      </div>
    </div>
  )
}
