"use client"

import { use, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Navbar from "@/components/navbar"
import { useLang } from "@/lib/i18n"

const TONES = [
  "#e8e2d9", "#ddd6cc", "#e5dfd6", "#d8d1c7",
  "#ebe5dc", "#d5cec4", "#e0d9cf", "#dbd4ca",
  "#e3ddd4", "#d6cfc5", "#ece6dd", "#d9d2c8",
]

const PRODUCT_IMAGES = [1, 2, 3, 4] // 4 placeholder shots per product

const COLOR_SWATCHES = [
  { value: "ivory", hex: "#f0ece4", label: "Ivory" },
  { value: "noir", hex: "#1a1a1a", label: "Noir" },
  { value: "beige", hex: "#d4c9b2", label: "Beige" },
  { value: "camel", hex: "#b88b5e", label: "Camel" },
  { value: "bordeaux", hex: "#6b2232", label: "Bordeaux" },
]

function ImagePlaceholder({ num, tone, index }: { num: number; tone: string; index: number }) {
  return (
    <motion.div
      className="relative w-full flex-shrink-0"
      style={{ height: "100vh", backgroundColor: tone }}
      initial={{ x: -60, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
    >
      <div className="absolute inset-0 flex items-end justify-start p-12">
        <span
          className="font-serif select-none leading-none"
          style={{
            fontSize: "clamp(120px, 20vw, 280px)",
            color: "rgba(80,65,50,0.06)",
            letterSpacing: "-0.04em",
          }}
        >
          {String(num).padStart(2, "0")}
        </span>
      </div>
      {/* Shot number indicator */}
      <div className="absolute top-8 right-8 font-sans text-[9px] tracking-[0.28em]" style={{ color: "rgba(80,65,50,0.35)" }}>
        {String(index + 1).padStart(2, "0")} / {String(PRODUCT_IMAGES.length).padStart(2, "0")}
      </div>
    </motion.div>
  )
}

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { t } = useLang()
  const c = t.catalog

  const product = c.products.find((p) => String(p.id) === id) ?? c.products[0]
  const tone = TONES[(product.id - 1) % TONES.length]

  const [selectedColor, setSelectedColor] = useState(COLOR_SWATCHES[0].value)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    if (!selectedSize) return
    setAdded(true)
    setTimeout(() => setAdded(false), 2200)
  }

  return (
    <div style={{ backgroundColor: "#f8f5f0" }}>
      <Navbar />

      {/* ── Two-column layout ──────────────────────────────── */}
      <div className="flex min-h-screen">

        {/* LEFT — scrolling image stack */}
        <div className="w-1/2 flex flex-col" style={{ gap: "2px" }}>
          {PRODUCT_IMAGES.map((num, i) => (
            <ImagePlaceholder
              key={num}
              num={product.id * 10 + num}
              tone={i % 2 === 0 ? tone : TONES[(product.id + i) % TONES.length]}
              index={i}
            />
          ))}
        </div>

        {/* RIGHT — sticky info panel */}
        <div className="w-1/2 sticky top-0 h-screen flex flex-col justify-between py-28 px-12 xl:px-20" style={{ borderLeft: "1px solid #e8e2da" }}>

          {/* Top — breadcrumb */}
          <div>
            <Link
              href="/catalog"
              className="inline-flex items-center gap-3 font-sans text-[8px] tracking-[0.3em] transition-opacity hover:opacity-40"
              style={{ color: "#b0a090" }}
            >
              <svg width="18" height="6" viewBox="0 0 18 6" fill="none">
                <line x1="18" y1="3" x2="0" y2="3" stroke="currentColor" strokeWidth="0.75" />
                <polyline points="5,0.5 0,3 5,5.5" fill="none" stroke="currentColor" strokeWidth="0.75" />
              </svg>
              {c.title}
            </Link>
          </div>

          {/* Middle — product info */}
          <div className="flex flex-col gap-10">

            {/* Name + price */}
            <div>
              <motion.p
                className="font-sans text-[9px] tracking-[0.32em] mb-4 uppercase"
                style={{ color: "#b0a090" }}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                Maison Jacques Fath — Paris
              </motion.p>
              <motion.h1
                className="font-serif leading-tight text-balance"
                style={{ fontSize: "clamp(22px, 2.8vw, 38px)", letterSpacing: "0.06em", color: "#1a120a" }}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.07 }}
              >
                {product.name}
              </motion.h1>
              <motion.p
                className="font-sans mt-5"
                style={{ fontSize: "clamp(13px, 1.2vw, 18px)", letterSpacing: "0.12em", color: "#4a3a2a" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.16 }}
              >
                {product.price}
              </motion.p>
            </div>

            {/* Color */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.22 }}
            >
              <p className="font-sans text-[8px] tracking-[0.3em] mb-4" style={{ color: "#b0a090" }}>
                {c.filterLabels.color.toUpperCase()} —{" "}
                <span style={{ color: "#4a3a2a" }}>
                  {COLOR_SWATCHES.find((s) => s.value === selectedColor)?.label}
                </span>
              </p>
              <div className="flex items-center gap-4">
                {COLOR_SWATCHES.map((swatch) => (
                  <button
                    key={swatch.value}
                    aria-label={swatch.label}
                    onClick={() => setSelectedColor(swatch.value)}
                    className="relative transition-transform duration-200 hover:scale-110"
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: "50%",
                      backgroundColor: swatch.hex,
                      border: selectedColor === swatch.value
                        ? "2px solid #4a3a2a"
                        : "2px solid transparent",
                      outline: selectedColor === swatch.value ? "1px solid #c8bfb0" : "none",
                      outlineOffset: "3px",
                    }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Size */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <p className="font-sans text-[8px] tracking-[0.3em] mb-4" style={{ color: "#b0a090" }}>
                {c.filterLabels.size.toUpperCase()}
                {selectedSize && (
                  <span style={{ color: "#4a3a2a" }}> — {selectedSize}</span>
                )}
              </p>
              <div className="flex items-center gap-3">
                {c.sizes.map((s) => {
                  const on = selectedSize === s
                  return (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(on ? null : s)}
                      className="font-sans text-[9px] tracking-[0.18em] transition-all duration-200 flex items-center justify-center"
                      style={{
                        width: 40,
                        height: 40,
                        border: on ? "1px solid #1a120a" : "1px solid #d0c8be",
                        color: on ? "#1a120a" : "#9a8b7c",
                        backgroundColor: on ? "transparent" : "transparent",
                      }}
                    >
                      {s}
                    </button>
                  )
                })}
              </div>
            </motion.div>

            {/* Description */}
            <motion.p
              className="font-sans text-[11px] leading-relaxed max-w-sm"
              style={{ color: "#7a6e63", letterSpacing: "0.04em" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.38 }}
            >
              An exceptional piece from the Maison Jacques Fath new season collection,
              crafted with meticulous attention to detail in our Parisian atelier.
              Composed of the finest materials, this piece embodies the timeless elegance
              that defines the Maison.
            </motion.p>
          </div>

          {/* Bottom — CTA */}
          <motion.div
            className="flex flex-col gap-4"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.44 }}
          >
            {/* Size warning */}
            <AnimatePresence>
              {!selectedSize && (
                <motion.p
                  className="font-sans text-[8px] tracking-[0.22em]"
                  style={{ color: "#b0a090" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  — {c.filterLabels.size} {t.catalog.filterLabels.size === "SIZE" ? "required" : "requis"}
                </motion.p>
              )}
            </AnimatePresence>

            {/* Add to bag */}
            <button
              onClick={handleAdd}
              disabled={!selectedSize}
              className="relative w-full h-14 overflow-hidden font-sans text-[9px] tracking-[0.36em] transition-opacity duration-200"
              style={{
                backgroundColor: selectedSize ? "#1a120a" : "#c8bfb0",
                color: "#f8f5f0",
                opacity: selectedSize ? 1 : 0.6,
                cursor: selectedSize ? "pointer" : "not-allowed",
              }}
            >
              <AnimatePresence mode="wait">
                {added ? (
                  <motion.span
                    key="added"
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.35 }}
                  >
                    ✓
                  </motion.span>
                ) : (
                  <motion.span
                    key="add"
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.35 }}
                  >
                    {c.addToBag}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Wishlist */}
            <button
              className="w-full h-12 font-sans text-[9px] tracking-[0.28em] transition-colors duration-200"
              style={{ border: "1px solid #d0c8be", color: "#9a8b7c", backgroundColor: "transparent" }}
            >
              {c.wishlist.toUpperCase()}
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
