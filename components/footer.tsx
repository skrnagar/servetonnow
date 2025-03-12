import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {/* Logo and description */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/serveto_logo_main.png"
                alt="Serveto Logo"
                width={40}
                height={40}
                className="h-10 w-auto"
              />
             
            </Link>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 max-w-md">
              Serveto is an AI-powered home services platform offering direct bookings, vendor comparison, and task
              bidding. We make home services simple and efficient.
            </p>
            <div className="mt-6 flex space-x-4">
              <Link href="#" className="text-gray-500 hover:text-primary">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-primary">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-primary">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-primary">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white">Services</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/services/cleaning" className="text-sm text-gray-600 hover:text-primary dark:text-gray-400">
                  Home Cleaning
                </Link>
              </li>
              <li>
                <Link href="/services/plumbing" className="text-sm text-gray-600 hover:text-primary dark:text-gray-400">
                  Plumbing
                </Link>
              </li>
              <li>
                <Link
                  href="/services/electrical"
                  className="text-sm text-gray-600 hover:text-primary dark:text-gray-400"
                >
                  Electrical
                </Link>
              </li>
              <li>
                <Link
                  href="/services/appliance-repair"
                  className="text-sm text-gray-600 hover:text-primary dark:text-gray-400"
                >
                  Appliance Repair
                </Link>
              </li>
              <li>
                <Link href="/services/all" className="text-sm text-gray-600 hover:text-primary dark:text-gray-400">
                  View All Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white">Company</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/about" className="text-sm text-gray-600 hover:text-primary dark:text-gray-400">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-sm text-gray-600 hover:text-primary dark:text-gray-400">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-gray-600 hover:text-primary dark:text-gray-400">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-600 hover:text-primary dark:text-gray-400">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white">Contact</h3>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <Mail className="h-4 w-4 mr-2 text-gray-500" />
                support@serveto.com
              </li>
              <li className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <Phone className="h-4 w-4 mr-2 text-gray-500" />
                +1 (800) 123-4567
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            &copy; {new Date().getFullYear()} Serveto. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <Link href="/privacy" className="text-sm text-gray-600 hover:text-primary dark:text-gray-400">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-gray-600 hover:text-primary dark:text-gray-400">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-sm text-gray-600 hover:text-primary dark:text-gray-400">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

