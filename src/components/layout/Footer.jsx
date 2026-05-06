import { Link } from 'react-router'
import { Facebook, Instagram, Youtube, Phone, Mail, MapPin } from 'lucide-react'
import { Logo } from './Logo'
import { site, nav } from '@/data/site'
import { services } from '@/data/services'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden bg-navy-deep text-cream/80">
      {/* Decorative pond ripple silhouette behind the content. */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 200"
        className="absolute inset-x-0 top-0 w-full text-cream/[0.04]"
        preserveAspectRatio="none"
      >
        <path
          fill="currentColor"
          d="M0 80c80 24 160 36 240 36s160-12 240-36 160-36 240-36 160 12 240 36 160 36 240 36 160-12 240-36v200H0z"
        />
      </svg>

      <div className="container-page relative grid gap-12 pt-24 pb-12 md:grid-cols-12">
        <div className="md:col-span-4 flex flex-col gap-6">
          <Logo tone="light" />
          <p className="max-w-sm text-sm leading-relaxed text-cream/65">
            {site.description}
          </p>
          <div className="flex items-center gap-3">
            <SocialLink href={site.social.facebook} label="Facebook">
              <Facebook className="h-4 w-4" aria-hidden="true" />
            </SocialLink>
            <SocialLink href={site.social.instagram} label="Instagram">
              <Instagram className="h-4 w-4" aria-hidden="true" />
            </SocialLink>
            <SocialLink href={site.social.youtube} label="YouTube">
              <Youtube className="h-4 w-4" aria-hidden="true" />
            </SocialLink>
          </div>
        </div>

        <FooterCol title="Services" className="md:col-span-3">
          {services.slice(0, 6).map((s) => (
            <li key={s.slug}>
              <Link
                to={`/services/${s.slug}`}
                className="text-sm text-cream/65 transition-colors hover:text-gold"
              >
                {s.title.replace(' & ', ' / ')}
              </Link>
            </li>
          ))}
        </FooterCol>

        <FooterCol title="Company" className="md:col-span-2">
          {nav.primary.map((item) => (
            <li key={item.href}>
              <Link
                to={item.href}
                className="text-sm text-cream/65 transition-colors hover:text-gold"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </FooterCol>

        <FooterCol title="Get in touch" className="md:col-span-3">
          <li>
            <a
              href={site.phoneHref}
              className="inline-flex items-start gap-3 text-sm text-cream/65 transition-colors hover:text-gold"
            >
              <Phone className="mt-0.5 h-4 w-4 flex-none" aria-hidden="true" />
              <span>{site.phone}</span>
            </a>
          </li>
          <li>
            <a
              href={site.emailHref}
              className="inline-flex items-start gap-3 text-sm text-cream/65 transition-colors hover:text-gold"
            >
              <Mail className="mt-0.5 h-4 w-4 flex-none" aria-hidden="true" />
              <span>{site.email}</span>
            </a>
          </li>
          <li className="inline-flex items-start gap-3 text-sm text-cream/65">
            <MapPin className="mt-0.5 h-4 w-4 flex-none" aria-hidden="true" />
            <span>
              {site.address.line1}
              <br />
              {site.address.line2}
            </span>
          </li>
        </FooterCol>
      </div>

      <div className="container-page relative pb-[env(safe-area-inset-bottom)]">
        <div className="border-t border-cream/10 py-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-cream/50">
            © {year} {site.name}. All rights reserved.
          </p>
          <p className="text-xs text-cream/50">
            Built with care in Louisiana.
          </p>
        </div>
      </div>
    </footer>
  )
}

function FooterCol({ title, className, children }) {
  return (
    <div className={className}>
      <h3 className="eyebrow !text-cream/55">{title}</h3>
      <ul className="mt-5 flex flex-col gap-3">{children}</ul>
    </div>
  )
}

function SocialLink({ href, label, children }) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noreferrer"
      className="grid h-10 w-10 place-items-center rounded-full bg-cream/[0.06] text-cream/80 ring-1 ring-cream/10 transition-colors hover:bg-gold hover:text-navy hover:ring-gold"
    >
      {children}
    </a>
  )
}
