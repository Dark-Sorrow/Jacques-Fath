"use client"

import { use, useState, useRef } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Navbar from "@/components/navbar"
import { useLang } from "@/lib/i18n"

const TONES = [
  "#e8e2d9", "#ddd6cc", "#e5dfd6", "#d8d1c7",
  "#ebe5dc", "#d5cec4", "#e0d9cf", "#dbd4ca",
]

const PHOTO_COUNT = 4

const COLOR_SWATCHES = [
  { value: "ivory",    hex: "#f0ece4", label: "Ivory"    },
  { value: "noir",     hex: "#1a1a1a", label: "Noir"     },
  { value: "beige",    hex: "#d4c9b2", label: "Beige"    },
  { value: "camel",    hex: "#b88b5e", label: "Camel"    },
  { value: "bordeaux", hex: "#6b2232", label: "Bordeaux" },
]

/* ── Single image panel driven by a 0→1 progress value ─────────── */
function PhotoSlide({
  num,
  tone,
  index,
  scrollContainer,
}: {
  num: number
  tone: string
  index: number
  scrollContainer: React.RefObject<HTMLElement | null>
}) {
  // Each slide occupies 1/PHOTO_COUNT of the total scroll range
  const segmentSize = 1 / PHOTO_COUNT
  const start = index * segmentSize
  const end   = start + segmentSize

  const { scrollYProgress } = useScroll({ container: scrollContainer as React.RefObject<HTMLElement> })

  // slide enters from left → rests at 0 → stays as next one arrives
  const x = useTransform(
    scrollYProgress,
    [Math.max(0, start - segmentSize), start, end],
    ["100%", "0%", "0%"]
  )
  const opacity = useTransform(
    scrollYProgress,
    [Math.max(0, start - segmentSize * 0.5), start],
    [0, 1]
  )
  // scale subtly breathes in
  const scale = useTransform(
    scrollYProgress,
    [start, end],
    [1, 1.03]
  )

  return (
    <motion.div
      className="absolute inset-0"
      style={{ x, opacity, scale, backgroundColor: tone, zIndex: index + 1 }}
    >
      {/* large muted number watermark */}
      <div className="absolute inset-0 flex items-end justify-start p-12 pointer-events-none select-none">
        <span
          className="font-serif leading-none"
          style={{
            fontSize: "clamp(140px, 22vw, 320px)",
            color: "rgba(80,65,50,0.06)",
            letterSpacing: "-0.04em",
          }}
        >
          {String(num).padStart(2, "0")}
        </span>
      </div>
      {/* counter */}
      <div
        className="absolute top-8 right-8 font-sans text-[9px] tracking-[0.28em]"
        style={{ color: "rgba(80,65,50,0.35)" }}
      >
        {String(index + 1).padStart(2, "0")} / {String(PHOTO_COUNT).padStart(2, "0")}
      </div>
    </motion.div>
  )
}

