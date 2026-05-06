import { Link, useParams } from 'react-router'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { services } from '@/data/services'
import { PageStub } from './PageStub'

const ease = [0.16, 1, 0.3, 1]

export default function ServiceDetail() {
  const { slug } = useParams()
  const service = services.find((s) => s.slug === slug)

  if (!service) {
    return (
      <PageStub
        eyebrow="Not found"
        title="That service does not exist."
        blurb="Try the services overview to see everything we offer."
      />
    )
  }

  return (
    <>
      <section className="relative isolate flex min-h-[70svh] items-end overflow-hidden bg-navy-deep text-cream">
        <div
          aria-hidden="true"
          className="ken-burns absolute inset-0 -z-20 bg-cover bg-center"
          style={{ backgroundImage: `url(${service.image})` }}
        />
        {/* Strong navy floor so the headline reads regardless of the
            underlying photo's tonality. */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-deep from-30% via-navy-deep/80 via-65% to-navy-deep/30" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-navy-deep/30 via-transparent to-gold/[0.05]" />

        <div className="container-page pt-40 pb-20 sm:pt-48 sm:pb-24 [text-shadow:0_1px_3px_rgb(0_0_0_/_0.75),0_4px_28px_rgb(0_0_0_/_0.45)]">
          <motion.p
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease }}
            className="eyebrow !text-gold-soft"
          >
            Service
          </motion.p>
          <motion.h1
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease, delay: 0.05 }}
            className="mt-5 max-w-3xl text-cream text-balance [font-size:var(--text-display)]"
          >
            {service.title}
          </motion.h1>
          <motion.p
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease, delay: 0.12 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-cream/80 sm:text-lg"
          >
            {service.short}
          </motion.p>
          <motion.div
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease, delay: 0.2 }}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
          >
            <Link to="/contact" className="w-full sm:w-auto">
              <Button variant="primary" size="lg" className="w-full">
                Request this service
                <ArrowRight className="h-4 w-4 transition-transform duration-500 ease-[var(--ease-out-quart)] group-hover/btn:translate-x-1" />
              </Button>
            </Link>
            <Link to="/services" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full">
                All services
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <RelatedServices currentSlug={service.slug} />
    </>
  )
}

function RelatedServices({ currentSlug }) {
  const others = services.filter((s) => s.slug !== currentSlug).slice(0, 3)
  return (
    <section className="bg-sand py-20 sm:py-24">
      <div className="container-page">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow">More services</p>
            <h2 className="mt-3 [font-size:var(--text-display-sm)]">
              Often paired with this work.
            </h2>
          </div>
          <Link
            to="/services"
            className="hidden text-sm font-medium font-display tracking-tight text-lake hover:text-lake-deep sm:inline"
          >
            View all
          </Link>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((s) => (
            <Link
              key={s.slug}
              to={`/services/${s.slug}`}
              className="group relative isolate flex aspect-[4/3] flex-col justify-end overflow-hidden rounded-[var(--radius-card)] ring-1 ring-hairline shadow-[var(--shadow-soft)]"
            >
              <div
                aria-hidden="true"
                className="absolute inset-0 -z-20 bg-cover bg-center transition-transform duration-[2400ms] ease-[var(--ease-out-quart)] group-hover:scale-105"
                style={{ backgroundImage: `url(${s.image})` }}
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-deep from-20% via-navy-deep/65 via-60% to-transparent"
              />
              <div className="p-6 text-cream [text-shadow:0_2px_10px_rgb(11_18_36_/_0.55)]">
                <h3 className="font-display text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-cream/85 line-clamp-2">
                  {s.short}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
