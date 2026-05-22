"use client"

import Image from "next/image"
import { motion } from "framer-motion"

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1], delay } },
})

const fadeIn = (delay = 0) => ({
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1.4, ease: "easeOut", delay } },
})

export default function HeroSection() {
  return (
    <section className="relative w-full" style={{ minHeight: "100vh" }} aria-label="Hero">
      <div className="w-full" style={{ minHeight: "100vh", position: "relative" }}>
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.06, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src="/hero-image.png"
            alt="Maison Jacques Fath — Timeless French Elegance"
            fill
            className="object-cover object-top"
            priority
          />
        </motion.div>

        {/* Left vignette */}
        <div className="absolute inset-y-0 left-0 w-1/3 pointer-events-none" style={{ background: "linear-gradient(to right, rgba(0,0,0,0.45) 0%, transparent 100%)" }} />
        {/* Right vignette */}
        <div className="absolute inset-y-0 right-0 w-1/3 pointer-events-none" style={{ background: "linear-gradient(to left, rgba(0,0,0,0.35) 0%, transparent 100%)" }} />

        {/* Monogram logo — top left, anchored independently */}
        <motion.div
          className="absolute top-0 left-0 pt-24 pl-8 md:pl-14 pointer-events-none z-10"
          variants={fadeIn(0.3)}
          initial="hidden"
          animate="visible"
        >
          <Image
            src="/logo-monogram.png"
            alt="Maison Jacques Fath"
            width={200}
            height={240}
            className="object-contain"
            style={{
              width: "clamp(220px, 22vw, 360px)",
              height: "auto",
              filter:
                "brightness(0) invert(1) drop-shadow(0 0 32px rgba(255,255,255,0.18)) drop-shadow(0 10px 50px rgba(0,0,0,0.55))",
              opacity: 0.95,
            }}
            priority
          />
        </motion.div>

        {/* Text block — bottom left */}
        <motion.div
          className="absolute bottom-0 left-0 pb-14 pl-8 md:pl-14 pr-8 max-w-md"
          initial="hidden"
          animate="visible"
        >
          <motion.p
            variants={fadeUp(0.6)}
            className="font-sans text-[10px] tracking-luxury text-white/50 mb-4 uppercase"
          >
            Maison Jacques Fath
          </motion.p>
          <motion.h1
            variants={fadeUp(0.85)}
            className="font-serif text-4xl md:text-5xl leading-tight text-white mb-5 text-balance"
          >
            TIMELESS<br />FRENCH ELEGANCE
          </motion.h1>
          <motion.p
            variants={fadeUp(1.05)}
            className="font-sans text-[12px] leading-relaxed text-white/70 mb-8 max-w-[240px]"
          >
            Discover the Maison Jacques Fath online boutique and explore our new collection.
          </motion.p>
          <motion.a
            variants={fadeUp(1.2)}
            href="#"
            className="group inline-flex items-center gap-2 font-sans text-[10px] tracking-luxury text-white border-b border-white/40 pb-1 w-fit hover:border-gold hover:text-gold transition-colors duration-300"
          >
            SHOP THE COLLECTION
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
