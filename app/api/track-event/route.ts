import { supabaseAdmin } from "@/lib/supabase"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { eventName, properties, userId, sessionId } = body

    // Validate required fields
    if (!eventName) {
      return NextResponse.json({ error: "Event name is required" }, { status: 400 })
    }

    // Insert event using admin client (bypasses RLS)
    const { data, error } = await supabaseAdmin.from("analytics_events").insert({
      event_name: eventName,
      event_properties: properties || {},
      user_id: userId || null,
      session_id: sessionId || null,
      page_url: body.pageUrl || null,
      user_agent: body.userAgent || null,
    })

    if (error) {
      console.error("Server-side error tracking event:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("Unexpected error in track-event API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
