import crypto from 'crypto'
import { cookies } from 'next/headers'

// Simple password protection for /admin.
// ADMIN_PASSWORD (Netlify env var) is the only secret. The session lives in a
// signed, httpOnly cookie valid for 7 days.

export const ADMIN_COOKIE = 'rihana_admin'
export const ADMIN_MAX_AGE = 60 * 60 * 24 * 7

const secret = () => process.env.ADMIN_SECRET || process.env.ADMIN_PASSWORD || ''
const sign = (value) => crypto.createHmac('sha256', secret()).update(value).digest('hex')
const sha = (v) => crypto.createHash('sha256').update(String(v)).digest()

export function passwordOk(input) {
  const pw = process.env.ADMIN_PASSWORD
  if (!pw || typeof input !== 'string') return false
  return crypto.timingSafeEqual(sha(input), sha(pw))
}

export function makeToken() {
  const exp = String(Date.now() + ADMIN_MAX_AGE * 1000)
  return `${exp}.${sign(exp)}`
}

function verifyToken(token) {
  if (!token || !secret()) return false
  const [exp, sig] = String(token).split('.')
  if (!exp || !sig || Number(exp) < Date.now()) return false
  const expected = sign(exp)
  if (sig.length !== expected.length) return false
  return crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))
}

export function isAdmin() {
  return verifyToken(cookies().get(ADMIN_COOKIE)?.value)
}
