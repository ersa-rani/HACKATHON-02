"use client"

import { motion } from "framer-motion"
import { Button } from "@/app/components/ui/button"
import Link from "next/link"

export default function CheckoutSuccessPage() {
  return (
    <motion.div
      className="min-h-[60vh] flex flex-col items-center justify-center gap-6 px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        className="text-3xl font-bold text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Thank you for your order!
      </motion.h1>
      <motion.p
        className="text-center text-gray-600 max-w-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        We have received your order and will process it shortly. You will receive a confirmation email with your order
        details.
      </motion.p>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
        <Button asChild>
          <Link href="/">Continue Shopping</Link>
        </Button>
      </motion.div>
    </motion.div>
  )
}

