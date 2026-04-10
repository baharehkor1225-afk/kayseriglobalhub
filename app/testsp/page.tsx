import { supabase } from '../../lib/supabase'

export default async function TestPage() {
  if (!supabase) {
    return (
      <div>
        <h1>Supabase Test Page</h1>
        <p>Supabase is not configured. Please add your environment variables to .env.local</p>
      </div>
    )
  }const { data, error } = await supabase
  .from('productds')
  .select('name')

return (
  <div>
    <h1>Supabase Test Page</h1>

    <p>🔍 Status:</p>

    {error && (
      <p style={{ color: 'red' }}>
        ❌ ERROR: {error.message}
      </p>
    )}

    {!error && data && (
      <p style={{ color: 'green' }}>
        ✅ Connected to database
      </p>
    )}

    <pre>{JSON.stringify({ data, error }, null, 2)}</pre>
  </div>
)
}