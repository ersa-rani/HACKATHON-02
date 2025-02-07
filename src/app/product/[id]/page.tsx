"use client"

import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"
import type { Product } from "@/types/products"
import { useEffect, useState } from "react"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import Comments from "@/app/components/comments"
import { motion } from "framer-motion"

const buttonVariants = {
  hover: {
    scale: 1.05,
    boxShadow: "0px 5px 10px rgba(0,0,0,0.1)",
    transition: {
      duration: 0.3,
    },
  },
  tap: {
    scale: 0.95,
  },
}

export default function ProductDetail() {
  const { id } = useParams() // Gets the dynamic route parameter
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedSize, setSelectedSize] = useState("medium")
  const [selectedColor, setSelectedColor] = useState("black")
  const [quantity, setQuantity] = useState(1)
  const router = useRouter()

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true)
      setError(null)
      try {
        if (!id) {
          throw new Error("Product ID is missing.")
        }

        console.log("Fetching product with ID:", id)
        const fetchedProduct: Product = await client.fetch(`*[_type == "product" && _id == $id][0]`, { id })

        if (!fetchedProduct) {
          throw new Error("Product not found.")
        }

        console.log("Fetched product:", fetchedProduct)
        setProduct(fetchedProduct)
      } catch (err) {
        console.error("Error fetching product:", err)
        setError(err instanceof Error ? err.message : "An error occurred while fetching the product.")
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  const handleQuantityChange = (type: "increase" | "decrease") => {
    setQuantity((prev) => (type === "increase" ? prev + 1 : prev > 1 ? prev - 1 : prev))
  }

  const addToCart = () => {
    if (!product) return

    // Validate required selections
    if (!selectedSize) {
      alert("Please select a size")
      return
    }
    if (!selectedColor) {
      alert("Please select a color")
      return
    }

    const cartItem = {
      ...product,
      quantity,
      selectedSize,
      selectedColor,
    }

    const existingCart = localStorage.getItem("cart")
    const cart = existingCart ? JSON.parse(existingCart) : []
    cart.push(cartItem)
    localStorage.setItem("cart", JSON.stringify(cart))

    router.push("/cart")
  }

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">Error: {error}</div>
  }

  if (!product) {
    return <div className="flex justify-center items-center h-screen">Product not found.</div>
  }

  const sizes = ["Small", "Medium", "Large", "X-Large"]
  const colors = [
    { name: "black", hex: "#000000" },
    { name: "brown", hex: "#8B4513" },
    { name: "green", hex: "#228B22" },
  ]

  return (
    <motion.div
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col md:flex-row gap-8">
        {/* Image Gallery */}
        <div className="md:w-1/2 space-y-4">
          <motion.div
            className="aspect-square overflow-hidden rounded-lg"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            {product.image && (
              <Image
                src={urlFor(product.image).url() || "/placeholder.svg"}
                alt={product.name}
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
            )}
          </motion.div>
        </div>

        {/* Product Details */}
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-600 mb-6">{product.description || "No description available."}</p>

          {/* Color Selection */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Select Color</h3>
            <div className="flex gap-3">
              {colors.map((color) => (
                <motion.button
                  key={color.name}
                  onClick={() => setSelectedColor(color.name)}
                  className={`w-8 h-8 rounded-full border-2 ${
                    selectedColor === color.name ? "border-black" : "border-transparent"
                  }`}
                  style={{ backgroundColor: color.hex }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={`Select ${color.name} color`}
                />
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Select Size</h3>
            <div className="flex flex-wrap gap-3">
              {sizes.map((size) => (
                <motion.button
                  key={size}
                  onClick={() => setSelectedSize(size.toLowerCase())}
                  className={`px-4 py-2 border rounded-md ${
                    selectedSize === size.toLowerCase()
                      ? "bg-black text-white"
                      : "bg-white text-black hover:bg-gray-100"
                  }`}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  {size}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="flex items-center gap-6">
            <div className="flex items-center border rounded-md">
              <motion.button
                onClick={() => handleQuantityChange("decrease")}
                className="p-2 hover:bg-gray-100 w-8 h-8 flex items-center justify-center"
                disabled={quantity <= 1}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                -
              </motion.button>
              <span className="px-4 py-2 min-w-[3rem] text-center">{quantity}</span>
              <motion.button
                onClick={() => handleQuantityChange("increase")}
                className="p-2 hover:bg-gray-100 w-8 h-8 flex items-center justify-center"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                +
              </motion.button>
            </div>
            <motion.button
              onClick={addToCart}
              className="flex-1 bg-black text-white px-8 py-3 rounded-md hover:bg-gray-800 transition-colors"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Add to Cart
            </motion.button>
          </div>
        </div>
      </div>
      <Comments />
    </motion.div>
  )
}

