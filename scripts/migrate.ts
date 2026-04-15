/**
 * Migration script — uses SERVICE_ROLE_KEY to bypass RLS, inserts in batches.
 *
 * Usage:
 *   1. Add SUPABASE_SERVICE_ROLE_KEY to .env.local
 *   2. npm run migrate
 */

import { createClient } from '@supabase/supabase-js'
import { resolve } from 'path'
import { config } from 'dotenv'

config({ path: resolve(process.cwd(), '.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !serviceRoleKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false },
})

async function migrate() {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const characters = require('../src/data/jojo-characters.json')

  const rows = characters.map((char: {
    name: string; part: number; stand: string | null
    themeSong: string; youtubeUrl: string; description: string
  }) => ({
    name: char.name,
    part: char.part,
    stand: char.stand,
    theme_song: char.themeSong,
    youtube_url: char.youtubeUrl,
    description: char.description,
  }))

  console.log(`Inserting ${rows.length} characters...`)

  const BATCH = 20
  for (let i = 0; i < rows.length; i += BATCH) {
    const batch = rows.slice(i, i + BATCH)
    const { error } = await supabase.from('characters').insert(batch)
    if (error) {
      console.error(`Error at batch ${i}:`, error.message)
      process.exit(1)
    }
    console.log(`  ✓ ${i + batch.length} / ${rows.length}`)
  }

  console.log('Migration complete.')
}

migrate()