/* ── Main page ──────────────────────────────────────────────────── */
export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { t } = useLang()
  const c = t.catalog

  const product = c.products.find((p) => String(p.id) === id) ?? c.products[0]

  const [selectedColor, setSelectedColor] = useState(COLOR_SWATCHES[0].value)
  const [selectedSize,  setSelectedSize]  = useState<string | null>(null)
  const [added, setAdded] = useState(false)

  // The scrollable container — the outer wrapper
  const scrollRef = useRef<HTMLDivElement>(null)

  const handleAdd = () => {
    if (!selectedSize) return
    setAdded(true)
    setTimeout(() => setAdded(false), 2200)
  }

  return (
    // Full viewport, flex row, overflow on this element drives the scroll
    <div
      ref={scrollRef}
      className="flex flex-col md:flex-row"
      style={{ height: "100svh", overflowY: "auto", backgroundColor: "#f8f5f0" }}
    >
      <Navbar />

      {/* ── INNER ROW ─────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row w-full" style={{ minHeight: "100svh" }}>

        {/* LEFT — sticky viewport, slides stack inside */}
        <div
          className="hidden md:block md:w-1/2 sticky top-0"
          style={{ height: "100svh" }}
        >
          {/* scroll driver: tall enough to let each slide animate */}
          <div
            className="relative overflow-hidden"
            style={{ height: "100svh", width: "100%" }}
          >
            {Array.from({ length: PHOTO_COUNT }, (_, i) => (
              <PhotoSlide
                key={i}
                num={product.id * 10 + i + 1}
                tone={TONES[(product.id - 1 + i) % TONES.length]}
                index={i}
                scrollContainer={scrollRef}
              />
            ))}
          </div>
        </div>

        {/* RIGHT — sticky info panel */}
        <div
          className="md:w-1/2 md:sticky md:top-0 md:h-screen flex flex-col justify-between pt-24 pb-12 px-8 xl:px-16"
          style={{ borderLeft: "1px solid #e8e2da" }}
        >
          {/* Breadcrumb */}
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

          {/* Product info */}
          <div className="flex flex-col gap-8">
            <div>
              <motion.p
                className="font-sans text-[9px] tracking-[0.32em] mb-4 uppercase"
                style={{ color: "#b0a090" }}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                Maison Jacques Fath — Paris
              </motion.p>
              <motion.h1
                className="font-serif leading-tight text-balance"
                style={{ fontSize: "clamp(22px, 2.6vw, 36px)", letterSpacing: "0.06em", color: "#1a120a" }}
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.07 }}
              >
                {product.name}
              </motion.h1>
              <motion.p
                className="font-sans mt-5"
                style={{ fontSize: "clamp(13px, 1.1vw, 17px)", letterSpacing: "0.14em", color: "#4a3a2a" }}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.15 }}
              >
                {product.price}
              </motion.p>
            </div>

            {/* Color */}
            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.22 }}
            >
              <p className="font-sans text-[8px] tracking-[0.3em] mb-4" style={{ color: "#b0a090" }}>
                {c.filterLabels.color.toUpperCase()} —{" "}
                <span style={{ color: "#4a3a2a" }}>
                  {COLOR_SWATCHES.find((s) => s.value === selectedColor)?.label}
                </span>
              </p>
              <div className="flex items-center gap-4">
                {COLOR_SWATCHES.map((sw) => (
                  <button
                    key={sw.value}
                    aria-label={sw.label}
                    onClick={() => setSelectedColor(sw.value)}
                    className="transition-transform duration-200 hover:scale-110"
                    style={{
                      width: 26, height: 26, borderRadius: "50%",
                      backgroundColor: sw.hex,
                      border: selectedColor === sw.value ? "2px solid #4a3a2a" : "2px solid transparent",
                      outline: selectedColor === sw.value ? "1px solid #c8bfb0" : "none",
                      outlineOffset: "3px",
                    }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Size */}
            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <p className="font-sans text-[8px] tracking-[0.3em] mb-4" style={{ color: "#b0a090" }}>
                {c.filterLabels.size.toUpperCase()}
                {selectedSize && <span style={{ color: "#4a3a2a" }}> — {selectedSize}</span>}
              </p>
              <div className="flex items-center gap-3 flex-wrap">
                {c.sizes.map((s) => {
                  const on = selectedSize === s
                  return (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(on ? null : s)}
                      className="font-sans text-[9px] tracking-[0.18em] flex items-center justify-center transition-all duration-200"
                      style={{
                        width: 40, height: 40,
                        border: on ? "1px solid #1a120a" : "1px solid #d0c8be",
                        color: on ? "#1a120a" : "#9a8b7c",
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
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.38 }}
            >
              An exceptional piece from the Maison Jacques Fath new season collection,
              crafted with meticulous attention to detail in our Parisian atelier.
              Composed of the finest materials, this piece embodies the timeless elegance
              that defines the Maison.
            </motion.p>
          </div>

          {/* CTA */}
          <motion.div
            className="flex flex-col gap-4"
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.44 }}
          >
            <AnimatePresence>
              {!selectedSize && (
                <motion.p
                  className="font-sans text-[8px] tracking-[0.22em]"
                  style={{ color: "#b0a090" }}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                >
                  — Please select a size
                </motion.p>
              )}
            </AnimatePresence>

            <button
              onClick={handleAdd}
              disabled={!selectedSize}
              className="relative w-full h-14 overflow-hidden font-sans text-[9px] tracking-[0.36em] transition-all duration-300"
              style={{
                backgroundColor: selectedSize ? "#1a120a" : "#c8bfb0",
                color: "#f8f5f0",
                cursor: selectedSize ? "pointer" : "not-allowed",
              }}
            >
              <AnimatePresence mode="wait">
                {added ? (
                  <motion.span key="ok" className="absolute inset-0 flex items-center justify-center"
                    initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.32 }}
                  >✓</motion.span>
                ) : (
                  <motion.span key="add" className="absolute inset-0 flex items-center justify-center"
                    initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.32 }}
                  >
                    {c.addToBag}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <button
              className="w-full h-12 font-sans text-[9px] tracking-[0.28em] transition-colors duration-200"
              style={{ border: "1px solid #d0c8be", color: "#9a8b7c" }}
            >
              {c.wishlist.toUpperCase()}
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
