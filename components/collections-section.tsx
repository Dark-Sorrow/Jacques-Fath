"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

const collections = [
  { name: "HAUTE COUTURE", subtitle: "VIEW MORE", bg: "bg-[#2a2a2a]", shade: "#3a3533", label: "Couture" },
  { name: "READY-TO-WEAR", subtitle: "VIEW MORE", bg: "bg-[#1e2535]", shade: "#263040", label: "Prêt-à-Porter" },
  { name: "ACCESSORIES", subtitle: "VIEW MORE", bg: "bg-[#2e2e2c]", shade: "#3c3a38", label: "Accessoires" },
  { name: "FRAGRANCES", subtitle: "VIEW MORE", bg: "bg-[#c9c3b5]", shade: "#b8b2a4", label: "Parfums", light: true },
]

export default function CollectionsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section className="py-20 bg-background" aria-label="Collections" ref={ref}>
      {/* Section header */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2 className="font-serif text-2xl tracking-luxury text-foreground mb-3">COLLECTIONS</h2>
        <div className="flex items-center justify-center gap-3">
          <div className="h-px w-12 bg-accent" />
          <div className="w-1.5 h-1.5 rounded-full bg-accent" />
          <div className="h-px w-12 bg-accent" />
        </div>
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-0 mx-4 md:mx-10">
        {collections.map((col, i) => (
          <motion.a
            key={col.name}
            href="#"
            className={`group relative aspect-[3/4] ${col.bg} flex flex-col justify-end overflow-hidden cursor-pointer`}
            aria-label={col.name}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Placeholder */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
              <div className="w-10 h-px bg-white/20" />
              <span className={`font-sans text-[10px] tracking-luxury uppercase ${col.light ? "text-foreground/30" : "text-white/25"}`}>
                {col.label}
              </span>
              <div className="w-10 h-px bg-white/20" />
            </div>

            {/* Hover zoom overlay */}
            <motion.div
              className="absolute inset-0"
              style={{ backgroundColor: col.shade, opacity: 0.08 }}
              initial={false}
              whileHover={{ opacity: 0.18 }}
              transition={{ duration: 0.4 }}
            />

            {/* Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

            {/* Text — slides up on hover */}
            <div className="relative z-10 p-6 text-center">
              <p className={`font-serif text-sm tracking-luxury mb-2 transition-colors duration-300 ${col.light ? "text-foreground group-hover:text-accent" : "text-white"}`}>
                {col.name}
              </p>
              <div className="overflow-hidden">
                <p className={`font-sans text-[9px] tracking-luxury translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400 ease-out ${col.light ? "text-accent" : "text-white/70"}`}>
                  {col.subtitle}
                </p>
              </div>
            </div>

            {/* Bottom line accent */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px bg-accent w-0 group-hover:w-12 transition-all duration-500" />
          </motion.a>
        ))}
      </div>
    </section>
  )
}
