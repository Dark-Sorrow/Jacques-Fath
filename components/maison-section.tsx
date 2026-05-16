"use client"

import { motion } from "framer-motion"

const slideLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] } },
}

const slideRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] } },
}

const textStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
}

export default function MaisonSection() {
  return (
    <section className="w-full flex flex-col md:flex-row" aria-label="The Essence">
      {/* Left text panel — light ivory */}
      <motion.div
        className="w-full md:w-[38%] bg-background flex flex-col justify-center px-10 md:px-14 py-16 md:py-24"
        variants={slideLeft}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div variants={textStagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
          <motion.h2 variants={fadeUp} className="font-serif text-2xl md:text-3xl leading-tight text-foreground mb-6 text-balance">
            THE ESSENCE<br />OF PARISIAN<br />COUTURE
          </motion.h2>
          <motion.p variants={fadeUp} className="font-sans text-[13px] leading-relaxed text-muted-foreground mb-8 max-w-[280px]">
            Rooted in heritage. Defined by modernity. Jacques Fath continues to shape the language of elegance with a timeless vision.
          </motion.p>
          <motion.a
            variants={fadeUp}
            href="#"
            className="group inline-flex items-center gap-2 font-sans text-[10px] tracking-luxury text-foreground border-b border-foreground/30 pb-0.5 w-fit hover:border-gold hover:text-gold transition-colors duration-300"
          >
            DISCOVER THE HOUSE
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Right image placeholder */}
      <motion.div
        className="flex-1 bg-[#b8b4ae] min-h-[320px] md:min-h-0 relative flex items-center justify-center overflow-hidden"
        variants={slideRight}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="absolute inset-0 bg-[#9a9590]" />
        <div className="relative z-10 flex flex-col items-center justify-center gap-3 text-center px-8">
          <span className="font-serif text-8xl text-white/15">5</span>
          <span className="font-sans text-[9px] tracking-luxury text-white/30 uppercase">Editorial Image</span>
        </div>
      </motion.div>
    </section>
  )
}
