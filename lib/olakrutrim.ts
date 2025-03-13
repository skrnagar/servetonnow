
// Olakrutrim API utilities
const OLAKRUTRIM_API_KEY = "jUC0eYOhzK5Bwg9DVjAZpc2sCUdb9JDLu9gj4hdz";

export interface OlaLocation {
  lat: number;
  lng: number;
}

export interface PlaceSuggestion {
  id: string;
  name: string;
  city: string;
  state?: string;
  country?: string;
  fullAddress?: string;
  location?: OlaLocation;
}

/**
 * Search for places using OlaKrutrim text search API
 */
export async function searchPlaces(query: string, limit: number = 5): Promise<PlaceSuggestion[]> {
  try {
    console.log(`Searching for places with query: ${query}`);
    
    // Try autocomplete API first for better results
    const response = await fetch(
      `/api/places/autocomplete?input=${encodeURIComponent(query)}&limit=${limit}`,
      { 
        signal: AbortSignal.timeout(5000),
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache'
        }
      }
    );
    
    if (!response.ok) {
      console.warn(`Autocomplete API response not OK: ${response.status}`);
      throw new Error('Autocomplete API failed');
    }
    
    const data = await response.json();
    console.log('Autocomplete API response:', data);
    
    if (data.predictions && Array.isArray(data.predictions) && data.predictions.length > 0) {
      return data.predictions.map((prediction: any, index: number) => {
        const mainText = prediction.structured_formatting?.main_text || '';
        const secondaryText = prediction.structured_formatting?.secondary_text || '';
        const description = prediction.description || '';
        
        let cityName = '';
        if (secondaryText) {
          const parts = secondaryText.split(',');
          cityName = parts[0]?.trim() || '';
        }
        
        if (!cityName) {
          cityName = mainText;
        }
        
        return {
          id: prediction.place_id || `place-${index}`,
          name: mainText || description.split(',')[0],
          city: cityName || mainText,
          fullAddress: description,
          state: secondaryText ? secondaryText.split(',')[1]?.trim() : undefined,
          country: secondaryText ? secondaryText.split(',').slice(-1)[0]?.trim() : undefined
        };
      });
    }
    
    // Fallback to geocode search if autocomplete fails or returns empty
    const geocodeResponse = await fetch(
      `/api/geocode/search?query=${encodeURIComponent(query)}&limit=${limit}`,
      { signal: AbortSignal.timeout(3000) }
    );
    
    if (!geocodeResponse.ok) {
      throw new Error('Geocode search failed');
    }
    
    const geocodeData = await geocodeResponse.json();
    
    if (geocodeData.features && geocodeData.features.length > 0) {
      return geocodeData.features.map((feature: any, index: number) => {
        const properties = feature.properties || {};
        const geometry = feature.geometry || {};
        const address = properties.formatted || properties.name || "";
        const cityMatch = address.match(/([^,]+)(?:,|$)/);
        const city = cityMatch ? cityMatch[1].trim() : "Unknown";
        
        // Extract state and country
        const addressParts = address.split(',').map((part: string) => part.trim());
        const state = addressParts.length > 1 ? addressParts[1] : undefined;
        const country = addressParts.length > 2 ? addressParts[addressParts.length - 1] : undefined;
        
        // Get coordinates if available
        const location = geometry.type === 'Point' && geometry.coordinates ? 
          { lat: geometry.coordinates[1], lng: geometry.coordinates[0] } : 
          undefined;
        
        return {
          id: `place-${index}-${feature.id || Date.now()}`,
          name: properties.name || address,
          city: city,
          state: state,
          country: country,
          fullAddress: address,
          location: location
        };
      });
    }
    
    // Fallback to a client-side filtering of popular Indian cities
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
      .filter(city => city.name.toLowerCase().includes(query.toLowerCase()))
      .map(city => ({
        id: city.id,
        name: city.name,
        city: city.name,
        fullAddress: `${city.name}, India`,
        country: "India"
      }));
    
    return filteredCities;
  } catch (error) {
    console.error("Error searching places:", error);
    
    // Return fallback cities filtered by query
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
    
    return popularCities
      .filter(city => !query || city.name.toLowerCase().includes(query.toLowerCase()))
      .slice(0, limit)
      .map(city => ({
        id: city.id,
        name: city.name,
        city: city.name,
        fullAddress: `${city.name}, India`,
        country: "India"
      }));
  }
}

/**
 * Get location from IP address
 */
