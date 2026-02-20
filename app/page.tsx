import { createClient } from '@/lib/db/supabase/server'

export default async function Home() {
  const supabase = await createClient()

  // Simple test — fetch Supabase server time
  const { data, error } = await supabase.from('_test').select('*').limit(1)

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Nexus</h1>
      <p className="mt-2 text-sm text-gray-500">
        Supabase connected: {error ? '❌ ' + error.message : '✅'}
      </p>
    </main>
  )
}