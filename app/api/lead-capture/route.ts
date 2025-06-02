import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

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

    console.log("Lead saved successfully:", data[0])

    // Email and notification services disabled for now
    console.log("Email notifications disabled - would have sent welcome email to:", email)
    console.log("Slack notifications disabled - would have notified team about:", name)

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
