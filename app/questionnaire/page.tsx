import type { Metadata } from "next"
import QuestionnaireWizardWithDatabase from "@/components/questionnaire/wizard-with-database"

export const metadata: Metadata = {
  title: "Find Your Space | RentSmallSpace.com",
  description: "Answer a few quick questions to find your perfect Colorado commercial space",
}

export default function QuestionnairePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <QuestionnaireWizardWithDatabase />
      </div>
    </main>
  )
}
