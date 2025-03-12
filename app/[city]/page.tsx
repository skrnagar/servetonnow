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

      {/* Popular Services */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Popular Services in {formattedCityName}</h2>
          <div className="flex items-center gap-2">
            <Button
              variant={isGridView ? "default" : "outline"}
              size="icon"
              className="w-9 h-9"
              onClick={() => setIsGridView(true)}
            >
              <FaTh className="h-4 w-4" />
            </Button>
            <Button
              variant={!isGridView ? "default" : "outline"}
              size="icon"
              className="w-9 h-9"
              onClick={() => setIsGridView(false)}
            >
              <FaList className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className={isGridView ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : "flex flex-col gap-4"}>
          {/* Service Cards */}
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className={
                isGridView
                  ? "bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden"
                  : "bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden flex"
              }
            >
              <div className={isGridView ? "relative h-48" : "relative h-full w-40 md:w-64"}>
                <Image
                  src={`/placeholder.svg?height=400&width=600&text=Service${index + 1}`}
                  alt={`Service ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
              <div className={isGridView ? "p-4" : "p-4 flex-1"}>
                <h3 className="text-lg font-semibold mb-2">Service Name {index + 1}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                  Service description goes here. This is a brief summary of what the service entails.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-primary font-medium">Starting ₹{499 + index * 100}</span>
                  <Link href={`/services/service-${index + 1}`}>
                    <Button size="sm">Book Now</Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Services in City - Modern UI */}
      <section className="mb-12 bg-gray-50 dark:bg-gray-800 py-10 rounded-xl">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-3">Popular Services in {formattedCityName}</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Discover the most sought-after home services available in your area
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { 
                name: "Home Cleaning", 
                description: "Professional deep cleaning for your entire home",
                price: "₹499",
                rating: "4.8",
                reviews: "2,134",
                image: "/placeholder.svg?height=200&width=300",
                link: `/${citySlug}/cleaning/home-cleaning`
              },
              { 
                name: "AC Service & Repair", 
                description: "Complete AC maintenance, service and repairs",
                price: "₹699",
                rating: "4.7",
                reviews: "1,892",
                image: "/placeholder.svg?height=200&width=300",
                link: `/${citySlug}/appliance-repair/ac`
              },
              { 
                name: "Plumbing Services", 
                description: "Fix leaks, installations, and plumbing repairs",
                price: "₹399",
                rating: "4.6",
                reviews: "1,653",
                image: "/placeholder.svg?height=200&width=300",
                link: `/${citySlug}/plumbing/pipe-leakage`
              }
            ].map((service, index) => (
              <Link key={index} href={service.link} className="block">
                <div className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all group">
                  <div className="relative h-48">
                    <Image 
                      src={service.image} 
                      alt={service.name} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                      <span className="text-white font-medium p-4">View Details</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold">{service.name}</h3>
                      <span className="bg-primary/10 text-primary px-2 py-1 rounded text-sm font-medium">{service.price}</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">{service.description}</p>
                    <div className="flex items-center">
                      <div className="flex items-center gap-1 text-yellow-500">
                        <FaStar />
                        <span className="font-medium">{service.rating}</span>
                      </div>
                      <span className="text-sm text-gray-500 ml-2">({service.reviews})</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button variant="outline" className="rounded-full px-6">
              View All Services
            </Button>
          </div>
        </div>
      </section>

      {/* Service Categories Section */}
      <section className="mb-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Service Categories</h2>
          <Link href="/services" className="text-primary hover:underline flex items-center">
            View All
            <FaArrowRight className="ml-1 h-3 w-3" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {[
            { name: "Cleaning", icon: "🧹", slug: "cleaning" },
            { name: "Plumbing", icon: "🚿", slug: "plumbing" },
            { name: "Electrical", icon: "💡", slug: "electrical" },
            { name: "Appliance Repair", icon: "🔧", slug: "appliance-repair" },
            { name: "Pest Control", icon: "🐜", slug: "pest-control" },
            { name: "Painting", icon: "🎨", slug: "painting" },
            { name: "Carpentry", icon: "🪚", slug: "carpentry" },
            { name: "Home Moving", icon: "📦", slug: "home-moving" }
          ].map((category) => (
            <Link 
              key={category.slug}
              href={`/${citySlug}/${category.slug}`}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center"
            >
              <span className="text-3xl mb-3">{category.icon}</span>
              <h3 className="font-semibold">{category.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">How It Works in {formattedCityName}</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step 1 */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <span className="text-xl font-bold text-primary">1</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Search for Services</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Browse through our extensive list of services available in {formattedCityName} or use the search bar to find exactly what you need.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <span className="text-xl font-bold text-primary">2</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Book a Professional</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Choose from our verified professionals based on ratings, availability, and pricing. Book instantly or request quotes.
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
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-4 mb-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden">
                  <Image
                    src="/placeholder-user.jpg"
                    alt={`Professional ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold">Professional {index + 1}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Service Category</p>
                  <div className="flex items-center text-yellow-500 text-sm mt-1">
                    {'★'.repeat(4 + (index % 2))}{'☆'.repeat(1 - (index % 2))}
                    <span className="text-gray-600 dark:text-gray-400 ml-1">(${20 + index * 5} reviews)</span>
                  </div>
                </div>
              </div>
              <Link href={`/professionals/pro-${index}`}>
                <Button variant="outline" className="w-full">View Profile</Button>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}