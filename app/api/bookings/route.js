import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

const str = (v, max) => String(v ?? '').trim().slice(0, max)
const toDate = (v) => {
  const d = new Date(v)
  return Number.isNaN(d.getTime()) ? null : d
}

// Saves a booking request sent from the booking form (the customer is also
// sent to WhatsApp by the form itself).
export async function POST(request) {
  let body
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'invalid' }, { status: 400 })
  }

  const carName = str(body?.carName, 120)
  const fullName = str(body?.fullName, 120)
  const phone = str(body?.phone, 40)
  const startDate = toDate(body?.startDate)
  const endDate = toDate(body?.endDate)
  if (!carName || !fullName || phone.length < 5 || !startDate || !endDate) {
    return NextResponse.json({ error: 'invalid' }, { status: 400 })
  }

  try {
    await prisma.booking.create({ data: { carName, fullName, phone, startDate, endDate } })
    return NextResponse.json({ ok: true }, { status: 201 })
  } catch (err) {
    console.error('POST /api/bookings', err)
    return NextResponse.json({ error: 'database' }, { status: 500 })
  }
}
