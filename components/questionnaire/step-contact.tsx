"use client"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Mail, Shield, Clock, CheckCircle } from "lucide-react"

export default function ContactStep({
  name,
  email,
  phone,
  smsConsent,
  onNameChange,
  onEmailChange,
  onPhoneChange,
  onSmsConsentChange,
}: {
  name: string
  email: string
  phone: string
  smsConsent: boolean
  onNameChange: (value: string) => void
  onEmailChange: (value: string) => void
  onPhoneChange: (value: string) => void
  onSmsConsentChange: (value: boolean) => void
}) {
  const handleOAuthGoogle = () => {
    // In a real implementation, this would authenticate with Google
    // For now, we'll just simulate a successful auth
    onEmailChange("user@gmail.com")
    onNameChange("Google User")
    onPhoneChange("555-123-4567")
  }

  const handleOAuthApple = () => {
    // In a real implementation, this would authenticate with Apple
    // For now, we'll just simulate a successful auth
    onEmailChange("user@icloud.com")
    onNameChange("Apple User")
    onPhoneChange("555-987-6543")
  }

  return (
    <div className="max-w-lg mx-auto">
      <div className="text-center mb-8">
        <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Perfect! We found matches.</h2>
        <p className="text-lg text-gray-600">Get your personalized property list in under 24 hours</p>
      </div>

      {/* Benefits */}
      <div className="bg-blue-50 p-6 rounded-lg mb-8">
        <h3 className="font-bold text-blue-900 mb-4">What happens next:</h3>
        <div className="space-y-3">
          <div className="flex items-center text-blue-800">
            <Clock className="h-5 w-5 mr-3 text-blue-600" />
            <span>We'll call you within 24 hours</span>
          </div>
          <div className="flex items-center text-blue-800">
            <Mail className="h-5 w-5 mr-3 text-blue-600" />
            <span>Receive your custom property matches</span>
          </div>
          <div className="flex items-center text-blue-800">
            <CheckCircle className="h-5 w-5 mr-3 text-blue-600" />
            <span>Schedule tours of your favorites</span>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* OAuth buttons */}
        <div className="space-y-3">
          <Button
            type="button"
            variant="outline"
            className="w-full flex items-center justify-center gap-2 h-12"
            onClick={handleOAuthGoogle}
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Continue with Google
          </Button>

          <Button
            type="button"
            variant="outline"
            className="w-full flex items-center justify-center gap-2 h-12"
            onClick={handleOAuthApple}
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701z" />
            </svg>
            Continue with Apple
          </Button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">or</span>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            placeholder="Your name"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            autoComplete="name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="flex items-center">
            Email <span className="text-red-500 ml-1">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            required
            autoComplete="email"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="flex items-center">
            Phone <span className="text-red-500 ml-1">*</span>
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder="(303) 555-1234"
            value={phone}
            onChange={(e) => onPhoneChange(e.target.value)}
            required
            autoComplete="tel"
          />
        </div>

        <div className="flex items-start space-x-3">
          <Checkbox
            id="sms-consent"
            checked={smsConsent}
            onCheckedChange={(checked) => onSmsConsentChange(checked as boolean)}
          />
          <Label htmlFor="sms-consent" className="text-sm leading-tight">
            Yes, text me property updates and tour reminders. Standard rates apply.
          </Label>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center text-sm text-gray-600">
            <Shield className="h-4 w-4 mr-2" />
            <span>Your information is secure and never shared with third parties</span>
          </div>
        </div>
      </div>
    </div>
  )
}
