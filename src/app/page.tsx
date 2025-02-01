"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { StarBackground } from "@/components/StarBackground";
import { MobileMenu } from "@/components/MobileMenu";
import { AnalyticsDemo } from "@/components/AnalyticsDemo";
import { DashboardProvider } from "@/context/DashboardContext";
import { DashboardLayout } from "@/components/DashboardLayout";

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);

  // Handle scroll to show dashboard
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      // Show dashboard when scrolled 20% of the viewport height
      setShowDashboard(scrollPosition > windowHeight * 0.2);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to dashboard function
  const scrollToDashboard = () => {
    const windowHeight = window.innerHeight;
    window.scrollTo({
      top: windowHeight,
      behavior: "smooth",
    });
  };

  return (
    <DashboardProvider>
      <main className="relative">
        {/* Landing Page Section */}
        <section className="min-h-screen sticky top-0 bg-gradient-to-br from-[#eb5757] to-black flex flex-col items-center justify-center p-4 relative overflow-hidden">
          <StarBackground />
          <MobileMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          />

          {/* Content with increased z-index to appear above stars */}
          <div className="relative z-10 w-full max-w-7xl mx-auto">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 w-full max-w-7xl mx-auto p-4 flex items-center justify-between bg-black/20 backdrop-blur-sm lg:bg-transparent lg:backdrop-blur-none">
              <div className="flex items-center gap-8">
                <div className="text-white font-bold text-xl md:text-2xl flex items-center gap-2">
                  <Image
                    src="/logo.png"
                    alt="Logo"
                    width={32}
                    height={32}
                    className="w-6 h-6 md:w-8 md:h-8"
                  />
                  <span className="hidden sm:inline">S</span>
                </div>
                <div className="hidden md:flex gap-4 lg:gap-6 text-gray-300 text-sm lg:text-base">
                  <Link
                    href="#features"
                    className="hover:text-white transition-colors"
                  >
                    Features
                  </Link>
                  <Link
                    href="#how-it-works"
                    className="hover:text-white transition-colors"
                  >
                    How it works
                  </Link>
                  <Link
                    href="#pricing"
                    className="hover:text-white transition-colors"
                  >
                    Pricing
                  </Link>
                  <Link
                    href="#faq"
                    className="hover:text-white transition-colors"
                  >
                    FAQ
                  </Link>
                  <Link
                    href="#docs"
                    className="hover:text-white transition-colors"
                  >
                    Doc
                  </Link>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button className="bg-white text-[#eb5757] px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-sm md:text-base font-medium hover:bg-opacity-90 transition-all">
                  Get Started
                </button>
                <button className="md:hidden text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                  </svg>
                </button>
              </div>
            </nav>

            {/* Main Content */}
            <div className="mt-20 md:mt-24 flex flex-col items-center px-4">
              {/* Plugin Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#eb5757] text-white px-4 py-2 rounded-full mb-6 md:mb-8 backdrop-blur-sm bg-opacity-80 text-sm md:text-base"
              >
                🔌 Streamify Plugin for Framer
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center mb-6 md:mb-8 max-w-4xl mx-auto"
              >
                <span className="inline-grid grid-cols-1 gap-2">
                  <span className="bg-gradient-to-r from-gray-900 via-gray-400 to-gray-800 text-transparent bg-clip-text hover:bg-gradient-to-l transition-all duration-300 cursor-pointer">
                    Music streaming
                  </span>
                  <span className="flex items-center justify-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-gray-700">
                    <span className="mr-2">analytics turns</span>
                    <motion.span
                      className="text-lime-300"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                      }}
                    >
                      data
                    </motion.span>
                  </span>
                  <span className="bg-gradient-to-r from-gray-800 via-gray-500 to-gray-700 text-transparent bg-clip-text hover:bg-gradient-to-l transition-all duration-300 cursor-pointer">
                    into sound decisions!
                  </span>
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-gray-300 text-center max-w-2xl mb-8 md:mb-12 text-sm md:text-base px-4"
              >
                Design and publish your e-commerce site in Framer, manage it
                with Shopify, and let ShopiFrame handle the rest.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
              >
                <button className="bg-[#eb5757] text-white px-6 py-3 rounded-lg font-medium hover:bg-opacity-90 transition-all text-sm md:text-base w-full sm:w-auto">
                  Start Free!
                </button>
                <button className="text-white flex items-center justify-center gap-2 px-6 py-3 hover:text-[#eb5757] transition-all text-sm md:text-base w-full sm:w-auto">
                  <span>▶</span> 15-Minute Tutorial
                </button>
              </motion.div>
            </div>

            {/* Updated Scroll Indicator */}
            <motion.button
              onClick={scrollToDashboard}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white text-center cursor-pointer hover:text-[#eb5757] transition-colors"
            >
              <p className="text-sm mb-2">Explore Dashboard</p>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-2xl"
              >
                ↓
              </motion.div>
            </motion.button>
          </div>
        </section>

        {/* Dashboard Section */}
        <section className="relative min-h-screen bg-gradient-to-br from-[#eb5757] to-black">
          <AnimatePresence>
            {showDashboard && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.5 }}
                className="w-full"
              >
                <DashboardLayout />
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </main>
    </DashboardProvider>
  );
}
