import { Clock, MapPin, ThumbsUp } from "lucide-react"

export default function WhyChooseUs() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose RentSmallSpace</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We've helped 200+ businesses find their perfect space. Here's why they trust us.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-gray-50 rounded-lg p-8 shadow-sm">
            <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-6">
              <Clock className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold mb-3">24 Hours Response Time</h3>
            <p className="text-gray-600">
              We respond to all inquiries within 24 hours, so you can move quickly on your space needs.
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-8 shadow-sm">
            <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-6">
              <MapPin className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold mb-3">Local Expertise</h3>
            <p className="text-gray-600">
              Our team has deep knowledge of Colorado's commercial real estate market and hidden opportunities.
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-8 shadow-sm">
            <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-6">
              <ThumbsUp className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold mb-3">Proven Track Record</h3>
            <p className="text-gray-600">
              200+ successful placements. From startups to established businesses, we deliver results.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
