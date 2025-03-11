"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useParams } from "next/navigation"
import { FaStar, FaCheck } from "react-icons/fa"
import { MapPin, Search, Filter, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useGeolocation } from "@/context/geolocation-context"
import { useMobile } from "@/hooks/use-mobile"

// City-specific page component
export default function CityPage() {
  const params = useParams()
  const city = typeof params.city === "string" ? params.city : ""
  const cityName = city.charAt(0).toUpperCase() + city.slice(1)
  const { userLocation } = useGeolocation()
  const isMobile = useMobile()

  // State for active category
  const [activeCategory, setActiveCategory] = useState("all")

  // Example categories data
  const categories = [
    { id: "all", name: "All Services" },
    { id: "cleaning", name: "Cleaning" },
    { id: "plumbing", name: "Plumbing" },
    { id: "electrical", name: "Electrical" },
    { id: "appliance", name: "Appliance Repair" },
    { id: "painting", name: "Painting" },
    { id: "carpentry", name: "Carpentry" },
    { id: "pest-control", name: "Pest Control" },
  ]

  // Example trending services
  const trendingServices = [
    {
      id: "ac-service",
      name: "AC Service & Repair",
      image: "/placeholder.svg?height=200&width=300",
      price: "499",
      rating: 4.8,
      reviews: 1240,
    },
    {
      id: "home-cleaning",
      name: "Deep Home Cleaning",
      image: "/placeholder.svg?height=200&width=300",
      price: "699",
      rating: 4.7,
      reviews: 982,
    },
    {
      id: "plumbing",
      name: "Plumbing Services",
      image: "/placeholder.svg?height=200&width=300",
      price: "399",
      rating: 4.6,
      reviews: 754,
    },
    {
      id: "electrician",
      name: "Electrician Services",
      image: "/placeholder.svg?height=200&width=300",
      price: "449",
      rating: 4.7,
      reviews: 812,
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero section */}
      <section className="hero-gradient py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
              Home Services in <span className="text-primary">{cityName}</span>
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Book reliable home services from verified professionals in {cityName}
            </p>

            <div className="mt-8 relative max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                <Input
                  type="search"
                  placeholder="What service do you need?"
                  className="pl-10 pr-4 py-6 bg-white dark:bg-gray-800 text-lg"
                />
              </div>
              <Button className="absolute right-1 top-1 h-10">Search</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Sidebar for categories on desktop */}
            {!isMobile && (
              <div className="col-span-1 hidden md:block">
                <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-4">
                  <h3 className="font-semibold text-lg mb-4">Categories</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        className={`block w-full text-left px-3 py-2 rounded-md transition-colors ${
                          activeCategory === category.id
                            ? "bg-primary text-white"
                            : "hover:bg-gray-100 dark:hover:bg-gray-800"
                        }`}
                        onClick={() => setActiveCategory(category.id)}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Categories horizontal scroll for mobile */}
            {isMobile && (
              <div className="col-span-1 md:hidden mb-4">
                <div className="flex space-x-3 overflow-x-auto pb-2 hide-scrollbar">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      className={`flex-shrink-0 px-4 py-2 rounded-full border transition-colors ${
                        activeCategory === category.id
                          ? "bg-primary text-white border-primary"
                          : "hover:bg-gray-100 dark:hover:bg-gray-700 border-gray-200 dark:border-gray-700"
                      }`}
                      onClick={() => setActiveCategory(category.id)}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Main content area */}
            <div className="col-span-1 md:col-span-3">
              {/* Trending services section */}
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-6 mb-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Trending in {cityName}</h2>
                  <Button variant="ghost" size="sm" className="text-primary">
                    View All <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                  {trendingServices.map((service) => (
                    <Link
                      key={service.id}
                      href={`/${city}/${activeCategory !== "all" ? activeCategory : "services"}/${service.id}`}
                      className="block"
                    >
                      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                        <div className="relative h-40">
                          <Image src={service.image} alt={service.name} fill className="object-cover" />
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold text-lg">{service.name}</h3>
                          <div className="flex items-center mt-1 text-sm text-gray-500">
                            <span className="flex items-center">
                              <FaStar className="text-yellow-500 mr-1" /> {service.rating}
                            </span>
                            <span className="mx-2">•</span>
                            <span>{service.reviews.toLocaleString()} reviews</span>
                          </div>
                          <div className="mt-3 flex justify-between items-center">
                            <span className="text-primary font-semibold">₹{service.price}</span>
                            <Button size="sm">Book Now</Button>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Service categories */}
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-6 mb-8">
                <h2 className="text-xl font-semibold mb-6">All Services</h2>

                <Tabs defaultValue="services" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 mb-6">
                    <TabsTrigger value="services">Direct Booking</TabsTrigger>
                    <TabsTrigger value="vendors">Find Vendors</TabsTrigger>
                    <TabsTrigger value="bidding">Task Bidding</TabsTrigger>
                  </TabsList>
                  <TabsContent value="services">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {[
                        "Home Cleaning",
                        "AC Service & Repair",
                        "Plumbing",
                        "Electrician",
                        "Appliance Repair",
                        "Painting",
                        "Pest Control",
                        "Carpentry",
                        "Interior Design",
                      ].map((service, index) => (
                        <Link key={index} href={`/${city}/services/${service.toLowerCase().replace(/\s+/g, "-")}`}>
                          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg text-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                            <div className="bg-primary/10 w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center">
                              <span className="text-primary">
                                {service.charAt(0)}
                              </span>
                            </div>
                            <span className="font-medium text-sm">{service}</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="vendors">
                    <div className="space-y-4">
                      {[1, 2, 3, 4].map((vendor) => (
                        <div key={vendor} className="border rounded-lg p-4 flex items-center gap-4">
                          <div className="w-16 h-16 relative rounded-full overflow-hidden">
                            <Image 
                              src="/placeholder-user.jpg" 
                              alt="Vendor" 
                              fill 
                              className="object-cover" 
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold">Service Pro #{vendor}</h3>
                            <div className="flex items-center mt-1 text-sm text-gray-500">
                              <span className="flex items-center">
                                <FaStar className="text-yellow-500 mr-1" /> {4.5 + vendor/10}
                              </span>
                              <span className="mx-2">•</span>
                              <span>{100 * vendor} reviews</span>
                            </div>
                            <div className="mt-1 text-sm text-gray-600">Cleaning, Plumbing, Electrical</div>
                          </div>
                          <Button size="sm">Contact</Button>
                        </div>
                      ))}
                      <div className="text-center mt-4">
                        <Button variant="outline">View All Vendors</Button>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="bidding">
                    <div className="text-center py-6">
                      <h3 className="text-lg font-semibold mb-2">Post Your Task</h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        Describe your task and get competitive bids from professionals
                      </p>
                      <Link href="/post-task">
                        <Button>Post a Task</Button>
                      </Link>
                    </div>
                    <div className="mt-6 border-t pt-6">
                      <h3 className="text-lg font-semibold mb-4">Recent Tasks in {cityName}</h3>
                      <div className="space-y-4">
                        {[
                          "Need a plumber to fix leaking tap",
                          "Looking for house deep cleaning service",
                          "Wall painting for 2BHK apartment",
                          "Air conditioner not cooling, need repair",
                        ].map((task, index) => (
                          <div key={index} className="border rounded-lg p-4">
                            <h4 className="font-medium">{task}</h4>
                            <div className="flex justify-between items-center mt-2">
                              <span className="text-sm text-gray-500">Posted 2 days ago • {3 + index} bids</span>
                              <Button variant="outline" size="sm">View Details</Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Subscription plans */}
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-6">Subscription Plans</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Basic plan */}
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700 relative">
                    <div className="text-center mb-6">
                      <h3 className="font-bold text-lg">Basic Plan</h3>
                      <div className="mt-2">
                        <span className="text-3xl font-bold">₹499</span>
                        <span className="text-gray-500">/month</span>
                      </div>
                    </div>
                    <ul className="space-y-3 mb-6">
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Monthly home cleaning</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>10% off on all services</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Priority scheduling</span>
                      </li>
                    </ul>

                    <Button className="w-full">Subscribe Now</Button>
                  </div>

                  {/* Premium plan */}
                  <div className="bg-primary text-white rounded-lg shadow-md p-6 border border-primary">
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-secondary text-secondary-foreground text-xs font-bold py-1 px-3 rounded-full">
                      POPULAR
                    </div>
                    <div className="text-center mb-6 relative">
                      <h3 className="font-bold text-lg">Premium Plan</h3>
                      <div className="mt-2">
                        <span className="text-3xl font-bold">₹999</span>
                        <span className="text-gray-200">/month</span>
                      </div>
                    </div>
                    <ul className="space-y-3 mb-6">
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-white mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Bi-weekly home cleaning</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-white mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>20% off on all services</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-white mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>24/7 priority support</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-white mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Free quarterly AC servicing</span>
                      </li>
                    </ul>
                    <Button variant="secondary" className="w-full">Subscribe Now</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular services section */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-6">Popular in {cityName}</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Service Card 1 */}
            <div className="service-card bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative h-48">
                <Image src="/placeholder.svg?height=400&width=600" alt="Home Cleaning" fill className="object-cover" />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">AC Service & Repair</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                  Professional AC maintenance and repair
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-primary font-medium">Starting ₹499</span>
                  <Link href={`/${city}/appliance-repair/ac-repair`}>
                    <Button size="sm">Book Now</Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Service Card 2 */}
            <div className="service-card bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative h-48">
                <Image src="/placeholder.svg?height=400&width=600" alt="Home Cleaning" fill className="object-cover" />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">Full Home Cleaning</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                  Deep cleaning for your entire home
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-primary font-medium">Starting ₹799</span>
                  <Link href={`/${city}/cleaning/full-home`}>
                    <Button size="sm">Book Now</Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Service Card 3 */}
            <div className="service-card bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative h-48">
                <Image src="/placeholder.svg?height=400&width=600" alt="Home Cleaning" fill className="object-cover" />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">Plumbing Services</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                  All types of plumbing repairs and installations
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-primary font-medium">Starting ₹399</span>
                  <Link href={`/${city}/plumbing`}>
                    <Button size="sm">Book Now</Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Service Card 4 */}
            <div className="service-card bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative h-48">
                <Image src="/placeholder.svg?height=400&width=600" alt="Home Cleaning" fill className="object-cover" />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">Pest Control</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                  Effective pest control for your home
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-primary font-medium">Starting ₹599</span>
                  <Link href={`/${city}/pest-control`}>
                    <Button size="sm">Book Now</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}