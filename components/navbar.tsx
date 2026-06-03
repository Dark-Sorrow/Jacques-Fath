"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Search, User, ShoppingBag, Menu, X } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { useLang, type Lang, type MegaMenuColumn } from "@/lib/i18n"

const LANGS: Lang[] = ["RU", "EN", "FR"]

type NavKey = "women" | "men" | "house" | null

function MegaMenuPanel({
  columns,
  isVisible,
}: {
  columns: MegaMenuColumn[]
  isVisible: boolean
}) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-full left-0 right-0 z-40"
          style={{
            backgroundColor: "rgba(18,17,15,0.98)",
            backdropFilter: "blur(12px)",
            borderTop: "1px solid rgba(255,255,255,0.07)",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <div className="max-w-7xl mx-auto px-8 py-10">
            <div className="grid grid-cols-4 gap-10">
              {columns.map((col) => (
                <div key={col.title} className="flex flex-col gap-5">
                  <span
                    className="font-sans text-[9px] tracking-[0.22em] text-white/35 pb-3"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
                  >
                    {col.title}
                  </span>
                  <ul className="flex flex-col gap-3">
                    {col.links.map((link) => (
                      <li key={link}>
                        <a
                          href="#"
                          className="group font-sans text-[11px] tracking-[0.12em] text-white/60 hover:text-white transition-colors duration-200 flex items-center gap-2"
                        >
                          <span className="w-0 h-px bg-gold transition-all duration-200 group-hover:w-3 shrink-0" />
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeNav, setActiveNav] = useState<NavKey>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const { lang, setLang, t } = useLang()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNavEnter = useCallback((key: NavKey) => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setActiveNav(key)
  }, [])

  const handleNavLeave = useCallback(() => {
    closeTimer.current = setTimeout(() => setActiveNav(null), 160)
  }, [])

  const handlePanelEnter = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
  }, [])

  const handlePanelLeave = useCallback(() => {
    closeTimer.current = setTimeout(() => setActiveNav(null), 160)
  }, [])

  const navItems: { key: NavKey; label: string }[] = [
    { key: "women", label: t.nav.women },
    { key: "men", label: t.nav.men },
    { key: "house", label: t.nav.house },
  ]

  const megaColumns =
    activeNav === "women"
      ? t.megaMenu.women
      : activeNav === "men"
      ? t.megaMenu.men
      : activeNav === "house"
      ? t.megaMenu.house
      : []

  const isScrolledOrActive = scrolled || activeNav !== null

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <header
        className="transition-all duration-500 ease-in-out"
        style={{
          backgroundColor: isScrolledOrActive
            ? "rgba(18,17,15,0.98)"
            : "transparent",
          borderBottom: isScrolledOrActive
            ? "1px solid rgba(255,255,255,0.07)"
            : "1px solid transparent",
          backdropFilter: isScrolledOrActive ? "blur(12px)" : "none",
        }}
      >
        <div className="flex items-center justify-between px-5 md:px-8 h-12">
          {/* Left nav */}
          <nav
            className="hidden md:flex items-center gap-7"
            onMouseLeave={handleNavLeave}
          >
            {navItems.map(({ key, label }) => (
              <a
                key={key}
                href="#"
                onMouseEnter={() => handleNavEnter(key)}
                className="group relative font-sans text-[10px] tracking-luxury text-white/80 hover:text-white transition-colors duration-300"
                onClick={(e) => e.preventDefault()}
              >
                {label}
                <span
                  className="absolute -bottom-0.5 left-0 h-px bg-gold transition-all duration-300"
                  style={{ width: activeNav === key ? "100%" : "0%" }}
                />
              </a>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white/80"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={menuOpen ? "close" : "open"}
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                {menuOpen ? <X size={18} /> : <Menu size={18} />}
              </motion.div>
            </AnimatePresence>
          </button>

          {/* Center wordmark */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <a
              href="#"
              aria-label="Maison Jacques Fath — Home"
              className="opacity-90 hover:opacity-100 transition-opacity duration-300"
            >
              <span className="font-serif text-[11px] tracking-[0.28em] text-white/90 leading-none whitespace-nowrap">
                MAISON JACQUES FATH
              </span>
            </a>
          </div>

          {/* Right nav */}
          <div className="flex items-center gap-5">
            <div className="hidden md:flex items-center gap-6">
              {[
                { icon: <Search size={11} />, label: t.nav.search },
                { icon: <User size={11} />, label: t.nav.account },
                { icon: <ShoppingBag size={11} />, label: t.nav.bag },
              ].map(({ icon, label }) => (
                <button
                  key={label}
                  className="group font-sans text-[10px] tracking-luxury text-white/80 hover:text-white transition-colors duration-300 flex items-center gap-1.5"
                >
                  <span className="transition-transform duration-300 group-hover:scale-110">
                    {icon}
                  </span>
                  {label}
                </button>
              ))}

              {/* Language switcher */}
              <div className="flex items-center border-l border-white/20 pl-5 gap-0.5">
                {LANGS.map((l, i) => (
                  <span key={l} className="flex items-center">
                    <button
                      onClick={() => setLang(l)}
                      className="font-sans text-[10px] tracking-luxury transition-colors duration-300 px-1"
                      style={{
                        color:
                          lang === l
                            ? "rgba(255,255,255,0.95)"
                            : "rgba(255,255,255,0.32)",
                      }}
                      aria-label={`Switch to ${l}`}
                    >
                      {l}
                    </button>
                    {i < LANGS.length - 1 && (
                      <span className="text-white/20 text-[10px] select-none">
                        /
                      </span>
                    )}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex md:hidden items-center gap-4 text-white/80">
              <button aria-label="Search">
                <Search size={15} />
              </button>
              <button aria-label="Bag">
                <ShoppingBag size={15} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="md:hidden overflow-hidden border-t border-white/10"
              style={{ backgroundColor: "rgba(18,17,15,0.98)" }}
            >
              <div className="px-6 py-6 flex flex-col gap-5">
                {navItems.map(({ key, label }, i) => (
                  <motion.a
                    key={key}
                    href="#"
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.3 }}
                    className="font-sans text-[11px] tracking-luxury text-white/80 hover:text-gold transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    {label}
                  </motion.a>
                ))}
                <div className="border-t border-white/10 pt-4 flex flex-col gap-4">
                  <a
                    href="#"
                    className="font-sans text-[11px] tracking-luxury text-white/60"
                  >
                    {t.nav.account}
                  </a>
                  <div className="flex items-center gap-3 pt-1">
                    {LANGS.map((l, i) => (
                      <span key={l} className="flex items-center gap-3">
                        <button
                          onClick={() => setLang(l)}
                          className="font-sans text-[11px] tracking-luxury transition-colors duration-300"
                          style={{
                            color:
                              lang === l
                                ? "rgba(255,255,255,0.95)"
                                : "rgba(255,255,255,0.3)",
                          }}
                        >
                          {l}
                        </button>
                        {i < LANGS.length - 1 && (
                          <span className="text-white/20 text-[10px] select-none">
                            /
                          </span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mega menu panel — outside header so it sits below it cleanly */}
      <div onMouseEnter={handlePanelEnter} onMouseLeave={handlePanelLeave}>
        <MegaMenuPanel columns={megaColumns} isVisible={activeNav !== null} />
      </div>
    </div>
  )
}
