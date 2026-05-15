"use client"

const products = [
  { number: "6", name: "EVENING DRESS", price: "€2,450", bg: "#c4c0b8" },
  { number: "7", name: "LEATHER BAG", price: "€1,950", bg: "#aaa69e" },
  { number: "8", name: "WOOL COAT", price: "€2,950", bg: "#2a2a28" },
  { number: "9", name: "SILK TOP", price: "€990", bg: "#d8d4cc" },
  { number: "10", name: "LEATHER LOAFERS", price: "€890", bg: "#1c1c1a" },
]

export default function NewArrivalsSection() {
  return (
    <section className="py-14 bg-background" aria-label="New Arrivals">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="font-serif text-lg tracking-luxury text-foreground">NEW ARRIVALS</h2>
      </div>

      {/* Products grid — 5 columns */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-0 px-6 md:px-10">
        {products.map((product) => (
          <a
            key={product.name}
            href="#"
            className="group block"
            aria-label={product.name}
          >
            {/* Image placeholder */}
            <div
              className="aspect-[3/4] flex flex-col items-center justify-center relative overflow-hidden"
              style={{ backgroundColor: product.bg }}
            >
              <span
                className="font-serif text-6xl"
                style={{ color: parseInt(product.number) >= 8 && product.bg.startsWith('#1') ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)' }}
              >
                {product.number}
              </span>
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-400" />
            </div>
            {/* Info */}
            <div className="py-3">
              <p className="font-sans text-[9px] tracking-luxury text-foreground mb-1 group-hover:text-gold transition-colors duration-300">
                {product.name}
              </p>
              <p className="font-sans text-[11px] text-muted-foreground">{product.price}</p>
            </div>
          </a>
        ))}
      </div>

      {/* View all */}
      <div className="flex justify-center mt-10">
        <a
          href="#"
          className="group font-sans text-[10px] tracking-luxury text-foreground border-b border-foreground/30 pb-0.5 hover:border-gold hover:text-gold transition-colors duration-300"
        >
          VIEW ALL
        </a>
      </div>
    </section>
  )
}
