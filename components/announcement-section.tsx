"use client"

import { motion } from "framer-motion"

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1], delay },
  },
})

export default function AnnouncementSection() {
  return (
    <section
      className="w-full flex flex-col items-center justify-center py-24 md:py-32 px-6"
      style={{ backgroundColor: "#1c1b19" }}
      aria-label="Maison Jacques Fath — 2026 Announcement"
    >
      {/* Top rule */}
      <motion.div
        className="flex items-center gap-5 mb-14"
        variants={fadeUp(0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
      >
        <div className="h-px w-16 md:w-28" style={{ backgroundColor: "#B8962E", opacity: 0.5 }} />
        <span
          className="font-sans text-[9px] tracking-[0.35em] uppercase"
          style={{ color: "#B8962E" }}
        >
          2026
        </span>
        <div className="h-px w-16 md:w-28" style={{ backgroundColor: "#B8962E", opacity: 0.5 }} />
      </motion.div>

      {/* Main headline */}
      <motion.h2
        className="font-serif text-center leading-tight mb-8 text-white"
        style={{ fontSize: "clamp(1.5rem, 3.5vw, 3rem)", letterSpacing: "0.12em" }}
        variants={fadeUp(0.2)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
      >
        Maison Jacques Fath
      </motion.h2>

      {/* Tagline */}
      <motion.p
        className="font-sans text-center mb-14 tracking-luxury"
        style={{ fontSize: "clamp(0.6rem, 1.1vw, 0.75rem)", color: "#B8962E", letterSpacing: "0.3em" }}
        variants={fadeUp(0.3)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
      >
        VÊTEMENTS AVEC INTELLIGENCE ÉTERNELLE
      </motion.p>

      {/* Divider */}
      <motion.div
        className="h-px w-12 mb-14"
        style={{ backgroundColor: "#B8962E", opacity: 0.4 }}
        variants={fadeUp(0.35)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
      />

      {/* Address block */}
      <motion.p
        className="font-sans text-center leading-relaxed mb-3 max-w-lg"
        style={{ fontSize: "clamp(0.7rem, 1vw, 0.82rem)", color: "rgba(255,255,255,0.55)", letterSpacing: "0.08em" }}
        variants={fadeUp(0.4)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
      >
        11 мая 2026 — Maison de couture возобновил работу по адресу:
      </motion.p>
      <motion.p
        className="font-serif text-center mb-14"
        style={{ fontSize: "clamp(0.75rem, 1.2vw, 0.95rem)", color: "rgba(255,255,255,0.85)", letterSpacing: "0.15em" }}
        variants={fadeUp(0.45)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
      >
        217 rue Saint-Honoré, Paris
      </motion.p>

      {/* Presentation line */}
      <motion.p
        className="font-sans text-center mb-16 max-w-md"
        style={{ fontSize: "clamp(0.65rem, 0.95vw, 0.78rem)", color: "rgba(255,255,255,0.45)", letterSpacing: "0.1em" }}
        variants={fadeUp(0.5)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
      >
        Презентация обновлённого дома состоится 6 сентября 2026 года
      </motion.p>

      {/* September SIX — large accent */}
      <motion.div
        className="flex flex-col items-center gap-2"
        variants={fadeUp(0.6)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
      >
        <span
          className="font-serif text-center"
          style={{
            fontSize: "clamp(2.8rem, 8vw, 7rem)",
            letterSpacing: "0.18em",
            color: "transparent",
            WebkitTextStroke: "1px rgba(184,150,46,0.7)",
            lineHeight: 1,
          }}
        >
          SEPTEMBER
        </span>
        <span
          className="font-serif text-center"
          style={{
            fontSize: "clamp(4rem, 12vw, 10rem)",
            letterSpacing: "0.1em",
            color: "#B8962E",
            lineHeight: 1,
            textShadow: "0 0 80px rgba(184,150,46,0.25)",
          }}
        >
          SIX
        </span>
      </motion.div>

      {/* Bottom rule */}
      <motion.div
        className="flex items-center gap-5 mt-16"
        variants={fadeUp(0.7)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
      >
        <div className="h-px w-16 md:w-28" style={{ backgroundColor: "#B8962E", opacity: 0.3 }} />
        <span
          className="font-sans text-[8px] tracking-[0.4em] uppercase"
          style={{ color: "rgba(255,255,255,0.25)" }}
        >
          Paris
        </span>
        <div className="h-px w-16 md:w-28" style={{ backgroundColor: "#B8962E", opacity: 0.3 }} />
      </motion.div>
    </section>
  )
}
