import Link from "next/link"
import Image from "next/image"
import { ArrowRight, MapPin, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface CityPageProps {
  params: {
    city: string
  }
}

// This would typically come from a database or API
const cityData = {
  indore: {
    name: "Indore",
    description: "Find the best home services in Indore",
    heroImage: "/placeholder.svg?height=600&width=1200",
  },
  mumbai: {
    name: "Mumbai",
    description: "Find the best home services in Mumbai",
    heroImage: "/placeholder.svg?height=600&width=1200",
  },
  delhi: {
    name: "Delhi",
    description: "Find the best home services in Delhi",
    heroImage: "/placeholder.svg?height=600&width=1200",
  },
  bangalore: {
    name: "Bangalore",
    description: "Find the best home services in Bangalore",
    heroImage: "/placeholder.svg?height=600&width=1200",
  },
  pune: {
    name: "Pune",
    description: "Find the best home services in Pune",
    heroImage: "/placeholder.svg?height=600&width=1200",
  },
  // Add more cities as needed
}

// Sample service categories
const serviceCategories = [
  {
    id: "cleaning",
    name: "Cleaning",
    icon: "/placeholder.svg?height=80&width=80",
    subCategories: ["Home Cleaning", "Bathroom Cleaning", "Kitchen Cleaning", "Sofa Cleaning", "Carpet Cleaning"],
  },
  {
    id: "plumbing",
    name: "Plumbing",
    icon: "/placeholder.svg?height=80&width=80",
    subCategories: ["Pipe Leakage", "Tap Repair", "Basin & Sink", "Toilet", "Water Tank"],
  },
  {
    id: "electrical",
    name: "Electrical",
    icon: "/placeholder.svg?height=80&width=80",
    subCategories: ["Switch & Socket", "Fan", "Light", "MCB & Fuse", "Inverter & Stabilizer"],
  },
  {
    id: "appliance-repair",
    name: "Appliance Repair",
    icon: "/placeholder.svg?height=80&width=80",
    subCategories: ["AC", "Refrigerator", "Washing Machine", "Microwave", "TV"],
  },
  {
    id: "pest-control",
    name: "Pest Control",
    icon: "/placeholder.svg?height=80&width=80",
    subCategories: ["Cockroach", "Mosquito", "Bed Bugs", "Termite", "Rodent"],
  },
  {
    id: "painting",
    name: "Painting",
    icon: "/placeholder.svg?height=80&width=80",
    subCategories: ["Interior Painting", "Exterior Painting", "Wall Texture", "Waterproofing", "Wood Polishing"],
  },
]

// Sample trending services
const trendingServices = [
  {
    id: "ac-service",
    name: "AC Service",
    image: "/placeholder.svg?height=200&width=300",
    price: 499,
    rating: 4.8,
    reviews: 1245,
  },
  {
    id: "deep-cleaning",
    name: "Deep Home Cleaning",
    image: "/placeholder.svg?height=200&width=300",
    price: 1999,
    rating: 4.7,
    reviews: 987,
  },
  {
    id: "bathroom-cleaning",
    name: "Bathroom Cleaning",
    image: "/placeholder.svg?height=200&width=300",
    price: 599,
    rating: 4.6,
    reviews: 756,
  },
  {
    id: "sofa-cleaning",
    name: "Sofa Cleaning",
    image: "/placeholder.svg?height=200&width=300",
    price: 799,
    rating: 4.5,
    reviews: 543,
  },
]

export default function CityPage({ params }: CityPageProps) {
  const citySlug = params.city.toLowerCase()
  const city = cityData[citySlug as keyof typeof cityData] || {
    name: params.city.charAt(0).toUpperCase() + params.city.slice(1),
    description: `Find the best home services in ${params.city.charAt(0).toUpperCase() + params.city.slice(1)}`,
    heroImage: "/placeholder.svg?height=600&width=1200",
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* City Hero Section */}
      <section className="relative">
        <div className="relative h-64 md:h-80 lg:h-96 w-full">
          <Image
            src={city.heroImage || "/placeholder.svg"}
            alt={`${city.name} services`}
            fill
            className="object-cover brightness-75"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-2xl">
                <div className="flex items-center gap-2 text-white mb-2">
                  <MapPin className="h-5 w-5" />
                  <span className="font-medium">{city.name}</span>
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                  Home Services in {city.name}
                </h1>
                <p className="text-lg text-white/90 mb-6">{city.description}</p>
                <div className="flex flex-wrap gap-3">
                  <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                    Book a Service
                  </Button>
                  <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                    Post a Task
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-6">Service Categories</h2>

          <div className="overflow-x-auto category-scroll pb-4">
            <div className="flex space-x-4 min-w-max">
              {serviceCategories.map((category) => (
                <Link key={category.id} href={`/${citySlug}/${category.id}`} className="block">
                  <Card className="w-40 hover:shadow-md transition-shadow">
                    <CardContent className="p-4 flex flex-col items-center text-center">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                        <Image src={category.icon || "/placeholder.svg"} alt={category.name} width={40} height={40} />
                      </div>
                      <h3 className="font-medium">{category.name}</h3>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trending Services */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Trending in {city.name}</h2>
            <Link href={`/${citySlug}/services`}>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                View All <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingServices.map((service) => (
              <Link key={service.id} href={`/${citySlug}/services/${service.id}`} className="block">
                <Card className="h-full hover:shadow-md transition-shadow overflow-hidden">
                  <div className="relative h-40">
                    <Image src={service.image || "/placeholder.svg"} alt={service.name} fill className="object-cover" />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-2">{service.name}</h3>
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{service.rating}</span>
                      <span className="text-sm text-gray-500">({service.reviews})</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-primary">₹{service.price}</span>
                      <Button size="sm">Book Now</Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Sub-categories Section */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-6">Popular Services</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
            {serviceCategories.map((category) => (
              <div key={category.id} className="mb-8">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Image
                    src={category.icon || "/placeholder.svg"}
                    alt={category.name}
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                  {category.name}
                </h3>
                <ul className="space-y-2">
                  {category.subCategories.map((subCategory, index) => (
                    <li key={index}>
                      <Link
                        href={`/${citySlug}/${category.id}/${subCategory.toLowerCase().replace(/\s+/g, "-")}`}
                        className="text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary"
                      >
                        {subCategory}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Models Section */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold mb-4">Choose Your Booking Model</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Serveto offers three different ways to book services based on your preferences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Direct Booking */}
            <Card className="h-full">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <span className="text-xl font-bold text-primary">1</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Direct Booking</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Book services directly at fixed prices with verified professionals.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 mt-1 text-primary" />
                    <span className="text-sm">Fixed transparent pricing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 mt-1 text-primary" />
                    <span className="text-sm">Instant booking confirmation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 mt-1 text-primary" />
                    <span className="text-sm">Quality guarantee</span>
                  </li>
                </ul>
                <Link href={`/${citySlug}/services`}>
                  <Button className="w-full">Browse Services</Button>
                </Link>
              </CardContent>
            </Card>

            {/* Vendor Comparison */}
            <Card className="h-full">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <span className="text-xl font-bold text-primary">2</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Vendor Comparison</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Compare multiple vendors based on ratings, prices, and availability.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 mt-1 text-primary" />
                    <span className="text-sm">Compare multiple quotes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 mt-1 text-primary" />
                    <span className="text-sm">Read verified reviews</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 mt-1 text-primary" />
                    <span className="text-sm">Choose the best match</span>
                  </li>
                </ul>
                <Link href={`/${citySlug}/vendors`}>
                  <Button className="w-full">Find Vendors</Button>
                </Link>
              </CardContent>
            </Card>

            {/* Task Bidding */}
            <Card className="h-full">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <span className="text-xl font-bold text-primary">3</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Task Bidding</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Post your task and receive competitive bids from professionals.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 mt-1 text-primary" />
                    <span className="text-sm">Describe your requirements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 mt-1 text-primary" />
                    <span className="text-sm">Set your budget</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 mt-1 text-primary" />
                    <span className="text-sm">Choose from multiple bids</span>
                  </li>
                </ul>
                <Link href={`/${citySlug}/post-task`}>
                  <Button className="w-full">Post a Task</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold mb-4">What Customers Say</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Hear from our satisfied customers in {city.name}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Testimonial 1 */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  "The cleaning service was excellent! The professional arrived on time and did a thorough job. My home
                  has never looked better."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="font-medium text-gray-700">RS</span>
                  </div>
                  <div>
                    <p className="font-medium">Rahul Sharma</p>
                    <p className="text-sm text-gray-500">{city.name}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Testimonial 2 */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  "I posted a task for furniture assembly and received multiple bids within hours. The professional I
                  chose was skilled and efficient."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="font-medium text-gray-700">AP</span>
                  </div>
                  <div>
                    <p className="font-medium">Anjali Patel</p>
                    <p className="text-sm text-gray-500">{city.name}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Testimonial 3 */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  "The AC repair service was prompt and professional. The technician explained the issue clearly and
                  fixed it quickly. Highly recommended!"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="font-medium text-gray-700">VK</span>
                  </div>
                  <div>
                    <p className="font-medium">Vikram Kumar</p>
                    <p className="text-sm text-gray-500">{city.name}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Find answers to common questions about our services in {city.name}
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              {[
                {
                  question: "How do I book a service?",
                  answer:
                    "You can book a service by browsing our service categories, selecting the service you need, choosing a time slot, and completing the checkout process.",
                },
                {
                  question: "What is the difference between the three booking models?",
                  answer:
                    "Direct Booking offers fixed prices and instant confirmation. Vendor Comparison lets you compare multiple professionals based on ratings and prices. Task Bidding allows you to post your requirements and receive competitive bids.",
                },
                {
                  question: "Are the professionals verified?",
                  answer:
                    "Yes, all professionals on Serveto undergo a thorough verification process including identity verification, background checks, and skill assessment.",
                },
                {
                  question: "What if I'm not satisfied with the service?",
                  answer:
                    "We offer a satisfaction guarantee. If you're not satisfied with the service, you can report the issue within 24 hours and we'll arrange for a rework or provide a refund as applicable.",
                },
                {
                  question: "How can I pay for services?",
                  answer:
                    "We accept multiple payment methods including credit/debit cards, UPI, net banking, and wallet payments. All transactions are secure and encrypted.",
                },
              ].map((faq, index) => (
                <div key={index} className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useParams } from "next/navigation"
import { MapPin, Search, ArrowRight, Star, Clock, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useIsMobile } from "@/hooks/use-mobile"

// Sample categories data
const categories = [
  {
    id: "cleaning",
    name: "Home Cleaning",
    icon: "/placeholder.svg?height=80&width=80",
    subCategories: [
      { id: "home-cleaning", name: "Full Home Deep Cleaning", price: "₹999" },
      { id: "bathroom-cleaning", name: "Bathroom Cleaning", price: "₹499" },
      { id: "kitchen-cleaning", name: "Kitchen Deep Cleaning", price: "₹699" },
      { id: "sofa-cleaning", name: "Sofa Cleaning", price: "₹599" },
    ],
  },
  {
    id: "plumbing",
    name: "Plumbing",
    icon: "/placeholder.svg?height=80&width=80",
    subCategories: [
      { id: "leakages", name: "Leakage Repair", price: "₹299" },
      { id: "tap-repair", name: "Tap Repair/Replace", price: "₹199" },
      { id: "basin-repair", name: "Basin/Sink Repair", price: "₹399" },
      { id: "toilet-repair", name: "Toilet Repair", price: "₹499" },
    ],
  },
  {
    id: "electrical",
    name: "Electrical",
    icon: "/placeholder.svg?height=80&width=80",
    subCategories: [
      { id: "fan-repair", name: "Fan Repair", price: "₹249" },
      { id: "switch-repair", name: "Switch/Socket Repair", price: "₹149" },
      { id: "light-repair", name: "Light Installation", price: "₹199" },
      { id: "wiring", name: "Wiring Work", price: "₹599" },
    ],
  },
  {
    id: "appliance-repair",
    name: "Appliance Repair",
    icon: "/placeholder.svg?height=80&width=80",
    subCategories: [
      { id: "ac-repair", name: "AC Service & Repair", price: "₹799" },
      { id: "fridge-repair", name: "Refrigerator Repair", price: "₹699" },
      { id: "washing-repair", name: "Washing Machine Repair", price: "₹599" },
      { id: "microwave-repair", name: "Microwave Repair", price: "₹499" },
    ],
  },
  {
    id: "pest-control",
    name: "Pest Control",
    icon: "/placeholder.svg?height=80&width=80",
    subCategories: [
      { id: "general-pest", name: "General Pest Control", price: "₹999" },
      { id: "cockroach", name: "Cockroach Treatment", price: "₹699" },
      { id: "mosquito", name: "Mosquito Treatment", price: "₹599" },
      { id: "bed-bugs", name: "Bed Bugs Treatment", price: "₹1299" },
    ],
  },
  {
    id: "painting",
    name: "Home Painting",
    icon: "/placeholder.svg?height=80&width=80",
    subCategories: [
      { id: "full-house", name: "Full House Painting", price: "₹8999" },
      { id: "wall-painting", name: "Single Wall Painting", price: "₹2999" },
      { id: "touch-up", name: "Touch-up Painting", price: "₹1999" },
      { id: "texture-painting", name: "Texture Painting", price: "₹5999" },
    ],
  },
]

// Sample vendors data
const vendors = [
  {
    id: "vendor1",
    name: "CleanMasters Pro",
    rating: 4.8,
    reviews: 125,
    image: "/placeholder.svg?height=100&width=100",
    services: ["Home Cleaning", "Office Cleaning"],
    response: "5 mins",
  },
  {
    id: "vendor2",
    name: "Quick Plumbing",
    rating: 4.6,
    reviews: 87,
    image: "/placeholder.svg?height=100&width=100",
    services: ["Plumbing", "Bathroom Fitting"],
    response: "10 mins",
  },
  {
    id: "vendor3",
    name: "Electric Solutions",
    rating: 4.7,
    reviews: 104,
    image: "/placeholder.svg?height=100&width=100",
    services: ["Electrical", "Wiring"],
    response: "15 mins",
  },
  {
    id: "vendor4",
    name: "Appliance Masters",
    rating: 4.5,
    reviews: 76,
    image: "/placeholder.svg?height=100&width=100",
    services: ["Appliance Repair", "AC Service"],
    response: "20 mins",
  },
]

export default function CityPage() {
  const { city } = useParams()
  const cityName = typeof city === "string" ? city.charAt(0).toUpperCase() + city.slice(1) : "Your City"
  const isMobile = useIsMobile()
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  return (
    <div className="flex flex-col min-h-screen">
      {/* City hero section */}
      <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-8 md:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-4">
            <MapPin className="h-5 w-5 text-primary mr-2" />
            <h1 className="text-2xl md:text-3xl font-bold">
              Home Services in {cityName}
            </h1>
          </div>
          <div className="relative max-w-2xl">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
            <Input 
              type="search" 
              placeholder="Search for services in your area" 
              className="pl-10 pr-4 py-6 bg-white dark:bg-gray-800"
            />
            <Button className="absolute right-1 top-1 px-4">Search</Button>
          </div>
        </div>
      </section>

      {/* Booking models tabs */}
      <section className="py-6 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="direct" className="w-full">
            <TabsList className="w-full grid grid-cols-3 mb-8">
              <TabsTrigger value="direct" className="text-sm md:text-base">Direct Booking</TabsTrigger>
              <TabsTrigger value="compare" className="text-sm md:text-base">Compare Vendors</TabsTrigger>
              <TabsTrigger value="bidding" className="text-sm md:text-base">Task Bidding</TabsTrigger>
            </TabsList>

            {/* Direct booking content */}
            <TabsContent value="direct" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                {/* Categories sidebar for desktop */}
                {!isMobile && (
                  <div className="col-span-1 bg-gray-50 dark:bg-gray-800 rounded-lg p-4 self-start">
                    <h3 className="font-medium mb-4">Service Categories</h3>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <button
                          key={category.id}
                          className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                            activeCategory === category.id
                              ? "bg-primary text-white"
                              : "hover:bg-gray-100 dark:hover:bg-gray-700"
                          }`}
                          onClick={() => setActiveCategory(category.id)}
                        >
                          {category.name}
                        </button>
                      ))}
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

                {/* Services listing */}
                <div className="col-span-1 md:col-span-4">
                  {!activeCategory ? (
                    // No category selected - show all categories
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {categories.map((category) => (
                        <div 
                          key={category.id}
                          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                          onClick={() => setActiveCategory(category.id)}
                        >
                          <div className="flex items-center p-4">
                            <div className="flex-shrink-0 mr-4">
                              <Image 
                                src={category.icon} 
                                alt={category.name}
                                width={50}
                                height={50}
                                className="rounded-full"
                              />
                            </div>
                            <div>
                              <h3 className="font-medium">{category.name}</h3>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {category.subCategories.length} services
                              </p>
                            </div>
                            <ArrowRight className="ml-auto h-5 w-5 text-gray-400" />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    // Category selected - show subcategories for that category
                    <>
                      {isMobile && (
                        <Button 
                          variant="ghost" 
                          className="mb-4"
                          onClick={() => setActiveCategory(null)}
                        >
                          ← Back to all categories
                        </Button>
                      )}
                      
                      <h2 className="text-xl font-semibold mb-4">
                        {categories.find(c => c.id === activeCategory)?.name}
                      </h2>
                      
                      <div className="grid grid-cols-1 gap-4">
                        {categories
                          .find(c => c.id === activeCategory)
                          ?.subCategories.map((subcat) => (
                            <div key={subcat.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
                              <div className="flex justify-between items-center">
                                <div>
                                  <h3 className="font-medium">{subcat.name}</h3>
                                  <p className="text-primary font-semibold mt-1">{subcat.price}</p>
                                </div>
                                <Link href={`/${city}/${activeCategory}/${subcat.id}`}>
                                  <Button size="sm">Book Now</Button>
                                </Link>
                              </div>
                            </div>
                          ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </TabsContent>

            {/* Compare vendors content */}
            <TabsContent value="compare" className="mt-0">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Top Vendors in {cityName}</h2>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Filter className="h-4 w-4" /> Filter
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {vendors.map((vendor) => (
                    <div key={vendor.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                      <div className="p-4">
                        <div className="flex items-center mb-4">
                          <Image 
                            src={vendor.image} 
                            alt={vendor.name}
                            width={60}
                            height={60}
                            className="rounded-full"
                          />
                          <div className="ml-3">
                            <h3 className="font-medium">{vendor.name}</h3>
                            <div className="flex items-center text-sm">
                              <Star className="h-4 w-4 text-yellow-400 mr-1" />
                              <span>{vendor.rating}</span>
                              <span className="mx-1">•</span>
                              <span>{vendor.reviews} reviews</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mb-3">
                          <div className="text-sm text-gray-500 mb-1">Services:</div>
                          <div className="flex flex-wrap gap-1">
                            {vendor.services.map((service, idx) => (
                              <span key={idx} className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                                {service}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div className="flex items-center text-sm text-gray-500">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>Responds in {vendor.response}</span>
                          </div>
                          <Link href={`/vendors/${vendor.id}`}>
                            <Button size="sm" variant="outline">View Profile</Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Task bidding content */}
            <TabsContent value="bidding" className="mt-0">
              <div className="text-center max-w-2xl mx-auto py-8">
                <h2 className="text-2xl font-bold mb-4">Post a Task for Bidding</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Describe your task in detail, set your budget, and receive competitive bids from qualified professionals in {cityName}.
                </p>
                <div className="space-y-4">
                  <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6 text-left">
                    <h3 className="text-lg font-medium mb-4">How Task Bidding Works</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="bg-primary/10 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mr-4">
                          <span className="text-primary font-medium">1</span>
                        </div>
                        <div>
                          <h4 className="font-medium">Describe Your Task</h4>
                          <p className="text-sm text-gray-500">Provide details about what you need, when, and your budget</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="bg-primary/10 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mr-4">
                          <span className="text-primary font-medium">2</span>
                        </div>
                        <div>
                          <h4 className="font-medium">Get Matched with Providers</h4>
                          <p className="text-sm text-gray-500">We'll notify the right professionals for your task</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="bg-primary/10 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mr-4">
                          <span className="text-primary font-medium">3</span>
                        </div>
                        <div>
                          <h4 className="font-medium">Compare Bids & Hire</h4>
                          <p className="text-sm text-gray-500">Review prices, profiles, and reviews before selecting</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Link href="/post-task">
                    <Button className="w-full py-6" size="lg">Post a Task Now</Button>
                  </Link>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Emergency services section */}
      <section className="py-8 bg-red-50 dark:bg-red-900/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h2 className="text-xl font-bold text-red-700 dark:text-red-400">Emergency Services</h2>
              <p className="text-gray-600 dark:text-gray-300">Quick help for urgent problems in {cityName}</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <Link href={`/${city}/emergency/plumbing`}>
                <Button variant="destructive" className="w-full">
                  Plumbing Emergency
                </Button>
              </Link>
              <Link href={`/${city}/emergency/electrical`}>
                <Button variant="destructive" className="w-full">
                  Electrical Emergency
                </Button>
              </Link>
              <Link href={`/${city}/emergency/locksmith`}>
                <Button variant="destructive" className="w-full">
                  Locksmith (24/7)
                </Button>
              </Link>
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
                <Image src="/placeholder.svg?height=400&width=600" alt="Salon Services" fill className="object-cover" />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">Salon at Home</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                  Professional beauty services at your doorstep
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-primary font-medium">Starting ₹299</span>
                  <Link href={`/${city}/salon-spa/home-salon`}>
                    <Button size="sm">Book Now</Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Service Card 3 */}
            <div className="service-card bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative h-48">
                <Image src="/placeholder.svg?height=400&width=600" alt="Pest Control" fill className="object-cover" />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">Pest Control</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                  Complete pest treatment and prevention
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-primary font-medium">Starting ₹999</span>
                  <Link href={`/${city}/pest-control/general-pest`}>
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
                <h3 className="text-lg font-semibold mb-2">Deep Cleaning</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                  Professional home deep cleaning services
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-primary font-medium">Starting ₹1499</span>
                  <Link href={`/${city}/cleaning/home-cleaning`}>
                    <Button size="sm">Book Now</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subscription section */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Save with Subscriptions</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Subscribe to regular services and save up to 25% on every booking in {cityName}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Basic plan */}
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="text-center mb-6">
                <h3 className="font-bold text-lg">Basic Plan</h3>
                <div className="mt-2">
                  <span className="text-3xl font-bold">₹999</span>
                  <span className="text-gray-500">/month</span>
                </div>
                <p className="text-sm text-gray-500 mt-2">Billed monthly</p>
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
                  <span className="text-3xl font-bold">₹1999</span>
                  <span className="text-gray-200">/month</span>
                </div>
                <p className="text-sm text-gray-200 mt-2">Billed monthly</p>
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
                  <span>15% off on all services</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-white mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Quarterly AC servicing</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-white mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Priority scheduling & support</span>
                </li>
              </ul>
              
              <Button variant="secondary" className="w-full">Subscribe Now</Button>
            </div>
            
            {/* Family plan */}
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="text-center mb-6">
                <h3 className="font-bold text-lg">Family Plan</h3>
                <div className="mt-2">
                  <span className="text-3xl font-bold">₹3999</span>
                  <span className="text-gray-500">/month</span>
                </div>
                <p className="text-sm text-gray-500 mt-2">Billed monthly</p>
              </div>
              
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Weekly home cleaning</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>25% off on all services</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Monthly pest control</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Quarterly AC & appliance maintenance</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>24/7 emergency support</span>
                </li>
              </ul>
              
              <Button className="w-full">Subscribe Now</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
