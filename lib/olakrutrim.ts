
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
    // Added timeout and retry mechanism
    const fetchWithTimeout = async (url: string, attempts: number = 3): Promise<Response> => {
      let lastError;
      for (let i = 0; i < attempts; i++) {
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 3000);
          const response = await fetch(url, { signal: controller.signal });
          clearTimeout(timeoutId);
          return response;
        } catch (error) {
          lastError = error;
          // Wait before retrying (exponential backoff)
          if (i < attempts - 1) await new Promise(r => setTimeout(r, 500 * Math.pow(2, i)));
        }
      }
      throw lastError;
    };

    const response = await fetchWithTimeout(
      `/api/geocode/search?query=${encodeURIComponent(query)}&limit=${limit}`
    );

    if (!response.ok) {
      throw new Error('Search failed');
    }

    const data = await response.json();
    
    if (data.features && data.features.length > 0) {
      return data.features.map((feature: any, index: number) => {
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
    // Return empty array instead of throwing
    return [];
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
 */
export async function getPlaceDetails(placeId: string): Promise<any> {
  try {
    const response = await fetch(`/api/places/details?place_id=${encodeURIComponent(placeId)}`, {
      signal: AbortSignal.timeout(3000)
    });
    
    if (!response.ok) {
      throw new Error('Failed to get place details');
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error getting place details:", error);
    return null;
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
