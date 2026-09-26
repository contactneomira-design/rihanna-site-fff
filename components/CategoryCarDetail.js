'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Users, Gauge, Fuel, ChevronLeft, MessageCircle, Phone } from 'lucide-react'
import { phoneNumberIntl, whatsappUrl } from '@/lib/data'
import { useLang } from '@/lib/i18n'

// Shared car page for the ATLAS / BELBALA / FAMILY collections
// (AtlasCarDetail, BelbalaCarDetail and FamilyCarDetail are thin wrappers).
export default function CategoryCarDetail({ car, category }) {
  const { t, tf, tv } = useLang()
  const [activeImage, setActiveImage] = useState(0)

  const images = car.images && car.images.length > 0 ? car.images : [car.image]

  // Direct WhatsApp deep-link with a pre-filled message — no form, so the
  // person lands straight in a chat with RIHANA DREAMS CARS.
  const whatsappHref = whatsappUrl(tf('carMsg', { car: car.name }))
  const priceHref = whatsappUrl(tf('priceMsg', { car: car.name }))

  return (
    <section className="relative bg-night pt-24 sm:pt-32 pb-20 sm:pb-28 px-5 sm:px-8 lg:px-12">
      <Link
        href={`/fleet/${category}`}
        className="inline-flex min-h-[48px] items-center gap-1.5 text-offwhite/60 hover:text-terracotta text-xs sm:text-sm tracking-wide mb-4 sm:mb-6 transition-colors duration-300"
      >
        <ChevronLeft size={15} className="rtl:-scale-x-100" />
        {tf('collectionTitle', { name: t(category) })}
      </Link>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
        {/* Gallery */}
        <div className="min-w-0">
          <div className="relative aspect-video sm:aspect-[4/3] overflow-hidden bg-night-soft border border-offwhite/10 mb-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="absolute inset-0"
              >
                <Image
                  src={images[activeImage]}
                  alt={`${car.name} — ${t('photo')} ${activeImage + 1}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  unoptimized={String(images[activeImage]).startsWith('/api/')}
                  priority
                />
              </motion.div>
            </AnimatePresence>
            <span className="absolute top-4 start-4 text-[10px] tracking-widest2 uppercase font-semibold px-2.5 py-1 glass-light text-offwhite z-10">
              {t(category)}
            </span>
          </div>

          {/* Thumbnails — one scrollable row on mobile, wrap on larger screens */}
          {images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1 sm:flex-wrap sm:overflow-visible">
              {images.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setActiveImage(i)}
                  aria-label={`${t('photo')} ${i + 1}`}
                  aria-current={activeImage === i}
                  className={`relative shrink-0 w-20 h-16 sm:w-24 sm:h-[72px] overflow-hidden border transition-colors duration-300 ${
                    activeImage === i
                      ? 'border-terracotta'
                      : 'border-offwhite/15 hover:border-offwhite/40'
                  }`}
                >
                  <Image
                    src={src}
                    alt={`${car.name} ${t('photo')} ${i + 1}`}
                    fill
                    sizes="100px"
                    unoptimized={String(src).startsWith('/api/')}
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="min-w-0">
          <h1 className="font-display text-4xl sm:text-5xl uppercase leading-[0.95] text-offwhite">
            {car.name}
          </h1>
          <p className="text-terracotta text-lg sm:text-xl font-bold mt-3">
            {t('priceOnRequest')}
          </p>
          <a
            href={priceHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex min-h-[48px] w-full sm:w-auto items-center justify-center gap-2 bg-terracotta hover:bg-offwhite text-night px-6 py-3.5 text-xs tracking-widest2 uppercase font-semibold transition-colors duration-300"
          >
            <MessageCircle size={15} className="shrink-0" />
            {t('askPriceWhatsapp')}
          </a>
          <p className="text-offwhite/60 text-sm sm:text-base font-light mt-4 max-w-lg leading-relaxed">
            {tv('b', car.blurbKey ?? car.slug, car.blurb)}
          </p>

          {/* Specs — from data only, nothing invented */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-6 pt-6 border-t border-offwhite/10 text-offwhite/80 text-sm">
            <span className="flex items-center gap-2">
              <Users size={16} className="text-terracotta" /> {car.seats} {t('seats')}
            </span>
            <span className="flex items-center gap-2">
              <Gauge size={16} className="text-terracotta" /> {tv('s', car.transmission)}
            </span>
            <span className="flex items-center gap-2">
              <Fuel size={16} className="text-terracotta" /> {tv('s', car.fuel)}
            </span>
          </div>

          {car.features && car.features.length > 0 && (
            <ul className="flex flex-wrap gap-2 mt-6">
              {car.features.map((f) => (
                <li
                  key={f}
                  className="text-offwhite/70 text-xs border border-offwhite/15 px-3 py-1.5"
                >
                  {tv('f', f)}
                </li>
              ))}
            </ul>
          )}

          {/* Availability CTA — direct WhatsApp deep-link, no form */}
          <div className="mt-8 p-5 sm:p-6 bg-night-soft border border-offwhite/10">
            <h3 className="font-display text-lg uppercase text-offwhite mb-2">
              {t('checkAvailability')}
            </h3>
            <p className="text-sm text-offwhite/55 mb-4 font-light">
              {t('availabilityQuestion')}
            </p>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full min-h-[48px] bg-terracotta hover:bg-offwhite text-night px-4 py-4 flex items-center justify-center gap-2 text-center uppercase tracking-widest2 text-xs font-semibold transition-colors duration-300"
            >
              <MessageCircle size={15} className="shrink-0" />
              <span>
                {t('checkAvailability')} — {car.name}
              </span>
            </a>

            <div className="flex items-center gap-2 mt-4">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs text-offwhite/45">{t('repliesFast')}</span>
            </div>

            {/* Second CTA — call */}
            <a
              href={`tel:${phoneNumberIntl.replace(/\s/g, '')}`}
              aria-label={t('ctaCall')}
              className="mt-3 w-full min-h-[48px] border border-offwhite/25 hover:border-terracotta text-offwhite py-3.5 flex items-center justify-center gap-2 text-center uppercase tracking-widest2 text-xs font-semibold transition-colors duration-300"
            >
              <Phone size={14} />
              <span dir="ltr">{phoneNumberIntl}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
