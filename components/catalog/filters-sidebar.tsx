"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { useLang } from "@/lib/i18n"

const COLOR_MAP: Record<string, string> = {
  ivory: "#F5F0E8",
  noir: "#1A1A1A",
  beige: "#D4C5B0",
  camel: "#C19A6B",
  bordeaux: "#6B1E28",
}

function FilterSection({
  title,
  children,
  defaultOpen = true,
}: {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border-b border-border py-4">
      <button
        className="w-full flex items-center justify-between"
        onClick={() => setOpen((o) => !o)}
      >
        <span className="font-sans text-[9px] tracking-luxury text-foreground/60 uppercase">
          {title}
        </span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={12} className="text-foreground/40" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pt-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

type FilterState = {
  category: string
  sizes: string[]
  colors: string[]
}

type Props = {
  filters: FilterState
  onChange: (filters: FilterState) => void
}

export function FiltersSidebar({ filters, onChange }: Props) {
  const { t } = useLang()

  const toggleSize = (size: string) => {
    const next = filters.sizes.includes(size)
      ? filters.sizes.filter((s) => s !== size)
      : [...filters.sizes, size]
    onChange({ ...filters, sizes: next })
  }

  const toggleColor = (color: string) => {
    const next = filters.colors.includes(color)
      ? filters.colors.filter((c) => c !== color)
      : [...filters.colors, color]
    onChange({ ...filters, colors: next })
  }

  return (
    <aside className="flex flex-col" aria-label={t.catalog.filters}>
      <div className="border-b border-border pb-4 mb-1">
        <span className="font-sans text-[9px] tracking-luxury text-foreground/50 uppercase">
          {t.catalog.filters}
        </span>
      </div>

      {/* Category */}
      <FilterSection title={t.catalog.filterLabels.category}>
        <ul className="flex flex-col gap-2.5">
          {t.catalog.categories.map((cat) => (
            <li key={cat.value}>
              <button
                onClick={() => onChange({ ...filters, category: cat.value })}
                className="group flex items-center gap-2.5 w-full text-left"
              >
                <span
                  className="h-px transition-all duration-200 shrink-0"
                  style={{
                    width: filters.category === cat.value ? 16 : 0,
                    backgroundColor: "oklch(0.635 0.115 74)",
                  }}
                />
                <span
                  className="font-sans text-[11px] tracking-luxury-sm transition-colors duration-200"
                  style={{
                    color:
                      filters.category === cat.value
                        ? "oklch(0.15 0.01 250)"
                        : "oklch(0.50 0.01 250)",
                  }}
                >
                  {cat.label}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </FilterSection>

      {/* Size */}
      <FilterSection title={t.catalog.filterLabels.size}>
        <div className="flex flex-wrap gap-2">
          {t.catalog.sizes.map((size) => {
            const active = filters.sizes.includes(size)
            return (
              <button
                key={size}
                onClick={() => toggleSize(size)}
                className="w-10 h-10 flex items-center justify-center font-sans text-[10px] tracking-luxury-sm border transition-colors duration-200"
                style={{
                  borderColor: active ? "oklch(0.15 0.01 250)" : "oklch(0.87 0.006 75)",
                  backgroundColor: active ? "oklch(0.15 0.01 250)" : "transparent",
                  color: active ? "oklch(0.975 0.004 75)" : "oklch(0.50 0.01 250)",
                }}
              >
                {size}
              </button>
            )
          })}
        </div>
      </FilterSection>

      {/* Color */}
      <FilterSection title={t.catalog.filterLabels.color}>
        <div className="flex flex-col gap-3">
          {t.catalog.colors.map((col) => {
            const active = filters.colors.includes(col.value)
            return (
              <button
                key={col.value}
                onClick={() => toggleColor(col.value)}
                className="flex items-center gap-3"
              >
                <span
                  className="w-5 h-5 border shrink-0 transition-all duration-150"
                  style={{
                    backgroundColor: COLOR_MAP[col.value] ?? "#ccc",
                    borderColor: active ? "oklch(0.15 0.01 250)" : "oklch(0.87 0.006 75)",
                    outline: active ? "2px solid oklch(0.635 0.115 74)" : "none",
                    outlineOffset: 1,
                  }}
                />
                <span
                  className="font-sans text-[11px] tracking-luxury-sm transition-colors duration-200"
                  style={{
                    color: active ? "oklch(0.15 0.01 250)" : "oklch(0.50 0.01 250)",
                  }}
                >
                  {col.label}
                </span>
              </button>
            )
          })}
        </div>
      </FilterSection>
    </aside>
  )
}
