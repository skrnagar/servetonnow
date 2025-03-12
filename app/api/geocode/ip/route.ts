import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Server-side request to OlaKrutrim IP geocoding API
    const response = await fetch('https://maps.olakrutrim.com/v1/api/places/geocode/ip', {
      headers: {
        'x-api-key': 'jUC0eYOhzK5Bwg9DVjAZpc2sCUdb9JDLu9gj4hdz',
        'Accept': 'application/json',
      },
      // Set a timeout to prevent hanging requests
      signal: AbortSignal.timeout(5000)
    });

    if (!response.ok) {
      throw new Error(`IP geolocation failed: ${response.status}`);
    }

    const data = await response.json();

    // Format the response to match the expected structure
    if (data.features && data.features.length > 0) {
      const feature = data.features[0];
      const coords = feature.geometry?.coordinates || [75.8577, 22.7196]; // [lng, lat]

      // Extract city and state from address components
      const addressComponents = feature.properties?.address_components || [];
      const cityComponent = {
        long_name: feature.properties?.city || "Indore",
        types: ["locality"]
      };

      const stateComponent = {
        long_name: feature.properties?.state || "Madhya Pradesh",
        types: ["administrative_area_level_1"]
      };

      return NextResponse.json({
        results: [
          {
            geometry: {
              location: {
                lat: coords[1], // lat is second in GeoJSON
                lng: coords[0]  // lng is first in GeoJSON
              }
            },
            address_components: [
              cityComponent,
              stateComponent
            ],
            formatted_address: feature.properties?.formatted || "Indore, Madhya Pradesh"
          }
        ]
      });
    }

    throw new Error("No location data found");
  } catch (error) {
    console.error("IP geolocation error:", error);

    // Fallback data for Indore
    return NextResponse.json({
      results: [
        {
          geometry: {
            location: {
              lat: 22.7196,
              lng: 75.8577
            }
          },
          address_components: [
            {
              long_name: "Indore",
              types: ["locality"]
            },
            {
              long_name: "Madhya Pradesh",
              types: ["administrative_area_level_1"]
            }
          ],
          formatted_address: "Indore, Madhya Pradesh"
        }
      ]
    });
  }
}