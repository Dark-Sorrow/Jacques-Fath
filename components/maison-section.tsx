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

      {/* Right image panel */}
      <motion.div
        ref={imageRef}
        className="flex-1 min-h-[400px] md:min-h-0 relative overflow-hidden cursor-none"
        initial={{ opacity: 0, x: 30 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Base image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/fabric-texture.jpg"
          alt="Close-up of Jacques Fath dark navy fabric texture"
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />

        {/* Subtle dark vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />

        {/* Loupe magnifier */}
        {loupe && imageRef.current && (
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
                border: "1.5px solid rgba(180,155,100,0.7)",
                boxShadow:
                  "0 0 0 1px rgba(0,0,0,0.4), inset 0 0 0 1px rgba(0,0,0,0.25), 0 8px 32px rgba(0,0,0,0.6)",
              }}
            />

            {/* Zoomed image inside the circle */}
            <div
              className="absolute inset-0 rounded-full overflow-hidden"
            >
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: "url('/images/fabric-texture.jpg')",
                  backgroundSize: `${imageRef.current.offsetWidth * ZOOM}px ${imageRef.current.offsetHeight * ZOOM}px`,
                  backgroundPosition: `-${loupe.x * ZOOM - LOUPE_SIZE / 2}px -${loupe.y * ZOOM - LOUPE_SIZE / 2}px`,
                  backgroundRepeat: "no-repeat",
                }}
              />
            </div>

            {/* Crosshair lines */}
            <div
              className="absolute left-1/2 top-[15%] bottom-[15%] w-px -translate-x-1/2"
              style={{ background: "rgba(180,155,100,0.35)" }}
            />
            <div
              className="absolute top-1/2 left-[15%] right-[15%] h-px -translate-y-1/2"
              style={{ background: "rgba(180,155,100,0.35)" }}
            />

            {/* Center dot */}
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                width: 5,
                height: 5,
                background: "rgba(180,155,100,0.85)",
              }}
            />
          </div>
        )}
      </motion.div>
    </section>
  )
}
