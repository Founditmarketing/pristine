import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, Phone } from 'lucide-react'
import { Logo } from './Logo'
import { Button } from '@/components/ui/Button'
import { MobileMenu } from './MobileMenu'
import { nav, site } from '@/data/site'
import { cn } from '@/lib/utils'

export function Navbar() {
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  // Pages with a full-bleed image hero start in transparent mode and
  // transition to solid as the user scrolls. Other routes start solid.
  const startsTransparent =
    location.pathname === '/' || /^\/services\/[^/]+$/.test(location.pathname)

  useEffect(() => {
    if (!startsTransparent) {
      setScrolled(true)
      return
    }
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [startsTransparent])

  const tone = scrolled ? 'dark' : 'light'

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          'fixed inset-x-0 top-0 z-50 safe-top',
          'transition-[background-color,border-color,backdrop-filter] duration-500 ease-[var(--ease-out-quart)]',
          scrolled
            ? 'bg-cream/85 backdrop-blur-md border-b border-hairline/80'
            : 'bg-transparent border-b border-transparent',
        )}
      >
        <div className="container-page flex h-16 items-center justify-between gap-4 lg:h-20 lg:gap-6">
          <Logo tone={tone} />

          <nav
            aria-label="Primary"
            className="hidden lg:flex items-center gap-1"
          >
            {nav.primary.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    'relative px-4 py-2 text-sm font-medium font-display tracking-tight',
                    'transition-colors duration-300',
                    tone === 'light'
                      ? 'text-cream/85 hover:text-cream'
                      : 'text-slate-warm hover:text-navy',
                    isActive && (tone === 'light' ? 'text-cream' : 'text-navy'),
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{item.label}</span>
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className={cn(
                          'absolute left-3 right-3 -bottom-0.5 h-px',
                          tone === 'light' ? 'bg-gold' : 'bg-gold-deep',
                        )}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={site.phoneHref}
              className={cn(
                'hidden md:inline-flex items-center gap-2 text-sm font-medium tracking-tight',
                'transition-colors duration-300',
                tone === 'light' ? 'text-cream/80 hover:text-cream' : 'text-slate-warm hover:text-navy',
              )}
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {site.phone}
            </a>

            <NavLink to={nav.cta.href} className="hidden sm:block">
              <Button variant="primary" size="sm">
                {nav.cta.label}
              </Button>
            </NavLink>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className={cn(
                'lg:hidden grid place-items-center h-11 w-11 rounded-full',
                'transition-colors duration-300',
                tone === 'light'
                  ? 'text-cream hover:bg-cream/10'
                  : 'text-navy hover:bg-navy/5',
              )}
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && <MobileMenu onClose={() => setMenuOpen(false)} />}
      </AnimatePresence>
    </>
  )
}
