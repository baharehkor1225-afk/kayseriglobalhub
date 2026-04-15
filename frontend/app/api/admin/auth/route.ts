import { NextRequest, NextResponse } from 'next/server'
import { createHmac, timingSafeEqual } from 'crypto'

function createSession(): string {
  const secret = process.env.ADMIN_SECRET!
  const timestamp = Date.now().toString()
  const hmac = createHmac('sha256', secret).update(timestamp).digest('hex')
  return `${timestamp}.${hmac}`
}

export async function POST(req: NextRequest) {
  const { username, password } = await req.json()
  const adminUsername = process.env.ADMIN_USERNAME
  const adminPassword = process.env.ADMIN_PASSWORD
  const adminSecret = process.env.ADMIN_SECRET

  if (!adminUsername || !adminPassword || !adminSecret) {
    return NextResponse.json({ error: 'Admin not configured' }, { status: 503 })
  }

  const usernameA = Buffer.from(username ?? '', 'utf8')
  const usernameB = Buffer.from(adminUsername, 'utf8')
  const passwordA = Buffer.from(password ?? '', 'utf8')
  const passwordB = Buffer.from(adminPassword, 'utf8')

  const usernameMatch =
    usernameA.length === usernameB.length && timingSafeEqual(usernameA, usernameB)
  const passwordMatch =
    passwordA.length === passwordB.length && timingSafeEqual(passwordA, passwordB)

  if (!usernameMatch || !passwordMatch) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  const res = NextResponse.json({ success: true })
  res.cookies.set('admin_session', createSession(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 86400,
    path: '/',
  })
  return res
}

export async function DELETE() {
  const res = NextResponse.json({ success: true })
  res.cookies.delete('admin_session')
  return res
}
