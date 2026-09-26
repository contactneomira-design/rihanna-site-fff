'use client'

import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { cars as staticCars, categories } from '@/lib/data'
import { useLang } from '@/lib/i18n'
import CarCard from './CarCard'
import BookingModal from './BookingModal'

export default function Fleet({ cars = staticCars }) {
  const [filter, setFilter] = useState('all')
  const [bookingCar, setBookingCar] = useState(null)
  const { t, tf } = useLang()

  const filtered = filter === 'all' ? cars : cars.filter((c) => c.category === filter)

  const filterLabel = (id) => (id === 'all' ? t('all') : t(id))

  return (
    <section id="fleet" className="relative bg-night py-20 sm:py-32 px-5 sm:px-8 lg:px-12">
      {/* Anchor targets for hero category links */}
      <span id="fleet-family" className="absolute -top-20" />
      <span id="fleet-belbala" className="absolute -top-20" />
      <span id="fleet-atlas" className="absolute -top-20" />

      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10 sm:mb-14">
        <div>
          <p className="text-terracotta text-xs tracking-widest2 uppercase font-semibold mb-3">
            {tf('fleetCount', { n: cars.length })}
          </p>
          <h2 className="font-display text-[13vw] sm:text-[6vw] lg:text-[5vw] leading-[0.9] uppercase">
            {t('fleetTitle')}
          </h2>
          <p className="text-offwhite/50 text-sm sm:text-base mt-3 max-w-md font-light">
            {t('fleetSub')}
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2" role="group">
          {['all', ...categories.map((c) => c.id)].map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => setFilter(id)}
              aria-pressed={filter === id}
              className={`min-h-[48px] min-w-[48px] px-4 py-2.5 text-[11px] tracking-widest2 uppercase font-semibold border transition-all duration-300 ${
                filter === id
                  ? 'bg-terracotta text-night border-terracotta'
                  : 'border-offwhite/25 text-offwhite/70 hover:border-offwhite/60 hover:text-offwhite'
              }`}
            >
              {filterLabel(id)}
            </button>
          ))}
        </div>
      </div>

      {/* Responsive grid: 1 column on phones, 2 on tablets, 3 on desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
        <AnimatePresence mode="popLayout">
          {filtered.map((car, i) => (
            <CarCard key={car.slug} car={car} index={i} onBook={setBookingCar} />
          ))}
        </AnimatePresence>
      </div>

      <BookingModal car={bookingCar} onClose={() => setBookingCar(null)} />
    </section>
  )
}
