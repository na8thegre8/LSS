import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

console.log("Supabase URL:", supabaseUrl)
console.log("Supabase Anon Key exists:", !!supabaseAnonKey)
console.log("Supabase Service Key exists:", !!supabaseServiceKey)

if (!supabaseUrl) {
  console.error("NEXT_PUBLIC_SUPABASE_URL is not set")
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL environment variable")
}

if (!supabaseAnonKey) {
  console.error("NEXT_PUBLIC_SUPABASE_ANON_KEY is not set")
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable")
}

// Client-side Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Admin client for server-side operations (if service key is available)
export const supabaseAdmin = supabaseServiceKey ? createClient(supabaseUrl, supabaseServiceKey) : supabase

// Helper function to create client-side Supabase client
export const createClientComponentClient = () => {
  return createClient(supabaseUrl!, supabaseAnonKey!)
}

export type Database = {
  public: {
    Tables: {
      leads: {
        Row: {
          id: string
          name: string
          email: string
          phone: string
          source: string | null
          page_captured: string | null
          status: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone: string
          source?: string | null
          page_captured?: string | null
          status?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string
          source?: string | null
          page_captured?: string | null
          status?: string | null
          notes?: string | null
          updated_at?: string
        }
      }
      users: {
        Row: {
          id: string
          email: string
          full_name: string | null
          phone: string | null
          company_name: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          full_name?: string | null
          phone?: string | null
          company_name?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          phone?: string | null
          company_name?: string | null
          updated_at?: string
        }
      }
      properties: {
        Row: {
          id: string
          title: string
          description: string | null
          address: string
          city: string
          state: string | null
          zip_code: string | null
          latitude: number | null
          longitude: number | null
          property_type: string
          size_sqft: number
          price_monthly: number
          lease_type: string | null
          available_date: string | null
          features: any | null
          images: any | null
          deal_score: string | null
          is_active: boolean | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          address: string
          city: string
          state?: string | null
          zip_code?: string | null
          latitude?: number | null
          longitude?: number | null
          property_type: string
          size_sqft: number
          price_monthly: number
          lease_type?: string | null
          available_date?: string | null
          features?: any | null
          images?: any | null
          deal_score?: string | null
          is_active?: boolean | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          address?: string
          city?: string
          state?: string | null
          zip_code?: string | null
          latitude?: number | null
          longitude?: number | null
          property_type?: string
          size_sqft?: number
          price_monthly?: number
          lease_type?: string | null
          available_date?: string | null
          features?: any | null
          images?: any | null
          deal_score?: string | null
          is_active?: boolean | null
          updated_at?: string
        }
      }
      inquiries: {
        Row: {
          id: string
          user_id: string | null
          property_id: string | null
          full_name: string
          email: string
          phone: string | null
          company_name: string | null
          message: string | null
          inquiry_type: string | null
          status: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          property_id?: string | null
          full_name: string
          email: string
          phone?: string | null
          company_name?: string | null
          message?: string | null
          inquiry_type?: string | null
          status?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          property_id?: string | null
          full_name?: string
          email?: string
          phone?: string | null
          company_name?: string | null
          message?: string | null
          inquiry_type?: string | null
          status?: string | null
          updated_at?: string
        }
      }
      questionnaire_responses: {
        Row: {
          id: string
          user_id: string | null
          inquiry_id: string | null
          responses: any
          space_type: string | null
          location_preference: string | null
          size_min: number | null
          size_max: number | null
          budget_min: number | null
          budget_max: number | null
          timeline: string | null
          lease_or_buy: string | null
          completed_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          inquiry_id?: string | null
          responses: any
          space_type?: string | null
          location_preference?: string | null
          size_min?: number | null
          size_max?: number | null
          budget_min?: number | null
          budget_max?: number | null
          timeline?: string | null
          lease_or_buy?: string | null
          completed_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          inquiry_id?: string | null
          responses?: any
          space_type?: string | null
          location_preference?: string | null
          size_min?: number | null
          size_max?: number | null
          budget_min?: number | null
          budget_max?: number | null
          timeline?: string | null
          lease_or_buy?: string | null
          completed_at?: string | null
        }
      }
      analytics_events: {
        Row: {
          id: string
          user_id: string | null
          session_id: string | null
          event_name: string
          event_properties: any | null
          page_url: string | null
          user_agent: string | null
          ip_address: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          session_id?: string | null
          event_name: string
          event_properties?: any | null
          page_url?: string | null
          user_agent?: string | null
          ip_address?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          session_id?: string | null
          event_name?: string
          event_properties?: any | null
          page_url?: string | null
          user_agent?: string | null
          ip_address?: string | null
        }
      }
    }
  }
}
