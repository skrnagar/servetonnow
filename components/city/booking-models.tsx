
"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FaArrowRight } from "react-icons/fa"

export default function BookingModels({ citySlug }: { citySlug: string }) {
  return (
    <section className="mb-12">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold">Choose Your Booking Method</h2>
        <p className="text-gray-600 mt-2 max-w-3xl mx-auto">
          Select from three flexible ways to hire professionals, each designed for different service needs
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Direct Booking */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border-2 border-primary/20 hover:border-primary/50 transition-all">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto">
            <span className="text-3xl">⚡</span>
          </div>
          <div className="mb-4 text-center">
            <h3 className="text-xl font-bold mb-1">Direct Booking</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Instant service at fixed prices
            </p>
          </div>
          <ul className="space-y-2 mb-6">
            <li className="flex items-center">
              <span className="text-primary mr-2">✓</span>
              <span>Fixed transparent pricing</span>
            </li>
            <li className="flex items-center">
              <span className="text-primary mr-2">✓</span>
              <span>Instant booking</span>
            </li>
            <li className="flex items-center">
              <span className="text-primary mr-2">✓</span>
              <span>Verified professionals</span>
            </li>
            <li className="flex items-center">
              <span className="text-primary mr-2">✓</span>
              <span>Quality guarantee</span>
            </li>
          </ul>
          <div className="text-center">
            <Link href={`/${citySlug}/services/book-direct`}>
              <Button className="px-6">Book Now</Button>
            </Link>
          </div>
        </div>

        {/* Vendor Comparison */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border-2 border-primary/20 hover:border-primary/50 transition-all">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto">
            <span className="text-3xl">🔍</span>
          </div>
          <div className="mb-4 text-center">
            <h3 className="text-xl font-bold mb-1">Compare Vendors</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Choose from multiple providers
            </p>
          </div>
          <ul className="space-y-2 mb-6">
            <li className="flex items-center">
              <span className="text-primary mr-2">✓</span>
              <span>Compare multiple vendors</span>
            </li>
            <li className="flex items-center">
              <span className="text-primary mr-2">✓</span>
              <span>Read verified reviews</span>
            </li>
            <li className="flex items-center">
              <span className="text-primary mr-2">✓</span>
              <span>Choose based on your preferences</span>
            </li>
            <li className="flex items-center">
              <span className="text-primary mr-2">✓</span>
              <span>Direct communication</span>
            </li>
          </ul>
          <div className="text-center">
            <Link href={`/${citySlug}/services/compare-vendors`}>
              <Button className="px-6">Compare</Button>
            </Link>
          </div>
        </div>

        {/* Task Bidding */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border-2 border-primary/20 hover:border-primary/50 transition-all">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto">
            <span className="text-3xl">📝</span>
          </div>
          <div className="mb-4 text-center">
            <h3 className="text-xl font-bold mb-1">Task Bidding</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Get competitive bids for your project
            </p>
          </div>
          <ul className="space-y-2 mb-6">
            <li className="flex items-center">
              <span className="text-primary mr-2">✓</span>
              <span>Set your budget</span>
            </li>
            <li className="flex items-center">
              <span className="text-primary mr-2">✓</span>
              <span>Receive multiple bids</span>
            </li>
            <li className="flex items-center">
              <span className="text-primary mr-2">✓</span>
              <span>Choose the best offer</span>
            </li>
            <li className="flex items-center">
              <span className="text-primary mr-2">✓</span>
              <span>Perfect for custom projects</span>
            </li>
          </ul>
          <div className="text-center">
            <Link href={`/${citySlug}/services/post-task`}>
              <Button className="px-6">Post Task</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
