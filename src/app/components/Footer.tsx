"use client"

import type React from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

// Define the structure for social link items
interface SocialLink {
  name: string
  href: string
  icon: string
}

// Configuration object for social links
const socialLinks: SocialLink[] = [
  
  { name: "LinkedIn", href: "https://www.facebook.com/share/15t5QQFYLw/", icon: "/images/2.svg" },
  { name: "Facebook", href: "https://www.linkedin.com/in/ersa-rani-b4b4842b6?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", icon: "/images/1.svg" },
  { name: "Instagram", href: "https://www.instagram.com/ersa_rani?igsh=bHoydmptOXMyOGM0", icon: "/images/3.svg" },
  { name: "Github", href: "https://github.com/ersa-rani", icon: "/images/4.svg" },
]

const Footer: React.FC = () => {
  return (
    <div className="relative mt-8 ">
      {/* Overlapping Black Section */}
      <motion.div
        className="bg-black rounded-2xl text-white py-6 px-4 flex flex-col md:flex-row justify-between items-center ml-20 mr-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-5xl font-extrabold ml-5 mb-4 md:mb-0">
          STAY UP TO DATE ABOUT <br /> OUR LATEST OFFERS
        </h2>
        <div className="flex-cols p-5">
          <div className="flex items-center md:w-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="px-4 py-2 rounded-full w-full md:max-w-sm text-black mb-3"
              aria-label="Email Address"
            />
          </div>
          <motion.button
            className="bg-white text-black font-bold px-6 py-2 rounded-full hover:bg-gray-200"
            aria-label="Subscribe to Newsletter"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Subscribe to Newsletter
          </motion.button>
        </div>
      </motion.div>

      <footer className="bg-[#F0F0F0] text-black py-10 ">
        <div className="ml-20 max-w-8xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-x-8 px-4">
          {/* Exclusive Section */}
          <div className="mr-4 mt-0 items-start pr-4">
            <h1 className="font-sans font-extrabold text-[40px] drop-shadow-lg shadow-black mb-4">SHOP.CO</h1>
            <p className="mb-4 text-gray-500 text-[14px]">
              We have clothes that suit your style and which you're proud to wear. From women to men.
            </p>

            <div className="flex space-x-4 mt-6">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-400"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Image src={link.icon || "/placeholder.svg"} alt={link.name} width={24} height={24} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Company Section */}
          <div className="text-gray-500 space-y-2">
            <h4 className="text-black text-lg mb-2">COMPANY</h4>
            <ul className="space-y-2 text-[16px]">
              {["About", "Features", "Works", "Career"].map((item, index) => (
                <motion.li key={index} whileHover={{ x: 5 }}>
                  <Link href="#" className="hover:underline">
                    {item}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Help Section */}
          <div>
            <h4 className="text-lg mb-2">HELP</h4>
            <ul className="space-y-2 text-gray-500 text-[16px]">
              {["Customer Support", "Delivery Details", "Term & Conditions", "Privacy Policy"].map((item, index) => (
                <motion.li key={index} whileHover={{ x: 5 }}>
                  <Link href="#" className="hover:underline">
                    {item}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* FAQ Section */}
          <div>
            <h4 className="text-lg mb-2">FAQ</h4>
            <ul className="space-y-2 text-gray-500 text-[16px] ">
              {["Account", "Manage Deliveries", "Orders", "Payments"].map((item, index) => (
                <motion.li key={index} whileHover={{ x: 5 }}>
                  <Link href="#" className="hover:underline">
                    {item}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Resources Section */}
          <div>
            <h4 className="text-lg mb-2">RESOURCES</h4>
            <ul className="space-y-2 text-gray-500  text-[16px]">
              {["Free eBooks", "Development Tutorial", "How to - Blog", "Youtube Playlist"].map((item, index) => (
                <motion.li key={index} whileHover={{ x: 5 }}>
                  <Link href="#" className="hover:underline">
                    {item}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="flex justify-between items-center text-[#6c6464] mt-10 border-t border-gray-700 pt-5 px-20">
          {/* Text on the left */}
          <p>Shop.co © 2000-2023. All Rights Reserved</p>

          {/* Icons on the right */}
          <div className="flex space-x-4">
            {["Badge", "Badge (1)", "Badge (2)", "Badge (3)", "Badge (4)"].map((badge, index) => (
              <motion.a
                key={index}
                href="#"
                className="hover:text-gray-400"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Image src={`/images/${badge}.svg`} alt={`Payment Badge ${index + 1}`} width={46} height={30} />
              </motion.a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer

