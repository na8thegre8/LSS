import { Button } from "@/components/ui/button"
import { ArrowRight, Phone } from "lucide-react"
import Link from "next/link"

export default function CTA() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-blue-600">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Find Your Perfect Colorado Space?</h2>
        <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
          Join hundreds of satisfied businesses. Get your personalized property matches in under 24 hours.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Link href="/questionnaire">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4">
              Find My Space Now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>

          <a href="tel:+13035551234">
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-4"
            >
              <Phone className="mr-2 h-5 w-5" />
              Call (303) 555-1234
            </Button>
          </a>
        </div>

        <div className="text-center">
          <p className="text-blue-100 text-sm mb-2">Or email us directly:</p>
          <a href="mailto:hello@rentsmallspace.com" className="text-white hover:text-blue-200 font-medium">
            hello@rentsmallspace.com
          </a>
        </div>
      </div>
    </section>
  )
}
