"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { FaArrowRight } from "react-icons/fa"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { ChevronRight, MapPin, Search, Star } from "lucide-react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { getCityConfig } from "@/lib/city-config"
import { Card, CardContent } from "@/components/ui/card"

export default function CityPage({ params }: { params: { city: string } }) {
  const citySlug = params.city.toLowerCase()
  const cityConfig = getCityConfig(citySlug)

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

  // Style variables for city-specific theming
  const cityStyles = {
    heroBg: `linear-gradient(to right, ${cityConfig.primaryColor}15, ${cityConfig.secondaryColor}20)`,
    primaryColor: cityConfig.primaryColor,
    secondaryColor: cityConfig.secondaryColor,
    categoryIconBg: `${cityConfig.primaryColor}20`,
  }

  const categories = [
    { name: "Cleaning", icon: "🧹", slug: "cleaning" },
    { name: "Plumbing", icon: "🚿", slug: "plumbing" },
    { name: "Electrical", icon: "💡", slug: "electrical" },
    { name: "Appliance", icon: "🔧", slug: "appliance-repair" },
    { name: "Pest Control", icon: "🐜", slug: "pest-control" },
    { name: "Painting", icon: "🎨", slug: "painting" },
    { name: "Carpentry", icon: "🪚", slug: "carpentry" },
    { name: "Moving", icon: "📦", slug: "home-moving" },
    { name: "Gardening", icon: "🌿", slug: "gardening" },
    { name: "AC Repair", icon: "❄️", slug: "hvac" }
  ];

  return (
    <div>
      {/* City-specific Hero Section */}
      <section 
        className="py-16 md:py-20" 
        style={{ background: cityStyles.heroBg }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold" style={{ color: cityStyles.primaryColor }}>
                {cityConfig.tagline}
              </h1>
              <p className="mt-6 text-lg text-gray-600 dark:text-gray-300 max-w-md">
                {cityConfig.description}
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="flex items-center gap-2"
                  style={{ 
                    backgroundColor: cityStyles.primaryColor,
                    borderColor: cityStyles.primaryColor 
                  }}
                >
                  <Search className="h-5 w-5" />
                  Find Services in {cityConfig.name}
                </Button>
                <Link href={`/${cityConfig.slug}/all-services`}>
                  <Button 
                    size="lg" 
                    variant="outline"
                    style={{ 
                      color: cityStyles.primaryColor,
                      borderColor: cityStyles.primaryColor 
                    }}
                  >
                    Browse All Services
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="relative h-80 w-full rounded-lg overflow-hidden shadow-xl">
                <Image
                  src={cityConfig.heroImage}
                  alt={`Home services in ${cityConfig.name}`}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Services */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Popular in {cityConfig.name}</h2>
            <Link href={`/${cityConfig.slug}/all-services`}>
              <Button variant="outline">View All</Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories
              .filter(cat => cityConfig.popularServices.includes(cat.name))
              .map(service => (
                <div key={service.slug} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all">
                  <div className="relative h-48">
                    <Image 
                      src={`/placeholder.svg?height=400&width=600&text=${service.name}`} 
                      alt={service.name} 
                      fill 
                      className="object-cover" 
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">
                      {service.icon} {service.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                      Professional {service.name.toLowerCase()} services in {cityConfig.name}
                    </p>
                    <div className="flex justify-between items-center">
                      <span 
                        className="font-medium"
                        style={{ color: cityStyles.primaryColor }}
                      >
                        Starting ₹499
                      </span>
                      <Link href={`/${cityConfig.slug}/${service.slug}`}>
                        <Button 
                          size="sm"
                          style={{ 
                            backgroundColor: cityStyles.primaryColor,
                            borderColor: cityStyles.primaryColor 
                          }}
                        >
                          Book Now
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* All Categories */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-6">All Services in {cityConfig.name}</h2>

          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-10 gap-4">
            {categories.map(category => (
              <Link 
                key={category.slug}
                href={`/${cityConfig.slug}/${category.slug}`}
                className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center"
              >
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center mb-2"
                  style={{ background: cityStyles.categoryIconBg }}
                >
                  <span className="text-xl">{category.icon}</span>
                </div>
                <h3 className="font-medium text-xs sm:text-sm">
                  {category.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {cityConfig.testimonials && cityConfig.testimonials.length > 0 && (
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-8 text-center">
              What People in {cityConfig.name} Say
            </h2>

            <Carousel>
              <CarouselContent>
                {cityConfig.testimonials.map((testimonial, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <Card className="border border-gray-200 dark:border-gray-700">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-1 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-4 w-4 ${i < testimonial.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">"{testimonial.review}"</p>
                        <p className="font-medium">{testimonial.name}</p>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section 
        className="py-16 text-white"
        style={{ backgroundColor: cityStyles.primaryColor }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold">Need a service in {cityConfig.name}?</h2>
              <p className="mt-4 text-lg opacity-90 max-w-md">
                Book now or post your specific requirement and get quotes from professionals.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link href={`/${cityConfig.slug}/all-services`}>
                  <Button 
                    size="lg" 
                    variant="secondary"
                  >
                    Browse Services
                  </Button>
                </Link>
                <Link href="/post-task">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="text-white border-white hover:bg-white/10"
                  >
                    Post a Task
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Quick Search
                </h3>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                  <Input
                    type="search"
                    placeholder={`What service do you need in ${cityConfig.name}?`}
                    className="pl-10 pr-4 py-6 bg-gray-50 dark:bg-gray-700 border-none text-gray-900 dark:text-white"
                  />
                </div>
                <Button 
                  className="w-full mt-4 py-6"
                  style={{ 
                    backgroundColor: cityStyles.primaryColor,
                    borderColor: cityStyles.primaryColor 
                  }}
                >
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Neighborhoods Section */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-6">Services across {cityConfig.name}</h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, index) => (
              <Link 
                key={index}
                href={`/${cityConfig.slug}`}
                className="bg-white dark:bg-gray-800 p-4 rounded-lg text-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border border-gray-100 dark:border-gray-700"
              >
                <MapPin 
                  className="h-6 w-6 mx-auto mb-2"
                  style={{ color: cityStyles.primaryColor }}
                />
                <span className="font-medium">Area {index + 1}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}