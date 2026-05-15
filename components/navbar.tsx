"use client"

import { useState } from "react"
import { Search, User, ShoppingBag, Menu, X } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      {/* Announcement bar */}
      <div className="w-full bg-charcoal text-center py-2.5">
        <p className="font-sans text-[10px] tracking-luxury text-white/80">
          COMPLIMENTARY DELIVERY &amp; RETURNS ON ALL ORDERS
        </p>
      </div>

      {/* Main nav */}
      <header className="bg-charcoal border-b border-white/10 sticky top-0 z-50">
        <div className="flex items-center justify-between px-5 md:px-8 h-12">
          {/* Left nav */}
          <nav className="hidden md:flex items-center gap-7">
            {["WOMEN", "MEN", "HOUSE"].map((item) => (
              <a
                key={item}
                href="#"
                className="group relative font-sans text-[10px] tracking-luxury text-white/80 hover:text-white transition-colors duration-300"
              >
                {item}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full" />
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

          {/* Center logo */}
          <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-0.5">
            <a href="#" aria-label="Maison Jacques Fath — Home" className="flex flex-col items-center group opacity-90 hover:opacity-100 transition-opacity duration-300">
              <Image
                src="/logo-monogram.png"
                alt="Jacques Fath monogram"
                width={28}
                height={28}
                className="object-contain w-7 h-auto"
                priority
              />
              <span className="font-serif text-[8px] tracking-[0.22em] text-white/75 leading-none mt-0.5">
                MAISON JACQUES FATH
              </span>
              <span className="font-sans text-[7px] tracking-[0.28em] text-white/40 leading-none mt-px">
                PARIS
              </span>
            </a>
          </div>

          {/* Right nav */}
          <div className="flex items-center gap-5">
            <div className="hidden md:flex items-center gap-6">
              {[
                { icon: <Search size={11} />, label: "SEARCH" },
                { icon: <User size={11} />, label: "ACCOUNT" },
                { icon: <ShoppingBag size={11} />, label: "BAG (0)" },
              ].map(({ icon, label }) => (
                <button
                  key={label}
                  className="group font-sans text-[10px] tracking-luxury text-white/80 hover:text-white transition-colors duration-300 flex items-center gap-1.5"
                >
                  <span className="transition-transform duration-300 group-hover:scale-110">{icon}</span>
                  {label}
                </button>
              ))}
            </div>
            <div className="flex md:hidden items-center gap-4 text-white/80">
              <button aria-label="Search"><Search size={15} /></button>
              <button aria-label="Bag"><ShoppingBag size={15} /></button>
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
              className="md:hidden overflow-hidden bg-charcoal border-t border-white/10"
            >
              <div className="px-6 py-6 flex flex-col gap-5">
                {["WOMEN", "MEN", "HOUSE"].map((item, i) => (
                  <motion.a
                    key={item}
                    href="#"
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.3 }}
                    className="font-sans text-[11px] tracking-luxury text-white/80 hover:text-gold transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item}
                  </motion.a>
                ))}
                <div className="border-t border-white/10 pt-4 flex flex-col gap-4">
                  <a href="#" className="font-sans text-[11px] tracking-luxury text-white/60">ACCOUNT</a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  )
}
