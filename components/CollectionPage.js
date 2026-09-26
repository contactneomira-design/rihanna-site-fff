'use client'

import Link from 'next/link'
import Image from 'next/image'
import { cars as staticCars } from '@/lib/data'
import { useLang } from '@/lib/i18n'

const subKey = {
  family: 'collectionSubFamily',
  belbala: 'collectionSubBelbala',
  atlas: 'collectionSubAtlas',
}

// Shared body of /fleet/family, /fleet/belbala and /fleet/atlas.
// The list comes from the database (managed in /admin): every visible car of
// the category belongs to the collection.
export default function CollectionPage({ category, cars = staticCars }) {
  const { t, tf } = useLang()

  const list = cars.filter((c) => c.category === category)
  const gridCols =
    list.length === 3
      ? 'grid-cols-1 sm:grid-cols-3'
      : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'

  return (
    <section className="relative bg-night pt-28 sm:pt-36 pb-20 sm:pb-28 px-5 sm:px-8 lg:px-12">
      <p className="text-terracotta text-xs tracking-widest2 uppercase font-semibold mb-3">
        {tf('vehiclesCollection', { n: list.length })}
      </p>
      <h1 className="font-display text-[13vw] sm:text-[6vw] lg:text-[5vw] leading-[0.9] uppercase text-offwhite">
        {tf('collectionTitle', { name: t(category) })}
      </h1>
      <p className="text-offwhite/50 text-sm sm:text-base mt-3 max-w-md font-light">
        {t(subKey[category])}
      </p>

      <div className={`mt-12 sm:mt-16 grid ${gridCols} gap-6 sm:gap-8`}>
        {list.map((car) => (
          <Link
            key={car.slug}
            href={`/fleet/${category}/${car.slug}`}
            data-category={category}
            className="group block"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-night-soft border border-offwhite/10">
              <Image
                src={car.images?.[0] ?? car.image}
                alt={car.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                unoptimized={String(car.images?.[0] ?? car.image).startsWith('/api/')}
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-night/90 via-night/5 to-transparent" />
              <span className="absolute top-4 start-4 text-[10px] tracking-widest2 uppercase font-semibold px-2.5 py-1 glass-light text-offwhite">
                {t(category)}
              </span>
            </div>
            <div className="pt-4 flex items-start justify-between gap-3">
              <h2 className="font-display text-2xl uppercase leading-none text-offwhite group-hover:text-terracotta transition-colors duration-300">
                {car.name}
              </h2>
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
