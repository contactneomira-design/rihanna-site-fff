import { notFound } from 'next/navigation'
import { brandFull } from '@/lib/data'
import { getCars } from '@/lib/cars'
import FamilyCarDetail from '@/components/FamilyCarDetail'
import Footer from '@/components/Footer'

// Cars are managed from /admin: new cars get their page on first visit, and
// pages are refreshed at most once a minute (or instantly when a car is saved).
export const revalidate = 60

export async function generateStaticParams() {
  const cars = await getCars()
  return cars.filter((c) => c.category === 'family').map((c) => ({ slug: c.slug }))
}

async function findCar(slug) {
  const cars = await getCars()
  return cars.find((c) => c.slug === slug && c.category === 'family') ?? null
}

export async function generateMetadata({ params }) {
  const car = await findCar(params.slug)
  if (!car) return { title: `Family Collection | ${brandFull}` }
  return {
    title: `${car.name} — Family | ${brandFull}`,
    description: car.blurb,
  }
}

export default async function FamilyCarPage({ params }) {
  const car = await findCar(params.slug)
  if (!car) notFound()

  return (
    <main className="relative">
      <FamilyCarDetail car={car} />
      <Footer />
    </main>
  )
}
