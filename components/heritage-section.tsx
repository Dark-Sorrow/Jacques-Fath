"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const textStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } },
}

export default function HeritageSection() {
  return (
    <section className="w-full flex flex-col md:flex-row" aria-label="Heritage">
      {/* Left image placeholder — dark/B&W */}
      <motion.div
        className="w-full md:w-1/2 min-h-[340px] md:min-h-[520px] relative overflow-hidden"
        initial={{ opacity: 0, scale: 1.04 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src="/heritage-runway.png"
          alt="Jacques Fath runway show — Maison de couture"
          fill
          className="object-cover object-center"
        />
        {/* Subtle dark vignette on the right edge to blend into text panel */}
        <div
          className="absolute inset-y-0 right-0 w-1/4 pointer-events-none"
          style={{ background: "linear-gradient(to right, transparent 0%, rgba(10,10,8,0.55) 100%)" }}
        />
      </motion.div>

      {/* Right text panel */}
      <motion.div
        className="w-full md:w-1/2 bg-charcoal flex flex-col justify-center px-10 md:px-16 py-16 md:py-24"
        variants={textStagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.p variants={fadeUp} className="font-sans text-[9px] tracking-luxury text-gold mb-6 uppercase">
          Since 1937
        </motion.p>
        <motion.h2 variants={fadeUp} className="font-serif text-2xl md:text-3xl leading-tight text-white mb-6 text-balance">
          AN ICONIC HERITAGE
        </motion.h2>
        <motion.p variants={fadeUp} className="font-sans text-[13px] leading-relaxed text-white/60 mb-8 max-w-[300px]">
          Since 1937, Maison Jacques Fath has embodied the spirit of Parisian couture with boldness, refinement and vision.
        </motion.p>
        <motion.a
          variants={fadeUp}
          href="#"
          className="group inline-flex items-center gap-2 font-sans text-[10px] tracking-luxury text-white/80 border-b border-white/20 pb-0.5 w-fit hover:border-gold hover:text-gold transition-colors duration-300"
        >
          EXPLORE OUR HISTORY
        </motion.a>
      </motion.div>
    </section>
  )
}
