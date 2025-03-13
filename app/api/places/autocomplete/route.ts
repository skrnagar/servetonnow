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
      
      // For external API errors, return a fallback response with popular Indian cities
      // This ensures users still get useful suggestions even if the API fails
      const popularCities = [
        { place_id: "indore-fallback", description: "Indore, Madhya Pradesh, India", structured_formatting: { main_text: "Indore", secondary_text: "Madhya Pradesh, India" } },
        { place_id: "mumbai-fallback", description: "Mumbai, Maharashtra, India", structured_formatting: { main_text: "Mumbai", secondary_text: "Maharashtra, India" } },
        { place_id: "delhi-fallback", description: "Delhi, India", structured_formatting: { main_text: "Delhi", secondary_text: "India" } },
        { place_id: "bangalore-fallback", description: "Bangalore, Karnataka, India", structured_formatting: { main_text: "Bangalore", secondary_text: "Karnataka, India" } },
        { place_id: "pune-fallback", description: "Pune, Maharashtra, India", structured_formatting: { main_text: "Pune", secondary_text: "Maharashtra, India" } }
      ];
      
      // Filter based on input if provided
      const filteredCities = input 
        ? popularCities.filter(city => 
            city.description.toLowerCase().includes(input.toLowerCase()) ||
            city.structured_formatting.main_text.toLowerCase().includes(input.toLowerCase())
          )
        : popularCities;
      
      return NextResponse.json({ 
        predictions: filteredCities,
        status: "FALLBACK_RESPONSE",
        error_details: `External API error: ${response.status} ${response.statusText}`
      });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Autocomplete API error:', error);

    // Return a graceful fallback response with popular Indian cities
    const popularCities = [
      { place_id: "indore-fallback", description: "Indore, Madhya Pradesh, India", structured_formatting: { main_text: "Indore", secondary_text: "Madhya Pradesh, India" } },
      { place_id: "mumbai-fallback", description: "Mumbai, Maharashtra, India", structured_formatting: { main_text: "Mumbai", secondary_text: "Maharashtra, India" } },
      { place_id: "delhi-fallback", description: "Delhi, India", structured_formatting: { main_text: "Delhi", secondary_text: "India" } },
      { place_id: "bangalore-fallback", description: "Bangalore, Karnataka, India", structured_formatting: { main_text: "Bangalore", secondary_text: "Karnataka, India" } },
      { place_id: "pune-fallback", description: "Pune, Maharashtra, India", structured_formatting: { main_text: "Pune", secondary_text: "Maharashtra, India" } }
    ];
    
    // Filter based on input if provided
    const filteredCities = input 
      ? popularCities.filter(city => 
          city.description.toLowerCase().includes(input.toLowerCase()) ||
          city.structured_formatting.main_text.toLowerCase().includes(input.toLowerCase())
        )
      : popularCities;
    
    return NextResponse.json({ 
      predictions: filteredCities, 
      status: "FALLBACK_RESPONSE", 
      error_details: error.message || "Unknown error occurred"
    });
  }
}