import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Use a free IP geolocation API
    const response = await fetch("https://ipapi.co/json/")

    if (!response.ok) {
      throw new Error("Failed to fetch IP geolocation data")
    }

    const data = await response.json()

    // Return the relevant location data
    return NextResponse.json({
      ip: data.ip,
      city: data.city,
      region: data.region,
      country: data.country_name,
      latitude: data.latitude,
      longitude: data.longitude,
      postal: data.postal,
      timezone: data.timezone,
    })
  } catch (error) {
    console.error("IP geolocation error:", error)
    return NextResponse.json({ error: "Failed to get location from IP" }, { status: 500 })
  }
}

