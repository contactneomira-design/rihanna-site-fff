import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

const str = (v, max) => String(v ?? '').trim().slice(0, max)

// Saves a message sent from the contact form.
export async function POST(request) {
  let body
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'invalid' }, { status: 400 })
  }

  const name = str(body?.name, 120)
  const phone = str(body?.phone, 40)
  const message = str(body?.message, 2000)
  if (!name || phone.length < 5 || !message) {
    return NextResponse.json({ error: 'invalid' }, { status: 400 })
  }

  try {
    await prisma.contact.create({ data: { name, phone, message } })
    return NextResponse.json({ ok: true }, { status: 201 })
  } catch (err) {
    console.error('POST /api/contact', err)
    return NextResponse.json({ error: 'database' }, { status: 500 })
  }
}
