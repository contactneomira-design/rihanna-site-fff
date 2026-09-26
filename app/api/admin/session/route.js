import { NextResponse } from 'next/server'
import { ADMIN_COOKIE, ADMIN_MAX_AGE, isAdmin, makeToken, passwordOk } from '@/lib/adminAuth'

export const dynamic = 'force-dynamic'

// Who am I? -> { ok: true } when the admin cookie is valid.
export async function GET() {
  return NextResponse.json({ ok: isAdmin(), configured: Boolean(process.env.ADMIN_PASSWORD) })
}

// Login
export async function POST(request) {
  let body = {}
  try {
    body = await request.json()
  } catch {}

  if (!passwordOk(body?.password)) {
    await new Promise((r) => setTimeout(r, 700)) // slow down guessing
    return NextResponse.json({ ok: false }, { status: 401 })
  }

  const res = NextResponse.json({ ok: true })
  res.cookies.set(ADMIN_COOKIE, makeToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: ADMIN_MAX_AGE,
  })
  return res
}

// Logout
export async function DELETE() {
  const res = NextResponse.json({ ok: true })
  res.cookies.set(ADMIN_COOKIE, '', { httpOnly: true, path: '/', maxAge: 0 })
  return res
}
