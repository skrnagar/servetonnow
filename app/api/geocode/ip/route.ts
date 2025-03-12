
import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Get API key from environment variable or use the hardcoded one as fallback
    const apiKey = process.env.OLAKRUTRIM_API_KEY || "jUC0eYOhzK5Bwg9DVjAZpc2sCUdb9JDLu9gj4hdz"

    // Make API request to Olakrutrim
    const response = await fetch("https://maps.olakrutrim.com/v1/api/places/geocode/ip", {
      headers: {
        "x-api-key": apiKey
      },
      cache: 'no-store'
    })

    if (!response.ok) {
      throw new Error(`Olakrutrim API returned ${response.status}`)
    }

    const data = await response.json()
    
    // Extract city name from the response
    let cityName = null
    let latitude = null
    let longitude = null
    
    if (data.features && data.features.length > 0) {
      const feature = data.features[0]
      const address = feature.properties?.formatted || ""
      // Extract the first part of the address as city
      const parts = address.split(',').map(part => part.trim())
      if (parts.length >= 1) {
        cityName = parts[0]
      }
      
      if (feature.geometry && feature.geometry.coordinates) {
        // GeoJSON uses [longitude, latitude] order
        longitude = feature.geometry.coordinates[0]
        latitude = feature.geometry.coordinates[1]
      }
    }

    if (!cityName) {
      // Fallback to default city
      cityName = "Indore"
    }

    // Format the response with full address
    return NextResponse.json({
      city: cityName,
      latitude: latitude,
      longitude: longitude,
      fullAddress: data.features && data.features.length > 0 ? data.features[0].properties?.formatted : `${cityName}`
    })
  } catch (error) {
    console.error("IP geolocation error:", error)
    
    // Fallback to a default location
    return NextResponse.json(
      { city: "Indore", latitude: 22.7196, longitude: 75.8577, fallback: true },
      { status: 200 }
    )
  }
}
