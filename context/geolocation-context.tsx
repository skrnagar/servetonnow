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
  const LOCATION_EXPIRY = 24 * 60 * 60 * 1000;
  // Cookie expires after 30 days
  const COOKIE_EXPIRY = 30;

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
          const position = await new Promise<GeolocationPosition>((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, {
              enableHighAccuracy: true,
              timeout: 3000, // Shorter timeout
              maximumAge: 0
            });
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
          console.error("Browser geolocation failed:", geoError);
          // Continue to fallback
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
      // First check for cookie (most recent city)
      const recentCity = Cookies.get(MOST_RECENT_CITY_COOKIE);
      
      if (recentCity) {
        // Use the most recent city from cookie
        setUserCity(recentCity);
        setIsInitialized(true);
        
        // Try to get corresponding location data from storage if available
        const storedLocation = getLocationFromStorage();
        if (storedLocation && storedLocation.city.toLowerCase() === recentCity.toLowerCase()) {
          setUserLocation(storedLocation.location);
        }
        
        return;
      }
      
      // Next try to get location from localStorage
      const storedLocation = getLocationFromStorage();
      
      if (storedLocation) {
        // Use stored location data
        setUserLocation(storedLocation.location);
        setCity(storedLocation.city);
        setIsInitialized(true);
        return;
      }
      
      // Set default fallback location initially
      const defaultLocation = { lat: 22.7196, lng: 75.8577 };
      const defaultCity = "Indore";
      
      setUserLocation(defaultLocation);
      setCity(defaultCity);
      
      // Only auto-detect location on home page
      const isHomePage = window.location.pathname === '/' || window.location.pathname === '';
      if (isHomePage) {
        // Detect location in the background for first-time users
        try {
          await detectLocation();
        } catch (error) {
          console.error("Auto location detection error:", error);
        }
      }
      
      setIsInitialized(true);
    };
    
    initializeLocation();
  }, []);

  // Effect to handle city changes and redirect for home page
  useEffect(() => {
    // Don't run on server side or if not initialized
    if (typeof window === 'undefined' || !isInitialized || !userCity) return;
    
    // Only redirect if we're on the home page
    const isHomePage = window.location.pathname === '/' || window.location.pathname === '';
    if (isHomePage && userCity && userCity.toLowerCase() !== 'indore') {
      // Use the router to navigate to the city page
      router.push(`/${userCity.toLowerCase()}`);
    }
  }, [userCity, isInitialized, router]);

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