"use client"

export default function HeritageSection() {
  return (
    <section className="w-full flex flex-col md:flex-row" aria-label="Heritage">
      {/* Left image placeholder — dark/B&W */}
      <div className="w-full md:w-1/2 bg-[#1a1a18] min-h-[340px] md:min-h-[420px] relative flex items-center justify-center overflow-hidden">
        <span className="font-sans text-[10px] tracking-luxury text-white/20 uppercase select-none">Photo placeholder</span>
      </div>

      {/* Right text panel */}
      <div className="w-full md:w-1/2 bg-charcoal flex flex-col justify-center px-10 md:px-16 py-16 md:py-24">
        <p className="font-sans text-[9px] tracking-luxury text-gold mb-6 uppercase">Since 1937</p>
        <h2 className="font-serif text-2xl md:text-3xl leading-tight text-white mb-6 text-balance">
          AN ICONIC HERITAGE
        </h2>
        <p className="font-sans text-[13px] leading-relaxed text-white/60 mb-8 max-w-[300px]">
          Since 1937, Maison Jacques Fath has embodied the spirit of Parisian couture with boldness, refinement and vision.
        </p>
        <a
          href="#"
          className="group inline-flex items-center gap-2 font-sans text-[10px] tracking-luxury text-white/80 border-b border-white/20 pb-0.5 w-fit hover:border-gold hover:text-gold transition-colors duration-300"
        >
          EXPLORE OUR HISTORY
        </a>
      </div>
    </section>
  )
}
