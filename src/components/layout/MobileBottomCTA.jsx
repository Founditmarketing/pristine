import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, ArrowRight } from 'lucide-react'
import { site } from '@/data/site'
import { cn } from '@/lib/utils'

const ease = [0.16, 1, 0.3, 1]

/**
 * Mobile-only floating CTA. Appears once the hero leaves the viewport and
 * hides as the page nears the footer (where the inline CTA banner already
 * exists). Tappable, safe-area aware, hidden on lg+ where the desktop nav
 * carries the same action.
 */
export function MobileBottomCTA() {
  const [show, setShow] = useState(false)
  const location = useLocation()

  // Only the home page has a tall hero; on other routes the bar is helpful
  // immediately on scroll. The contact page hides it (you're already there).
  const enabled = location.pathname !== '/contact'

  useEffect(() => {
    if (!enabled) {
      setShow(false)
      return
    }
    const onScroll = () => {
      const y = window.scrollY
      const docH = document.documentElement.scrollHeight
      const winH = window.innerHeight
      // Heuristic thresholds. On home, the hero is ~100svh, so we wait until
      // user scrolls past 60% of the viewport. On other pages, 200px of
      // scroll is enough.
      const heroPassed =
        location.pathname === '/'
          ? y > winH * 0.6
          : y > 200
      // Stop showing well before the inline CTA banner enters view so we
      // don't render two competing CTAs at once.
      const nearBottom = y > docH - winH - 1200
      setShow(heroPassed && !nearBottom)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [enabled, location.pathname])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.45, ease }}
          className={cn(
            'fixed inset-x-0 bottom-0 z-40 lg:hidden',
            'pb-[env(safe-area-inset-bottom)]',
          )}
        >
          {/* Soft scrim above the bar so it always sits on its own surface */}
          <div
            aria-hidden="true"
            className="pointer-events-none h-6 bg-gradient-to-t from-cream/90 to-cream/0"
          />
          <div className="border-t border-hairline bg-cream/95 backdrop-blur-md">
            <div className="container-page flex items-center gap-3 py-3">
              <a
                href={site.phoneHref}
                aria-label={`Call ${site.phone}`}
                className="grid h-12 w-12 flex-none place-items-center rounded-full bg-navy/[0.06] text-navy ring-1 ring-navy/10 active:scale-95 transition-transform duration-150"
              >
                <Phone className="h-5 w-5" aria-hidden="true" />
              </a>
              <Link
                to="/contact"
                className="group flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-gold px-5 font-display text-base font-semibold text-navy active:scale-[0.98] transition-transform duration-150"
              >
                Free assessment
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-500 ease-[var(--ease-out-quart)] group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
