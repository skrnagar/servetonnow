
import { CategorySkeleton, ServiceCardSkeleton, TestimonialSkeleton } from "@/components/ui/skeleton-patterns"

export default function CityLoading() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <section className="rounded-xl bg-linear-to-t from-sky-500 to-indigo-500 p-6 mb-10">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="w-full md:w-2/3">
            <div className="mb-6">
              <div className="h-10 w-3/4">
                <div className="h-full w-full animate-pulse rounded-md bg-muted" />
              </div>
              <div className="mt-3 h-4 w-2/3">
                <div className="h-full w-full animate-pulse rounded-md bg-muted" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {[...Array(10)].map((_, i) => (
                <CategorySkeleton key={i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Popular Services */}
      <section className="mb-10">
        <div className="flex justify-between items-center mb-6">
          <div className="h-8 w-64">
            <div className="h-full w-full animate-pulse rounded-md bg-muted" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <ServiceCardSkeleton key={i} />
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="mb-12">
        <div className="h-8 w-64 mb-6">
          <div className="h-full w-full animate-pulse rounded-md bg-muted" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <TestimonialSkeleton key={i} />
          ))}
        </div>
      </section>
    </div>
  )
}
