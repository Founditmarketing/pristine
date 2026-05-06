import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { testimonials } from '@/data/testimonials'
import { cn } from '@/lib/utils'

const ease = [0.16, 1, 0.3, 1]
const AUTOPLAY_MS = 7000

export function Testimonials() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length)
    }, AUTOPLAY_MS)
    return () => clearInterval(id)
  }, [paused])

  const current = testimonials[index]

  // Stay paused for a moment after touch interaction so a tap on the dots
  // does not immediately advance away from the chosen quote.
  const touchPause = () => {
    setPaused(true)
    clearTimeout(touchPause._t)
    touchPause._t = setTimeout(() => setPaused(false), 12000)
  }

  return (
    <section
      className="relative overflow-hidden bg-sand-deep py-24 sm:py-32"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onTouchStart={touchPause}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {/* Decorative oversized quote glyph */}
      <Quote
        aria-hidden="true"
        className="absolute -left-8 top-12 h-72 w-72 -rotate-6 text-gold/15"
        strokeWidth={1.2}
      />

      <div className="container-page relative grid gap-16 lg:grid-cols-12 lg:items-start">
        <SectionHeader
          eyebrow="What clients say"
          title="Quiet praise from people who do not give it lightly."
          lede="No paid testimonials, no stock photos. Just owners and managers we have worked with for years."
          className="lg:col-span-4"
        />

        <div className="relative lg:col-span-8" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.figure
              key={current.author}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -16, opacity: 0 }}
              transition={{ duration: 0.6, ease }}
              className="flex flex-col gap-8"
            >
              <blockquote className="font-serif italic text-navy [font-size:clamp(1.5rem,2.6vw,2.25rem)] leading-[1.25] text-balance">
                {current.quote}
              </blockquote>
              <figcaption className="flex items-center gap-4">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-navy text-cream font-display font-semibold">
                  {current.author
                    .split(' ')
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join('')}
                </span>
                <span className="flex flex-col">
                  <span className="font-display text-base font-semibold text-navy">
                    {current.author}
                  </span>
                  <span className="text-sm text-mute">
                    {current.role}, {current.location}
                  </span>
                </span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>

          <div className="mt-10 -ml-1 flex items-center" role="tablist" aria-label="Choose testimonial">
            {testimonials.map((t, i) => {
              const active = i === index
              return (
                <button
                  key={t.author}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  aria-label={`Show testimonial from ${t.author}`}
                  onClick={() => setIndex(i)}
                  className="group relative grid h-11 w-12 place-items-center"
                >
                  {/* Visual bar stays small; the button itself is a 44px touch target. */}
                  <span className="relative h-1.5 w-10 overflow-hidden rounded-full bg-navy/10">
                    <span
                      className={cn(
                        'absolute inset-0 origin-left bg-navy transition-transform duration-500 ease-[var(--ease-out-quart)]',
                        active ? 'scale-x-100 bg-gold-deep' : 'scale-x-0',
                      )}
                    />
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
