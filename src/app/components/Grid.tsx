"use client"
import Image from "next/image"
import { motion } from "framer-motion"

function Grid() {
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
      className="flex justify-center items-center py-10 mb-12 h-[100%]"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Outer Container */}
      <motion.div
        className="bg-[#F0F0F0] rounded-2xl shadow-md border-2 p-10 w-[90%] max-w-6xl"
        variants={itemVariants}
      >
        {/* Title */}
        <motion.h2 className="text-center text-4xl font-extrabold mb-8" variants={itemVariants}>
          BROWSE BY DRESS STYLE
        </motion.h2>

        {/* Grid Container */}
        <motion.div className="grid grid-rows-2 gap-4" variants={containerVariants}>
          {/* Row 1 */}
          <motion.div className="grid grid-cols-3 gap-4" variants={containerVariants}>
            {/* Casual */}
            <motion.div
              className="col-span-1 relative rounded-lg overflow-hidden h-56"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Image src="/images/image 11.svg" alt="Casual" layout="fill" objectFit="cover" className="rounded-lg" />
              <p className="absolute text-xl top-2 left-2 bg-white bg-opacity-80 text-black px-2 py-1 rounded-sm font-semibold text-sm">
                Casual
              </p>
            </motion.div>

            {/* Formal */}
            <motion.div
              className="col-span-2 relative rounded-lg overflow-hidden shadow-md h-56"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Image
                src="/images/image 13 (1).svg"
                alt="Formal"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
              <p className="absolute text-xl top-2 left-2 bg-white bg-opacity-80 text-black px-2 py-1 rounded-sm font-semibold text-sm">
                Formal
              </p>
            </motion.div>
          </motion.div>

          {/* Row 2 */}
          <motion.div className="grid grid-cols-3 gap-4" variants={containerVariants}>
            {/* Party */}
            <motion.div
              className="col-span-2 relative rounded-lg overflow-hidden shadow-md h-56"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Image src="/images/image 12.svg" alt="Party" layout="fill" objectFit="cover" className="rounded-lg" />
              <p className="absolute text-xl top-2 left-2 bg-white bg-opacity-80 text-black px-2 py-1 rounded-sm font-semibold text-sm">
                Party
              </p>
            </motion.div>

            {/* Gym */}
            <motion.div
              className="col-span-1 relative rounded-lg overflow-hidden shadow-md h-56"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Image src="/images/image 14.svg" alt="Gym" layout="fill" objectFit="cover" className="rounded-lg" />
              <p className="absolute text-xl top-2 left-2 bg-white bg-opacity-80 text-black px-2 py-1 rounded-sm font-semibold text-sm">
                Gym
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default Grid

