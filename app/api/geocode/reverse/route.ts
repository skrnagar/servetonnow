import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const lat = searchParams.get("lat")
  const lng = searchParams.get("lng")

  if (!lat || !lng) {
    return NextResponse.json({ error: "Latitude and longitude are required" }, { status: 400 })
  }

  try {
    // Use Olakrutrim API for reverse geocoding
    const response = await fetch(`https://maps.olakrutrim.com/v1/geocode/reverse?lat=${lat}&lng=${lng}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OLAKRUTRIM_API_KEY}`,
      },
    })

    if (!response.ok) {
      throw new Error("Failed to fetch reverse geocoding data")
    }

    const data = await response.json()

    // Extract city from the response
    // Note: Adjust this based on the actual response structure from Olakrutrim
    let city = null
    if (data.features && data.features.length > 0) {
      const properties = data.features[0].properties
      city = properties.city || properties.town || properties.village || properties.county
    }

    return NextResponse.json({
      city,
      address: data.features?.[0]?.properties?.formatted,
      raw: data,
    })
  } catch (error) {
    console.error("Reverse geocoding error:", error)
    return NextResponse.json({ error: "Failed to get location information" }, { status: 500 })
  }
}

