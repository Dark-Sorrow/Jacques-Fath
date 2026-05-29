"use client"

import Image from "next/image"
import { motion } from "framer-motion"

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1], delay },
  },
})

export default function CastingSection() {
  return (
    <section
      className="w-full flex flex-col items-center justify-center py-24 md:py-32 px-6"
      style={{ backgroundColor: "#f7f5f0" }}
      aria-label="Casting — Maison Jacques Fath"
    >
      {/* Logo */}
      <motion.div
        className="flex flex-col items-center mb-14"
        variants={fadeUp(0.05)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <Image
          src="/images/logo-black.png"
          alt="Maison Jacques Fath"
          width={700}
          height={700}
          className="w-72 sm:w-96 md:w-[480px] lg:w-[560px] h-auto object-contain"
          priority
        />
      </motion.div>

      {/* Section label */}
      <motion.p
        className="font-sans text-[9px] tracking-[0.38em] uppercase mb-8"
        style={{ color: "#B8962E" }}
        variants={fadeUp(0.15)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        Casting
      </motion.p>

      {/* Divider */}
      <motion.div
        className="h-px w-10 mb-12"
        style={{ backgroundColor: "#B8962E", opacity: 0.5 }}
        variants={fadeUp(0.2)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      />

      {/* Body copy */}
      <motion.div
        className="flex flex-col items-center gap-7 max-w-xl w-full text-center"
        variants={fadeUp(0.38)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <p
          className="font-sans leading-relaxed"
          style={{ fontSize: "clamp(0.72rem, 1.05vw, 0.85rem)", color: "rgba(28,27,25,0.75)", letterSpacing: "0.04em" }}
        >
          Maison Jacques Fath is inviting exceptional talents to join the Maison as in-house models.
        </p>

        <p
          className="font-sans leading-relaxed"
          style={{ fontSize: "clamp(0.72rem, 1.05vw, 0.85rem)", color: "rgba(28,27,25,0.75)", letterSpacing: "0.04em" }}
        >
          Selected candidates will participate in collection fittings, photoshoots, and other Maison Jacques Fath projects.
        </p>

        {/* Instruction block */}
        <div
          className="w-full border-t border-b py-8 flex flex-col items-center gap-4"
          style={{ borderColor: "rgba(184,150,46,0.25)" }}
        >
          <p
            className="font-sans leading-relaxed"
            style={{ fontSize: "clamp(0.72rem, 1.05vw, 0.85rem)", color: "rgba(28,27,25,0.75)", letterSpacing: "0.04em" }}
          >
            Please send your photos{" "}
            <span style={{ color: "rgba(28,27,25,0.45)", fontStyle: "italic" }}>
              (portrait and full-length)
            </span>{" "}
            along with a brief introduction via Direct Message or to:
          </p>
          <a
            href="mailto:pr@jacquesfath.com"
            className="font-serif transition-colors duration-300 hover:opacity-70"
            style={{
              fontSize: "clamp(0.85rem, 1.4vw, 1.05rem)",
              letterSpacing: "0.14em",
              color: "#1c1b19",
            }}
          >
            pr@jacquesfath.com
          </a>
        </div>

        <p
          className="font-sans leading-relaxed"
          style={{ fontSize: "clamp(0.68rem, 0.95vw, 0.78rem)", color: "rgba(28,27,25,0.5)", letterSpacing: "0.06em" }}
        >
          Applicants must not be bound by any other active modeling contracts.
        </p>
      </motion.div>

      {/* Quote */}
      <motion.blockquote
        className="mt-14 mb-12 text-center max-w-md"
        variants={fadeUp(0.48)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <p
          className="font-serif"
          style={{
            fontSize: "clamp(0.85rem, 1.4vw, 1.1rem)",
            letterSpacing: "0.08em",
            color: "#1c1b19",
            fontStyle: "italic",
          }}
        >
          &ldquo;Become part of the legacy of Maison Jacques Fath.&rdquo;
        </p>
      </motion.blockquote>

      {/* Footer line — Elegance · Nobility · Heritage */}
      <motion.div
        className="flex items-center gap-5"
        variants={fadeUp(0.56)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="h-px w-12 md:w-20" style={{ backgroundColor: "#B8962E", opacity: 0.4 }} />
        <span
          className="font-sans text-[9px] tracking-[0.32em] uppercase"
          style={{ color: "#B8962E" }}
        >
          Elegance &nbsp;&bull;&nbsp; Nobility &nbsp;&bull;&nbsp; Heritage
        </span>
        <div className="h-px w-12 md:w-20" style={{ backgroundColor: "#B8962E", opacity: 0.4 }} />
      </motion.div>
    </section>
  )
}
