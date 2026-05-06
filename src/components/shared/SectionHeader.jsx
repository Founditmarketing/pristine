import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

const ease = [0.16, 1, 0.3, 1]

/**
 * Reusable section opener: eyebrow + headline + optional lede.
 * align controls horizontal alignment for sections that need centered intros.
 */
export function SectionHeader({
  eyebrow,
  title,
  lede,
  align = 'left',
  tone = 'dark',
  className,
}) {
  const wrapperAlign =
    align === 'center' ? 'items-center text-center' : 'items-start text-left'
  const titleColor = tone === 'light' ? 'text-cream' : 'text-navy'
  const ledeColor = tone === 'light' ? 'text-cream/75' : 'text-slate-warm'

  return (
    <div className={cn('flex flex-col gap-5', wrapperAlign, className)}>
      {eyebrow && (
        <motion.p
          initial={{ y: 12, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, ease }}
          className={cn('eyebrow', tone === 'light' && '!text-gold-soft')}
        >
          {eyebrow}
        </motion.p>
      )}
      <motion.h2
        initial={{ y: 16, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.7, ease, delay: 0.05 }}
        className={cn(
          'max-w-3xl text-balance [font-size:var(--text-display-sm)]',
          titleColor,
        )}
      >
        {title}
      </motion.h2>
      {lede && (
        <motion.p
          initial={{ y: 16, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease, delay: 0.12 }}
          className={cn('max-w-xl text-base leading-relaxed sm:text-lg', ledeColor)}
        >
          {lede}
        </motion.p>
      )}
    </div>
  )
}
