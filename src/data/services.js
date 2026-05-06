/**
 * Service catalog. Single source of truth for the bento grid, the Services
 * overview page, and the per-slug detail pages.
 *
 * `icon`  — Lucide React component name (looked up in components that need it)
 * `image` — path under /public, generated via scripts/generate-images.mjs
 */
export const services = [
  {
    slug: 'dredging',
    title: 'Dredging & Sediment Removal',
    short:
      'Restore depth, water capacity, and clarity by removing decades of accumulated muck without draining the pond.',
    icon: 'Layers',
    image: '/images/services-dredging.webp',
    featured: true,
    badge: 'Most requested',
  },
  {
    slug: 'water-quality',
    title: 'Water Quality',
    short:
      'Algae control, nutrient balancing, and biological treatments tuned to your waterbody.',
    icon: 'Droplets',
    image: '/images/services-water-quality.webp',
  },
  {
    slug: 'fountains-aeration',
    title: 'Fountains & Aeration',
    short:
      'Surface fountains and bottom-diffused aeration sized to depth and surface area.',
    icon: 'Wind',
    image: '/images/services-fountains-aeration.webp',
  },
  {
    slug: 'aquatic-plants',
    title: 'Aquatic Plants',
    short:
      'Selective control of invasive vegetation while protecting native habitat.',
    icon: 'Leaf',
    image: '/images/services-aquatic-plants.webp',
  },
  {
    slug: 'fisheries',
    title: 'Fisheries Management',
    short:
      'Electrofishing surveys, harvest plans, and underwater structure to grow real trophy fish.',
    icon: 'Fish',
    image: '/images/services-fisheries.webp',
  },
  {
    slug: 'fish-stocking',
    title: 'Fish Stocking',
    short:
      'Bass, bluegill, catfish, and forage delivered and stocked on site.',
    icon: 'Sparkles',
    image: '/images/services-fish-stocking.webp',
  },
  {
    slug: 'consulting',
    title: 'Consulting & Habitat Plans',
    short:
      'Long-range plans for new builds, restorations, and conservation easements.',
    icon: 'Compass',
    image: '/images/services-consulting.webp',
  },
]
