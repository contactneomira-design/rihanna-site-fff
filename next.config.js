/** @type {import('next').NextConfig} */
const ARTICLE = '/blog/pourquoi-choisir-rihana-car'

const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      // "Pourquoi nous" is now the single article above — /blog has no index
      // any more, and the old "Why us" page and the three removed articles
      // send visitors there instead of a 404. (Temporary redirects, so they
      // are easy to change if a blog index comes back.)
      { source: '/blog', destination: ARTICLE, permanent: false },
      { source: '/why-rihana', destination: ARTICLE, permanent: false },
      { source: '/blog/visiter-marrakech-en-voiture', destination: ARTICLE, permanent: false },
      { source: '/blog/traversee-atlas-en-voiture', destination: ARTICLE, permanent: false },
      { source: '/blog/marrakech-nuit-et-loisirs-en-voiture', destination: ARTICLE, permanent: false },
      // Legacy spelling of the old "Why us" route.
      { source: '/why-rahana', destination: ARTICLE, permanent: true },
    ]
  },
}
module.exports = nextConfig
