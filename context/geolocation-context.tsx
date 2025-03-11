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
  detectLocation: () => Promise<void>
}

const GeolocationContext = createContext<GeolocationContextType | undefined>(undefined)

export function GeolocationProvider({ children }: { children: React.ReactNode }) {
  const [userCity, setUserCity] = useState<string | null>(null)
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()
  const router = useRouter()

  const detectLocation = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // First try browser geolocation
      if (navigator.geolocation) {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
          })
        })

        const { latitude, longitude } = position.coords
        setUserLocation({ lat: latitude, lng: longitude })

        // Reverse geocode to get city using Olakrutrim API
        const response = await fetch(`/api/geocode/reverse?lat=${latitude}&lng=${longitude}`)

        if (!response.ok) {
          throw new Error("Failed to get location information")
        }

        const data = await response.json()

        if (data.city) {
          setUserCity(data.city)

          // Check if we should redirect to city page
          const currentPath = window.location.pathname
          if (currentPath === "/" || currentPath === "/home") {
            router.push(`/${data.city.toLowerCase()}`)
          }
        } else {
          throw new Error("City not found")
        }
      } else {
        // Fallback to IP geolocation
        const response = await fetch("/api/geocode/ip")

        if (!response.ok) {
          throw new Error("Failed to get location from IP")
        }

        const data = await response.json()

        if (data.city) {
          setUserCity(data.city)
          if (data.latitude && data.longitude) {
            setUserLocation({ lat: data.latitude, lng: data.longitude })
          }

          // Check if we should redirect to city page
          const currentPath = window.location.pathname
          if (currentPath === "/" || currentPath === "/home") {
            router.push(`/${data.city.toLowerCase()}`)
          }
        } else {
          throw new Error("City not found from IP")
        }
      }
    } catch (err) {
      console.error("Location detection error:", err)
      setError(err instanceof Error ? err.message : "Failed to detect location")
      toast({
        title: "Location Error",
        description: "We couldn't detect your location. Please select a city manually.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    // Auto-detect location on first load
    // We don't auto-redirect here to avoid unexpected redirects
    const autoDetectLocation = async () => {
      try {
        // Try IP geolocation first as it's less intrusive
        const response = await fetch("/api/geocode/ip")

        if (!response.ok) {
          throw new Error("Failed to get location from IP")
        }

        const data = await response.json()

        if (data.city) {
          setUserCity(data.city)
          if (data.latitude && data.longitude) {
            setUserLocation({ lat: data.latitude, lng: data.longitude })
          }
        }
      } catch (err) {
        console.error("Auto IP location detection error:", err)
        // We don't show an error toast here as it's just an auto-detection
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

