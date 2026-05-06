import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import { SectionHeader } from '@/components/shared/SectionHeader'

const ease = [0.16, 1, 0.3, 1]

const REGIONS = [
  {
    name: 'Capital Region',
    cities: ['Baton Rouge', 'St. Francisville', 'Gonzales', 'Denham Springs'],
  },
  {
    name: 'Greater New Orleans',
    cities: ['New Orleans', 'Mandeville', 'Covington', 'Slidell'],
  },
  {
    name: 'Acadiana',
    cities: ['Lafayette', 'New Iberia', 'Opelousas', 'Abbeville'],
  },
  {
    name: 'Southwest Louisiana',
    cities: ['Lake Charles', 'Sulphur', 'DeRidder', 'Jennings'],
  },
  {
    name: 'Central Louisiana',
    cities: ['Alexandria', 'Pineville', 'Marksville', 'Natchitoches'],
  },
  {
    name: 'North Louisiana',
    cities: ['Shreveport', 'Monroe', 'Ruston', 'Bossier City'],
  },
]

export function ServiceArea() {
  return (
    <section className="relative overflow-hidden bg-cream py-24 sm:py-32">
      {/* Topographic line decoration. Faint horizontal contour rhythm */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 600"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full text-lake/[0.06]"
      >
        {Array.from({ length: 11 }).map((_, i) => {
          const y = 60 + i * 50
          return (
            <path
              key={i}
              d={`M0 ${y}c160 -22 320 -22 480 0s320 22 480 0 320 -22 480 0`}
              stroke="currentColor"
              strokeWidth="1"
              fill="none"
            />
          )
        })}
      </svg>

      <div className="container-page relative">
        <div className="grid gap-14 lg:grid-cols-12">
          <SectionHeader
            eyebrow="Where we work"
            title="Across Louisiana, parish by parish."
            lede="Crews based in Baton Rouge, dispatched statewide. If your water is south of Arkansas and east of the Sabine, we can be there."
            className="lg:col-span-5"
          />

          <div className="lg:col-span-7">
            <div className="grid gap-8 sm:grid-cols-2">
              {REGIONS.map((region, i) => (
                <motion.div
                  key={region.name}
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.6, ease, delay: i * 0.05 }}
                  className="border-t border-hairline pt-6"
                >
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gold-deep" aria-hidden="true" />
                    <h3 className="font-display text-base font-semibold tracking-tight text-navy">
                      {region.name}
                    </h3>
                  </div>
                  <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-warm">
                    {region.cities.map((city) => (
                      <li key={city}>{city}</li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
