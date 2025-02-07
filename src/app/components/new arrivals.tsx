"use client"
import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"
import { firstfour } from "@/sanity/lib/queries"
import type { Product } from "@/types/products"
import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

const DRESSNEW = () => {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    async function fetchProducts() {
      const fetchedProducts: Product[] = await client.fetch(firstfour)
      setProducts(fetchedProducts)
    }
    fetchProducts()
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  }

  return (
    <motion.div
      className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h1
        className="text-3xl sm:text-4xl text-black font-extrabold text-center p-4 sm:p-8"
        variants={itemVariants}
      >
        NEW ARRIVALS
      </motion.h1>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
        variants={containerVariants}
      >
        {products.map((product) => (
          <motion.div key={product._id} variants={itemVariants}>
            <Link href={`/product/${product._id}`}>
              <motion.div
                className="border rounded-lg shadow-md p-4 cursor-pointer"
                whileHover={{ scale: 1.05, boxShadow: "0px 5px 15px rgba(0,0,0,0.1)" }}
                transition={{ duration: 0.2 }}
              >
                {product.image && (
                  <Image
                    src={urlFor(product.image).url() || "/placeholder.svg"}
                    alt={product.name}
                    width={200}
                    height={200}
                    className="w-full h-48 object-cover rounded-md"
                  />
                )}
                <h2 className="text-lg font-semibold mt-4">{product.name}</h2>
                <p className="text-gray-600">${product.price.toFixed(2)}</p>
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
      <motion.div className="flex justify-center items-center mt-8" variants={itemVariants}>
        <Link href="/all-products">
          <motion.button
            className="px-6 py-2 text-base sm:text-lg border rounded-xl text-black hover:bg-black hover:text-white transition-all duration-150 font-bold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View All
          </motion.button>
        </Link>
      </motion.div>
    </motion.div>
  )
}

export default DRESSNEW

