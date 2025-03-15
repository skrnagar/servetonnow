"use client"

import { useState } from "react"
import { use } from 'react'
import HeroSection from "@/components/city/hero-section"
import BookingModels from "@/components/city/booking-models"
import PopularServices from "@/components/city/popular-services"

export default function CityPage({ params }: { params: { city: string } }) {
  const resolvedParams = use(params);
  const citySlug = resolvedParams.city.toLowerCase()
  const formattedCityName = citySlug.charAt(0).toUpperCase() + citySlug.slice(1)

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <HeroSection citySlug={citySlug} />
      <BookingModels citySlug={citySlug} />
      <PopularServices citySlug={citySlug} cityName={formattedCityName} />
    </div>
  )
}