import { supabase } from '../../lib/supabase'

export default async function TestPage() {
  const { data, error } = await supabase.from('test').select('*')

  console.log("DATA:", data)
  console.log("ERROR:", error)

  return (
    <div>
      <h1>Supabase Test Page</h1>
      <p>Check terminal / console</p>
    </div>
  )
}