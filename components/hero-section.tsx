"use client"

import Image from "next/image"
import { motion, animate, useMotionValue, useTransform } from "framer-motion"
import { useLang } from "@/lib/i18n"
import { useRef, useEffect, useState } from "react"

const VIDEO_SRC = "/videos/Video-Object-Remover-1780510099782.webm"
// How many seconds before end to start the fade-to-image transition
const FADE_BEFORE_END = 1.8

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1], delay },
  },
})

const fadeIn = (delay = 0) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 1.4, ease: "easeOut", delay },
  },
})

export default function HeroSection() {
  const { t } = useLang()
  const videoRef = useRef<HTMLVideoElement>(null)

  // 0 = video fully visible, 1 = image fully visible
  const imageOpacity = useMotionValue(0)
  const [imageVisible, setImageVisible] = useState(false)
  const [textVisible, setTextVisible] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Show image layer as soon as we begin fading
    const onTimeUpdate = () => {
      const remaining = video.duration - video.currentTime
      if (remaining <= FADE_BEFORE_END && video.duration > 0) {
        if (!imageVisible) setImageVisible(true)
        // progress 0→1 over FADE_BEFORE_END seconds
        const progress = Math.min(
          1,
          (FADE_BEFORE_END - remaining) / FADE_BEFORE_END
        )
        imageOpacity.set(progress)
      }
    }

    const onEnded = () => {
      // Snap to fully showing image and reveal text
      animate(imageOpacity, 1, { duration: 0.3 })
      setTextVisible(true)
    }

    video.addEventListener("timeupdate", onTimeUpdate)
    video.addEventListener("ended", onEnded)
    return () => {
      video.removeEventListener("timeupdate", onTimeUpdate)
      video.removeEventListener("ended", onEnded)
    }
  }, [imageOpacity, imageVisible])

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ minHeight: "100vh" }}
      aria-label="Hero"
    >
      {/* ── VIDEO LAYER ─────────────────────────────────────────── */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          src={VIDEO_SRC}
          autoPlay
          muted
          playsInline
          className="w-full h-full object-cover object-center"
        />
        {/* dark vignettes on the video */}
        <div
          className="absolute inset-y-0 left-0 w-1/3 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, rgba(0,0,0,0.45) 0%, transparent 100%)",
          }}
        />
        <div
          className="absolute inset-y-0 right-0 w-1/3 pointer-events-none"
          style={{
            background:
              "linear-gradient(to left, rgba(0,0,0,0.35) 0%, transparent 100%)",
          }}
        />
      </div>

      {/* ── STATIC IMAGE LAYER — fades in over video end ─────── */}
      <motion.div
        className="absolute inset-0"
        style={{ opacity: imageOpacity }}
      >
        <Image
          src="/hero-image.png"
          alt="Maison Jacques Fath — Timeless French Elegance"
          fill
          className="object-cover object-top"
          priority
        />
        {/* vignettes on the static image too */}
        <div
          className="absolute inset-y-0 left-0 w-1/3 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, rgba(0,0,0,0.45) 0%, transparent 100%)",
          }}
        />
        <div
          className="absolute inset-y-0 right-0 w-1/3 pointer-events-none"
          style={{
            background:
              "linear-gradient(to left, rgba(0,0,0,0.35) 0%, transparent 100%)",
          }}
        />
      </motion.div>

      {/* ── MONOGRAM (always visible) ─────────────────────────── */}
      <motion.div
        className="absolute top-0 left-0 pt-24 pl-8 md:pl-14 pointer-events-none z-10"
        variants={fadeIn(0.3)}
        initial="hidden"
        animate="visible"
      >
        <Image
          src="/logo-monogram.png"
          alt="Maison Jacques Fath"
          width={200}
          height={240}
          className="object-contain"
          style={{
            width: "clamp(220px, 22vw, 360px)",
            height: "auto",
            filter:
              "brightness(0) invert(1) drop-shadow(0 0 32px rgba(255,255,255,0.18)) drop-shadow(0 10px 50px rgba(0,0,0,0.55))",
            opacity: 0.95,
          }}
          priority
        />
      </motion.div>

      {/* ── TEXT BLOCK — appears after video ends ─────────────── */}
      <motion.div
        className="absolute bottom-0 left-0 pb-14 pl-8 md:pl-14 pr-8 max-w-md z-10"
        initial="hidden"
        animate={textVisible ? "visible" : "hidden"}
      >
        <motion.p
          variants={fadeUp(0)}
          className="font-sans text-[10px] tracking-luxury text-white/50 mb-4 uppercase"
        >
          {t.hero.eyebrow}
        </motion.p>
        <motion.h1
          variants={fadeUp(0.2)}
          className="font-serif text-4xl md:text-5xl leading-tight text-white mb-5 text-balance"
        >
          {t.hero.headline[0]}
          <br />
          {t.hero.headline[1]}
        </motion.h1>
        <motion.p
          variants={fadeUp(0.4)}
          className="font-sans text-[12px] leading-relaxed text-white/70 mb-8 max-w-[240px]"
        >
          {t.hero.body}
        </motion.p>
        <motion.a
          variants={fadeUp(0.55)}
          href="#"
          className="group inline-flex items-center gap-2 font-sans text-[10px] tracking-luxury text-white border-b border-white/40 pb-1 w-fit hover:border-gold hover:text-gold transition-colors duration-300"
        >
          {t.hero.cta}
        </motion.a>
      </motion.div>
    </section>
  )
}
