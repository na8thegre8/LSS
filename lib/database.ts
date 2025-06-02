import { supabase } from "./supabase"
import type { Database } from "./supabase"

type Property = Database["public"]["Tables"]["properties"]["Row"]
type Inquiry = Database["public"]["Tables"]["inquiries"]["Insert"]
type QuestionnaireResponse = Database["public"]["Tables"]["questionnaire_responses"]["Insert"]

// Property queries
export async function getProperties(filters?: {
  city?: string
  property_type?: string
  min_price?: number
  max_price?: number
  min_size?: number
  max_size?: number
}) {
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
}

export async function getPropertyById(id: string) {
  const { data, error } = await supabase.from("properties").select("*").eq("id", id).eq("is_active", true).single()

  if (error) {
    console.error("Error fetching property:", error)
    return null
  }

  return data
}

// Inquiry functions
export async function createInquiry(inquiry: Inquiry) {
  const { data, error } = await supabase.from("inquiries").insert(inquiry).select().single()

  if (error) {
    console.error("Error creating inquiry:", error)
    throw error
  }

  return data
}

// Questionnaire functions
export async function saveQuestionnaireResponse(response: QuestionnaireResponse) {
  const { data, error } = await supabase.from("questionnaire_responses").insert(response).select().single()

  if (error) {
    console.error("Error saving questionnaire response:", error)
    throw error
  }

  return data
}

// Analytics functions
export async function trackEvent(eventName: string, properties?: any, userId?: string, sessionId?: string) {
  const { data, error } = await supabase.from("analytics_events").insert({
    event_name: eventName,
    event_properties: properties,
    user_id: userId,
    session_id: sessionId,
    page_url: typeof window !== "undefined" ? window.location.href : null,
    user_agent: typeof window !== "undefined" ? navigator.userAgent : null,
  })

  if (error) {
    console.error("Error tracking event:", error)
  }

  return data
}

// User functions
export async function createOrUpdateUser(userData: {
  email: string
  full_name?: string
  phone?: string
  company_name?: string
}) {
  const { data, error } = await supabase.from("users").upsert(userData, { onConflict: "email" }).select().single()

  if (error) {
    console.error("Error creating/updating user:", error)
    throw error
  }

  return data
}
