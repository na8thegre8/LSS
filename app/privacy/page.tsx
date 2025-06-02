import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy | RentSmallSpace.com",
  description: "Privacy Policy for RentSmallSpace.com - Colorado Commercial Properties",
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <p className="text-blue-800 mb-0">
              <strong>Note:</strong> Please provide your Privacy Policy content and I'll update this page with your
              specific privacy practices and policies.
            </p>
          </div>

          <h2>Information We Collect</h2>
          <p>
            We collect information you provide directly to us, such as when you create an account, fill out a form, or
            contact us for support.
          </p>

          <h2>How We Use Your Information</h2>
          <p>
            We use the information we collect to provide, maintain, and improve our services, process transactions, and
            communicate with you.
          </p>

          <h2>Information Sharing</h2>
          <p>
            We do not sell, trade, or otherwise transfer your personal information to third parties without your
            consent, except as described in this policy.
          </p>

          <h2>Data Security</h2>
          <p>
            We implement appropriate security measures to protect your personal information against unauthorized access,
            alteration, disclosure, or destruction.
          </p>

          <h2>Cookies</h2>
          <p>
            We use cookies to enhance your experience on our website. You can choose to disable cookies through your
            browser settings.
          </p>

          <h2>Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us through our website.</p>
        </div>
      </div>
    </div>
  )
}
