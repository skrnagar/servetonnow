import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ChevronRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface CategoryPageProps {
  params: {
    city: string
    category: string
  }
}

// This would typically come from a database or API
const categoryData = {
  cleaning: {
    name: "Cleaning Services",
    description: "Professional cleaning services for your home and office",
    image: "/placeholder.svg?height=400&width=1200",
    subCategories: [
      {
        id: "home-cleaning",
        name: "Home Cleaning",
        description: "Complete home cleaning services",
        image: "/placeholder.svg?height=200&width=300",
        price: 499,
      },
      {
        id: "bathroom-cleaning",
        name: "Bathroom Cleaning",
        description: "Deep cleaning for bathrooms",
        image: "/placeholder.svg?height=200&width=300",
        price: 299,
      },
      {
        id: "kitchen-cleaning",
        name: "Kitchen Cleaning",
        description: "Thorough kitchen cleaning services",
        image: "/placeholder.svg?height=200&width=300",
        price: 399,
      },
      {
        id: "sofa-cleaning",
        name: "Sofa Cleaning",
        description: "Professional sofa and upholstery cleaning",
        image: "/placeholder.svg?height=200&width=300",
        price: 599,
      },
      {
        id: "carpet-cleaning",
        name: "Carpet Cleaning",
        description: "Deep carpet cleaning services",
        image: "/placeholder.svg?height=200&width=300",
        price: 699,
      },
      {
        id: "office-cleaning",
        name: "Office Cleaning",
        description: "Commercial cleaning for offices",
        image: "/placeholder.svg?height=200&width=300",
        price: 999,
      },
    ],
  },
  plumbing: {
    name: "Plumbing Services",
    description: "Professional plumbing services for your home",
    image: "/placeholder.svg?height=400&width=1200",
    subCategories: [
      {
        id: "pipe-leakage",
        name: "Pipe Leakage",
        description: "Fix leaking pipes and joints",
        image: "/placeholder.svg?height=200&width=300",
        price: 399,
      },
      {
        id: "tap-repair",
        name: "Tap Repair",
        description: "Repair or replace faulty taps",
        image: "/placeholder.svg?height=200&width=300",
        price: 299,
      },
      {
        id: "basin-sink",
        name: "Basin & Sink",
        description: "Installation and repair of basins and sinks",
        image: "/placeholder.svg?height=200&width=300",
        price: 499,
      },
      {
        id: "toilet",
        name: "Toilet",
        description: "Toilet installation and repair services",
        image: "/placeholder.svg?height=200&width=300",
        price: 599,
      },
      {
        id: "water-tank",
        name: "Water Tank",
        description: "Water tank cleaning and maintenance",
        image: "/placeholder.svg?height=200&width=300",
        price: 799,
      },
    ],
  },
  electrical: {
    name: "Electrical Services",
    description: "Professional electrical services for your home",
    image: "/placeholder.svg?height=400&width=1200",
    subCategories: [
      {
        id: "switch-socket",
        name: "Switch & Socket",
        description: "Installation and repair of switches and sockets",
        image: "/placeholder.svg?height=200&width=300",
        price: 299,
      },
      {
        id: "fan",
        name: "Fan",
        description: "Fan installation and repair services",
        image: "/placeholder.svg?height=200&width=300",
        price: 399,
      },
      {
        id: "light",
        name: "Light",
        description: "Light fixture installation and repair",
        image: "/placeholder.svg?height=200&width=300",
        price: 349,
      },
      {
        id: "mcb-fuse",
        name: "MCB & Fuse",
        description: "MCB and fuse replacement services",
        image: "/placeholder.svg?height=200&width=300",
        price: 499,
      },
      {
        id: "inverter-stabilizer",
        name: "Inverter & Stabilizer",
        description: "Inverter and stabilizer installation and repair",
        image: "/placeholder.svg?height=200&width=300",
        price: 699,
      },
    ],
  },
  "appliance-repair": {
    name: "Appliance Repair",
    description: "Professional repair services for home appliances",
    image: "/placeholder.svg?height=400&width=1200",
    subCategories: [
      {
        id: "ac",
        name: "AC",
        description: "AC service, repair, and installation",
        image: "/placeholder.svg?height=200&width=300",
        price: 699,
      },
      {
        id: "refrigerator",
        name: "Refrigerator",
        description: "Refrigerator repair and maintenance",
        image: "/placeholder.svg?height=200&width=300",
        price: 599,
      },
      {
        id: "washing-machine",
        name: "Washing Machine",
        description: "Washing machine repair and service",
        image: "/placeholder.svg?height=200&width=300",
        price: 649,
      },
      {
        id: "microwave",
        name: "Microwave",
        description: "Microwave repair services",
        image: "/placeholder.svg?height=200&width=300",
        price: 499,
      },
      {
        id: "tv",
        name: "TV",
        description: "TV repair and installation services",
        image: "/placeholder.svg?height=200&width=300",
        price: 599,
      },
    ],
  },
  // Add more categories as needed
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const citySlug = params.city.toLowerCase()
  const categorySlug = params.category.toLowerCase()

  // Format city name for display
  const cityName = citySlug.charAt(0).toUpperCase() + citySlug.slice(1)

  // Get category data or use fallback
  const category = categoryData[categorySlug as keyof typeof categoryData] || {
    name: categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1).replace(/-/g, " "),
    description: `Professional ${categorySlug.replace(/-/g, " ")} services in ${cityName}`,
    image: "/placeholder.svg?height=400&width=1200",
    subCategories: [],
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Category Hero Section */}
      <section className="relative">
        <div className="relative h-64 md:h-72 w-full">
          <Image
            src={category.image || "/placeholder.svg"}
            alt={category.name}
            fill
            className="object-cover brightness-75"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-2xl">
                <div className="flex items-center gap-2 text-white/80 text-sm mb-2">
                  <Link href={`/${citySlug}`} className="hover:text-white">
                    {cityName}
                  </Link>
                  <ChevronRight className="h-4 w-4" />
                  <span>{category.name}</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  {category.name} in {cityName}
                </h1>
                <p className="text-lg text-white/90 mb-6">{category.description}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sub-categories Section */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8">Services</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {category.subCategories.map((subCategory) => (
              <Link key={subCategory.id} href={`/${citySlug}/${categorySlug}/${subCategory.id}`} className="block">
                <Card className="h-full hover:shadow-md transition-shadow overflow-hidden">
                  <div className="relative h-40">
                    <Image
                      src={subCategory.image || "/placeholder.svg"}
                      alt={subCategory.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-2">{subCategory.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{subCategory.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-primary">₹{subCategory.price}</span>
                      <Button size="sm" className="flex items-center gap-1">
                        Book Now <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Models Section */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-6">Choose How to Book</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Direct Booking */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3">Direct Booking</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Book {category.name.toLowerCase()} at fixed prices with verified professionals.
                </p>
                <Link href={`/${citySlug}/${categorySlug}/book`}>
                  <Button className="w-full">Book Now</Button>
                </Link>
              </CardContent>
            </Card>

            {/* Vendor Comparison */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3">Compare Vendors</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Compare {category.name.toLowerCase()} professionals based on ratings and prices.
                </p>
                <Link href={`/${citySlug}/${categorySlug}/vendors`}>
                  <Button className="w-full">Compare Vendors</Button>
                </Link>
              </CardContent>
            </Card>

            {/* Task Bidding */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3">Post a Task</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Post your {category.name.toLowerCase()} requirements and receive competitive bids.
                </p>
                <Link href={`/${citySlug}/post-task?category=${categorySlug}`}>
                  <Button className="w-full">Post a Task</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Testimonial 1 */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  "The {category.name.toLowerCase()} service was excellent! The professional was punctual, skilled, and
                  completed the job efficiently. Highly recommended!"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="font-medium text-gray-700">RS</span>
                  </div>
                  <div>
                    <p className="font-medium">Rahul Sharma</p>
                    <p className="text-sm text-gray-500">{cityName}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Testimonial 2 */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  "I've used Serveto for {category.name.toLowerCase()} multiple times and have always been satisfied
                  with the quality of service. The booking process is simple and the professionals are reliable."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="font-medium text-gray-700">AP</span>
                  </div>
                  <div>
                    <p className="font-medium">Anjali Patel</p>
                    <p className="text-sm text-gray-500">{cityName}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              {[
                {
                  question: `What does the ${category.name.toLowerCase()} service include?`,
                  answer: `Our ${category.name.toLowerCase()} service includes professional assessment, quality workmanship, and all necessary tools and equipment. The specific inclusions vary by sub-service.`,
                },
                {
                  question: "How long does the service take?",
                  answer: `The duration of ${category.name.toLowerCase()} services varies depending on the complexity and scope of work. Simple tasks may take 1-2 hours, while more complex jobs may require multiple visits.`,
                },
                {
                  question: "Are the professionals verified?",
                  answer:
                    "Yes, all professionals on Serveto undergo a thorough verification process including identity verification, background checks, and skill assessment.",
                },
                {
                  question: "Do I need to provide any materials?",
                  answer:
                    "In most cases, our professionals bring all necessary tools and equipment. For specific materials or parts, this will be communicated during booking or assessment.",
                },
                {
                  question: "Is there a warranty on the service?",
                  answer: `Yes, we offer a service warranty on all ${category.name.toLowerCase()} work. The warranty period varies by service type and will be clearly communicated before booking.`,
                },
              ].map((faq, index) => (
                <div key={index} className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

