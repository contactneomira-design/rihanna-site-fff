import Experience from '@/components/Experience'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'The Experience | RIHANA DREAMS CARS',
  description: 'Two roads south: Belbala into the Sahara erg, and Atlas above the clouds. The stories behind every RIHANA DREAMS CARS journey.',
}

export default function ExperiencePage() {
  return (
    <main className="relative">
      <Experience />
      <Footer />
    </main>
  )
}
