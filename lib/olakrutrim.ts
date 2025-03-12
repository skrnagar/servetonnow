
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
    const response = await fetch(
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
    
    return [];
  } catch (error) {
    console.error("Error searching places:", error);
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
    // Provide fallback values first
    const fallback = {
      location: { lat: 22.7196, lng: 75.8577 },
      city: "Indore",
      state: "Madhya Pradesh"
    };
    
    const response = await fetch("/api/geocode/ip", {
      signal: AbortSignal.timeout(3000) // Shorter timeout
    });
    
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
      
      return {
        location: {
          lat: result.geometry?.location?.lat || fallback.location.lat,
          lng: result.geometry?.location?.lng || fallback.location.lng
        },
        city: cityComponent?.long_name || fallback.city,
        state: stateComponent?.long_name || fallback.state
      };
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
      signal: AbortSignal.timeout(3000) // Shorter timeout
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
