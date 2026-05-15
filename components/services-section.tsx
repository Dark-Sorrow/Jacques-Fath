"use client"

import { Truck, RefreshCw, User, Star } from "lucide-react"

const services = [
  {
    icon: <Truck size={22} strokeWidth={1.25} />,
    title: "COMPLIMENTARY SHIPPING",
    description: "Enjoy complimentary shipping on all orders.",
  },
  {
    icon: <RefreshCw size={22} strokeWidth={1.25} />,
    title: "EASY RETURNS",
    description: "Complimentary returns within 30 days.",
  },
  {
    icon: <User size={22} strokeWidth={1.25} />,
    title: "PERSONAL SHOPPING",
    description: "Book an appointment with our style advisors.",
  },
  {
    icon: <Star size={22} strokeWidth={1.25} />,
    title: "MADE IN FRANCE",
    description: "Crafted with exceptional savoir-faire in France.",
  },
]

export default function ServicesSection() {
  return (
    <section className="bg-background border-t border-border py-12 px-6 md:px-10" aria-label="Services">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {services.map((service) => (
          <div key={service.title} className="flex flex-col items-center text-center gap-3">
            <div className="text-foreground/70">{service.icon}</div>
            <p className="font-sans text-[9px] tracking-luxury text-foreground uppercase leading-tight">
              {service.title}
            </p>
            <p className="font-sans text-[11px] leading-relaxed text-muted-foreground max-w-[160px]">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
