import { NextResponse } from "next/server"

export async function GET() {
  try {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY

    if (!apiKey) {
      return NextResponse.json({ error: "Google Maps API key not configured" }, { status: 500 })
    }

    const scriptUrl = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`

    return NextResponse.json({ scriptUrl })
  } catch (error) {
    console.error("Error generating Google Maps script URL:", error)
    return NextResponse.json({ error: "Failed to generate Google Maps script URL" }, { status: 500 })
  }
}
