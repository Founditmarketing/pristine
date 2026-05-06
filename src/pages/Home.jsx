import { Hero } from '@/components/home/Hero'
import { ServicesBento } from '@/components/home/ServicesBento'
import { Stats } from '@/components/home/Stats'
import { BeforeAfter } from '@/components/home/BeforeAfter'
import { Testimonials } from '@/components/home/Testimonials'
import { ServiceArea } from '@/components/home/ServiceArea'
import { CTABanner } from '@/components/home/CTABanner'

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesBento />
      <Stats />
      <BeforeAfter />
      <Testimonials />
      <ServiceArea />
      <CTABanner />
    </>
  )
}
