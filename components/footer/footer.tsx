import Link from "next/link"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <Image
                src="/images/logo-green-pin-warehouse.png"
                alt="LeaseSmallSpace Logo"
                width={40}
                height={40}
                className="w-10 h-10"
              />
              <span className="text-xl font-bold text-blue-600">LeaseSmallSpace</span>
            </div>
            <p className="text-gray-600 max-w-md leading-relaxed">
              Simplifying the search for small warehouse and industrial space in Colorado. Find your perfect space with
              real-time availability and transparent pricing.
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/terms" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
                  Admin
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Border */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} LeaseSmallSpace.com. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
