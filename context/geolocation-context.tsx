"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

type GeolocationContextType = {
  userCity: string | null
  userLocation: { lat: number; lng: number } | null
  userAddress: string | null
  isLoading: boolean
  error: string | null
  detectLocation: () => Promise<boolean>
}

const GeolocationContext = createContext<GeolocationContextType | undefined>(undefined)

// Olakrutrim API key
const OLAKRUTRIM_API_KEY = "jUC0eYOhzK5Bwg9DVjAZpc2sCUdb9JDLu9gj4hdz"

export function GeolocationProvider({ children }: { children: React.ReactNode }) {
  const [userCity, setUserCity] = useState<string | null>(null)
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [userAddress, setUserAddress] = useState<string | null>(null)
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

  const detectLocation = async (): Promise<boolean> => {
    setIsLoading(true)
    setError(null)

    try {
      // First try browser geolocation
      if (navigator.geolocation) {
        try {
          const position = await new Promise<GeolocationPosition>((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, {
              enableHighAccuracy: true,
              timeout: 5000,
              maximumAge: 0,
            })
          })

          const { latitude, longitude } = position.coords
          setUserLocation({ lat: latitude, lng: longitude })

          // Reverse geocode using Olakrutrim API
          const response = await fetch(
            `https://maps.olakrutrim.com/v1/api/places/geocode/reverse?lat=${latitude}&lon=${longitude}`,
            {
              headers: {
                "x-api-key": OLAKRUTRIM_API_KEY
              }
            }
          )

          if (!response.ok) {
            throw new Error("Failed to get location information from Olakrutrim")
          }

          const data = await response.json()

          let cityName = null
          if (data.features && data.features.length > 0) {
            const address = data.features[0].properties?.formatted || ""
            cityName = extractCityFromAddress(address)
            // Store the full address
            setUserAddress(address)
          }

          if (cityName) {
            setUserCity(cityName)

            // Check if we should redirect to city page
            const currentPath = window.location.pathname
            if (currentPath === "/" || currentPath === "/home") {
              router.push(`/${cityName.toLowerCase()}`)
              return true
            }
            return true
          } else {
            throw new Error("City not found from coordinates")
          }
        } catch (geoError) {
          console.warn("Browser geolocation failed:", geoError)
          // Fall through to IP geolocation
        }
      }

      // Fallback to IP geolocation using Olakrutrim
      try {
        const response = await fetch("https://maps.olakrutrim.com/v1/api/places/geocode/ip", {
          headers: {
            "x-api-key": OLAKRUTRIM_API_KEY
          }
        })

        if (!response.ok) {
          throw new Error("Failed to get location from IP using Olakrutrim")
        }

        const data = await response.json()

        let cityName = data.city || null
        let latitude = data.latitude || null
        let longitude = data.longitude || null
        let fullAddress = data.fullAddress || `${cityName}, ${data.region || ''}`

        if (cityName) {
          setUserCity(cityName)
          setUserAddress(fullAddress)
          if (latitude !== null && longitude !== null) {
            setUserLocation({ lat: latitude, lng: longitude })
          }

          // Check if we should redirect to city page
          const currentPath = window.location.pathname
          if (currentPath === "/" || currentPath === "/home") {
            router.push(`/${cityName.toLowerCase()}`)
            return true
          }
          return true
        } else {
          throw new Error("City not found from IP")
        }
      } catch (ipError) {
        console.warn("IP geolocation failed:", ipError)
        // Fall through to default city
      }

      // Set a default city if all else fails
      setUserCity("Indore")

      // Only redirect if we're on homepage
      const currentPath = window.location.pathname
      if (currentPath === "/" || currentPath === "/home") {
        router.push(`/indore`)
        return true
      }

      return true
    } catch (err) {
      console.error("Location detection error:", err)
      setError(err instanceof Error ? err.message : "Failed to detect location")
      toast({
        title: "Location Error",
        description: "We couldn't detect your location. Please select a city manually.",
        variant: "destructive",
      })
      return false
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    // Auto-detect location on first load
    // We don't auto-redirect here to avoid unexpected redirects
    const autoDetectLocation = async () => {
      try {
        // Try IP geolocation using Olakrutrim
        const response = await fetch("https://maps.olakrutrim.com/v1/api/places/geocode/ip", {
          headers: {
            "x-api-key": OLAKRUTRIM_API_KEY
          },
          method: "GET",
          cache: "no-store"
        })

        if (!response.ok) {
          throw new Error("Failed to get location from IP using Olakrutrim")
        }

        const data = await response.json()

        let cityName = data.city || null
        let latitude = data.latitude || null
        let longitude = data.longitude || null

        if (cityName) {
          setUserCity(cityName)
          if (latitude !== null && longitude !== null) {
            setUserLocation({ lat: latitude, lng: longitude })
          }
          console.log("Location detected:", cityName)
        } else {
          console.warn("IP geolocation API returned no city data")
          // Set a default city if none was returned
          setUserCity("Indore")
        }
      } catch (err) {
        console.error("Auto IP location detection error:", err)
        // We don't show an error toast here as it's just an auto-detection
        // But we do set a default city
        setUserCity("Indore")
      }
    }

    autoDetectLocation()
  }, [])

  return (
    <GeolocationContext.Provider
      value={{
        userCity,
        userLocation,
        userAddress,
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