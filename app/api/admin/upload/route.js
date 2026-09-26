import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { isAdmin } from '@/lib/adminAuth'

export const dynamic = 'force-dynamic'

const ALLOWED = ['image/jpeg', 'image/png', 'image/webp']
const MAX_BYTES = 4 * 1024 * 1024 // the admin resizes photos before sending

// Stores a photo in the database and returns its public URL (/api/img/<id>).
export async function POST(request) {
  if (!isAdmin()) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  try {
    const form = await request.formData()
    const file = form.get('file')
    if (!file || typeof file === 'string') return NextResponse.json({ error: 'no_file' }, { status: 400 })
    if (!ALLOWED.includes(file.type)) return NextResponse.json({ error: 'type' }, { status: 400 })
    if (file.size > MAX_BYTES) return NextResponse.json({ error: 'size' }, { status: 413 })

    const buffer = Buffer.from(await file.arrayBuffer())
    const row = await prisma.carImage.create({ data: { mime: file.type, data: buffer } })
    return NextResponse.json({ url: `/api/img/${row.id}` })
  } catch (err) {
    console.error('POST /api/admin/upload', err)
    return NextResponse.json({ error: 'database' }, { status: 500 })
  }
}
