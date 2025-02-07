"use client"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { motion } from "framer-motion"
import { urlFor } from "@/sanity/lib/image"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group"
import { Checkbox } from "../components/ui/checkbox"
import { toast } from "../components/ui/use-toast"

interface FormData {
  firstName: string
  companyName: string
  streetAddress: string
  apartment: string
  townCity: string
  phoneNumber: string
  emailAddress: string
  saveInformation: boolean
  paymentMethod: "bank" | "cash"
}

export default function CheckoutPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    companyName: "",
    streetAddress: "",
    apartment: "",
    townCity: "",
    phoneNumber: "",
    emailAddress: "",
    saveInformation: false,
    paymentMethod: "bank",
  })
  const [formErrors, setFormErrors] = useState<Partial<FormData>>({})

  // Get cart items from localStorage
  const cartItems = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("cart") || "[]") : []

  const total = cartItems.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0)

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))

    // Clear the error for this field as the user is typing
    setFormErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }))

    // Validate phone number format
    if (name === "phoneNumber") {
      const phoneRegex = /^\d{3}-\d{3}-\d{4}$/
      if (!phoneRegex.test(value)) {
        setFormErrors((prev) => ({
          ...prev,
          phoneNumber: "Please enter a valid phone number in the format 123-456-7890",
        }))
      }
    }

    // Validate email format
    if (name === "emailAddress") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(value)) {
        setFormErrors((prev) => ({
          ...prev,
          emailAddress: "Please enter a valid email address",
        }))
      }
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    const errors: Partial<FormData> = {}
    if (!formData.firstName) errors.firstName = "First name is required"
    if (!formData.streetAddress) errors.streetAddress = "Street address is required"
    if (!formData.townCity) errors.townCity = "Town/City is required"
    if (!formData.phoneNumber) errors.phoneNumber = "Phone number is required"
    if (!formData.emailAddress) errors.emailAddress = "Email address is required"

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      toast({
        title: "Error",
        description: "Please fill in all required fields correctly.",
        variant: "destructive",
      })
      return
    }

    // Clear any previous errors
    setFormErrors({})

    // Here you would typically send the order to your backend
    console.log("Order submitted:", { formData, cartItems, total })

    // Clear cart
    localStorage.removeItem("cart")

    // Show success toast
    toast({
      title: "Order Placed",
      description: "Your order has been successfully placed.",
    })

    // Redirect based on payment method
    if (formData.paymentMethod === "cash") {
      router.push("/checkout/success")
    } else {
      router.push("/checkout/bank-transfer")
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Billing Details Form */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Billing Details</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleInputChange}
                className={formErrors.firstName ? "border-red-500" : ""}
                autoComplete="given-name"
                required
              />
              {formErrors.firstName && <p className="text-red-500 text-sm mt-1">{formErrors.firstName}</p>}
            </div>
            <div>
              <Label htmlFor="companyName">Company Name (Optional)</Label>
              <Input
                id="companyName"
                name="companyName"
                type="text"
                value={formData.companyName}
                onChange={handleInputChange}
                autoComplete="organization"
              />
            </div>
            <div>
              <Label htmlFor="streetAddress">Street Address</Label>
              <Input
                id="streetAddress"
                name="streetAddress"
                type="text"
                value={formData.streetAddress}
                onChange={handleInputChange}
                className={formErrors.streetAddress ? "border-red-500" : ""}
                autoComplete="street-address"
                required
              />
              {formErrors.streetAddress && <p className="text-red-500 text-sm mt-1">{formErrors.streetAddress}</p>}
            </div>
            <div>
              <Label htmlFor="apartment">Apartment, suite, etc. (Optional)</Label>
              <Input
                id="apartment"
                name="apartment"
                type="text"
                value={formData.apartment}
                onChange={handleInputChange}
                autoComplete="address-line2"
              />
            </div>
            <div>
              <Label htmlFor="townCity">Town / City</Label>
              <Input
                id="townCity"
                name="townCity"
                type="text"
                value={formData.townCity}
                onChange={handleInputChange}
                className={formErrors.townCity ? "border-red-500" : ""}
                autoComplete="address-level2"
                required
              />
              {formErrors.townCity && <p className="text-red-500 text-sm mt-1">{formErrors.townCity}</p>}
            </div>
            <div>
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className={formErrors.phoneNumber ? "border-red-500" : ""}
                autoComplete="tel"
                required
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                placeholder="123-456-7890"
              />
              {formErrors.phoneNumber && <p className="text-red-500 text-sm mt-1">{formErrors.phoneNumber}</p>}
            </div>
            <div>
              <Label htmlFor="emailAddress">Email Address</Label>
              <Input
                id="emailAddress"
                name="emailAddress"
                type="email"
                value={formData.emailAddress}
                onChange={handleInputChange}
                className={formErrors.emailAddress ? "border-red-500" : ""}
                autoComplete="email"
                required
              />
              {formErrors.emailAddress && <p className="text-red-500 text-sm mt-1">{formErrors.emailAddress}</p>}
            </div>
            <div>
              <Checkbox
                id="saveInformation"
                name="saveInformation"
                checked={formData.saveInformation}
                // onChange={handleInputChange}
              >
                Save my information for next time
              </Checkbox>
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-50 rounded-lg p-6"
          >
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

            <div className="space-y-4">
              {cartItems.map((item: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className="relative w-16 h-16">
                    <Image
                      src={item.image ? urlFor(item.image).url() : "/placeholder.svg"}
                      alt={item.name}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-semibold">${item.price * item.quantity}</p>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="border-t pt-4"
              >
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </motion.div>

              <div className="space-y-4">
                <h3 className="font-semibold">Payment Method</h3>
                <RadioGroup
                  defaultValue="bank"
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, paymentMethod: value as "bank" | "cash" }))
                  }
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="bank" id="bank" />
                    <Label htmlFor="bank">Direct Bank Transfer</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cash" id="cash" />
                    <Label htmlFor="cash">Cash on Delivery</Label>
                  </div>
                </RadioGroup>

                <p className="text-sm text-gray-600">
                  Your personal data will be used to support your experience throughout this website, to manage access
                  to your account, and for other purposes described in our privacy policy.
                </p>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    type="submit"
                    className="w-full transition-colors duration-200 hover:bg-blue-600"
                    onClick={handleSubmit}
                  >
                    Place Order
                  </Button>
                  {Object.keys(formErrors).length > 0 && (
                    <p className="text-red-500 text-sm mt-2">
                      Please fill in all required fields before placing your order.
                    </p>
                  )}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
