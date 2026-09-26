'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Users, Gauge, Fuel, Check, ChevronLeft, MessageCircle } from 'lucide-react'
import { whatsappUrl } from '@/lib/data'
import { useLang } from '@/lib/i18n'
import BookingModal from './BookingModal'

export default function CarDetail({ car }) {
  const { t, tf, tv } = useLang()
  const [activeImage, setActiveImage] = useState(0)
  const [bookingOpen, setBookingOpen] = useState(false)

  const images = car.images && car.images.length > 0 ? car.images : [car.image]

  return (
    <section className="relative bg-night pt-24 sm:pt-32 pb-20 sm:pb-28 px-5 sm:px-8 lg:px-12">
      <Link
        href="/fleet"
        className="inline-flex min-h-[48px] items-center gap-1.5 text-offwhite/60 hover:text-terracotta text-xs sm:text-sm tracking-wide mb-4 sm:mb-6 transition-colors duration-300"
      >
        <ChevronLeft size={15} className="rtl:-scale-x-100" />
        {t('backToFleet')}
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
              {t(car.category)}
            </span>
          </div>

          {/* Thumbnails — handles any number of images, wraps on small screens */}
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
            href={whatsappUrl(tf('priceMsg', { car: car.name }))}
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

          {/* Specs */}
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

          {/* Features */}
          {car.features && car.features.length > 0 && (
            <ul className="flex flex-col gap-2.5 mt-6">
              {car.features.map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-offwhite/75 text-sm">
                  <Check size={15} className="text-terracotta shrink-0" />
                  {tv('f', f)}
                </li>
              ))}
            </ul>
          )}

          <button
            onClick={() => setBookingOpen(true)}
            className="mt-8 w-full sm:w-auto sm:px-10 min-h-[48px] border border-offwhite/25 hover:border-terracotta hover:bg-terracotta hover:text-night text-offwhite text-xs tracking-widest2 uppercase font-semibold py-4 transition-all duration-300"
          >
            {t('checkAvailability')}
          </button>
        </div>
      </div>

      <BookingModal car={bookingOpen ? car : null} onClose={() => setBookingOpen(false)} />
    </section>
  )
}
