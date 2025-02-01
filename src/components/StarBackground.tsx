"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
}

interface ShootingStar {
  id: number;
  startX: number;
  startY: number;
  duration: number;
}

export const StarBackground = () => {
  const [stars, setStars] = useState<Star[]>([]);
  const [shootingStars, setShootingStars] = useState<ShootingStar[]>([]);

  // Generate random stars
  useEffect(() => {
    const generateStars = () => {
      const newStars: Star[] = [];
      for (let i = 0; i < 50; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 2 + 1,
          duration: Math.random() * 3 + 1,
        });
      }
      setStars(newStars);
    };

    generateStars();
  }, []);

  // Generate shooting stars periodically
  useEffect(() => {
    const generateShootingStar = () => {
      const newShootingStar: ShootingStar = {
        id: Date.now(),
        startX: Math.random() * 100,
        startY: Math.random() * 100,
        duration: Math.random() * 1 + 0.5,
      };
      setShootingStars((prev) => [...prev, newShootingStar]);

      // Remove shooting star after animation
      setTimeout(() => {
        setShootingStars((prev) =>
          prev.filter((star) => star.id !== newShootingStar.id)
        );
      }, newShootingStar.duration * 1000);
    };

    const interval = setInterval(generateShootingStar, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Twinkling stars */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute bg-white rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Shooting stars */}
      {shootingStars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute h-px w-12 bg-gradient-to-r from-transparent via-white to-transparent"
          style={{
            left: `${star.startX}%`,
            top: `${star.startY}%`,
          }}
          animate={{
            x: ["0%", "150%"],
            y: ["0%", "150%"],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: star.duration,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
};
