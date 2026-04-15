/**
 * Migration script: inserts characters from src/data/jojo-characters.json into Supabase.
 *
 * Uses SUPABASE_SERVICE_ROLE_KEY to bypass RLS during seed.
 *
 * Usage:
 *   1. Copy .env.local.example to .env.local and fill in your keys
 *   2. Run SQL in supabase/001_create_characters.sql in the Supabase SQL Editor
 *   3. npm run migrate
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

  console.log(`Inserting ${characters.length} characters...`)

  const BATCH = 20
  for (let i = 0; i < characters.length; i += BATCH) {
    const batch = characters.slice(i, i + BATCH)
    const { error } = await supabase.from('characters').insert(batch)
    if (error) {
      console.error(`Error at batch ${i}:`, error.message)
      process.exit(1)
    }
    console.log(`  ✓ ${i + batch.length} / ${characters.length}`)
  }

  console.log('Migration complete.')
}

migrate()
