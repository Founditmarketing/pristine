import { Link } from 'react-router'
import { cn } from '@/lib/utils'

/**
 * Wordmark + ripple mark. `tone` controls foreground color so the same
 * logo works on transparent navy hero (light) and on solid sand bar (dark).
 */
export function Logo({ tone = 'dark', className }) {
  const fg =
    tone === 'light' ? 'text-cream' : 'text-navy'
  const accent = 'text-gold'

  return (
    <Link
      to="/"
      aria-label="Pristine Pond Solutions home"
      className={cn(
        'group inline-flex items-center gap-3 font-display',
        fg,
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          'relative grid h-10 w-10 place-items-center rounded-full',
          'transition-transform duration-500 ease-[var(--ease-out-quart)]',
          'group-hover:rotate-[8deg]',
          tone === 'light' ? 'bg-cream/10 ring-1 ring-cream/20' : 'bg-navy/5 ring-1 ring-navy/10',
        )}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className={cn('h-5 w-5', accent)}
        >
          <circle cx="12" cy="12" r="2.2" fill="currentColor" />
          <circle cx="12" cy="12" r="5.5" stroke="currentColor" strokeWidth="1.2" opacity="0.7" />
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1" opacity="0.35" />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-lg font-semibold tracking-tight">
          Pristine Pond
        </span>
        <span
          className={cn(
            'mt-0.5 text-[0.625rem] font-medium uppercase tracking-[0.22em]',
            tone === 'light' ? 'text-cream/70' : 'text-mute',
          )}
        >
          Solutions
        </span>
      </span>
    </Link>
  )
}
