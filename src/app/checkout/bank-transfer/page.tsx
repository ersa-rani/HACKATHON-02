"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/app/components/ui/button"
import Link from "next/link"

export default function BankTransferPage() {
  const [paymentConfirmed, setPaymentConfirmed] = useState(false)

  const handleConfirmPayment = () => {
    // Here you would typically verify the payment with your backend
    // For this example, we'll just set it to confirmed after a short delay
    setTimeout(() => {
      setPaymentConfirmed(true)
    }, 2000)
  }

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 px-4">
      {!paymentConfirmed ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-3xl font-bold mb-4">Bank Transfer Details</h1>
          <p className="text-gray-600 mb-6">Please transfer the total amount to the following bank account:</p>
          <div className="bg-gray-100 p-6 rounded-lg mb-6">
            <p>
              <strong>Bank Name:</strong> Example Bank
            </p>
            <p>
              <strong>Account Name:</strong> Your Company Name
            </p>
            <p>
              <strong>Account Number:</strong> 1234567890
            </p>
            <p>
              <strong>Sort Code:</strong> 12-34-56
            </p>
            <p>
              <strong>Reference:</strong> Your Order Number
            </p>
          </div>
          <Button onClick={handleConfirmPayment}>I've Completed the Transfer</Button>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-3xl font-bold mb-4">Thank you for your payment!</h1>
          <p className="text-gray-600 mb-6">
            We have received your payment and will process your order shortly. You will receive a confirmation email
            with your order details.
          </p>
          <Button asChild>
            <Link href="/">Continue Shopping</Link>
          </Button>
        </motion.div>
      )}
    </div>
  )
}

