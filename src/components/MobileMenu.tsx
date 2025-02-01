"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            className="fixed right-0 top-0 bottom-0 w-64 bg-black/95 z-50 p-6"
          >
            <div className="flex flex-col gap-6">
              <nav className="flex flex-col gap-4">
                <Link
                  href="#features"
                  className="text-gray-300 hover:text-white transition-colors"
                  onClick={onClose}
                >
                  Features
                </Link>
                <Link
                  href="#how-it-works"
                  className="text-gray-300 hover:text-white transition-colors"
                  onClick={onClose}
                >
                  How it works
                </Link>
                <Link
                  href="#pricing"
                  className="text-gray-300 hover:text-white transition-colors"
                  onClick={onClose}
                >
                  Pricing
                </Link>
                <Link
                  href="#faq"
                  className="text-gray-300 hover:text-white transition-colors"
                  onClick={onClose}
                >
                  FAQ
                </Link>
                <Link
                  href="#docs"
                  className="text-gray-300 hover:text-white transition-colors"
                  onClick={onClose}
                >
                  Doc
                </Link>
              </nav>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
