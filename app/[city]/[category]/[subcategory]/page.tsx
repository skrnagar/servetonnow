import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Star, Check, Clock, Calendar, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface SubCategoryPageProps {
  params: {
    city: string
    category: string
    subcategory: string
  }
}

// This would typically come from a database or API
const getSubCategoryData = (category: string, subcategory: string) => {
  // Sample data structure - in a real app, this would come from a database
  const subCategoryData = {
    cleaning: {
      "home-cleaning": {
        name: "Home Cleaning",
        description: "Professional home cleaning services",
        image: "/placeholder.svg?height=400&width=1200",
        price: 499,
        duration: "3-4 hours",
        rating: 4.8,
        reviews: 1245,
        includes: [
          "Dusting of all accessible surfaces",
          "Sweeping and mopping of floors",
          "Cleaning of bathrooms and toilets",
          "Kitchen cleaning including countertops and sink",
          "Garbage removal",
          "Vacuum cleaning of carpets and rugs",
        ],
        excludes: [
          "Wall and ceiling cleaning",
          "Balcony and terrace cleaning",
          "Cleaning of electronic appliances",
          "Furniture polishing",
          "Window exterior cleaning",
        ],
        faqs: [
          {
            question: "What cleaning supplies are included?",
            answer:
              "Our professionals bring all necessary cleaning supplies and equipment. If you prefer specific products, you can provide them.",
          },
          {
            question: "How many cleaners will come?",
            answer: "For standard home cleaning, we typically send 1-2 cleaners depending on the size of your home.",
          },
          {
            question: "Do I need to be present during the cleaning?",
            answer: "It's recommended but not mandatory. You can provide access instructions if you can't be present.",
          },
          {
            question: "Can I book recurring cleaning services?",
            answer: "Yes, we offer weekly, bi-weekly, and monthly cleaning plans at discounted rates.",
          },
        ],
      },
      "bathroom-cleaning": {
        name: "Bathroom Cleaning",
        description: "Deep cleaning for bathrooms",
        image: "/placeholder.svg?height=400&width=1200",
        price: 299,
        duration: "1-2 hours",
        rating: 4.7,
        reviews: 856,
        includes: [
          "Cleaning and sanitizing of toilet, sink, and bathtub/shower",
          "Cleaning of mirrors and glass surfaces",
          "Tile cleaning and grout scrubbing",
          "Floor cleaning and disinfection",
          "Trash removal",
          "Restocking of toilet paper and toiletries (if provided)",
        ],
        excludes: [
          "Ceiling cleaning",
          "Window exterior cleaning",
          "Plumbing repairs",
          "Mold removal (severe cases)",
          "Drain unclogging",
        ],
        faqs: [
          {
            question: "Do you clean shower curtains?",
            answer:
              "Yes, we clean shower curtains as part of the service. For fabric curtains, we recommend removing them for machine washing.",
          },
          {
            question: "How do you handle mold and mildew?",
            answer:
              "We clean and treat mild to moderate mold and mildew. Severe cases may require specialized services.",
          },
          {
            question: "Do you clean inside cabinets?",
            answer: "We clean cabinet exteriors by default. Interior cleaning can be requested as an add-on service.",
          },
          {
            question: "What products do you use for disinfection?",
            answer:
              "We use hospital-grade disinfectants that are effective against bacteria and viruses while being safe for household use.",
          },
        ],
      },
    },
    plumbing: {
      "pipe-leakage": {
        name: "Pipe Leakage Repair",
        description: "Professional pipe leakage detection and repair",
        image: "/placeholder.svg?height=400&width=1200",
        price: 399,
        duration: "1-2 hours",
        rating: 4.6,
        reviews: 723,
        includes: [
          "Inspection and detection of leaks",
          "Repair of minor to moderate leaks",
          "Replacement of damaged pipe sections",
          "Sealing and waterproofing",
          "Basic testing after repair",
          "Cleanup of the work area",
        ],
        excludes: [
          "Major pipe replacements",
          "Wall or floor breaking and restoration",
          "Drain line repairs",
          "Sewer line repairs",
          "Water damage restoration",
        ],
        faqs: [
          {
            question: "How do you detect hidden leaks?",
            answer:
              "We use advanced leak detection equipment including acoustic sensors, moisture meters, and thermal imaging cameras.",
          },
          {
            question: "Will you need to break walls to fix the leak?",
            answer:
              "We try non-invasive methods first. If wall access is necessary, we'll discuss options with you before proceeding.",
          },
          {
            question: "How long does a typical pipe repair last?",
            answer:
              "Our repairs are designed to be permanent solutions. We use high-quality materials that typically last 10-15 years or more.",
          },
          {
            question: "Can you fix leaks in all types of pipes?",
            answer:
              "Yes, we can repair leaks in various pipe materials including PVC, CPVC, copper, galvanized steel, and PEX.",
          },
        ],
      },
    },
    // Add more categories and subcategories as needed
  }

  // Return the subcategory data if it exists, otherwise return a default object
  return (
    subCategoryData[category as keyof typeof subCategoryData]?.[
      subcategory as keyof (typeof subCategoryData)[keyof typeof subCategoryData]
    ] || {
      name: subcategory.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
      description: `Professional ${subcategory.replace(/-/g, " ")} services`,
      image: "/placeholder.svg?height=400&width=1200",
      price: 499,
      duration: "1-2 hours",
      rating: 4.5,
      reviews: 100,
      includes: ["Service includes professional work", "Quality materials", "Cleanup after service"],
      excludes: ["Additional services not specified", "Material upgrades"],
      faqs: [
        {
          question: "What does this service include?",
          answer: "This service includes professional assessment, quality workmanship, and standard materials.",
        },
        {
          question: "How long does the service take?",
          answer: "Service duration varies based on complexity, but typically takes 1-2 hours.",
        },
      ],
    }
  )
}

