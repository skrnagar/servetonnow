
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
      console.error(`OlaKrutrim API error: ${response.status} ${response.statusText}`);
      // Return a fallback response with empty predictions
      return NextResponse.json({
        predictions: []
      }, { status: 200 });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Autocomplete API error:', error.message);

    // Define some popular cities as fallback
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
    
    // Filter by the input query
    // Enhanced matching function for better results
    const enhancedFilter = (input: string, cities: typeof popularCities) => {
      const normalizedInput = input.toLowerCase().trim();
      
      // Map of common variations/misspellings
      const cityVariations: Record<string, string[]> = {
        'bangalore': ['bangalor', 'bangalur', 'bengaluru', 'bengalore', 'bangali', 'bengali'],
        'mumbai': ['bombay', 'mumba', 'bombai'],
        'delhi': ['dehli', 'dilli', 'new delhi'],
        'kolkata': ['calcutta', 'kolkatta', 'kolkota', 'calcata'],
        'chennai': ['madras', 'chenai', 'chenna'],
        'hyderabad': ['hydrabad', 'hidarabad', 'hyderabad'],
        'ahmedabad': ['ahmdabad', 'ahmadabad', 'ahemdabad']
      };
      
      // Direct matches
      const directMatches = cities.filter(city => 
        city.name.toLowerCase().includes(normalizedInput)
      );
      
      if (directMatches.length > 0) return directMatches;
      
      // Check variations
      return cities.filter(city => {
        const variations = cityVariations[city.name.toLowerCase()];
        if (!variations) return false;
        
        return variations.some(variant => 
          variant.includes(normalizedInput) || normalizedInput.includes(variant)
        );
      });
    };
    
    const filteredCities = enhancedFilter(input, popularCities)
      .slice(0, parseInt(limit));

    // Return the filtered cities in a format matching expectations
    return NextResponse.json({
      predictions: filteredCities.map((city, index) => ({
        place_id: city.id,
        description: city.name + ", India",
        structured_formatting: {
          main_text: city.name,
          secondary_text: "India"
        }
      }))
    }, { status: 200 });
  }
}
