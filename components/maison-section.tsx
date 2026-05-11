"use client"

import { useRef, useState, useCallback } from "react"
import { ArrowRight } from "lucide-react"
import { motion, useInView } from "framer-motion"

const LOUPE_SIZE = 180
const ZOOM = 2.2

export default function MaisonSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  const imageRef = useRef<HTMLDivElement>(null)
  const [loupe, setLoupe] = useState<{ x: number; y: number } | null>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setLoupe({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }, [])

  const handleMouseLeave = useCallback(() => {
    setLoupe(null)
  }, [])

  return (
    <section
      className="w-full flex flex-col md:flex-row overflow-hidden"
      aria-label="The Maison"
      ref={ref}
    >
      {/* Left text panel */}
      <motion.div
        className="w-full md:w-[42%] bg-[#1a2235] flex flex-col justify-center px-10 md:px-16 py-20 md:py-28"
        initial={{ opacity: 0, x: -30 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Gold headline */}
        <motion.p
          className="font-serif text-sm tracking-luxury text-accent mb-8 leading-relaxed"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          THE HOUSE OF<br />AUDACIOUS ELEGANCE
        </motion.p>

        {/* Body */}
        <motion.p
          className="font-sans text-[13px] leading-relaxed text-white/70 max-w-sm mb-10"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
        >
          Since 1937, Jacques Fath has embodied Parisian sophistication and a pioneering spirit.
          Discover the story of a visionary couturier who shaped modern elegance.
        </motion.p>

        {/* CTA */}
        <motion.a
          href="#"
          className="group inline-flex items-center gap-3 font-sans text-[10px] tracking-luxury text-accent w-fit"
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.44, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="relative">
            DISCOVER THE MAISON
            <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-400" />
          </span>
          <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
        </motion.a>
      </motion.div>

      {/* Right image placeholder */}
      <motion.div
        ref={imageRef}
        className="flex-1 bg-[#3a3a38] min-h-[400px] md:min-h-0 flex items-center justify-center relative overflow-hidden cursor-none"
        initial={{ opacity: 0, x: 30 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Base background layer */}
        <div className="absolute inset-0 bg-[#2e2e2c]" />

        {/* Base content */}
        <div className="relative z-10 flex flex-col items-center justify-center gap-3 text-center px-8 pointer-events-none select-none">
          <div className="w-16 h-px bg-white/15" />
          <p className="font-sans text-[10px] tracking-luxury text-white/25 uppercase">
            Editorial Photography
          </p>
          <p className="font-serif text-xl text-white/15">
            Jacques Fath Atelier
          </p>
          <div className="w-16 h-px bg-white/15" />
        </div>

        {/* Loupe magnifier */}
        {loupe && (
          <div
            className="absolute pointer-events-none z-30"
            style={{
              width: LOUPE_SIZE,
              height: LOUPE_SIZE,
              left: loupe.x - LOUPE_SIZE / 2,
              top: loupe.y - LOUPE_SIZE / 2,
            }}
          >
            {/* Outer ring */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                border: "1.5px solid rgba(180,155,100,0.55)",
                boxShadow:
                  "0 0 0 1px rgba(0,0,0,0.35), inset 0 0 0 1px rgba(0,0,0,0.2), 0 8px 32px rgba(0,0,0,0.5)",
              }}
            />

            {/* Zoomed content inside the circle */}
            <div
              className="absolute inset-0 rounded-full overflow-hidden"
              style={{ isolation: "isolate" }}
            >
              {/* Zoomed background */}
              <div
                className="absolute bg-[#2e2e2c]"
                style={{
                  width: `${100 * ZOOM}%`,
                  height: `${100 * ZOOM}%`,
                  left: `${50 - loupe.x * ZOOM / (imageRef.current?.offsetWidth || 1) * 100}%`,
                  top: `${50 - loupe.y * ZOOM / (imageRef.current?.offsetHeight || 1) * 100}%`,
                  transform: `translate(-50%, -50%) scale(${ZOOM})`,
                  transformOrigin: `${(loupe.x / (imageRef.current?.offsetWidth || 1)) * 100}% ${(loupe.y / (imageRef.current?.offsetHeight || 1)) * 100}%`,
                }}
              />

              {/* Zoomed content labels */}
              <div
                className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center"
                style={{
                  transform: `scale(${ZOOM})`,
                  transformOrigin: `${(loupe.x / (imageRef.current?.offsetWidth || 1)) * 100}% ${(loupe.y / (imageRef.current?.offsetHeight || 1)) * 100}%`,
                }}
              >
                <div className="w-16 h-px bg-white/15" />
                <p className="font-sans text-[10px] tracking-luxury text-white/25 uppercase whitespace-nowrap">
                  Editorial Photography
                </p>
                <p className="font-serif text-xl text-white/15 whitespace-nowrap">
                  Jacques Fath Atelier
                </p>
                <div className="w-16 h-px bg-white/15" />
              </div>
            </div>

            {/* Crosshair lines */}
            <div
              className="absolute left-1/2 top-[15%] bottom-[15%] w-px -translate-x-1/2"
              style={{ background: "rgba(180,155,100,0.25)" }}
            />
            <div
              className="absolute top-1/2 left-[15%] right-[15%] h-px -translate-y-1/2"
              style={{ background: "rgba(180,155,100,0.25)" }}
            />

            {/* Center dot */}
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                width: 4,
                height: 4,
                background: "rgba(180,155,100,0.7)",
              }}
            />
          </div>
        )}
      </motion.div>
    </section>
  )
}
