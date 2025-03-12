import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("query")
  const limit = searchParams.get("limit") || "5"

  if (!query) {
    return NextResponse.json({ error: "Search query is required" }, { status: 400 })
  }

  try {
    // Use Olakrutrim API for search
    const response = await fetch(
      `https://maps.olakrutrim.com/v1/api/places/geocode/search?text=${encodeURIComponent(query)}&limit=${limit}`,
      {
        headers: {
          "x-api-key": process.env.OLAKRUTRIM_API_KEY || "jUC0eYOhzK5Bwg9DVjAZpc2sCUdb9JDLu9gj4hdz"
        }
      }
    )

    if (!response.ok) {
      throw new Error("Failed to search locations")
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Geocoding search error:", error)

    // Fallback to popular cities matching the query
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

    const query_lower = query.toLowerCase()
    const filteredCities = popularCities.filter(city => 
      city.name.toLowerCase().includes(query_lower)
    )

    const results = filteredCities.map(city => ({
      id: city.id,
      properties: {
        name: city.name,
        formatted: city.name + ", India"
      }
    }))

    return NextResponse.json({ 
      features: results.map(result => ({
        id: result.id,
        properties: result.properties
      }))
    })
  }
}