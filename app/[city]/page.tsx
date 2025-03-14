"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { FaArrowRight } from "react-icons/fa"
import { Button } from "@/components/ui/button"
import { CheckCircle, Star } from "lucide-react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

const ServiceIcons = {
  "home-cleaning": () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  "repairs": () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  // Add more icons here...
};


import { use } from 'react'

export default function CityPage({ params }: { params: { city: string } }) {
  const resolvedParams = use(params);
  const citySlug = resolvedParams.city.toLowerCase()
  const formattedCityName = citySlug.charAt(0).toUpperCase() + citySlug.slice(1)

  const categories = [
    { id: "home-cleaning", name: "Home Cleaning", icon: "🧹" },
    { id: "repairs", name: "Repairs & Maintenance", icon: "🔧" },
    { id: "plumbing", name: "Plumbing", icon: "🚰" },
    { id: "painting", name: "Painting & Renovation", icon: "🎨" },
    { id: "furniture", name: "Furniture & Installation", icon: "🪑" },
    { id: "pest-control", name: "Pest Control", icon: "🐜" },
    { id: "maid", name: "Maid & Domestic", icon: "👩‍🍳" },
    { id: "beauty", name: "Beauty & Wellness", icon: "💅" },
    { id: "appliance", name: "Appliance Repairs", icon: "🔌" },
    { id: "moving", name: "Moving & Relocation", icon: "📦" },
    { id: "events", name: "Event & Wedding", icon: "🎉" },
    { id: "vehicle", name: "Vehicle Services", icon: "🚗" },
    { id: "business", name: "Business & Office", icon: "💼" },
    { id: "smart-home", name: "Smart Home", icon: "🏠" }
  ]

  const services = [
    { name: "Home Cleaning", price: "₹499", image: "/placeholder.svg?height=400&width=600", slug: "home-cleaning" },
    { name: "Plumbing Service", price: "₹399", image: "/placeholder.svg?height=400&width=600", slug: "plumbing" },
    { name: "Electrical Repairs", price: "₹449", image: "/placeholder.svg?height=400&width=600", slug: "electrical" },
    { name: "Appliance Repair", price: "₹599", image: "/placeholder.svg?height=400&width=600", slug: "appliance-repair" },
    { name: "Pest Control", price: "₹799", image: "/placeholder.svg?height=400&width=600", slug: "pest-control" }
  ]

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <section className="rounded-xl bg-gradient-to-t from-sky-100 to-indigo-100 px-6 py-12 mb-10">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold">
            Home Services, Your Way – Compare, Book, or Post a Task
          </h1>
          <p className="mt-3 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Choose from top-rated vendors, book our in-house experts, or get bids from professionals near you.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Categories Grid */}
          <div className="grid grid-cols-5 gap-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/${citySlug}/${category.id}`}
                className="flex flex-col items-center p-2 bg-white/80 backdrop-blur-sm rounded-lg hover:bg-white/90 transition-all"
              >
                <div className="w-10 h-10 flex items-center justify-center mb-2 text-xl">
                  {category.icon}
                </div>
                <span className="text-xs text-center font-medium line-clamp-2">
                  {category.name}
                </span>
              </Link>
            ))}
          </div>

          {/* Service Slider */}
          <div>
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                {[
                {
                  type: "image",
                  src: "/placeholder.svg?height=400&width=600",
                  alt: "Professional Home Services",
                  title: "Professional Home Services",
                  description: "Trusted experts at your doorstep"
                },
                {
                  type: "image",
                  src: "/placeholder.svg?height=400&width=600",
                  alt: "100% Satisfaction Guarantee",
                  title: "100% Satisfaction Guarantee",
                  description: "Quality service or your money back"
                },
                {
                  type: "image",
                  src: "/placeholder.svg?height=400&width=600",
                  alt: "Verified Professionals",
                  title: "Verified Professionals",
                  description: "Background-checked and skilled experts"
                }
              ].map((item, index) => (
                <CarouselItem key={index} className="w-full">
                  <div className="relative aspect-[16/9]">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      className="object-cover"
                      priority={index === 0}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent rounded-lg">
                      <div className="absolute bottom-8 left-8 right-8 text-white">
                        <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                        <p className="text-lg text-white/90">{item.description}</p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
              </CarouselContent>
              <div className="flex items-center justify-end gap-2 mt-4">
                <CarouselPrevious className="static translate-y-0" />
                <CarouselNext className="static translate-y-0" />
              </div>
            </Carousel>
          </div>
        </div>


      </section>

      {/* Categories Section */}
      <section className="mb-10">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Direct Booking */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-all border border-primary/20">
            <p className="text-gray-600 dark:text-gray-300 font-semibold text-center mb-4 text-sm">
              Instant service at fixed prices from our in-house professional team
            </p>
            <Link href={`/${citySlug}/services`}>
              <Button className="w-full gap-2">
                Book Serveto Direct
                <FaArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          {/* Compare Vendors */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-all border border-primary/20">
            <p className="text-gray-600 dark:text-gray-300 font-semibold text-center mb-4 text-sm">
              Choose from multiple providers based on reviews and prices
            </p>
            <Link href={`/${citySlug}/vendors`}>
              <Button variant="outline" className="w-full gap-2">
                Find a Vendor
                <FaArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          {/* Task Bidding */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-all border border-primary/20">
              <p className="text-gray-600 dark:text-gray-300 text-center font-semibold mb-4 text-sm">
                Get competitive bids from nearby professionals
              </p>
              <Link href={`/${citySlug}/post-task`}>
                <Button variant="secondary" className="w-full gap-2">
                  Post a Task & Get Quotes
                  <FaArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
        </div>
      </section>

      {/* Popular Services in Indore */}
      <section className="mb-10 relative">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Popular Services in {formattedCityName}</h2>
          <Link href="/services" className="text-primary hover:underline flex items-center">
            View All
            <FaArrowRight className="ml-1 h-3 w-3" />
          </Link>
        </div>

        <div className="relative">
          <Carousel
            opts={{
              align: "start",
              dragFree: true
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {[
                { name: "Home Cleaning", price: "₹499", image: "/placeholder.svg?height=400&width=600", slug: "home-cleaning" },
                { name: "Plumbing Service", price: "₹399", image: "/placeholder.svg?height=400&width=600", slug: "plumbing" },
                { name: "Electrical Repairs", price: "₹449", image: "/placeholder.svg?height=400&width=600", slug: "electrical" },
                { name: "Appliance Repair", price: "₹599", image: "/placeholder.svg?height=400&width=600", slug: "appliance-repair" },
                { name: "Pest Control", price: "₹799", image: "/placeholder.svg?height=400&width=600", slug: "pest-control" },
                { name: "Painting", price: "₹1499", image: "/placeholder.svg?height=400&width=600", slug: "painting" },
                { name: "Carpentry", price: "₹599", image: "/placeholder.svg?height=400&width=600", slug: "carpentry" },
                { name: "Home Moving", price: "₹1999", image: "/placeholder.svg?height=400&width=600", slug: "home-moving" },
              ].map((service) => (
                <CarouselItem key={service.slug} className="pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="relative h-40">
                      <Image
                        src={service.image}
                        alt={service.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold">{service.name}</h3>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-primary font-medium">Starting {service.price}</span>
                        <Link href={`/${citySlug}/${service.slug}`}>
                          <Button size="sm">Book Now</Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden sm:flex items-center justify-end gap-2 mt-4">
              <CarouselPrevious className="static translate-y-0 translate-x-0 h-8 w-8 rounded-full" />
              <CarouselNext className="static translate-y-0 translate-x-0 h-8 w-8 rounded-full" />
            </div>
          </Carousel>
        </div>
      </section>

      {/* Booking Models Section */}
      <section className="mb-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold">Choose Your Booking Method</h2>
          <p className="text-gray-600 mt-2 max-w-3xl mx-auto">Select from three flexible ways to hire professionals, each designed for different service needs</p>
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

          {/* Vendor Aggregation */}
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

      {/* Why Choose Us Section */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Popular Services in {formattedCityName}</h2>
          <Link href="/services" className="text-primary hover:underline flex items-center">
            View All
            <FaArrowRight className="ml-1 h-3 w-3" />
          </Link>
        </div>

        <div className="relative">
          <Carousel
            opts={{
              align: "start",
              dragFree: true
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {[
                { name: "Home Cleaning", price: "₹499", image: "/placeholder.svg?height=400&width=600", slug: "home-cleaning" },
                { name: "Plumbing Service", price: "₹399", image: "/placeholder.svg?height=400&width=600", slug: "plumbing" },
                { name: "Electrical Repairs", price: "₹449", image: "/placeholder.svg?height=400&width=600", slug: "electrical" },
                { name: "Appliance Repair", price: "₹599", image: "/placeholder.svg?height=400&width=600", slug: "appliance-repair" },
                { name: "Pest Control", price: "₹799", image: "/placeholder.svg?height=400&width=600", slug: "pest-control" },
                { name: "Painting", price: "₹1499", image: "/placeholder.svg?height=400&width=600", slug: "painting" },
                { name: "Carpentry", price: "₹599", image: "/placeholder.svg?height=400&width=600", slug: "carpentry" },
                { name: "Home Moving", price: "₹1999", image: "/placeholder.svg?height=400&width=600", slug: "home-moving" },
              ].map((service) => (
                <CarouselItem key={service.slug} className="pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="relative h-40">
                      <Image
                        src={service.image}
                        alt={service.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold">{service.name}</h3>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-primary font-medium">Starting {service.price}</span>
                        <Link href={`/${citySlug}/${service.slug}`}>
                          <Button size="sm">Book Now</Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden sm:flex items-center justify-end gap-2 mt-4">
              <CarouselPrevious className="static translate-y-0 translate-x-0 h-8 w-8 rounded-full" />
              <CarouselNext className="static translate-y-0 translate-x-0 h-8 w-8 rounded-full" />
            </div>
          </Carousel>
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