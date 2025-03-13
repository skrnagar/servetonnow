
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { FaArrowRight, FaSearch } from "react-icons/fa"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { ChevronRight, Star } from "lucide-react"

export default function CityPage({ params }: { params: { city: string } }) {
  const citySlug = params.city.toLowerCase()
  const formattedCityName = citySlug.charAt(0).toUpperCase() + citySlug.slice(1)
  
  // State for window width
  const [windowWidth, setWindowWidth] = useState(0)
  
  // Effect to measure window width
  useEffect(() => {
    // Update the windowWidth state when component mounts
    setWindowWidth(window.innerWidth)
    
    // Update windowWidth state when window is resized
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }
    
    window.addEventListener('resize', handleResize)
    
    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  
  // Determine if we're on mobile
  const isMobile = windowWidth < 640

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <section className="rounded-xl bg-gradient-to-r from-primary/10 to-primary/20 p-6 mb-10">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="w-full md:w-2/3">
            <h1 className="text-3xl md:text-4xl font-bold">
              Home Services in {formattedCityName}
            </h1>
            <p className="mt-3 text-gray-600 dark:text-gray-300">
              Find reliable professionals for all your home service needs in {formattedCityName}
            </p>
            <div className="mt-6">
              <div className="relative">
                <div className="flex overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 space-x-4">
                  {[
                    { name: "Cleaning", icon: "🧹", slug: "cleaning" },
                    { name: "Plumbing", icon: "🚿", slug: "plumbing" },
                    { name: "Electrical", icon: "💡", slug: "electrical" },
                    { name: "Appliance Repair", icon: "🔧", slug: "appliance-repair" },
                    { name: "Pest Control", icon: "🐜", slug: "pest-control" },
                    { name: "Painting", icon: "🎨", slug: "painting" },
                    { name: "Carpentry", icon: "🪚", slug: "carpentry" },
                    { name: "Home Moving", icon: "📦", slug: "home-moving" },
                    { name: "Gardening", icon: "🌿", slug: "gardening" },
                    { name: "Heating & AC", icon: "❄️", slug: "hvac" }
                  ].map((category) => (
                    <Link 
                      key={category.slug}
                      href={`/${citySlug}/${category.slug}`}
                      className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center min-w-[140px]"
                    >
                      <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                        <span className="text-2xl">{category.icon}</span>
                      </div>
                      <h3 className="font-medium text-sm">
                        {category.name}
                      </h3>
                    </Link>
                  ))}
                </div>

                <style jsx global>{`
                  .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                  }
                  .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                  }
                `}</style>
              </div>
            </div>
          </div>
          <div className="relative w-full md:w-1/3 h-44 md:h-64">
            <Image
              src="/placeholder.svg"
              alt={`Home services in ${formattedCityName}`}
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Service Categories Section - 2 rows layout */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-6">Service Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {[
            { name: "Cleaning", icon: "🧹", slug: "cleaning" },
            { name: "Plumbing", icon: "🚿", slug: "plumbing" },
            { name: "Electrical", icon: "💡", slug: "electrical" },
            { name: "Appliance Repair", icon: "🔧", slug: "appliance-repair" },
            { name: "Pest Control", icon: "🐜", slug: "pest-control" },
            { name: "Painting", icon: "🎨", slug: "painting" },
            { name: "Carpentry", icon: "🪚", slug: "carpentry" },
            { name: "Home Moving", icon: "📦", slug: "home-moving" },
            { name: "Gardening", icon: "🌿", slug: "gardening" },
            { name: "Heating & AC", icon: "❄️", slug: "hvac" }
          ].map((category) => (
            <Link 
              key={category.slug}
              href={`/${citySlug}/${category.slug}`}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <span className="text-2xl">{category.icon}</span>
              </div>
              <h3 className="font-semibold">{category.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Booking Models Section */}
      <section className="mb-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold">Choose the booking model that works best for your needs.</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Direct Booking */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="mb-4">
              <h3 className="text-xl font-bold mb-1">Direct Booking</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Book services at fixed prices with our verified professionals. Quick, easy, and reliable.
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
            <Link href={`/${citySlug}/services/book-direct`}>
              <Button className="w-full">Learn More</Button>
            </Link>
          </div>

          {/* Vendor Aggregation */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="mb-4">
              <h3 className="text-xl font-bold mb-1">Vendor Aggregation</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Compare multiple service providers based on ratings, prices, and availability.
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
            <Link href={`/${citySlug}/services/compare-vendors`}>
              <Button className="w-full">Learn More</Button>
            </Link>
          </div>

          {/* Task Bidding */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="mb-4">
              <h3 className="text-xl font-bold mb-1">Task Bidding</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Post your task and receive competitive bids from interested professionals.
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
            <Link href={`/${citySlug}/services/post-task`}>
              <Button className="w-full">Learn More</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Services in Indore Section */}
      <section className="mb-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Popular Services in {formattedCityName}</h2>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            View All <FaArrowRight className="h-3 w-3" />
          </Button>
        </div>
        <div className="relative">
          <div className="flex overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 space-x-4">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden min-w-[260px] md:min-w-[280px] border border-gray-100 dark:border-gray-700">
                <div className="relative h-36">
                  <Image
                    src={`/placeholder.svg?text=Service${item}`}
                    alt={`Service ${item}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-1">Service Name {item}</h3>
                  <div className="flex items-center text-yellow-400 mb-2">
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4" />
                    <span className="text-sm text-gray-600 dark:text-gray-300 ml-1">(120+ reviews)</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                    Professional service with guaranteed satisfaction in {formattedCityName}.
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-primary font-medium">Starting $49</span>
                    <Button size="sm">Book Now</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Why Choose Us Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Why Choose Us in {formattedCityName}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <span className="text-xl">👨‍🔧</span>
            </div>
            <h3 className="font-bold mb-2">Verified Professionals</h3>
            <p className="text-gray-600 dark:text-gray-300">
              All our service providers in {formattedCityName} are background-checked and skill-verified.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <span className="text-xl">💰</span>
            </div>
            <h3 className="font-bold mb-2">Transparent Pricing</h3>
            <p className="text-gray-600 dark:text-gray-300">
              No hidden fees or surprise charges. Know exactly what you pay for.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <span className="text-xl">⭐</span>
            </div>
            <h3 className="font-bold mb-2">Quality Guarantee</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Not satisfied with a service? We'll make it right or give you a refund.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <span className="text-xl">🔒</span>
            </div>
            <h3 className="font-bold mb-2">Secure Bookings</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Online payments and bookings are protected by industry-standard security measures.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Customer Testimonials from {formattedCityName}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="flex items-center text-yellow-400 mb-4">
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                "The service was excellent! The professional was punctual, skilled, and completed the work efficiently. Would highly recommend!"
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="font-medium">AB</span>
                </div>
                <div className="ml-3">
                  <div className="font-medium">Customer {item}</div>
                  <div className="text-sm text-gray-500">{formattedCityName}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="font-bold mb-2">How do I book a service?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              You can book a service by selecting a category, choosing a service, and following the booking process. You can also compare vendors or post a task for bidding.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="font-bold mb-2">What areas do you cover in {formattedCityName}?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Our services are available across all areas of {formattedCityName}, including all neighborhoods and surrounding suburbs.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="font-bold mb-2">How are your professionals verified?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              All professionals undergo background checks, skill verification, and regular quality assessments to ensure they meet our standards.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="font-bold mb-2">What is your cancellation policy?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              You can cancel or reschedule a booking up to 4 hours before the scheduled service time without any charges.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
