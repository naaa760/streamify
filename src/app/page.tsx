"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#eb5757] to-black flex flex-col items-center justify-center p-4">
      {/* Navigation */}
      <nav className="fixed top-0 w-full max-w-6xl mx-auto p-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="text-white font-bold text-2xl flex items-center gap-2">
            <Image src="/logo.png" alt="Logo" width={32} height={32} />
            ShopiFrame
          </div>
          <div className="hidden md:flex gap-6 text-gray-300">
            <Link href="#features">Features</Link>
            <Link href="#how-it-works">How it works</Link>
            <Link href="#pricing">Pricing</Link>
            <Link href="#faq">FAQ</Link>
            <Link href="#docs">Doc</Link>
          </div>
        </div>
        <button className="bg-white text-[#eb5757] px-4 py-2 rounded-lg font-medium hover:bg-opacity-90 transition-all">
          Get Started
        </button>
      </nav>

      {/* Plugin Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#eb5757] text-white px-4 py-2 rounded-full mb-8"
      >
        🔌 Shopify Plugin for Framer
      </motion.div>

      {/* Main Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-6xl md:text-7xl font-bold text-white text-center mb-8 max-w-4xl"
      >
        Build beautiful
        <div className="flex items-center justify-center gap-2 my-2">
          <Image src="/shopify-icon.png" alt="Shopify" width={48} height={48} />
          <span>Shopify stores with</span>
        </div>
        Framer!
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-gray-300 text-center max-w-2xl mb-12"
      >
        Design and publish your e-commerce site in Framer, manage it with
        Shopify, and let ShopiFrame handle the rest.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex gap-4"
      >
        <button className="bg-[#eb5757] text-white px-6 py-3 rounded-lg font-medium hover:bg-opacity-90 transition-all">
          Start Free!
        </button>
        <button className="text-white flex items-center gap-2 px-6 py-3 hover:text-[#eb5757] transition-all">
          <span>▶</span> 15-Minute Tutorial
        </button>
      </motion.div>
    </main>
  );
}
