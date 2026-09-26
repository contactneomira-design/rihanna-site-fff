import Fleet from '@/components/Fleet'
import Footer from '@/components/Footer'
import { getCars } from '@/lib/cars'

export const metadata = {
  title: 'The Fleet | RIHANA DREAMS CARS',
  description: 'Three journeys — Family, Belbala & Atlas. Check availability and book your RIHANA DREAMS CARS vehicle.',
}

// The fleet is managed from /admin: refresh the page at most once a minute
// (and instantly when a car is saved).
export const revalidate = 60

export default async function FleetPage() {
  const cars = await getCars()

  return (
    <main className="relative">
      <Fleet cars={cars} />
      <Footer />
    </main>
  )
}