export default function SubCategoryPage({ params }: SubCategoryPageProps) {
  const citySlug = params.city.toLowerCase()
  const categorySlug = params.category.toLowerCase()
  const subcategorySlug = params.subcategory.toLowerCase()

  // Format names for display
  const cityName = citySlug.charAt(0).toUpperCase() + citySlug.slice(1)
  const categoryName = categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1).replace(/-/g, " ")

  // Get subcategory data
  const subcategory = getSubCategoryData(categorySlug, subcategorySlug)

  return (
    <div className="flex flex-col min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-gray-50 dark:bg-gray-800 py-4 border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm">
            <Link
              href={`/${citySlug}`}
              className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary"
            >
              {cityName}
            </Link>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <Link
              href={`/${citySlug}/${categorySlug}`}
              className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary"
            >
              {categoryName}
            </Link>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <span className="text-gray-900 dark:text-white font-medium">{subcategory.name}</span>
          </div>
        </div>
      </div>

      {/* Service Hero Section */}
      <section className="py-8 md:py-12 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                {subcategory.name} in {cityName}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">{subcategory.description}</p>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="ml-1 font-medium">{subcategory.rating}</span>
                  <span className="ml-1 text-gray-500">({subcategory.reviews})</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-gray-500" />
                  <span className="ml-1 text-gray-600 dark:text-gray-300">{subcategory.duration}</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Button size="lg" className="flex-1">
                  Book Now
                </Button>
                <Button size="lg" variant="outline" className="flex-1">
                  Compare Vendors
                </Button>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                <Calendar className="h-4 w-4 text-primary" />
                <span>Available today • Book for later</span>
              </div>
            </div>
            <div className="relative rounded-lg overflow-hidden">
              <Image
                src={subcategory.image || "/placeholder.svg"}
                alt={subcategory.name}
                width={600}
                height={400}
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Service Details Tabs */}
      <section className="py-8 md:py-12 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="details">Service Details</TabsTrigger>
              <TabsTrigger value="booking">Booking Options</TabsTrigger>
              <TabsTrigger value="faqs">FAQs</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-4">What's Included</h3>
                  <ul className="space-y-3">
                    {subcategory.includes.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4">What's Excluded</h3>
                  <ul className="space-y-3">
                    {subcategory.excludes.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-600 dark:text-gray-300">
                        <span className="text-red-500 font-medium">×</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="booking" className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Direct Booking */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-3">Direct Booking</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Book at a fixed price with verified professionals.
                    </p>
                    <div className="mb-4">
                      <div className="text-2xl font-bold text-primary">₹{subcategory.price}</div>
                      <div className="text-sm text-gray-500">Fixed price</div>
                    </div>
                    <Button className="w-full">Book Now</Button>
                  </CardContent>
                </Card>

                {/* Vendor Comparison */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-3">Compare Vendors</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Compare professionals based on ratings and prices.
                    </p>
                    <div className="mb-4">
                      <div className="text-2xl font-bold text-primary">
                        ₹{Math.floor(subcategory.price * 0.9)}-{Math.ceil(subcategory.price * 1.1)}
                      </div>
                      <div className="text-sm text-gray-500">Price range</div>
                    </div>
                    <Button className="w-full">Compare Vendors</Button>
                  </CardContent>
                </Card>

                {/* Task Bidding */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-3">Post a Task</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Post your requirements and receive competitive bids.
                    </p>
                    <div className="mb-4">
                      <div className="text-2xl font-bold text-primary">You Decide</div>
                      <div className="text-sm text-gray-500">Set your budget</div>
                    </div>
                    <Button className="w-full">Post a Task</Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="faqs" className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-6">Frequently Asked Questions</h3>
              <div className="space-y-4">
                {subcategory.faqs.map((faq, index) => (
                  <div key={index} className="border-b pb-4 last:border-0">
                    <h4 className="font-semibold text-lg mb-2">{faq.question}</h4>
                    <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-8 md:py-12 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-6">Related Services</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <Card key={item} className="h-full hover:shadow-md transition-shadow overflow-hidden">
                <div className="relative h-40">
                  <Image
                    src={`/placeholder.svg?height=200&width=300`}
                    alt="Related service"
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium mb-2">Related Service {item}</h3>
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">4.{7 - (item % 3)}</span>
                    <span className="text-sm text-gray-500">({100 + item * 50})</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-primary">₹{subcategory.price - item * 50}</span>
                    <Button size="sm">Book Now</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-8 md:py-12 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <Card key={item}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${star <= 5 - (item % 2) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    "The service was excellent! The professional was punctual, skilled, and completed the job
                    efficiently. Would definitely book again."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="font-medium text-gray-700">U{item}</span>
                    </div>
                    <div>
                      <p className="font-medium">User {item}</p>
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="h-3 w-3 mr-1" />
                        {cityName}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

