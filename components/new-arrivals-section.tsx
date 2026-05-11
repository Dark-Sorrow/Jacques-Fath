"use client"

import { useRef } from "react"
import { ArrowRight } from "lucide-react"
import { motion, useInView } from "framer-motion"

const products = [
  { name: "EVENING DRESS", price: "€4,900", bg: "bg-[#c8c3bb]", label: "Robe du Soir" },
  { name: "TAILORED JACKET", price: "€3,200", bg: "bg-[#d0d0cc]", label: "Veste Tailleur" },
  { name: "LE SAC BOWLING", price: "€2,150", bg: "bg-[#c4c8cc]", label: "Sac à Main" },
  { name: "EARRINGS", price: "€890", bg: "bg-[#d6d0c4]", label: "Boucles d'Oreilles" },
]

export default function NewArrivalsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section className="py-20 bg-background" aria-label="New Arrivals" ref={ref}>
      {/* Header */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2 className="font-serif text-2xl tracking-luxury text-foreground mb-3">NEW ARRIVALS</h2>
        <div className="flex items-center justify-center gap-3">
          <div className="h-px w-12 bg-accent" />
          <div className="w-1.5 h-1.5 rounded-full bg-accent" />
          <div className="h-px w-12 bg-accent" />
        </div>
      </motion.div>

      {/* Products */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px mx-4 md:mx-10 bg-border">
        {products.map((product, i) => (
          <motion.a
            key={product.name}
            href="#"
            className="group bg-background block"
            aria-label={product.name}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Image placeholder */}
            <div className={`${product.bg} aspect-[3/4] flex flex-col items-center justify-center gap-2 overflow-hidden relative`}>
              <div className="flex flex-col items-center gap-2 text-center px-4">
                <div className="w-10 h-px bg-foreground/20" />
                <p className="font-sans text-[9px] tracking-luxury-sm text-foreground/30 uppercase">
                  {product.label}
                </p>
                <div className="w-10 h-px bg-foreground/20" />
              </div>

              {/* Hover — subtle veil */}
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/6 transition-colors duration-500" />

              {/* "QUICK VIEW" appears on hover */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 overflow-hidden">
                <p className="font-sans text-[9px] tracking-luxury text-foreground/60 translate-y-5 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400 ease-out whitespace-nowrap">
                  QUICK VIEW
                </p>
              </div>
            </div>

            {/* Product info */}
            <div className="py-4 px-1">
              <p className="font-sans text-[10px] tracking-luxury text-foreground mb-1 transition-colors duration-300 group-hover:text-accent">
                {product.name}
              </p>
              <p className="font-sans text-[12px] text-muted-foreground">
                {product.price}
              </p>
            </div>
          </motion.a>
        ))}
      </div>

      {/* View all */}
      <motion.div
        className="flex justify-center mt-10"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <a
          href="#"
          className="group inline-flex items-center gap-3 font-sans text-[10px] tracking-luxury text-foreground hover:text-accent transition-colors duration-300"
        >
          <span className="relative">
            VIEW ALL NEW ARRIVALS
            <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-400" />
          </span>
          <ArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-1" />
        </a>
      </motion.div>
    </section>
  )
}
