import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"
import { sendEmail } from "@/lib/email"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, source, timestamp, page } = body

    // Validate required fields
    if (!name || !email || !phone) {
      return NextResponse.json({ error: "Name, email, and phone are required" }, { status: 400 })
    }

    // Save to Supabase database
    const { data, error } = await supabase
      .from("leads")
      .insert([
        {
          name,
          email,
          phone,
          source: source || "inactivity_popup",
          page_captured: page || "/",
          status: "new",
          created_at: timestamp || new Date().toISOString(),
        },
      ])
      .select()

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json({ error: "Failed to save lead to database" }, { status: 500 })
    }

    // Send notification emails
    try {
      // Send welcome email to lead
      await sendEmail({
        to: email,
        subject: "Welcome to LeaseSmallSpace - Your Expert Will Contact You Soon!",
        template: "welcome-lead",
        data: {
          name,
          phone,
          unsubscribeUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/unsubscribe?email=${encodeURIComponent(email)}`,
        },
      })

      // Send notification to team
      await sendEmail({
        to: process.env.NOTIFICATION_EMAIL || "team@leasesmallspace.com",
        subject: `🎯 New Lead: ${name} wants to speak to an expert`,
        template: "new-lead-notification",
        data: {
          name,
          email,
          phone,
          source,
          page,
          timestamp,
          leadId: data[0]?.id,
        },
      })

      // Send Slack notification if webhook is configured
      if (process.env.SLACK_WEBHOOK_URL) {
        await fetch(process.env.SLACK_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text: `🎯 New Lead Captured from LeaseSmallSpace!`,
            blocks: [
              {
                type: "section",
                text: {
                  type: "mrkdwn",
                  text: `*New Lead from ${source}*\n*Name:* ${name}\n*Email:* ${email}\n*Phone:* ${phone}\n*Page:* ${page}\n*Time:* ${new Date().toLocaleString()}`,
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
                    url: `tel:${phone}`,
                  },
                  {
                    type: "button",
                    text: {
                      type: "plain_text",
                      text: "Send Email",
                    },
                    url: `mailto:${email}`,
                  },
                ],
              },
            ],
          }),
        })
      }
    } catch (emailError) {
      console.error("Email/notification error:", emailError)
      // Don't fail the request if email fails
    }

    return NextResponse.json({
      success: true,
      message: "Lead captured successfully",
      leadId: data[0]?.id,
    })
  } catch (error) {
    console.error("Lead capture error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
