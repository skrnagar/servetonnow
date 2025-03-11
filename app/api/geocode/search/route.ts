
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("query")

  if (!query) {
    return NextResponse.json({ error: "Search query is required" }, { status: 400 })
  }

  try {
    // Use Olakrutrim API for geocoding search
    const response = await fetch(`https://maps.olakrutrim.com/v1/geocode/search?q=${encodeURIComponent(query)}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OLAKRUTRIM_API_KEY || "jUC0eYOhzK5Bwg9DVjAZpc2sCUdb9JDLu9gj4hdz"}`,
      },
    })

    if (!response.ok) {
      throw new Error("Failed to fetch geocoding data")
    }

    const data = await response.json()

    // Transform the response to a more usable format
    // Note: Adjust this based on the actual response structure from Olakrutrim
    const results =
      data.features?.map((feature: any) => {
        const properties = feature.properties
        return {
          id: feature.id || Math.random().toString(36).substring(2, 15),
          name: properties.name || properties.formatted,
          city: properties.city || properties.town || properties.village,
          state: properties.state,
          country: properties.country,
          coordinates: feature.geometry?.coordinates,
        }
      }) || []

    return NextResponse.json({ results })
  } catch (error) {
    console.error("Geocoding search error:", error)
    return NextResponse.json({ error: "Failed to search locations" }, { status: 500 })
  }
}
import { NextResponse } from "next/server"

// Popular Indian cities - used for fallback if the API fails
const popularIndianCities = [
  { id: "indore", name: "Indore", city: "Indore", state: "Madhya Pradesh", country: "India" },
  { id: "mumbai", name: "Mumbai", city: "Mumbai", state: "Maharashtra", country: "India" },
  { id: "delhi", name: "Delhi", city: "Delhi", state: "Delhi", country: "India" },
  { id: "bangalore", name: "Bangalore", city: "Bangalore", state: "Karnataka", country: "India" },
  { id: "pune", name: "Pune", city: "Pune", state: "Maharashtra", country: "India" },
  { id: "jaipur", name: "Jaipur", city: "Jaipur", state: "Rajasthan", country: "India" },
  { id: "hyderabad", name: "Hyderabad", city: "Hyderabad", state: "Telangana", country: "India" },
  { id: "chennai", name: "Chennai", city: "Chennai", state: "Tamil Nadu", country: "India" },
  { id: "kolkata", name: "Kolkata", city: "Kolkata", state: "West Bengal", country: "India" },
  { id: "ahmedabad", name: "Ahmedabad", city: "Ahmedabad", state: "Gujarat", country: "India" },
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("query")

  if (!query) {
    return NextResponse.json({ error: "Query parameter is required" }, { status: 400 })
  }

  try {
    // First try to search using the API
    try {
      // This would typically be a call to a geocoding API like Google Places, Here Maps, etc.
      // For this example, we'll simulate a search against our popularIndianCities array
      const lowerQuery = query.toLowerCase()
      
      const results = popularIndianCities.filter(city => 
        city.name.toLowerCase().includes(lowerQuery) || 
        city.state?.toLowerCase().includes(lowerQuery)
      )
      
      return NextResponse.json({
        results: results.map(city => ({
          id: city.id,
          name: city.name,
          city: city.city,
          state: city.state,
          country: city.country
        })),
      })
    } catch (error) {
      console.error("Geocoding search API error:", error)
      // Fall back to filtering the static list
    }

    // Fallback to static list if API fails
    const lowerQuery = query.toLowerCase()
    const results = popularIndianCities.filter(city => 
      city.name.toLowerCase().includes(lowerQuery) || 
      city.state?.toLowerCase().includes(lowerQuery)
    )
    
    return NextResponse.json({
      results: results.map(city => ({
        id: city.id,
        name: city.name,
        city: city.city,
        state: city.state,
        country: city.country
      })),
      fallback: true
    })
  } catch (error) {
    console.error("Geocoding search error:", error)
    return NextResponse.json({ 
      error: "Failed to search locations",
      results: popularIndianCities.slice(0, 5) // Return some results anyway
    }, { status: 200 })
  }
}
