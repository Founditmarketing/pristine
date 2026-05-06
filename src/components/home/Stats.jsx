import { useEffect, useRef } from 'react'
import { animate, motion, useInView, useMotionValue, useTransform } from 'framer-motion'
import { stats } from '@/data/stats'

const ease = [0.16, 1, 0.3, 1]

export function Stats() {
  return (
    <section className="relative overflow-hidden bg-navy text-cream">
      {/* Faint horizon line graphic */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="absolute inset-x-0 top-0 h-16 w-full text-cream/[0.04]"
      >
        <path
          d="M0 60c120 28 240 28 360 0s240-28 360 0 240 28 360 0 240-28 360 0v60H0z"
          fill="currentColor"
        />
      </svg>

      <div className="container-page py-20 sm:py-24">
        <p className="eyebrow !text-gold-soft">By the numbers</p>
        <h2 className="mt-4 max-w-3xl text-cream text-balance [font-size:var(--text-display-sm)]">
          Two and a half decades of muddy boots and clear water.
        </h2>

        <div className="mt-14 grid grid-cols-2 gap-y-10 gap-x-6 sm:gap-x-8 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Stat key={s.label} stat={s} delay={i * 0.08} />
          ))}
        </div>
      </div>
    </section>
  )
}

function Stat({ stat, delay }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const value = useMotionValue(0)
  const display = useTransform(value, (v) => Math.round(v).toLocaleString())

  useEffect(() => {
    if (!inView) return
    const controls = animate(value, stat.value, {
      duration: 2.2,
      ease,
      delay,
    })
    return controls.stop
  }, [inView, value, stat.value, delay])

  return (
    <motion.div
      ref={ref}
      initial={{ y: 24, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.7, ease, delay }}
      className="flex flex-col gap-3"
    >
      <div className="font-display text-cream [font-size:clamp(2.5rem,5.5vw,4.5rem)] font-semibold leading-none tracking-tight">
        <motion.span>{display}</motion.span>
        {stat.suffix && <span className="text-gold">{stat.suffix}</span>}
      </div>
      <p className="text-sm uppercase tracking-[0.18em] text-cream/65">
        {stat.label}
      </p>
    </motion.div>
  )
}
