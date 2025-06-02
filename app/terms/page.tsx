import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Use | RentSmallSpace.com",
  description: "Terms of Use for RentSmallSpace.com - Colorado Commercial Properties",
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Use</h1>

          <p className="text-gray-600 mb-8">Last updated: 6/1/2025</p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">1. Acceptance of Terms</h2>
          <p className="text-gray-700 mb-6">
            By accessing and using RentSmallSpace ("we," "us," or "our"), you accept and agree to be bound by these
            Terms of Use and our Privacy Policy. If you do not agree to these terms, you must not use our service.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">2. Description of Service</h2>
          <p className="text-gray-700 mb-6">
            RentSmallSpace provides an online platform connecting businesses seeking commercial space with property
            owners and managers. We do not own, operate, or manage any properties listed on our platform.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">3. User Obligations</h2>
          <p className="text-gray-700 mb-4">You agree to:</p>
          <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
            <li>Provide accurate and complete information</li>
            <li>Maintain the confidentiality of your account information</li>
            <li>Use the service for lawful purposes only</li>
            <li>Not interfere with the proper operation of the service</li>
            <li>Not attempt to circumvent any security measures</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">4. Intellectual Property</h2>
          <p className="text-gray-700 mb-6">
            All content, features, and functionality of our service are owned by RentSmallSpace and are protected by
            international copyright, trademark, and other intellectual property laws.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">5. Disclaimer of Warranties</h2>
          <p className="text-gray-700 mb-4">
            Our service is provided on an "as is" and "as available" basis. We make no warranties, expressed or implied,
            regarding:
          </p>
          <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
            <li>The accuracy or completeness of property listings</li>
            <li>The availability of any specific property</li>
            <li>The outcome of any transaction or negotiation</li>
            <li>The reliability of any user-provided information</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">6. Limitation of Liability</h2>
          <p className="text-gray-700 mb-4">
            To the maximum extent permitted by law, RentSmallSpace shall not be liable for any indirect, incidental,
            special, consequential, or punitive damages, including but not limited to:
          </p>
          <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
            <li>Loss of profits, data, or business opportunities</li>
            <li>Damages arising from property transactions</li>
            <li>Interruption of business operations</li>
            <li>Any other damages arising from use of our service</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">7. Indemnification</h2>
          <p className="text-gray-700 mb-6">
            You agree to indemnify and hold harmless RentSmallSpace, its officers, directors, employees, and agents from
            any claims, damages, or expenses arising from your use of the service or violation of these terms.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">8. Modifications to Service</h2>
          <p className="text-gray-700 mb-6">
            We reserve the right to modify or discontinue any aspect of our service at any time without notice. We shall
            not be liable to you or any third party for any modification, suspension, or discontinuance.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">9. Governing Law</h2>
          <p className="text-gray-700 mb-6">
            These terms shall be governed by and construed in accordance with the laws of the State of Colorado, without
            regard to its conflict of law provisions.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">10. Contact Information</h2>
          <p className="text-gray-700 mb-4">For questions about these Terms of Use, please contact us at:</p>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <p className="text-gray-700 mb-2">
              <strong>Email:</strong>{" "}
              <a href="mailto:legal@rentsmallspace.com" className="text-blue-600 hover:text-blue-800">
                legal@rentsmallspace.com
              </a>
            </p>
            <p className="text-gray-700 mb-0">
              <strong>Phone:</strong>{" "}
              <a href="tel:+17205756611" className="text-blue-600 hover:text-blue-800">
                (720) 575-6611
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
