
"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useParams } from "next/navigation"
import { MapPin, Search, Filter, Calendar, Star, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { useGeolocation } from "@/context/geolocation-context"
import { FaListUl, FaThLarge } from "react-icons/fa"

// Sample data
const popularServices = [
  { id: 1, name: "House Cleaning", image: "/placeholder.svg?height=80&width=80", price: "₹499" },
  { id: 2, name: "AC Repair", image: "/placeholder.svg?height=80&width=80", price: "₹799" },
  { id: 3, name: "Plumbing", image: "/placeholder.svg?height=80&width=80", price: "₹399" },
  { id: 4, name: "Electrical", image: "/placeholder.svg?height=80&width=80", price: "₹599" },
  { id: 5, name: "Pest Control", image: "/placeholder.svg?height=80&width=80", price: "₹999" },
  { id: 6, name: "Carpentry", image: "/placeholder.svg?height=80&width=80", price: "₹699" },
];

const topProviders = [
  {
    id: 1,
    name: "CleanMasters",
    image: "/placeholder.svg?height=120&width=120",
    rating: 4.9,
    reviews: 120,
    category: "Cleaning",
  },
  {
    id: 2,
    name: "QuickFix Plumbing",
    image: "/placeholder.svg?height=120&width=120",
    rating: 4.7,
    reviews: 98,
    category: "Plumbing",
  },
  {
    id: 3,
    name: "ElectroPros",
    image: "/placeholder.svg?height=120&width=120",
    rating: 4.8,
    reviews: 75,
    category: "Electrical",
  },
  {
    id: 4,
    name: "PestAway",
    image: "/placeholder.svg?height=120&width=120",
    rating: 4.6,
    reviews: 84,
    category: "Pest Control",
  },
];

const recentTasks = [
  {
    id: 1,
    title: "AC repair needed",
    category: "Appliance Repair",
    date: "Posted 2 days ago",
    bids: 5,
  },
  {
    id: 2,
    title: "Full house cleaning required",
    category: "Cleaning",
    date: "Posted 3 days ago",
    bids: 8,
  },
  {
    id: 3,
    title: "Leaking bathroom tap",
    category: "Plumbing",
    date: "Posted 1 day ago",
    bids: 3,
  },
  {
    id: 4,
    title: "Need help with furniture assembly",
    category: "Handyman",
    date: "Posted 4 days ago",
    bids: 6,
  },
];

export default function CityPage() {
  const params = useParams()
  const { userCity } = useGeolocation()
  const [isGridView, setIsGridView] = useState(true)
  const [windowWidth, setWindowWidth] = useState(0)
  
  // Initialize with city from URL
  const cityName = Array.isArray(params.city) ? params.city[0] : params.city
  const formattedCityName = cityName.charAt(0).toUpperCase() + cityName.slice(1)
  
  useEffect(() => {
    // We don't need to set the city here as we're getting it from the URL
    // The userCity from context is only used for comparison
    
    // Set initial window width
    setWindowWidth(window.innerWidth)
    
    // Listen for window resize
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }
    
    window.addEventListener('resize', handleResize)
    
    // Switch to list view on mobile by default
    if (window.innerWidth < 640) {
      setIsGridView(false)
    }
    
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [formattedCityName, userCity])
  
  const isMobile = windowWidth < 640
  
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
        <Link href="/" className="hover:text-primary transition-colors">
          Home
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span>{formattedCityName}</span>
      </div>
      
      <section className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Services in {formattedCityName}</h1>
        <p className="text-muted-foreground">Find and book home services from top-rated providers</p>
        
        <div className="mt-6 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
              <Input placeholder="Search for a service" className="pl-10" />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <span>Filters</span>
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{formattedCityName}</span>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-6">Popular Services</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {popularServices.map((service) => (
            <Link 
              key={service.id} 
              href={`/services/${service.name.toLowerCase().replace(/\s+/g, '-')}`}
              className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center hover:shadow-md transition-shadow flex flex-col items-center"
            >
              <div className="relative w-16 h-16 mb-3">
                <Image
                  src={service.image}
                  alt={service.name}
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="font-medium text-sm">{service.name}</h3>
              <p className="text-primary text-xs mt-1">{service.price}</p>
            </Link>
          ))}
        </div>
      </section>
      
      <section className="mb-10">
        <Tabs defaultValue="providers" className="w-full">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Find Help in {formattedCityName}</h2>
            <TabsList>
              <TabsTrigger value="providers">Providers</TabsTrigger>
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="providers" className="mt-0">
            <div className="flex justify-between items-center mb-4">
              <p className="text-muted-foreground">Top-rated service providers</p>
              <div className="flex items-center gap-2">
                <Button 
                  variant={isGridView ? "default" : "outline"} 
                  size="icon" 
                  onClick={() => setIsGridView(true)}
                  className="h-8 w-8"
                >
                  <FaThLarge className="h-4 w-4" />
                </Button>
                <Button 
                  variant={!isGridView ? "default" : "outline"} 
                  size="icon" 
                  onClick={() => setIsGridView(false)}
                  className="h-8 w-8"
                >
                  <FaListUl className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {isGridView ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {topProviders.map((provider) => (
                  <Card key={provider.id}>
                    <CardContent className="p-4 flex flex-col items-center text-center">
                      <div className="relative w-20 h-20 mb-3 rounded-full overflow-hidden">
                        <Image 
                          src={provider.image} 
                          alt={provider.name} 
                          fill 
                          className="object-cover"
                        />
                      </div>
                      <h3 className="font-semibold">{provider.name}</h3>
                      <p className="text-sm text-muted-foreground">{provider.category}</p>
                      <div className="flex items-center gap-1 mt-2">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{provider.rating}</span>
                        <span className="text-muted-foreground text-sm">({provider.reviews})</span>
                      </div>
                      <Button className="mt-4 w-full">View Profile</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {topProviders.map((provider) => (
                  <Card key={provider.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0">
                          <Image 
                            src={provider.image} 
                            alt={provider.name} 
                            fill 
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold">{provider.name}</h3>
                          <p className="text-sm text-muted-foreground">{provider.category}</p>
                          <div className="flex items-center gap-1 mt-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-medium">{provider.rating}</span>
                            <span className="text-muted-foreground text-sm">({provider.reviews})</span>
                          </div>
                        </div>
                        <Button>View</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
            
            <div className="mt-6 text-center">
              <Button variant="outline">View All Providers</Button>
            </div>
          </TabsContent>
          
          <TabsContent value="tasks" className="mt-0">
            <div className="flex justify-between items-center mb-4">
              <p className="text-muted-foreground">Recently posted tasks in {formattedCityName}</p>
              <Link href="/post-task">
                <Button>Post a Task</Button>
              </Link>
            </div>
            
            <div className="space-y-3">
              {recentTasks.map((task) => (
                <Card key={task.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{task.title}</h3>
                        <p className="text-sm text-muted-foreground">{task.category}</p>
                        <div className="flex items-center gap-2 mt-1 text-sm">
                          <Calendar className="h-3 w-3" />
                          <span>{task.date}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-medium">{task.bids} bids</span>
                        <Button className="mt-2" size="sm">Bid Now</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="mt-6 text-center">
              <Button variant="outline">View All Tasks</Button>
            </div>
          </TabsContent>
        </Tabs>
      </section>
      
      <section className="mb-10">
        <div className="bg-primary text-white rounded-lg p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div>
              <h2 className="text-2xl font-bold mb-3">Need services in {formattedCityName}?</h2>
              <p className="mb-6 opacity-90">
                Post your task and get quotes from verified professionals in your area
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/post-task">
                  <Button variant="secondary" size="lg">Post a Task</Button>
                </Link>
                <Link href="/services">
                  <Button variant="outline" className="border-white text-white hover:bg-white/10" size="lg">
                    Browse Services
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <Image
                src="/placeholder.svg?height=200&width=400"
                alt="Service professionals"
                width={400}
                height={200}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>
      
      <section>
        <h2 className="text-2xl font-bold mb-6">Popular Categories in {formattedCityName}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {["Cleaning", "Plumbing", "Electrician", "Appliance Repair", "Pest Control", "Painting", "Carpentry", "Moving"].map((category) => (
            <Link 
              key={category} 
              href={`/services/${category.toLowerCase().replace(/\s+/g, '-')}`}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg hover:shadow-md transition-shadow"
            >
              <h3 className="font-medium">{category}</h3>
              <p className="text-sm text-muted-foreground mt-1">View providers</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
