import CollectionPage from '@/components/CollectionPage'
import Footer from '@/components/Footer'
import { brandFull } from '@/lib/data'
import { getCars } from '@/lib/cars'

export const metadata = {
  title: `Atlas Collection | ${brandFull}`,
  description: 'The Atlas collection — cars for the High Atlas mountain roads and Berber villages.',
}

// The fleet is managed from /admin: refresh the page at most once a minute
// (and instantly when a car is saved).
export const revalidate = 60

export default async function AtlasPage() {
  const cars = await getCars()

  return (
    <main className="relative">
      <CollectionPage category="atlas" cars={cars} />
      <Footer />
    </main>
  )
}
