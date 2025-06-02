export interface EmailData {
  to: string | string[]
  subject: string
  html?: string
  template?: string
  data?: any
  from?: string
}

// Stub email function - just logs to console
export function sendEmail(emailData: EmailData) {
  console.log("Email sending disabled - would have sent email:", {
    to: emailData.to,
    subject: emailData.subject,
  })

  return { success: false, message: "Email service not configured" }
}

// Email template generator (for future use)
function getEmailTemplate(template: string, data: any): string {
  switch (template) {
    case "welcome-lead":
      return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="text-align: center; padding: 40px 20px;">
            <h1 style="color: #2563eb; margin-bottom: 10px;">Welcome to LeaseSmallSpace!</h1>
            <p style="color: #64748b; font-size: 18px;">Thank you for your interest, ${data.name}!</p>
          </div>
          
          <div style="background: #f8fafc; padding: 30px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #1e293b; margin-bottom: 20px;">What's Next?</h2>
            <ul style="color: #475569; line-height: 1.6;">
              <li>Our expert team is reviewing your requirements</li>
              <li>We'll match you with suitable properties</li>
              <li>Expect a call within 24 hours at ${data.phone}</li>
              <li>Schedule property viewings that fit your timeline</li>
            </ul>
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
      `

    case "new-lead-notification":
      return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">🎯 New Lead from LeaseSmallSpace</h2>
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Contact Information</h3>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Phone:</strong> ${data.phone}</p>
            <p><strong>Source:</strong> ${data.source}</p>
            <p><strong>Page:</strong> ${data.page}</p>
            <p><strong>Time:</strong> ${data.timestamp}</p>
          </div>
          <div style="text-align: center; padding: 20px;">
            <a href="tel:${data.phone}" style="background: #16a34a; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; margin: 5px;">
              Call Now
            </a>
            <a href="mailto:${data.email}" style="background: #2563eb; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; margin: 5px;">
              Send Email
            </a>
          </div>
        </div>
      `

    default:
      return `<p>Thank you for contacting LeaseSmallSpace!</p>`
  }
}

// Export empty email templates for backward compatibility
export const emailTemplates = {
  leadNotification: (leadData: any) => `<p>Lead notification for ${leadData.name}</p>`,
  welcomeEmail: (userData: any) => `<p>Welcome ${userData.name}!</p>`,
  propertyAlert: (properties: any[], userData: any) => `<p>Property alert for ${userData.name}</p>`,
}
