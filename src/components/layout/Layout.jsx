import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { MobileBottomCTA } from './MobileBottomCTA'

export function Layout() {
  const location = useLocation()

  // Reset scroll on every route change.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [location.pathname])

  return (
    <div className="flex min-h-dvh flex-col bg-sand">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <MobileBottomCTA />
    </div>
  )
}
