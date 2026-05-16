"use client"

import { motion } from "framer-motion"

const categories = [
  { name: "WOMEN", number: "2", bg: "#2e2c29" },
  { name: "MEN", number: "3", bg: "#1e1e1e" },
  { name: "THE HOUSE", number: "4", bg: "#5a1a1a" },
]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

const card = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } },
}

export default function CollectionsSection() {
  return (
    <section className="w-full" aria-label="Categories">
      <motion.div
        className="grid grid-cols-3"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {categories.map((cat) => (
          <motion.a
            key={cat.name}
            href="#"
            variants={card}
            className="group relative aspect-[3/4] flex flex-col justify-end overflow-hidden cursor-pointer"
            style={{ backgroundColor: cat.bg }}
            aria-label={cat.name}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Numbered placeholder */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-serif text-7xl md:text-8xl text-white/10">{cat.number}</span>
            </div>

            {/* Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

            {/* Label */}
            <div className="relative z-10 p-5 pb-6">
              <p className="font-serif text-sm tracking-luxury text-white mb-1">{cat.name}</p>
              <p className="font-sans text-[9px] tracking-luxury text-white/60 group-hover:text-gold transition-colors duration-300">
                Discover
              </p>
            </div>
          </motion.a>
        ))}
      </motion.div>
    </section>
  )
}
