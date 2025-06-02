import { type NextRequest, NextResponse } from "next/server"
import { sendEmail } from "@/lib/email"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userData } = body

    // Send welcome email to user
    await sendEmail({
      to: userData.email,
      subject: "Your Property Matches Are Ready! - LeaseSmallSpace",
      template: "questionnaire-complete",
      data: {
        name: userData.name,
        spaceType: userData.spaceType,
        size: userData.size,
        location: userData.location,
        timeline: userData.timeline,
        resultsUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/results?userId=${userData.userId}`,
      },
    })

    // Send notification to team
    await sendEmail({
      to: process.env.NOTIFICATION_EMAIL || "team@leasesmallspace.com",
      subject: `🎯 New Questionnaire Completed: ${userData.name}`,
      template: "questionnaire-notification",
      data: {
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        spaceType: userData.spaceType,
        size: userData.size,
        location: userData.location,
        timeline: userData.timeline,
        leaseOrBuy: userData.leaseOrBuy,
        userId: userData.userId,
        inquiryId: userData.inquiryId,
        adminUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/admin/leads/${userData.userId}`,
      },
    })

    // Send Slack notification
    if (process.env.SLACK_WEBHOOK_URL) {
      await fetch(process.env.SLACK_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: `🎯 New Questionnaire Completed!`,
          blocks: [
            {
              type: "section",
              text: {
                type: "mrkdwn",
                text: `*New Questionnaire from ${userData.name}*\n*Email:* ${userData.email}\n*Phone:* ${userData.phone}\n*Space Type:* ${userData.spaceType}\n*Size:* ${userData.size} sq ft\n*Location:* ${userData.location}\n*Timeline:* ${userData.timeline}\n*Type:* ${userData.leaseOrBuy}`,
              },
            },
            {
              type: "actions",
              elements: [
                {
                  type: "button",
                  text: {
                    type: "plain_text",
                    text: "Call Now",
                  },
                  url: `tel:${userData.phone}`,
                },
                {
                  type: "button",
                  text: {
                    type: "plain_text",
                    text: "Send Email",
                  },
                  url: `mailto:${userData.email}`,
                },
              ],
            },
          ],
        }),
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Questionnaire submission error:", error)
    return NextResponse.json({ error: "Failed to process submission" }, { status: 500 })
  }
}
