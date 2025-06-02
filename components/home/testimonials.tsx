import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Nate Melcor",
    company: "The Mug Shoppe",
    quote:
      "We needed a small retail space in a high-traffic area — and we needed it quickly. Lease Small Spaces helped us through the process from start to finish. It was low-pressure, fast, and we got exactly what we needed to grow our business.",
    logo: "/images/nate-melcor-icon.png",
    rating: 5,
  },
  {
    name: "Davis Condreay",
    company: "Tegra Electric",
    quote:
      "The process was streamlined from the start. Actual numbers up front. They gave us solid options, helped us secure a short-term sublease to meet our immediate need, and we'll absolutely be working with them again.",
    logo: "/images/tegra-electric-logo.png",
    rating: 5,
  },
  {
    name: "Carter Jones",
    company: "Foster Plumbing",
    quote:
      "Lease Small Spaces was great to work with as we expanded into a new market. We needed a satellite warehouse, and flexibility was key. They delivered — fast, easy, and accurate.",
    logo: "/images/foster-plumbing-logo.png",
    rating: 5,
  },
]

export default function Testimonials() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real businesses, real results. See why Colorado companies choose Lease Small Spaces.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8">
                <Quote className="h-8 w-8 text-blue-600/20 mb-6" />

                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                <p className="text-gray-700 mb-8 leading-relaxed italic">"{testimonial.quote}"</p>

                <div className="flex items-center">
                  <div className="h-16 w-16 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center mr-4 p-2">
                    <img
                      src={testimonial.logo || "/placeholder.svg"}
                      alt={`${testimonial.company} logo`}
                      className="max-h-12 max-w-12 w-auto h-auto object-contain"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{testimonial.name}</p>
                    <p className="text-blue-600 font-medium">{testimonial.company}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 text-lg">
            <span className="font-semibold text-blue-600">500+</span> satisfied businesses and counting
          </p>
        </div>
      </div>
    </section>
  )
}
