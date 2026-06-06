"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { SlidersHorizontal, X, ChevronDown } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { ProductCard } from "@/components/catalog/product-card"
import { FiltersSidebar } from "@/components/catalog/filters-sidebar"
import { useLang } from "@/lib/i18n"

type FilterState = {
  category: string
  sizes: string[]
  colors: string[]
}

const DEFAULT_FILTERS: FilterState = {
  category: "all",
  sizes: [],
  colors: [],
}

export default function CatalogPage() {
  const { t } = useLang()
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS)
  const [sortValue, setSortValue] = useState("newest")
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [sortOpen, setSortOpen] = useState(false)

  const filtered = useMemo(() => {
    let result = [...t.catalog.products]
    if (filters.category !== "all") {
      result = result.filter((p) => p.category === filters.category)
    }
    return result
  }, [filters, t.catalog.products])

  const sortLabel = t.catalog.sortOptions.find((o) => o.value === sortValue)?.label ?? ""

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      {/* Page header */}
      <header className="pt-28 pb-10 px-6 md:px-10 border-b border-border">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-7xl mx-auto flex flex-col gap-1"
        >
          <p className="font-sans text-[10px] tracking-luxury text-muted-foreground uppercase">
            {t.catalog.subtitle}
          </p>
          <h1 className="font-serif text-3xl md:text-4xl tracking-luxury text-foreground">
            {t.catalog.title}
          </h1>
        </motion.div>
      </header>

      {/* Toolbar: results count + sort + mobile filter toggle */}
      <div className="border-b border-border px-6 md:px-10 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <p className="font-sans text-[10px] tracking-luxury text-muted-foreground">
            {filtered.length} {t.catalog.resultsCount}
          </p>

          <div className="flex items-center gap-4">
            {/* Sort dropdown */}
            <div className="relative">
              <button
                onClick={() => setSortOpen((o) => !o)}
                className="flex items-center gap-2 font-sans text-[10px] tracking-luxury text-foreground/60 hover:text-foreground transition-colors duration-200"
              >
                <span className="text-foreground/30">{t.catalog.sortBy}:</span>
                <span>{sortLabel}</span>
                <motion.span animate={{ rotate: sortOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown size={11} />
                </motion.span>
              </button>
              <AnimatePresence>
                {sortOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.18 }}
                    className="absolute right-0 top-full mt-2 z-30 bg-background border border-border shadow-sm min-w-[180px]"
                  >
                    {t.catalog.sortOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => { setSortValue(opt.value); setSortOpen(false) }}
                        className="w-full text-left px-4 py-3 font-sans text-[11px] tracking-luxury-sm transition-colors duration-150 hover:bg-muted"
                        style={{
                          color: sortValue === opt.value ? "oklch(0.15 0.01 250)" : "oklch(0.50 0.01 250)",
                          fontWeight: sortValue === opt.value ? 600 : 400,
                        }}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile filter toggle */}
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="md:hidden flex items-center gap-1.5 font-sans text-[10px] tracking-luxury text-foreground/60"
            >
              <SlidersHorizontal size={12} />
              {t.catalog.filters}
            </button>
          </div>
        </div>
      </div>

      {/* Main layout: sidebar + grid */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 md:px-10 py-10">
        <div className="flex gap-12">

          {/* Desktop sidebar */}
          <aside className="hidden md:block w-52 shrink-0">
            <FiltersSidebar filters={filters} onChange={setFilters} />
          </aside>

          {/* Product grid */}
          <div className="flex-1 min-w-0">
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-10">
              {filtered.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>

            {/* Empty state */}
            {filtered.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-24 text-center"
              >
                <p className="font-serif text-xl tracking-luxury text-foreground/30">
                  —
                </p>
                <p className="font-sans text-[11px] tracking-luxury text-muted-foreground mt-2">
                  No pieces match your selection
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </main>

      {/* Mobile filters drawer */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-50 bg-black/40"
              onClick={() => setMobileFiltersOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-y-0 left-0 z-50 w-80 bg-background overflow-y-auto"
            >
              <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-border">
                <span className="font-sans text-[9px] tracking-luxury text-foreground/50 uppercase">
                  {t.catalog.filters}
                </span>
                <button onClick={() => setMobileFiltersOpen(false)} aria-label="Close filters">
                  <X size={16} className="text-foreground/50" />
                </button>
              </div>
              <div className="px-6 pb-10">
                <FiltersSidebar filters={filters} onChange={setFilters} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  )
}
