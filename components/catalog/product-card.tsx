"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Heart, Plus } from "lucide-react"
import { useLang } from "@/lib/i18n"

type Product = {
  id: number
  name: string
  price: string
  category: string
}

const NEW_IDS = [1, 2, 8]

export function ProductCard({ product, index }: { product: Product; index: number }) {
  const [wished, setWished] = useState(false)
  const [hovered, setHovered] = useState(false)
  const { t } = useLang()

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: (index % 4) * 0.07 }}
      className="group flex flex-col"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image placeholder */}
      <div className="relative overflow-hidden bg-muted aspect-[3/4]">
        {/* Number placeholder */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="font-serif text-[80px] leading-none select-none"
            style={{ color: "oklch(0.82 0.006 75)" }}
          >
            {product.id}
          </span>
        </div>

        {/* NEW badge */}
        {NEW_IDS.includes(product.id) && (
          <div className="absolute top-3 left-3 z-10">
            <span className="font-sans text-[9px] tracking-luxury bg-foreground text-background px-2 py-0.5">
              {t.catalog.newLabel}
            </span>
          </div>
        )}

        {/* Wishlist button */}
        <button
          onClick={() => setWished((w) => !w)}
          aria-label={t.catalog.wishlist}
          className="absolute top-3 right-3 z-10 p-1.5 transition-opacity duration-200"
          style={{ opacity: hovered || wished ? 1 : 0 }}
        >
          <Heart
            size={15}
            className="transition-colors duration-200"
            style={{
              fill: wished ? "oklch(0.635 0.115 74)" : "transparent",
              stroke: wished ? "oklch(0.635 0.115 74)" : "oklch(0.15 0.01 250)",
            }}
          />
        </button>

        {/* Add to bag overlay */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 z-10 flex"
          initial={false}
          animate={{ y: hovered ? 0 : "100%" }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          <button className="flex-1 flex items-center justify-between px-4 py-3 bg-foreground text-background hover:bg-accent hover:text-background transition-colors duration-200">
            <span className="font-sans text-[9px] tracking-luxury">{t.catalog.addToBag}</span>
            <Plus size={12} />
          </button>
        </motion.div>
      </div>

      {/* Product info */}
      <div className="pt-3 flex flex-col gap-1">
        <p className="font-sans text-[9px] tracking-luxury text-muted-foreground uppercase">
          {t.catalog.categories.find((c) => c.value === product.category)?.label ?? product.category}
        </p>
        <p className="font-sans text-[12px] tracking-luxury-sm text-foreground leading-snug">
          {product.name}
        </p>
        <p className="font-sans text-[11px] text-foreground/70 mt-0.5">{product.price}</p>
      </div>
    </motion.article>
  )
}
