import { supabase } from '../../lib/supabase'

export default async function TestPage() {
  if (!supabase) {
    return (
      <div>
        <h1>Supabase Test Page</h1>
        <p>Supabase is not configured. Please add your environment variables to .env.local</p>
      </div>
    )
  }

  const { data, error } = await supabase
    .from('products')
    .select('name')

  console.log("DATA:", data)
  console.log("ERROR:", error)

  return (
    <div>
      <h1>Supabase Test Page</h1>

      {error && <p>Error: {error.message}</p>}

      {data && data.map((item, index) => (
        <p key={index}>{item.name}</p>
      ))}
    </div>
  )
}