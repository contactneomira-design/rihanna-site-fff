'use client'

import { LANGUAGES, useLang } from '@/lib/i18n'

// FR | EN | العربية — pill with an active state. The group is always laid out
// left-to-right so the order never flips when the page goes RTL.
export default function LanguageSwitcher({ className = '' }) {
  const { lang, setLang, t } = useLang()

  return (
    <div
      role="group"
      aria-label={t('language')}
      dir="ltr"
      className={`inline-flex items-center rounded-full border border-offwhite/20 p-1 ${className}`}
    >
      {LANGUAGES.map((l, i) => {
        const active = lang === l.code
        return (
          <span key={l.code} className="flex items-center">
            {i > 0 && (
              <span aria-hidden="true" className="h-4 w-px bg-offwhite/15" />
            )}
            <button
              type="button"
              lang={l.code}
              aria-pressed={active}
              aria-label={l.name}
              onClick={() => setLang(l.code)}
              style={l.code === 'ar' ? { fontFamily: 'var(--font-arabic), Cairo, sans-serif' } : undefined}
              className={`inline-flex min-h-[48px] min-w-[48px] items-center justify-center rounded-full px-4 text-[12px] font-semibold uppercase tracking-[0.15em] transition-colors duration-300 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-offwhite lg:min-h-[36px] lg:min-w-[44px] lg:px-3.5 ${
                active
                  ? 'bg-terracotta text-night'
                  : 'text-offwhite/70 hover:text-offwhite'
              } ${l.code === 'ar' ? 'normal-case tracking-normal text-[14px]' : ''}`}
            >
              {l.label}
            </button>
          </span>
        )
      })}
    </div>
  )
}
