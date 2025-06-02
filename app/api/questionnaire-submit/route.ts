import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { responses, userInfo } = body

    // Validate required fields
    if (!userInfo?.email || !userInfo?.name) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 })
    }

    // Create or update user
    const { data: userData, error: userError } = await supabase
      .from("users")
      .upsert([
        {
          email: userInfo.email,
          full_name: userInfo.name,
          phone: userInfo.phone,
          company_name: userInfo.company,
        },
      ])
      .select()

    if (userError) {
      console.error("User creation error:", userError)
      return NextResponse.json({ error: "Failed to create user" }, { status: 500 })
    }

    const userId = userData[0]?.id

    // Create inquiry record
    const { data: inquiryData, error: inquiryError } = await supabase
      .from("inquiries")
      .insert([
        {
          user_id: userId,
          full_name: userInfo.name,
          email: userInfo.email,
          phone: userInfo.phone,
          company_name: userInfo.company,
          inquiry_type: "questionnaire",
          message: `Questionnaire submission: ${responses.spaceType} space, ${responses.size} sq ft`,
          status: "new",
        },
      ])
      .select()

    if (inquiryError) {
      console.error("Inquiry creation error:", inquiryError)
      return NextResponse.json({ error: "Failed to create inquiry" }, { status: 500 })
    }

    // Save questionnaire responses
    const { data: responseData, error: responseError } = await supabase
      .from("questionnaire_responses")
      .insert([
        {
          user_id: userId,
          inquiry_id: inquiryData[0]?.id,
          responses: responses,
          space_type: responses.spaceType,
          location_preference: responses.location,
          size_min: responses.size,
          timeline: responses.timeline,
          lease_or_buy: responses.leaseOrBuy,
          features: responses.features || [],
        },
      ])
      .select()

    if (responseError) {
      console.error("Response creation error:", responseError)
      return NextResponse.json({ error: "Failed to save responses" }, { status: 500 })
    }

    // For now, just log the questionnaire submission
    console.log("Questionnaire submitted:", {
      name: userInfo.name,
      email: userInfo.email,
      spaceType: responses.spaceType,
      size: responses.size,
      location: responses.location,
    })

    // Email notifications disabled for now
    console.log("Email notifications disabled - would have sent confirmation to:", userInfo.email)
    console.log("Team notifications disabled - would have notified team about new questionnaire")

    return NextResponse.json({
      success: true,
      message: "Questionnaire submitted successfully",
      userId,
      inquiryId: inquiryData[0]?.id,
    })
  } catch (error) {
    console.error("Questionnaire submission error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
