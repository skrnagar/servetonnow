
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
    const response = await fetch("/api/geocode/ip");
    
    if (!response.ok) {
      throw new Error("IP geolocation failed");
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
          lat: result.geometry?.location?.lat || 22.7196,
          lng: result.geometry?.location?.lng || 75.8577
        },
        city: cityComponent?.long_name || "Indore",
        state: stateComponent?.long_name
      };
    }
    
    return null;
  } catch (error) {
    console.error("Error getting location from IP:", error);
    return null;
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
    const response = await fetch(`/api/geocode/reverse?lat=${lat}&lon=${lng}`);
    
    if (!response.ok) {
      throw new Error("Reverse geocoding failed");
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
          lat: lat,
          lng: lng
        },
        city: cityComponent?.long_name || "Indore",
        state: stateComponent?.long_name
      };
    }
    
    return null;
  } catch (error) {
    console.error("Error reverse geocoding:", error);
    return null;
  }
}
