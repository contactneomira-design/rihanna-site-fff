import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'
import { brandFull } from '@/lib/data'

export const metadata = {
  title: `Contact | ${brandFull}`,
  description:
    'Contactez RIHANA DREAMS CARS sur WhatsApp ou par téléphone pour réserver votre location de voiture à Marrakech, Merzouga et dans le Haut Atlas.',
}

export default function ContactPage() {
  return (
    <main className="relative">
      <ContactSection />
      <Footer />
    </main>
  )
}
