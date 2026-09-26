// ---------------------------------------------------------------------------
// RIHANA DREAMS CARS — Central content & fleet data
// Edit this file to update copy, categories or the fleet without touching
// any component markup.
// ---------------------------------------------------------------------------

export const brandName = 'RIHANA DREAMS CARS'
export const brandFull = 'RIHANA DREAMS CARS'

export const categories = [
  {
    id: 'family',
    label: 'FAMILY',
    icon: 'Users2',
    tagline: 'Comfort & safety for the whole tribe',
    description:
      'Spacious, reassuring, effortless. The cars we hand to families who want the desert without the compromises — room for the kids, room for the luggage, room to breathe.',
    cover: '/images/covers/family.jpg',
  },
  {
    id: 'belbala',
    label: 'BELBALA',
    icon: 'Compass',
    tagline: 'Deep desert. Merzouga. Erg Chebbi.',
    description:
      'Named after the palm groves at the edge of the erg — Belbala is where the road ends and the dunes begin. Rugged, dependable cars built for the long haul south.',
    cover: '/images/covers/belbala.jpg',
  },
  {
    id: 'atlas',
    label: 'ATLAS',
    icon: 'MountainSnow',
    tagline: 'Switchbacks. Snow peaks. Berber villages.',
    description:
      'The High Atlas demands composure — hairpins, altitude, sudden weather. These are the cars we trust with the mountain roads tourists dream about and locals respect.',
    cover: '/images/covers/atlas.jpg',
  },
]

// Hero trust strip (4 quick-trust items under the trip cards)
export const heroTrust = [
  { icon: 'ShieldCheck', key: 'heroTrust1' },
  { icon: 'Headset', key: 'heroTrust2' },
  { icon: 'MapPin', key: 'heroTrust3' },
  { icon: 'CalendarCheck', key: 'heroTrust4' },
]

