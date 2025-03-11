
import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Default fallback city in case all geolocation services fail
    const fallbackCity = "Indore";
    
    // First try ipapi.co
    try {
      const response = await fetch("https://ipapi.co/json/", {
        headers: {
          "User-Agent": "Mozilla/5.0 (compatible; Replit/1.0)",
        },
        cache: "no-store",
      })

      if (response.ok) {
        const data = await response.json()
        
        if (data.city) {
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
        }
      }
    } catch (ipApiError) {
      console.error("ipapi.co error:", ipApiError)
    }

    // Fallback to ipinfo.io (free tier: 50,000 requests per month)
    try {
      const response = await fetch("https://ipinfo.io/json", {
        headers: {
          "User-Agent": "Mozilla/5.0 (compatible; Replit/1.0)",
        },
        cache: "no-store",
      })

      if (response.ok) {
        const data = await response.json()
        
        // Parse coordinates from the loc field (format: "latitude,longitude")
        let latitude = null
        let longitude = null
        
        if (data.loc) {
          const [lat, lng] = data.loc.split(",")
          latitude = parseFloat(lat)
          longitude = parseFloat(lng)
        }
        
        return NextResponse.json({
          ip: data.ip,
          city: data.city,
          region: data.region,
          country: data.country,
          latitude,
          longitude,
          postal: data.postal,
          timezone: data.timezone,
        })
      }
    } catch (ipInfoError) {
      console.error("ipinfo.io error:", ipInfoError)
    }

    // If all APIs fail, return a fallback city
    return NextResponse.json({
      city: fallbackCity,
      fallback: true,
      message: "Using fallback city due to inability to determine location from IP"
    })
  } catch (error) {
    console.error("IP geolocation error:", error)
    // Even on complete failure, return a fallback city instead of an error
    return NextResponse.json({
      city: "Indore",
      fallback: true,
      error: "Failed to get location from IP",
      message: "Using fallback city due to API failure"
    })
  }
}
