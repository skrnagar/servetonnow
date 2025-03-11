import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Get client IP
    // In production, you'd typically get this from request headers
    // For testing, we'll use a fallback approach
    let ip = '106.219.84.80' // Default for testing

    // Get API key from environment variables
    const apiKey = process.env.IP2LOCATION_API_KEY

    if (!apiKey) {
      console.error("IP2LOCATION_API_KEY is not set")
      return NextResponse.json(
        { city: "Indore", fallback: true, message: "Using fallback location because API key is missing" },
        { status: 200 }
      )
    }

    // Make API request to IP2Location
    const url = `https://api.ip2location.io/?key=${apiKey}&ip=${ip}`
    console.log("Fetching IP location from:", url)

    const response = await fetch(url, { 
      headers: { 'Accept': 'application/json' },
      cache: 'no-store'
    })

    if (!response.ok) {
      throw new Error(`IP2Location API returned ${response.status}`)
    }

    const data = await response.json()
    console.log("IP2Location API response:", data)

    // Format the response
    return NextResponse.json({
      city: data.city_name,
      region: data.region_name,
      country: data.country_name,
      latitude: parseFloat(data.latitude),
      longitude: parseFloat(data.longitude),
      ip: data.ip
    })

  } catch (error) {
    console.error("IP geolocation error:", error)

    // Fallback to a default location
    return NextResponse.json(
      { city: "Indore", fallback: true, message: "Using fallback location due to API error" },
      { status: 200 }
    )
  }
}