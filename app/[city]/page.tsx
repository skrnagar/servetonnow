"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useParams } from "next/navigation"
import { FaList, FaSearch, FaTh, FaArrowRight, FaStar } from "react-icons/fa"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useGeolocation } from "@/context/geolocation-context"
import { useIsMobile } from "@/hooks/use-mobile"

export default function CityPage() {
  const params = useParams()
  const { userCity } = useGeolocation()
  const [isGridView, setIsGridView] = useState(true)
  const [windowWidth, setWindowWidth] = useState(0)

  // Get city name from URL parameter
  const cityName = typeof params.city === 'string' ? params.city : params.city?.[0] || ''
  const formattedCityName = cityName.charAt(0).toUpperCase() + cityName.slice(1)
  const citySlug = cityName.toLowerCase(); // Assumed definition for citySlug


  useEffect(() => {
    // We don't need to set the city here as we're getting it from the URL
    // The userCity from context is only used for comparison

    // Set initial window width
    setWindowWidth(window.innerWidth)

    // Update window width on resize
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [formattedCityName, userCity])

  const isMobile = windowWidth < 640

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <section className="rounded-xl bg-gradient-to-r from-primary/10 to-primary/20 p-6 mb-10">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Home Services in <span className="text-primary">{formattedCityName}</span>
            </h1>
            <p className="mt-3 text-gray-600 dark:text-gray-300">
              Find reliable professionals for all your home service needs in {formattedCityName}
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <FaSearch className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search for a service..."
                  className="pl-10"
                />
              </div>
              <Button>Search</Button>
            </div>
          </div>
          <div className="relative w-full md:w-1/3 h-44 md:h-64">
            <Image
              src="/placeholder.svg"
              alt={`Services in ${formattedCityName}`}
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Service Categories</h2>
          <Link href={`/${citySlug}/services`} className="text-primary hover:underline flex items-center">
            View All
            <FaArrowRight className="ml-1 h-3 w-3" />
          </Link>
        </div>

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

      {/* Popular Services Section */}
      <section className="mb-12 mt-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Popular Services in {formattedCityName}</h2>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className={`p-2 ${isGridView ? "bg-gray-100 dark:bg-gray-800" : ""}`}
              onClick={() => setIsGridView(true)}
            >
              <FaTh className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={`p-2 ${!isGridView ? "bg-gray-100 dark:bg-gray-800" : ""}`}
              onClick={() => setIsGridView(false)}
            >
              <FaList className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {isGridView ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div key={item} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="relative h-40">
                  <Image
                    src={`/placeholder.svg?height=300&width=400&text=Service+${item}`}
                    alt={`Service ${item}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center mb-2">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className="h-4 w-4" />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 ml-2">(120+ reviews)</span>
                  </div>
                  <h3 className="font-semibold mb-1">Home Deep Cleaning</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    Professional cleaning service for homes
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-primary">₹999</span>
                    <Button size="sm">Book Now</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="flex flex-col sm:flex-row gap-4 bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700"
              >
                <div className="relative w-full sm:w-48 h-40 sm:h-auto">
                  <Image
                    src={`/placeholder.svg?height=300&width=400&text=Service+${item}`}
                    alt={`Service ${item}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4 flex-1">
                  <div className="flex items-center mb-2">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className="h-4 w-4" />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 ml-2">(120+ reviews)</span>
                  </div>
                  <h3 className="font-semibold mb-1">Home Deep Cleaning</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    Professional cleaning service for homes. Our experts will clean every corner of your house.
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-primary">₹999</span>
                    <Button size="sm">Book Now</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* How It Works Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">How It Works in {formattedCityName}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step 1 */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <span className="text-xl font-bold text-primary">1</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Select a Service</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Browse through our wide range of professional services available in {formattedCityName} and choose what you need.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <span className="text-xl font-bold text-primary">2</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Book a Time Slot</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Choose a convenient date and time slot for your service in {formattedCityName}, and we'll send a professional to your location.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <span className="text-xl font-bold text-primary">3</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Get Service Delivered</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Sit back and relax as our professionals come to your location in {formattedCityName} to deliver high-quality service at your scheduled time.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Professionals */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Top Professionals in {formattedCityName}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="flex flex-col items-center text-center">
                <div className="relative w-20 h-20 mb-4">
                  <Image
                    src="/placeholder-user.jpg"
                    alt="Professional"
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <h3 className="font-semibold">John Doe</h3>
                <p className="text-sm text-gray-500 mb-2">Plumbing Expert</p>
                <div className="flex text-yellow-400 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="h-4 w-4" />
                  ))}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  5+ years of experience in residential and commercial plumbing services in {formattedCityName}.
                </p>
                <Button size="sm" variant="outline" className="w-full">
                  View Profile
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}