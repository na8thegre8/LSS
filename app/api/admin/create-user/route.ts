import { type NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    console.log("Creating admin user:", email)

    // Create user in Supabase Auth using admin client
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Auto-confirm email
    })

    if (authError) {
      console.error("Auth error:", authError)
      return NextResponse.json({ error: authError.message }, { status: 400 })
    }

    console.log("User created in auth:", authData.user?.id)

    // Add user to admin_users table
    if (authData.user) {
      const { error: dbError } = await supabaseAdmin.from("admin_users").insert({
        user_id: authData.user.id,
        email: authData.user.email!,
      })

      if (dbError) {
        console.error("Database error:", dbError)
        // Continue even if admin_users insert fails
      } else {
        console.log("User added to admin_users table")
      }
    }

    return NextResponse.json({
      success: true,
      message: "Admin user created successfully",
      user: {
        id: authData.user?.id,
        email: authData.user?.email,
      },
    })
  } catch (error) {
    console.error("Unexpected error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// GET endpoint to create your specific user
export async function GET() {
  try {
    console.log("Creating Nate's admin user...")

    // Create user in Supabase Auth using admin client
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: "nate@secureassetmg.com",
      password: "Nathaniel88@@",
      email_confirm: true, // Auto-confirm email
    })

    if (authError) {
      console.error("Auth error:", authError)
      return NextResponse.json({ error: authError.message }, { status: 400 })
    }

    console.log("User created in auth:", authData.user?.id)

    // Add user to admin_users table
    if (authData.user) {
      const { error: dbError } = await supabaseAdmin.from("admin_users").insert({
        user_id: authData.user.id,
        email: authData.user.email!,
      })

      if (dbError) {
        console.error("Database error:", dbError)
        // Continue even if admin_users insert fails
      } else {
        console.log("User added to admin_users table")
      }
    }

    return NextResponse.json({
      success: true,
      message: "Nate's admin user created successfully",
      user: {
        id: authData.user?.id,
        email: authData.user?.email,
      },
    })
  } catch (error) {
    console.error("Unexpected error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
