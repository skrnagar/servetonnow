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
    // Server-side request to OlaKrutrim reverse geocoding API
    const response = await fetch(
      `https://maps.olakrutrim.com/v1/api/places/geocode/reverse?lat=${lat}&lon=${lon}`,
      {
        headers: {
          'x-api-key': 'jUC0eYOhzK5Bwg9DVjAZpc2sCUdb9JDLu9gj4hdz',
          'Accept': 'application/json',
        },
        // Set a timeout to prevent hanging requests
        signal: AbortSignal.timeout(5000)
      }
    );

    if (!response.ok) {
      throw new Error(`Reverse geocoding failed: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Reverse geocoding error:', error.message);

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