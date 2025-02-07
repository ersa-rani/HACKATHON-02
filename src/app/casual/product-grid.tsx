"use client"

import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"
import { extra } from "@/sanity/lib/queries"
import type { Product } from "@/types/products"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Pagination } from "./pagination"

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 8

  useEffect(() => {
    async function fetchProducts() {
      try {
        const fetchedProducts: Product[] = await client.fetch(extra)
        setProducts(fetchedProducts)
      } catch (error) {
        console.error("Failed to fetch products:", error)
      }
    }
    fetchProducts()
  }, [])

  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct)
  const totalPages = Math.ceil(products.length / productsPerPage)

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Casual</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {currentProducts.map((product) => (
          <Link href={`/product/${product._id}`} key={product._id} className="group">
            <div className="overflow-hidden rounded-lg border bg-card transition-all hover:shadow-lg">
              {product.image && (
                <div className="aspect-square overflow-hidden">
                  <Image
                    src={urlFor(product.image)?.url() || "/placeholder.svg"}
                    alt={product.name}
                    width={400}
                    height={400}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
              )}
              <div className="p-4">
                <h3 className="font-medium">{product.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">${product.price.toFixed(2)}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />}
    </div>
  )
}

