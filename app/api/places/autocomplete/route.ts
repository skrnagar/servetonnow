import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const input = url.searchParams.get('input');
  const limit = url.searchParams.get('limit') || '5';

  if (!input) {
    return NextResponse.json({ error: 'Input parameter is required' }, { status: 400 });
  }

  try {
    // Add signal with timeout to prevent hanging requests
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const response = await fetch(
      `https://maps.olakrutrim.com/v1/api/places/autocomplete?input=${encodeURIComponent(input)}&limit=${limit}`, 
      {
        headers: {
          'x-api-key': 'jUC0eYOhzK5Bwg9DVjAZpc2sCUdb9JDLu9gj4hdz',
          'Accept': 'application/json',
        },
        signal: controller.signal
      }
    );

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`OlaKrutrim API error: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Autocomplete API error:', error.message);

    // Return a meaningful error response
    return NextResponse.json(
      { error: 'Failed to fetch place suggestions', message: error.message },
      { status: 500 }
    );
  }
}