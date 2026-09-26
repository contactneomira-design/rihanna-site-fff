'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Menu, Phone, X } from 'lucide-react'
import { brandName, navLinks, phoneNumberIntl } from '@/lib/data'
import { useLang } from '@/lib/i18n'
import LanguageSwitcher from '@/components/LanguageSwitcher'

// ---------------------------------------------------------------------------
// Primary navigation lives in lib/data.js (`navLinks`) — one source of truth
// for desktop, mobile drawer and footer. Car categories (Family / Belbala /
// Atlas) live ONLY inside /fleet as filters — never in the header.
// ---------------------------------------------------------------------------
const ctaHref = '/fleet'

const isActive = (pathname, href) =>
  pathname === href || pathname.startsWith(`${href}/`)

// Shared styling. The header is near-black, so the active underline and text
// use offwhite (the light-theme equivalent of border-black / text-black).
const focusRing =
  'focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-offwhite'
const navItem = `inline-block pb-1.5 text-[12px] uppercase tracking-[0.25em] font-medium text-offwhite border-b transition-opacity ${focusRing}`
const navActive = 'opacity-100 border-offwhite'
const navInactive = 'opacity-60 hover:opacity-100 border-transparent'
const ctaBase = `items-center justify-center whitespace-nowrap rounded-full bg-terracotta hover:bg-offwhite text-night px-6 text-[11px] uppercase tracking-[0.2em] font-semibold transition-colors duration-300 ${focusRing}`

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { dir, t } = useLang()
  const pathname = usePathname() ?? ''
  const reduceMotion = useReducedMotion()

  const closeMenu = () => setIsMenuOpen(false)

  // Escape closes anything open
  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') {
        setIsMenuOpen(false)
      }
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [])

  // Close the mobile menu after any navigation
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  // Lock page scroll while the mobile menu is open
  useEffect(() => {
    if (!isMenuOpen) return
    const root = document.documentElement
    const previous = root.style.overflow
    root.style.overflow = 'hidden'
    return () => {
      root.style.overflow = previous
    }
  }, [isMenuOpen])

  // If the viewport grows to desktop while the menu is open, close it so the
  // scroll lock is released.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const onChange = (e) => {
      if (e.matches) setIsMenuOpen(false)
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const fade = (delay = 0, duration = 0.5) => ({
    duration: reduceMotion ? 0 : duration,
    delay: reduceMotion ? 0 : delay,
    ease: [0.22, 1, 0.36, 1],
  })

  // Tracking (letter-spacing) is switched off for Arabic in globals.css, so the
  // negative margin that cancels the trailing space must go too.
  // (Full class names on purpose — Tailwind can't see dynamically built ones.)
  const trailNav = dir === 'rtl' ? '' : '-me-[0.25em]'
  const trailCta = dir === 'rtl' ? '' : '-me-[0.2em]'

  return (
    <>
      {/* dir="ltr": the logo always stays on the LEFT, even in Arabic. The
          navigation itself is mirrored below (dir={dir}). */}
      <header
        dir="ltr"
        className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between gap-3 px-5 sm:px-8 lg:px-12 py-3 sm:py-4 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:gap-6 bg-night/70 backdrop-blur-md border-b border-offwhite/10"
      >
        {/* LOGO */}
        <Link
          href="/"
          onClick={closeMenu}
          aria-label={brandName}
          className={`flex items-center shrink-0 lg:justify-self-start ${focusRing}`}
        >
          <Image
            src="/logo.png"
            alt="RIHANA DREAMS CARS"
            width={180}
            height={59}
            priority
            className="h-8 md:h-11 w-auto object-contain"
          />
        </Link>

        {/* DESKTOP NAV — centered, order mirrored in RTL */}
        <nav aria-label={t('navigation')} dir={dir} className="hidden lg:block">
          <ul className="flex items-center gap-8 xl:gap-10">
            {navLinks.map(({ href, key }) => {
              const active = isActive(pathname, href)
              return (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={active ? 'page' : undefined}
                    className={`${navItem} ${active ? navActive : navInactive}`}
                  >
                    {/* negative margin cancels the trailing letter-spacing so the underline hugs the word */}
                    <span className={trailNav}>{t(key)}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* RIGHT: PHONE (xl+) / LANGUAGE + CTA (lg+) / HAMBURGER (<lg) */}
        <div className="flex items-center justify-end gap-3 sm:gap-4 lg:gap-5 lg:justify-self-end">
          <a
            href={`tel:${phoneNumberIntl.replace(/\s/g, '')}`}
            className="hidden xl:flex items-center gap-2 text-offwhite/80 hover:text-terracotta text-sm font-medium transition-colors duration-300"
          >
            <Phone size={15} />
            <span dir="ltr">{phoneNumberIntl}</span>
          </a>

          {/* LANGUAGE — desktop (mobile has it inside the drawer) */}
          <LanguageSwitcher className="hidden lg:inline-flex" />

          {/* CTA — desktop */}
          <Link
            href={ctaHref}
            dir={dir}
            className={`hidden lg:inline-flex min-h-[48px] ${ctaBase}`}
          >
            <span className={trailCta}>{t('navBook')}</span>
          </Link>

          {/* HAMBURGER — mobile / tablet */}
          <button
            type="button"
            className={`lg:hidden inline-flex h-12 w-12 min-h-[48px] min-w-[48px] items-center justify-center rounded-full border border-offwhite/20 hover:border-terracotta text-offwhite transition-colors duration-300 ${focusRing}`}
            onClick={() => setIsMenuOpen((v) => !v)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? t('close') : t('menu')}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* MOBILE MENU — sits beside <header> (not inside it) because the header's
          backdrop-filter would otherwise trap a fixed-position child. It follows
          the page direction, so in Arabic the drawer reads right-to-left. */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-menu"
            data-lenis-prevent
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.3, ease: 'easeOut' }}
            className="lg:hidden fixed inset-0 z-30 bg-night overflow-y-auto overscroll-contain"
          >
            <nav
              aria-label={t('navigation')}
              className="flex min-h-full flex-col px-5 sm:px-8 pt-24 sm:pt-28 pb-28"
            >
              <ul className="flex flex-col border-t border-offwhite/10">
                {navLinks.map(({ href, key }, i) => {
                  const active = isActive(pathname, href)
                  return (
                    <motion.li
                      key={href}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={fade(0.08 + i * 0.06)}
                      className="border-b border-offwhite/10"
                    >
                      <Link
                        href={href}
                        onClick={closeMenu}
                        aria-current={active ? 'page' : undefined}
                        className={`flex min-h-[48px] items-center py-5 sm:py-6 ${focusRing}`}
                      >
                        <span
                          className={`inline-block pb-1.5 text-[14px] uppercase tracking-[0.25em] font-medium text-offwhite border-b transition-opacity ${
                            active ? navActive : navInactive
                          }`}
                        >
                          <span className={trailNav}>{t(key)}</span>
                        </span>
                      </Link>
                    </motion.li>
                  )
                })}
              </ul>

              {/* LANGUAGE — inside the drawer on mobile */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={fade(0.08 + navLinks.length * 0.06)}
                className="mt-8 flex justify-center"
              >
                <LanguageSwitcher />
              </motion.div>

              {/* CTA — bottom of the menu. Bottom padding keeps it clear of the floating WhatsApp button. */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={fade(0.14 + navLinks.length * 0.06)}
                className="mt-auto pt-10"
              >
                <Link
                  href={ctaHref}
                  onClick={closeMenu}
                  className={`flex w-full min-h-[48px] py-4 ${ctaBase}`}
                >
                  <span className={trailCta}>{t('navBook')}</span>
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
