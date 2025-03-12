"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import Cookies from 'js-cookie'

type GeolocationContextType = {
  userCity: string | null
  userLocation: { lat: number; lng: number } | null
  isLoading: boolean
  error: string | null
  detectLocation: () => Promise<boolean>
  setCity: (city: string, isIpBased?: boolean) => void
}

const GeolocationContext = createContext<GeolocationContextType | undefined>(undefined)

import { getLocationFromIP, reverseGeocode } from "@/lib/olakrutrim";

export function GeolocationProvider({ children }: { children: React.ReactNode }) {
  const [userCity, setUserCity] = useState<string | null>(null)
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const USER_CITY_COOKIE = 'user_city'; // Only using cookie, no localStorage
  // Cookie expires after 30 days
  const COOKIE_EXPIRY = 30;

  // List of available cities
  const AVAILABLE_CITIES = [
    "indore", "mumbai", "delhi", "bangalore", "pune", 
    "jaipur", "hyderabad", "chennai", "kolkata", "ahmedabad"
  ];

  // Helper function to check if city is available
  const isCityAvailable = (city: string): boolean => {
    if (!city) return false;
    return AVAILABLE_CITIES.includes(city.toLowerCase());
  };

  // Helper function to set city and store in cookie
  const setCity = (city: string, isIpBased: boolean = false) => {
    if (!city) return;
    setUserCity(city);

    // Only update cookie if it's IP-based location
    if (isIpBased) {
      // Store the city in a cookie so we can redirect to it on next visit
      // Using 'user_city' as the cookie name with 30-day expiry
      Cookies.set(USER_CITY_COOKIE, city, { 
        expires: COOKIE_EXPIRY,
        // Add these options for better cookie handling
        path: '/',
        sameSite: 'strict'
      });
    }
    console.log(`City set to: ${city} and saved to cookie: ${isIpBased}`);
  };

  // Helper function to save IP-based location data to cookie only
  const saveIpBasedLocation = (city: string, location: { lat: number; lng: number }) => {
    if (typeof window !== 'undefined') {
      try {
        // Only store IP-based city in cookie
        // Don't store in localStorage at all

        // Update the city state
        setCity(city, true);
      } catch (error) {
        console.error("Error saving IP-based location:", error);
      }
    }
  };

  // Helper function to extract location data
  const extractLocationData = (data: any): { city: string; state: string } | null => {
    try {
      // Check if we have address_components
      if (data.address_components && Array.isArray(data.address_components)) {
        const cityComponent = data.address_components.find((c: any) => 
          c.types && Array.isArray(c.types) && c.types.includes('locality')
        );

        const stateComponent = data.address_components.find((c: any) => 
          c.types && Array.isArray(c.types) && c.types.includes('administrative_area_level_1')
        );

        return { 
          city: cityComponent?.long_name || "Indore", 
          state: stateComponent?.long_name || "MP" 
        };
      }

      // Fallback
      return { city: "Indore", state: "MP" };
    } catch (error) {
      console.error("Error extracting location data:", error);
      return { city: "Indore", state: "MP" };
    }
  }

  const detectLocation = async (): Promise<boolean> => {
    setIsLoading(true);
    setError("");

    // Set default values immediately so UI is responsive
    const defaultLocation = { lat: 22.7196, lng: 75.8577 };
    const defaultCity = "Indore";

    let success = false;

    try {
      // ONLY try IP-based geolocation
      try {
        const locationData = await getLocationFromIP();

        if (locationData) {
          const newLocation = {
            lat: locationData.location.lat,
            lng: locationData.location.lng
          };
          setUserLocation(newLocation);

          // ONLY use setCity which sets the cookie
          setCity(locationData.city, true);

          console.log(`Detected IP-based location: ${locationData.city}`);

          success = true;
          return success;
        }
      } catch (ipError) {
        console.error("IP geolocation failed:", ipError);
      }
    } catch (error) {
      console.error("Location detection error:", error);
    } finally {
      // If IP detection failed, use default values
      if (!success) {
        setUserLocation(defaultLocation);
        setCity(defaultCity);

        setError("Could not detect your location automatically. Using default location.");
      }

      setIsLoading(false);
    }

    return success;
  }

  // Initialize geolocation data
  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof window === 'undefined') return;

    // Don't re-initialize
    if (isInitialized) return;

    const initializeLocation = async () => {
      // Check if we're on the home page
      const isHomePage = window.location.pathname === '/' || window.location.pathname === '';

      // If not on home page, just set initialized and exit
      if (!isHomePage) {
        setIsInitialized(true);
        return;
      }

      // For home page visitors, follow this priority:
      // 1. Check for user_city cookie from IP API
      // 2. Get fresh location from IP API
      // 3. Fallback to default city

      // Step 1: Check for user_city cookie from IP API
      const userCityCookie = Cookies.get(USER_CITY_COOKIE);
      if (userCityCookie) {
        // Cookie exists, set city and redirect
        setUserCity(userCityCookie);
        console.log(`Found IP-based city cookie: ${userCityCookie}, redirecting`);

        // Redirect to city page if it's available
        if (isCityAvailable(userCityCookie)) {
          router.replace(`/${userCityCookie.toLowerCase()}`);
          setIsInitialized(true);
          return;
        }
      }

      // Step 2: No cookie or city not available, get fresh location from IP API
      try {
        console.log("No valid city cookie found, getting fresh location from IP");
        const ipLocation = await getLocationFromIP();

        if (ipLocation && ipLocation.city) {
          const city = ipLocation.city;
          const location = ipLocation.location;

          setUserLocation(location);

          // Set city and cookie
          setCity(city, true);

          console.log(`Set city cookie from fresh IP: ${city}`);

          // Redirect to the IP-based city if it's available
          if (isCityAvailable(city)) {
            router.replace(`/${city.toLowerCase()}`);
          } else {
            router.replace(`/services-unavailable?city=${city.toLowerCase()}`);
          }

          setIsInitialized(true);
          return;
        }
      } catch (error) {
        console.error("IP geolocation error:", error);
      }

      // Step 3: If all above fails, use default (Indore)
      const defaultLocation = { lat: 22.7196, lng: 75.8577 };
      const defaultCity = "Indore";

      setUserLocation(defaultLocation);
      setCity(defaultCity);

      // Redirect to default city
      router.replace(`/${defaultCity.toLowerCase()}`);
      setIsInitialized(true);
    };

    initializeLocation();
  }, [router]);

  return (
    <GeolocationContext.Provider
      value={{
        userCity,
        userLocation,
        isLoading,
        error,
        detectLocation,
        setCity
      }}
    >
      {children}
    </GeolocationContext.Provider>
  )
}

export const useGeolocation = () => {
  const context = useContext(GeolocationContext)
  if (context === undefined) {
    throw new Error("useGeolocation must be used within a GeolocationProvider")
  }
  return context
}