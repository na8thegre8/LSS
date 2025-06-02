import { MapPin, Building, Zap, Award, Clock, DollarSign, Users, CheckCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

const benefits = [
  {
    icon: <Zap className="h-8 w-8 text-white" />,
    title: "Immediate Availability",
    description: "Skip the 6-month search. Our spaces are ready now with keys available within 48 hours.",
    gradient: "from-blue-500 to-blue-600",
  },
  {
    icon: <DollarSign className="h-8 w-8 text-white" />,
    title: "Transparent Pricing",
    description: "No hidden fees, no surprises. What we quote is what you pay - period.",
    gradient: "from-emerald-500 to-emerald-600",
  },
  {
    icon: <Building className="h-8 w-8 text-white" />,
    title: "1M+ Sq Ft Portfolio",
    description: "Choose from our massive inventory of owned, leased, and managed properties across Colorado.",
    gradient: "from-purple-500 to-purple-600",
  },
  {
    icon: <Users className="h-8 w-8 text-white" />,
    title: "Direct Owner Access",
    description: "Talk directly to decision makers. No middlemen, no runaround, just fast answers.",
    gradient: "from-orange-500 to-orange-600",
  },
  {
    icon: <MapPin className="h-8 w-8 text-white" />,
    title: "Colorado Specialists",
    description: "15+ years of local expertise. We know every market, every neighborhood, every opportunity.",
    gradient: "from-red-500 to-red-600",
  },
  {
    icon: <Award className="h-8 w-8 text-white" />,
    title: "Proven Track Record",
    description: "500+ successful placements. From startups to established businesses, we deliver results.",
    gradient: "from-indigo-500 to-indigo-600",
  },
]

const stats = [
  { number: "48", label: "Hours Average to Keys", suffix: "hrs", icon: <Clock className="h-6 w-6" /> },
  { number: "500", label: "Businesses Placed", suffix: "+", icon: <Users className="h-6 w-6" /> },
  { number: "1M", label: "Sq Ft Portfolio", suffix: "+", icon: <Building className="h-6 w-6" /> },
  { number: "15", label: "Years in Colorado", suffix: "+", icon: <Award className="h-6 w-6" /> },
]

export default function WhyRentSmallSpace() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Why Colorado Businesses Choose{" "}
            <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
              Lease Small Space
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
            Colorado's small space leasing specialists. Faster, more affordable, and more convenient than anyone else.
          </p>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="flex items-center justify-center mb-3">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-3 rounded-full">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {stat.number}
                  <span className="text-2xl text-blue-600">{stat.suffix}</span>
                </div>
                <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-200"
            >
              <div
                className={`bg-gradient-to-r ${benefit.gradient} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900 group-hover:text-blue-600 transition-colors">
                {benefit.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Comparison Section */}
        <div className="bg-gradient-to-r from-blue-50 via-white to-blue-50 rounded-3xl p-8 md:p-12 mb-16 shadow-xl border border-blue-100">
          <h3 className="text-3xl font-bold text-center mb-12 text-gray-900">
            The{" "}
            <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
              Lease Small Space
            </span>{" "}
            Difference
          </h3>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Traditional Way */}
            <div className="bg-white rounded-2xl p-8 border-2 border-red-200 shadow-lg">
              <h4 className="text-xl font-bold mb-6 text-red-600 flex items-center">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-4">
                  <XCircle className="w-5 h-5 text-red-600" />
                </div>
                Traditional Commercial Real Estate
              </h4>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-red-600 text-sm font-bold">✗</span>
                  </div>
                  <span className="text-gray-700">3-6 month search process</span>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-red-600 text-sm font-bold">✗</span>
                  </div>
                  <span className="text-gray-700">Hidden fees and surprise costs</span>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-red-600 text-sm font-bold">✗</span>
                  </div>
                  <span className="text-gray-700">Multiple brokers, endless runaround</span>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-red-600 text-sm font-bold">✗</span>
                  </div>
                  <span className="text-gray-700">Limited inventory, few options</span>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-red-600 text-sm font-bold">✗</span>
                  </div>
                  <span className="text-gray-700">Spaces need major work before move-in</span>
                </li>
              </ul>
            </div>

            {/* Rent Small Space Way */}
            <div className="bg-white rounded-2xl p-8 border-2 border-green-200 shadow-lg">
              <h4 className="text-xl font-bold mb-6 text-green-600 flex items-center">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                The Lease Small Space Way
              </h4>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-green-600 text-sm font-bold">✓</span>
                  </div>
                  <span className="text-gray-700">Keys in hand within 48 hours</span>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-green-600 text-sm font-bold">✓</span>
                  </div>
                  <span className="text-gray-700">Transparent pricing, no surprises</span>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-green-600 text-sm font-bold">✓</span>
                  </div>
                  <span className="text-gray-700">Direct access to owners and decision makers</span>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-green-600 text-sm font-bold">✓</span>
                  </div>
                  <span className="text-gray-700">1M+ sq ft portfolio, endless options</span>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-green-600 text-sm font-bold">✓</span>
                  </div>
                  <span className="text-gray-700">Move-in ready spaces, start operating immediately</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-12 text-white shadow-2xl">
          <h3 className="text-3xl font-bold mb-4">Ready to Experience the Difference?</h3>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join 500+ Colorado businesses who found their perfect space with Lease Small Space. Your ideal warehouse,
            shop, or flex space is waiting.
          </p>
          <Button
            size="lg"
            className="bg-white text-blue-600 hover:bg-gray-100 px-10 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            Find My Space Now
          </Button>
        </div>
      </div>
    </section>
  )
}
