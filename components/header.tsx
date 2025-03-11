"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X, MapPin, Search, User, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { useGeolocation } from "@/context/geolocation-context"
import LocationSearch from "@/components/location-search"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isLocationSearchOpen, setIsLocationSearchOpen] = useState(false)
  const pathname = usePathname()
  const { userCity, detectLocation, isLoading } = useGeolocation()

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
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/serveto_logo_main.png"
              alt="Serveto Logo"
              width={40}
              height={40}
              className="h-10 w-auto"
            />
            <span className="text-2xl font-bold text-primary">Serveto</span>
          </Link>

          {/* Location selector */}
          <Button
            variant="outline"
            size="sm"
            className="hidden md:flex items-center gap-1 ml-4"
            onClick={() => setIsLocationSearchOpen(true)}
          >
            <MapPin className="h-4 w-4 text-primary" />
            <span className="max-w-[120px] truncate">{formattedCity}</span>
          </Button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className={`text-sm font-medium ${pathname === "/" ? "text-primary" : "text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary"}`}
            >
              Home
            </Link>
            <Link
              href="/services"
              className={`text-sm font-medium ${pathname === "/services" ? "text-primary" : "text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary"}`}
            >
              Services
            </Link>
            <Link
              href="/how-it-works"
              className={`text-sm font-medium ${pathname === "/how-it-works" ? "text-primary" : "text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary"}`}
            >
              How It Works
            </Link>
            <Link
              href="/about"
              className={`text-sm font-medium ${pathname === "/about" ? "text-primary" : "text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary"}`}
            >
              About
            </Link>
          </nav>

          {/* Desktop Right Side Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search services..."
                className="w-[200px] pl-9 rounded-full bg-gray-100 border-none focus-visible:ring-primary dark:bg-gray-800"
              />
            </div>
            <Link href="/cart">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/account">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/login">
              <Button size="sm">Login</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-2">
            <Button variant="outline" size="icon" className="md:hidden" onClick={() => setIsLocationSearchOpen(true)}>
              <MapPin className="h-5 w-5 text-primary" />
            </Button>
            <Link href="/cart" className="md:hidden">
              <Button variant="ghost" size="icon">
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
                    <div className="relative py-2">
                      <Search className="absolute left-2.5 top-5 h-4 w-4 text-gray-500" />
                      <Input
                        type="search"
                        placeholder="Search services..."
                        className="w-full pl-9 rounded-full bg-gray-100 border-none focus-visible:ring-primary dark:bg-gray-800"
                      />
                    </div>
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

