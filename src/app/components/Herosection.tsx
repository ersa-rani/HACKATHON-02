"use client"

import Image from "next/image"
import { motion } from "framer-motion"

function HeroSection() {
  return (
    <section className="relative bg-white flex flex-col lg:flex-row h-screen lg:h-[80vh]">
      {/* Hero Image - Visible only on desktop/laptop */}
      <motion.div
        className="absolute inset-0 z-0 hidden lg:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Image
          src="/images/Rectangle 2.svg"
          alt="Hero Image"
          layout="fill"
          objectFit="cover"
          objectPosition="center 30%"
          quality={100}
          priority
          className="lg:object-right"
        />
      </motion.div>

      {/* Fashion Models Image - Visible only on mobile */}
      <motion.div
        className="absolute inset-0 z-0 lg:hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Image
          src="/images/hero-mob.png"
          alt="Fashion Models"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          quality={100}
          priority
        />
      </motion.div>

      {/* Overlay for better text visibility */}
      <div className="absolute inset-0 bg-white/50 lg:bg-transparent z-0"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center lg:items-start justify-center lg:justify-start lg:mt-20 lg:ml-20 px-4 py-12 sm:px-6 lg:px-8 text-center lg:text-left h-full lg:h-auto">
        <div className="max-w-3xl mx-auto text-black">
          {/* Title */}
          <motion.h1
            className="text-3xl lg:text-4xl font-extrabold sm:text-5xl lg:text-7xl mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            FIND CLOTHES <br className="hidden sm:inline" /> THAT MATCHES <br className="hidden sm:inline" /> YOUR STYLE
          </motion.h1>
          {/* Subtitle */}
          <motion.p
            className="text-base lg:text-lg mb-8 text-gray-700 lg:text-gray-500 max-w-md lg:max-w-none mx-auto lg:mx-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality
            and cater to your sense of style.
          </motion.p>
          {/* Button */}
          <motion.a
            href="/all-products"
            className="inline-block px-10 lg:px-20 py-3 text-base lg:text-lg font-medium text-white bg-black rounded-full shadow-xl hover:bg-gray-100 hover:text-black transition duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Shop Now
          </motion.a>
        </div>
      </div>
    </section>
  )
}

export default HeroSection

