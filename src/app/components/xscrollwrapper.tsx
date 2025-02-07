"use client"
import Image from "next/image"
import { useState, useRef, useEffect } from "react"
import { FiArrowLeft, FiArrowRight } from "react-icons/fi"
import { motion } from "framer-motion"

const Xscrollwrapper = () => {
  const features = [
    { image: "/images/Frame 30.svg" },
    { image: "/images/Frame 30.svg" },
    { image: "/images/Frame 30.svg" },
    { image: "/images/Frame 30.svg" },
    { image: "/images/Frame 30.svg" },
    { image: "/images/Frame 30.svg" },
    { image: "/images/Frame 30.svg" },
    { image: "/images/Frame 30.svg" },
    { image: "/images/Frame 30.svg" },
  ]

  const [scrollPosition, setScrollPosition] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const scrollByAmount = 300

  const scrollLeft = () => {
    if (containerRef.current) {
      const newPosition = Math.max(0, scrollPosition - scrollByAmount)
      containerRef.current.scrollTo({ left: newPosition, behavior: "smooth" })
      setScrollPosition(newPosition)
    }
  }

  const scrollRight = () => {
    if (containerRef.current) {
      const maxScroll = containerRef.current.scrollWidth - containerRef.current.clientWidth
      const newPosition = Math.min(maxScroll, scrollPosition + scrollByAmount)
      containerRef.current.scrollTo({ left: newPosition, behavior: "smooth" })
      setScrollPosition(newPosition)
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        setScrollPosition(containerRef.current.scrollLeft)
      }
    }

    containerRef.current?.addEventListener("scroll", handleScroll)
    return () => containerRef.current?.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.div
      className="container mx-auto px-4 py-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Heading with Arrows */}
      <div className="flex items-center justify-between mb-6">
        <motion.h2
          className="text-4xl font-extrabold"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          OUR HAPPY CUSTOMERS
        </motion.h2>
        <div className="flex items-center space-x-4">
          <motion.button
            onClick={scrollLeft}
            className="text-black hover:text-gray-700 p-1"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FiArrowLeft size={24} />
          </motion.button>
          <motion.button
            onClick={scrollRight}
            className="text-black hover:text-gray-700 p-1"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FiArrowRight size={24} />
          </motion.button>
        </div>
      </div>

      {/* Slider Wrapper */}
      <div className="relative">
        {/* Slider */}
        <motion.div
          ref={containerRef}
          className="flex space-x-4 overflow-x-scroll scrollbar-hide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="p-6 bg-white rounded-lg shadow-lg min-w-[250px]"
              whileHover={{ scale: 1.05, boxShadow: "0px 5px 15px rgba(0,0,0,0.1)" }}
              transition={{ duration: 0.2 }}
            >
              <div className="relative w-full h-40">
                <Image
                  src={feature.image || "/placeholder.svg"}
                  alt={`Feature ${index + 1}`}
                  layout="fill"
                  objectFit="contain"
                  className="rounded-lg"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Xscrollwrapper

