import Link from "next/link"
import Image from "next/image"
import { ArrowRight, MapPin, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface CityPageProps {
  params: {
    city: string
  }
}

// This would typically come from a database or API
const cityData = {
  indore: {
    name: "Indore",
    description: "Find the best home services in Indore",
    heroImage: "/placeholder.svg?height=600&width=1200",
  },
  mumbai: {
    name: "Mumbai",
    description: "Find the best home services in Mumbai",
    heroImage: "/placeholder.svg?height=600&width=1200",
  },
  delhi: {
    name: "Delhi",
    description: "Find the best home services in Delhi",
    heroImage: "/placeholder.svg?height=600&width=1200",
  },
  bangalore: {
    name: "Bangalore",
    description: "Find the best home services in Bangalore",
    heroImage: "/placeholder.svg?height=600&width=1200",
  },
  pune: {
    name: "Pune",
    description: "Find the best home services in Pune",
    heroImage: "/placeholder.svg?height=600&width=1200",
  },
  // Add more cities as needed
}

// Sample service categories
const serviceCategories = [
  {
    id: "cleaning",
    name: "Cleaning",
    icon: "/placeholder.svg?height=80&width=80",
    subCategories: ["Home Cleaning", "Bathroom Cleaning", "Kitchen Cleaning", "Sofa Cleaning", "Carpet Cleaning"],
  },
  {
    id: "plumbing",
    name: "Plumbing",
    icon: "/placeholder.svg?height=80&width=80",
    subCategories: ["Pipe Leakage", "Tap Repair", "Basin & Sink", "Toilet", "Water Tank"],
  },
  {
    id: "electrical",
    name: "Electrical",
    icon: "/placeholder.svg?height=80&width=80",
    subCategories: ["Switch & Socket", "Fan", "Light", "MCB & Fuse", "Inverter & Stabilizer"],
  },
  {
    id: "appliance-repair",
    name: "Appliance Repair",
    icon: "/placeholder.svg?height=80&width=80",
    subCategories: ["AC", "Refrigerator", "Washing Machine", "Microwave", "TV"],
  },
  {
    id: "pest-control",
    name: "Pest Control",
    icon: "/placeholder.svg?height=80&width=80",
    subCategories: ["Cockroach", "Mosquito", "Bed Bugs", "Termite", "Rodent"],
  },
  {
    id: "painting",
    name: "Painting",
    icon: "/placeholder.svg?height=80&width=80",
    subCategories: ["Interior Painting", "Exterior Painting", "Wall Texture", "Waterproofing", "Wood Polishing"],
  },
]

// Sample trending services
const trendingServices = [
  {
    id: "ac-service",
    name: "AC Service",
    image: "/placeholder.svg?height=200&width=300",
    price: 499,
    rating: 4.8,
    reviews: 1245,
  },
  {
    id: "deep-cleaning",
    name: "Deep Home Cleaning",
    image: "/placeholder.svg?height=200&width=300",
    price: 1999,
    rating: 4.7,
    reviews: 987,
  },
  {
    id: "bathroom-cleaning",
    name: "Bathroom Cleaning",
    image: "/placeholder.svg?height=200&width=300",
    price: 599,
    rating: 4.6,
    reviews: 756,
  },
  {
    id: "sofa-cleaning",
    name: "Sofa Cleaning",
    image: "/placeholder.svg?height=200&width=300",
    price: 799,
    rating: 4.5,
    reviews: 543,
  },
]

export default function CityPage({ params }: CityPageProps) {
  const citySlug = params.city.toLowerCase()
  const city = cityData[citySlug as keyof typeof cityData] || {
    name: params.city.charAt(0).toUpperCase() + params.city.slice(1),
    description: `Find the best home services in ${params.city.charAt(0).toUpperCase() + params.city.slice(1)}`,
    heroImage: "/placeholder.svg?height=600&width=1200",
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* City Hero Section */}
      <section className="relative">
        <div className="relative h-64 md:h-80 lg:h-96 w-full">
          <Image
            src={city.heroImage || "/placeholder.svg"}
            alt={`${city.name} services`}
            fill
            className="object-cover brightness-75"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-2xl">
                <div className="flex items-center gap-2 text-white mb-2">
                  <MapPin className="h-5 w-5" />
                  <span className="font-medium">{city.name}</span>
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                  Home Services in {city.name}
                </h1>
                <p className="text-lg text-white/90 mb-6">{city.description}</p>
                <div className="flex flex-wrap gap-3">
                  <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                    Book a Service
                  </Button>
                  <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                    Post a Task
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-6">Service Categories</h2>

          <div className="overflow-x-auto category-scroll pb-4">
            <div className="flex space-x-4 min-w-max">
              {serviceCategories.map((category) => (
                <Link key={category.id} href={`/${citySlug}/${category.id}`} className="block">
                  <Card className="w-40 hover:shadow-md transition-shadow">
                    <CardContent className="p-4 flex flex-col items-center text-center">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                        <Image src={category.icon || "/placeholder.svg"} alt={category.name} width={40} height={40} />
                      </div>
                      <h3 className="font-medium">{category.name}</h3>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trending Services */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Trending in {city.name}</h2>
            <Link href={`/${citySlug}/services`}>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                View All <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingServices.map((service) => (
              <Link key={service.id} href={`/${citySlug}/services/${service.id}`} className="block">
                <Card className="h-full hover:shadow-md transition-shadow overflow-hidden">
                  <div className="relative h-40">
                    <Image src={service.image || "/placeholder.svg"} alt={service.name} fill className="object-cover" />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-2">{service.name}</h3>
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{service.rating}</span>
                      <span className="text-sm text-gray-500">({service.reviews})</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-primary">₹{service.price}</span>
                      <Button size="sm">Book Now</Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Sub-categories Section */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-6">Popular Services</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
            {serviceCategories.map((category) => (
              <div key={category.id} className="mb-8">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Image
                    src={category.icon || "/placeholder.svg"}
                    alt={category.name}
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                  {category.name}
                </h3>
                <ul className="space-y-2">
                  {category.subCategories.map((subCategory, index) => (
                    <li key={index}>
                      <Link
                        href={`/${citySlug}/${category.id}/${subCategory.toLowerCase().replace(/\s+/g, "-")}`}
                        className="text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary"
                      >
                        {subCategory}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Models Section */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold mb-4">Choose Your Booking Model</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Serveto offers three different ways to book services based on your preferences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Direct Booking */}
            <Card className="h-full">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <span className="text-xl font-bold text-primary">1</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Direct Booking</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Book services directly at fixed prices with verified professionals.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 mt-1 text-primary" />
                    <span className="text-sm">Fixed transparent pricing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 mt-1 text-primary" />
                    <span className="text-sm">Instant booking confirmation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 mt-1 text-primary" />
                    <span className="text-sm">Quality guarantee</span>
                  </li>
                </ul>
                <Link href={`/${citySlug}/services`}>
                  <Button className="w-full">Browse Services</Button>
                </Link>
              </CardContent>
            </Card>

            {/* Vendor Comparison */}
            <Card className="h-full">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <span className="text-xl font-bold text-primary">2</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Vendor Comparison</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Compare multiple vendors based on ratings, prices, and availability.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 mt-1 text-primary" />
                    <span className="text-sm">Compare multiple quotes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 mt-1 text-primary" />
                    <span className="text-sm">Read verified reviews</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 mt-1 text-primary" />
                    <span className="text-sm">Choose the best match</span>
                  </li>
                </ul>
                <Link href={`/${citySlug}/vendors`}>
                  <Button className="w-full">Find Vendors</Button>
                </Link>
              </CardContent>
            </Card>

            {/* Task Bidding */}
            <Card className="h-full">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <span className="text-xl font-bold text-primary">3</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Task Bidding</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Post your task and receive competitive bids from professionals.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 mt-1 text-primary" />
                    <span className="text-sm">Describe your requirements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 mt-1 text-primary" />
                    <span className="text-sm">Set your budget</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 mt-1 text-primary" />
                    <span className="text-sm">Choose from multiple bids</span>
                  </li>
                </ul>
                <Link href={`/${citySlug}/post-task`}>
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
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold mb-4">What Customers Say</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Hear from our satisfied customers in {city.name}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Testimonial 1 */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  "The cleaning service was excellent! The professional arrived on time and did a thorough job. My home
                  has never looked better."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="font-medium text-gray-700">RS</span>
                  </div>
                  <div>
                    <p className="font-medium">Rahul Sharma</p>
                    <p className="text-sm text-gray-500">{city.name}</p>
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
                  "I posted a task for furniture assembly and received multiple bids within hours. The professional I
                  chose was skilled and efficient."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="font-medium text-gray-700">AP</span>
                  </div>
                  <div>
                    <p className="font-medium">Anjali Patel</p>
                    <p className="text-sm text-gray-500">{city.name}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Testimonial 3 */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  "The AC repair service was prompt and professional. The technician explained the issue clearly and
                  fixed it quickly. Highly recommended!"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="font-medium text-gray-700">VK</span>
                  </div>
                  <div>
                    <p className="font-medium">Vikram Kumar</p>
                    <p className="text-sm text-gray-500">{city.name}</p>
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
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Find answers to common questions about our services in {city.name}
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              {[
                {
                  question: "How do I book a service?",
                  answer:
                    "You can book a service by browsing our service categories, selecting the service you need, choosing a time slot, and completing the checkout process.",
                },
                {
                  question: "What is the difference between the three booking models?",
                  answer:
                    "Direct Booking offers fixed prices and instant confirmation. Vendor Comparison lets you compare multiple professionals based on ratings and prices. Task Bidding allows you to post your requirements and receive competitive bids.",
                },
                {
                  question: "Are the professionals verified?",
                  answer:
                    "Yes, all professionals on Serveto undergo a thorough verification process including identity verification, background checks, and skill assessment.",
                },
                {
                  question: "What if I'm not satisfied with the service?",
                  answer:
                    "We offer a satisfaction guarantee. If you're not satisfied with the service, you can report the issue within 24 hours and we'll arrange for a rework or provide a refund as applicable.",
                },
                {
                  question: "How can I pay for services?",
                  answer:
                    "We accept multiple payment methods including credit/debit cards, UPI, net banking, and wallet payments. All transactions are secure and encrypted.",
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

