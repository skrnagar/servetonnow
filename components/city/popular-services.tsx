
"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { FaArrowRight } from "react-icons/fa"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

export default function PopularServices({ citySlug, cityName }: { citySlug: string; cityName: string }) {
  return (
    <section className="mb-10 relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Popular Services in {cityName}</h2>
        <Link href="/services" className="text-primary hover:underline flex items-center">
          View All
          <FaArrowRight className="ml-1 h-3 w-3" />
        </Link>
      </div>

      <div className="relative">
        <Carousel
          opts={{
            align: "start",
            dragFree: true
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {[
              { name: "Home Cleaning", price: "₹499", image: "https://xxdzsbycwgncikfvjcpo.supabase.co/storage/v1/object/public/media//home%20cleaning%20services%20Indore.jpg?height=400&width=600", slug: "home-cleaning" },
              { name: "Plumbing Service", price: "₹399", image: "https://xxdzsbycwgncikfvjcpo.supabase.co/storage/v1/object/public/media//plumbing%20services%20indore.jpg?height=400&width=600", slug: "plumbing" },
              { name: "Electrical Repairs", price: "₹449", image: "https://xxdzsbycwgncikfvjcpo.supabase.co/storage/v1/object/public/media//Electrical%20Repairs%20Services%20Indore.jpg?height=400&width=600", slug: "electrical" },
              { name: "AC Repair & Services", price: "₹599", image: "https://xxdzsbycwgncikfvjcpo.supabase.co/storage/v1/object/public/media//air-conditioner-service-indoors-air-conditioner-cleaning-technician%20services%20indore.avif?height=400&width=600", slug: "appliance-repair" },
              { name: "Pest Control", price: "₹799", image: "/placeholder.svg?height=400&width=600", slug: "pest-control" }
            ].map((service) => (
              <CarouselItem key={service.slug} className="pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700">
                  <div className="relative h-40">
                    <Image
                      src={service.image}
                      alt={service.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold">{service.name}</h3>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-primary font-medium">Starting {service.price}</span>
                      <Link href={`/${citySlug}/${service.slug}`}>
                        <Button size="sm">Book Now</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden sm:flex items-center justify-end gap-2 mt-4">
            <CarouselPrevious className="static translate-y-0 translate-x-0 h-8 w-8 rounded-full" />
            <CarouselNext className="static translate-y-0 translate-x-0 h-8 w-8 rounded-full" />
          </div>
        </Carousel>
      </div>
    </section>
  )
}
