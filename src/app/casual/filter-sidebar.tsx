"use client"

import { Slider } from "../components/ui/slider"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion"
import { Settings2, ChevronRight } from "lucide-react"
import { useState } from "react"

const categories = ["T-shirts", "Shorts", "Shirts", "Hoodie", "Jeans"]
const colors = ["bg-blue-500", "bg-red-500", "bg-green-500", "bg-yellow-500", "bg-purple-500"]
const sizes = ["XX-Small", "X-Small", "Small", "Medium", "Large", "X-Large", "XX-Large", "3X-Large", "4X-Large"]
const styles = ["Casual", "Formal", "Party", "Gym"]

export default function FilterSidebar() {
  const [priceRange, setPriceRange] = useState([50])

  return (
    <div className="w-full lg:w-[300px] shrink-0">
      <div className="sticky top-4 rounded-xl border bg-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Filters</h2>
          <Settings2 className="h-5 w-5" />
        </div>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="categories">
            <AccordionTrigger>Categories</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category} className="flex items-center justify-between">
                    <label className="text-sm">{category}</label>
                    <ChevronRight className="h-4 w-4" />
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="price">
            <AccordionTrigger>Price</AccordionTrigger>
            <AccordionContent>
              <Slider value={priceRange} onValueChange={setPriceRange} max={200} min={0} step={1} className="my-4" />
              <div className="flex justify-between text-sm font-medium">
                <span>${priceRange[0]}</span>
                <span>$200</span>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="colors">
            <AccordionTrigger>Colors</AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-5 gap-2">
                {colors.map((color) => (
                  <div key={color} className={`h-8 w-8 rounded-full ${color} cursor-pointer`} />
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="sizes">
            <AccordionTrigger>Size</AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <div
                    key={size}
                    className="rounded-full bg-muted px-3 py-1 text-xs font-medium cursor-pointer hover:bg-muted/80"
                  >
                    {size}
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="style">
            <AccordionTrigger>Dress Style</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {styles.map((style) => (
                  <div key={style} className="flex items-center justify-between">
                    <label className="text-sm">{style}</label>
                    <ChevronRight className="h-4 w-4" />
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <button className="mt-6 w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          Apply Filters
        </button>
      </div>
    </div>
  )
}

