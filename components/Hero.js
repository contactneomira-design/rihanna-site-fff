'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  Users2,
  Compass,
  MountainSnow,
  ShieldCheck,
  Headset,
  MapPin,
  CalendarCheck,
  ChevronRight,
} from 'lucide-react'
import { categories, cars as staticCars, heroTrust, whatsappUrl } from '@/lib/data'
import { useLang } from '@/lib/i18n'

// Map icon name strings (from lib/data.js) to actual lucide components
const iconMap = {
  Users2,
  Compass,
  MountainSnow,
  ShieldCheck,
  Headset,
  MapPin,
  CalendarCheck,
}

const catCopy = {
  family: { title: 'family', sub: 'familySub', blurb: 'familyBlurb' },
  belbala: { title: 'belbala', sub: 'belbalaSub', blurb: 'belbalaBlurb' },
  atlas: { title: 'atlas', sub: 'atlasSub', blurb: 'atlasBlurb' },
}

export default function Hero({ cars = staticCars }) {
  const { t, tf } = useLang()

  // Mini booking widget state — no real booking engine, just builds a
  // pre-filled WhatsApp message (see RÈGLES: aucun prix, aucun checkout).
  const locationOptions = [
    t('widgetLocationAirport'),
    t('widgetLocationCity'),
    t('widgetLocationMerzouga'),
    t('widgetLocationOuarzazate'),
    t('widgetLocationAtlas'),
  ]
  const [pickupLocation, setPickupLocation] = useState(locationOptions[0])
  const [pickupDate, setPickupDate] = useState('')
  const [returnDate, setReturnDate] = useState('')

  const handleWidgetSearch = () => {
    const message = tf('widgetSearchMsg', {
      date1: pickupDate || '—',
      date2: returnDate || '—',
      lieu: pickupLocation,
    })
    window.open(whatsappUrl(message), '_blank', 'noopener,noreferrer')
  }

  return (
    <section id="top" className="relative min-h-[100svh] w-full overflow-hidden bg-night">
      {/* Full-bleed video background — fills the entire first page */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        poster="/images/hero-poster.jpg"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      {/* Dark cinematic overlay for legibility */}
      <div className="absolute inset-0 bg-night/55" />
      <div className="absolute inset-0 bg-gradient-to-b from-night/80 via-night/40 to-night" />

      {/* Content */}
      <div className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center px-5 sm:px-8 py-28 sm:py-32">
        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-center uppercase leading-[0.95] text-[13vw] sm:text-[7vw] lg:text-[5.5vw] text-offwhite"
        >
          {t('heroHeadlinePlain')} <span className="text-terracotta">{t('heroHeadlineAccent')}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.7 }}
          className="mt-4 sm:mt-5 text-center text-offwhite/70 text-sm sm:text-base font-light max-w-md px-2"
        >
          {t('heroSubtitle')}
        </motion.p>

        {/* Mini booking widget — glassmorphism over video, builds a
            pre-filled WhatsApp message. No prices, no real booking engine. */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="mt-8 sm:mt-10 w-full max-w-3xl bg-black/35 backdrop-blur-md border border-terracotta/30 p-4 sm:p-5"
        >
          <div className="flex flex-col sm:flex-row gap-3 sm:items-end">
            {/* Pick-up location */}
            <div className="flex-1 min-w-0 text-start">
              <label
                htmlFor="widget-location"
                className="block text-[11px] tracking-wide text-offwhite/70 uppercase mb-1.5"
              >
                {t('widgetLocationLabel')}
              </label>
              <select
                id="widget-location"
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
                className="w-full min-h-[48px] bg-black/30 border border-offwhite/20 text-offwhite text-sm px-3 focus:outline-none focus:border-terracotta transition-colors"
              >
                {locationOptions.map((opt) => (
                  <option key={opt} value={opt} className="bg-night text-offwhite">
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* Pick-up date */}
            <div className="flex-1 min-w-0 text-start">
              <label
                htmlFor="widget-pickup-date"
                className="block text-[11px] tracking-wide text-offwhite/70 uppercase mb-1.5"
              >
                {t('widgetPickupDateLabel')}
              </label>
              <input
                id="widget-pickup-date"
                type="date"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                className="w-full min-h-[48px] bg-black/30 border border-offwhite/20 text-offwhite text-sm px-3 focus:outline-none focus:border-terracotta transition-colors [color-scheme:dark]"
              />
            </div>

            {/* Return date */}
            <div className="flex-1 min-w-0 text-start">
              <label
                htmlFor="widget-return-date"
                className="block text-[11px] tracking-wide text-offwhite/70 uppercase mb-1.5"
              >
                {t('widgetReturnDateLabel')}
              </label>
              <input
                id="widget-return-date"
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className="w-full min-h-[48px] bg-black/30 border border-offwhite/20 text-offwhite text-sm px-3 focus:outline-none focus:border-terracotta transition-colors [color-scheme:dark]"
              />
            </div>

            {/* Search — opens WhatsApp with a pre-filled message */}
            <button
              type="button"
              onClick={handleWidgetSearch}
              className="w-full sm:w-auto min-h-[48px] shrink-0 bg-terracotta hover:bg-offwhite text-night text-xs font-semibold tracking-widest2 uppercase px-6 transition-colors duration-300"
            >
              {t('widgetSearchButton')}
            </button>
          </div>
        </motion.div>

        {/* Trip category cards */}
        <div className="mt-10 sm:mt-14 w-full max-w-5xl grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-6">
          {categories.map((cat, i) => {
            const Icon = iconMap[cat.icon] ?? Users2
            const copy = catCopy[cat.id]
            // Every category (FAMILY, BELBALA, ATLAS) has its own dedicated
            // collection page at /fleet/<category>.
            const cardHref = `/fleet/${cat.id}`
            // FAMILY card carries a live car-count label (derived from data).
            const carCount = cat.id === 'family' ? cars.filter((c) => c.category === cat.id).length : 0
            return (
              <motion.a
                key={cat.id}
                href={cardHref}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="group relative pt-7"
              >
                {/* Icon badge — overlaps top edge of card */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-terracotta flex items-center justify-center shadow-[0_6px_20px_rgba(200,106,59,0.5)] ring-4 ring-night">
                  <Icon size={22} className="text-night" strokeWidth={2} />
                </div>

                {/* Card */}
                <div className="relative aspect-[3/4] sm:aspect-[4/5] overflow-hidden border border-offwhite/10">
                  <Image
                    src={cat.cover}
                    alt={t(copy.title)}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 33vw, 320px"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-night via-night/40 to-transparent" />
                  {carCount > 0 && (
                    <span className="absolute top-4 end-4 text-[10px] tracking-widest2 uppercase font-semibold px-2.5 py-1 glass-light text-offwhite">
                      {carCount} {t('carsLabel')}
                    </span>
                  )}

                  <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 text-center">
                    <h3 className="font-display text-2xl sm:text-3xl uppercase text-offwhite leading-none">
                      {t(copy.title)}
                    </h3>
                    <p className="text-terracotta text-xs sm:text-sm font-semibold tracking-wide mt-1.5">
                      {t(copy.sub)}
                    </p>
                    <p className="text-offwhite/60 text-xs sm:text-sm font-light mt-2 leading-relaxed">
                      {t(copy.blurb)}
                    </p>

                    <span className="inline-flex items-center gap-1 mt-4 text-offwhite text-xs sm:text-sm font-semibold border-b border-terracotta pb-1 group-hover:gap-2 transition-all duration-300">
                      {t('chooseThisTrip')}
                      <ChevronRight size={14} className="text-terracotta rtl:-scale-x-100" />
                    </span>
                  </div>
                </div>
              </motion.a>
            )
          })}
        </div>

        {/* Trust strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.7 }}
          className="mt-10 sm:mt-14 w-full max-w-4xl flex flex-wrap items-center justify-center gap-x-8 gap-y-4 sm:gap-x-12"
        >
          {heroTrust.map((item) => {
            const Icon = iconMap[item.icon] ?? ShieldCheck
            return (
              <div key={item.key} className="flex items-center gap-2 text-offwhite/75">
                <Icon size={17} className="text-terracotta shrink-0" strokeWidth={1.8} />
                <span className="text-xs sm:text-sm font-light sm:whitespace-nowrap">
                  {t(item.key)}
                </span>
              </div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