export async function getLocationFromIP(): Promise<{
  location: OlaLocation;
  city: string;
  state?: string;
} | null> {
  try {
    // Check for cached IP data to avoid unnecessary API calls
    if (typeof window !== 'undefined') {
      const cachedData = sessionStorage.getItem('ip_location_data');
      if (cachedData) {
        const parsedData = JSON.parse(cachedData);
        // Check if cache is less than 1 hour old
        if (parsedData.timestamp && (Date.now() - parsedData.timestamp < 60 * 60 * 1000)) {
          return parsedData.data;
        }
      }
    }
    
    // Provide fallback values
    const fallback = {
      location: { lat: 22.7196, lng: 75.8577 },
      city: "Indore",
      state: "Madhya Pradesh"
    };
    
    // Use AbortController to set timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    
    const response = await fetch("/api/geocode/ip", {
      signal: controller.signal,
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      }
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      console.warn("IP geolocation response not OK, using fallback");
      return fallback;
    }
    
    const data = await response.json();
    
    if (data?.results?.[0]) {
      const result = data.results[0];
      const cityComponent = result.address_components?.find((c: any) => 
        c.types?.includes('locality')
      );
      
      const stateComponent = result.address_components?.find((c: any) => 
        c.types?.includes('administrative_area_level_1')
      );
      
      const locationData = {
        location: {
          lat: result.geometry?.location?.lat || fallback.location.lat,
          lng: result.geometry?.location?.lng || fallback.location.lng
        },
        city: cityComponent?.long_name || fallback.city,
        state: stateComponent?.long_name || fallback.state
      };
      
      // Cache the data in sessionStorage
      if (typeof window !== 'undefined') {
        try {
          sessionStorage.setItem('ip_location_data', JSON.stringify({
            data: locationData,
            timestamp: Date.now()
          }));
        } catch (e) {
          console.warn('Failed to cache IP location data');
        }
      }
      
      return locationData;
    }
    
    return fallback;
  } catch (error) {
    console.error("Error getting location from IP:", error);
    // Return fallback instead of null
    return {
      location: { lat: 22.7196, lng: 75.8577 },
      city: "Indore",
      state: "Madhya Pradesh"
    };
  }
}

/**
 * Get location details from coordinates
 */
export async function reverseGeocode(lat: number, lng: number): Promise<{
  location: OlaLocation;
  city: string;
  state?: string;
} | null> {
  try {
    // Provide fallback values first
    const fallback = {
      location: { lat, lng },
      city: "Indore",
      state: "Madhya Pradesh"
    };
    
    const response = await fetch(`/api/geocode/reverse?lat=${lat}&lon=${lng}`, {
      signal: AbortSignal.timeout(3000), // Shorter timeout
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      }
    });
    
    if (!response.ok) {
      console.warn("Reverse geocoding response not OK, using fallback");
      return fallback;
    }
    
    const data = await response.json();
    
    if (data?.results?.[0]) {
      const result = data.results[0];
      const cityComponent = result.address_components?.find((c: any) => 
        c.types?.includes('locality')
      );
      
      const stateComponent = result.address_components?.find((c: any) => 
        c.types?.includes('administrative_area_level_1')
      );
      
      return {
        location: { lat, lng },
        city: cityComponent?.long_name || fallback.city,
        state: stateComponent?.long_name || fallback.state
      };
    }
    
    return fallback;
  } catch (error) {
    console.error("Error reverse geocoding:", error);
    // Return fallback instead of null
    return {
      location: { lat, lng },
      city: "Indore",
      state: "Madhya Pradesh"
    };
  }
}

/**
 * Get place details using OlaKrutrim API
 * @param placeId The place ID to fetch details for
 * @param advanced Whether to use the advanced details API
 */
export async function getPlaceDetails(placeId: string, advanced: boolean = false): Promise<any> {
  try {
    // Use cache to avoid repeated API calls for the same place
    if (typeof window !== 'undefined') {
      const cacheKey = `place_details_${advanced ? 'advanced_' : ''}${placeId}`;
      const cachedData = sessionStorage.getItem(cacheKey);
      if (cachedData) {
        try {
          const data = JSON.parse(cachedData);
          // Check if cache is less than 15 minutes old
          if (data.timestamp && (Date.now() - data.timestamp < 15 * 60 * 1000)) {
            return data.details;
          }
        } catch (e) {
          console.warn('Failed to parse cached place details');
        }
      }
    }
    
    // Determine which endpoint to use
    const endpoint = advanced ? 'details/advanced' : 'details';
    const response = await fetch(`/api/places/${endpoint}?place_id=${encodeURIComponent(placeId)}`, {
      signal: AbortSignal.timeout(5000) // Increased timeout for details which can be larger
    });
    
    if (!response.ok) {
      throw new Error('Failed to get place details');
    }
    
    const details = await response.json();
    
    // Cache the results
    if (typeof window !== 'undefined' && details) {
      try {
        const cacheKey = `place_details_${advanced ? 'advanced_' : ''}${placeId}`;
        sessionStorage.setItem(cacheKey, JSON.stringify({
          details,
          timestamp: Date.now()
        }));
      } catch (e) {
        console.warn('Failed to cache place details');
      }
    }
    
    return details;
  } catch (error) {
    console.error("Error getting place details:", error);
    throw error; // Rethrow to allow proper error handling by caller
  }
}

/**
 * Search for nearby places of interest
 */
export async function searchNearbyPlaces(
  latitude: number,
  longitude: number,
  radius: number = 1000,
  type?: string
): Promise<any[]> {
  try {
    let url = `/api/places/nearby?lat=${latitude}&lng=${longitude}&radius=${radius}`;
    if (type) url += `&type=${encodeURIComponent(type)}`;
    
    const response = await fetch(url, {
      signal: AbortSignal.timeout(5000)
    });
    
    if (!response.ok) {
      throw new Error('Failed to search nearby places');
    }
    
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error("Error searching nearby places:", error);
    return [];
  }
}
