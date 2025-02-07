"use client"
import Link from "next/link"
import { useState, useEffect, useRef, type KeyboardEvent } from "react"
import { useRouter } from "next/navigation"
import { CgProfile, CgShoppingCart } from "react-icons/cg"
import { FaSearch } from "react-icons/fa"
import { IoIosArrowDown } from "react-icons/io"
import { RxCross1, RxHamburgerMenu } from "react-icons/rx"
import type { Product } from "@/types/products"
import { client } from "@/sanity/lib/client"
import { motion, AnimatePresence } from "framer-motion"
import { SignInButton, UserButton, SignedIn, SignedOut } from "@clerk/nextjs"
import type React from "react" // Added import for React

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showBanner, setShowBanner] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<Product[]>([])
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const [products, setProducts] = useState<Product[]>([])
  const router = useRouter()

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.trim() === "") {
      setSearchResults([])
    } else {
      const filteredProducts = products.filter(
        (product) =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product._id.toLowerCase().includes(query.toLowerCase()),
      )
      setSearchResults(filteredProducts)
    }
  }

  const handleProductSelect = (product: Product) => {
    setSearchQuery(product.name)
    setSearchResults([])
    setIsSearchFocused(false)
    setIsMobileMenuOpen(false)
    router.push(`/product/${product._id}`)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      const selectedProduct =
        searchResults.find((product) => product.name.toLowerCase() === searchQuery.toLowerCase()) || searchResults[0]

      if (selectedProduct) {
        router.push(`/product/${selectedProduct._id}`)
      } else if (searchQuery.trim() !== "") {
        // If no exact match is found, but there's a search query, redirect to search results page
        router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
      }

      setIsSearchFocused(false)
      setSearchResults([])
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleKeyDown({ key: "Enter" } as KeyboardEvent<HTMLInputElement>)
  }

  const clearSearch = () => {
    setSearchQuery("")
    setSearchResults([])
    setIsSearchFocused(false)
    setIsMobileMenuOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  useEffect(() => {
    // Fetch products from Sanity
    const fetchProducts = async () => {
      const fetchedProducts = await client.fetch('*[_type == "product"]')
      setProducts(fetchedProducts)
    }
    fetchProducts()
  }, [])

  return (
    <div className="sticky top-0 z-50 bg-white">
      {/* Black Ribbon */}
      <AnimatePresence>
        {showBanner && (
          <motion.div
            className="bg-black text-white text-center py-2"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-center items-center gap-2 relative max-w-7xl mx-auto px-4">
              <p className="text-sm hidden sm:block">Sign up and get 20% off on your first order.</p>
              <p className="text-sm sm:hidden">Get 20% off - Sign up</p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <SignInButton mode="modal">
                  <button className="text-sm font-medium underline hover:text-gray-300 mr-20">Sign Up Now</button>
                </SignInButton>
              </motion.div>
              <button onClick={() => setShowBanner(false)} className="text-white hover:text-gray-300 absolute right-4">
                <RxCross1 className="text-white font-bold" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="bg-white font-sans border-b">
        <div className="px-4 mx-auto max-w-7xl sm:px-6">
          <nav className="relative flex items-center justify-between h-16 bg-white lg:h-24">
            {/* Mobile Menu Button */}
            <motion.button
              type="button"
              onClick={toggleMobileMenu}
              className="inline-flex p-2 text-black transition-all duration-200 rounded-md lg:hidden focus:bg-gray-100 hover:bg-gray-100"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <RxHamburgerMenu className="w-6 h-6" />
            </motion.button>

            {/* Logo */}
            <motion.div
              className="flex-shrink-0 font-extrabold text-2xl lg:text-4xl drop-shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              <Link href="/" className="flex">
                SHOP.CO
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex lg:items-center lg:ml-10 lg:mr-auto lg:space-x-10 font-semibold text-[24px] drop-shadow-lg shadow-gray-300">
              <motion.div whileHover={{ scale: 1.05 }}>
                <Link
                  href="/cart"
                  className="flex items-center text-[18px] text-black transition-all duration-200 hover:font-bold hover:border-b-2 hover:shadow-black focus:shadow-outline"
                >
                  Shop
                  <IoIosArrowDown className="ml-1" size={20} />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Link
                  href="/casual"
                  className="flex items-center text-[18px] text-black transition-all duration-200 hover:font-bold hover:border-b-2 hover:shadow-black focus:shadow-outline"
                >
                  On Sale
                  <IoIosArrowDown className="ml-1" size={20} />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Link
                  href="/all-products"
                  className="text-[18px] text-black transition-all duration-200 hover:font-bold hover:border-b-2 hover:shadow-black focus:shadow-outline"
                >
                  New Arrival
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Link
                  href="/casual"
                  className="text-[18px] text-black transition-all duration-200 hover:font-bold hover:border-b-2 hover:shadow-black focus:shadow-outline"
                >
                  Brands
                </Link>
              </motion.div>
            </div>

            {/* Search and Icons Container */}
            <div className="flex items-center gap-4 lg:gap-6">
              {/* Search Bar */}
              <motion.div
                ref={searchRef}
                className="hidden md:flex items-center bg-[#F0F0F0] rounded-full shadow-xl w-full max-w-md relative"
                whileHover={{ scale: 1.02 }}
              >
                <form ref={formRef} onSubmit={handleSubmit} className="flex items-center w-full">
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  >
                    <FaSearch className="text-2xl font-semibold" />
                  </button>
                  <input
                    type="text"
                    className="flex-1 py-3 px-4 text-lg bg-transparent focus:outline-none"
                    placeholder="What are you looking for?"
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onKeyDown={handleKeyDown}
                  />
                  {isSearchFocused && searchResults.length > 0 && (
                    <div className="absolute top-full left-0 right-0 bg-white mt-2 rounded-md shadow-lg max-h-60 overflow-y-auto z-10">
                      {searchResults.map((product) => (
                        <div
                          key={product._id}
                          className="p-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => handleProductSelect(product)}
                        >
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-gray-500">ID: {product._id}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </form>
              </motion.div>

              {/* Mobile Search Icon */}
              <motion.button
                className="md:hidden text-black"
                onClick={() => setIsMobileMenuOpen(true)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaSearch className="text-2xl" />
              </motion.button>

              {/* Cart and Profile Icons */}
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Link href="/cart" className="text-black">
                  <CgShoppingCart className="text-2xl hover:text-gray-700 transition-colors duration-200" />
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <SignedOut>
                  <div className="text-black">
                    <SignInButton mode="modal">
                      <button className="hover:text-gray-700 transition-colors duration-200">
                        <CgProfile className="text-2xl" />
                      </button>
                    </SignInButton>
                  </div>
                </SignedOut>
                <SignedIn>
                  <UserButton
                    afterSignOutUrl="/"
                    appearance={{
                      elements: {
                        avatarBox: "w-9 h-9",
                      },
                    }}
                  />
                </SignedIn>
              </motion.div>
            </div>
          </nav>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                className="fixed inset-0 bg-white z-50 lg:hidden"
                initial={{ opacity: 0, x: "-100%" }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: "-100%" }}
                transition={{ type: "tween", duration: 0.3 }}
              >
                <div className="flex justify-between items-center p-4 border-b">
                  <span className="font-bold text-xl">Menu</span>
                  <button onClick={toggleMobileMenu}>
                    <RxCross1 className="text-2xl" />
                  </button>
                </div>
                <nav className="flex flex-col p-4 space-y-4">
                  <motion.div whileTap={{ scale: 0.95 }}>
                    <Link
                      href="/cart"
                      className="flex items-center justify-between py-2 text-lg font-medium"
                      onClick={toggleMobileMenu}
                    >
                      Shop
                      <IoIosArrowDown size={20} />
                    </Link>
                  </motion.div>
                  <motion.div whileTap={{ scale: 0.95 }}>
                    <Link
                      href="/casual"
                      className="flex items-center justify-between py-2 text-lg font-medium"
                      onClick={toggleMobileMenu}
                    >
                      On Sale
                      <IoIosArrowDown size={20} />
                    </Link>
                  </motion.div>
                  <motion.div whileTap={{ scale: 0.95 }}>
                    <Link href="/" className="py-2 text-lg font-medium" onClick={toggleMobileMenu}>
                      New Arrival
                    </Link>
                  </motion.div>
                  <motion.div whileTap={{ scale: 0.95 }}>
                    <Link href="/all-products" className="py-2 text-lg font-medium" onClick={toggleMobileMenu}>
                      Brands
                    </Link>
                  </motion.div>

                  {/* Mobile Search Bar */}
                  <motion.div whileHover={{ scale: 1.02 }}>
                    <div className="relative mt-4 mx-4">
                      <form onSubmit={handleSubmit} className="flex items-center bg-[#F0F0F0] rounded-full relative">
                        <button
                          type="button"
                          onClick={clearSearch}
                          className="text-gray-400 hover:text-gray-600 transition-colors duration-200 ml-4"
                        >
                          <FaSearch className="text-xl" />
                        </button>
                        <input
                          type="text"
                          className="flex-1 py-2 px-4 text-base bg-transparent focus:outline-none"
                          placeholder="What are you looking for?"
                          value={searchQuery}
                          onChange={(e) => handleSearch(e.target.value)}
                          onFocus={() => setIsSearchFocused(true)}
                          onKeyDown={handleKeyDown}
                        />
                      </form>
                      {isSearchFocused && searchResults.length > 0 && (
                        <div className="absolute top-full left-0 right-0 bg-white mt-2 rounded-md shadow-lg max-h-60 overflow-y-auto z-10">
                          {searchResults.map((product) => (
                            <div
                              key={product._id}
                              className="p-2 hover:bg-gray-100 cursor-pointer"
                              onClick={() => handleProductSelect(product)}
                            >
                              <p className="font-medium">{product.name}</p>
                              <p className="text-sm text-gray-500">ID: {product._id}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>
    </div>
  )
}

export default Header

