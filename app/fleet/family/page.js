import CollectionPage from '@/components/CollectionPage'
import Footer from '@/components/Footer'
import { brandFull } from '@/lib/data'
import { getCars } from '@/lib/cars'

export const metadata = {
  title: `Family Collection | ${brandFull}`,
  description: 'The Family collection — spacious, comfortable cars for the whole family.',
}

// The fleet is managed from /admin: refresh the page at most once a minute
// (and instantly when a car is saved).
export const revalidate = 60

export default async function FamilyPage() {
  const cars = await getCars()

  return (
    <main className="relative">
      <CollectionPage category="family" cars={cars} />
      <Footer />
    </main>
  )
}
