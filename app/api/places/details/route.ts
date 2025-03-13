
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const placeId = searchParams.get('place_id');

  if (!placeId) {
    return NextResponse.json(
      { error: 'Missing place_id parameter' },
      { status: 400 }
    );
  }

  try {
    // Call OlaKrutrim Place Details API
    const response = await fetch(
      `https://maps.olakrutrim.com/v1/api/places/details?place_id=${encodeURIComponent(placeId)}`,
      {
        headers: {
          'x-api-key': 'jUC0eYOhzK5Bwg9DVjAZpc2sCUdb9JDLu9gj4hdz',
          'Accept': 'application/json',
        },
        signal: AbortSignal.timeout(5000)
      }
    );

    if (!response.ok) {
      throw new Error(`OlaKrutrim API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Place details API error:', error.message);
    return NextResponse.json(
      { error: 'Failed to fetch place details', message: error.message },
      { status: 500 }
    );
  }
}
