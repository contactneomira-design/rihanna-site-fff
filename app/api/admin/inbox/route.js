import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { isAdmin } from '@/lib/adminAuth'

export const dynamic = 'force-dynamic'

const unauthorized = () => NextResponse.json({ error: 'unauthorized' }, { status: 401 })

// Latest booking requests and contact messages.
export async function GET() {
  if (!isAdmin()) return unauthorized()
  if (!process.env.DATABASE_URL) return NextResponse.json({ error: 'no_database' }, { status: 503 })
  try {
    const [bookings, contacts] = await Promise.all([
      prisma.booking.findMany({ orderBy: { createdAt: 'desc' }, take: 100 }),
      prisma.contact.findMany({ orderBy: { createdAt: 'desc' }, take: 100 }),
    ])
    return NextResponse.json({ bookings, contacts })
  } catch (err) {
    console.error('GET /api/admin/inbox', err)
    return NextResponse.json({ error: 'database' }, { status: 500 })
  }
}

// Mark a booking as handled / pending again.
export async function PATCH(request) {
  if (!isAdmin()) return unauthorized()
  try {
    const { id, status } = await request.json()
    if (!id || !['pending', 'done'].includes(status)) {
      return NextResponse.json({ error: 'invalid' }, { status: 400 })
    }
    await prisma.booking.update({ where: { id }, data: { status } })
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('PATCH /api/admin/inbox', err)
    return NextResponse.json({ error: 'database' }, { status: 500 })
  }
}
