
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";

export default function CityHomePage() {
  const { city } = useParams();
  const citySlug = typeof city === "string" ? city : "";
  const formattedCityName = citySlug.charAt(0).toUpperCase() + citySlug.slice(1);
  
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 640;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <section className="rounded-xl bg-gradient-to-r from-primary/10 to-primary/20 p-6 mb-10">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Home Services in {formattedCityName}
            </h1>
            <p className="mt-3 text-gray-600 dark:text-gray-300">
              Find reliable professionals for all your home service needs in {formattedCityName}
            </p>
            <div className="mt-6">
              <div className="relative">
                <div className="flex overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 space-x-4">
                  {[
                    { name: "Cleaning", icon: "🧹", slug: "cleaning" },
                    { name: "Plumbing", icon: "🚿", slug: "plumbing" },
                    { name: "Electrical", icon: "💡", slug: "electrical" },
                    { name: "Appliance Repair", icon: "🔧", slug: "appliance-repair" },
                    { name: "Pest Control", icon: "🐜", slug: "pest-control" },
                    { name: "Painting", icon: "🎨", slug: "painting" },
                    { name: "Carpentry", icon: "🪚", slug: "carpentry" },
                    { name: "Home Moving", icon: "📦", slug: "home-moving" },
                    { name: "Gardening", icon: "🌿", slug: "gardening" },
                    { name: "Heating & AC", icon: "❄️", slug: "hvac" }
                  ].map((category) => (
                    <Link 
                      key={category.slug}
                      href={`/${citySlug}/${category.slug}`}
                      className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center min-w-[140px]"
                    >
                      <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                        <span className="text-2xl">{category.icon}</span>
                      </div>
                      <h3 className="font-medium text-sm">
                        {category.name}
                      </h3>
                    </Link>
                  ))}
                </div>

                <style jsx global>{`
                  .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                  }
                  .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                  }
                `}</style>
              </div>
            </div>
          </div>
          <div className="relative w-full md:w-1/3 h-44 md:h-64">
            <Image
              src="/placeholder.svg"
              alt={`Home services in ${formattedCityName}`}
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">How It Works in {formattedCityName}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <span className="text-xl font-bold">1</span>
            </div>
            <h3 className="text-lg font-bold mb-2">Choose Service</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Browse and select from a wide range of home services available in {formattedCityName}.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <span className="text-xl font-bold">2</span>
            </div>
            <h3 className="text-lg font-bold mb-2">Book Appointment</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Schedule a convenient time for your service with our verified professionals.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <span className="text-xl font-bold">3</span>
            </div>
            <h3 className="text-lg font-bold mb-2">Get It Done</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Relax as our skilled professionals complete your service to satisfaction.
            </p>
          </div>
        </div>
      </section>

      {/* Popular Services Section */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Popular Services in {formattedCityName}</h2>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="icon" 
              className="scroll-prev-button"
              onClick={() => {
                const container = document.querySelector('.services-container');
                if (container) {
                  container.scrollBy({ left: -300, behavior: 'smooth' });
                }
              }}
            >
              <span className="sr-only">Scroll left</span>
              ←
            </Button>
            <Button 
              variant="outline" 
              size="icon"
              className="scroll-next-button"
              onClick={() => {
                const container = document.querySelector('.services-container');
                if (container) {
                  container.scrollBy({ left: 300, behavior: 'smooth' });
                }
              }}
            >
              <span className="sr-only">Scroll right</span>
              →
            </Button>
          </div>
        </div>
        
        <div 
          className="services-container flex overflow-x-auto gap-4 pb-4 scrollbar-hide -mx-4 px-4"
          style={{ cursor: 'grab' }}
          onMouseDown={(e) => {
            const ele = e.currentTarget;
            if (!ele) return;
            
            const pos = {
              left: ele.scrollLeft,
              x: e.clientX,
            };
            
            const mouseMoveHandler = (e: MouseEvent) => {
              const dx = e.clientX - pos.x;
              ele.scrollLeft = pos.left - dx;
            };
            
            const mouseUpHandler = () => {
              document.removeEventListener('mousemove', mouseMoveHandler);
              document.removeEventListener('mouseup', mouseUpHandler);
              ele.style.cursor = 'grab';
              ele.style.removeProperty('user-select');
            };
            
            ele.style.cursor = 'grabbing';
            ele.style.userSelect = 'none';
            
            document.addEventListener('mousemove', mouseMoveHandler);
            document.addEventListener('mouseup', mouseUpHandler);
          }}
        >
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="min-w-[280px] sm:min-w-[320px] bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden flex-shrink-0">
              <div className="relative h-48">
                <Image
                  src="/placeholder.svg"
                  alt="Service"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">Service {i}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                  Professional service with guaranteed satisfaction in {formattedCityName}.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-primary font-medium">Starting $49</span>
                  <Button size="sm">Book Now</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Top Providers */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Top Providers in {formattedCityName}</h2>
          <Link href={`/${citySlug}/providers`} className="text-primary hover:underline flex items-center">
            View All
            <FaArrowRight className="ml-1 h-3 w-3" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
              <div className="p-4 flex items-center">
                <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4">
                  <Image src="/placeholder-user.jpg" alt="Provider" fill className="object-cover" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Provider {i}</h3>
                  <div className="flex items-center mt-1">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span key={star} className="text-yellow-400">★</span>
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">(120 reviews)</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Plumbing, Electrical</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Reviews */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Recent Reviews in {formattedCityName}</h2>
          <Link href={`/${citySlug}/reviews`} className="text-primary hover:underline flex items-center">
            View All
            <FaArrowRight className="ml-1 h-3 w-3" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="relative w-10 h-10 rounded-full overflow-hidden mr-3">
                  <Image src="/placeholder-user.jpg" alt="User" fill className="object-cover" />
                </div>
                <div>
                  <h4 className="font-medium">User {i}</h4>
                  <div className="flex mt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className="text-yellow-400 text-sm">★</span>
                    ))}
                  </div>
                </div>
                <div className="ml-auto text-sm text-gray-500">2 days ago</div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Great service! The technician was professional, on time, and fixed my issue quickly. Would recommend to anyone in {formattedCityName} looking for quality service.
              </p>
              <div className="mt-3 text-sm font-medium">For: Plumbing Services</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
