import CollectionPage from '@/components/CollectionPage'
import Footer from '@/components/Footer'
import { brandFull } from '@/lib/data'
import { getCars } from '@/lib/cars'

export const metadata = {
  title: `Belbala Collection | ${brandFull}`,
  description: 'The Belbala collection — cars for the deep desert, Merzouga and Erg Chebbi.',
}

// The fleet is managed from /admin: refresh the page at most once a minute
// (and instantly when a car is saved).
export const revalidate = 60

export default async function BelbalaPage() {
  const cars = await getCars()

  return (
    <main className="relative">
      <CollectionPage category="belbala" cars={cars} />
      <Footer />
    </main>
  )
}
