"use client"

import { motion } from "framer-motion"
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

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14 } },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
}

export default function ServicesSection() {
  return (
    <section className="bg-background border-t border-border py-12 px-6 md:px-10" aria-label="Services">
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-8"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {services.map((service) => (
          <motion.div
            key={service.title}
            variants={item}
            className="flex flex-col items-center text-center gap-3"
          >
            <div className="text-foreground/70">{service.icon}</div>
            <p className="font-sans text-[9px] tracking-luxury text-foreground uppercase leading-tight">
              {service.title}
            </p>
            <p className="font-sans text-[11px] leading-relaxed text-muted-foreground max-w-[160px]">
              {service.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
