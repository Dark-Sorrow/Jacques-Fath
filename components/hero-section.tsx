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

  // Black overlay: 0 = transparent, 1 = fully black
  const blackOpacity = useMotionValue(0)
  // Static image opacity: 0 = hidden, 1 = visible
  const imageOpacity = useMotionValue(0)
  const fadingRef = useRef(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const onTimeUpdate = () => {
      if (fadingRef.current) return
      const remaining = video.duration - video.currentTime
      if (remaining <= FADE_BEFORE_END && video.duration > 0) {
        fadingRef.current = true

        // Step 1: fade video to black over ~1.4s
        animate(blackOpacity, 1, {
          duration: 1.4,
          ease: "easeIn",
          onComplete: () => {
            // Step 2: show static image behind black overlay
            imageOpacity.set(1)
            video.pause()

            // Step 3: fade black overlay away, revealing the static image
            animate(blackOpacity, 0, {
              duration: 1.6,
              ease: "easeOut",
            })
          },
        })
      }
    }

    // Fallback if video ends before timeupdate fires correctly
    const onEnded = () => {
      if (fadingRef.current) return
      fadingRef.current = true
      imageOpacity.set(1)
      animate(blackOpacity, 0, { duration: 1.2, ease: "easeOut" })
    }

    video.addEventListener("timeupdate", onTimeUpdate)
    video.addEventListener("ended", onEnded)
    return () => {
      video.removeEventListener("timeupdate", onTimeUpdate)
      video.removeEventListener("ended", onEnded)
    }
  }, [blackOpacity, imageOpacity])

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ minHeight: "100vh" }}
      aria-label="Hero"
    >
      {/* ── STATIC IMAGE LAYER — sits below everything, revealed after black fade ── */}
      <motion.div className="absolute inset-0" style={{ opacity: imageOpacity }}>
        <Image
          src="/hero-image.png"
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
      </motion.div>

      {/* ── VIDEO LAYER — sits above static image ─────────────── */}
      <div className="absolute inset-0">
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
      </div>

      {/* ── BLACK OVERLAY — fades in then out for cinematic transition ── */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-[5]"
        style={{ opacity: blackOpacity, backgroundColor: "#000" }}
      />

      {/* ── MONOGRAM (always visible) ─────────────────────────── */}
      <motion.div
        className="absolute top-0 left-0 pt-24 pl-8 md:pl-14 pointer-events-none z-20"
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
      <motion.div
        className="absolute bottom-0 left-0 pb-14 pl-8 md:pl-14 pr-8 max-w-md z-20"
        initial="hidden"
        animate="visible"
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
