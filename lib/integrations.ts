// Google Analytics 4 Integration
export const trackEvent = (eventName: string, parameters?: any) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, parameters)
  }
}

// Google Maps Integration - Server-side only
export const getGoogleMapsScript = async () => {
  // This function should only be called server-side
  if (typeof window !== "undefined") {
    console.warn("getGoogleMapsScript should only be called server-side")
    return null
  }

  const apiKey = process.env.GOOGLE_MAPS_API_KEY // Server-side only
  if (!apiKey) {
    console.warn("Google Maps API key not configured")
    return null
  }

  return `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`
}

// Client-side Google Maps initialization (without exposing API key)
export const initializeGoogleMaps = (scriptUrl: string) => {
  if (typeof window !== "undefined" && !window.google && scriptUrl) {
    const script = document.createElement("script")
    script.src = scriptUrl
    script.async = true
    document.head.appendChild(script)
  }
}

// Slack Integration for notifications
export const sendSlackNotification = async (message: string, channel = "#leads") => {
  if (!process.env.SLACK_WEBHOOK_URL) return

  try {
    await fetch(process.env.SLACK_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        channel,
        text: message,
        username: "LeaseSmallSpace Bot",
        icon_emoji: ":house:",
      }),
    })
  } catch (error) {
    console.error("Failed to send Slack notification:", error)
  }
}

// Zapier Integration
export const triggerZapierWebhook = async (data: any, webhookUrl?: string) => {
  const url = webhookUrl || process.env.ZAPIER_WEBHOOK_URL
  if (!url) return

  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
  } catch (error) {
    console.error("Failed to trigger Zapier webhook:", error)
  }
}

// HubSpot Integration
export const createHubSpotContact = async (contactData: any) => {
  if (!process.env.HUBSPOT_API_KEY) return

  try {
    const response = await fetch("https://api.hubapi.com/crm/v3/objects/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.HUBSPOT_API_KEY}`,
      },
      body: JSON.stringify({
        properties: {
          email: contactData.email,
          firstname: contactData.name?.split(" ")[0],
          lastname: contactData.name?.split(" ").slice(1).join(" "),
          phone: contactData.phone,
          company: contactData.company,
          space_type: contactData.spaceType,
          space_size: contactData.size,
          location_preference: contactData.location,
          timeline: contactData.timeline,
        },
      }),
    })

    return await response.json()
  } catch (error) {
    console.error("Failed to create HubSpot contact:", error)
  }
}
