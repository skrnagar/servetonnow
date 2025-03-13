
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
    // Call OlaKrutrim Advanced Place Details API
    const response = await fetch(
      `https://maps.olakrutrim.com/v1/api/places/details/advanced?place_id=${encodeURIComponent(placeId)}`,
      {
        headers: {
          'x-api-key': 'jUC0eYOhzK5Bwg9DVjAZpc2sCUdb9JDLu9gj4hdz',
          'Accept': 'application/json',
        },
        signal: AbortSignal.timeout(6000) // Longer timeout for advanced details
      }
    );

    if (!response.ok) {
      // Fall back to regular details API if advanced fails
      console.warn(`Advanced details API failed, falling back to standard API: ${response.status} ${response.statusText}`);
      return NextResponse.redirect(new URL(`/api/places/details?place_id=${encodeURIComponent(placeId)}`, request.url));
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Advanced place details API error:', error.message);
    return NextResponse.json(
      { error: 'Failed to fetch advanced place details', message: error.message },
      { status: 500 }
    );
  }
}
