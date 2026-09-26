import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { isAdmin } from '@/lib/adminAuth'
import { parseCarInput, serializeCar, slugify } from '@/lib/cars'

export const dynamic = 'force-dynamic'

const unauthorized = () => NextResponse.json({ error: 'unauthorized' }, { status: 401 })

// All cars (including hidden ones) for the admin list.
export async function GET() {
  if (!isAdmin()) return unauthorized()
  if (!process.env.DATABASE_URL) return NextResponse.json({ error: 'no_database' }, { status: 503 })
  try {
    const rows = await prisma.car.findMany({ orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }] })
    return NextResponse.json({ cars: rows.map(serializeCar) })
  } catch (err) {
    console.error('GET /api/admin/cars', err)
    return NextResponse.json({ error: 'database' }, { status: 500 })
  }
}

// Add a car.
export async function POST(request) {
  if (!isAdmin()) return unauthorized()

  let body
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'invalid' }, { status: 400 })
  }
  const parsed = parseCarInput(body)
  if (parsed.error) return NextResponse.json({ error: parsed.error }, { status: 400 })

  try {
    // Unique slug (used in the car's URL).
    const base = slugify(parsed.data.name) || 'voiture'
    let slug = base
    for (let i = 2; await prisma.car.findUnique({ where: { slug } }); i++) slug = `${base}-${i}`

    // New cars go to the end of the list unless an order is given.
    let sortOrder = parsed.data.sortOrder
    if (!sortOrder) {
      const agg = await prisma.car.aggregate({ _max: { sortOrder: true } })
      sortOrder = (agg._max.sortOrder ?? 0) + 10
    }

    const row = await prisma.car.create({ data: { ...parsed.data, slug, sortOrder } })
    try {
      revalidatePath('/', 'layout')
    } catch {}
    return NextResponse.json({ car: serializeCar(row) }, { status: 201 })
  } catch (err) {
    console.error('POST /api/admin/cars', err)
    return NextResponse.json({ error: 'database' }, { status: 500 })
  }
}
