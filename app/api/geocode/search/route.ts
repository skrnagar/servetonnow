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
        Authorization: `Bearer ${process.env.OLAKRUTRIM_API_KEY}`,
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

