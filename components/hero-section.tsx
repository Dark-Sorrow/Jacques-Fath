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

        {/* Center logo — top of hero */}
        <motion.div
          className="absolute top-0 left-0 right-0 flex flex-col items-center pt-10 z-10 pointer-events-none"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        >
          <a href="#" className="flex flex-col items-center gap-2 pointer-events-auto" aria-label="Maison Jacques Fath">
            <Image
              src="/logo-monogram.png"
              alt="Jacques Fath monogram"
              width={72}
              height={88}
              className="object-contain drop-shadow-lg"
              priority
            />
            <span className="font-serif text-[11px] tracking-[0.28em] text-white/85 leading-none drop-shadow">
              MAISON JACQUES FATH
            </span>
            <span className="font-sans text-[9px] tracking-[0.35em] text-white/50 leading-none">
              PARIS
            </span>
          </a>
        </motion.div>

        {/* Text overlay — left side */}
        <motion.div
          className="absolute inset-0 flex flex-col justify-end pb-14 pl-8 md:pl-14 pr-8 max-w-sm"
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

        {/* Watermark logo bottom-right */}
        <motion.div
          className="absolute bottom-8 right-8 opacity-20"
          variants={fadeIn(1.4)}
          initial="hidden"
          animate="visible"
        >
          <Image
            src="/logo-monogram.png"
            alt=""
            aria-hidden="true"
            width={48}
            height={58}
            className="object-contain invert"
          />
        </motion.div>
      </div>
    </section>
  )
}
