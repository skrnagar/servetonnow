
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useParams } from "next/navigation"
import { FaArrowRight } from "react-icons/fa"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useGeolocation } from "@/context/geolocation-context"
import { useToast } from "@/hooks/use-toast"

export default function CityHomePage() {
  const { city } = useParams()
  const { toast } = useToast()
  const { userCity } = useGeolocation()
  const [isLoading, setIsLoading] = useState(true)
  const [windowWidth, setWindowWidth] = useState(0)
  
  // Convert city slug to display name
  const citySlug = Array.isArray(city) ? city[0] : city as string
  const cityName = citySlug.charAt(0).toUpperCase() + citySlug.slice(1)
  
  useEffect(() => {
    // Set window width for responsive adjustments
    setWindowWidth(window.innerWidth)
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener("resize", handleResize)
    
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    
    return () => {
      window.removeEventListener("resize", handleResize)
      clearTimeout(timer)
    }
  }, [])
  
  const isMobile = windowWidth < 640
  
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <section className="rounded-xl bg-gradient-to-r from-primary/10 to-primary/20 p-6 mb-10">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              Home Services in {cityName}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Find reliable professionals for all your home service needs in {cityName}. Book directly, compare vendors, or post tasks.
            </p>
            
            <div className="relative">
              <Input
                placeholder={`Search for services in ${cityName}...`}
                className="pr-10 bg-white dark:bg-gray-900 border-gray-200"
              />
              <Button size="sm" className="absolute right-1 top-1">
                Search
              </Button>
            </div>
          </div>
          
          <div className="w-full md:w-auto">
            <Image
              src="/placeholder.svg?height=200&width=300"
              alt={`${cityName} services`}
              width={300}
              height={200}
              className="rounded-lg shadow-sm"
            />
          </div>
        </div>
      </section>
      
      {/* Popular Service Categories */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Service Categories in {cityName}</h2>
          <Link href={`/${citySlug}/services`} className="text-primary flex items-center text-sm font-medium">
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
      </section>
      
      {/* Popular Services */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Popular Services in {cityName}</h2>
          <Link href={`/${citySlug}/services`} className="text-primary flex items-center text-sm font-medium">
            View All
            <FaArrowRight className="ml-1 h-3 w-3" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            // Skeleton loading state
            Array(3).fill(0).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="h-40 w-full" />
                <CardContent className="p-4">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3 mb-4" />
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-5 w-20" />
                    <Skeleton className="h-9 w-24" />
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            // Actual content
            [
              {
                title: "Home Deep Cleaning",
                description: "Professional deep cleaning service for your entire home",
                image: "/placeholder.svg?height=400&width=600",
                price: "₹999",
                category: "cleaning"
              },
              {
                title: "AC Service & Repair",
                description: "Air conditioner maintenance, servicing and repairs",
                image: "/placeholder.svg?height=400&width=600",
                price: "₹499",
                category: "appliance-repair"
              },
              {
                title: "Plumbing Services",
                description: "Fix leaking pipes, taps, toilets and other plumbing issues",
                image: "/placeholder.svg?height=400&width=600",
                price: "₹349",
                category: "plumbing"
              }
            ].map((service, i) => (
              <Link key={i} href={`/${citySlug}/${service.category}`}>
                <Card className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="relative h-40">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-1">{service.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                      {service.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-primary font-medium">Starting {service.price}</span>
                      <Button size="sm">Book Now</Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))
          )}
        </div>
      </section>
      
      {/* How It Works */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">How It Works</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl mb-4">
                1
              </div>
              <h3 className="font-semibold text-lg mb-2">Choose a Service</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Browse through our wide range of professional services available in {cityName}.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl mb-4">
                2
              </div>
              <h3 className="font-semibold text-lg mb-2">Book an Appointment</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Select your preferred date and time, and book your service with just a few clicks.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl mb-4">
                3
              </div>
              <h3 className="font-semibold text-lg mb-2">Get it Done</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Our professionals will arrive at your doorstep on time and get the job done perfectly.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">What Our Customers Say</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              name: "Rahul Sharma",
              service: "Home Cleaning",
              comment: "Excellent service, professional staff and timely completion. Will definitely use again!",
              rating: 5
            },
            {
              name: "Priya Patel",
              service: "Plumbing",
              comment: "Fixed my leaking sink quickly and efficiently. Very reasonable pricing too!",
              rating: 4
            }
          ].map((testimonial, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                    <Image
                      src="/placeholder-user.jpg"
                      alt={testimonial.name}
                      width={48}
                      height={48}
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{testimonial.service}</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-3">"{testimonial.comment}"</p>
                <div className="flex">
                  {Array(5).fill(0).map((_, starIndex) => (
                    <svg
                      key={starIndex}
                      className={`w-5 h-5 ${
                        starIndex < testimonial.rating ? "text-yellow-400" : "text-gray-300"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      
      {/* CTA */}
      <section>
        <div className="rounded-xl bg-primary p-8 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Ready to get started?</h2>
              <p className="text-white/80 mb-4 md:mb-0">
                Book your first service in {cityName} today and experience hassle-free home services!
              </p>
            </div>
            <Button size="lg" variant="secondary">
              Book a Service
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
