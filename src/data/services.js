/**
 * Service catalog. `icon` keys reference Lucide React component names; the
 * lookup happens in src/components/home/ServicesBento.jsx so the data file
 * stays a plain JSON-shaped object.
 */
export const services = [
  {
    slug: 'dredging',
    title: 'Dredging & Sediment Removal',
    short:
      'Restore depth, water capacity, and clarity by removing decades of accumulated muck without draining the pond.',
    icon: 'Layers',
    featured: true,
    badge: 'Most requested',
  },
  {
    slug: 'water-quality',
    title: 'Water Quality',
    short:
      'Algae control, nutrient balancing, and biological treatments tuned to your waterbody.',
    icon: 'Droplets',
  },
  {
    slug: 'fountains-aeration',
    title: 'Fountains & Aeration',
    short:
      'Surface fountains and bottom-diffused aeration sized to depth and surface area.',
    icon: 'Wind',
  },
  {
    slug: 'aquatic-plants',
    title: 'Aquatic Plants',
    short:
      'Selective control of invasive vegetation while protecting native habitat.',
    icon: 'Leaf',
  },
  {
    slug: 'fisheries',
    title: 'Fisheries Management',
    short:
      'Electrofishing surveys, harvest plans, and underwater structure to grow real trophy fish.',
    icon: 'Fish',
  },
  {
    slug: 'fish-stocking',
    title: 'Fish Stocking',
    short:
      'Bass, bluegill, catfish, and forage delivered and stocked on site.',
    icon: 'Sparkles',
  },
  {
    slug: 'consulting',
    title: 'Consulting & Habitat Plans',
    short:
      'Long-range plans for new builds, restorations, and conservation easements.',
    icon: 'Compass',
  },
]
