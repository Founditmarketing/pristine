import { BrowserRouter, Routes, Route } from 'react-router'
import { Layout } from '@/components/layout/Layout'
import Home from '@/pages/Home'
import Services from '@/pages/Services'
import ServiceDetail from '@/pages/ServiceDetail'
import About from '@/pages/About'
import Markets from '@/pages/Markets'
import Testimonials from '@/pages/Testimonials'
import Products from '@/pages/Products'
import Events from '@/pages/Events'
import Contact from '@/pages/Contact'
import NotFound from '@/pages/NotFound'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="services" element={<Services />} />
          <Route path="services/:slug" element={<ServiceDetail />} />
          <Route path="about" element={<About />} />
          <Route path="markets" element={<Markets />} />
          <Route path="testimonials" element={<Testimonials />} />
          <Route path="products" element={<Products />} />
          <Route path="events" element={<Events />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
