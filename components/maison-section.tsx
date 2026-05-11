"use client"

import { useRef } from "react"
import { ArrowRight } from "lucide-react"
import { motion, useInView } from "framer-motion"

export default function MaisonSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

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
        className="flex-1 bg-[#3a3a38] min-h-[400px] md:min-h-0 flex items-center justify-center relative overflow-hidden"
        initial={{ opacity: 0, x: 30 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="absolute inset-0 bg-[#2e2e2c]" />
        <div className="relative z-10 flex flex-col items-center justify-center gap-3 text-center px-8">
          <div className="w-16 h-px bg-white/15" />
          <p className="font-sans text-[10px] tracking-luxury text-white/25 uppercase">
            Editorial Photography
          </p>
          <p className="font-serif text-xl text-white/15">
            Jacques Fath Atelier
          </p>
          <div className="w-16 h-px bg-white/15" />
        </div>
      </motion.div>
    </section>
  )
}
