import { forwardRef } from 'react'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

/**
 * Button primitive. Variants:
 *  - primary  : gold fill, navy text. Single hero action.
 *  - secondary: navy fill, cream text.
 *  - outline  : transparent, hairline border. Pairs with primary.
 *  - ghost    : text only.
 *  - link     : underlined inline.
 *
 * Sizes scale font, padding, and min-touch target together.
 */
const button = cva(
  [
    'group/btn relative inline-flex items-center justify-center gap-2',
    'font-display font-semibold tracking-tight',
    'rounded-full select-none whitespace-nowrap',
    'transition-[transform,background-color,color,box-shadow]',
    'duration-300 ease-[var(--ease-out-quart)]',
    'disabled:opacity-50 disabled:pointer-events-none',
    'will-change-transform',
    'active:scale-[0.97]', // touch press feedback
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-gold text-navy shadow-[var(--shadow-soft)]',
          'hover:bg-gold-deep hover:text-cream hover:shadow-[var(--shadow-lift)]',
          'hover:-translate-y-0.5 active:translate-y-0',
        ],
        secondary: [
          'bg-navy text-cream',
          'hover:bg-navy-soft hover:-translate-y-0.5 active:translate-y-0',
        ],
        outline: [
          'bg-transparent text-cream border border-cream/50',
          'hover:bg-cream hover:text-navy hover:border-cream',
        ],
        outlineDark: [
          'bg-transparent text-navy border border-navy/30',
          'hover:bg-navy hover:text-cream hover:border-navy',
        ],
        ghost: [
          'bg-transparent text-navy',
          'hover:bg-navy/5',
        ],
        link: [
          'bg-transparent text-lake underline-offset-4 hover:underline px-0',
        ],
      },
      size: {
        sm: 'text-sm h-10 px-4',
        md: 'text-base h-12 px-6',
        lg: 'text-base h-14 px-8',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

const Button = forwardRef(function Button(
  { className, variant, size, asChild = false, children, ...props },
  ref,
) {
  const Comp = asChild ? 'span' : 'button'
  return (
    <Comp ref={ref} className={cn(button({ variant, size }), className)} {...props}>
      {children}
    </Comp>
  )
})

export { Button, button as buttonVariants }
