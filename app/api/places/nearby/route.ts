
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');
  const radius = searchParams.get('radius') || '1000';
  const type = searchParams.get('type');

  if (!lat || !lng) {
    return NextResponse.json(
      { error: 'Missing location parameters (lat, lng)' },
      { status: 400 }
    );
  }

  try {
    // Construct the URL based on parameters
    let url = `https://maps.olakrutrim.com/v1/api/places/nearbysearch?location=${lat},${lng}&radius=${radius}`;
    if (type) url += `&type=${encodeURIComponent(type)}`;

    // Call OlaKrutrim Nearby Search API
    const response = await fetch(url, {
      headers: {
        'x-api-key': 'jUC0eYOhzK5Bwg9DVjAZpc2sCUdb9JDLu9gj4hdz',
        'Accept': 'application/json',
      },
      signal: AbortSignal.timeout(5000)
    });

    if (!response.ok) {
      throw new Error(`OlaKrutrim API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Nearby search API error:', error.message);
    return NextResponse.json(
      { error: 'Failed to fetch nearby places', message: error.message },
      { status: 500 }
    );
  }
}
