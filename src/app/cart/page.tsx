"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { urlFor } from "@/sanity/lib/image"
import { useRouter } from "next/navigation"
import { X } from "lucide-react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import type { Product } from "@/types/products"
import { motion, AnimatePresence } from "framer-motion"
import { useAuth } from "@clerk/nextjs"

interface CartItem extends Product {
  quantity: number
  selectedSize: string
  selectedColor: string
}

const buttonVariants = {
  hover: { scale: 1.05, transition: { duration: 0.2 } },
  tap: { scale: 0.95, transition: { duration: 0.2 } },
}

export default function CartPage() {
  const { isSignedIn } = useAuth()
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [promoCode, setPromoCode] = useState("")
  const [discount, setDiscount] = useState(0)
  const router = useRouter()

  useEffect(() => {
    // Load cart items from localStorage
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      setCartItems(JSON.parse(savedCart))
    }
  }, [])

  const updateQuantity = (index: number, type: "increase" | "decrease") => {
    const newCartItems = [...cartItems]
    if (type === "increase") {
      newCartItems[index].quantity += 1
    } else if (newCartItems[index].quantity > 1) {
      newCartItems[index].quantity -= 1
    }
    setCartItems(newCartItems)
    localStorage.setItem("cart", JSON.stringify(newCartItems))
  }

  const removeItem = (index: number) => {
    const newCartItems = cartItems.filter((_, i) => i !== index)
    setCartItems(newCartItems)
    localStorage.setItem("cart", JSON.stringify(newCartItems))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const deliveryFee = 15
  const total = subtotal - discount + deliveryFee

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "discount20") {
      setDiscount(subtotal * 0.2)
    } else {
      setDiscount(0)
    }
  }

  if (cartItems.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-[60vh] flex flex-col items-center justify-center gap-4"
      >
        <h1 className="text-2xl font-bold">Your cart is empty</h1>
        <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
          <Button onClick={() => router.push("/")}>Continue Shopping</Button>
        </motion.div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      <h1 className="text-2xl font-bold mb-8">YOUR CART</h1>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <AnimatePresence>
            {cartItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="flex gap-4 p-4 border rounded-lg"
              >
                <div className="w-24 h-24 relative">
                  <Image
                    src={item.image ? urlFor(item.image).url() : "/placeholder.svg"}
                    alt={item.name}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>

                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-gray-600">
                        Size: {item.selectedSize}
                        <span className="mx-2">|</span>
                        Color: {item.selectedColor}
                      </p>
                    </div>
                    <motion.button
                      onClick={() => removeItem(index)}
                      className="text-gray-400 hover:text-gray-600"
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      <X className="h-5 w-5" />
                    </motion.button>
                  </div>

                  <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center border rounded-md">
                      <motion.button
                        onClick={() => updateQuantity(index, "decrease")}
                        className="px-3 py-1 hover:bg-gray-100"
                        disabled={item.quantity <= 1}
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                      >
                        -
                      </motion.button>
                      <motion.span
                        key={item.quantity}
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className="px-4 py-1 min-w-[3rem] text-center"
                      >
                        {item.quantity}
                      </motion.span>
                      <motion.button
                        onClick={() => updateQuantity(index, "increase")}
                        className="px-3 py-1 hover:bg-gray-100"
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                      >
                        +
                      </motion.button>
                    </div>
                    <motion.p
                      key={item.quantity}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="font-semibold"
                    >
                      ${item.price * item.quantity}
                    </motion.p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="md:col-span-1"
        >
          <div className="border rounded-lg p-6 sticky top-8">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>

            <div className="space-y-4">
              <motion.div layout className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal}</span>
              </motion.div>

              <AnimatePresence>
                {discount > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex justify-between text-green-600"
                  >
                    <span>Discount (-20%)</span>
                    <span>-${discount}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div layout className="flex justify-between">
                <span>Delivery Fee</span>
                <span>${deliveryFee}</span>
              </motion.div>

              <motion.div layout className="border-t pt-4">
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${total}</span>
                </div>
              </motion.div>

              <div className="space-y-2">
                <Input
                  type="text"
                  placeholder="Add promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                />
                <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                  <Button onClick={applyPromoCode} variant="outline" className="w-full">
                    Apply
                  </Button>
                </motion.div>
              </div>

              <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                <Button
                  onClick={() => {
                    if (isSignedIn) {
                      router.push("/checkout")
                    } else {
                      alert("You need to sign up or sign in before proceeding to checkout.")
                    }
                  }}
                  className="w-full"
                >
                  Proceed to Checkout →
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

