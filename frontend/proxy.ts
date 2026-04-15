import { NextRequest, NextResponse } from 'next/server'

async function verifySession(token: string): Promise<boolean> {
  const secret = process.env.ADMIN_SECRET
  if (!secret || !token) return false

  const dotIdx = token.lastIndexOf('.')
  if (dotIdx === -1) return false

  const timestamp = token.slice(0, dotIdx)
  const receivedHmac = token.slice(dotIdx + 1)

  const age = Date.now() - parseInt(timestamp, 10)
  if (isNaN(age) || age > 24 * 60 * 60 * 1000) return false

  const encoder = new TextEncoder()
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )

  const sigBuf = await crypto.subtle.sign('HMAC', keyMaterial, encoder.encode(timestamp))
  const expectedHmac = Array.from(new Uint8Array(sigBuf))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')

  if (receivedHmac.length !== expectedHmac.length) return false
  let diff = 0
  for (let i = 0; i < receivedHmac.length; i++) {
    diff |= receivedHmac.charCodeAt(i) ^ expectedHmac.charCodeAt(i)
  }
  return diff === 0
}

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl

  const isAdminPage =
    pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')
  const isAdminApi =
    pathname.startsWith('/api/admin') && !pathname.startsWith('/api/admin/auth')

  if (isAdminPage || isAdminApi) {
    const session = req.cookies.get('admin_session')?.value
    const valid = session ? await verifySession(session) : false

    if (!valid) {
      if (isAdminPage) {
        return NextResponse.redirect(new URL('/admin/login', req.url))
      }
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}
