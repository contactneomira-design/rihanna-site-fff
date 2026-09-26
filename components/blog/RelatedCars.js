'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Users, Gauge, Fuel } from 'lucide-react'
import { cars as staticCars } from '@/lib/data'
import { useLang } from '@/lib/i18n'

export default function RelatedCars({ slugs, cars = staticCars }) {
  const { t, tv } = useLang()
  const relatedCars = slugs
    .map((slug) => cars.find((c) => c.slug === slug))
    .filter(Boolean)

  if (relatedCars.length === 0) return null

  return (
    <section className="mt-16 sm:mt-20 pt-10 sm:pt-12 border-t border-offwhite/10">
      <p className="text-terracotta text-xs tracking-widest2 uppercase font-semibold mb-3">
        {t('recommendedVehicles')}
      </p>
      <h2 className="font-display text-2xl sm:text-3xl uppercase leading-none text-offwhite mb-8 sm:mb-10">
        {t('forThisTrip')}
      </h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {relatedCars.map((car) => (
          <Link key={car.slug} href={`/fleet/${car.category}/${car.slug}`} className="group block">
            <div className="relative aspect-[4/3] overflow-hidden bg-night-soft border border-offwhite/10">
              <Image
                src={car.images?.[0] ?? car.image}
                alt={car.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                unoptimized={String(car.images?.[0] ?? car.image).startsWith('/api/')}
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-night/90 via-night/5 to-transparent" />
              <span className="absolute top-4 start-4 text-[10px] tracking-widest2 uppercase font-semibold px-2.5 py-1 glass-light text-offwhite">
                {t(car.category)}
              </span>
            </div>
            <div className="pt-4 flex items-start justify-between gap-3">
              <div>
                <h3 className="font-display text-xl uppercase leading-none text-offwhite group-hover:text-terracotta transition-colors duration-300">
                  {car.name}
                </h3>
                <div className="flex items-center gap-3 text-offwhite/45 text-xs mt-2">
                  <span className="flex items-center gap-1"><Users size={12} /> {car.seats}</span>
                  <span className="flex items-center gap-1"><Gauge size={12} /> {tv('s', car.transmission)}</span>
                  <span className="flex items-center gap-1"><Fuel size={12} /> {tv('s', car.fuel)}</span>
                </div>
              </div>
              <span className="shrink-0 text-terracotta text-xs font-bold whitespace-nowrap pt-1">
                {t('priceOnRequest')}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
