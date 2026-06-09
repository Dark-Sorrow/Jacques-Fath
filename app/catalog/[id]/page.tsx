"use client"

import { use, useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
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

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { t } = useLang()
  const c = t.catalog
  const product = c.products.find((p) => String(p.id) === id) ?? c.products[0]

  const [selectedColor, setSelectedColor] = useState(COLOR_SWATCHES[0].value)
  const [selectedSize,  setSelectedSize]  = useState<string | null>(null)
  const [added, setAdded] = useState(false)
  const [activeSlide, setActiveSlide] = useState(0)

  // One sentinel div per slide — when it enters viewport, that slide activates
  const sentinelRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    sentinelRefs.current.forEach((el, i) => {
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSlide(i)
        },
        { threshold: 0.5 }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  const handleAdd = () => {
    if (!selectedSize) return
    setAdded(true)
    setTimeout(() => setAdded(false), 2200)
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f8f5f0" }}>
      <Navbar />

      <div className="flex flex-col md:flex-row" style={{ paddingTop: "0px" }}>

        {/* ── LEFT: sticky photo viewer ───────────────────────────── */}
        <div className="hidden md:block md:w-1/2 relative" style={{ height: `${PHOTO_COUNT * 100}vh` }}>

          {/* sticky frame that holds the slides */}
          <div className="sticky top-0 h-screen overflow-hidden">
            {Array.from({ length: PHOTO_COUNT }, (_, i) => {
              const tone = TONES[(Number(id) - 1 + i) % TONES.length]
              const isActive = activeSlide === i
              const isPast   = i < activeSlide

              return (
                <motion.div
                  key={i}
                  className="absolute inset-0"
                  style={{
                    backgroundColor: tone,
                    zIndex: i + 1,
                    // slide enters from the right, rests, never exits
                    x: isActive || isPast ? "0%" : "100%",
                  }}
                  animate={{
                    x: isActive || isPast ? "0%" : "100%",
                  }}
                  transition={{
                    duration: 0.9,
                    ease: [0.76, 0, 0.24, 1],
                  }}
                >
                  {/* large number watermark */}
                  <div className="absolute inset-0 flex items-end justify-start p-10 pointer-events-none select-none">
                    <span
                      className="font-serif leading-none"
                      style={{
                        fontSize: "clamp(120px, 20vw, 300px)",
                        color: "rgba(80,65,50,0.06)",
                        letterSpacing: "-0.04em",
                      }}
                    >
                      {String(Number(id) * 10 + i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  {/* counter */}
                  <div
                    className="absolute top-8 right-8 font-sans text-[9px] tracking-[0.28em]"
                    style={{ color: "rgba(80,65,50,0.35)" }}
                  >
                    {String(i + 1).padStart(2, "0")} / {String(PHOTO_COUNT).padStart(2, "0")}
                  </div>
                </motion.div>
              )
            })}

            {/* dot indicators */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
              {Array.from({ length: PHOTO_COUNT }, (_, i) => (
                <div
                  key={i}
                  style={{
                    width: i === activeSlide ? 24 : 6,
                    height: 2,
                    backgroundColor: i <= activeSlide ? "rgba(60,45,30,0.5)" : "rgba(60,45,30,0.18)",
                    transition: "all 0.4s ease",
                    borderRadius: 1,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Sentinels — invisible divs that trigger slide change on scroll */}
          {Array.from({ length: PHOTO_COUNT }, (_, i) => (
            <div
              key={i}
              ref={(el) => { sentinelRefs.current[i] = el }}
              style={{
                position: "absolute",
                top: `${i * 100}vh`,
                height: "100vh",
                width: "1px",
                pointerEvents: "none",
              }}
            />
          ))}
        </div>

        {/* ── RIGHT: sticky info panel ────────────────────────────── */}
        <div
          className="md:w-1/2 md:sticky md:top-0 md:h-screen flex flex-col justify-between pt-24 pb-12 px-10 xl:px-16"
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
                style={{ fontSize: "clamp(22px, 2.6vw, 38px)", letterSpacing: "0.06em", color: "#1a120a" }}
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
                  — Select a size to continue
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

      {/* ── BOUTIQUE BOOKING SECTION ──────────────────────────────── */}
      <section
        className="w-full grid grid-cols-1 md:grid-cols-2"
        style={{ borderTop: "1px solid #e8e2da" }}
      >
        {/* Left — large label */}
        <div
          className="flex items-end p-10 md:p-16"
          style={{ backgroundColor: "#f0ece4", borderRight: "1px solid #e8e2da" }}
        >
          <motion.p
            className="font-serif leading-tight text-balance"
            style={{
              fontSize: "clamp(32px, 4.5vw, 72px)",
              letterSpacing: "0.04em",
              color: "#1a120a",
            }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          >
            Reserve&nbsp;in<br />Boutique
          </motion.p>
        </div>

        {/* Right — details */}
        <motion.div
          className="flex flex-col justify-between p-10 md:p-16 gap-10"
          style={{ backgroundColor: "#f8f5f0" }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
        >
          <div className="flex flex-col gap-8">
            {/* What is it */}
            <div className="flex flex-col gap-3">
              <p
                className="font-sans text-[8px] tracking-[0.32em] uppercase"
                style={{ color: "#b0a090" }}
              >
                Personal Appointment
              </p>
              <p
                className="font-sans text-[12px] leading-loose max-w-sm"
                style={{ color: "#5a4e44", letterSpacing: "0.03em" }}
              >
                Reserve this piece for a private fitting session at our Paris boutique.
                A style advisor will prepare your selection and guide you through the
                collection in a dedicated, unhurried space.
              </p>
            </div>

            {/* Steps */}
            <div className="flex flex-col gap-5">
              {[
                { n: "01", text: "Choose a preferred date and time online or by phone." },
                { n: "02", text: "Your advisor confirms the appointment and holds the piece for you." },
                { n: "03", text: "Arrive at the boutique — your fitting room is ready." },
              ].map(({ n, text }) => (
                <div key={n} className="flex gap-5 items-start">
                  <span
                    className="font-serif shrink-0 mt-0.5"
                    style={{ fontSize: 11, color: "#b0a090", letterSpacing: "0.18em" }}
                  >
                    {n}
                  </span>
                  <p
                    className="font-sans text-[11px] leading-relaxed"
                    style={{ color: "#7a6e63", letterSpacing: "0.03em" }}
                  >
                    {text}
                  </p>
                </div>
              ))}
            </div>

            {/* Contact */}
            <div
              className="flex flex-col gap-1.5 pt-4"
              style={{ borderTop: "1px solid #e8e2da" }}
            >
              <p className="font-sans text-[8px] tracking-[0.28em] uppercase" style={{ color: "#b0a090" }}>
                Paris — 39 Avenue Pierre 1er de Serbie, 75008
              </p>
              <p className="font-sans text-[8px] tracking-[0.28em] uppercase" style={{ color: "#b0a090" }}>
                +33 (0)1 47 23 xx xx &nbsp;·&nbsp; boutique@jacquesfath.com
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              className="flex-1 h-13 font-sans text-[8px] tracking-[0.32em] py-4 transition-all duration-300 hover:opacity-80"
              style={{ backgroundColor: "#1a120a", color: "#f8f5f0" }}
            >
              BOOK AN APPOINTMENT
            </button>
            <button
              className="flex-1 h-13 font-sans text-[8px] tracking-[0.28em] py-4 transition-colors duration-200"
              style={{ border: "1px solid #d0c8be", color: "#9a8b7c" }}
            >
              CALL THE BOUTIQUE
            </button>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  )
}
