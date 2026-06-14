"use client"

import Navbar from "@/components/navbar"
import AnnouncementSection from "@/components/announcement-section"
import Footer from "@/components/footer"
import { motion } from "framer-motion"

const NEWS_ITEMS = [
  {
    date: "11 May 2026",
    category: "MAISON",
    title: "Maison de couture has reopened at 217 rue Saint-Honoré, Paris",
    body: "After a period of thoughtful restoration, the Maison Jacques Fath atelier has returned to its historic address on the rue Saint-Honoré. The reopening marks a new chapter for the house — honouring the legacy of Jacques Fath while embracing a contemporary vision of Parisian elegance.",
  },
  {
    date: "03 Apr 2026",
    category: "COLLECTION",
    title: "Resort 2026 — A Study in Light and Volume",
    body: "The Resort 2026 collection takes its cues from the Mediterranean light of early spring. Fluid silhouettes in ivory silk georgette, sculptural shoulders in double-faced cashmere — each piece a balance between ease and architecture.",
  },
  {
    date: "18 Feb 2026",
    category: "EVENT",
    title: "Private Presentation — Autumn Winter 2026",
    body: "Selected clients and press were invited to an intimate presentation of the Autumn Winter 2026 collection at the Maison's private salon. The collection will be available in boutiques beginning September.",
  },
  {
    date: "07 Jan 2026",
    category: "HERITAGE",
    title: "The Archive Project — Digitising 80 Years of Couture",
    body: "In collaboration with the Palais Galliera, Maison Jacques Fath has begun the systematic archiving and digitisation of its couture records spanning 1937 to the present day. The archive will be made accessible to researchers and institutions later this year.",
  },
]

export default function NewsPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f8f5f0" }}>
      <Navbar />

      {/* Page header */}
      <header
        className="w-full flex flex-col items-start justify-end px-10 md:px-16 pb-12 pt-36"
        style={{ borderBottom: "1px solid #e8e2da" }}
      >
        <motion.p
          className="font-sans text-[8px] tracking-[0.32em] uppercase mb-4"
          style={{ color: "#b0a090" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Maison Jacques Fath
        </motion.p>
        <motion.h1
          className="font-serif text-balance"
          style={{ fontSize: "clamp(28px, 4vw, 64px)", letterSpacing: "0.06em", color: "#1a120a" }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
        >
          Latest News
        </motion.h1>
      </header>

      {/* News list */}
      <main>
        <ul>
          {NEWS_ITEMS.map((item, i) => (
            <motion.li
              key={item.date}
              className="flex flex-col md:flex-row md:items-start gap-6 md:gap-16 px-10 md:px-16 py-12"
              style={{ borderBottom: "1px solid #e8e2da" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: i * 0.06 }}
            >
              {/* Left — meta */}
              <div className="flex flex-col gap-1.5 md:w-48 shrink-0">
                <p
                  className="font-sans text-[8px] tracking-[0.28em] uppercase"
                  style={{ color: "#b0a090" }}
                >
                  {item.category}
                </p>
                <p
                  className="font-sans text-[10px] tracking-[0.08em]"
                  style={{ color: "#c8bfb0" }}
                >
                  {item.date}
                </p>
              </div>

              {/* Right — content */}
              <div className="flex flex-col gap-4 flex-1">
                <h2
                  className="font-serif leading-snug text-balance"
                  style={{ fontSize: "clamp(16px, 1.6vw, 24px)", letterSpacing: "0.04em", color: "#1a120a" }}
                >
                  {item.title}
                </h2>
                <p
                  className="font-sans text-[11px] leading-loose max-w-2xl"
                  style={{ color: "#7a6e63", letterSpacing: "0.03em" }}
                >
                  {item.body}
                </p>
                <a
                  href="#"
                  className="font-sans text-[8px] tracking-[0.28em] uppercase w-fit transition-opacity duration-200 hover:opacity-50"
                  style={{ color: "#4a3a2a", borderBottom: "1px solid #c8bfb0", paddingBottom: "2px" }}
                >
                  Read More
                </a>
              </div>
            </motion.li>
          ))}
        </ul>

        {/* Announcement section */}
        <AnnouncementSection />
      </main>

      <Footer />
    </div>
  )
}
