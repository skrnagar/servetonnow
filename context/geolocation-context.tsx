"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

type GeolocationContextType = {
  userCity: string | null
  userLocation: { lat: number; lng: number } | null
  isLoading: boolean
  error: string | null
  detectLocation: () => Promise<boolean>
}

const GeolocationContext = createContext<GeolocationContextType | undefined>(undefined)

// Olakrutrim API key (This is not used after the changes)
const OLAKRUTRIM_API_KEY = "jUC0eYOhzK5Bwg9DVjAZpc2sCUdb9JDLu9gj4hdz"

export function GeolocationProvider({ children }: { children: React.ReactNode }) {
  const [userCity, setUserCity] = useState<string | null>(null)
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()
  const router = useRouter()

  // Helper function to extract city from an address string
  const extractCityFromAddress = (address: string): string | null => {
    const parts = address.split(',').map(part => part.trim())
    if (parts.length >= 1) {
      return parts[0]
    }
    return null
  }

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
    setIsLoading(true)
    setError("")

    try {
      // First try browser geolocation
      if (navigator.geolocation) {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
          })
        })

        const { latitude, longitude } = position.coords

        // Use Next.js API route to proxy the request (avoids CORS issues)
        const response = await fetch(
          `/api/geocode/reverse?lat=${latitude}&lon=${longitude}`
        )

        if (!response.ok) {
          throw new Error("Reverse geocoding failed")
        }

        const data = await response.json()
        if (data && data.results && data.results.length > 0) {
          const locationData = extractLocationData(data.results[0])
          if (locationData) {
            setUserLocation({
              ...locationData,
              coords: { lat: latitude, lng: longitude }
            })
            setUserCity(locationData.city); //Added to set the city name from the locationData
            return true; //Return true to indicate success
          }
        }
      }
    } catch (error) {
      console.error("Browser geolocation failed:", error)
    }

    try {
      // Fall back to IP-based geolocation (using API route)
      const response = await fetch("/api/geocode/ip")

      if (!response.ok) {
        throw new Error("IP geolocation failed")
      }

      const data = await response.json()
      if (data && data.results && data.results.length > 0) {
        const locationData = extractLocationData(data.results[0])
        if (locationData) {
          setUserLocation({
            ...locationData,
            coords: data.results[0].geometry?.location || null
          })
          setUserCity(locationData.city); //Added to set the city name from the locationData
          return true; //Return true to indicate success
        }
      }
    } catch (error) {
      console.error("IP geolocation failed:", error)
      setError("Could not detect your location automatically. Please enter it manually.")
      return false; //Return false to indicate failure
    } finally {
      setIsLoading(false)
    }
    return false; //Return false if both methods fail
  }

  useEffect(() => {
    // Auto-detect location on initial load - only for default city, not for showing in UI
    const autoDetectLocation = async () => {
      try {
        // Set default fallback location
        const defaultLocation = { lat: 22.7196, lng: 75.8577 };
        const defaultCity = "Indore";
        
        // We're setting default values first, so the UI doesn't wait
        setUserLocation(defaultLocation);
        setUserCity(defaultCity);
        
        // Check if we're in a browser environment (client-side)
        if (typeof window === 'undefined') return;
        
        // For page redirect only - use IP-based geolocation as fallback
        // but don't block the UI rendering
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        
        fetch("/api/geocode/ip", {
          signal: controller.signal
        })
        .then(response => {
          if (!response.ok) throw new Error("IP geolocation failed");
          return response.json();
        })
        .then(data => {
          if (data && data.results && data.results.length > 0) {
            const locationData = extractLocationData(data.results[0]);
            if (locationData) {
              // Update location data silently in the background
              setUserLocation({
                lat: data.results[0].geometry?.location?.lat || defaultLocation.lat,
                lng: data.results[0].geometry?.location?.lng || defaultLocation.lng
              });
              setUserCity(locationData.city || defaultCity);
            }
          }
        })
        .catch(error => {
          console.error("Auto IP location detection error:", error);
          // Already set fallback values, so no need to set again
        })
        .finally(() => clearTimeout(timeoutId));
        
      } catch (error) {
        console.error("Auto IP location detection error:", error);
        // Set fallback values for auto-detection failure
        setUserLocation({ lat: 22.7196, lng: 75.8577 });
        setUserCity("Indore");
      }
    };

    autoDetectLocation();
  }, []);

  return (
    <GeolocationContext.Provider
      value={{
        userCity,
        userLocation,
        isLoading,
        error,
        detectLocation,
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