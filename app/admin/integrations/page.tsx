"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Integrations</h2>
        <p className="mt-1 text-sm text-gray-600">Manage external services connected to LeaseSmallSpace.com</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {integrations.map((integration) => (
          <a
            key={integration.name}
            href={integration.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block hover:no-underline"
          >
            <Card className="h-full hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-base font-medium">{integration.name}</CardTitle>
                <div className={`p-2 rounded-full ${integration.bgColor}`}>
                  <integration.icon className={`h-5 w-5 ${integration.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">{integration.description}</p>
              </CardContent>
            </Card>
          </a>
        ))}
      </div>
    </div>
  )
}
