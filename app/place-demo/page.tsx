
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import PlaceDetails from "@/components/place-details"
import { searchPlaces, PlaceSuggestion } from "@/lib/olakrutrim"
import { Loader2, MapPin, Search } from "lucide-react"

export default function PlaceDemoPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searching, setSearching] = useState(false)
  const [suggestions, setSuggestions] = useState<PlaceSuggestion[]>([])
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null)

  const handleSearch = async () => {
    if (!searchQuery.trim()) return
    
    try {
      setSearching(true)
      const results = await searchPlaces(searchQuery, 5)
      setSuggestions(results)
    } catch (error) {
      console.error("Search error:", error)
    } finally {
      setSearching(false)
    }
  }

  const handleSelectPlace = (placeId: string) => {
    setSelectedPlaceId(placeId)
    setSuggestions([])
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-2xl font-bold mb-6">Place Details API Demo</h1>
      
      <div className="mb-8">
        <div className="flex gap-2 mb-4">
          <Input
            placeholder="Search for a place..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="flex-1"
          />
          <Button onClick={handleSearch} disabled={searching}>
            {searching ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
            Search
          </Button>
        </div>
        
        {suggestions.length > 0 && (
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 mb-6">
            <div className="p-1">
              {suggestions.map((suggestion) => (
                <Button
                  key={suggestion.id}
                  variant="ghost"
                  className="w-full justify-start rounded-md p-2 mb-1"
                  onClick={() => handleSelectPlace(suggestion.id)}
                >
                  <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                  <div className="flex flex-col items-start text-left">
                    <span className="font-medium">{suggestion.name}</span>
                    <span className="text-xs text-gray-500">
                      {suggestion.fullAddress || `${suggestion.city}${suggestion.state ? `, ${suggestion.state}` : ''}`}
                    </span>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {selectedPlaceId ? (
        <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
          <PlaceDetails 
            placeId={selectedPlaceId} 
            onClose={() => setSelectedPlaceId(null)}
          />
        </div>
      ) : (
        <div className="text-center p-8 bg-gray-50 dark:bg-gray-900 rounded-lg">
          <MapPin className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium mb-2">Search for a place to see details</h3>
          <p className="text-gray-500">
            Try searching for a place like "Taj Mahal", "MG Road", or "Landmark"
          </p>
        </div>
      )}
    </div>
  )
}
