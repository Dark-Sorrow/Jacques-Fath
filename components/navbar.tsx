"use client"

import { useState, useEffect } from "react"
import { Search, User, ShoppingBag } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import Link from "next/link"
import { useLang, type Lang } from "@/lib/i18n"

const LANGS: Lang[] = ["RU", "EN", "FR"]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { lang, setLang, t } = useLang()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [menuOpen])

  const isActive = scrolled || menuOpen

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50">
        <header
          className="transition-all duration-500"
          style={{
            backgroundColor: isActive ? "rgba(18,17,15,0.98)" : "transparent",
            borderBottom: isActive ? "1px solid rgba(255,255,255,0.07)" : "1px solid transparent",
            backdropFilter: isActive ? "blur(12px)" : "none",
          }}
        >
          <div className="flex items-center justify-between px-6 md:px-10 h-14">

            {/* Left — MENU button: text on desktop, hamburger on mobile */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="flex items-center gap-2.5 group"
            >
              {/* Desktop: text only */}
              <span className="hidden md:block font-sans text-[9px] tracking-[0.28em] text-white/70 group-hover:text-white transition-colors duration-200">
                {t.nav.menu}
              </span>

              {/* Mobile: hamburger / X only */}
              <div className="flex md:hidden flex-col gap-[5px] w-5">
                <motion.span
                  animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="block h-px w-full bg-white/70 origin-center"
                />
                <motion.span
                  animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.2 }}
                  className="block h-px w-full bg-white/70"
                />
                <motion.span
                  animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="block h-px w-full bg-white/70 origin-center"
                />
              </div>
            </button>

            {/* Center wordmark */}
            <div className="absolute left-1/2 -translate-x-1/2">
              <Link
                href="/"
                aria-label="Maison Jacques Fath — Home"
                onClick={() => setMenuOpen(false)}
                className="opacity-90 hover:opacity-100 transition-opacity duration-300"
              >
                <span className="font-serif text-[11px] tracking-[0.28em] text-white/90 leading-none whitespace-nowrap">
                  MAISON JACQUES FATH
                </span>
              </Link>
            </div>

            {/* Right — icons + lang */}
            <div className="flex items-center gap-5">
              <div className="hidden md:flex items-center gap-6">
                <button className="group font-sans text-[9px] tracking-[0.2em] text-white/70 hover:text-white transition-colors duration-200 flex items-center gap-1.5">
                  <Search size={10} />
                  {t.nav.search}
                </button>
                <button className="group font-sans text-[9px] tracking-[0.2em] text-white/70 hover:text-white transition-colors duration-200 flex items-center gap-1.5">
                  <User size={10} />
                  {t.nav.account}
                </button>
                <button className="group font-sans text-[9px] tracking-[0.2em] text-white/70 hover:text-white transition-colors duration-200 flex items-center gap-1.5">
                  <ShoppingBag size={10} />
                  {t.nav.bag}
                </button>
                <div className="flex items-center border-l border-white/15 pl-5 gap-0.5">
                  {LANGS.map((l, i) => (
                    <span key={l} className="flex items-center">
                      <button
                        onClick={() => setLang(l)}
                        aria-label={`Switch to ${l}`}
                        className="font-sans text-[9px] tracking-[0.18em] transition-colors duration-200 px-1"
                        style={{ color: lang === l ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.28)" }}
                      >
                        {l}
                      </button>
                      {i < LANGS.length - 1 && (
                        <span className="text-white/15 text-[9px] select-none">/</span>
                      )}
                    </span>
                  ))}
                </div>
              </div>

              {/* Mobile icons */}
              <div className="flex md:hidden items-center gap-4 text-white/70">
                <button aria-label="Search"><Search size={15} /></button>
                <button aria-label="Bag"><ShoppingBag size={15} /></button>
              </div>
            </div>
          </div>
        </header>
      </div>

      {/* Full-screen menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="menu-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 overflow-y-auto"
            style={{ backgroundColor: "rgba(14,12,10,0.97)", backdropFilter: "blur(16px)" }}
          >
            <motion.div
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 12, opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
              className="min-h-screen flex flex-col pt-14"
            >
              {/* Main content */}
              <div className="flex-1 grid grid-cols-1 md:grid-cols-[1fr_1px_1fr] px-8 md:px-14 pt-10 pb-16 gap-0">

                {/* Left — Catalog */}
                <div className="flex flex-col gap-12 pr-0 md:pr-14 pb-12 md:pb-0">
                  <p className="font-sans text-[8px] tracking-[0.38em] text-white/25 uppercase">
                    Catalogue
                  </p>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-12">
                    {t.menu.catalog.map((section, i) => (
                      <motion.div
                        key={section.label}
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.1 + i * 0.07 }}
                        className="flex flex-col gap-4"
                      >
                        <p className="font-serif text-white/90 tracking-[0.12em]"
                          style={{ fontSize: "clamp(15px, 1.4vw, 20px)" }}>
                          {section.label}
                        </p>
                        <ul className="flex flex-col gap-2.5">
                          {section.links.map((link) => (
                            <li key={link.title}>
                              <Link
                                href={link.href}
                                onClick={() => setMenuOpen(false)}
                                className="font-sans text-[11px] tracking-[0.08em] text-white/38 hover:text-white/90 transition-colors duration-200 leading-relaxed"
                              >
                                {link.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Divider */}
                <div className="hidden md:block w-px self-stretch" style={{ backgroundColor: "rgba(255,255,255,0.07)" }} />

                {/* Right — Editorial */}
                <div className="flex flex-col gap-12 pl-0 md:pl-14 pt-12 md:pt-0" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                  <p className="font-sans text-[8px] tracking-[0.38em] text-white/25 uppercase md:block hidden">
                    &nbsp;
                  </p>
                  <div className="flex flex-col gap-12">
                    {t.menu.editorial.map((section, i) => (
                      <motion.div
                        key={section.label}
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.18 + i * 0.08 }}
                        className="flex flex-col gap-4"
                      >
                        <p className="font-serif text-white/90 tracking-[0.12em]"
                          style={{ fontSize: "clamp(15px, 1.4vw, 20px)" }}>
                          {section.label}
                        </p>
                        <ul className="flex flex-wrap gap-x-8 gap-y-2">
                          {section.links.map((link) => (
                            <li key={link.title}>
                              <Link
                                href={link.href}
                                onClick={() => setMenuOpen(false)}
                                className="font-sans text-[11px] tracking-[0.08em] text-white/38 hover:text-white/90 transition-colors duration-200 leading-relaxed"
                              >
                                {link.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom bar — lang + close */}
              <div
                className="px-8 md:px-14 py-6 flex items-center justify-between"
                style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
              >
                <div className="flex items-center gap-1">
                  {LANGS.map((l, i) => (
                    <span key={l} className="flex items-center">
                      <button
                        onClick={() => setLang(l)}
                        className="font-sans text-[9px] tracking-[0.22em] transition-colors duration-200 px-2 py-1"
                        style={{ color: lang === l ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.28)" }}
                      >
                        {l}
                      </button>
                      {i < LANGS.length - 1 && (
                        <span className="text-white/15 text-[9px] select-none">/</span>
                      )}
                    </span>
                  ))}
                </div>
                <p className="font-sans text-[8px] tracking-[0.3em] text-white/20">
                  MAISON JACQUES FATH — PARIS, EST. 1937
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
