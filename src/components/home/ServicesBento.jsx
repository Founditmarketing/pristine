import { Link } from 'react-router'
import { motion } from 'framer-motion'
import {
  Layers,
  Droplets,
  Wind,
  Leaf,
  Fish,
  Sparkles,
  Compass,
  ArrowUpRight,
} from 'lucide-react'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { services } from '@/data/services'
import { cn } from '@/lib/utils'

const ICONS = { Layers, Droplets, Wind, Leaf, Fish, Sparkles, Compass }
const ease = [0.16, 1, 0.3, 1]

/**
 * Asymmetric bento grid. Span classes are explicit per service slug so the
 * layout reads as composed rather than a uniform 4x3. The featured card uses
 * its own visual treatment (image overlay, badge) to break the cards-equal
 * reflex.
 */
const SPANS = {
  dredging: 'lg:col-span-2 lg:row-span-2',
  'water-quality': 'lg:col-span-2',
  'fountains-aeration': 'lg:col-span-1',
  'aquatic-plants': 'lg:col-span-1',
  fisheries: 'lg:col-span-2',
  'fish-stocking': 'lg:col-span-1',
  consulting: 'lg:col-span-1',
}

export function ServicesBento() {
  return (
    <section className="relative bg-sand py-24 sm:py-32">
      <div className="container-page">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeader
            eyebrow="What we do"
            title="Seven services, one disciplined approach to water."
            lede="Every waterbody is its own ecosystem. We assess first, then bring only the work that matters, sized to your land and budget."
          />
          <Link
            to="/services"
            className="group inline-flex items-center gap-2 self-start text-sm font-medium font-display tracking-tight text-lake hover:text-lake-deep md:self-end"
          >
            View all services
            <ArrowUpRight className="h-4 w-4 transition-transform duration-500 ease-[var(--ease-out-quart)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 lg:mt-16 lg:auto-rows-[14rem] lg:grid-cols-4">
          {services.map((s, i) => {
            const Icon = ICONS[s.icon] ?? Layers
            return (
              <motion.div
                key={s.slug}
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, ease, delay: i * 0.05 }}
                className={cn(SPANS[s.slug])}
              >
                {s.featured ? (
                  <FeaturedCard service={s} Icon={Icon} />
                ) : (
                  <Card service={s} Icon={Icon} />
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ----- card variants ----- */

function Card({ service, Icon }) {
  return (
    <Link
      to={`/services/${service.slug}`}
      className={cn(
        'group relative flex h-full min-h-[12rem] flex-col justify-between gap-5 overflow-hidden rounded-[var(--radius-card)]',
        'bg-cream p-6 ring-1 ring-hairline sm:p-7',
        'transition-[transform,box-shadow,background-color] duration-500 ease-[var(--ease-out-quart)]',
        'hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]',
        'active:translate-y-0 active:scale-[0.99]',
      )}
    >
      <div className="flex items-start justify-between">
        <span
          className="grid h-11 w-11 place-items-center rounded-full bg-gold/15 text-gold-deep ring-1 ring-gold/25 transition-colors duration-500 ease-[var(--ease-out-quart)] group-hover:bg-gold group-hover:text-navy group-hover:ring-gold"
          aria-hidden="true"
        >
          <Icon className="h-5 w-5" />
        </span>
        {/* Arrow always visible on touch (since hover is unreliable), animates on hover for pointer */}
        <ArrowUpRight className="h-5 w-5 text-mute opacity-60 transition-all duration-500 ease-[var(--ease-out-quart)] group-hover:translate-x-0 group-hover:text-navy group-hover:opacity-100 lg:-translate-x-2 lg:opacity-0" />
      </div>
      <div className="flex flex-col gap-3">
        <h3 className="font-display text-xl font-semibold text-navy">
          {service.title}
        </h3>
        <p className="text-sm leading-relaxed text-slate-warm">{service.short}</p>
      </div>
    </Link>
  )
}

const FEATURED_IMAGE = '/images/services-dredging.webp'

function FeaturedCard({ service, Icon }) {
  return (
    <Link
      to={`/services/${service.slug}`}
      className={cn(
        'group relative isolate flex h-full min-h-[22rem] flex-col justify-end overflow-hidden rounded-[var(--radius-card)] sm:min-h-[28rem]',
        'bg-navy-deep p-6 text-cream sm:p-7',
        'ring-1 ring-navy/40',
        'transition-shadow duration-500 ease-[var(--ease-out-quart)]',
        'hover:shadow-[var(--shadow-lift)] active:scale-[0.995]',
      )}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-cover bg-center transition-transform duration-[2400ms] ease-[var(--ease-out-quart)] group-hover:scale-105"
        style={{ backgroundImage: `url(${FEATURED_IMAGE})` }}
      />
      {/* Two-stop gradient: dense navy under the copy, fading to a light
          tint near the top so the photo still reads. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-deep from-25% via-navy-deep/75 via-65% to-navy-deep/15"
      />
      {/* Soft directional wash for global atmosphere. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-tr from-navy-deep/40 via-transparent to-gold/[0.04]"
      />

      <div className="absolute left-6 top-6 flex items-center gap-3 sm:left-7 sm:top-7">
        <span className="grid h-11 w-11 place-items-center rounded-full bg-gold text-navy">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        {service.badge && (
          <span className="inline-flex items-center rounded-full bg-cream/10 px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.18em] text-cream ring-1 ring-cream/15">
            {service.badge}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-4 [text-shadow:0_2px_12px_rgb(11_18_36_/_0.55)]">
        <h3 className="font-display text-3xl font-semibold sm:text-4xl">
          {service.title}
        </h3>
        <p className="max-w-md text-sm leading-relaxed text-cream/85 sm:text-base">
          {service.short}
        </p>
        <span className="mt-2 inline-flex items-center gap-2 text-sm font-medium font-display tracking-tight text-gold">
          Read the process
          <ArrowUpRight className="h-4 w-4 transition-transform duration-500 ease-[var(--ease-out-quart)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  )
}
