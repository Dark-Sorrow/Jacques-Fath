"use client"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { motion } from "framer-motion"

const NEWS_ITEMS = [
  {
    date: "11 May 2026",
    category: "MAISON",
    title: "Maison de couture has reopened at 217 rue Saint-Honoré, Paris",
    body: "After a period of thoughtful restoration, the Maison Jacques Fath atelier has returned to its historic address on the rue Saint-Honoré. The reopening marks a new chapter for the house.",
    featured: true,
    tone: "#1a120a",
    textLight: true,
  },
  {
    date: "03 Apr 2026",
    category: "COLLECTION",
    title: "Resort 2026 — A Study in Light and Volume",
    body: "The Resort 2026 collection takes its cues from the Mediterranean light of early spring. Fluid silhouettes in ivory silk georgette, sculptural shoulders in double-faced cashmere.",
    featured: false,
    tone: "#ede8e0",
    textLight: false,
  },
  {
    date: "18 Feb 2026",
    category: "EVENT",
    title: "Private Presentation — Autumn Winter 2026",
    body: "Selected clients and press were invited to an intimate presentation of the Autumn Winter 2026 collection at the Maison's private salon.",
    featured: false,
    tone: "#e0d9ce",
    textLight: false,
  },
  {
    date: "07 Jan 2026",
    category: "HERITAGE",
    title: "The Archive Project — Digitising 80 Years of Couture",
    body: "In collaboration with the Palais Galliera, Maison Jacques Fath has begun the systematic archiving and digitisation of its couture records spanning 1937 to the present day.",
    featured: false,
    tone: "#2a1f14",
    textLight: true,
  },
]

export default function NewsPage() {
  const [featured, ...rest] = NEWS_ITEMS

  return (
    <div style={{ backgroundColor: "#f8f5f0", minHeight: "100vh" }}>
      <Navbar />

      {/* Page heading */}
      <div
        className="px-10 md:px-16 pt-36 pb-12"
        style={{ borderBottom: "1px solid #e8e2da" }}
      >
        <motion.p
          className="font-sans text-[8px] tracking-[0.32em] uppercase mb-3"
          style={{ color: "#b0a090" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          Maison Jacques Fath
        </motion.p>
        <motion.h1
          className="font-serif"
          style={{ fontSize: "clamp(28px, 4vw, 60px)", letterSpacing: "0.06em", color: "#1a120a" }}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
        >
          Latest News
        </motion.h1>
      </div>

      <main>
        {/* Featured card — full width, large */}
        <motion.article
          className="relative w-full flex flex-col justify-end cursor-pointer group"
          style={{ backgroundColor: featured.tone, minHeight: "70vh" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        >
          {/* Large background number */}
          <span
            className="absolute top-0 right-0 font-serif select-none pointer-events-none leading-none"
            style={{
              fontSize: "clamp(120px, 20vw, 320px)",
              color: "rgba(255,255,255,0.04)",
              lineHeight: 1,
              letterSpacing: "-0.04em",
              paddingRight: "2vw",
            }}
          >
            01
          </span>

          <div className="relative z-10 px-10 md:px-16 py-14 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div className="flex flex-col gap-5 max-w-2xl">
              <div className="flex items-center gap-4">
                <span
                  className="font-sans text-[8px] tracking-[0.32em] uppercase"
                  style={{ color: featured.textLight ? "rgba(255,255,255,0.45)" : "#b0a090" }}
                >
                  {featured.category}
                </span>
                <span style={{ color: featured.textLight ? "rgba(255,255,255,0.2)" : "#d0c8be" }} className="text-[9px]">·</span>
                <span
                  className="font-sans text-[10px] tracking-[0.06em]"
                  style={{ color: featured.textLight ? "rgba(255,255,255,0.35)" : "#c8bfb0" }}
                >
                  {featured.date}
                </span>
              </div>
              <h2
                className="font-serif leading-tight text-balance"
                style={{
                  fontSize: "clamp(24px, 3.5vw, 54px)",
                  letterSpacing: "0.04em",
                  color: featured.textLight ? "rgba(255,255,255,0.92)" : "#1a120a",
                }}
              >
                {featured.title}
              </h2>
              <p
                className="font-sans text-[11px] leading-loose max-w-lg"
                style={{ color: featured.textLight ? "rgba(255,255,255,0.5)" : "#7a6e63", letterSpacing: "0.04em" }}
              >
                {featured.body}
              </p>
            </div>

            {/* Read more */}
            <a
              href="#"
              className="font-sans text-[8px] tracking-[0.28em] uppercase shrink-0 transition-opacity duration-200 hover:opacity-50 w-fit"
              style={{
                color: featured.textLight ? "rgba(255,255,255,0.6)" : "#4a3a2a",
                borderBottom: `1px solid ${featured.textLight ? "rgba(255,255,255,0.25)" : "#c8bfb0"}`,
                paddingBottom: "3px",
              }}
            >
              Read More
            </a>
          </div>
        </motion.article>

        {/* Remaining cards — 3 column grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-3"
          style={{ borderTop: "2px solid #f8f5f0" }}
        >
          {rest.map((item, i) => (
            <motion.article
              key={item.date}
              className="relative flex flex-col justify-end cursor-pointer group overflow-hidden"
              style={{
                backgroundColor: item.tone,
                minHeight: "55vh",
                borderRight: i < rest.length - 1 ? "2px solid #f8f5f0" : "none",
              }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
            >
              {/* Background number */}
              <span
                className="absolute top-0 right-0 font-serif select-none pointer-events-none"
                style={{
                  fontSize: "clamp(80px, 10vw, 160px)",
                  color: item.textLight ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
                  lineHeight: 1,
                  letterSpacing: "-0.04em",
                  paddingRight: "1vw",
                }}
              >
                {String(i + 2).padStart(2, "0")}
              </span>

              <div className="relative z-10 px-8 py-10 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <span
                    className="font-sans text-[7px] tracking-[0.3em] uppercase"
                    style={{ color: item.textLight ? "rgba(255,255,255,0.4)" : "#b0a090" }}
                  >
                    {item.category}
                  </span>
                  <span style={{ color: item.textLight ? "rgba(255,255,255,0.18)" : "#d0c8be" }} className="text-[8px]">·</span>
                  <span
                    className="font-sans text-[9px] tracking-[0.05em]"
                    style={{ color: item.textLight ? "rgba(255,255,255,0.3)" : "#c8bfb0" }}
                  >
                    {item.date}
                  </span>
                </div>

                <h2
                  className="font-serif leading-snug text-balance"
                  style={{
                    fontSize: "clamp(16px, 1.5vw, 22px)",
                    letterSpacing: "0.04em",
                    color: item.textLight ? "rgba(255,255,255,0.88)" : "#1a120a",
                  }}
                >
                  {item.title}
                </h2>

                <p
                  className="font-sans text-[10px] leading-relaxed"
                  style={{ color: item.textLight ? "rgba(255,255,255,0.42)" : "#7a6e63", letterSpacing: "0.03em" }}
                >
                  {item.body}
                </p>

                <a
                  href="#"
                  className="font-sans text-[7px] tracking-[0.26em] uppercase mt-2 w-fit transition-opacity duration-200 hover:opacity-50"
                  style={{
                    color: item.textLight ? "rgba(255,255,255,0.55)" : "#4a3a2a",
                    borderBottom: `1px solid ${item.textLight ? "rgba(255,255,255,0.22)" : "#c8bfb0"}`,
                    paddingBottom: "2px",
                  }}
                >
                  Read More
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}
