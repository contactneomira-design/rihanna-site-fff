'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Users, Gauge, Fuel } from 'lucide-react'
import { useLang } from '@/lib/i18n'

export default function CarCard({ car, onBook, index = 0 }) {
  const { t, tv } = useLang()

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: (index % 6) * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="group relative w-full min-w-0"
    >
      <Link href={`/fleet/${car.category}/${car.slug}`} className="relative aspect-[4/3] overflow-hidden bg-night-soft border border-offwhite/10 block">
        <Image
          src={car.image}
          alt={car.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          unoptimized={String(car.image).startsWith('/api/')}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-night/90 via-night/5 to-transparent" />

        {/* Category tag */}
        <span className="absolute top-4 start-4 text-[10px] tracking-widest2 uppercase font-semibold px-2.5 py-1 glass-light text-offwhite">
          {t(car.category)}
        </span>

        {/* Specs badge — glassmorphism, appears on hover */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileHover={{ opacity: 1, y: 0 }}
          className="absolute bottom-0 inset-x-0 p-4 glass opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-400"
        >
          <div className="flex items-center justify-between text-xs text-offwhite/85">
            <span className="flex items-center gap-1.5">
              <Users size={13} /> {car.seats}
            </span>
            <span className="flex items-center gap-1.5">
              <Gauge size={13} /> {tv('s', car.transmission)}
            </span>
            <span className="flex items-center gap-1.5">
              <Fuel size={13} /> {tv('s', car.fuel)}
            </span>
          </div>
        </motion.div>

        {/* Name overlay always visible at bottom on mobile */}
        <div className="absolute bottom-4 inset-x-4 sm:hidden">
          <p className="font-display text-xl uppercase text-offwhite">{car.name}</p>
        </div>
      </Link>

      <div className="pt-4 flex items-start justify-between gap-3">
        <div>
          <Link href={`/fleet/${car.category}/${car.slug}`}>
            <h3 className="font-display text-2xl uppercase leading-none text-offwhite hover:text-terracotta transition-colors duration-300">
              {car.name}
            </h3>
          </Link>
          <p className="text-offwhite/50 text-xs mt-1.5 font-light">{tv('b', car.blurbKey ?? car.slug, car.blurb)}</p>
        </div>
        <span className="shrink-0 text-terracotta text-xs font-bold whitespace-nowrap pt-1">
          {t('priceOnRequest')}
        </span>
      </div>

      <button
        onClick={() => onBook(car)}
        className="mt-4 w-full min-h-[48px] border border-offwhite/25 hover:border-terracotta hover:bg-terracotta hover:text-night text-offwhite text-[11px] tracking-widest2 uppercase font-semibold py-3.5 transition-all duration-300"
      >
        {t('checkAvailability')}
      </button>
    </motion.div>
  )
}
