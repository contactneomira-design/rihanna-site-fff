import { notFound } from 'next/navigation'
import { brandFull } from '@/lib/data'
import { getCars } from '@/lib/cars'
import AtlasCarDetail from '@/components/AtlasCarDetail'
import Footer from '@/components/Footer'

// Cars are managed from /admin: new cars get their page on first visit, and
// pages are refreshed at most once a minute (or instantly when a car is saved).
export const revalidate = 60

export async function generateStaticParams() {
  const cars = await getCars()
  return cars.filter((c) => c.category === 'atlas').map((c) => ({ slug: c.slug }))
}

async function findCar(slug) {
  const cars = await getCars()
  return cars.find((c) => c.slug === slug && c.category === 'atlas') ?? null
}

export async function generateMetadata({ params }) {
  const car = await findCar(params.slug)
  if (!car) return { title: `Atlas Collection | ${brandFull}` }
  return {
    title: `${car.name} — Atlas | ${brandFull}`,
    description: car.blurb,
  }
}

export default async function AtlasCarPage({ params }) {
  const car = await findCar(params.slug)
  if (!car) notFound()

  return (
    <main className="relative">
      <AtlasCarDetail car={car} />
      <Footer />
    </main>
  )
}
