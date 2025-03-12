import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Server-side request to avoid CORS issues
    const response = await fetch('https://maps.olakrutrim.com/v1/api/places/geocode/ip', {
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    
    //Retain original fallback logic for robustness.
    let cityName = "Indore";
    let latitude = 22.7196;
    let longitude = 75.8577;
    let fallback = true;

    if(data.features && data.features.length > 0){
        const feature = data.features[0];
        const address = feature.properties?.formatted || "";
        const parts = address.split(',').map(part => part.trim());
        if (parts.length >= 1) {
          cityName = parts[0];
        }
        if (feature.geometry && feature.geometry.coordinates) {
          longitude = feature.geometry.coordinates[0];
          latitude = feature.geometry.coordinates[1];
          fallback = false;
        }
    }

    return NextResponse.json({city: cityName, latitude: latitude, longitude: longitude, fallback: fallback});
  } catch (error) {
    console.error('IP geolocation proxy error:', error);
    return NextResponse.json(
      { city: "Indore", latitude: 22.7196, longitude: 75.8577, fallback: true, error: 'Failed to fetch location data' },
      { status: 500 }
    );
  }
}