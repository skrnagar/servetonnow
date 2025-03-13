"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { X, MapPin, Loader2, Search, ArrowLeft, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useGeolocation } from "@/context/geolocation-context"
import { useToast } from "@/components/ui/use-toast"
import { searchPlaces, PlaceSuggestion } from "@/lib/olakrutrim"
import Image from "next/image"

interface LocationSearchProps {
  isOpen: boolean
  onClose: () => void
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
  const { detectLocation, isLoading, userLocation, userCity, setCity } = useGeolocation()
  const { toast } = useToast()
  const router = useRouter()
  const [localCity, setLocalCity] = useState(""); // Renamed to avoid conflict

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
      // Use OlaKrutrim Autocomplete API for better place suggestions
      const response = await fetch(`/api/places/autocomplete?input=${encodeURIComponent(query)}&limit=5`);
      const data = await response.json();
      
      // Transform the API response to match our PlaceSuggestion format
      if (data.predictions && Array.isArray(data.predictions)) {
        const results = data.predictions.map((prediction: any, index: number) => {
          // Extract city from structured_formatting or description
          const mainText = prediction.structured_formatting?.main_text || '';
          const secondaryText = prediction.structured_formatting?.secondary_text || '';
          const description = prediction.description || '';
          
          // Try to extract city name
          let cityName = '';
          if (secondaryText) {
            // Usually city is the first part of secondary text
            const parts = secondaryText.split(',');
            cityName = parts[0]?.trim() || '';
          }
          
          // If we couldn't extract city, use main text as fallback
          if (!cityName) {
            cityName = mainText;
          }
          
          return {
            id: prediction.place_id || `place-${index}`,
            name: mainText || description.split(',')[0],
            city: cityName || mainText, // Ensure we always have a city value
            fullAddress: description,
            state: secondaryText ? secondaryText.split(',')[1]?.trim() : undefined,
            country: secondaryText ? secondaryText.split(',').slice(-1)[0]?.trim() : undefined
          };
        });
        
        setSuggestions(results);
      } else {
        // Use local popular cities as fallback
        const filteredCities = popularCities
          .filter(city => city.name.toLowerCase().includes(query.toLowerCase()))
          .map(city => ({
            id: city.id,
            name: city.name,
            city: city.name,
            fullAddress: `${city.name}, India`
          }));

        setSuggestions(filteredCities);
      }
    } catch (error) {
      console.error("Search error:", error);
      
      // Don't show error toast - instead just use the fallback quietly
      // This provides a better user experience
      
      // Fallback to popular cities matching the query
      const filteredCities = popularCities
        .filter(city => city.name.toLowerCase().includes(query.toLowerCase()))
        .map(city => ({
          id: city.id,
          name: city.name,
          city: city.name,
          fullAddress: `${city.name}, India`
        }));

      setSuggestions(filteredCities);
    } finally {
      setIsSearching(false)
    }
  }

  // Handle location detection
  const handleDetectLocation = async () => {
    try {
      const success = await detectLocation();
      if (success) {
        onClose();
      } else {
        toast({
          title: "Location Detection",
          description: "Using default location: Indore. You can search for a different city.",
          variant: "default",
        });
      }
    } catch (error) {
      console.error("Location detection error:", error);
      toast({
        title: "Location Detection Failed",
        description: "Using default location: Indore. You can search for a different city.",
        variant: "destructive",
      });
    }
  }

  // List of available cities
  const availableCities = [
    "indore", "mumbai", "delhi", "bangalore", "pune", 
    "jaipur", "hyderabad", "chennai", "kolkata", "ahmedabad"
  ];

  // Check if city is available
  const isCityAvailable = (city: string): boolean => {
    if (!city) return false;
    return availableCities.includes(city.toLowerCase());
  };

  // Handle city selection
  const handleSelectCity = (city: string) => {
    if (city) {
      // Use the context's setCity that we already have from the component level
      // Pass isIpBased=false to not save to cookie when manually selecting
      setCity(city, false);
      
      onClose();
      
      // Check if city is available
      if (isCityAvailable(city)) {
        router.push(`/${city.toLowerCase()}`);
      } else {
        // Redirect to services unavailable page
        router.push(`/services-unavailable?city=${city.toLowerCase()}`);
      }
    }
  }

  // Handle suggestion selection
  const handleSelectSuggestion = (suggestion: PlaceSuggestion) => {
    if (suggestion.city) {
      // Use the context's setCity that we already have from the component level
      setCity(suggestion.city);
      
      onClose();
      
      // Check if city is available
      if (isCityAvailable(suggestion.city)) {
        router.push(`/${suggestion.city.toLowerCase()}`);
      } else {
        // Redirect to services unavailable page
        router.push(`/services-unavailable?city=${suggestion.city.toLowerCase()}`);
      }
    }
  }

  // Clear search input
  const handleClearSearch = () => {
    setSearchQuery("")
    setSuggestions([])
    if (searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }


  useEffect(() => {
    // Redirect on initial load if a city is in the cookie
    const getCookie = (name: string) => {
      const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
      return match ? match[2] : null;
    };

    const mostRecentCity = getCookie('most_recent_city');
    if (mostRecentCity) {
      router.push(`/${mostRecentCity.toLowerCase()}`);
    }
    //IP based redirection if cookie is not present and location detection fails
    else if (!mostRecentCity && !userLocation) {
        router.push('/indore'); //Replace with a more robust IP geolocation service
    }
  }, []);


  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header with search input */}
        <div className="p-4 border-b relative">
          <div className="relative flex items-center">
            <div className="absolute left-2 top-1/2 transform -translate-y-1/2">
              <ArrowLeft className="h-5 w-5 text-gray-600 cursor-pointer" onClick={onClose} />
            </div>
            <Input
              ref={searchInputRef}
              type="text"
              placeholder="Search for your location/society/apartment"
              className="pl-10 pr-10 py-5 border-gray-300 rounded-lg"
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && suggestions.length > 0) {
                  handleSelectSuggestion(suggestions[0]);
                }
              }}
            />
            {searchQuery && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={handleClearSearch}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
          
          {/* Use current location button */}
          <div className="flex mt-4">
            <Button
              variant="ghost"
              className="text-purple-600 font-medium flex items-center justify-start w-full"
              onClick={handleDetectLocation}
              disabled={isLoading}
            >
              <div className="bg-purple-100 rounded-full p-2 mr-3">
                {isLoading ? 
                  <Loader2 className="h-5 w-5 animate-spin text-purple-600" /> : 
                  <MapPin className="h-5 w-5 text-purple-600" />
                }
              </div>
              {isLoading ? "Detecting location..." : "Use current location"}
            </Button>
          </div>
        </div>

        {/* Recent Locations section */}
        <div className="border-b pb-4">
          <h3 className="text-lg font-semibold px-4 py-3">Recents</h3>
          {userLocation && userCity ? (
            <div className="px-4">
              <button
                className="w-full text-left py-3 flex items-start gap-3"
                onClick={() => handleSelectCity(userCity)}
              >
                <Clock className="h-5 w-5 text-gray-500 mt-1" />
                <div>
                  <div className="font-medium text-base">{userCity} Central</div>
                  <div className="text-sm text-gray-500">
                    {userCity}, {userLocation ? "Location detected" : "India"}
                  </div>
                </div>
              </button>
            </div>
          ) : (
            <div className="px-4 py-2 text-gray-500">No recent locations</div>
          )}
        </div>

        {/* Search results */}
        <div className="overflow-y-auto flex-1">
          {isSearching ? (
            <div className="flex items-center justify-center p-6">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          ) : suggestions.length > 0 ? (
            <div className="p-2">
              <ul>
                {suggestions.map((suggestion) => (
                  <li key={suggestion.id}>
                    <button
                      className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-start gap-3"
                      onClick={() => handleSelectSuggestion(suggestion)}
                    >
                      <MapPin className="h-5 w-5 text-gray-500 mt-1" />
                      <div className="flex-1">
                        <div className="font-medium">{suggestion.name}</div>
                        <div className="text-sm text-gray-500 truncate">
                          {suggestion.fullAddress || [suggestion.city, suggestion.state, suggestion.country].filter(Boolean).join(", ")}
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
              {/* Popular Cities section removed */}
            </div>
          )}
        </div>
        
        {/* Footer with attribution */}
        <div className="p-4 flex justify-center border-t">
          <div className="text-xs text-gray-500 flex items-center">
            powered by 
            <Image 
              src="https://maps.olakrutrim.com/img/logo.png" 
              alt="OlaKrutrim" 
              width={80} 
              height={16} 
              className="ml-2"
            />
          </div>
        </div>
      </div>
    </div>
  )
}