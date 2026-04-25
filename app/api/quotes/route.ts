import { NextRequest, NextResponse } from 'next/server'
import { redis } from '@/lib/redis'

export async function GET(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get('id')

    if (id) {
      const quote = await redis.get(`quote:${id}`)
      if (!quote) return NextResponse.json(null, { status: 404 })
      return NextResponse.json(quote)
    }

    const ids = await redis.zrange('quotes:list', 0, -1, { rev: true })
    if (!ids.length) return NextResponse.json([])

    const quotes = await Promise.all(ids.map(id => redis.get(`quote:${id}`)))
    return NextResponse.json(quotes.filter(Boolean))
  } catch (e) {
    console.error('GET /api/quotes error:', e)
    return NextResponse.json([], { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { id, status, adminNote, lines, discount } = await request.json()
    if (!id) return NextResponse.json({ error: 'Falta id' }, { status: 400 })

    const existing = await redis.get(`quote:${id}`) as Record<string, unknown> | null
    if (!existing) return NextResponse.json({ error: 'Cotización no encontrada' }, { status: 404 })

    const updated = {
      ...existing,
      ...(status    !== undefined && { status }),
      ...(adminNote !== undefined && { adminNote }),
      ...(lines     !== undefined && { lines }),
      ...(discount  !== undefined && { discount }),
    }
    await redis.set(`quote:${id}`, updated)
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('PATCH /api/quotes error:', e)
    return NextResponse.json({ error: 'Error al actualizar' }, { status: 500 })
  }
}
