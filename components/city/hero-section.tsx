
"use client"

import Link from "next/link"
import { categories } from "@/lib/constants"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import Image from "next/image"

export default function HeroSection({ citySlug }: { citySlug: string }) {
  return (
    <section className="rounded-xl bg-gradient-to-t from-sky-100 to-indigo-100 px-6 py-12 mb-10">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold">
          Home Services, Your Way – Compare, Book, or Post a Task
        </h1>
        <p className="mt-3 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Choose from top-rated vendors, book our in-house experts, or get bids from professionals near you.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="grid grid-cols-4 sm:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/${citySlug}/${category.id}`}
              className="flex flex-col items-center p-2 bg-white/80 backdrop-blur-sm rounded-lg hover:bg-white/90 transition-all"
            >
              <div className="w-10 h-10 flex items-center justify-center mb-2 text-xl">
                {category.icon}
              </div>
              <span className="text-xs text-center font-medium line-clamp-2">
                {category.name}
              </span>
            </Link>
          ))}
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
            autoPlay: true,
            interval: 5000
          }}
          className="w-full"
        >
          <CarouselContent>
            {[
              {
                type: "image",
                src: "/sofa-cleaning-services.jpg",
                alt: "Professional Sofa Cleaning",
                title: "Expert Sofa Cleaning Services",
                description: "Deep cleaning for your upholstery"
              },
              {
                type: "image",
                src: "/sofa-cleaning-services.jpg",
                alt: "Home Cleaning Services",
                title: "Professional Home Cleaning",
                description: "Experienced cleaners at your service"
              },
              {
                type: "image",
                src: "/sofa-cleaning-services.jpg",
                alt: "Quality Cleaning Service",
                title: "100% Satisfaction Guarantee",
                description: "Quality service or your money back"
              }
            ].map((item, index) => (
              <CarouselItem key={index} className="w-full">
                <div className="relative aspect-[16/9]">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent">
                    <div className="absolute bottom-8 left-8 right-8 text-white">
                      <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                      <p className="text-lg text-white/90">{item.description}</p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4 pointer-events-none">
            <CarouselPrevious className="relative pointer-events-auto bg-white/20 hover:bg-white/40 text-white" />
            <CarouselNext className="relative pointer-events-auto bg-white/20 hover:bg-white/40 text-white" />
          </div>
        </Carousel>
      </div>
    </section>
  )
}
