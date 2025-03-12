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

  // Format address to be more compact - "63, Maharani Rd..." style
  const formatCompactAddress = (address: string | null) => {
    if (!address) return "Select Location";

    // If address is too long, truncate it
    if (address.length > 25) {
      return address.substring(0, 22) + "...";
    }
    return address;
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        isScrolled ? "bg-white shadow-md dark:bg-gray-900" : "bg-white dark:bg-gray-900"
      }`}
    >
      <div className="container mx-auto px-4 py-2">
        <div className="flex h-14 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center mr-4">
            <Link href="/" className="flex items-center">
              <div className="bg-black h-8 w-8 rounded flex items-center justify-center mr-2">
                <span className="text-white font-bold text-xs">UC</span>
              </div>
              <span className="font-medium text-sm mr-4">Native</span>
            </Link>
          </div>

          {/* Main Navigation Elements (Desktop) */}
          <div className="hidden md:flex flex-1 max-w-4xl items-center">
            {/* Location selector - compact style */}
            <div 
              className="flex items-center gap-1 px-3 py-2 cursor-pointer bg-white hover:bg-gray-50 border border-gray-200 rounded-lg max-w-[220px] mr-2"
              onClick={() => setIsLocationSearchOpen(true)}
            >
              <MapPin className="h-4 w-4 text-gray-500 flex-shrink-0" />
              <div className="flex-1 truncate">
                <span className="text-gray-700 text-sm">
                  {formatCompactAddress(displayAddress || formattedCity)}
                </span>
              </div>
              <ChevronDown className="h-3 w-3 text-gray-500 flex-shrink-0" />
            </div>

            {/* Search input - clean style */}
            <div className="flex flex-1 items-center px-3 py-2 bg-white border border-gray-200 rounded-lg">
              <Search className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
              <Input
                type="search"
                placeholder="Search for 'Facial'"
                className="border-none shadow-none focus-visible:ring-0 p-0 h-6 bg-transparent text-sm"
              />
            </div>
          </div>

          {/* Desktop Right Side Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/account">
              <Button variant="ghost" size="icon" className="hover:bg-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bookmark h-5 w-5"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>
              </Button>
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
          </div>

          {/* Mobile Header */}
          <div className="flex md:hidden items-center space-x-2">
            <Button variant="outline" size="sm" className="border-gray-200 h-9 px-2" onClick={() => setIsLocationSearchOpen(true)}>
              <MapPin className="h-4 w-4 text-gray-500 mr-1" />
              <span className="text-xs font-normal truncate max-w-[100px]">
                {formatCompactAddress(displayAddress || formattedCity)}
              </span>
            </Button>
            <Button variant="outline" size="icon" className="border-gray-200 h-9 w-9">
              <Search className="h-4 w-4" />
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9">
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