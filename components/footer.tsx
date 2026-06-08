"use client"

import { useState } from "react"
import { ArrowRight, Instagram, Facebook } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"
import { useLang } from "@/lib/i18n"

const colStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const colItem = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
}

export default function Footer() {
  const [email, setEmail] = useState("")
  const { t } = useLang()

  const columns = [
    t.footer.columns.clientServices,
    t.footer.columns.boutiques,
    t.footer.columns.theHouse,
    t.footer.columns.legal,
    t.footer.columns.followUs,
  ]

  return (
    <footer className="bg-charcoal-deep text-white" aria-label="Footer">
      {/* Main footer content */}
      <div className="px-6 md:px-10 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          {/* Left — newsletter */}
          <motion.div
            className="flex flex-col gap-6"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div>
              <p className="font-serif text-base tracking-luxury text-white mb-1">{t.footer.joinTitle}</p>
              <p className="font-sans text-[11px] leading-relaxed text-white/50 max-w-[280px] mt-2 mb-5">
                {t.footer.joinBody}
              </p>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex border border-white/20 overflow-hidden max-w-[300px]"
              >
                <input
                  type="email"
                  placeholder={t.footer.emailPlaceholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-transparent font-sans text-[11px] px-4 py-3 text-white placeholder:text-white/30 outline-none"
                  aria-label={t.footer.emailPlaceholder}
                />
                <button
                  type="submit"
                  className="bg-transparent border-l border-white/20 text-white/70 px-4 hover:text-gold hover:border-gold transition-colors duration-200 flex items-center"
                  aria-label={t.footer.newsletter}
                >
                  <ArrowRight size={13} />
                </button>
              </form>
            </div>
          </motion.div>

          {/* Right — link columns */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 gap-8"
            variants={colStagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.1 }}
          >
            {columns.map((col) => (
              <motion.div key={`${col.title}-${col.links[0]}`} variants={colItem} className="flex flex-col gap-2.5">
                <p className="font-sans text-[9px] tracking-luxury text-white/50 mb-1 uppercase">{col.title}</p>
                {col.links.map((link) => (
                  <a
                    key={link}
                    href="#"
                    className="font-sans text-[11px] text-white/40 hover:text-gold transition-colors duration-200 leading-relaxed w-fit"
                  >
                    {link}
                  </a>
                ))}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 px-6 md:px-10 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
        <p className="font-sans text-[10px] text-white/30">
          {t.footer.copyright}
        </p>
        <div className="flex items-center gap-4">
          <a href="#" aria-label="Instagram" className="text-white/30 hover:text-gold transition-colors duration-200">
            <Instagram size={14} />
          </a>
          <a href="#" aria-label="Facebook" className="text-white/30 hover:text-gold transition-colors duration-200">
            <Facebook size={14} />
          </a>
          <a href="#" aria-label="Pinterest" className="text-white/30 hover:text-gold transition-colors duration-200">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.236 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.181-.78 1.172-4.97 1.172-4.97s-.299-.598-.299-1.482c0-1.388.806-2.428 1.808-2.428.852 0 1.265.64 1.265 1.408 0 .858-.546 2.14-.828 3.33-.236.995.499 1.806 1.476 1.806 1.772 0 3.137-1.868 3.137-4.558 0-2.386-1.716-4.053-4.165-4.053-2.837 0-4.502 2.128-4.502 4.327 0 .857.33 1.775.741 2.277a.3.3 0 0 1 .069.288c-.076.312-.244.995-.277 1.134-.044.183-.146.222-.337.134-1.249-.581-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 3.447-2.173 6.22-5.19 6.22-1.013 0-1.967-.527-2.292-1.148l-.623 2.378c-.226.869-.835 1.958-1.244 2.621.937.29 1.931.446 2.962.446 5.522 0 10-4.477 10-10S17.522 2 12 2z"/>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  )
}
