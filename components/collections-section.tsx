"use client"

import { useState } from "react"
import { motion } from "framer-motion"

const categories = [
  { name: "WOMEN", number: "2", bg: "#2e2c29" },
  { name: "MEN", number: "3", bg: "#1e1e1e" },
  { name: "THE HOUSE", number: "4", bg: "#5a1a1a" },
]

export default function CollectionsSection() {
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <section
      className="w-full flex"
      style={{ height: "75vh" }}
      aria-label="Categories"
      onMouseLeave={() => setHovered(null)}
    >
      {categories.map((cat, i) => {
        const isActive = hovered === cat.name
        const isInactive = hovered !== null && hovered !== cat.name

        return (
          <motion.a
            key={cat.name}
            href="#"
            aria-label={cat.name}
            onMouseEnter={() => setHovered(cat.name)}
            className="relative flex flex-col justify-end overflow-hidden cursor-pointer"
            style={{
              backgroundColor: cat.bg,
              flex: isActive ? "2.2" : isInactive ? "0.8" : "1",
              transition: "flex 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: i * 0.15 }}
          >
            {/* Numbered placeholder */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span
                className="font-serif text-white/10 select-none"
                style={{
                  fontSize: "clamp(4rem, 8vw, 8rem)",
                  transition: "opacity 0.5s ease",
                  opacity: isInactive ? 0.4 : 1,
                }}
              >
                {cat.number}
              </span>
            </div>

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

            {/* Expand line accent */}
            <div
              className="absolute bottom-0 left-0 h-[2px] bg-gold"
              style={{
                width: isActive ? "100%" : "0%",
                transition: "width 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            />

            {/* Label */}
            <div className="relative z-10 p-5 pb-7">
              <p
                className="font-serif tracking-luxury text-white"
                style={{
                  fontSize: isActive ? "1rem" : "0.8rem",
                  transition: "font-size 0.5s ease",
                }}
              >
                {cat.name}
              </p>
              <p
                className="font-sans text-[9px] tracking-luxury mt-1"
                style={{
                  color: isActive ? "var(--color-gold)" : "rgba(255,255,255,0.5)",
                  transition: "color 0.4s ease",
                }}
              >
                Discover
              </p>
            </div>
          </motion.a>
        )
      })}
    </section>
  )
}
