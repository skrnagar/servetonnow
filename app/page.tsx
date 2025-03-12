"use client"

import { useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ArrowRight, CheckCircle, MapPin, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useGeolocation } from "@/context/geolocation-context"

export default function HomePage() {
  const router = useRouter()
  const { userCity, detectLocation } = useGeolocation()

  // Add immediate redirection on first render
  useEffect(() => {
    // If we already have a city, redirect immediately without waiting
    if (userCity) {
      router.replace(`/${userCity.toLowerCase()}`);
    } else {
      // Try to detect location immediately on first page render
      detectLocation().then(success => {
        if (success && userCity) {
          router.replace(`/${userCity.toLowerCase()}`);
        }
      });
    }
  }, []);

  const handleLocationDetection = async () => {
    // Show loading state
    const result = await detectLocation();
    
    // If we got a result, redirect to the city page
    if (result && userCity) {
      router.push(`/${userCity.toLowerCase()}`);
    } 
    // If detection failed, show a toast
    else if (!result) {
      const { toast } = await import("@/components/ui/use-toast");
      toast({
        title: "Location not found",
        description: "Please select a city manually from the list below.",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white">
                Home Services, <span className="text-primary">Simplified</span>
              </h1>
              <p className="mt-6 text-lg text-gray-600 dark:text-gray-300 max-w-md">
                Book services directly, compare vendors, or post tasks for bidding. Serveto makes home services simple
                and efficient.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="flex items-center gap-2" onClick={handleLocationDetection}>
                  <MapPin className="h-5 w-5" />
                  Find Services Near Me
                </Button>
                <Link href="/services">
                  <Button size="lg" variant="outline">
                    Browse All Services
                  </Button>
                </Link>
              </div>
              <div className="mt-8 flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">Verified Professionals</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">Secure Payments</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">Satisfaction Guarantee</span>
                </div>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <Image
                src="/placeholder.svg?height=600&width=600"
                alt="Home services illustration"
                width={600}
                height={600}
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">How Serveto Works</h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Choose how you want to book services - direct booking, vendor comparison, or task bidding
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Direct Booking */}
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <span className="text-xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Direct Booking</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Select a service, choose a time slot, and book instantly at fixed prices.
              </p>
              <Link href="/services">
                <Button variant="link" className="p-0 h-auto flex items-center gap-1">
                  Book a Service <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </div>

            {/* Vendor Comparison */}
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <span className="text-xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Vendor Comparison</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Compare vendors based on ratings, prices, and availability before booking.
              </p>
              <Link href="/vendors">
                <Button variant="link" className="p-0 h-auto flex items-center gap-1">
                  Compare Vendors <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </div>

            {/* Task Bidding */}
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <span className="text-xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Task Bidding</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Post your task with details and budget, then receive bids from professionals.
              </p>
              <Link href="/post-task">
                <Button variant="link" className="p-0 h-auto flex items-center gap-1">
                  Post a Task <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Services Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Popular Services</h2>
            <Link href="/services">
              <Button variant="outline">View All</Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Service Card 1 */}
            <div className="service-card bg-white dark:bg-gray-900 rounded-lg shadow-sm overflow-hidden">
              <div className="relative h-48">
                <Image src="/placeholder.svg?height=400&width=600" alt="Home Cleaning" fill className="object-cover" />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">Home Cleaning</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                  Professional cleaning services for your home
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-primary font-medium">Starting $49</span>
                  <Link href="/services/cleaning">
                    <Button size="sm">Book Now</Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Service Card 2 */}
            <div className="service-card bg-white dark:bg-gray-900 rounded-lg shadow-sm overflow-hidden">
              <div className="relative h-48">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Plumbing Services"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">Plumbing</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                  Fix leaks, installations, and plumbing repairs
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-primary font-medium">Starting $79</span>
                  <Link href="/services/plumbing">
                    <Button size="sm">Book Now</Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Service Card 3 */}
            <div className="service-card bg-white dark:bg-gray-900 rounded-lg shadow-sm overflow-hidden">
              <div className="relative h-48">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Electrical Services"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">Electrical</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                  Electrical repairs, installations, and maintenance
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-primary font-medium">Starting $89</span>
                  <Link href="/services/electrical">
                    <Button size="sm">Book Now</Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Service Card 4 */}
            <div className="service-card bg-white dark:bg-gray-900 rounded-lg shadow-sm overflow-hidden">
              <div className="relative h-48">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Appliance Repair"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">Appliance Repair</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">Repair services for all home appliances</p>
                <div className="flex justify-between items-center">
                  <span className="text-primary font-medium">Starting $69</span>
                  <Link href="/services/appliance-repair">
                    <Button size="sm">Book Now</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* City Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Available in Major Cities</h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Serveto is available in these cities with more coming soon
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {[
              "Indore",
              "Mumbai",
              "Delhi",
              "Bangalore",
              "Pune",
              "Jaipur",
              "Hyderabad",
              "Chennai",
              "Kolkata",
              "Ahmedabad",
            ].map((city) => (
              <Link key={city} href={`/${city.toLowerCase()}`}>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg text-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <MapPin className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <span className="font-medium">{city}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold">Ready to get started?</h2>
              <p className="mt-4 text-lg opacity-90 max-w-md">
                Join thousands of satisfied customers who use Serveto for their home service needs.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button size="lg" variant="secondary" onClick={handleLocationDetection}>
                  Find Services Near Me
                </Button>
                <Link href="/post-task">
                  <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                    Post a Task
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Search for a service</h3>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                  <Input
                    type="search"
                    placeholder="What service do you need?"
                    className="pl-10 pr-4 py-6 bg-gray-50 dark:bg-gray-700 border-none text-gray-900 dark:text-white"
                  />
                </div>
                <Button className="w-full mt-4 py-6">Search</Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

