import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { isAdmin } from '@/lib/adminAuth'
import { deleteUnusedUploads, parseCarInput, serializeCar } from '@/lib/cars'

export const dynamic = 'force-dynamic'

const unauthorized = () => NextResponse.json({ error: 'unauthorized' }, { status: 401 })
const refresh = () => {
  try {
    revalidatePath('/', 'layout')
  } catch {}
}

// Edit a car (the slug never changes, so links and Google results stay valid).
export async function PUT(request, { params }) {
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
    const old = await prisma.car.findUnique({ where: { id: params.id } })
    if (!old) return NextResponse.json({ error: 'not_found' }, { status: 404 })

    const row = await prisma.car.update({ where: { id: params.id }, data: parsed.data })

    const kept = new Set([row.image, ...row.images])
    await deleteUnusedUploads([old.image, ...old.images].filter((u) => !kept.has(u)))

    refresh()
    return NextResponse.json({ car: serializeCar(row) })
  } catch (err) {
    console.error('PUT /api/admin/cars/[id]', err)
    return NextResponse.json({ error: 'database' }, { status: 500 })
  }
}

// Delete a car.
export async function DELETE(_request, { params }) {
  if (!isAdmin()) return unauthorized()
  try {
    const old = await prisma.car.findUnique({ where: { id: params.id } })
    if (!old) return NextResponse.json({ error: 'not_found' }, { status: 404 })

    await prisma.car.delete({ where: { id: params.id } })
    await deleteUnusedUploads([old.image, ...old.images])

    refresh()
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('DELETE /api/admin/cars/[id]', err)
    return NextResponse.json({ error: 'database' }, { status: 500 })
  }
}
