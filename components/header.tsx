"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  MapPin,
  Search,
  User,
  ShoppingCart,
  ChevronDown,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { useGeolocation } from "@/context/geolocation-context";
import { useAuth } from "@/context/auth-context";
import LocationSearch from "@/components/location-search";
import AuthModal from "@/components/auth-modal";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLocationSearchOpen, setIsLocationSearchOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'signup'>('login');
  const pathname = usePathname();
  const { userCity, detectLocation, isLoading } = useGeolocation();
  const { user, signOut } = useAuth();

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Extract city from URL path if it exists
  const pathSegments = pathname.split("/").filter(Boolean);
  const cityFromPath = pathSegments.length > 0 ? pathSegments[0] : null;

  // Display city name with proper capitalization
  const displayCity = userCity || cityFromPath;
  const formattedCity = displayCity
    ? displayCity.charAt(0).toUpperCase() + displayCity.slice(1).toLowerCase()
    : "Select Location";

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        isScrolled
          ? "bg-white shadow-md dark:bg-gray-900"
          : "bg-white dark:bg-gray-900"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center"
            >
              <Image
                src="/sarveto.png"
                alt="Serveto Logo"
                width={50}
                height={50}
                className="h-8 w-auto"
              />
            </Link>
          </div>

          {/* Main Search Bar (Zomato Style) */}
          <div className="hidden md:flex flex-1 max-w-xl mx-4 h-11 rounded-lg border border-gray-300 overflow-hidden">
            <div
              className="flex items-center gap-1 px-4 cursor-pointer border-r border-gray-300 bg-white hover:bg-gray-50"
              onClick={() => setIsLocationSearchOpen(true)}
            >
              <MapPin className="h-4 w-4 text-gray-400" />
              <span className="text-sm max-w-[120px] text-gray-400 truncate">
                {formattedCity}
              </span>
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </div>
            <div className="flex flex-1 items-center px-3 bg-white">
              <Search className="h-4 w-4 text-sm
 text-gray-400 mr-2" />
              <Input
                type="search"
                placeholder="Search for services"
                className="border-none text-xl
 shadow-none placeholder-gray-400 focus-visible:ring-0 pl-0 h-full"
              />
            </div>
          </div>

          {/* Desktop Right Side Actions */}
          <div className="hidden md:flex items-center space-x-5">
            <Link
              href="/services"
              className="text-sm font-medium text-gray-700 hover:text-primary"
            >
              Services
            </Link>
            <Link href="/post-task">
              <Button size="sm" className="rounded-lg">
                Post a task
              </Button>
            </Link>
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="hover:bg-gray-100">
                <ShoppingCart className="h-5 w-5" />
              </Button>
            </Link>
            
            {user ? (
              <div className="flex items-center space-x-2">
                <Link href="/account">
                  <Button variant="ghost" size="icon" className="hover:bg-gray-100">
                    <User className="h-5 w-5" />
                  </Button>
                </Link>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="hover:bg-gray-100"
                  onClick={() => signOut()}
                >
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="hover:bg-gray-100"
                  onClick={() => {
                    setAuthModalTab('login');
                    setIsAuthModalOpen(true);
                  }}
                >
                  <User className="h-5 w-5" />
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Header */}
          <div className="flex md:hidden items-center space-x-3">
            <Button
              variant="outline"
              size="icon"
              className="border-gray-300"
              onClick={() => setIsLocationSearchOpen(true)}
            >
              <MapPin className="h-5 w-5 text-primary" />
            </Button>
            <Button variant="outline" size="icon" className="border-gray-300">
              <Search className="h-5 w-5" />
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
                    <Link
                      href={
                        pathSegments.length === 1 && pathSegments[0] !== ""
                          ? `/${pathSegments[0]}`
                          : "/"
                      }
                      className="text-base font-medium py-2"
                    >
                      Home
                    </Link>
                    <Link
                      href="/services"
                      className="text-base font-medium py-2"
                    >
                      Services
                    </Link>
                    <Link
                      href="/post-task"
                      className="text-base font-medium py-2"
                    >
                      Post a task
                    </Link>
                    <Link href="/about" className="text-base font-medium py-2">
                      About
                    </Link>
                  </nav>
                  <div className="mt-auto pb-6 pt-4 border-t">
                    <div className="flex flex-col space-y-3">
                      {user ? (
                        <>
                          <Link href="/account">
                            <Button variant="outline" className="w-full">
                              My Account
                            </Button>
                          </Link>
                          <Button 
                            className="w-full"
                            onClick={() => signOut()}
                          >
                            Sign Out
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button 
                            className="w-full"
                            onClick={() => {
                              setAuthModalTab('login');
                              setIsAuthModalOpen(true);
                            }}
                          >
                            <User className="h-5 w-5 mr-2" />
                            Login
                          </Button>
                        </>
                      )}
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
        <LocationSearch
          isOpen={isLocationSearchOpen}
          onClose={() => setIsLocationSearchOpen(false)}
        />
      )}

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        defaultTab={authModalTab}
      />
    </header>
  );
}
