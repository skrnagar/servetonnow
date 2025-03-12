"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import Cookies from 'js-cookie'

type GeolocationContextType = {
  userCity: string | null
  userLocation: { lat: number; lng: number } | null
  isLoading: boolean
  error: string | null
  detectLocation: () => Promise<boolean>
  setCity: (city: string) => void
}

const GeolocationContext = createContext<GeolocationContextType | undefined>(undefined)

import { getLocationFromIP, reverseGeocode } from "@/lib/olakrutrim";

export function GeolocationProvider({ children }: { children: React.ReactNode }) {
  const [userCity, setUserCity] = useState<string | null>(null)
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const LOCATION_STORAGE_KEY = 'serveto_user_location';
  const LOCATION_TIMESTAMP_KEY = 'serveto_location_timestamp';
  const MOST_RECENT_CITY_COOKIE = 'most_recent_city';
  // Location data expires after 24 hours (in milliseconds)
  const LOCATION_EXPIRY = 72 * 60 * 60 * 1000; // 72 hours
  // Cookie expires after 7 days (shorter to prioritize IP detection)
  const COOKIE_EXPIRY = 7;

  // List of available cities
  const AVAILABLE_CITIES = [
    "indore", "mumbai", "delhi", "bangalore", "pune", 
    "jaipur", "hyderabad", "chennai", "kolkata", "ahmedabad"
  ];
  
  // Helper function to check if city is available
  const isCityAvailable = (city: string): boolean => {
    if (!city) return false;
    return AVAILABLE_CITIES.includes(city.toLowerCase());
  };
  
  // Helper function to set city and update cookie
  const setCity = (city: string) => {
    if (!city) return;
    
    setUserCity(city);
    
    // Update cookie
    Cookies.set(MOST_RECENT_CITY_COOKIE, city.toLowerCase(), { 
      expires: COOKIE_EXPIRY,
      path: '/'
    });
  };

  // Helper function to save location data to localStorage
  const saveLocationToStorage = (city: string, location: { lat: number; lng: number }) => {
    if (typeof window !== 'undefined') {
      try {
        const locationData = {
          city,
          location,
          timestamp: Date.now()
        };
        localStorage.setItem(LOCATION_STORAGE_KEY, JSON.stringify(locationData));
        
        // Also update the cookie for most recent city
        setCity(city);
      } catch (error) {
        console.error("Error saving location to localStorage:", error);
      }
    }
  };

  // Helper function to get location data from localStorage
  const getLocationFromStorage = () => {
    if (typeof window !== 'undefined') {
      try {
        const locationData = localStorage.getItem(LOCATION_STORAGE_KEY);
        if (locationData) {
          const parsedData = JSON.parse(locationData);
          const timestamp = parsedData.timestamp || 0;
          
          // Check if the data is still valid (less than 24 hours old)
          if (Date.now() - timestamp < LOCATION_EXPIRY) {
            return parsedData;
          }
        }
      } catch (error) {
        console.error("Error reading location from localStorage:", error);
      }
    }
    return null;
  };

  // Helper function to extract location data
  const extractLocationData = (data: any): { city: string; state: string } | null => {
    try {
      // Check if we have address_components
      if (data.address_components && Array.isArray(data.address_components)) {
        const cityComponent = data.address_components.find((c: any) => 
          c.types && Array.isArray(c.types) && c.types.includes('locality')
        );
        
        const stateComponent = data.address_components.find((c: any) => 
          c.types && Array.isArray(c.types) && c.types.includes('administrative_area_level_1')
        );
        
        return { 
          city: cityComponent?.long_name || "Indore", 
          state: stateComponent?.long_name || "MP" 
        };
      }
      
      // Fallback
      return { city: "Indore", state: "MP" };
    } catch (error) {
      console.error("Error extracting location data:", error);
      return { city: "Indore", state: "MP" };
    }
  }

  const detectLocation = async (): Promise<boolean> => {
    setIsLoading(true);
    setError("");
    
    // Set default values immediately so UI is responsive
    const defaultLocation = { lat: 22.7196, lng: 75.8577 };
    const defaultCity = "Indore";
    
    let success = false;

    try {
      // First try browser geolocation if available
      if (typeof navigator !== 'undefined' && navigator.geolocation) {
        try {
          // Set a timeout for the geolocation request
          const timeoutId = setTimeout(() => {
            throw new Error("Geolocation request timed out");
          }, 5000);
          
          const position = await new Promise<GeolocationPosition>((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
              (pos) => {
                clearTimeout(timeoutId);
                resolve(pos);
              },
              (err) => {
                clearTimeout(timeoutId);
                reject(err);
              },
              {
                enableHighAccuracy: false, // Set to false for faster response
                timeout: 3000,
                maximumAge: 60000 // Allow slightly older cached positions
              }
            );
          });

          const { latitude, longitude } = position.coords;

          // Use our utility for reverse geocoding
          const locationData = await reverseGeocode(latitude, longitude);
          
          if (locationData) {
            const newLocation = {
              lat: latitude,
              lng: longitude
            };
            setUserLocation(newLocation);
            setCity(locationData.city);
            
            // Save to localStorage
            saveLocationToStorage(locationData.city, newLocation);
            
            success = true;
          }
        } catch (geoError) {
          console.log("Browser geolocation unavailable, using fallback methods");
          // Silently continue to fallback - don't show errors to users
          // as geolocation errors are common and expected
        }
      }

      // If browser geolocation failed, try IP-based geolocation
      if (!success) {
        try {
          const locationData = await getLocationFromIP();
          
          if (locationData) {
            const newLocation = {
              lat: locationData.location.lat,
              lng: locationData.location.lng
            };
            setUserLocation(newLocation);
            setCity(locationData.city);
            
            // Save to localStorage
            saveLocationToStorage(locationData.city, newLocation);
            
            success = true;
          }
        } catch (ipError) {
          console.error("IP geolocation failed:", ipError);
          // Continue to fallback
        }
      }
    } catch (error) {
      console.error("Location detection error:", error);
    } finally {
      // If all detection methods failed, use default values
      if (!success) {
        setUserLocation(defaultLocation);
        setCity(defaultCity);
        
        // Save default location to localStorage to prevent repeated API calls
        saveLocationToStorage(defaultCity, defaultLocation);
        
        setError("Could not detect your location automatically. Using default location.");
      }
      
      setIsLoading(false);
    }
    
    return success;
  }

  // Initialize geolocation data
  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof window === 'undefined') return;
    
    // Don't re-initialize
    if (isInitialized) return;
    
    const initializeLocation = async () => {
      // Check if we're on the home page
      const isHomePage = window.location.pathname === '/' || window.location.pathname === '';
      
      // If not on home page, just set initialized and exit
      if (!isHomePage) {
        setIsInitialized(true);
        return;
      }

      // For home page visitors, immediately try to get location
      
      // Step 1: Try to get location data from storage first
      const storedLocation = getLocationFromStorage();
      
      if (storedLocation) {
        // We have stored location data that's still valid
        setUserLocation(storedLocation.location);
        setCity(storedLocation.city);
        
        // Redirect to city page if it's available
        if (isCityAvailable(storedLocation.city)) {
          router.replace(`/${storedLocation.city.toLowerCase()}`);
        } else {
          // If city is not available, show service not available page
          router.replace(`/services-unavailable?city=${storedLocation.city.toLowerCase()}`);
        }
        
        setIsInitialized(true);
        return;
      }
      
      // Step 2: Always try IP-based location first for new users
      try {
        const ipLocation = await getLocationFromIP();
        
        if (ipLocation && ipLocation.city) {
          const city = ipLocation.city;
          const location = ipLocation.location;
          
          setUserLocation(location);
          setCity(city);
          
          // Save to storage with longer expiry time (72 hours)
          saveLocationToStorage(city, location);
          
          // Always redirect to the detected city if it's available
          if (isCityAvailable(city)) {
            router.replace(`/${city.toLowerCase()}`);
          } else {
            // If city is not available, show service not available page
            router.replace(`/services-unavailable?city=${city.toLowerCase()}`);
          }
          
          setIsInitialized(true);
          return;
        }
      } catch (error) {
        console.error("IP geolocation error:", error);
        // Continue to fallback if IP geolocation fails
      }
      
      // Step 3: If all above fails, use default (Indore)
      const defaultLocation = { lat: 22.7196, lng: 75.8577 };
      const defaultCity = "Indore";
      
      setUserLocation(defaultLocation);
      setCity(defaultCity);
      
      setIsInitialized(true);
    };
    
    initializeLocation();
  }, [router]);

  return (
    <GeolocationContext.Provider
      value={{
        userCity,
        userLocation,
        isLoading,
        error,
        detectLocation,
        setCity
      }}
    >
      {children}
    </GeolocationContext.Provider>
  )
}

export const useGeolocation = () => {
  const context = useContext(GeolocationContext)
  if (context === undefined) {
    throw new Error("useGeolocation must be used within a GeolocationProvider")
  }
  return context
}