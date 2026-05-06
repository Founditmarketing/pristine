import { useRef } from 'react'
import { Link } from 'react-router'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'

const ease = [0.16, 1, 0.3, 1]

const HEADLINE = ['Pristine', 'water,', 'thriving', 'ecosystems,', 'year', 'after', 'year.']

/**
 * Cinematic hero. Image is generated locally via scripts/generate-images.mjs
 * (Gemini 2.5 Flash Image, "Nano Banana") so the brand owns the asset and
 * the URL is not subject to a third-party CDN. Re-run that script to
 * regenerate; swap HERO_IMAGE if you ever shoot real client photography.
 */
const HERO_IMAGE = '/images/hero-pond-dawn.webp'

export function Hero() {
  const sectionRef = useRef(null)
  const reduceMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  // Background drifts up slower than the foreground for parallax depth.
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', reduceMotion ? '0%' : '22%'])
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [1, 1.2])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', reduceMotion ? '0%' : '-10%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section
      ref={sectionRef}
      className="relative isolate min-h-[100svh] overflow-hidden bg-navy-deep text-cream"
    >
      {/* Photo layer with slow Ken Burns + scroll parallax */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 -z-20"
      >
        <div
          className="ken-burns absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMAGE})` }}
          role="img"
          aria-label="A still pond at dawn surrounded by pines"
        />
      </motion.div>

      {/* Color grading overlays. Layered for depth. */}
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 -z-10 bg-gradient-to-b from-navy-deep/70 via-navy-deep/45 to-navy-deep/95"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-navy-deep/30 via-transparent to-gold/[0.06]" />

      {/* Animated ripples, bottom left */}
      <Ripples />

      {/* Subtle vignette */}
      <div className="pointer-events-none absolute inset-0 -z-10 [box-shadow:inset_0_0_240px_rgba(0,0,0,0.45)]" />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="container-page relative flex min-h-[100svh] flex-col justify-center pt-28 pb-32 sm:pt-32 sm:pb-28"
      >
        <motion.p
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease, delay: 0.2 }}
          className="eyebrow !text-gold-soft"
        >
          Louisiana Pond & Lake Management
        </motion.p>

        <h1 className="mt-6 max-w-5xl font-display font-semibold text-cream [font-size:var(--text-display-lg)]">
          {HEADLINE.map((word, i) => (
            <span
              key={`${word}-${i}`}
              className="mr-[0.22em] inline-block overflow-hidden align-bottom"
            >
              <motion.span
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{
                  duration: 0.9,
                  ease,
                  delay: 0.35 + i * 0.06,
                }}
                className="inline-block"
              >
                {word === 'thriving' ? (
                  <span className="text-gold">{word}</span>
                ) : (
                  word
                )}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease, delay: 1.05 }}
          className="mt-8 max-w-xl text-base text-cream/80 leading-relaxed sm:text-lg"
        >
          Full-service care for the waterbodies that define your land. Dredging,
          aeration, fisheries, and clarity work, delivered with the patience of
          people who actually love this work.
        </motion.p>

        <motion.div
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease, delay: 1.2 }}
          className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
        >
          <Link to="/contact">
            <Button variant="primary" size="lg" className="w-full sm:w-auto">
              Get a free assessment
              <ArrowRight className="h-4 w-4 transition-transform duration-500 ease-[var(--ease-out-quart)] group-hover/btn:translate-x-1" />
            </Button>
          </Link>
          <Link to="/services">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Explore services
            </Button>
          </Link>
        </motion.div>

        {/* Trust line under the CTAs. Plain text by design; no logo zoo. */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease, delay: 1.45 }}
          className="mt-12 text-xs uppercase tracking-[0.2em] text-cream/55"
        >
          Trusted by estates, municipalities, golf courses, and HOAs across the Gulf South
        </motion.p>
      </motion.div>

      <ScrollCue />
    </section>
  )
}

/* ----- decoration ----- */

function Ripples() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 480 480"
      className="pointer-events-none absolute -bottom-20 -left-24 h-[460px] w-[460px] text-cream/20"
      fill="none"
    >
      {[60, 120, 180, 240, 300].map((r, i) => (
        <motion.circle
          key={r}
          cx="240"
          cy="240"
          r={r}
          stroke="currentColor"
          strokeWidth="1"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{
            opacity: [0, 0.7, 0],
            scale: [0.7, 1.05, 1.15],
          }}
          transition={{
            duration: 5,
            ease,
            repeat: Infinity,
            delay: i * 0.9,
          }}
        />
      ))}
    </svg>
  )
}

function ScrollCue() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease, delay: 1.7 }}
      className="pointer-events-none absolute inset-x-0 bottom-6 z-10 hidden justify-center pb-[env(safe-area-inset-bottom)] sm:flex"
    >
      <div className="flex flex-col items-center gap-3 text-cream/65">
        <span className="text-[0.625rem] uppercase tracking-[0.3em]">Scroll</span>
        <span aria-hidden="true" className="relative h-12 w-px bg-cream/30 overflow-hidden">
          <motion.span
            className="absolute inset-x-0 top-0 h-1/3 bg-gold"
            animate={{ y: ['-100%', '300%'] }}
            transition={{
              duration: 2.4,
              ease: [0.45, 0, 0.55, 1],
              repeat: Infinity,
              repeatDelay: 0.4,
            }}
          />
        </span>
      </div>
    </motion.div>
  )
}
