"use client"

import { useRef, useState, useCallback } from "react"
import { ArrowRight } from "lucide-react"
import { motion, useInView } from "framer-motion"

const LOUPE_SIZE = 200
const ZOOM = 2.5

export default function MaisonSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  const loupeAreaRef = useRef<HTMLDivElement>(null)
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

      {/* Right image panel with loupe */}
      <motion.div
        ref={loupeAreaRef}
        className="flex-1 min-h-[400px] md:min-h-0 relative overflow-hidden cursor-none select-none"
        initial={{ opacity: 0, x: 30 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Background image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/fabric-texture.jpg"
          alt="Close-up of Jacques Fath dark navy fabric texture"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          draggable={false}
        />

        {/* Subtle vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />

        {/* Loupe magnifier */}
        {loupe && loupeAreaRef.current && (() => {
          const cW = loupeAreaRef.current.offsetWidth
          const cH = loupeAreaRef.current.offsetHeight

          // Natural image dimensions (fabric-texture.jpg)
          const IMG_W = 1300
          const IMG_H = 868

          // Replicate object-fit: cover — find the rendered size of the image inside the container
          const containerRatio = cW / cH
          const imageRatio = IMG_W / IMG_H
          let renderedW: number
          let renderedH: number
          if (containerRatio > imageRatio) {
            // Container is wider → fit by width
            renderedW = cW
            renderedH = cW / imageRatio
          } else {
            // Container is taller → fit by height
            renderedH = cH
            renderedW = cH * imageRatio
          }

          // The image is centered inside the container (object-position: center)
          const offsetX = (cW - renderedW) / 2
          const offsetY = (cH - renderedH) / 2

          // Background props to replicate the same cover rendering
          const bgW = renderedW * ZOOM
          const bgH = renderedH * ZOOM
          // Shift so the pixel under the cursor is at the center of the loupe
          const bgX = -(loupe.x - offsetX) * ZOOM + LOUPE_SIZE / 2
          const bgY = -(loupe.y - offsetY) * ZOOM + LOUPE_SIZE / 2

          return (
            <div
              className="absolute pointer-events-none z-30"
              style={{
                width: LOUPE_SIZE,
                height: LOUPE_SIZE,
                left: loupe.x - LOUPE_SIZE / 2,
                top: loupe.y - LOUPE_SIZE / 2,
              }}
            >
              {/* Zoomed image inside circle */}
              <div className="absolute inset-0 rounded-full overflow-hidden">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: "url('/images/fabric-texture.jpg')",
                    backgroundSize: `${bgW}px ${bgH}px`,
                    backgroundPosition: `${bgX}px ${bgY}px`,
                    backgroundRepeat: "no-repeat",
                  }}
                />
              </div>

              {/* Outer ring */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  border: "1.5px solid rgba(180,155,100,0.75)",
                  boxShadow:
                    "0 0 0 1px rgba(0,0,0,0.45), inset 0 0 0 1px rgba(0,0,0,0.2), 0 8px 40px rgba(0,0,0,0.6)",
                }}
              />

              {/* Crosshair vertical */}
              <div
                className="absolute left-1/2 -translate-x-1/2"
                style={{
                  top: "15%",
                  bottom: "15%",
                  width: 1,
                  background: "rgba(180,155,100,0.4)",
                }}
              />
              {/* Crosshair horizontal */}
              <div
                className="absolute top-1/2 -translate-y-1/2"
                style={{
                  left: "15%",
                  right: "15%",
                  height: 1,
                  background: "rgba(180,155,100,0.4)",
                }}
              />

              {/* Center dot */}
              <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{ width: 5, height: 5, background: "rgba(180,155,100,0.9)" }}
              />
            </div>
          )
        })()}
      </motion.div>
    </section>
  )
}
