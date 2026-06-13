"use client"

import { useState, useEffect } from "react"
import { Search, User, ShoppingBag } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import Link from "next/link"
import { useLang, type Lang } from "@/lib/i18n"

const LANGS: Lang[] = ["RU", "EN", "FR"]

function MobileAccordion({
  section,
  onClose,
}: {
  section: { label: string; links: { title: string; href: string }[] }
  onClose: () => void
}) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
      <button
        className="w-full flex items-center justify-between py-3.5"
        onClick={() => setOpen(!open)}
      >
        <span className="font-serif text-[12px] tracking-[0.1em] text-white/80">{section.label}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.22 }}
          className="font-sans text-[18px] leading-none text-white/30 select-none"
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden flex flex-col gap-2 pb-3"
          >
            {section.links.map((link) => (
              <li key={link.title}>
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="font-sans text-[10px] tracking-[0.06em] text-white/35 hover:text-white/75 transition-colors duration-200 block py-0.5"
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { lang, setLang, t } = useLang()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Prevent body scroll jitter — use padding compensation
  useEffect(() => {
    if (menuOpen) {
      const scrollbarW = window.innerWidth - document.documentElement.clientWidth
      document.body.style.paddingRight = `${scrollbarW}px`
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.paddingRight = ""
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.paddingRight = ""
      document.body.style.overflow = ""
    }
  }, [menuOpen])

  const solidBg = scrolled || menuOpen

  return (
    <>
      {/* Always reserve 1px border so layout never shifts */}
      <div className="fixed top-0 left-0 right-0 z-50" style={{ borderBottom: "1px solid transparent" }}>
        <header
          className="transition-colors duration-400"
          style={{
            backgroundColor: solidBg ? "rgba(14,12,10,0.97)" : "transparent",
            borderBottom: solidBg ? "1px solid rgba(255,255,255,0.07)" : "1px solid transparent",
            backdropFilter: solidBg ? "blur(14px)" : "none",
          }}
        >
          <div className="flex items-center justify-between px-6 md:px-10 h-14">

            {/* Left — MENU */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="group flex items-center gap-2.5"
            >
              {/* Desktop: text + animated line indicator */}
              <span className="hidden md:flex items-center gap-2 font-sans text-[9px] tracking-[0.28em] text-white/70 group-hover:text-white transition-colors duration-200">
                {t.nav.menu}
                <motion.span
                  animate={{ scaleX: menuOpen ? 1 : 0, opacity: menuOpen ? 1 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="block h-px w-3 bg-white/60 origin-left"
                />
              </span>

              {/* Mobile: hamburger */}
              <div className="flex md:hidden flex-col gap-[5px] w-5">
                <motion.span
                  animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="block h-px w-full bg-white/70 origin-center"
                />
                <motion.span
                  animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                  transition={{ duration: 0.18 }}
                  className="block h-px w-full bg-white/70"
                />
                <motion.span
                  animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="block h-px w-full bg-white/70 origin-center"
                />
              </div>
            </button>

            {/* Center wordmark */}
            <div className="absolute left-1/2 -translate-x-1/2 pointer-events-none">
              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                aria-label="Maison Jacques Fath — Home"
                className="pointer-events-auto opacity-90 hover:opacity-100 transition-opacity duration-300"
              >
                <span className="font-serif text-[11px] tracking-[0.28em] text-white/90 leading-none whitespace-nowrap">
                  MAISON JACQUES FATH
                </span>
              </Link>
            </div>

            {/* Right — icons + lang */}
            <div className="flex items-center gap-5">
              <div className="hidden md:flex items-center gap-6">
                <button className="font-sans text-[9px] tracking-[0.2em] text-white/60 hover:text-white transition-colors duration-200 flex items-center gap-1.5">
                  <Search size={10} />{t.nav.search}
                </button>
                <button className="font-sans text-[9px] tracking-[0.2em] text-white/60 hover:text-white transition-colors duration-200 flex items-center gap-1.5">
                  <User size={10} />{t.nav.account}
                </button>
                <button className="font-sans text-[9px] tracking-[0.2em] text-white/60 hover:text-white transition-colors duration-200 flex items-center gap-1.5">
                  <ShoppingBag size={10} />{t.nav.bag}
                </button>
                <div className="flex items-center border-l border-white/12 pl-5 gap-0.5">
                  {LANGS.map((l, i) => (
                    <span key={l} className="flex items-center">
                      <button
                        onClick={() => setLang(l)}
                        className="font-sans text-[9px] tracking-[0.18em] transition-colors duration-200 px-1 py-0.5"
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
              <div className="flex md:hidden items-center gap-4 text-white/70">
                <button aria-label="Search"><Search size={15} /></button>
                <button aria-label="Bag"><ShoppingBag size={15} /></button>
              </div>
            </div>
          </div>

          {/* ── DROPDOWN PANEL — drops below the navbar bar ── */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                key="menu-panel"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  backgroundColor: "rgba(14,12,10,0.97)",
                  borderTop: "1px solid rgba(255,255,255,0.07)",
                  backdropFilter: "blur(16px)",
                }}
              >
                <div className="px-8 md:px-14 py-10 grid grid-cols-1 md:grid-cols-[3fr_1px_2fr] gap-0">

                    {/* ── DESKTOP: flat columns ── */}
                  <div className="hidden md:grid md:grid-cols-4 gap-8 pr-14">
                    {t.menu.catalog.map((section, i) => (
                      <motion.div
                        key={section.label}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: i * 0.05 }}
                        className="flex flex-col gap-3"
                      >
                        <p className="font-serif text-white/85 text-[13px] tracking-[0.1em] mb-1">{section.label}</p>
                        <ul className="flex flex-col gap-1.5">
                          {section.links.map((link) => (
                            <li key={link.title}>
                              <Link href={link.href} onClick={() => setMenuOpen(false)} className="font-sans text-[10px] tracking-[0.06em] text-white/35 hover:text-white/80 transition-colors duration-200">
                                {link.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    ))}
                  </div>

                  {/* Vertical divider — desktop only */}
                  <div className="hidden md:block w-px" style={{ backgroundColor: "rgba(255,255,255,0.07)" }} />

                  {/* Desktop editorial */}
                  <div className="hidden md:flex flex-row gap-10 pl-14">
                    {t.menu.editorial.map((section, i) => (
                      <motion.div
                        key={section.label}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.12 + i * 0.06 }}
                        className="flex flex-col gap-3 flex-1"
                      >
                        <p className="font-serif text-white/85 text-[13px] tracking-[0.1em] mb-1">{section.label}</p>
                        <ul className="flex flex-col gap-1.5">
                          {section.links.map((link) => (
                            <li key={link.title}>
                              <Link href={link.href} onClick={() => setMenuOpen(false)} className="font-sans text-[10px] tracking-[0.06em] text-white/35 hover:text-white/80 transition-colors duration-200">
                                {link.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    ))}
                  </div>

                  {/* ── MOBILE: accordion ── */}
                  <div className="flex md:hidden flex-col col-span-full">
                    {[...t.menu.catalog, ...t.menu.editorial].map((section) => (
                      <MobileAccordion key={section.label} section={section} onClose={() => setMenuOpen(false)} />
                    ))}
                    {/* Language switcher — mobile only */}
                    <div className="flex items-center gap-0.5 pt-5 mt-2" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                      {LANGS.map((l, i) => (
                        <span key={l} className="flex items-center">
                          <button
                            onClick={() => setLang(l)}
                            className="font-sans text-[9px] tracking-[0.22em] transition-colors duration-200 px-2 py-1"
                            style={{ color: lang === l ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.25)" }}
                          >
                            {l}
                          </button>
                          {i < LANGS.length - 1 && <span className="text-white/15 text-[9px] select-none">/</span>}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Bottom strip — desktop only */}
                <div
                  className="hidden md:flex px-14 py-4 items-center justify-end"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
                >
                  <p className="font-sans text-[7px] tracking-[0.28em] text-white/18">
                    MAISON JACQUES FATH — PARIS, EST. 1937
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </header>
      </div>

      {/* Click-away backdrop */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40"
            style={{ backgroundColor: "rgba(0,0,0,0.45)" }}
            onClick={() => setMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  )
}
