import { Suspense } from "react"
import ProductGrid from "./product-grid"
import FilterSidebar from "./filter-sidebar"
import { ChevronRight } from "lucide-react"

export default function CasualPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm mb-6">
        <span className="font-medium">Home</span>
        <ChevronRight className="h-4 w-4" />
        <span className="font-medium">Casual</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <FilterSidebar />
        <div className="flex-1">
          <Suspense fallback={<div>Loading...</div>}>
            <ProductGrid />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

