"use client"
import { Github, Database, Mail, BarChart4, Globe, Rocket } from "lucide-react"

const integrations = [
  {
    name: "GitHub",
    description: "Code repository & version control",
    icon: Github,
    url: "https://github.com/na8thegr8/LSS",
    color: "text-gray-900",
    bgColor: "bg-gray-100",
  },
  {
    name: "Supabase",
    description: "Database, authentication, backend",
    icon: Database,
    url: "https://app.supabase.com",
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    name: "Resend",
    description: "Transactional email sending",
    icon: Mail,
    url: "https://resend.com",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    name: "Google Tag Manager",
    description: "Tag management & analytics",
    icon: BarChart4,
    url: "https://tagmanager.google.com",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
  {
    name: "GoDaddy",
    description: "Domain & DNS management",
    icon: Globe,
    url: "https://godaddy.com",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    name: "Vercel",
    description: "Hosting & automatic deployment",
    icon: Rocket,
    url: "https://vercel.com",
    color: "text-black",
    bgColor: "bg-gray-100",
  },
]

export default function IntegrationsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Integrations</h1>
      <p>Integrations coming soon...</p>
    </div>
  )
}
