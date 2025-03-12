
"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { MapPin } from "lucide-react"

export default function ServicesUnavailablePage() {
  const searchParams = useSearchParams()
  const [city, setCity] = useState("")
  
  useEffect(() => {
    const cityParam = searchParams.get("city")
    if (cityParam) {
      setCity(cityParam.charAt(0).toUpperCase() + cityParam.slice(1))
    }
  }, [searchParams])

  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[70vh]">
      <div className="text-center max-w-2xl">
        <div className="bg-gray-100 dark:bg-gray-800 rounded-full p-4 inline-block mb-6">
          <MapPin className="h-12 w-12 text-primary" />
        </div>
        
        <h1 className="text-3xl font-bold mb-4">
          {city ? `Services Not Available in ${city}` : "Services Not Available"}
        </h1>
        
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          We're sorry, but Serveto is not yet available in 
          {city ? ` ${city}` : " your location"}. We're working hard to expand 
          our services to more cities across India.
        </p>
        
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-3">Available Cities</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
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
            ].map((availableCity) => (
              <Link key={availableCity} href={`/${availableCity.toLowerCase()}`}>
                <Button variant="outline" className="w-full" size="sm">
                  {availableCity}
                </Button>
              </Link>
            ))}
          </div>
        </div>
        
        <div className="mt-8">
          <Link href="/">
            <Button>Return to Home</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
