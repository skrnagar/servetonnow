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
  const IP_LOCATION_KEY = 'serveto_ip_location';
  const USER_CITY_COOKIE = 'user_city';
  // Location data expires after 24 hours (in milliseconds)
  const LOCATION_EXPIRY = 8 * 60 * 60 * 1000; // 8 hours - shorter expiry to refresh IP location more often
  // Cookie expires after 30 days
  const COOKIE_EXPIRY = 30;

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
  
  // Helper function to set city and store in cookie
  const setCity = (city: string) => {
    if (!city) return;
    setUserCity(city);
    
    // Store the city in a cookie so we can redirect to it on next visit
    Cookies.set(USER_CITY_COOKIE, city, { expires: COOKIE_EXPIRY });
  };

  // Helper function to save location data to localStorage
  const saveLocationToStorage = (city: string, location: { lat: number; lng: number }, isIpBased: boolean = false) => {
    if (typeof window !== 'undefined') {
      try {
        const locationData = {
          city,
          location,
          timestamp: Date.now(),
          isIpBased
        };
        localStorage.setItem(LOCATION_STORAGE_KEY, JSON.stringify(locationData));
        
        // If this is IP-based location, save it separately as well
        if (isIpBased) {
          localStorage.setItem(IP_LOCATION_KEY, JSON.stringify(locationData));
        }
        
        // Update the city state
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
      // ALWAYS try IP-based geolocation first
      try {
        const locationData = await getLocationFromIP();
        
        if (locationData) {
          const newLocation = {
            lat: locationData.location.lat,
            lng: locationData.location.lng
          };
          setUserLocation(newLocation);
          setCity(locationData.city);
          
          // Save to localStorage with IP-based flag
          saveLocationToStorage(locationData.city, newLocation, true);
          
          // Also set the cookie for future visits
          Cookies.set(USER_CITY_COOKIE, locationData.city, { expires: COOKIE_EXPIRY });
          
          success = true;
          return success;
        }
      } catch (ipError) {
        console.error("IP geolocation failed:", ipError);
        // Continue to browser geolocation as fallback
      }

      // Only if IP geolocation failed, try browser geolocation
      if (!success && typeof navigator !== 'undefined' && navigator.geolocation) {
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
            
            // Save to localStorage but NOT as IP-based
            saveLocationToStorage(locationData.city, newLocation, false);
            
            success = true;
          }
        } catch (geoError) {
          console.log("Browser geolocation unavailable");
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
        saveLocationToStorage(defaultCity, defaultLocation, false);
        
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

      // For home page visitors, always try to get IP-based location first
      
      // ALWAYS try to get a fresh IP-based location first, regardless of cookie
      try {
        const ipLocation = await getLocationFromIP();
        
        if (ipLocation && ipLocation.city) {
          const city = ipLocation.city;
          const location = ipLocation.location;
          
          setUserLocation(location);
          setCity(city); // This sets the cookie too
          
          // Save to storage with IP-based flag
          saveLocationToStorage(city, location, true);
          
          // Redirect to the IP-based city if it's available
          if (isCityAvailable(city)) {
            router.replace(`/${city.toLowerCase()}`);
          } else {
            router.replace(`/services-unavailable?city=${city.toLowerCase()}`);
          }
          
          setIsInitialized(true);
          return;
        }
      } catch (error) {
        console.error("Fresh IP geolocation error:", error);
        // Fall back to cookie approach only if IP detection fails
      }
      
      // Only if IP detection fails, check for cookie
      const userCityCookie = Cookies.get(USER_CITY_COOKIE);
      if (userCityCookie) {
        setUserCity(userCityCookie);
        
        // Redirect to city page if it's available
        if (isCityAvailable(userCityCookie)) {
          router.replace(`/${userCityCookie.toLowerCase()}`);
          setIsInitialized(true);
          return;
        }
      }
      
      // If no cookie or city not available, try to get a fresh IP-based location
      try {
        const ipLocation = await getLocationFromIP();
        
        if (ipLocation && ipLocation.city) {
          const city = ipLocation.city;
          const location = ipLocation.location;
          
          setUserLocation(location);
          setCity(city); // This now also sets the cookie
          
          // Save to storage with IP-based flag
          saveLocationToStorage(city, location, true);
          
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
        // Only if IP geolocation fails, try stored location
      }
      
      // Only if IP geolocation fails, try to get stored IP-based location
      try {
        const ipStoredLocation = localStorage.getItem(IP_LOCATION_KEY);
        if (ipStoredLocation) {
          const parsedData = JSON.parse(ipStoredLocation);
          
          // Only use if it's not too old (8 hours)
          if (Date.now() - parsedData.timestamp < LOCATION_EXPIRY) {
            setUserLocation(parsedData.location);
            setCity(parsedData.city);
            
            // Redirect to city page if it's available
            if (isCityAvailable(parsedData.city)) {
              router.replace(`/${parsedData.city.toLowerCase()}`);
            } else {
              router.replace(`/services-unavailable?city=${parsedData.city.toLowerCase()}`);
            }
            
            setIsInitialized(true);
            return;
          }
        }
      } catch (e) {
        console.error("Error reading stored IP location:", e);
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