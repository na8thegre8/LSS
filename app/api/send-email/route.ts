import { type NextRequest, NextResponse } from "next/server"
import { sendEmail, emailTemplates } from "@/lib/email"
import { sendSlackNotification, triggerZapierWebhook, createHubSpotContact } from "@/lib/integrations"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, data } = body

    switch (type) {
      case "lead_notification":
        // Send email to team
        await sendEmail({
          to: ["leads@leasesmallspace.com"],
          subject: `New Lead: ${data.name} - ${data.spaceType}`,
          html: emailTemplates.leadNotification(data),
        })

        // Send welcome email to user
        await sendEmail({
          to: [data.email],
          subject: "Welcome to LeaseSmallSpace - We're Finding Your Perfect Space!",
          html: emailTemplates.welcomeEmail(data),
        })

        // Send Slack notification
        await sendSlackNotification(
          `🏢 New Lead: ${data.name} looking for ${data.size} sq ft ${data.spaceType} in ${data.location}`,
        )

        // Trigger Zapier webhook
        await triggerZapierWebhook(data)

        // Create HubSpot contact
        await createHubSpotContact(data)

        break

      case "property_alert":
        await sendEmail({
          to: [data.userEmail],
          subject: `New Properties Available - ${data.properties.length} Matches Found!`,
          html: emailTemplates.propertyAlert(data.properties, data.user),
        })
        break

      default:
        return NextResponse.json({ error: "Invalid email type" }, { status: 400 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Email API error:", error)
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
  }
}
