/**
 * Seed script — same logic as src/lib/migrate.ts but batched for speed.
 * Run: npx ts-node src/lib/seed.ts
 */

import { createClient } from '@supabase/supabase-js'
import characters from '@/data/jojo-characters.json'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

async function seed() {
  const rows = characters.map((char) => ({
    name: char.name,
    part: char.part,
    stand: char.stand,
    theme_song: char.themeSong,
    youtube_url: char.youtubeUrl,
    description: char.description,
  }))

  const { data, error } = await supabase.from('characters').insert(rows)

  if (error) console.error('Seed error:', error)
  else console.log('Seeded:', data)
}

seed()
