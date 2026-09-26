import { notFound } from 'next/navigation'
import { brandFull } from '@/lib/data'
import { getCars } from '@/lib/cars'
import CarDetail from '@/components/CarDetail'
import Footer from '@/components/Footer'

// Cars are managed from /admin: new cars get their page on first visit, and
// pages are refreshed at most once a minute (or instantly when a car is saved).
export const revalidate = 60

export async function generateStaticParams() {
  const cars = await getCars()
  return cars.map((car) => ({ slug: car.slug }))
}

async function findCar(slug) {
  const cars = await getCars()
  return cars.find((c) => c.slug === slug) ?? null
}

export async function generateMetadata({ params }) {
  const car = await findCar(params.slug)
  if (!car) return { title: `Fleet | ${brandFull}` }
  return {
    title: `${car.name} | ${brandFull}`,
    description: car.blurb,
  }
}

export default async function CarDetailPage({ params }) {
  const car = await findCar(params.slug)
  if (!car) notFound()

  return (
    <main className="relative">
      <CarDetail car={car} />
      <Footer />
    </main>
  )
}
