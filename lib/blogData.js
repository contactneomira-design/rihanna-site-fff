// ---------------------------------------------------------------------------
// RIHANA DREAMS CARS — Blog content
// Central data source for /app/blog/[slug]. Edit copy, SEO metadata or content
// blocks here without touching any component markup. Each post's `content`
// array is rendered by components/blog/ArticleBlocks.js.
// ---------------------------------------------------------------------------

export const blogPosts = [
  // -------------------------------------------------------------------
  // The only article: "Pourquoi nous choisir" — reached from the
  // "Pourquoi nous" link in the header / footer / mobile menu.
  // RIHANA DREAMS CARS rents cars WITHOUT a driver only.
  // -------------------------------------------------------------------
  {
    slug: 'pourquoi-choisir-rihana-car',
    title: 'Pourquoi Choisir RIHANA DREAMS CARS ? Location de Voiture Sans Chauffeur, Livrée chez Vous',
    metaDescription:
      "Location de voiture sans chauffeur à Marrakech : RIHANA DREAMS CARS loue uniquement des véhicules sans chauffeur, avec livraison à domicile et reprise à domicile pour un prix symbolique.",
    excerpt:
      "Location de voiture sans chauffeur uniquement, livraison à domicile et reprise à domicile pour un prix symbolique : découvrez ce qui distingue RIHANA DREAMS CARS.",
    date: '15 Mars 2026',
    dateISO: '2026-03-15',
    author: 'RIHANA DREAMS CARS',
    category: 'À Propos',
    i18n: {
      en: {
        title: 'Why Choose RIHANA DREAMS CARS? Self-Drive Car Rental, Delivered to You',
        excerpt:
          'Self-drive car rental only, home delivery and home pickup for a symbolic price: discover what sets RIHANA DREAMS CARS apart.',
        category: 'About',
      },
      ar: {
        title: 'لماذا تختار RIHANA DREAMS CARS؟ كراء السيارات بدون سائق، نوصلها إليك',
        excerpt:
          'كراء السيارات بدون سائق فقط، مع التسليم والاسترجاع عند باب منزلك مقابل ثمن رمزي: اكتشف ما يميّز RIHANA DREAMS CARS.',
        category: 'من نحن',
      },
    },
    coverImage: '/images/cars/range-rover-evoque.jpg',
    coverAlt: 'Véhicule premium RIHANA DREAMS CARS au coucher du soleil à Marrakech',
    relatedCars: ['dacia-jogger', 'peugeot-208', 'range-rover-evoque'],
    content: [
      {
        type: 'lead',
        text:
          "RIHANA DREAMS CARS, c'est de la location de voiture sans chauffeur, uniquement. Vous prenez le volant, vous choisissez votre itinéraire, vous roulez à votre rythme. Pas de comptoir où faire la queue, pas de paperasse interminable : nous livrons la voiture chez vous et venons la récupérer à la fin de votre location, pour un prix symbolique.",
      },
      {
        type: 'h2',
        text: 'Location Sans Chauffeur Uniquement',
      },
      {
        type: 'p',
        text:
          "Soyons clairs : tous les véhicules de notre flotte sont loués sans chauffeur. Vous conduisez vous-même, en toute liberté, pendant toute la durée de votre location. C'est notre seul métier, et c'est ce qui nous permet de vous proposer une flotte variée et bien entretenue, une réservation simple sur WhatsApp et une vraie disponibilité.",
      },
      {
        type: 'h2',
        text: 'Nos 3 Engagements',
      },
      {
        type: 'iconGrid',
        items: [
          {
            icon: 'Home',
            title: 'Livraison à Domicile',
            text:
              "Nous vous livrons la voiture là où vous êtes : à l'aéroport, à votre hôtel ou directement à la porte de votre riad à Marrakech. Un service premium proposé pour un prix symbolique.",
          },
          {
            icon: 'KeyRound',
            title: 'Reprise à Domicile',
            text:
              "Fin de location ? Pas besoin de vous déplacer. Envoyez-nous simplement l'état du véhicule en photos ou vidéo sur WhatsApp, et un agent RIHANA DREAMS CARS vient récupérer la voiture chez vous. Rapide, professionnel, prix symbolique.",
          },
          {
            icon: 'MessageCircle',
            title: 'Facilité Absolue',
            text:
              "Pas de paperasse interminable, pas de stress. Une réservation sur WhatsApp, une disponibilité en temps réel et une équipe qui parle votre langue, du premier message au dernier kilomètre.",
          },
        ],
      },
      {
        type: 'quote',
        text:
          "On a écrit sur WhatsApp le matin même, la voiture était devant notre riad deux heures après. Aucune paperasse, juste les clés en main. On repart avec ce niveau de service en tête pour notre prochain voyage.",
        author: 'Un client RIHANA DREAMS CARS',
      },
      {
        type: 'h2',
        text: 'Une Équipe à Votre Écoute, du Début à la Fin',
      },
      {
        type: 'p',
        text:
          "Notre promesse ne s'arrête pas à la remise des clés. Toute l'équipe RIHANA DREAMS CARS reste joignable sur WhatsApp pendant toute la durée de votre location — pour une question, un imprévu ou simplement pour prolonger votre séjour. C'est cette disponibilité, couplée à une flotte variée et bien entretenue, qui fait la différence entre louer une voiture et vivre une expérience sans accroc.",
      },
      {
        type: 'cta',
        eyebrow: 'Prêt à partir ?',
        title: 'Réservez en Quelques Messages',
        text:
          "Dites-nous vos dates, votre lieu de prise en charge et le véhicule qui vous fait envie. On s'occupe du reste : vous n'avez qu'à prendre le volant.",
        buttonText: 'Réserver sur WhatsApp',
        href: 'whatsapp',
      },
    ],
  },
]

// Title / excerpt / category in the visitor's language. Article bodies are
// written in French only, so FR is the source and EN/AR override the card
// fields (see `i18n` on each post).
export function localizePost(post, lang) {
  const o = lang !== 'fr' ? post.i18n?.[lang] : null
  return o ? { ...post, ...o } : post
}

// French posts keep their hand-written date; EN/AR are formatted from dateISO.
export function formatPostDate(post, lang) {
  if (lang === 'fr' || !post.dateISO) return post.date
  const locale = lang === 'ar' ? 'ar-MA-u-nu-latn' : 'en-GB'
  try {
    return new Intl.DateTimeFormat(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: 'UTC',
    }).format(new Date(post.dateISO))
  } catch {
    return post.date
  }
}

export function getAllPosts() {
  return blogPosts
}

export function getPostBySlug(slug) {
  return blogPosts.find((p) => p.slug === slug) ?? null
}

export function getOtherPosts(slug, limit = 3) {
  return blogPosts.filter((p) => p.slug !== slug).slice(0, limit)
}
