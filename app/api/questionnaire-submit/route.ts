import { type NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { responses, userInfo } = body

    console.log("Questionnaire submission received:", { responses, userInfo })

    // Validate required fields
    if (!userInfo?.email || !userInfo?.name) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 })
    }

    // Use admin client to bypass RLS policies
    console.log("Creating/updating user with admin client...")

    // Create or update user using admin client
    const { data: userData, error: userError } = await supabaseAdmin
      .from("users")
      .upsert(
        [
          {
            email: userInfo.email,
            full_name: userInfo.name,
            phone: userInfo.phone,
            company_name: userInfo.company,
          },
        ],
        {
          onConflict: "email",
        },
      )
      .select()

    if (userError) {
      console.error("User creation error:", userError)
      return NextResponse.json({ error: "Failed to create user" }, { status: 500 })
    }

    const userId = userData[0]?.id
    console.log("User created/updated successfully:", userData[0])

    // Create inquiry record using admin client
    console.log("Creating inquiry...")
    const { data: inquiryData, error: inquiryError } = await supabaseAdmin
      .from("inquiries")
      .insert([
        {
          user_id: userId,
          full_name: userInfo.name,
          email: userInfo.email,
          phone: userInfo.phone,
          company_name: userInfo.company,
          inquiry_type: "questionnaire",
          message: `Questionnaire submission: ${responses.spaceType} space, ${responses.size} sq ft in ${responses.location}, Budget: ${responses.budget}`,
          status: "new",
        },
      ])
      .select()

    if (inquiryError) {
      console.error("Inquiry creation error:", inquiryError)
      return NextResponse.json({ error: "Failed to create inquiry" }, { status: 500 })
    }

    console.log("Inquiry created successfully:", inquiryData[0])

    // Convert budget range to min/max values for database
    const getBudgetRange = (budgetRange: string) => {
      const ranges: { [key: string]: { min: number; max: number } } = {
        "under-2000": { min: 0, max: 2000 },
        "2000-3500": { min: 2000, max: 3500 },
        "3500-5000": { min: 3500, max: 5000 },
        "5000-7500": { min: 5000, max: 7500 },
        "7500-10000": { min: 7500, max: 10000 },
        "over-10000": { min: 10000, max: 999999 },
        "not-sure": { min: 0, max: 999999 },
      }
      return ranges[budgetRange] || { min: 0, max: 999999 }
    }

    const budgetRange = getBudgetRange(responses.budget)

    // Save questionnaire responses using admin client
    console.log("Saving questionnaire responses...")
    const { data: responseData, error: responseError } = await supabaseAdmin
      .from("questionnaire_responses")
      .insert([
        {
          user_id: userId,
          inquiry_id: inquiryData[0]?.id,
          responses: responses,
          space_type: responses.spaceType,
          location_preference: responses.location,
          size_min: Math.max(500, responses.size - 500),
          size_max: responses.size + 1000,
          budget_min: budgetRange.min,
          budget_max: budgetRange.max,
          timeline: responses.timeline,
          lease_or_buy: responses.leaseOrBuy,
          completed_at: new Date().toISOString(),
        },
      ])
      .select()

    if (responseError) {
      console.error("Response creation error:", responseError)
      return NextResponse.json({ error: "Failed to save responses" }, { status: 500 })
    }

    console.log("Questionnaire response saved successfully:", responseData[0])

    // Track analytics event using admin client
    try {
      await supabaseAdmin.from("analytics_events").insert({
        event_name: "questionnaire_completed",
        event_properties: {
          lease_or_buy: responses.leaseOrBuy,
          space_type: responses.spaceType,
          size: responses.size,
          location: responses.location,
          budget: responses.budget,
          timeline: responses.timeline,
          sms_consent: userInfo.smsConsent,
        },
        user_id: userId,
        page_url: request.headers.get("referer") || null,
        user_agent: request.headers.get("user-agent") || null,
      })
      console.log("Analytics event tracked successfully")
    } catch (analyticsError) {
      console.error("Analytics tracking failed (non-critical):", analyticsError)
    }

    console.log("Questionnaire submission completed successfully!")

    return NextResponse.json({
      success: true,
      message: "Questionnaire submitted successfully",
      userId,
      inquiryId: inquiryData[0]?.id,
      data: {
        user: userData[0],
        inquiry: inquiryData[0],
        response: responseData[0],
      },
    })
  } catch (error) {
    console.error("Questionnaire submission error:", error)
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
