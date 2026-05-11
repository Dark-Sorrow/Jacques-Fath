"use client"

import { useState, useEffect, useRef } from "react"
import { Search, User, ShoppingBag, Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const scrolled = useRef(false)
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    function update() {
      const isScrolled = window.scrollY > 10
      if (isScrolled !== scrolled.current) {
        scrolled.current = isScrolled
        if (headerRef.current) {
          headerRef.current.style.backgroundColor = isScrolled
            ? "rgba(247, 244, 240, 0.97)"
            : "transparent"
          headerRef.current.style.borderBottomColor = isScrolled
            ? "rgba(0,0,0,0.08)"
            : "transparent"
          headerRef.current.style.backdropFilter = isScrolled
            ? "blur(12px)"
            : "none"
        }
      }
    }

    // Run once immediately on mount
    update()
    window.addEventListener("scroll", update, { passive: true })
    return () => window.removeEventListener("scroll", update)
  }, [])

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 border-b border-transparent"
      style={{
        backgroundColor: "transparent",
        transition: "background-color 500ms ease, border-color 500ms ease, backdrop-filter 500ms ease",
      }}
    >
      <div className="flex items-center justify-between px-6 md:px-10 h-14">
        {/* Left nav */}
        <nav className="hidden md:flex items-center gap-8">
          {["HAUTE COUTURE", "BOUTIQUE", "MAISON FATH", "COLLECTIONS"].map((item) => (
            <a
              key={item}
              href="#"
              className="group relative font-sans text-[10px] tracking-luxury text-foreground hover:text-accent transition-colors duration-300"
            >
              {item}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-accent transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-foreground"
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

        {/* Center logo */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <a href="#" className="font-serif block group">
            <span className="block text-[13px] md:text-[15px] tracking-[0.28em] text-foreground font-normal leading-none transition-opacity duration-300 group-hover:opacity-70 whitespace-nowrap">
              MAISON JACQUES FATH
            </span>
          </a>
        </div>

        {/* Right nav */}
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-7">
            {[
              { icon: <Search size={11} />, label: "SEARCH" },
              { icon: <User size={11} />, label: "ACCOUNT" },
              { icon: <ShoppingBag size={11} />, label: "BAG (0)" },
            ].map(({ icon, label }) => (
              <button
                key={label}
                className="group font-sans text-[10px] tracking-luxury text-foreground hover:text-accent transition-colors duration-300 flex items-center gap-1.5"
              >
                <span className="transition-transform duration-300 group-hover:scale-110">{icon}</span>
                {label}
              </button>
            ))}
          </div>
          <div className="flex md:hidden items-center gap-4 text-foreground">
            <button aria-label="Search"><Search size={16} /></button>
            <button aria-label="Bag"><ShoppingBag size={16} /></button>
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
            className="md:hidden overflow-hidden bg-background border-t border-border"
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {["HAUTE COUTURE", "BOUTIQUE", "MAISON FATH", "COLLECTIONS"].map((item, i) => (
                <motion.a
                  key={item}
                  href="#"
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="font-sans text-[11px] tracking-luxury text-foreground hover:text-accent transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {item}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.28 }}
                className="border-t border-border pt-4 flex flex-col gap-4"
              >
                <a href="#" className="font-sans text-[11px] tracking-luxury text-foreground">ACCOUNT</a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