export const cars = [
  {
    slug: 'dacia-jogger',
    name: 'Dacia Jogger',
    category: 'family',
    seats: 7,
    transmission: 'Manual',
    fuel: 'Petrol',
    tags: ['7 Seats', 'Family', 'Spacious'],
    image: '/images/cars/dacia-jogger.jpg',
    images: [
      '/cars/family/dacia-jogger-1.jpg',
      '/cars/family/dacia-jogger-2.jpg',
      '/cars/family/dacia-jogger-3.jpg',
      '/cars/family/dacia-jogger-4.jpg',
      '/cars/family/dacia-jogger-5.jpg',
    ],
    blurb: '7 seats, one big family, zero stress.',
    features: ['7 Seats', 'Roof Rails', 'Full Insurance'],
  },
  {
    slug: 'dacia-sandero-stepway',
    name: 'Dacia Sandero Stepway',
    category: 'atlas',
    seats: 5,
    transmission: 'Manual',
    fuel: 'Petrol',
    tags: ['5 Seats', 'City & Road', 'Efficient'],
    image: '/images/cars/dacia-sandero.jpg',
    images: [
      '/cars/atlas/dacia-sandero-stepway-1.jpg',
      '/cars/atlas/dacia-sandero-stepway-2.jpg',
      '/cars/atlas/dacia-sandero-stepway-3.jpg',
      '/cars/atlas/dacia-sandero-stepway-4.jpg',
      '/cars/atlas/dacia-sandero-stepway-5.jpg',
    ],
    blurb: 'Raised, rugged, ready for the open road.',
    features: ['Raised Suspension', 'Economy', 'Full Insurance'],
  },
  {
    slug: 'peugeot-208',
    name: 'Peugeot 208',
    category: 'belbala',
    seats: 5,
    transmission: 'Automatic',
    fuel: 'Petrol',
    tags: ['5 Seats', 'Compact', 'French Chic'],
    image: '/images/cars/peugeot-208.jpg',
    images: [
      '/images/gallery/peugeot-208/1.jpg',
      '/images/gallery/peugeot-208/2.jpg',
      '/images/gallery/peugeot-208/3.jpg',
      '/images/gallery/peugeot-208/4.jpg',
      '/images/gallery/peugeot-208/5.jpg',
    ],
    blurb: 'Sharp lines, smooth ride, city to coast.',
    features: ['Apple CarPlay', 'City Perfect', 'Full Insurance'],
  },
  {
    slug: 'vw-tiguan',
    name: 'Volkswagen Tiguan',
    category: 'atlas',
    seats: 5,
    transmission: 'Automatic',
    fuel: 'Diesel',
    tags: ['5 Seats', 'SUV', 'Panoramic Roof'],
    image: '/images/cars/vw-tiguan.jpg',
    images: [
      '/cars/atlas/vw-tiguan-1.jpg',
      '/cars/atlas/vw-tiguan-2.jpg',
      '/cars/atlas/vw-tiguan-3.jpg',
      '/cars/atlas/vw-tiguan-4.jpg',
      '/cars/atlas/vw-tiguan-5.jpg',
      '/cars/atlas/vw-tiguan-6.jpg',
      '/cars/atlas/vw-tiguan-7.jpg',
    ],
    blurb: 'German precision with room to spare.',
    features: ['Panoramic Roof', 'AWD Available', 'Full Insurance'],
  },
  {
    slug: 'hyundai-tucson',
    name: 'Hyundai Tucson',
    category: 'atlas',
    seats: 5,
    transmission: 'Automatic',
    fuel: 'Diesel',
    tags: ['5 Seats', 'SUV', 'Confident'],
    image: '/images/cars/hyundai-tucson.jpg',
    images: [
      '/cars/atlas/hyundai-tucson-1.jpg',
      '/cars/atlas/hyundai-tucson-2.jpg',
      '/cars/atlas/hyundai-tucson-3.jpg',
      '/cars/atlas/hyundai-tucson-4.jpg',
      '/cars/atlas/hyundai-tucson-5.jpg',
    ],
    blurb: 'Bold design, calm on every kind of road.',
    features: ['Adaptive Cruise', 'Spacious Boot', 'Full Insurance'],
  },
  {
    slug: 'dacia-logan-green',
    name: 'Dacia Logan Green',
    category: 'family',
    seats: 5,
    transmission: 'Manual',
    fuel: 'Petrol',
    tags: ['5 Seats', 'Reliable', 'Long Haul'],
    image: '/images/cars/dacia-logan.jpg',
    images: [
      '/cars/family/dacia-logan-green-1.jpg',
      '/cars/family/dacia-logan-green-2.jpg',
      '/cars/family/dacia-logan-green-3.jpg',
      '/cars/family/dacia-logan-green-4.jpg',
      '/cars/family/dacia-logan-green-5.jpg',
      '/cars/family/dacia-logan-green-6.jpg',
      '/cars/family/dacia-logan-green-7.jpg',
      '/cars/family/dacia-logan-green-8.jpg',
    ],
    blurb: 'The workhorse that never lets you down.',
    features: ['Long Haul Ready', 'Economy', 'Full Insurance'],
  },
  {
    slug: 'dacia-logan-blanc',
    name: 'Dacia Logan Blanc',
    category: 'family',
    seats: 5,
    transmission: 'Manual',
    fuel: 'Petrol',
    tags: ['5 Seats', 'Fresh', 'Desert Roads'],
    image: '/images/cars/dacia-logan-blanche.jpg',
    images: [
      '/cars/family/dacia-logan-blanc-1.jpg',
      '/cars/family/dacia-logan-blanc-2.jpg',
      '/cars/family/dacia-logan-blanc-3.jpg',
      '/cars/family/dacia-logan-blanc-4.jpg',
      '/cars/family/dacia-logan-blanc-5.jpg',
    ],
    blurb: 'Clean, simple, built for the long tarmac south.',
    features: ['Desert Tested', 'Economy', 'Full Insurance'],
  },
  {
    slug: 'renault-talian',
    name: 'Renault Taliant',
    category: 'family',
    seats: 5,
    transmission: 'Automatic',
    fuel: 'Petrol',
    tags: ['5 Seats', 'Modern', 'Border to Border'],
    image: '/images/cars/renault-taliant.jpg',
    images: [
      '/cars/family/renault-talian-1.jpg',
      '/cars/family/renault-talian-2.jpg',
      '/cars/family/renault-talian-3.jpg',
      '/cars/family/renault-talian-4.jpg',
      '/cars/family/renault-talian-5.jpg',
      '/cars/family/renault-talian-6.jpg',
      '/cars/family/renault-talian-7.jpg',
      '/cars/family/renault-talian-8.jpg',
    ],
    blurb: 'Renault\u2019s newest, tuned for distance.',
    features: ['Latest Model', 'Comfort Seats', 'Full Insurance'],
  },
  {
    slug: 'range-rover-evoque',
    name: 'Range Rover Evoque',
    category: 'atlas',
    seats: 5,
    transmission: 'Automatic',
    fuel: 'Diesel',
    tags: ['5 Seats', 'Luxury SUV', 'All-Terrain'],
    image: '/images/cars/range-rover-evoque.jpg',
    images: [
      '/cars/atlas/range-rover-evoque-1.jpg',
      '/cars/atlas/range-rover-evoque-2.jpg',
      '/cars/atlas/range-rover-evoque-3.jpg',
      '/cars/atlas/range-rover-evoque-4.jpg',
      '/cars/atlas/range-rover-evoque-5.jpg',
      '/cars/atlas/range-rover-evoque-6.jpg',
      '/cars/atlas/range-rover-evoque-7.jpg',
    ],
    blurb: 'Refined power for switchbacks and snow.',
    features: ['All-Terrain', 'Premium Sound', 'Full Insurance'],
  },
  {
    slug: 'porsche-macan',
    name: 'Porsche Macan',
    category: 'belbala',
    seats: 5,
    transmission: 'Automatic',
    fuel: 'Petrol',
    tags: ['5 Seats', 'Performance', 'Signature'],
    image: '/images/cars/porsche-macan.jpg',
    images: [
      '/images/gallery/porsche-macan/1.jpg',
      '/images/gallery/porsche-macan/2.jpg',
      '/images/gallery/porsche-macan/3.jpg',
      '/images/gallery/porsche-macan/4.jpg',
      '/images/gallery/porsche-macan/5.jpg',
      '/images/gallery/porsche-macan/6.jpg',
      '/images/gallery/porsche-macan/7.jpg',
    ],
    blurb: 'A sports car\u2019s soul in an SUV\u2019s body.',
    features: ['Sport Mode', 'Panoramic Roof', 'Full Insurance'],
  },
  {
    slug: 'vw-golf-r',
    name: 'Volkswagen Golf R',
    category: 'belbala',
    seats: 5,
    transmission: 'Automatic',
    fuel: 'Petrol',
    tags: ['5 Seats', 'AWD', 'Driver\u2019s Car'],
    image: '/images/cars/vw-golf-r.jpg',
    images: [
      '/images/gallery/vw-golf-r/1.jpg',
      '/images/gallery/vw-golf-r/2.jpg',
      '/images/gallery/vw-golf-r/3.jpg',
      '/images/gallery/vw-golf-r/4.jpg',
      '/images/gallery/vw-golf-r/5.jpg',
    ],
    blurb: 'All-wheel drive thrill for the mountain roads.',
    features: ['4Motion AWD', 'Sport Seats', 'Full Insurance'],
  },
]

