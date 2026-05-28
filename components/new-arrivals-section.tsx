"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const products = [
  { name: "EVENING DRESS", price: "€2,450" },
  { name: "LEATHER BAG", price: "€1,950" },
  { name: "WOOL COAT", price: "€2,950" },
  { name: "SILK TOP", price: "€990" },
  { name: "LEATHER LOAFERS", price: "€890" },
]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const card = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
}

export default function NewArrivalsSection() {
  return (
    <section className="py-14 bg-background" aria-label="New Arrivals">
      {/* Header */}
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2 className="font-serif text-lg tracking-luxury text-foreground">NEW ARRIVALS</h2>
      </motion.div>

      {/* Products grid — 5 columns */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-5 gap-0 px-6 md:px-10"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        {products.map((product) => (
          <motion.a
            key={product.name}
            href="#"
            variants={card}
            className="group block"
            aria-label={product.name}
          >
            {/* Image placeholder */}
            <div className="aspect-[3/4] relative overflow-hidden bg-[#f0eee9]">
              <Image
                src="/product-placeholder.png"
                alt={product.name}
                fill
                className="object-contain p-6 transition-transform duration-700 group-hover:scale-105"
              />
              {/* Hover overlay */}
              <motion.div
                className="absolute inset-0 bg-black/0"
                whileHover={{ backgroundColor: "rgba(0,0,0,0.04)" }}
                transition={{ duration: 0.4 }}
              />
            </div>
            {/* Info */}
            <div className="py-3">
              <p className="font-sans text-[9px] tracking-luxury text-foreground mb-1 group-hover:text-gold transition-colors duration-300">
                {product.name}
              </p>
              <p className="font-sans text-[11px] text-muted-foreground">{product.price}</p>
            </div>
          </motion.a>
        ))}
      </motion.div>

      {/* View all */}
      <motion.div
        className="flex justify-center mt-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <a
          href="#"
          className="group font-sans text-[10px] tracking-luxury text-foreground border-b border-foreground/30 pb-0.5 hover:border-gold hover:text-gold transition-colors duration-300"
        >
          VIEW ALL
        </a>
      </motion.div>
    </section>
  )
}
