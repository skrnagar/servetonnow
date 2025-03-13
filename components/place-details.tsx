
"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Loader2, MapPin, Clock, Star, Phone, Globe, Navigation } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { getPlaceDetails } from "@/lib/olakrutrim"

interface PlaceDetailsProps {
  placeId: string
  onClose?: () => void
}

export default function PlaceDetails({ placeId, onClose }: PlaceDetailsProps) {
  const [placeData, setPlaceData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPlaceDetails() {
      if (!placeId) return
      
      try {
        setLoading(true)
        const data = await getPlaceDetails(placeId)
        setPlaceData(data)
        setError(null)
      } catch (err) {
        console.error("Error fetching place details:", err)
        setError("Failed to load place details. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    fetchPlaceDetails()
  }, [placeId])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[200px] p-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="mt-2 text-sm text-gray-500">Loading place details...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4 text-center">
        <p className="text-red-500">{error}</p>
        <Button 
          variant="outline" 
          className="mt-4" 
          onClick={() => setPlaceData(null)}
        >
          Try Again
        </Button>
      </div>
    )
  }

  // Extract details from response
  const result = placeData?.result || {}
  const { 
    name, 
    formatted_address, 
    geometry, 
    formatted_phone_number, 
    website, 
    rating,
    opening_hours,
    photos,
    types = []
  } = result

  const location = geometry?.location
  const photoUrl = photos && photos.length > 0 
    ? `/api/places/photo?photo_reference=${photos[0].photo_reference}&maxwidth=400` 
    : "/placeholder.svg?height=400&width=600"

  const isOpen = opening_hours?.open_now
  const placeTypes = types.map((type: string) => 
    type.replace(/_/g, ' ')).slice(0, 3)

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg max-w-lg mx-auto">
      {/* Header with photo */}
      <div className="relative h-48 w-full">
        <Image 
          src={photoUrl}
          alt={name || "Place image"}
          fill
          className="object-cover"
        />
        {onClose && (
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute top-2 right-2 bg-white/80 dark:bg-black/50 rounded-full h-8 w-8"
            onClick={onClose}
          >
            <span className="sr-only">Close</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </Button>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h2 className="text-lg font-bold mb-1">{name}</h2>
        
        {/* Types/Categories */}
        {placeTypes.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {placeTypes.map((type: string, index: number) => (
              <span 
                key={index} 
                className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full capitalize"
              >
                {type}
              </span>
            ))}
          </div>
        )}
        
        {/* Rating */}
        {rating && (
          <div className="flex items-center mb-2">
            <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
            <span className="text-sm font-medium">{rating}</span>
            <span className="text-sm text-gray-500 ml-1">/5</span>
          </div>
        )}
        
        {/* Open now status */}
        {opening_hours && (
          <div className="flex items-center mb-2">
            <Clock className="h-4 w-4 mr-2 text-gray-500" />
            <span className={`text-sm ${isOpen ? 'text-green-600' : 'text-red-500'}`}>
              {isOpen ? 'Open now' : 'Closed'}
            </span>
          </div>
        )}
        
        {/* Address */}
        {formatted_address && (
          <div className="flex items-start mb-2">
            <MapPin className="h-4 w-4 mr-2 text-gray-500 mt-0.5 flex-shrink-0" />
            <span className="text-sm text-gray-600 dark:text-gray-300">{formatted_address}</span>
          </div>
        )}
        
        {/* Phone */}
        {formatted_phone_number && (
          <div className="flex items-center mb-2">
            <Phone className="h-4 w-4 mr-2 text-gray-500" />
            <a href={`tel:${formatted_phone_number}`} className="text-sm text-primary hover:underline">
              {formatted_phone_number}
            </a>
          </div>
        )}
        
        {/* Website */}
        {website && (
          <div className="flex items-center mb-4">
            <Globe className="h-4 w-4 mr-2 text-gray-500" />
            <a 
              href={website} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-sm text-primary hover:underline truncate max-w-[250px]"
            >
              {website.replace(/^https?:\/\//, '')}
            </a>
          </div>
        )}
        
        {/* Action buttons */}
        <div className="flex gap-2 mt-4">
          {location && (
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => window.open(`https://maps.google.com/maps?q=${location.lat},${location.lng}`, '_blank')}
            >
              <Navigation className="h-4 w-4 mr-2" />
              Directions
            </Button>
          )}
          
          <Button className="flex-1">
            Book Service Here
          </Button>
        </div>
      </div>
    </div>
  )
}
