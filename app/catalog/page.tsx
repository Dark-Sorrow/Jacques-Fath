"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { useLang } from "@/lib/i18n"

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
}

const cardAnim = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

const TONES = ["#e8e3db", "#ddd8d0", "#ece7df", "#e2dcd4", "#e9e4dc", "#dbd5cd"]

function ProductCard({
  product,
  index,
  addToBag,
  newLabel,
  isNew,
}: {
  product: { id: number; name: string; price: string; category: string }
  index: number
  addToBag: string
  newLabel: string
  isNew: boolean
}) {
  const [hovered, setHovered] = useState(false)
  const tone = TONES[index % TONES.length]

  return (
    <motion.article
      variants={cardAnim}
      className="cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image placeholder */}
      <div className="relative overflow-hidden" style={{ aspectRatio: "3/4" }}>
        <div
          className="w-full h-full flex items-center justify-center"
          style={{ backgroundColor: tone }}
        >
          <span
            className="font-sans font-light select-none"
            style={{ fontSize: "56px", color: "rgba(90,78,65,0.18)", letterSpacing: "-0.03em" }}
          >
            {product.id}
          </span>
        </div>

        {isNew && (
          <span
            className="absolute top-4 left-4 font-sans text-[9px] tracking-[0.22em] px-2.5 py-1"
            style={{ color: "#3a3028", backgroundColor: "rgba(250,248,245,0.92)" }}
          >
            {newLabel}
          </span>
        )}

        <button
          className="absolute top-4 right-4 transition-opacity duration-300"
          style={{ opacity: hovered ? 1 : 0 }}
          aria-label="Add to wishlist"
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#3a3028" strokeWidth="1.1">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>

        <div
          className="absolute inset-x-0 bottom-0 py-3.5 text-center font-sans text-[9px] tracking-[0.28em] transition-transform duration-300 ease-out"
          style={{
            backgroundColor: "rgba(26,20,14,0.86)",
            color: "#f5f0e8",
            transform: hovered ? "translateY(0)" : "translateY(100%)",
          }}
        >
          {addToBag}
        </div>
      </div>

      {/* Text */}
      <div className="pt-4">
        <p className="font-sans text-[12px] tracking-[0.04em] leading-snug" style={{ color: "#1a140e" }}>
          {product.name}
        </p>
        <p className="font-sans text-[11px] mt-1.5" style={{ color: "#9a8e82" }}>
          {product.price}
        </p>
      </div>
    </motion.article>
  )
}

