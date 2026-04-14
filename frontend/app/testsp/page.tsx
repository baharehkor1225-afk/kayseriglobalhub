'use client'

import { useEffect, useState } from 'react'

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000'

export default function TestPage() {
  const [status, setStatus] = useState('Checking backend...')
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch(`${backendUrl}/api/health`)
      .then((res) => {
        if (!res.ok) throw new Error('Backend health check failed')
        return res.json()
      })
      .then((data) => {
        setStatus('Backend is available')
        setResult(data)
      })
      .catch((err) => {
        setStatus('Backend connection failed')
        setError(err.message)
      })
  }, [])

  return (
    <div>
      <h1>Backend Health Check</h1>
      <p>{status}</p>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
      <p>برای کار کامل بک‌اند، سرور backend را با <code>npm run backend</code> اجرا کن.</p>
    </div>
  )
}
