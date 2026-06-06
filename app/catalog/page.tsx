"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { useLang } from "@/lib/i18n"

const TONES = [
  "#e8e2d9", "#ddd6cc", "#e5dfd6", "#d8d1c7",
  "#ebe5dc", "#d5cec4", "#e0d9cf", "#dbd4ca",
  "#e3ddd4", "#d6cfc5", "#ece6dd", "#d9d2c8",
]

function Placeholder({ index, tone }: { index: number; tone: string }) {
  return (
    <div
      className="absolute inset-0 flex items-end justify-start p-8"
      style={{ backgroundColor: tone }}
    >
      <span
        className="font-serif select-none leading-none"
        style={{
          fontSize: "clamp(80px, 14vw, 200px)",
          color: "rgba(80,65,50,0.08)",
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
  tall,
  addToBag,
  newLabel,
  isNew,
}: {
  product: { id: number; name: string; price: string; category: string }
  index: number
  tall?: boolean
  addToBag: string
  newLabel: string
  isNew: boolean
}) {
  const [hovered, setHovered] = useState(false)
  const tone = TONES[index % TONES.length]

  return (
    <motion.article
      className="group relative cursor-pointer overflow-hidden"
      style={{ height: tall ? "100vh" : "50vh" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: (index % 6) * 0.06 }}
    >
      {/* Full-bleed placeholder */}
      <Placeholder index={product.id} tone={tone} />

      {/* Subtle bottom gradient for text legibility */}
      <div
        className="absolute inset-x-0 bottom-0 h-2/5 pointer-events-none"
        style={{ background: "linear-gradient(to top, rgba(26,18,10,0.38) 0%, transparent 100%)" }}
      />

      {/* NEW badge */}
      {isNew && (
        <span
          className="absolute top-6 left-6 font-sans text-[8px] tracking-[0.3em] px-3 py-1.5 z-10"
          style={{ backgroundColor: "#f8f5f0", color: "#2c2118" }}
        >
          {newLabel}
        </span>
      )}

      {/* Wishlist */}
      <button
        aria-label="Save to wishlist"
        className="absolute top-6 right-6 z-10 transition-opacity duration-300"
        style={{ opacity: hovered ? 1 : 0 }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f8f5f0" strokeWidth="1">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      </button>

      {/* Caption — always visible, bottom left */}
      <div className="absolute bottom-0 left-0 right-0 p-7 z-10">
        <p className="font-sans text-[11px] tracking-[0.14em] text-white/90 leading-snug">
          {product.name}
        </p>
        <p className="font-sans text-[10px] mt-2 tracking-[0.08em] text-white/60">
          {product.price}
        </p>
      </div>

      {/* Add to bag — slides up on hover */}
      <motion.div
        className="absolute inset-x-0 bottom-0 flex items-center justify-center py-5 z-20"
        initial={false}
        animate={{ y: hovered ? 0 : "100%" }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        style={{ backgroundColor: "#1a120a" }}
      >
        <span className="font-sans text-[9px] tracking-[0.36em] text-white/85">
          {addToBag}
        </span>
      </motion.div>
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
      <header className="pt-36 pb-8 px-8 md:px-14">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <p
            className="font-sans text-[8px] tracking-[0.3em] mb-5 uppercase"
            style={{ color: "#b0a090" }}
          >
            Maison Jacques Fath — Paris
          </p>
          <div className="flex items-baseline justify-between flex-wrap gap-3">
            <h1
              className="font-serif"
              style={{
                fontSize: "clamp(36px, 5vw, 68px)",
                letterSpacing: "0.18em",
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
            className="font-sans text-[11px] tracking-[0.1em] mt-3"
            style={{ color: "#9a8b7c" }}
          >
            {c.subtitle}
          </p>
        </motion.div>
      </header>

      {/* ── Sticky filter bar ───────────────────────────────── */}
      <div
        className="sticky top-0 z-30 px-8 md:px-14"
        style={{ backgroundColor: "#f8f5f0", borderBottom: "1px solid #e0d8ce" }}
      >
        <div className="flex items-center justify-between gap-4 py-4 flex-wrap">
          {/* Categories */}
          <nav className="flex items-center gap-7 overflow-x-auto no-scrollbar">
            {c.categories.map((cat) => {
              const active = activeCategory === cat.value
              return (
                <button
                  key={cat.value}
                  onClick={() => setActiveCategory(cat.value)}
                  className="relative font-sans text-[9px] tracking-[0.22em] whitespace-nowrap pb-3 flex-shrink-0 transition-colors duration-200"
                  style={{ color: active ? "#1a120a" : "#b0a090" }}
                >
                  {cat.label}
                  {active && (
                    <motion.span
                      layoutId="cat-line"
                      className="absolute bottom-0 left-0 right-0 h-px"
                      style={{ backgroundColor: "#1a120a" }}
                    />
                  )}
                </button>
              )
            })}
          </nav>

          {/* Sizes + sort */}
          <div className="hidden md:flex items-center gap-5">
            {c.sizes.map((s) => {
              const on = activeSizes.includes(s)
              return (
                <button
                  key={s}
                  onClick={() => toggleSize(s)}
                  className="font-sans text-[9px] tracking-[0.14em] transition-all duration-200"
                  style={{
                    color: on ? "#1a120a" : "#b0a090",
                    textDecoration: on ? "underline" : "none",
                    textUnderlineOffset: "4px",
                  }}
                >
                  {s}
                </button>
              )
            })}
            <div style={{ width: "1px", height: "12px", backgroundColor: "#ddd6cc" }} />
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

      {/* ── Full-bleed editorial grid ─────────────────────── */}
      <main>
        <AnimatePresence mode="wait">
          <div key={activeCategory}>
            {filtered.length === 0 ? (
              <div className="py-60 flex items-center justify-center">
                <span className="font-serif text-6xl" style={{ color: "#e0d8ce" }}>—</span>
              </div>
            ) : (
              <div className="flex flex-col">
                {Array.from({ length: Math.ceil(filtered.length / 3) }).map((_, gi) => {
                  const group = filtered.slice(gi * 3, gi * 3 + 3)
                  const flip = gi % 2 === 1

                  return (
                    <div
                      key={gi}
                      className={`grid ${
                        group.length >= 3
                          ? flip
                            ? "grid-cols-[1fr_1.65fr]"
                            : "grid-cols-[1.65fr_1fr]"
                          : group.length === 2
                          ? "grid-cols-2"
                          : "grid-cols-1"
                      }`}
                      style={{ gap: "2px" }}
                    >
                      {group.length === 3 ? (
                        <>
                          {/* Large card side */}
                          {!flip && (
                            <ProductCard
                              product={group[0]}
                              index={gi * 3}
                              tall
                              addToBag={c.addToBag}
                              newLabel={c.newLabel}
                              isNew={gi * 3 < 3}
                            />
                          )}

                          {/* Two stacked small cards */}
                          <div className="flex flex-col" style={{ gap: "2px" }}>
                            {group.slice(flip ? 0 : 1, flip ? 2 : 3).map((p, si) => (
                              <ProductCard
                                key={p.id}
                                product={p}
                                index={gi * 3 + (flip ? si : si + 1)}
                                tall={false}
                                addToBag={c.addToBag}
                                newLabel={c.newLabel}
                                isNew={gi * 3 + si + 1 < 3}
                              />
                            ))}
                          </div>

                          {/* Large card (flipped) */}
                          {flip && (
                            <ProductCard
                              product={group[2]}
                              index={gi * 3 + 2}
                              tall
                              addToBag={c.addToBag}
                              newLabel={c.newLabel}
                              isNew={gi * 3 + 2 < 3}
                            />
                          )}
                        </>
                      ) : (
                        group.map((p, si) => (
                          <ProductCard
                            key={p.id}
                            product={p}
                            index={gi * 3 + si}
                            tall={false}
                            addToBag={c.addToBag}
                            newLabel={c.newLabel}
                            isNew={gi * 3 + si < 3}
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

      {/* ── Back link ───────────────────────────────────────── */}
      <div
        className="px-8 md:px-14 py-14"
        style={{ borderTop: "1px solid #e0d8ce" }}
      >
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
