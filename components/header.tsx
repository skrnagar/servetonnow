"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X, MapPin, Search, User, ShoppingCart, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { useGeolocation } from "@/context/geolocation-context"
import LocationSearch from "@/components/location-search"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isLocationSearchOpen, setIsLocationSearchOpen] = useState(false)
  const pathname = usePathname()
  const { userCity, userAddress, userLocation, detectLocation, isLoading } = useGeolocation()
  const [displayAddress, setDisplayAddress] = useState<string | null>(null)
  
  // Get the most detailed address to display
  useEffect(() => {
    // Check for user selected address from localStorage first
    const savedAddress = localStorage.getItem('userSelectedAddress');
    if (savedAddress) {
      setDisplayAddress(savedAddress);
    } else if (userAddress) {
      setDisplayAddress(userAddress);
    } else if (userCity) {
      setDisplayAddress(userCity);
    }
  }, [userAddress, userCity]);

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Extract city from URL path if it exists
  const pathSegments = pathname.split("/").filter(Boolean)
  const cityFromPath = pathSegments.length > 0 ? pathSegments[0] : null

  // Display city name with proper capitalization
  const displayCity = userCity || cityFromPath
  const formattedCity = displayCity
    ? displayCity.charAt(0).toUpperCase() + displayCity.slice(1).toLowerCase()
    : "Select Location"

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        isScrolled ? "bg-white shadow-md dark:bg-gray-900" : "bg-white dark:bg-gray-900"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-1">
              <div className="bg-black rounded-md w-10 h-10 flex items-center justify-center text-white">
                <span className="font-bold text-sm">UC</span>
              </div>
              <div className="text-sm font-medium ml-1">Urban Company</div>
            </Link>
          </div>

          {/* Main Search Bar (Urban Company Style) */}
          <div className="hidden md:flex items-center space-x-4 flex-1 max-w-3xl mx-4">
            {/* Address selection button */}
            <div 
              className="flex items-center gap-2 py-2 px-4 cursor-pointer bg-white hover:bg-gray-50 border border-gray-200 rounded-full w-[300px]"
              onClick={() => setIsLocationSearchOpen(true)}
            >
              <MapPin className="h-5 w-5 text-gray-500" />
              <div className="flex-1 truncate pr-2">
                <span className="font-medium text-gray-700 text-sm">
                  {displayAddress || formattedCity}
                </span>
              </div>
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </div>
            
            {/* Search box */}
            <div className="flex flex-1 items-center py-2 px-4 bg-white border border-gray-200 rounded-full">
              <Search className="h-5 w-5 text-gray-400 mr-2" />
              <Input
                type="search"
                placeholder="Search for 'Facial'"
                className="border-none shadow-none focus-visible:ring-0 pl-0 h-full bg-transparent text-sm"
              />
            </div>
          </div>

          {/* Desktop Right Side Actions */}
          <div className="hidden md:flex items-center space-x-5">
            <Link href="/how-it-works" className="text-sm font-medium text-gray-700 hover:text-primary">
              How It Works
            </Link>
            <Link href="/services" className="text-sm font-medium text-gray-700 hover:text-primary">
              Services
            </Link>
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="hover:bg-gray-100">
                <ShoppingCart className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/account">
              <Button variant="ghost" size="icon" className="hover:bg-gray-100">
                <User className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/login">
              <Button size="sm" className="rounded-lg">Login</Button>
            </Link>
          </div>

          {/* Mobile Header */}
          <div className="flex md:hidden items-center space-x-3">
            <Button variant="outline" size="icon" className="rounded-full border-gray-300" onClick={() => setIsLocationSearchOpen(true)}>
              <MapPin className="h-5 w-5 text-primary" />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full border-gray-300">
              <Search className="h-5 w-5" />
            </Button>
            <Link href="/cart" className="md:hidden">
              <Button variant="ghost" size="icon" className="rounded-full">
                <ShoppingCart className="h-5 w-5" />
              </Button>
            </Link>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between py-4">
                    <span className="text-lg font-bold">Menu</span>
                    <SheetTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <X className="h-5 w-5" />
                      </Button>
                    </SheetTrigger>
                  </div>
                  <nav className="flex flex-col space-y-4 mt-4">
                    <Link href="/" className="text-base font-medium py-2">
                      Home
                    </Link>
                    <Link href="/services" className="text-base font-medium py-2">
                      Services
                    </Link>
                    <Link href="/how-it-works" className="text-base font-medium py-2">
                      How It Works
                    </Link>
                    <Link href="/about" className="text-base font-medium py-2">
                      About
                    </Link>
                  </nav>
                  <div className="mt-auto pb-6 pt-4 border-t">
                    <div className="flex flex-col space-y-3">
                      <Link href="/login">
                        <Button className="w-full">Login</Button>
                      </Link>
                      <Link href="/signup">
                        <Button variant="outline" className="w-full">
                          Sign Up
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Location Search Modal */}
      {isLocationSearchOpen && (
        <LocationSearch isOpen={isLocationSearchOpen} onClose={() => setIsLocationSearchOpen(false)} />
      )}
    </header>
  )
}

