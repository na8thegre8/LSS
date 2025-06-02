import { CheckSquare, MapPin, Search, ThumbsUp } from "lucide-react"

export default function HowItWorks() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">How SpaceSelector Works</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Finding your perfect commercial space is now as easy as booking a flight
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white rounded-lg p-6 shadow-md text-center">
            <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckSquare className="h-8 w-8 text-[#ED4337]" />
            </div>
            <h3 className="text-xl font-bold mb-2">Answer 5 Questions</h3>
            <p className="text-gray-600">Tell us what you need in your ideal space with our simple questionnaire</p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md text-center">
            <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-[#ED4337]" />
            </div>
            <h3 className="text-xl font-bold mb-2">AI Finds Matches</h3>
            <p className="text-gray-600">Our AI searches every listing across multiple platforms in seconds</p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md text-center">
            <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <ThumbsUp className="h-8 w-8 text-[#ED4337]" />
            </div>
            <h3 className="text-xl font-bold mb-2">See Deal Scores</h3>
            <p className="text-gray-600">Each listing is ranked as Great, Fair, or Over-market based on real data</p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md text-center">
            <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="h-8 w-8 text-[#ED4337]" />
            </div>
            <h3 className="text-xl font-bold mb-2">Tour & Lease</h3>
            <p className="text-gray-600">24 hours response time. Moving in less than a month.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
