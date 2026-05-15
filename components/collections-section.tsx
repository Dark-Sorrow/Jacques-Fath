"use client"

const categories = [
  { name: "WOMEN", number: "2", bg: "#2e2c29" },
  { name: "MEN", number: "3", bg: "#1e1e1e" },
  { name: "THE HOUSE", number: "4", bg: "#5a1a1a" },
]

export default function CollectionsSection() {
  return (
    <section className="w-full" aria-label="Categories">
      <div className="grid grid-cols-3">
        {categories.map((cat) => (
          <a
            key={cat.name}
            href="#"
            className="group relative aspect-[3/4] flex flex-col justify-end overflow-hidden cursor-pointer"
            style={{ backgroundColor: cat.bg }}
            aria-label={cat.name}
          >
            {/* Numbered placeholder */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-serif text-7xl md:text-8xl text-white/10">{cat.number}</span>
            </div>

            {/* Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

            {/* Label */}
            <div className="relative z-10 p-5 pb-6">
              <p className="font-serif text-sm tracking-luxury text-white mb-1">{cat.name}</p>
              <p className="font-sans text-[9px] tracking-luxury text-white/60 group-hover:text-gold transition-colors duration-300">
                Discover
              </p>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
