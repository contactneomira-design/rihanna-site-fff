import './globals.css'
import { Bebas_Neue, Manrope, Cairo } from 'next/font/google'
import { LangProvider } from '@/lib/i18n'
import SmoothScroll from '@/components/SmoothScroll'
import Header from '@/components/Header'
import WhatsAppFloat from '@/components/WhatsAppFloat'

const display = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-display',
  display: 'swap',
})

const body = Manrope({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-body',
  display: 'swap',
})

// Arabic typeface — applied through the `.font-arabic` class on <html>
// (see app/globals.css) whenever the language is Arabic.
const arabic = Cairo({
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-arabic',
  display: 'swap',
})

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0A0A0A',
}

export const metadata = {
  title: 'RIHANA DREAMS CARS - Location Voiture Marrakech',
  description:
    'RIHANA DREAMS CARS : location de voitures de luxe à Marrakech, Merzouga et dans le Haut Atlas. Livraison à domicile, assurance complète et assistance 24/7 sur WhatsApp.',
  keywords: [
    'location voiture Marrakech',
    'location voiture de luxe Maroc',
    'location voiture Merzouga',
    'location voiture Atlas',
    'car rental Marrakech',
    'RIHANA DREAMS CARS',
  ],
  icons: { icon: '/favicon.png', apple: '/favicon.png' },
  openGraph: {
    title: 'RIHANA DREAMS CARS - Location Voiture Marrakech',
    description:
      'Location de voitures de luxe à Marrakech, Merzouga et dans le Haut Atlas.',
    type: 'website',
    images: [{ url: '/logo.png' }],
  },
}

// Runs before React hydrates: applies the saved language to <html> so an
// Arabic visitor gets RTL + the Arabic font immediately (no left-to-right flash).
const langBootScript = `try{var l=localStorage.getItem('rihana-lang');if(l==='fr'||l==='en'||l==='ar'){var d=document.documentElement;d.lang=l;if(l==='ar'){d.dir='rtl';d.classList.add('font-arabic')}}}catch(e){}`

export default function RootLayout({ children }) {
  return (
    <html
      lang="fr"
      dir="ltr"
      suppressHydrationWarning
      className={`${display.variable} ${body.variable} ${arabic.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: langBootScript }} />
      </head>
      <body className="bg-night text-offwhite font-body antialiased overflow-x-hidden selection:bg-terracotta selection:text-night">
        <LangProvider>
          <SmoothScroll />
          <div className="grain-overlay" />
          <Header />
          {children}
          <WhatsAppFloat />
        </LangProvider>
      </body>
    </html>
  )
}
