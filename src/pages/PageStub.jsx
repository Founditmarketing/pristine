import { Link } from 'react-router'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'

const ease = [0.16, 1, 0.3, 1]

/**
 * Generic page placeholder used for routes that haven't been built yet.
 * Keeps the navbar and footer wired up while the page-specific design lands.
 */
export function PageStub({ eyebrow, title, blurb }) {
  return (
    <section className="relative isolate min-h-[80vh]">
      {/* Subtle decorative background */}
      <div className="absolute inset-0 -z-10 bg-sand">
        <div className="absolute inset-0 opacity-[0.5] [background-image:radial-gradient(circle_at_top_right,oklch(96%_0.018_80)_0%,transparent_60%),radial-gradient(circle_at_bottom_left,oklch(94%_0.02_82)_0%,transparent_55%)]" />
      </div>

      <div className="container-page flex min-h-[80vh] flex-col justify-center pt-40 pb-24">
        <motion.p
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease }}
          className="eyebrow"
        >
          {eyebrow}
        </motion.p>
        <motion.h1
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease, delay: 0.05 }}
          className="mt-5 max-w-3xl text-balance [font-size:var(--text-display)]"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease, delay: 0.12 }}
          className="mt-6 max-w-xl text-base text-slate-warm leading-relaxed sm:text-lg"
        >
          {blurb}
        </motion.p>
        <motion.div
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease, delay: 0.2 }}
          className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
        >
          <Link to="/contact">
            <Button variant="primary" size="md">
              Request a quote
              <ArrowRight className="h-4 w-4 transition-transform duration-500 ease-[var(--ease-out-quart)] group-hover/btn:translate-x-1" />
            </Button>
          </Link>
          <Link to="/">
            <Button variant="ghost" size="md">
              Back to home
            </Button>
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease, delay: 0.4 }}
          className="mt-16 text-xs uppercase tracking-[0.22em] text-mute"
        >
          Page in progress, full content coming soon
        </motion.p>
      </div>
    </section>
  )
}
