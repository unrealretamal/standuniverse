/**
 * Seed script: inserts characters from src/data/jojo-characters.json into Supabase.
 *
 * Usage:
 *   1. Copy .env.local.example to .env.local and fill in your Supabase keys
 *   2. Run the SQL in supabase/001_create_characters.sql in the Supabase SQL Editor
 *   3. npx ts-node src/lib/seed.ts
 *      — or —
 *      npm run migrate
 */

import { createClient } from '@supabase/supabase-js'
import characters from '@/data/jojo-characters.json'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

async function seed() {
  const { data, error } = await supabase
    .from('characters')
    .insert(characters)

  if (error) console.error('Seed error:', error)
  else console.log('Seeded:', data)
}

seed()
