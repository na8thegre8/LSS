import { supabase, supabaseAdmin } from "./supabase"
import type { Database } from "./supabase"

type Property = Database["public"]["Tables"]["properties"]["Row"]
type Inquiry = Database["public"]["Tables"]["inquiries"]["Insert"]
type QuestionnaireResponse = Database["public"]["Tables"]["questionnaire_responses"]["Insert"]
type Lead = Database["public"]["Tables"]["leads"]["Row"]

// Lead functions
export async function createLead(leadData: {
  name: string
  email: string
  phone: string
  source?: string
  page_captured?: string
}) {
  try {
    console.log("Creating lead with data:", leadData)

    const { data, error } = await supabase
      .from("leads")
      .insert([
        {
          ...leadData,
          status: "new",
        },
      ])
      .select()
      .single()

    if (error) {
      console.error("Error creating lead:", error)
      throw error
    }

    console.log("Lead created successfully:", data)
    return data
  } catch (error) {
    console.error("Failed to create lead:", error)
    throw new Error("Database connection failed. Please check your Supabase configuration.")
  }
}

export async function getLeads(filters?: {
  status?: string
  source?: string
  limit?: number
}) {
  try {
    let query = supabaseAdmin.from("leads").select("*").order("created_at", { ascending: false })

    if (filters?.status) {
      query = query.eq("status", filters.status)
    }
    if (filters?.source) {
      query = query.eq("source", filters.source)
    }
    if (filters?.limit) {
      query = query.limit(filters.limit)
    }

    const { data, error } = await query

    if (error) {
      console.error("Error fetching leads:", error)
      return []
    }

    return data || []
  } catch (error) {
    console.error("Failed to fetch leads:", error)
    return []
  }
}

export async function updateLeadStatus(leadId: string, status: string, notes?: string) {
  try {
    const { data, error } = await supabaseAdmin
      .from("leads")
      .update({
        status,
        notes,
        updated_at: new Date().toISOString(),
      })
      .eq("id", leadId)
      .select()
      .single()

    if (error) {
      console.error("Error updating lead:", error)
      throw error
    }

    return data
  } catch (error) {
    console.error("Failed to update lead:", error)
    throw new Error("Database connection failed. Please check your Supabase configuration.")
  }
}

// Property queries
export async function getProperties(filters?: {
  city?: string
  property_type?: string
  min_price?: number
  max_price?: number
  min_size?: number
  max_size?: number
}) {
  try {
    let query = supabase.from("properties").select("*").eq("is_active", true).order("created_at", { ascending: false })

    if (filters?.city) {
      query = query.ilike("city", `%${filters.city}%`)
    }
    if (filters?.property_type) {
      query = query.eq("property_type", filters.property_type)
    }
    if (filters?.min_price) {
      query = query.gte("price_monthly", filters.min_price)
    }
    if (filters?.max_price) {
      query = query.lte("price_monthly", filters.max_price)
    }
    if (filters?.min_size) {
      query = query.gte("size_sqft", filters.min_size)
    }
    if (filters?.max_size) {
      query = query.lte("size_sqft", filters.max_size)
    }

    const { data, error } = await query

    if (error) {
      console.error("Error fetching properties:", error)
      return []
    }

    return data || []
  } catch (error) {
    console.error("Failed to fetch properties:", error)
    return []
  }
}

export async function getPropertyById(id: string) {
  try {
    const { data, error } = await supabase.from("properties").select("*").eq("id", id).eq("is_active", true).single()

    if (error) {
      console.error("Error fetching property:", error)
      return null
    }

    return data
  } catch (error) {
    console.error("Failed to fetch property:", error)
    return null
  }
}

// Inquiry functions
export async function createInquiry(inquiry: Inquiry) {
  try {
    console.log("Creating inquiry with data:", inquiry)

    const { data, error } = await supabase.from("inquiries").insert(inquiry).select().single()

    if (error) {
      console.error("Error creating inquiry:", error)
      throw error
    }

    console.log("Inquiry created successfully:", data)
    return data
  } catch (error) {
    console.error("Failed to create inquiry:", error)
    throw new Error("Database connection failed. Please check your Supabase configuration.")
  }
}

// Questionnaire functions
export async function saveQuestionnaireResponse(response: QuestionnaireResponse) {
  try {
    console.log("Saving questionnaire response with data:", response)

    const { data, error } = await supabase.from("questionnaire_responses").insert(response).select().single()

    if (error) {
      console.error("Error saving questionnaire response:", error)
      throw error
    }

    console.log("Questionnaire response saved successfully:", data)
    return data
  } catch (error) {
    console.error("Failed to save questionnaire response:", error)
    throw new Error("Database connection failed. Please check your Supabase configuration.")
  }
}

// User functions
export async function createOrUpdateUser(userData: {
  email: string
  full_name?: string
  phone?: string
  company_name?: string
}) {
  try {
    console.log("Creating/updating user with data:", userData)

    const { data, error } = await supabase.from("users").upsert(userData, { onConflict: "email" }).select().single()

    if (error) {
      console.error("Error creating/updating user:", error)
      throw error
    }

    console.log("User created/updated successfully:", data)
    return data
  } catch (error) {
    console.error("Failed to create/update user:", error)
    throw new Error("Database connection failed. Please check your Supabase configuration.")
  }
}
