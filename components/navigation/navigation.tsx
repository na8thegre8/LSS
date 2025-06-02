"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu, X, Home, Search, HelpCircle, Rocket } from "lucide-react"

export function Navigation() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/questionnaire", label: "See Availability", icon: Search },
    { href: "/faq", label: "FAQ", icon: HelpCircle },
  ]

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          {/* Logo and Brand */}
          <Link href="/" className="flex items-center space-x-3 hover:opacity-90 transition-opacity">
            <Image
              src="/images/logo-green-pin-warehouse.png"
              alt="LeaseSmallSpace Logo"
              width={48}
              height={48}
              className="w-12 h-12"
              priority
            />
            <span className="text-xl font-bold text-blue-600">LeaseSmallSpace.com</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const IconComponent = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-2 text-sm font-medium transition-all duration-200 hover:text-blue-600 hover:scale-105 text-gray-700`}
                >
                  <IconComponent className="w-4 h-4 text-green-600" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
            <Button
              asChild
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 border border-green-500"
            >
              <Link href="/questionnaire" className="flex items-center space-x-2">
                <Rocket className="w-4 h-4 text-green-300" />
                <span>Get Started</span>
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-100 mt-2 pt-4">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => {
                const IconComponent = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 text-sm font-medium py-3 px-4 rounded-lg transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 text-gray-700`}
                  >
                    <IconComponent className="w-5 h-5 text-green-600" />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
              <Button
                asChild
                className="bg-green-600 hover:bg-green-700 text-white font-semibold mx-4 mt-2 rounded-lg shadow-md border border-green-500"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Link href="/questionnaire" className="flex items-center justify-center space-x-2">
                  <Rocket className="w-4 h-4 text-green-300" />
                  <span>Get Started</span>
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