export default function CatalogPage() {
  const { t } = useLang()
  const c = t.catalog
  const [activeCategory, setActiveCategory] = useState("all")
  const [activeSizes, setActiveSizes] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("newest")
  const [filtersOpen, setFiltersOpen] = useState(false)

  const filtered = useMemo(() => {
    let items = [...c.products]
    if (activeCategory !== "all") items = items.filter((p) => p.category === activeCategory)
    return items
  }, [c.products, activeCategory])

  const toggleSize = (s: string) =>
    setActiveSizes((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    )

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#faf8f5" }}>
      <Navbar />

      {/* ── Page header ─────────────────────────────────────────── */}
      <header className="pt-36 pb-12 px-6 md:px-14" style={{ borderBottom: "1px solid #e0dbd3" }}>
        <div className="max-w-screen-xl mx-auto flex items-end justify-between flex-wrap gap-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p
              className="font-sans text-[9px] tracking-[0.28em] mb-3 uppercase"
              style={{ color: "#9a8e82" }}
            >
              Maison Jacques Fath
            </p>
            <h1
              className="font-serif leading-none"
              style={{ fontSize: "clamp(32px,4vw,52px)", letterSpacing: "0.14em", color: "#1a140e" }}
            >
              {c.title}
            </h1>
            <p
              className="font-sans text-[11px] tracking-[0.1em] mt-3"
              style={{ color: "#9a8e82" }}
            >
              {c.subtitle}
            </p>
          </motion.div>
          <p className="font-sans text-[10px] tracking-[0.15em]" style={{ color: "#b0a396" }}>
            {filtered.length} {c.resultsCount}
          </p>
        </div>
      </header>

      {/* ── Category nav ─────────────────────────────────────────── */}
      <nav
        className="px-6 md:px-14 overflow-x-auto"
        style={{ borderBottom: "1px solid #e0dbd3" }}
      >
        <div className="max-w-screen-xl mx-auto flex items-center gap-7 md:gap-10 min-w-max md:min-w-0 py-4">
          {c.categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className="relative font-sans text-[10px] tracking-[0.2em] whitespace-nowrap pb-1 transition-colors duration-200"
              style={{ color: activeCategory === cat.value ? "#1a140e" : "#a09487" }}
            >
              {cat.label}
              {activeCategory === cat.value && (
                <motion.span
                  layoutId="cat-line"
                  className="absolute bottom-0 left-0 right-0 block h-px"
                  style={{ backgroundColor: "#1a140e" }}
                />
              )}
            </button>
          ))}
        </div>
      </nav>

      {/* ── Toolbar ──────────────────────────────────────────────── */}
      <div
        className="px-6 md:px-14 py-3.5"
        style={{ borderBottom: "1px solid #e0dbd3" }}
      >
        <div className="max-w-screen-xl mx-auto flex items-center justify-between gap-4">
          {/* Sizes — desktop */}
          <div className="hidden md:flex items-center gap-2">
            <span
              className="font-sans text-[9px] tracking-[0.2em] mr-3"
              style={{ color: "#b0a396" }}
            >
              {c.filterLabels.size}
            </span>
            {c.sizes.map((s) => {
              const active = activeSizes.includes(s)
              return (
                <button
                  key={s}
                  onClick={() => toggleSize(s)}
                  className="font-sans text-[9px] tracking-[0.12em] w-8 h-8 flex items-center justify-center border transition-all duration-200"
                  style={{
                    borderColor: active ? "#1a140e" : "#d4cec6",
                    color: active ? "#1a140e" : "#a09487",
                  }}
                >
                  {s}
                </button>
              )
            })}
          </div>

          {/* Mobile filter button */}
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="md:hidden flex items-center gap-2 font-sans text-[10px] tracking-[0.2em]"
            style={{ color: "#4a3f33" }}
          >
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
              <line x1="0" y1="1" x2="14" y2="1" stroke="currentColor" strokeWidth="1" />
              <line x1="3" y1="5" x2="14" y2="5" stroke="currentColor" strokeWidth="1" />
              <line x1="6" y1="9" x2="14" y2="9" stroke="currentColor" strokeWidth="1" />
            </svg>
            {c.filters}
          </button>

          {/* Sort */}
          <div className="flex items-center gap-3">
            <span
              className="font-sans text-[9px] tracking-[0.2em] hidden md:block"
              style={{ color: "#b0a396" }}
            >
              {c.sortBy}
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="font-sans text-[10px] tracking-[0.1em] bg-transparent border-none outline-none cursor-pointer"
              style={{ color: "#4a3f33" }}
            >
              {c.sortOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* ── Mobile size drawer ──────────────────────────────────── */}
      <AnimatePresence>
        {filtersOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden md:hidden px-6"
            style={{ borderBottom: "1px solid #e0dbd3", backgroundColor: "#faf8f5" }}
          >
            <div className="py-5 flex flex-col gap-3">
              <p
                className="font-sans text-[9px] tracking-[0.22em]"
                style={{ color: "#9a8e82" }}
              >
                {c.filterLabels.size}
              </p>
              <div className="flex flex-wrap gap-2">
                {c.sizes.map((s) => {
                  const active = activeSizes.includes(s)
                  return (
                    <button
                      key={s}
                      onClick={() => toggleSize(s)}
                      className="font-sans text-[9px] tracking-[0.12em] w-9 h-9 flex items-center justify-center border transition-all duration-200"
                      style={{
                        borderColor: active ? "#1a140e" : "#d4cec6",
                        color: active ? "#1a140e" : "#a09487",
                      }}
                    >
                      {s}
                    </button>
                  )
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Product grid ─────────────────────────────────────────── */}
      <main className="px-6 md:px-14 py-16 max-w-screen-xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-16"
          >
            {filtered.map((product, i) => (
              <ProductCard
                key={product.id}
                product={product}
                index={i}
                addToBag={c.addToBag}
                newLabel={c.newLabel}
                isNew={i < 3}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="py-32 text-center">
            <p className="font-serif text-2xl" style={{ color: "#d4cec6" }}>
              —
            </p>
          </div>
        )}
      </main>

      {/* ── Back link ────────────────────────────────────────────── */}
      <div
        className="px-6 md:px-14 py-10 max-w-screen-xl mx-auto"
        style={{ borderTop: "1px solid #e0dbd3" }}
      >
        <Link
          href="/"
          className="font-sans text-[9px] tracking-[0.25em] inline-flex items-center gap-3 transition-colors duration-200 hover:opacity-60"
          style={{ color: "#9a8e82" }}
        >
          <svg width="18" height="8" viewBox="0 0 18 8" fill="none">
            <line x1="18" y1="4" x2="0" y2="4" stroke="currentColor" strokeWidth="0.8" />
            <polyline points="5,1 0,4 5,7" fill="none" stroke="currentColor" strokeWidth="0.8" />
          </svg>
          MAISON JACQUES FATH
        </Link>
      </div>

      <Footer />
    </div>
  )
}
