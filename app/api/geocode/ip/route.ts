
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
      const addressComponents = [];
      
      // Add city component
      addressComponents.push({
        long_name: feature.properties?.city || "Indore",
        types: ["locality"]
      });
      
      // Add state component
      addressComponents.push({
        long_name: feature.properties?.state || "Madhya Pradesh",
        types: ["administrative_area_level_1"]
      });

      return NextResponse.json({
        results: [{
          address_components: addressComponents,
          geometry: {
            location: {
              lat: coords[1],
              lng: coords[0]
            }
          }
        }]
      });
    } else {
      // Return default data if no results
      return NextResponse.json({
        results: [{
          address_components: [
            { long_name: 'Indore', types: ['locality'] },
            { long_name: 'Madhya Pradesh', types: ['administrative_area_level_1'] }
          ],
          geometry: {
            location: { lat: 22.7196, lng: 75.8577 }
          }
        }]
      });
    }
  } catch (error: any) {
    console.error('IP geolocation error:', error.message);
    
    // Return a fallback response with default data
    return NextResponse.json({
      results: [{
        address_components: [
          { long_name: 'Indore', types: ['locality'] },
          { long_name: 'Madhya Pradesh', types: ['administrative_area_level_1'] }
        ],
        geometry: {
          location: { lat: 22.7196, lng: 75.8577 }
        }
      }]
    }, { status: 200 });
  }
}
