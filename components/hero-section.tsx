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

        {/* Center brand block — monogram + name + tagline */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 gap-3"
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeIn(0.4)}>
            <Image
              src="/logo-monogram.png"
              alt="Maison Jacques Fath"
              width={120}
              height={144}
              className="object-contain"
              style={{
                width: "clamp(80px, 8vw, 130px)",
                height: "auto",
                filter: "brightness(0) invert(1) drop-shadow(0 0 24px rgba(255,255,255,0.2)) drop-shadow(0 8px 40px rgba(0,0,0,0.55))",
              }}
              priority
            />
          </motion.div>

          <motion.p
            variants={fadeUp(0.65)}
            className="font-sans text-[9px] tracking-[0.35em] text-white/60"
          >
            PARIS
          </motion.p>

          <motion.div variants={fadeUp(0.85)} className="flex flex-col items-center gap-1">
            <span
              className="font-serif text-white text-center"
              style={{
                fontSize: "clamp(22px, 3vw, 42px)",
                letterSpacing: "0.12em",
                textShadow: "0 2px 32px rgba(0,0,0,0.5)",
                fontWeight: 400,
              }}
            >
              Maison Jacques Fath
            </span>
          </motion.div>

          <motion.p
            variants={fadeUp(1.0)}
            className="font-sans text-[9px] tracking-[0.28em] text-white/60 uppercase"
          >
            Vêtements avec intelligence éternelle
          </motion.p>

          <motion.p
            variants={fadeUp(1.15)}
            className="font-sans text-[10px] tracking-[0.22em] text-white/50"
          >
            <span className="text-[8px] tracking-widest align-middle mr-0.5">est</span>1937
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
