
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Mock data as a fallback
    const fallbackData = {
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
            }
          ]
        }
      ]
    };

    try {
      // Server-side request to avoid CORS issues
      const response = await fetch('https://maps.olakrutrim.com/v1/api/places/geocode/ip', {
        headers: {
          'Accept': 'application/json',
        },
        // Set a timeout to prevent hanging requests
        signal: AbortSignal.timeout(5000)
      });

      if (!response.ok) {
        // If the external API fails, use fallback data
        return NextResponse.json(fallbackData);
      }

      const data = await response.json();
      
      // Convert the external API format to our expected format
      if (data.features && data.features.length > 0) {
        const feature = data.features[0];
        const address = feature.properties?.formatted || "";
        const parts = address.split(',').map(part => part.trim());
        const cityName = parts.length >= 1 ? parts[0] : "Indore";
        
        if (feature.geometry && feature.geometry.coordinates) {
          const longitude = feature.geometry.coordinates[0];
          const latitude = feature.geometry.coordinates[1];
          
          return NextResponse.json({
            results: [
              {
                geometry: {
                  location: {
                    lat: latitude,
                    lng: longitude
                  }
                },
                address_components: [
                  {
                    long_name: cityName,
                    types: ["locality"]
                  }
                ]
              }
            ]
          });
        }
      }
      
      // If we can't parse the data correctly, use fallback
      return NextResponse.json(fallbackData);
    } catch (error) {
      // Any error in the fetch or parsing, use fallback
      console.error('IP geolocation external API error:', error);
      return NextResponse.json(fallbackData);
    }
  } catch (error) {
    console.error('IP geolocation proxy error:', error);
    // Final fallback with minimal data
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
            }
          ]
        }
      ]
    });
  }
}
