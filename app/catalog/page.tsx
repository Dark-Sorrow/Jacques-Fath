"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { useLang } from "@/lib/i18n"

// Muted sand tones for placeholder backgrounds
const TONES = [
  "#e8e2d9", "#ddd6cc", "#e5dfd6", "#d8d1c7",
  "#ebe5dc", "#d5cec4", "#e0d9cf", "#dbd4ca",
]

// Editorial layout pattern: every 6 cards repeats a rhythm
// large = full-height on left, small = right pair
// This drives the asymmetric masonry-like layout
const LAYOUT_PATTERN: Array<"tall" | "wide" | "normal"> = [
  "tall", "normal", "normal", "wide", "normal", "normal",
]

function Placeholder({ index, tone }: { index: number; tone: string }) {
  return (
    <div
      className="w-full h-full flex items-end justify-start p-5"
      style={{ backgroundColor: tone }}
    >
      <span
        className="font-serif select-none leading-none"
        style={{
          fontSize: "clamp(48px, 8vw, 110px)",
          color: "rgba(80,65,50,0.10)",
          letterSpacing: "-0.04em",
        }}
      >
        {String(index).padStart(2, "0")}
      </span>
    </div>
  )
}

function ProductCard({
  product,
  index,
  variant,
  addToBag,
  newLabel,
  isNew,
}: {
  product: { id: number; name: string; price: string; category: string }
  index: number
  variant: "tall" | "wide" | "normal"
  addToBag: string
  newLabel: string
  isNew: boolean
}) {
  const [hovered, setHovered] = useState(false)
  const tone = TONES[index % TONES.length]

  const aspectRatio =
    variant === "tall" ? "2/3" : variant === "wide" ? "4/3" : "3/4"

  return (
    <motion.article
      className="group cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: (index % 6) * 0.07 }}
    >
      {/* Image block */}
      <div className="relative overflow-hidden" style={{ aspectRatio }}>
        <Placeholder index={product.id} tone={tone} />

        {isNew && (
          <span
            className="absolute top-5 left-5 font-sans text-[8px] tracking-[0.28em] px-2.5 py-1 z-10"
            style={{ backgroundColor: "rgba(250,248,245,0.94)", color: "#2c2118" }}
          >
            {newLabel}
          </span>
        )}

        {/* Wishlist */}
        <button
          aria-label="Save to wishlist"
          className="absolute top-5 right-5 z-10 transition-opacity duration-300"
          style={{ opacity: hovered ? 1 : 0 }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2c2118" strokeWidth="1">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>

        {/* Add to bag — slides up on hover */}
        <div
          className="absolute inset-x-0 bottom-0 flex items-center justify-center py-4 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{
            backgroundColor: "rgba(26,18,10,0.82)",
            transform: hovered ? "translateY(0%)" : "translateY(100%)",
          }}
        >
          <span className="font-sans text-[9px] tracking-[0.32em] text-white/90">
            {addToBag}
          </span>
        </div>
      </div>

      {/* Caption */}
      <div className="pt-4 pb-1">
        <p
          className="font-sans text-[12px] tracking-[0.06em] leading-snug transition-opacity duration-200"
          style={{ color: "#1a120a", opacity: hovered ? 1 : 0.85 }}
        >
          {product.name}
        </p>
        <p
          className="font-sans text-[11px] mt-2 tracking-[0.04em]"
          style={{ color: "#9a8b7c" }}
        >
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

  const filtered = useMemo(() => {
    let items = [...c.products]
    if (activeCategory !== "all")
      items = items.filter((p) => p.category === activeCategory)
    return items
  }, [c.products, activeCategory])

  const toggleSize = (s: string) =>
    setActiveSizes((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    )

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f8f5f0" }}>
      <Navbar />

      {/* ── Page header ─────────────────────────────────────── */}
      <header className="pt-40 pb-10 px-8 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-screen-xl mx-auto"
        >
          <p
            className="font-sans text-[9px] tracking-[0.3em] mb-4 uppercase"
            style={{ color: "#b0a090" }}
          >
            Maison Jacques Fath — Paris
          </p>
          <div className="flex items-baseline justify-between flex-wrap gap-4">
            <h1
              className="font-serif"
              style={{
                fontSize: "clamp(38px, 5vw, 72px)",
                letterSpacing: "0.16em",
                color: "#1a120a",
                lineHeight: 1,
              }}
            >
              {c.title}
            </h1>
            <span
              className="font-sans text-[10px] tracking-[0.2em]"
              style={{ color: "#b0a090" }}
            >
              {filtered.length} {c.resultsCount}
            </span>
          </div>
          <p
            className="font-sans text-[11px] tracking-[0.12em] mt-4"
            style={{ color: "#9a8b7c" }}
          >
            {c.subtitle}
          </p>
        </motion.div>
      </header>

      {/* ── Divider ─────────────────────────────────────────── */}
      <div className="mx-8 md:mx-16 max-w-screen-xl xl:mx-auto" style={{ height: "1px", backgroundColor: "#ddd6cc" }} />

      {/* ── Category + Size bar ──────────────────────────────── */}
      <div className="sticky top-0 z-30 px-8 md:px-16" style={{ backgroundColor: "#f8f5f0", borderBottom: "1px solid #ddd6cc" }}>
        <div className="max-w-screen-xl mx-auto flex items-center justify-between gap-4 py-4 flex-wrap">
          {/* Categories */}
          <nav className="flex items-center gap-6 md:gap-8 overflow-x-auto no-scrollbar">
            {c.categories.map((cat) => {
              const active = activeCategory === cat.value
              return (
                <button
                  key={cat.value}
                  onClick={() => setActiveCategory(cat.value)}
                  className="relative font-sans text-[9px] tracking-[0.22em] whitespace-nowrap pb-2 flex-shrink-0 transition-colors duration-200"
                  style={{ color: active ? "#1a120a" : "#b0a090" }}
                >
                  {cat.label}
                  {active && (
                    <motion.span
                      layoutId="cat-underline"
                      className="absolute bottom-0 left-0 right-0 h-px"
                      style={{ backgroundColor: "#1a120a" }}
                    />
                  )}
                </button>
              )
            })}
          </nav>

          {/* Size + sort — desktop */}
          <div className="hidden md:flex items-center gap-5">
            {c.sizes.map((s) => {
              const on = activeSizes.includes(s)
              return (
                <button
                  key={s}
                  onClick={() => toggleSize(s)}
                  className="font-sans text-[9px] tracking-[0.14em] transition-colors duration-200"
                  style={{ color: on ? "#1a120a" : "#b0a090", textDecoration: on ? "underline" : "none", textUnderlineOffset: "4px" }}
                >
                  {s}
                </button>
              )
            })}
            <div style={{ width: "1px", height: "14px", backgroundColor: "#ddd6cc" }} />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="font-sans text-[9px] tracking-[0.14em] bg-transparent border-none outline-none cursor-pointer"
              style={{ color: "#7a6e63" }}
            >
              {c.sortOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* ── Editorial Product Grid ────────────────────────────── */}
      <main className="px-8 md:px-16 py-16 max-w-screen-xl mx-auto">
        <AnimatePresence mode="wait">
          <div key={activeCategory}>
            {filtered.length === 0 ? (
              <div className="py-40 text-center">
                <span className="font-serif text-5xl" style={{ color: "#e0d8ce" }}>—</span>
              </div>
            ) : (
              /* Editorial layout: groups of 3 alternating L+2small / 2small+L */
              <div className="flex flex-col gap-4 md:gap-6">
                {Array.from({ length: Math.ceil(filtered.length / 3) }).map((_, groupIdx) => {
                  const group = filtered.slice(groupIdx * 3, groupIdx * 3 + 3)
                  const flip = groupIdx % 2 === 1

                  return (
                    <div
                      key={groupIdx}
                      className={`grid gap-4 md:gap-6 ${
                        group.length === 1
                          ? "grid-cols-1"
                          : group.length === 2
                          ? "grid-cols-2"
                          : flip
                          ? "grid-cols-[1fr_1.7fr] md:grid-cols-[1fr_1.7fr]"
                          : "grid-cols-[1.7fr_1fr] md:grid-cols-[1.7fr_1fr]"
                      }`}
                    >
                      {group.length === 3 ? (
                        <>
                          {/* Large card */}
                          {!flip && (
                            <ProductCard
                              product={group[0]}
                              index={groupIdx * 3}
                              variant="tall"
                              addToBag={c.addToBag}
                              newLabel={c.newLabel}
                              isNew={groupIdx * 3 < 3}
                            />
                          )}

                          {/* Two stacked small cards */}
                          <div className="grid grid-rows-2 gap-4 md:gap-6">
                            {group.slice(flip ? 0 : 1, flip ? 2 : 3).map((p, si) => (
                              <ProductCard
                                key={p.id}
                                product={p}
                                index={groupIdx * 3 + (flip ? si : si + 1)}
                                variant="normal"
                                addToBag={c.addToBag}
                                newLabel={c.newLabel}
                                isNew={groupIdx * 3 + si + 1 < 3}
                              />
                            ))}
                          </div>

                          {/* Large card (flipped layout) */}
                          {flip && (
                            <ProductCard
                              product={group[2]}
                              index={groupIdx * 3 + 2}
                              variant="tall"
                              addToBag={c.addToBag}
                              newLabel={c.newLabel}
                              isNew={groupIdx * 3 + 2 < 3}
                            />
                          )}
                        </>
                      ) : (
                        group.map((p, si) => (
                          <ProductCard
                            key={p.id}
                            product={p}
                            index={groupIdx * 3 + si}
                            variant="normal"
                            addToBag={c.addToBag}
                            newLabel={c.newLabel}
                            isNew={groupIdx * 3 + si < 3}
                          />
                        ))
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </AnimatePresence>
      </main>

      {/* ── Back to maison ─────────────────────────────────── */}
      <div className="px-8 md:px-16 pt-6 pb-16 max-w-screen-xl mx-auto" style={{ borderTop: "1px solid #ddd6cc" }}>
        <Link
          href="/"
          className="inline-flex items-center gap-4 font-sans text-[9px] tracking-[0.28em] transition-opacity duration-200 hover:opacity-40"
          style={{ color: "#9a8b7c" }}
        >
          <svg width="22" height="8" viewBox="0 0 22 8" fill="none">
            <line x1="22" y1="4" x2="0" y2="4" stroke="currentColor" strokeWidth="0.75" />
            <polyline points="6,1 0,4 6,7" fill="none" stroke="currentColor" strokeWidth="0.75" />
          </svg>
          MAISON JACQUES FATH
        </Link>
      </div>

      <Footer />
    </div>
  )
}
