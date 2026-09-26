import * as React from 'react'
import { prisma } from '@/lib/prisma'
import { cars as staticCars } from '@/lib/data'

const staticBlurbs = Object.fromEntries(staticCars.map((c) => [c.slug, c.blurb]))

// ---------------------------------------------------------------------------
// Fleet source of truth = the database (edited from /admin).
// If the database is not configured / unreachable / has never been filled,
// the site falls back to the static list in lib/data.js so it never breaks.
// ---------------------------------------------------------------------------

export const CATEGORIES = ['family', 'belbala', 'atlas']
export const TRANSMISSIONS = ['Manual', 'Automatic']
export const FUELS = ['Petrol', 'Diesel', 'Hybrid', 'Electric']

// Database row -> the plain object shape the components already expect.
export function serializeCar(r) {
  const gallery = (r.images || []).filter(Boolean)
  const image = r.image || gallery[0] || ''
  return {
    id: r.id,
    slug: r.slug,
    name: r.name,
    category: r.category,
    seats: r.seats,
    transmission: r.transmission,
    fuel: r.fuel,
    tags: r.tags || [],
    image,
    images: gallery.length > 0 ? gallery : image ? [image] : [],
    blurb: r.blurb || '',
    // The built-in FR/EN/AR translation only applies while the description is
    // still the original one; once the owner rewrites it, his text is shown.
    blurbKey: staticBlurbs[r.slug] === r.blurb ? r.slug : '',
    features: r.features || [],
    available: r.available,
    sortOrder: r.sortOrder,
  }
}

// Same request (page + metadata) = one database query.
const memo = React.cache ?? ((fn) => fn)

// Cars visible on the public website.
export const getCars = memo(async function getCars() {
  if (!process.env.DATABASE_URL) return staticCars
  try {
    const rows = await prisma.car.findMany({
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
    })
    // Table empty (seed not run yet) -> keep the site populated.
    if (rows.length === 0) return staticCars
    return rows.filter((r) => r.available).map(serializeCar)
  } catch (err) {
    console.error('getCars: database unavailable, using static fleet', err)
    return staticCars
  }
})

export async function getCarBySlug(slug) {
  const list = await getCars()
  return list.find((c) => c.slug === slug) ?? null
}

// ---------------------------------------------------------------------------
// Admin helpers (server only)
// ---------------------------------------------------------------------------

export function slugify(str) {
  return String(str)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 60)
}

const cleanUrl = (u) => {
  const s = String(u ?? '').trim()
  return s.length <= 400 && (s.startsWith('/') || s.startsWith('https://')) ? s : ''
}

const cleanList = (arr, max, len) =>
  (Array.isArray(arr) ? arr : [])
    .map((x) => String(x ?? '').trim().slice(0, len))
    .filter(Boolean)
    .slice(0, max)

// Validates the admin form. Returns { data } or { error }.
export function parseCarInput(body) {
  const name = String(body?.name ?? '').trim().slice(0, 80)
  if (!name) return { error: 'name' }

  const category = CATEGORIES.includes(body?.category) ? body.category : null
  if (!category) return { error: 'category' }

  const seats = Math.min(20, Math.max(1, parseInt(body?.seats, 10) || 5))
  const transmission = TRANSMISSIONS.includes(body?.transmission) ? body.transmission : 'Manual'
  const fuel = FUELS.includes(body?.fuel) ? body.fuel : 'Petrol'

  const images = (Array.isArray(body?.images) ? body.images : []).map(cleanUrl).filter(Boolean).slice(0, 12)
  const image = cleanUrl(body?.image) || images[0] || ''
  if (!image) return { error: 'image' }

  return {
    data: {
      name,
      category,
      seats,
      transmission,
      fuel,
      blurb: String(body?.blurb ?? '').trim().slice(0, 200),
      features: cleanList(body?.features, 12, 40),
      image,
      images: images.length > 0 ? images : [image],
      available: body?.available !== false,
      sortOrder: parseInt(body?.sortOrder, 10) || 0,
    },
  }
}

// Photos uploaded through the admin live in the database: remove the ones a
// car no longer uses.
export async function deleteUnusedUploads(urls) {
  const ids = [...new Set(urls)]
    .filter((u) => typeof u === 'string' && u.startsWith('/api/img/'))
    .map((u) => u.slice('/api/img/'.length))
  if (ids.length === 0) return
  try {
    await prisma.carImage.deleteMany({ where: { id: { in: ids } } })
  } catch (err) {
    console.error('deleteUnusedUploads failed', err)
  }
}
