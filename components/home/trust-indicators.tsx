import { CheckCircle } from "lucide-react"

const TrustIndicators = () => {
  const trustItems = [
    "Denver Metro Chamber",
    "Colorado REIA",
    "Better Business Bureau",
    "DORA",
    "200+ Businesses Placed",
  ]

  return (
    <div className="bg-white border-t border-b border-gray-200 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-gray-600 text-sm font-medium mb-4">Trusted Colorado Business</p>

          <div className="flex flex-wrap justify-center items-center gap-6 lg:gap-8">
            {trustItems.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                <span className="text-gray-700 font-medium text-sm lg:text-base whitespace-nowrap">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TrustIndicators
