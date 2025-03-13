
// Configuration for city-specific styling and content
export type CityConfig = {
  name: string;
  slug: string;
  primaryColor: string;
  secondaryColor: string;
  heroImage: string;
  tagline: string;
  description: string;
  popularServices: string[];
  testimonials?: {
    name: string;
    review: string;
    rating: number;
  }[];
};

// Default configuration used as fallback
export const defaultCityConfig: CityConfig = {
  name: "Default",
  slug: "default",
  primaryColor: "hsl(var(--primary))",
  secondaryColor: "hsl(var(--secondary))",
  heroImage: "/placeholder.svg",
  tagline: "Home Services, Simplified",
  description: "Book services directly, compare vendors, or post tasks for bidding. Serveto makes home services simple and efficient.",
  popularServices: ["Cleaning", "Plumbing", "Electrical", "Appliance Repair"],
};

// City-specific configurations
export const cityConfigs: Record<string, CityConfig> = {
  indore: {
    name: "Indore",
    slug: "indore",
    primaryColor: "#4f46e5", // Indigo
    secondaryColor: "#f59e0b", // Amber
    heroImage: "/cities/indore.jpg", // You'll need to add these images
    tagline: "Indore's Premier Home Services Platform",
    description: "Find reliable professionals for all your home service needs in Indore. From cleaning to repairs, we've got you covered.",
    popularServices: ["Cleaning", "Plumbing", "AC Repair", "Pest Control"],
    testimonials: [
      {
        name: "Rahul Sharma",
        review: "Used Serveto for home cleaning in Indore. Great service, punctual staff!",
        rating: 5
      },
      {
        name: "Priya Patel",
        review: "The plumbers were professional and solved our issue quickly.",
        rating: 4
      }
    ]
  },
  mumbai: {
    name: "Mumbai",
    slug: "mumbai",
    primaryColor: "#0891b2", // Cyan
    secondaryColor: "#c026d3", // Fuchsia
    heroImage: "/cities/mumbai.jpg",
    tagline: "Mumbai's 24/7 Home Services Solution",
    description: "In the city that never sleeps, our services are available round the clock. Find reliable professionals in Mumbai.",
    popularServices: ["Deep Cleaning", "Plumbing", "Electrical", "Home Moving"],
    testimonials: [
      {
        name: "Vikram Mehta",
        review: "Found reliable movers in Mumbai through Serveto. Moved across the city hassle-free!",
        rating: 5
      },
      {
        name: "Anita Desai",
        review: "Quick electrical repairs even during monsoon season.",
        rating: 5
      }
    ]
  },
  delhi: {
    name: "Delhi",
    slug: "delhi",
    primaryColor: "#7c3aed", // Violet
    secondaryColor: "#10b981", // Emerald
    heroImage: "/cities/delhi.jpg",
    tagline: "Delhi's Trusted Home Services Network",
    description: "Connect with verified professionals in Delhi for all your home service needs. Quality service guaranteed.",
    popularServices: ["AC Repair", "Home Cleaning", "Pest Control", "Painting"],
    testimonials: [
      {
        name: "Abhinav Khanna",
        review: "The AC repair service was exceptional, especially during Delhi summers!",
        rating: 5
      },
      {
        name: "Meera Gupta",
        review: "Professional painting crew transformed my apartment in Delhi.",
        rating: 4
      }
    ]
  },
  bangalore: {
    name: "Bangalore",
    slug: "bangalore",
    primaryColor: "#059669", // Emerald
    secondaryColor: "#8b5cf6", // Violet
    heroImage: "/cities/bangalore.jpg",
    tagline: "Tech-Enabled Home Services for Bangalore",
    description: "Bangalore's tech-savvy home service platform. Book professionals, track service in real-time.",
    popularServices: ["Cleaning", "Plumbing", "Electrical", "Gardening"],
    testimonials: [
      {
        name: "Kiran Reddy",
        review: "The real-time tracking feature for my gardening service in Bangalore was amazing!",
        rating: 5
      },
      {
        name: "Divya Nair",
        review: "Quick response for urgent plumbing needs.",
        rating: 4
      }
    ]
  }
};

// Helper function to get city configuration with fallback to default
export function getCityConfig(citySlug: string): CityConfig {
  const lowerCaseCity = citySlug.toLowerCase();
  return cityConfigs[lowerCaseCity] || { 
    ...defaultCityConfig,
    name: citySlug.charAt(0).toUpperCase() + citySlug.slice(1).toLowerCase(),
    slug: lowerCaseCity
  };
}
