import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export interface EmailData {
  to: string[]
  subject: string
  html: string
  from?: string
}

export async function sendEmail({
  to,
  subject,
  html,
  from = "LeaseSmallSpace <noreply@leasesmallspace.com>",
}: EmailData) {
  try {
    const { data, error } = await resend.emails.send({
      from,
      to,
      subject,
      html,
    })

    if (error) {
      console.error("Email sending error:", error)
      throw error
    }

    return data
  } catch (error) {
    console.error("Failed to send email:", error)
    throw error
  }
}

// Email templates
export const emailTemplates = {
  leadNotification: (leadData: any) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #2563eb;">New Lead from LeaseSmallSpace</h2>
      <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3>Contact Information</h3>
        <p><strong>Name:</strong> ${leadData.name}</p>
        <p><strong>Email:</strong> ${leadData.email}</p>
        <p><strong>Phone:</strong> ${leadData.phone}</p>
      </div>
      <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3>Space Requirements</h3>
        <p><strong>Space Type:</strong> ${leadData.spaceType}</p>
        <p><strong>Size:</strong> ${leadData.size} sq ft</p>
        <p><strong>Location:</strong> ${leadData.location}</p>
        <p><strong>Timeline:</strong> ${leadData.timeline}</p>
        <p><strong>Lease/Buy:</strong> ${leadData.leaseOrBuy}</p>
      </div>
      <p style="color: #64748b; font-size: 14px;">
        Lead submitted at ${new Date().toLocaleString()}
      </p>
    </div>
  `,

  welcomeEmail: (userData: any) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="text-align: center; padding: 40px 20px;">
        <h1 style="color: #2563eb; margin-bottom: 10px;">Welcome to LeaseSmallSpace!</h1>
        <p style="color: #64748b; font-size: 18px;">Thank you for your interest in commercial real estate</p>
      </div>
      
      <div style="background: #f8fafc; padding: 30px; border-radius: 8px; margin: 20px 0;">
        <h2 style="color: #1e293b; margin-bottom: 20px;">What's Next?</h2>
        <ul style="color: #475569; line-height: 1.6;">
          <li>Our team is reviewing your requirements</li>
          <li>We'll match you with suitable properties</li>
          <li>Expect a call within 24 hours</li>
          <li>Schedule property viewings that fit your timeline</li>
        </ul>
      </div>

      <div style="background: #dbeafe; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #1e40af;">Your Requirements Summary:</h3>
        <p><strong>Space Type:</strong> ${userData.spaceType}</p>
        <p><strong>Size:</strong> ${userData.size} sq ft</p>
        <p><strong>Location:</strong> ${userData.location}</p>
        <p><strong>Timeline:</strong> ${userData.timeline}</p>
      </div>

      <div style="text-align: center; padding: 30px 20px;">
        <a href="https://leasesmallspace.com/faq" 
           style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
          View FAQ
        </a>
      </div>

      <div style="border-top: 1px solid #e2e8f0; padding: 20px; text-align: center; color: #64748b; font-size: 14px;">
        <p>Questions? Reply to this email or call us at (303) 555-0123</p>
        <p>LeaseSmallSpace.com | Colorado's Premier Commercial Real Estate Platform</p>
      </div>
    </div>
  `,

  propertyAlert: (properties: any[], userData: any) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #2563eb;">New Properties Match Your Criteria!</h2>
      <p>Hi ${userData.name}, we found ${properties.length} new properties that match your requirements:</p>
      
      ${properties
        .map(
          (property) => `
        <div style="border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin: 20px 0;">
          <h3 style="color: #1e293b;">${property.title}</h3>
          <p><strong>Size:</strong> ${property.size_sqft} sq ft</p>
          <p><strong>Price:</strong> $${property.price_monthly}/month</p>
          <p><strong>Location:</strong> ${property.city}, ${property.state}</p>
          <a href="https://leasesmallspace.com/property/${property.id}" 
             style="background: #2563eb; color: white; padding: 8px 16px; text-decoration: none; border-radius: 4px; display: inline-block; margin-top: 10px;">
            View Details
          </a>
        </div>
      `,
        )
        .join("")}
      
      <div style="text-align: center; padding: 20px;">
        <a href="https://leasesmallspace.com/results" 
           style="background: #16a34a; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
          View All Matches
        </a>
      </div>
    </div>
  `,
}
