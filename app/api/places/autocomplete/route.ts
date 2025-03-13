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

    // Check if we have predictions in the response
    if (!data.predictions || !Array.isArray(data.predictions) || data.predictions.length === 0) {
      // Create fallback data with popular Indian cities
      const popularCities = [
        { id: "indore", name: "Indore" },
        { id: "mumbai", name: "Mumbai" },
        { id: "delhi", name: "Delhi" },
        { id: "bangalore", name: "Bangalore" },
        { id: "pune", name: "Pune" },
        { id: "jaipur", name: "Jaipur" },
        { id: "hyderabad", name: "Hyderabad" },
        { id: "chennai", name: "Chennai" },
        { id: "kolkata", name: "Kolkata" },
        { id: "ahmedabad", name: "Ahmedabad" },
      ];

      const filteredCities = popularCities
        .filter(city => city.name.toLowerCase().includes(input.toLowerCase()))
        .slice(0, parseInt(limit, 10));

      // Format as predictions for consistency
      const fallbackPredictions = filteredCities.map(city => ({
        place_id: city.id,
        description: `${city.name}, India`,
        structured_formatting: {
          main_text: city.name,
          secondary_text: "India"
        }
      }));

      return NextResponse.json({ predictions: fallbackPredictions });
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Autocomplete search error:', error);

    // Provide fallback data instead of an error
    const popularCities = [
      { id: "indore", name: "Indore" },
      { id: "mumbai", name: "Mumbai" },
      { id: "delhi", name: "Delhi" },
      { id: "bangalore", name: "Bangalore" },
      { id: "pune", name: "Pune" },
    ];

    const filteredCities = popularCities
      .filter(city => !input || city.name.toLowerCase().includes(input.toLowerCase()))
      .slice(0, parseInt(limit, 10));

    // Format as predictions for consistency
    const fallbackPredictions = filteredCities.map(city => ({
      place_id: city.id,
      description: `${city.name}, India`,
      structured_formatting: {
        main_text: city.name,
        secondary_text: "India"
      }
    }));

    return NextResponse.json({ predictions: fallbackPredictions });
  }
}