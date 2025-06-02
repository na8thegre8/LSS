import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "How does SpaceSelector find commercial spaces?",
    answer:
      "SpaceSelector uses AI technology to aggregate listings from multiple sources including LoopNet, Crexi, Facebook Marketplace, Craigslist, and more. We update our database nightly to ensure you see the most current options.",
  },
  {
    question: "What does the Deal Score mean?",
    answer:
      "Our proprietary Deal Score algorithm compares each listing to similar spaces in the same area. 'Great Deal' means the space is priced below market value, 'Fair Deal' means it's priced at market value, and 'Over Market' means it's priced above comparable spaces.",
  },
  {
    question: "Is SpaceSelector free to use?",
    answer:
      "Yes, SpaceSelector is completely free for tenants. We make money through partnerships with service providers like insurance companies, lenders, and logistics vendors who can help you after you find your space.",
  },
  {
    question: "Will I be contacted by multiple brokers?",
    answer:
      "No. Unlike other platforms, we never sell your information to multiple brokers. When you request information about a space, you'll only be contacted by a single space specialist who can help coordinate tours and answer questions.",
  },
  {
    question: "What areas does SpaceSelector cover?",
    answer:
      "We currently serve the Colorado market, with plans to expand to additional states soon. Our focus is on spaces under 7,500 square feet that are often overlooked by traditional commercial real estate platforms.",
  },
]

export default function FAQ() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600">Everything you need to know about finding your space</p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left font-medium">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-gray-600">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
