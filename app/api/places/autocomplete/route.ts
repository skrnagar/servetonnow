
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
    
    // Popular neighborhoods and localities with their parent cities
    const popularLocalities = [
      { id: "vijay-nagar-indore", name: "Vijay Nagar", city: "Indore", state: "Madhya Pradesh", fullAddress: "Vijay Nagar, Indore, Madhya Pradesh, India" },
      { id: "vijay-nagar-scheme-54", name: "Vijay Nagar, Scheme No 54", city: "Indore", state: "Madhya Pradesh", fullAddress: "Vijay Nagar, Scheme No 54, Indore, Madhya Pradesh, India" },
      { id: "vijay-nagar-square", name: "Vijay Nagar Square", city: "Indore", state: "Madhya Pradesh", fullAddress: "Vijay Nagar, Bhagwashree Colony, Indore, Madhya Pradesh, India" },
      { id: "palasia", name: "Palasia", city: "Indore", state: "Madhya Pradesh", fullAddress: "Palasia, Indore, Madhya Pradesh, India" },
      { id: "andheri", name: "Andheri", city: "Mumbai", state: "Maharashtra", fullAddress: "Andheri, Mumbai, Maharashtra, India" },
      { id: "bandra", name: "Bandra", city: "Mumbai", state: "Maharashtra", fullAddress: "Bandra, Mumbai, Maharashtra, India" },
      { id: "hauz-khas", name: "Hauz Khas", city: "Delhi", state: "Delhi", fullAddress: "Hauz Khas, New Delhi, Delhi, India" },
      { id: "koramangala", name: "Koramangala", city: "Bangalore", state: "Karnataka", fullAddress: "Koramangala, Bengaluru, Karnataka, India" },
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
        'ahmedabad': ['ahmdabad', 'ahmadabad', 'ahemdabad'],
        'vijay nagar': ['vijaynagar', 'vijay', 'vijay colony', 'vn']
      };
      
      // Check localities first for exact matches
      const localityMatches = popularLocalities.filter(locality => 
        locality.name.toLowerCase().includes(normalizedInput) || 
        locality.fullAddress.toLowerCase().includes(normalizedInput)
      );
      
      if (localityMatches.length > 0) {
        // If we found locality matches, return those
        return localityMatches.map(locality => ({
          id: locality.id,
          name: locality.name,
          parentCity: locality.city
        }));
      }
      
      // Direct city matches
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
    
    // First check for localities that match
    const localityMatches = popularLocalities.filter(locality => 
      locality.name.toLowerCase().includes(input.toLowerCase()) ||
      locality.fullAddress.toLowerCase().includes(input.toLowerCase())
    );
    
    // If we have locality matches, prioritize them
    if (localityMatches.length > 0) {
      const predictions = localityMatches.slice(0, parseInt(limit)).map(locality => ({
        place_id: locality.id,
        description: locality.fullAddress,
        structured_formatting: {
          main_text: locality.name,
          secondary_text: `${locality.city}, ${locality.state}, India`,
          main_text_matched_substrings: []
        }
      }));
      
      return NextResponse.json({ predictions });
    }
    
    // Fallback to cities if no locality matches
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
