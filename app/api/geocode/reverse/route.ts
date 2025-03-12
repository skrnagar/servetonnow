
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');

  if (!lat || !lon) {
    return NextResponse.json(
      { error: 'Missing coordinates' },
      { status: 400 }
    );
  }

  try {
    // Mock data as a fallback
    const fallbackData = {
      results: [
        {
          geometry: {
            location: {
              lat: parseFloat(lat),
              lng: parseFloat(lon)
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
          ]
        }
      ]
    };

    try {
      // Server-side request to avoid CORS issues
      const response = await fetch(
        `https://maps.olakrutrim.com/v1/api/places/geocode/reverse?lat=${lat}&lon=${lon}`,
        {
          headers: {
            'Accept': 'application/json',
          },
          // Set a timeout to prevent hanging requests
          signal: AbortSignal.timeout(5000)
        }
      );

      if (!response.ok) {
        // If the external API fails, use fallback data
        return NextResponse.json(fallbackData);
      }

      const data = await response.json();
      
      // If the data has the expected format, return it
      if (data.results) {
        return NextResponse.json(data);
      }
      
      // Otherwise convert from potential GeoJSON format
      if (data.features && data.features.length > 0) {
        const feature = data.features[0];
        const properties = feature.properties || {};
        
        return NextResponse.json({
          results: [
            {
              geometry: {
                location: {
                  lat: parseFloat(lat),
                  lng: parseFloat(lon)
                }
              },
              address_components: [
                {
                  long_name: properties.city || properties.name || "Indore",
                  types: ["locality"]
                },
                {
                  long_name: properties.state || "Madhya Pradesh",
                  types: ["administrative_area_level_1"]
                }
              ]
            }
          ]
        });
      }
      
      // If we can't parse the data correctly, use fallback
      return NextResponse.json(fallbackData);
    } catch (error) {
      // Any error in the fetch or parsing, use fallback
      console.error('Reverse geocoding external API error:', error);
      return NextResponse.json(fallbackData);
    }
  } catch (error) {
    console.error('Reverse geocoding proxy error:', error);
    // Final fallback with minimal data using coordinates
    return NextResponse.json({
      results: [
        {
          geometry: {
            location: {
              lat: parseFloat(lat),
              lng: parseFloat(lon)
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
