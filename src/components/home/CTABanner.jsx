import { Link } from 'react-router'
import { motion } from 'framer-motion'
import { ArrowRight, Phone } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { site } from '@/data/site'

const ease = [0.16, 1, 0.3, 1]

export function CTABanner() {
  return (
    <section className="relative isolate overflow-hidden bg-navy text-cream">
      {/* Layered atmosphere */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-navy via-navy-deep to-navy" />
      <div
        aria-hidden="true"
        className="absolute -right-24 -top-24 h-[28rem] w-[28rem] rounded-full bg-lake/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-32 -left-24 h-[24rem] w-[24rem] rounded-full bg-gold/10 blur-3xl"
      />

      {/* Subtle topographic ripples bottom edge */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
        className="absolute inset-x-0 bottom-0 h-32 w-full text-cream/[0.05]"
      >
        {Array.from({ length: 5 }).map((_, i) => {
          const y = 40 + i * 30
          return (
            <path
              key={i}
              d={`M0 ${y}c160 -16 320 -16 480 0s320 16 480 0 320 -16 480 0`}
              stroke="currentColor"
              strokeWidth="1"
              fill="none"
            />
          )
        })}
      </svg>

      <div className="container-page relative grid gap-10 py-24 sm:py-32 lg:grid-cols-12 lg:items-center">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease }}
          className="lg:col-span-7"
        >
          <p className="eyebrow !text-gold-soft">Free assessment</p>
          <h2 className="mt-5 max-w-3xl text-cream text-balance [font-size:var(--text-display)]">
            Tell us about your water. We will be there within a week.
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-cream/75 sm:text-lg">
            Send a few photos and the rough acreage. We respond within one
            business day with honest next steps and a transparent quote.
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease, delay: 0.1 }}
          className="flex flex-col gap-5 lg:col-span-5 lg:items-end"
        >
          <Link to="/contact" className="w-full lg:w-auto">
            <Button variant="primary" size="lg" className="w-full">
              Start the conversation
              <ArrowRight className="h-4 w-4 transition-transform duration-500 ease-[var(--ease-out-quart)] group-hover/btn:translate-x-1" />
            </Button>
          </Link>
          <a
            href={site.phoneHref}
            className="inline-flex items-center gap-3 text-sm text-cream/75 transition-colors hover:text-gold"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            <span>
              Or call us directly,{' '}
              <span className="font-medium text-cream">{site.phone}</span>
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
