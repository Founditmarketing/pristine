import { useCallback, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronsLeftRight } from 'lucide-react'
import { SectionHeader } from '@/components/shared/SectionHeader'

/**
 * Drag-to-compare slider. Single source image with a stylized "before" filter
 * (desaturated and warm-shifted to suggest neglect) so the comparison reads
 * cleanly without sourcing a matched photo pair. Swap in real client
 * before/after photography by pointing BEFORE_IMAGE and AFTER_IMAGE at
 * different URLs.
 */
const BEFORE_IMAGE =
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=85'
const AFTER_IMAGE = BEFORE_IMAGE

const BEFORE_FILTER = 'saturate(0.35) brightness(0.78) sepia(0.45) contrast(0.95)'

export function BeforeAfter() {
  const containerRef = useRef(null)
  const dragging = useRef(false)
  const [percent, setPercent] = useState(50)

  const setFromPointer = useCallback((clientX) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const next = ((clientX - rect.left) / rect.width) * 100
    setPercent(Math.max(0, Math.min(100, next)))
  }, [])

  const onPointerDown = (e) => {
    dragging.current = true
    containerRef.current?.setPointerCapture?.(e.pointerId)
    setFromPointer(e.clientX)
  }
  const onPointerMove = (e) => {
    if (!dragging.current) return
    setFromPointer(e.clientX)
  }
  const onPointerUp = (e) => {
    dragging.current = false
    containerRef.current?.releasePointerCapture?.(e.pointerId)
  }

  const onKeyDown = (e) => {
    if (e.key === 'ArrowLeft') setPercent((p) => Math.max(0, p - 4))
    if (e.key === 'ArrowRight') setPercent((p) => Math.min(100, p + 4))
    if (e.key === 'Home') setPercent(0)
    if (e.key === 'End') setPercent(100)
  }

  return (
    <section className="relative bg-cream py-24 sm:py-32">
      <div className="container-page">
        <SectionHeader
          eyebrow="Before and after"
          title="Drag to see what one season can do."
          lede="Same waterbody, same vantage point, two summers apart. The work is patient. The change is not subtle."
        />

        <motion.div
          initial={{ y: 24, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 overflow-hidden rounded-[var(--radius-card)] ring-1 ring-hairline shadow-[var(--shadow-soft)]"
        >
          <div
            ref={containerRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            className="relative h-[55svh] min-h-[22rem] w-full cursor-ew-resize touch-none select-none bg-navy sm:h-[60svh] sm:min-h-[26rem]"
            role="region"
            aria-label="Before and after pond comparison. Use arrow keys to compare."
          >
            {/* AFTER (bottom layer, fully visible) */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${AFTER_IMAGE})` }}
            />

            {/* BEFORE (top layer, clipped to left of divider) */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${BEFORE_IMAGE})`,
                filter: BEFORE_FILTER,
                clipPath: `inset(0 ${100 - percent}% 0 0)`,
              }}
            />

            {/* Labels */}
            <span className="pointer-events-none absolute left-5 top-5 inline-flex items-center rounded-full bg-navy/70 px-3 py-1 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-cream backdrop-blur-sm">
              Before
            </span>
            <span className="pointer-events-none absolute right-5 top-5 inline-flex items-center rounded-full bg-gold px-3 py-1 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-navy">
              After
            </span>

            {/* Divider line */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 w-px bg-cream/85"
              style={{ left: `${percent}%` }}
            />

            {/* Handle */}
            <button
              type="button"
              onKeyDown={onKeyDown}
              aria-label={`Comparison position ${Math.round(percent)} percent`}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(percent)}
              role="slider"
              className="absolute top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-cream text-navy shadow-[var(--shadow-lift)] ring-2 ring-gold transition-transform duration-200 ease-[var(--ease-out-quart)] hover:scale-105 active:scale-95 focus-visible:outline-none sm:h-12 sm:w-12"
              style={{ left: `${percent}%` }}
            >
              <ChevronsLeftRight className="h-6 w-6 sm:h-5 sm:w-5" aria-hidden="true" />
            </button>
          </div>
        </motion.div>

        <p className="mt-6 text-center text-xs uppercase tracking-[0.22em] text-mute">
          <span className="lg:hidden">Drag the handle</span>
          <span className="hidden lg:inline">Drag the handle, or use arrow keys</span>
        </p>
      </div>
    </section>
  )
}
