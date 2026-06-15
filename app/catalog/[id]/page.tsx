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

// ── Accordion row ─────────────────────────────────────────────────────────────
function AccordionRow({ label, children }: { label: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom: "1px solid #e8e2da" }}>
      <button
        className="w-full flex items-center justify-between py-6 px-10 md:px-16 group"
        onClick={() => setOpen(!open)}
      >
        <span
          className="font-sans text-[9px] tracking-[0.32em] uppercase transition-colors duration-200"
          style={{ color: open ? "#1a120a" : "#9a8b7c" }}
        >
          {label}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="font-sans text-lg leading-none select-none"
          style={{ color: "#b0a090" }}
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-10 md:px-16 pb-8">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── Accordion section ──────────────────────────────────────────────────────────
function AccordionSection({ productName }: { productName: string }) {
  return (
    <section
      className="w-full"
      style={{ borderTop: "1px solid #e8e2da", backgroundColor: "#f8f5f0" }}
    >
      <AccordionRow label="Description">
        <p
          className="font-sans text-[11px] leading-loose max-w-2xl"
          style={{ color: "#7a6e63", letterSpacing: "0.04em" }}
        >
          {productName} is an exceptional piece from the Maison Jacques Fath new season
          collection, crafted with meticulous attention to detail in our Parisian atelier.
          The silhouette is refined and considered — a study in understated luxury.
          Designed to be worn across seasons, it transitions effortlessly from private
          appointments to evening engagements.
        </p>
      </AccordionRow>

      <AccordionRow label="Materials & Care">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-3">
            <p className="font-sans text-[8px] tracking-[0.28em] uppercase" style={{ color: "#b0a090" }}>
              Composition
            </p>
            <p className="font-sans text-[11px] leading-relaxed" style={{ color: "#7a6e63", letterSpacing: "0.04em" }}>
              72% Virgin Wool &nbsp;·&nbsp; 18% Cashmere &nbsp;·&nbsp; 10% Silk
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <p className="font-sans text-[8px] tracking-[0.28em] uppercase" style={{ color: "#b0a090" }}>
              Care Instructions
            </p>
            <div className="flex flex-col gap-1.5">
              {[
                "Dry clean only",
                "Do not tumble dry",
                "Store folded, away from direct light",
                "Handle with care — delicate fibres",
              ].map((line) => (
                <p key={line} className="font-sans text-[11px] leading-relaxed flex items-start gap-3" style={{ color: "#7a6e63", letterSpacing: "0.04em" }}>
                  <span style={{ color: "#c8bfb0", marginTop: 2 }}>—</span>{line}
                </p>
              ))}
            </div>
          </div>
        </div>
      </AccordionRow>

      <AccordionRow label="Reserve in Boutique">
        <div className="flex flex-col gap-8 max-w-2xl">
          <p className="font-sans text-[11px] leading-loose" style={{ color: "#7a6e63", letterSpacing: "0.04em" }}>
            Reserve this piece for a private fitting session at our Paris boutique.
            A dedicated style advisor will prepare your selection and guide you through
            the collection in an unhurried, confidential space.
          </p>
          <div className="flex flex-col gap-4">
            {[
              { n: "01", text: "Choose a preferred date and time — online or by telephone." },
              { n: "02", text: "Your advisor confirms the appointment and holds the piece exclusively for you." },
              { n: "03", text: "Arrive at the boutique — your fitting room is prepared." },
            ].map(({ n, text }) => (
              <div key={n} className="flex items-start gap-6">
                <span className="font-serif text-[10px] shrink-0 mt-0.5" style={{ color: "#c8bfb0", letterSpacing: "0.22em" }}>{n}</span>
                <p className="font-sans text-[11px] leading-relaxed" style={{ color: "#7a6e63", letterSpacing: "0.04em" }}>{text}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-2 pt-2" style={{ borderTop: "1px solid #e8e2da" }}>
            <p className="font-sans text-[8px] tracking-[0.26em] uppercase" style={{ color: "#b0a090" }}>
              39 Avenue Pierre 1er de Serbie, Paris 75008
            </p>
            <p className="font-sans text-[8px] tracking-[0.26em] uppercase" style={{ color: "#b0a090" }}>
              +33 (0)1 47 23 xx xx &nbsp;·&nbsp; boutique@jacquesfath.com
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              className="font-sans text-[8px] tracking-[0.32em] py-4 px-10 transition-opacity duration-200 hover:opacity-75"
              style={{ backgroundColor: "#1a120a", color: "#f8f5f0" }}
            >
              BOOK AN APPOINTMENT
            </button>
            <button
              className="font-sans text-[8px] tracking-[0.28em] py-4 px-10 transition-colors duration-200"
              style={{ border: "1px solid #d0c8be", color: "#9a8b7c" }}
            >
              CALL THE BOUTIQUE
            </button>
          </div>
        </div>
      </AccordionRow>
    </section>
  )
}

// ── You may also like ──────────────────────────────────────────────────────────
function AlsoLikeSection({ currentId, products }: { currentId: string; products: { id: number; name: string; price: string; category: string }[] }) {
  const related = products.filter((p) => String(p.id) !== currentId).slice(0, 4)
  const tones = ["#e8e2d9", "#ddd6cc", "#e5dfd6", "#d8d1c7"]

  return (
    <section
      className="w-full"
      style={{ borderTop: "1px solid #e8e2da", backgroundColor: "#f8f5f0" }}
    >
      {/* Heading */}
      <div className="px-10 md:px-16 pt-16 pb-10">
        <motion.p
          className="font-serif"
          style={{ fontSize: "clamp(22px, 3vw, 44px)", letterSpacing: "0.06em", color: "#1a120a" }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          You May Also Like
        </motion.p>
      </div>

      {/* Cards — single horizontal row, equal width */}
      <div className="flex" style={{ gap: "2px" }}>
        {related.map((p, i) => (
          <motion.a
            key={p.id}
            href={`/catalog/${p.id}`}
            className="group relative block overflow-hidden flex-1"
            style={{ height: "65vh", backgroundColor: tones[i % tones.length] }}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: (i % 2) * 0.14 }}
          >
            {/* number watermark */}
            <div className="absolute inset-0 flex items-end justify-start p-8 pointer-events-none select-none">
              <span
                className="font-serif leading-none"
                style={{
                  fontSize: "clamp(80px, 14vw, 200px)",
                  color: "rgba(80,65,50,0.06)",
                  letterSpacing: "-0.04em",
                }}
              >
                {String(p.id).padStart(2, "0")}
              </span>
            </div>

            {/* info — slides up on hover */}
            <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col gap-1.5">
              <p className="font-sans text-[8px] tracking-[0.28em] uppercase" style={{ color: "rgba(80,65,50,0.45)" }}>
                {p.category}
              </p>
              <div className="flex items-end justify-between gap-4">
                <p
                  className="font-serif text-balance leading-tight"
                  style={{ fontSize: "clamp(16px, 1.8vw, 26px)", letterSpacing: "0.05em", color: "#1a120a" }}
                >
                  {p.name}
                </p>
                <p
                  className="font-sans shrink-0"
                  style={{ fontSize: 12, letterSpacing: "0.12em", color: "#4a3a2a" }}
                >
                  {p.price}
                </p>
              </div>
              {/* hover underline */}
              <div
                className="h-px mt-2 transition-all duration-500 origin-left"
                style={{
                  backgroundColor: "#1a120a",
                  transform: "scaleX(0)",
                }}
              />
            </div>

            {/* hover dark overlay */}
            <div
              className="absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100 pointer-events-none"
              style={{ backgroundColor: "rgba(26,18,10,0.06)" }}
            />
          </motion.a>
        ))}
      </div>
    </section>
  )
}

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { t } = useLang()
  const c = t.catalog
  const product = c.products.find((p) => String(p.id) === id) ?? c.products[0]

  const [selectedColor, setSelectedColor] = useState(COLOR_SWATCHES[0].value)
  const [selectedSize,  setSelectedSize]  = useState<string | null>(null)
  const [added, setAdded] = useState(false)
  const [activeSlide, setActiveSlide] = useState(0)
  // true = still viewing slides, page is locked
  const [slideLocked, setSlideLocked] = useState(true)

  const activeSlideRef = useRef(0)
  const slideLockedRef = useRef(true)
  const throttleRef    = useRef(false)
  const touchStartY    = useRef(0)

  // Keep refs in sync
  useEffect(() => { activeSlideRef.current = activeSlide }, [activeSlide])
  useEffect(() => { slideLockedRef.current = slideLocked }, [slideLocked])

  // Lock / unlock body scroll
  useEffect(() => {
    if (slideLocked) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [slideLocked])

  useEffect(() => {
    const THROTTLE = 750

    const advance = (dir: 1 | -1) => {
      if (!slideLockedRef.current) return // already unlocked, native scroll
      if (throttleRef.current) return
      throttleRef.current = true
      setTimeout(() => { throttleRef.current = false }, THROTTLE)

      const next = activeSlideRef.current + dir

      if (next >= 0 && next < PHOTO_COUNT) {
        setActiveSlide(next)
        // if scrolling forward and reached last slide, unlock after transition
        if (next === PHOTO_COUNT - 1 && dir === 1) {
          setTimeout(() => setSlideLocked(false), THROTTLE)
        }
        // if scrolling backward and not on first slide yet, keep locked
      } else if (dir === -1 && activeSlideRef.current === 0) {
        // already at first — stay locked, nothing to do
      }
    }

    const onWheel = (e: WheelEvent) => {
      if (!slideLockedRef.current) return
      e.preventDefault()
      advance(e.deltaY > 0 ? 1 : -1)
    }

    const onTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY
    }

    const onTouchMove = (e: TouchEvent) => {
      if (!slideLockedRef.current) return
      const dy = touchStartY.current - e.touches[0].clientY
      if (Math.abs(dy) < 10) return
      e.preventDefault()
      advance(dy > 0 ? 1 : -1)
      touchStartY.current = e.touches[0].clientY
    }

    window.addEventListener("wheel", onWheel, { passive: false })
    window.addEventListener("touchstart", onTouchStart, { passive: true })
    window.addEventListener("touchmove", onTouchMove, { passive: false })

    return () => {
      window.removeEventListener("wheel", onWheel)
      window.removeEventListener("touchstart", onTouchStart)
      window.removeEventListener("touchmove", onTouchMove)
    }
  }, [])

  const handleAdd = () => {
    if (!selectedSize) return
    setAdded(true)
    setTimeout(() => setAdded(false), 2200)
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f8f5f0" }}>
      <Navbar />

      {/* Gallery + info */}
      <div className="flex flex-col md:flex-row" style={{ height: "100vh" }}>

        {/* ── LEFT: photo viewer ──────────────────────────────────── */}
        <div className="hidden md:block md:w-1/2 relative h-full overflow-hidden">
          <div className="h-full overflow-hidden">
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

        </div>

        {/* ── RIGHT: info panel ───────────────────────────────────── */}
        <div
          className="md:w-1/2 h-full flex flex-col justify-between pt-24 pb-12 px-10 xl:px-16 overflow-y-auto"
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

      {/* ── ACCORDION DETAILS ─────────────────────────────────────── */}
      <AccordionSection productName={product.name} />

      {/* ── YOU MAY ALSO LIKE ─────────────────────────────────────── */}
      <AlsoLikeSection currentId={id} products={c.products} />

      <Footer />
    </div>
  )
}
