"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useLang } from "@/lib/i18n"

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
  const { t } = useLang()

  return (
    <section className="w-full flex flex-col md:flex-row" aria-label="The Essence">
      {/* Left text panel */}
      <motion.div
        className="w-full md:w-[38%] flex flex-col justify-center px-10 md:px-14 py-16 md:py-24"
        style={{ backgroundColor: "#E0DBE3" }}
        variants={slideLeft}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div variants={textStagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
          <motion.h2 variants={fadeUp} className="font-serif text-2xl md:text-3xl leading-tight text-foreground mb-6 text-balance">
            {t.maison.headline[0]}<br />{t.maison.headline[1]}<br />{t.maison.headline[2]}
          </motion.h2>
          <motion.p variants={fadeUp} className="font-sans text-[13px] leading-relaxed text-muted-foreground mb-8 max-w-[280px]">
            {t.maison.body}
          </motion.p>
          <motion.a
            variants={fadeUp}
            href="#"
            className="group inline-flex items-center gap-2 font-sans text-[10px] tracking-luxury text-foreground border-b border-foreground/30 pb-0.5 w-fit hover:border-gold hover:text-gold transition-colors duration-300"
          >
            {t.maison.cta}
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Right editorial image */}
      <motion.div
        className="flex-1 min-h-[320px] md:min-h-0 relative overflow-hidden"
        variants={slideRight}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <Image
          src="/maison-editorial.png"
          alt="Jacques Fath devant sa maison — Paris"
          fill
          className="object-cover object-center"
        />
      </motion.div>
    </section>
  )
}
