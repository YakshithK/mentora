"use client"

import { FaMailBulk, FaPhone, FaArrowUp, FaGithub } from "react-icons/fa"
import { useCallback } from "react"
import Link from "next/link"

const Footer = () => {
  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }, [])

  return (
    <footer className="w-full">
      {/* Main Footer */}
      <div className="bg-purple-500 pt-12 md:pt-24 pb-6 md:pb-8 px-4 sm:px-8 md:px-12 mt-32">
        <div className="max-w-7xl mx-auto">
          {/* CTA Section */}
          <div className="mb-8 md:mb-10">
            <p className="text-white/80 mb-1 md:mb-2 uppercase text-sm md:text-base">Ready to ace your assignment?</p>
            <Link href="/dashboard">
            <button className="cursor-pointer bg-white text-purple-700 hover:bg-purple-600 hover:text-white transition-colors duration-200 text-base sm:text-lg md:text-xl font-medium px-6 py-3 rounded-md shadow hover:shadow-lg">
                Take me to dashboard
            </button>
            </Link>
            <div className="text-white flex items-center mt-3 md:mt-4 space-x-3 md:space-x-4">
              <FaPhone className="text-sm md:text-base" />
              <p className="text-sm md:text-base">(123)-456-7890</p>
            </div>
            <div className="text-white flex items-center mt-2 md:mt-4 space-x-3 md:space-x-4">
              <FaMailBulk className="text-sm md:text-base" />
              <p className="text-sm md:text-base break-all md:break-normal">mentoraorg00@gmail.com</p>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-white/10 pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
            <div className="flex gap-6 items-center">
              <a href="/privacy-policy" className="text-white/80 hover:text-white text-xs sm:text-sm">
                Privacy Policy
              </a>
              <Link
                href="https://github.com/YakshithK/mentora"
                target="_blank"
                className="text-white/80 hover:text-white text-xs sm:text-sm flex items-center gap-1"
              >
                <FaGithub className="text-sm md:text-base" />
                Github
              </Link>
              <button
                onClick={scrollToTop}
                className="text-white/80 hover:text-white text-xs sm:text-sm flex items-center gap-1 cursor-pointer"
                aria-label="Scroll to top"
              >
                <FaArrowUp className="text-sm md:text-base" />
                Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
