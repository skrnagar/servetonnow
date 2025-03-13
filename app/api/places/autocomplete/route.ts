
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const input = searchParams.get('input');
  const limit = searchParams.get('limit') || '5';

  if (!input) {
    return NextResponse.json(
      { error: 'Missing input parameter' },
      { status: 400 }
    );
  }

  try {
    // Call OlaKrutrim Place Autocomplete API
    const response = await fetch(
      `https://maps.olakrutrim.com/v1/api/places/autocomplete?input=${encodeURIComponent(input)}&limit=${limit}`,
      {
        headers: {
          'x-api-key': 'jUC0eYOhzK5Bwg9DVjAZpc2sCUdb9JDLu9gj4hdz',
          'Accept': 'application/json',
        },
        signal: AbortSignal.timeout(5000)
      }
    );

    if (!response.ok) {
      throw new Error(`Autocomplete API failed: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Autocomplete API error:', error.message);

    // Return empty results with a 200 status
    return NextResponse.json({
      predictions: []
    }, { status: 200 });
  }
}
