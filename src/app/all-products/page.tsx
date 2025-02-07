"use client"

import { motion, type Variants } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { urlFor } from "@/sanity/lib/image"
import type { Product } from "@/types/products"
import { useEffect, useState } from "react"
import { client } from "@/sanity/lib/client"

const cardVariants: Variants = {
  hover: {
    scale: 1.05,
    boxShadow: "0px 10px 20px rgba(0,0,0,0.1)",
    transition: {
      duration: 0.3,
    },
  },
  initial: {
    scale: 1,
    boxShadow: "0px 0px 0px rgba(0,0,0,0)",
  }
}

export default function AllProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProducts() {
      const fetchedProducts = await client.fetch('*[_type == "product"]')
      setProducts(fetchedProducts)
      setLoading(false)
    }
    fetchProducts()
  }, [])

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl sm:text-4xl text-black font-extrabold text-center mb-8">All Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products?.map((product) => (
          <Link href={`/product/${product._id}`} key={product._id}>
            <motion.div
              className="border rounded-lg shadow-md p-4 cursor-pointer bg-white"
              variants={cardVariants}
              whileHover="hover"
              initial="initial"
            >
              {product.image && (
                <Image
                  src={urlFor(product.image).url() || "/placeholder.svg"}
                  alt={product.name}
                  width={300}
                  height={300}
                  className="w-full h-48 object-cover rounded-md transition-transform duration-300"
                />
              )}
              <h2 className="text-lg font-semibold mt-4">{product.name}</h2>
              <p className="text-gray-600 mt-2">${product.price.toFixed(2)}</p>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  )
}

