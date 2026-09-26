import { notFound } from 'next/navigation'
import { brandFull } from '@/lib/data'
import { getCars } from '@/lib/cars'
import BelbalaCarDetail from '@/components/BelbalaCarDetail'
import Footer from '@/components/Footer'

// Cars are managed from /admin: new cars get their page on first visit, and
// pages are refreshed at most once a minute (or instantly when a car is saved).
export const revalidate = 60

export async function generateStaticParams() {
  const cars = await getCars()
  return cars.filter((c) => c.category === 'belbala').map((c) => ({ slug: c.slug }))
}

async function findCar(slug) {
  const cars = await getCars()
  return cars.find((c) => c.slug === slug && c.category === 'belbala') ?? null
}

export async function generateMetadata({ params }) {
  const car = await findCar(params.slug)
  if (!car) return { title: `Belbala Collection | ${brandFull}` }
  return {
    title: `${car.name} — Belbala | ${brandFull}`,
    description: car.blurb,
  }
}

export default async function BelbalaCarPage({ params }) {
  const car = await findCar(params.slug)
  if (!car) notFound()

  return (
    <main className="relative">
      <BelbalaCarDetail car={car} />
      <Footer />
    </main>
  )
}
