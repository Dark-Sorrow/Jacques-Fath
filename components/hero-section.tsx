"use client"

import { useState, useEffect } from "react"
import { ArrowRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const slides = [
  {
    eyebrow: "THE LEGENDARY «S-LINE»",
    title: ["A SILHOUETTE", "FOREVER"],
    description:
      "Jacques Fath redefined elegance in 1934 with the revolutionary «S-Line». A legacy of timeless modernity.",
    cta: "DISCOVER THE COLLECTION",
    bg: "bg-[#d4cfc6]",
    imageBg: "bg-[#b8b3a8]",
    label: "Editorial — S-Line",
  },
  {
    eyebrow: "HAUTE COUTURE SS 2025",
    title: ["THE ART OF", "PARISIAN GRACE"],
    description:
      "Each piece is a masterwork of Parisian craftsmanship, meticulously constructed to honour the human form.",
    cta: "EXPLORE THE COLLECTION",
    bg: "bg-[#c8cdd6]",
    imageBg: "bg-[#9fa8b8]",
    label: "Editorial — Haute Couture",
  },
]

const SLIDE_DURATION = 6000

export default function HeroSection() {
  const [active, setActive] = useState(0)
  const [progress, setProgress] = useState(0)
  const [dir, setDir] = useState(1)

  useEffect(() => {
    setProgress(0)
    const start = performance.now()
    let raf: number

    const tick = (now: number) => {
      const elapsed = now - start
      setProgress(Math.min(elapsed / SLIDE_DURATION, 1))
      if (elapsed < SLIDE_DURATION) {
        raf = requestAnimationFrame(tick)
      } else {
        setDir(1)
        setActive((prev) => (prev + 1) % slides.length)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [active])

  const goTo = (i: number) => {
    if (i === active) return
    setDir(i > active ? 1 : -1)
    setActive(i)
  }

  return (
    <section className="relative w-full h-screen min-h-[600px] flex overflow-hidden" aria-label="Hero">
      {/* Left content panel */}
      <div
        className={`relative z-10 flex flex-col justify-end pb-16 pl-10 md:pl-16 pr-8 w-full md:w-[42%] transition-colors duration-700 ${slides[active].bg}`}
      >
        {/* Eyebrow */}
        <AnimatePresence mode="wait">
          <motion.p
            key={`eyebrow-${active}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="font-sans text-[10px] tracking-luxury-sm text-accent mb-6 italic"
          >
            {slides[active].eyebrow}
          </motion.p>
        </AnimatePresence>

        {/* Heading — each word slides in with stagger */}
        <AnimatePresence mode="wait">
          <motion.h1
            key={`title-${active}`}
            className="font-serif text-5xl md:text-6xl lg:text-[4.5rem] leading-[1.0] text-foreground mb-6"
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {slides[active].title.map((line, i) => (
              <motion.span
                key={i}
                className="block overflow-hidden"
                variants={{
                  hidden: {},
                  visible: {},
                  exit: {},
                }}
              >
                <motion.span
                  className="block"
                  variants={{
                    hidden: { y: "110%", opacity: 0 },
                    visible: {
                      y: "0%",
                      opacity: 1,
                      transition: {
                        duration: 0.8,
                        delay: i * 0.12,
                        ease: [0.22, 1, 0.36, 1],
                      },
                    },
                    exit: {
                      y: "-30%",
                      opacity: 0,
                      transition: { duration: 0.4, ease: [0.55, 0, 1, 0.45] },
                    },
                  }}
                >
                  {line}
                </motion.span>
              </motion.span>
            ))}
          </motion.h1>
        </AnimatePresence>

        {/* Description */}
        <AnimatePresence mode="wait">
          <motion.p
            key={`desc-${active}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="font-sans text-sm leading-relaxed text-muted-foreground max-w-[280px] mb-10"
          >
            {slides[active].description}
          </motion.p>
        </AnimatePresence>

        {/* CTA button */}
        <AnimatePresence mode="wait">
          <motion.button
            key={`cta-${active}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="group inline-flex items-center gap-4 bg-primary text-primary-foreground font-sans text-[10px] tracking-luxury px-7 py-4 w-fit overflow-hidden relative"
          >
            <span className="absolute inset-0 bg-accent translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
            <span className="relative z-10">{slides[active].cta}</span>
            <ArrowRight size={14} className="relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
          </motion.button>
        </AnimatePresence>
      </div>

      {/* Right image panel */}
      <div className={`flex-1 relative ${slides[active].imageBg} flex items-center justify-center overflow-hidden transition-colors duration-700`}>
        {/* Placeholder text */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`img-${active}`}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center"
          >
            <div className="w-16 h-px bg-foreground/15" />
            <p className="font-sans text-[10px] tracking-luxury text-foreground/30 uppercase">
              {slides[active].label}
            </p>
            <p className="font-serif text-2xl text-foreground/15">
              {slides[active].title.join(" ")}
            </p>
            <div className="w-16 h-px bg-foreground/15" />
          </motion.div>
        </AnimatePresence>

        {/* Slide navigator — right edge */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="group flex flex-col items-center gap-2 focus-visible:outline-none"
              aria-label={`Go to slide ${i + 1} of ${slides.length}`}
            >
              {/* Progress track */}
              <div className="relative w-px h-10 bg-foreground/15 overflow-hidden">
                {i === active && (
                  <motion.div
                    className="absolute top-0 left-0 w-full bg-foreground/70"
                    style={{ height: `${progress * 100}%` }}
                  />
                )}
                {i < active && (
                  <div className="absolute inset-0 bg-foreground/40" />
                )}
              </div>
              {/* Dot */}
              <div
                className={`w-1 h-1 rounded-full transition-colors duration-300 ${
                  i === active ? "bg-foreground/70" : "bg-foreground/20"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
