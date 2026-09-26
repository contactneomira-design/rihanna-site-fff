import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

// Public: serves a photo uploaded from the admin panel. Ids are random and a
// photo never changes, so browsers and the CDN can keep it "forever".
export async function GET(_request, { params }) {
  try {
    const row = await prisma.carImage.findUnique({ where: { id: params.id } })
    if (!row) return new Response('Not found', { status: 404 })

    return new Response(new Uint8Array(row.data), {
      headers: {
        'Content-Type': row.mime,
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Netlify-CDN-Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  } catch (err) {
    console.error('GET /api/img/[id]', err)
    return new Response('Error', { status: 500 })
  }
}
