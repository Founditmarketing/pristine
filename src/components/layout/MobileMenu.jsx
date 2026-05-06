import { useEffect } from 'react'
import { NavLink } from 'react-router'
import { motion } from 'framer-motion'
import { X, Phone, Mail } from 'lucide-react'
import { Logo } from './Logo'
import { Button } from '@/components/ui/Button'
import { nav, site } from '@/data/site'

const ease = [0.16, 1, 0.3, 1]

export function MobileMenu({ onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)

    // iOS-safe body scroll lock: pin the document at its current position so
    // touch-scroll inside the overlay doesn't leak through to the page.
    const scrollY = window.scrollY
    const { body } = document
    body.style.position = 'fixed'
    body.style.top = `-${scrollY}px`
    body.style.left = '0'
    body.style.right = '0'

    return () => {
      document.removeEventListener('keydown', onKey)
      body.style.position = ''
      body.style.top = ''
      body.style.left = ''
      body.style.right = ''
      window.scrollTo(0, scrollY)
    }
  }, [onClose])

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease }}
      className="fixed inset-0 z-[60] flex flex-col bg-navy text-cream safe-top safe-bottom overflow-y-auto"
    >
      <div className="container-page flex h-16 flex-none items-center justify-between">
        <Logo tone="light" />
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="grid h-11 w-11 place-items-center rounded-full text-cream hover:bg-cream/10"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      <motion.nav
        aria-label="Mobile primary"
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
        }}
        className="container-page mt-6 flex flex-col gap-1"
      >
        {nav.primary.map((item) => (
          <motion.div
            key={item.href}
            variants={{
              hidden: { y: 24, opacity: 0 },
              show: { y: 0, opacity: 1, transition: { duration: 0.5, ease } },
            }}
          >
            <NavLink
              to={item.href}
              onClick={onClose}
              className="group block border-b border-cream/10 py-4 font-display text-[1.75rem] font-semibold tracking-tight text-cream transition-colors active:text-gold sm:text-3xl sm:py-5"
            >
              <span className="inline-flex items-center gap-3">
                {item.label}
                <span
                  aria-hidden="true"
                  className="text-cream/30 transition-transform duration-500 ease-[var(--ease-out-quart)] group-hover:translate-x-2 group-hover:text-gold"
                >
                  →
                </span>
              </span>
            </NavLink>
          </motion.div>
        ))}
      </motion.nav>

      <motion.div
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease, delay: 0.4 }}
        className="container-page mt-auto flex flex-col gap-5 pt-10 pb-8"
      >
        <NavLink to={nav.cta.href} onClick={onClose}>
          <Button variant="primary" size="lg" className="w-full">
            {nav.cta.label}
          </Button>
        </NavLink>

        <div className="flex flex-col gap-3 text-cream/80">
          <a
            href={site.phoneHref}
            className="inline-flex items-center gap-3 hover:text-gold"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            <span>{site.phone}</span>
          </a>
          <a
            href={site.emailHref}
            className="inline-flex items-center gap-3 hover:text-gold"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            <span>{site.email}</span>
          </a>
        </div>
      </motion.div>
    </motion.div>
  )
}
