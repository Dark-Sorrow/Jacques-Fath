"use client"

import Image from "next/image"
import { motion, animate, useMotionValue } from "framer-motion"
import { useLang } from "@/lib/i18n"
import { useRef, useEffect } from "react"

const VIDEO_SRC = "/videos/Video-Object-Remover-1780510099782.webm"
// Seconds before end to start fading to black
const FADE_BEFORE_END = 2.5

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1], delay },
  },
})


export default function HeroSection() {
  const { t } = useLang()
  const videoRef = useRef<HTMLVideoElement>(null)

  const blackOpacity = useMotionValue(0)
  const videoOpacity = useMotionValue(1)
  const fadingRef = useRef(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const startTransition = () => {
      if (fadingRef.current) return
      fadingRef.current = true

      // Step 1: fade to black
      animate(blackOpacity, 1, {
        duration: 1.4,
        ease: "easeIn",
        onComplete: () => {
          // Step 2: while black — hide video so static image is revealed underneath
          videoOpacity.set(0)
          video.pause()

          // Step 3: fade black away revealing the static image
          animate(blackOpacity, 0, {
            duration: 1.8,
            ease: "easeOut",
          })
        },
      })
    }

    const onTimeUpdate = () => {
      if (fadingRef.current) return
      const remaining = video.duration - video.currentTime
      if (remaining <= FADE_BEFORE_END && video.duration > 0) {
        startTransition()
      }
    }

    const onEnded = () => startTransition()

    video.addEventListener("timeupdate", onTimeUpdate)
    video.addEventListener("ended", onEnded)
    return () => {
      video.removeEventListener("timeupdate", onTimeUpdate)
      video.removeEventListener("ended", onEnded)
    }
  }, [blackOpacity, videoOpacity])

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ minHeight: "100vh" }}
      aria-label="Hero"
    >
      {/* ── STATIC IMAGE LAYER — always rendered, revealed when video hides ── */}
      <div className="absolute inset-0">
        <Image
          src="/hero-still.png"
          alt="Maison Jacques Fath — Timeless French Elegance"
          fill
          className="object-cover object-top"
          priority
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 50%)",
          }}
        />
      </div>

      {/* ── VIDEO LAYER — hides after transition via videoOpacity ─ */}
      <motion.div className="absolute inset-0" style={{ opacity: videoOpacity }}>
        <video
          ref={videoRef}
          src={VIDEO_SRC}
          autoPlay
          muted
          playsInline
          className="w-full h-full object-cover object-center"
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 50%)",
          }}
        />
      </motion.div>

      {/* ── BLACK OVERLAY — fades in then out for cinematic transition ── */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: blackOpacity, backgroundColor: "#000" }}
      />

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

      {/* ── TEXT BLOCK — always visible ───────────────────────── */}
      <div className="absolute bottom-0 left-0 pb-14 pl-8 md:pl-14 pr-8 max-w-md z-20">
        <motion.h1
          variants={fadeUp(0)}
          initial="hidden"
          animate="visible"
          className="font-serif text-4xl md:text-5xl leading-tight text-white mb-5 text-balance"
        >
          {t.hero.headline[0]}
          <br />
          {t.hero.headline[1]}
        </motion.h1>
        <motion.p
          variants={fadeUp(0.2)}
          initial="hidden"
          animate="visible"
          className="font-sans text-[12px] leading-relaxed text-white/70 mb-8 max-w-[240px]"
        >
          {t.hero.body}
        </motion.p>
        <motion.a
          variants={fadeUp(0.35)}
          initial="hidden"
          animate="visible"
          href="#"
          className="group inline-flex items-center gap-2 font-sans text-[10px] tracking-luxury text-white border-b border-white/40 pb-1 w-fit hover:border-gold hover:text-gold transition-colors duration-300"
        >
          {t.hero.cta}
        </motion.a>
      </div>
    </section>
  )
}
