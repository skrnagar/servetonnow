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

  // Helper function to extract location data (This function is assumed to exist elsewhere and is not defined here)
  const extractLocationData = (data: any): { city: string; state: string } | null => {
    // This is a placeholder, replace with your actual implementation
    return { city: data.address_components?.find(c => c.types.includes('locality'))?.long_name || "Indore", state: "MP" };
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
    // Auto-detect location on initial load
    const autoDetectLocation = async () => {
      try {
        // Try IP-based geolocation for initial location detection using API route
        const response = await fetch("/api/geocode/ip")

        if (!response.ok) {
          throw new Error("Auto IP location detection failed")
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
          }
        }
      } catch (error) {
        console.error("Auto IP location detection error:", error)
        // Don't set error message for auto-detection failure
      }
    }

    autoDetectLocation()
  }, [])

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