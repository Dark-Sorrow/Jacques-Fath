"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { useLang } from "@/lib/i18n"

export default function CollectionsSection() {
  const [hovered, setHovered] = useState<string | null>(null)
  const { t } = useLang()

  const categories = [
    { key: "women", label: t.collections.women, bg: "#2e2c29", image: "/collection-women.png" },
    { key: "men", label: t.collections.men, bg: "#1e1e1e", image: "/collection-men.png" },
    { key: "accessories", label: t.collections.accessories, bg: "#c8955e", image: "/images/products/bag-001.jpg" },
  ]

  return (
    <section
      className="w-full flex overflow-hidden"
      style={{ height: "75vh" }}
      aria-label="Categories"
      onMouseLeave={() => setHovered(null)}
    >
      {categories.map((cat, i) => {
        const isActive = hovered === cat.key
        const isInactive = hovered !== null && hovered !== cat.key

        return (
          <motion.a
            key={cat.key}
            href="#"
            aria-label={cat.label}
            onMouseEnter={() => setHovered(cat.key)}
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
            <div className="absolute inset-0">
              <Image
                src={cat.image}
                alt={cat.label}
                fill
                className="object-cover object-center"
                style={{
                  transition: "transform 0.9s cubic-bezier(0.22, 1, 0.36, 1)",
                  transform: isActive ? "scale(1.04)" : "scale(1)",
                }}
              />
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
                {cat.label}
              </p>
              <p
                className="font-sans text-[9px] tracking-luxury mt-1"
                style={{
                  color: isActive ? "var(--color-gold)" : "rgba(255,255,255,0.5)",
                  transition: "color 0.4s ease",
                }}
              >
                {t.collections.discover}
              </p>
            </div>
          </motion.a>
        )
      })}
    </section>
  )
}