// Primary navigation — single source of truth for Header (desktop + mobile)
// and Footer. Labels are translation keys (lib/i18n.js).
export const navLinks = [
  { href: '/fleet', key: 'navFleet' },
  { href: '/experience', key: 'navExperience' },
  { href: '/blog/pourquoi-choisir-rihana-car', key: 'navWhy' },
  { href: '/contact', key: 'navContact' },
]

// Real contact details
// Main number — used for the floating button, header, contact page, car pages…
export const phoneNumber = '0640001846'
export const phoneNumberIntl = '+212 640 001 846'
export const whatsappNumber = '212640001846'
export const whatsappLink = `https://wa.me/${whatsappNumber}`

// Physical location — Google Maps link used everywhere the address appears
export const mapsLink =
  'https://www.google.com/maps/search/?api=1&query=MAG.+N%C2%B0+353+RDC+HAY+IZIKI+JDID+MARRAKECH'

// Secondary number — shown in the footer only
export const phone2 = '0784270768'
export const phone2Intl = '+212 784 270 768'
export const phone2Number = '212784270768'
export const whatsapp2Link = `https://wa.me/${phone2Number}`

// wa.me link to the MAIN number with a pre-filled (URL-encoded) message
export const whatsappUrl = (text) => `${whatsappLink}?text=${encodeURIComponent(text)}`
