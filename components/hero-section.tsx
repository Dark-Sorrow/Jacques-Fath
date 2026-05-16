"use client"

import Image from "next/image"

export default function HeroSection() {
  return (
    <section className="relative w-full" style={{ minHeight: "100vh" }} aria-label="Hero">
      {/* Full-width hero image */}
      <div className="w-full" style={{ minHeight: "100vh", position: "relative" }}>
        <Image
          src="/hero-image.png"
          alt="Maison Jacques Fath — Timeless French Elegance"
          fill
          className="object-cover object-center"
          priority
        />

        {/* Left vignette */}
        <div className="absolute inset-y-0 left-0 w-1/3 pointer-events-none" style={{ background: "linear-gradient(to right, rgba(0,0,0,0.45) 0%, transparent 100%)" }} />
        {/* Right vignette */}
        <div className="absolute inset-y-0 right-0 w-1/3 pointer-events-none" style={{ background: "linear-gradient(to left, rgba(0,0,0,0.35) 0%, transparent 100%)" }} />

        {/* Text overlay — left side */}
        <div className="absolute inset-0 flex flex-col justify-end pb-14 pl-8 md:pl-14 pr-8 max-w-sm">
          <p className="font-sans text-[10px] tracking-luxury text-white/50 mb-4 uppercase">
            Maison Jacques Fath
          </p>
          <h1 className="font-serif text-4xl md:text-5xl leading-tight text-white mb-5 text-balance">
            TIMELESS<br />FRENCH ELEGANCE
          </h1>
          <p className="font-sans text-[12px] leading-relaxed text-white/70 mb-8 max-w-[240px]">
            Discover the Maison Jacques Fath online boutique and explore our new collection.
          </p>
          <a
            href="#"
            className="group inline-flex items-center gap-2 font-sans text-[10px] tracking-luxury text-white border-b border-white/40 pb-1 w-fit hover:border-gold hover:text-gold transition-colors duration-300"
          >
            SHOP THE COLLECTION
          </a>
        </div>

        {/* Watermark logo bottom-right */}
        <div className="absolute bottom-8 right-8 opacity-20">
          <Image
            src="/logo-monogram.png"
            alt=""
            aria-hidden="true"
            width={48}
            height={58}
            className="object-contain invert"
          />
        </div>
      </div>
    </section>
  )
}
