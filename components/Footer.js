'use client'

import Image from 'next/image'
import Link from 'next/link'
import { MessageCircle, MapPin, Phone } from 'lucide-react'
import {
  whatsappLink,
  whatsapp2Link,
  phoneNumberIntl,
  phone2Intl,
  brandFull,
  navLinks,
  mapsLink,
} from '@/lib/data'
import { useLang } from '@/lib/i18n'

// Contact channels are intentionally limited to WhatsApp, phone and the
// Marrakech location only.
export default function Footer() {
  const { t } = useLang()
  const year = new Date().getFullYear()
  const telHref = `tel:${phoneNumberIntl.replace(/\s/g, '')}`
  const tel2Href = `tel:${phone2Intl.replace(/\s/g, '')}`

  const iconBtn =
    'w-12 h-12 min-h-[48px] min-w-[48px] flex items-center justify-center border border-offwhite/20 hover:border-terracotta hover:text-terracotta transition-colors'

  return (
    <footer id="footer" className="relative bg-night-soft border-t border-night-line">
      <div className="px-5 sm:px-8 lg:px-12 py-14 sm:py-20 grid sm:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-8 text-center sm:text-start">
        {/* Brand */}
        <div className="lg:col-span-2 flex flex-col items-center sm:items-start">
          <Image
            src="/logo.png"
            alt="RIHANA DREAMS CARS"
            width={180}
            height={59}
            className="h-12 sm:h-14 w-auto object-contain mb-5"
          />
          <p className="text-offwhite/50 text-sm font-light max-w-xs leading-relaxed">
            {t('footerTagline')}
          </p>
          <div className="flex items-center gap-4 mt-6">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t('ctaWhatsapp')}
              className={iconBtn}
            >
              <MessageCircle size={18} />
            </a>
            <a href={telHref} aria-label={t('ctaCall')} className={iconBtn}>
              <Phone size={18} />
            </a>
          </div>
        </div>

        {/* Navigation */}
        <div>
          <p className="text-[11px] tracking-widest2 uppercase text-offwhite/40 mb-4">
            {t('navigation')}
          </p>
          <ul className="flex flex-col items-center sm:items-start gap-1">
            {navLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex min-h-[44px] items-center text-offwhite/70 hover:text-terracotta text-sm transition-colors"
                >
                  {t(item.key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <p className="text-[11px] tracking-widest2 uppercase text-offwhite/40 mb-4">
            {t('contactTitle')}
          </p>
          <ul className="flex flex-col items-center sm:items-start gap-3 text-offwhite/70 text-sm">
            <li>
              <a
                href={mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center gap-2 hover:text-terracotta transition-colors"
              >
                <MapPin size={15} className="shrink-0 text-terracotta" />
                {t('location')}
              </a>
            </li>
            <li>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] flex-wrap items-center justify-center sm:justify-start gap-x-2 hover:text-terracotta transition-colors"
              >
                <span dir="ltr">{phoneNumberIntl}</span>
                <span className="text-offwhite/40 text-xs">({t('whatsappMainLabel')})</span>
              </a>
            </li>
            <li>
              <a
                href={tel2Href}
                className="inline-flex min-h-[44px] flex-wrap items-center justify-center sm:justify-start gap-x-2 hover:text-terracotta transition-colors"
              >
                <span dir="ltr">{phone2Intl}</span>
                <span className="text-offwhite/40 text-xs">({t('secondaryLabel')})</span>
              </a>
            </li>
            <li>
              <a
                href={whatsapp2Link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center hover:text-terracotta transition-colors"
              >
                {t('whatsapp2')}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-night-line px-5 sm:px-8 lg:px-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-center text-offwhite/35 text-xs">
        <p>
          © {year} {brandFull}. {t('footerRights')}
        </p>
        <p className="tracking-wide">{t('footerRegions')}</p>
      </div>
    </footer>
  )
}
