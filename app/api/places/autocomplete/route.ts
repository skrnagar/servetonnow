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
    console.log(`Autocomplete API request for: "${input}"`);
    
    // Add signal with timeout to prevent hanging requests
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const apiUrl = `https://maps.olakrutrim.com/v1/api/places/autocomplete?input=${encodeURIComponent(input)}&limit=${limit}`;
    console.log(`Calling external API: ${apiUrl}`);
    
    const response = await fetch(apiUrl, {
      headers: {
        'x-api-key': 'jUC0eYOhzK5Bwg9DVjAZpc2sCUdb9JDLu9gj4hdz',
        'Accept': 'application/json',
      },
      signal: controller.signal,
      cache: 'no-store'
    });

    clearTimeout(timeoutId);

    console.log(`OlaKrutrim API response status: ${response.status}`);
    
    if (!response.ok) {
      // Log the full error response for debugging
      const errorText = await response.text();
      console.error(`OlaKrutrim API error response: ${errorText}`);
      
      // For external API errors, return a fallback response with empty predictions
      // This prevents the frontend from breaking on API failures
      return NextResponse.json({ 
        predictions: [],
        status: "FALLBACK_RESPONSE",
        error_details: `External API error: ${response.status} ${response.statusText}`
      });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Autocomplete API error:', error);

    // Return a graceful fallback response with empty results
    return NextResponse.json({ 
      predictions: [], 
      status: "FALLBACK_RESPONSE", 
      error_details: error.message || "Unknown error occurred"
    });
  }
}