"use client"

import { useState, useRef } from "react"
import { ArrowRight } from "lucide-react"
import { motion, useInView } from "framer-motion"

const footerLinks = {
  "CLIENT SERVICES": ["Contact Us", "Shipping & Delivery", "Returns & Exchanges", "FAQ"],
  "THE MAISON": ["Our Story", "Heritage", "Savoir-Faire", "News"],
  "LEGAL": ["Terms & Conditions", "Privacy Policy", "Cookies"],
  "FOLLOW US": ["Instagram", "Facebook", "Pinterest"],
}

export default function Footer() {
  const [email, setEmail] = useState("")
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <footer className="bg-background border-t border-border" aria-label="Footer" ref={ref}>
      <motion.div
        className="px-6 md:px-10 py-16"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10 md:gap-6">
          {/* Logo monogram */}
          <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
            <div className="font-serif text-3xl text-accent leading-none select-none" aria-label="Jacques Fath monogram">
              JF
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="flex flex-col gap-3">
              <p className="font-sans text-[9px] tracking-luxury text-foreground mb-1">{title}</p>
              {links.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="group font-sans text-[11px] text-muted-foreground hover:text-accent transition-colors duration-200 leading-relaxed relative w-fit"
                >
                  {link}
                  <span className="absolute -bottom-px left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </div>
          ))}

          {/* Newsletter */}
          <div className="col-span-2 flex flex-col gap-4">
            <p className="font-sans text-[9px] tracking-luxury text-foreground">
              SUBSCRIBE TO OUR NEWSLETTER
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex border border-border overflow-hidden"
            >
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-transparent font-sans text-[11px] px-4 py-3 text-foreground placeholder:text-muted-foreground outline-none"
                aria-label="Email address"
              />
              <button
                type="submit"
                className="bg-primary text-primary-foreground px-4 hover:bg-accent transition-colors duration-200 flex items-center"
                aria-label="Subscribe"
              >
                <ArrowRight size={13} />
              </button>
            </form>
          </div>
        </div>
      </motion.div>

      {/* Bottom bar */}
      <div className="border-t border-border px-6 md:px-10 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
        <p className="font-sans text-[10px] text-muted-foreground">
          &copy; JACQUES FATH 2024
        </p>
        <p className="font-sans text-[10px] tracking-luxury text-muted-foreground">
          MADE IN PARIS
        </p>
      </div>
    </footer>
  )
}
