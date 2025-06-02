import { NextResponse } from "next/server"

export async function GET() {
  // Return a simple response indicating Maps is not configured
  return NextResponse.json({
    error: "Google Maps API not configured",
    message: "Google Maps functionality is currently disabled",
  })
}
