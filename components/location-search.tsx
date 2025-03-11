"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { X, MapPin, Loader2, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useGeolocation } from "@/context/geolocation-context"
import { useToast } from "@/components/ui/use-toast"

interface LocationSearchProps {
  isOpen: boolean
  onClose: () => void
}

interface PlaceSuggestion {
  id: string
  name: string
  city: string
  state?: string
  country?: string
}

const popularCities = [
  { id: "indore", name: "Indore" },
  { id: "mumbai", name: "Mumbai" },
  { id: "delhi", name: "Delhi" },
  { id: "bangalore", name: "Bangalore" },
  { id: "pune", name: "Pune" },
  { id: "jaipur", name: "Jaipur" },
  { id: "hyderabad", name: "Hyderabad" },
  { id: "chennai", name: "Chennai" },
  { id: "kolkata", name: "Kolkata" },
  { id: "ahmedabad", name: "Ahmedabad" },
]

export default function LocationSearch({ isOpen, onClose }: LocationSearchProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [suggestions, setSuggestions] = useState<PlaceSuggestion[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const { detectLocation, isLoading } = useGeolocation()
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    // Focus the search input when modal opens
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }

    // Add event listener to close on escape key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [isOpen, onClose])

  // Handle search input change
  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)

    if (query.length < 2) {
      setSuggestions([])
      return
    }

    setIsSearching(true)
    try {
      const response = await fetch(`/api/geocode/search?query=${encodeURIComponent(query)}`)
      if (!response.ok) throw new Error("Search failed")

      const data = await response.json()
      setSuggestions(data.results || [])
    } catch (error) {
      console.error("Search error:", error)
      toast({
        title: "Search Error",
        description: "Failed to get location suggestions. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSearching(false)
    }
  }

  // Handle location detection
  const handleDetectLocation = async () => {
    try {
      await detectLocation()
      onClose()
    } catch (error) {
      console.error("Location detection error:", error)
    }
  }

  // Handle city selection
  const handleSelectCity = (cityName: string) => {
    router.push(`/${cityName.toLowerCase()}`)
    onClose()
  }

  // Handle suggestion selection
  const handleSelectSuggestion = (suggestion: PlaceSuggestion) => {
    if (suggestion.city) {
      router.push(`/${suggestion.city.toLowerCase()}`)
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-start justify-center pt-20 px-4">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg w-full max-w-md max-h-[80vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Select Location</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Search input */}
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
            <Input
              ref={searchInputRef}
              type="text"
              placeholder="Search for your city..."
              className="pl-10 pr-4 py-2"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          <Button
            variant="outline"
            className="w-full mt-3 flex items-center justify-center gap-2"
            onClick={handleDetectLocation}
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <MapPin className="h-4 w-4" />}
            {isLoading ? "Detecting..." : "Use current location"}
          </Button>
        </div>

        {/* Search results */}
        <div className="overflow-y-auto flex-1">
          {isSearching ? (
            <div className="flex items-center justify-center p-6">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          ) : suggestions.length > 0 ? (
            <div className="p-2">
              <h3 className="px-2 py-1 text-sm font-medium text-gray-500">Search Results</h3>
              <ul>
                {suggestions.map((suggestion) => (
                  <li key={suggestion.id}>
                    <button
                      className="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md flex items-center gap-2"
                      onClick={() => handleSelectSuggestion(suggestion)}
                    >
                      <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                      <div>
                        <div className="font-medium">{suggestion.name}</div>
                        <div className="text-sm text-gray-500">
                          {[suggestion.city, suggestion.state, suggestion.country].filter(Boolean).join(", ")}
                        </div>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : searchQuery.length > 0 && !isSearching ? (
            <div className="p-6 text-center text-gray-500">No results found for "{searchQuery}"</div>
          ) : (
            <div className="p-4">
              <h3 className="mb-3 text-sm font-medium text-gray-500">Popular Cities</h3>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {popularCities.map((city) => (
                  <Button
                    key={city.id}
                    variant="outline"
                    className="justify-start"
                    onClick={() => handleSelectCity(city.name)}
                  >
                    <MapPin className="h-4 w-4 mr-2 text-primary" />
                    {city.name}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

