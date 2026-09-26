import Hero from '@/components/Hero'
import BrandsMarquee from '@/components/BrandsMarquee'
import Footer from '@/components/Footer'
import { getCars } from '@/lib/cars'

// Homepage stays intentionally minimal: full-screen video hero with the
// 3 trip categories only. Everything else is reachable through the header's
// main navigation (/fleet, /experience, "Pourquoi nous" and /contact) — this
// keeps the first page light and cinematic instead of a long scroll.
// Car counts on the cards come from the database: refresh once a minute.
export const revalidate = 60

export default async function Home() {
  const cars = await getCars()

  return (
    <main className="relative">
      <Hero cars={cars} />
      <BrandsMarquee />
      <Footer />
    </main>
  )
}
