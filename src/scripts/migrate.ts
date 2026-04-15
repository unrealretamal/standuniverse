import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'
import { resolve } from 'path'
import characters from '../data/jojo-characters.json'

config({ path: resolve(process.cwd(), '.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function migrate() {
  console.log(`Migrating ${characters.length} characters to Supabase...`)

  for (const char of characters) {
    const { error } = await supabase.from('characters').insert({
      name: char.name,
      part: char.part,
      stand: char.stand,
      theme_song: char.themeSong,
      youtube_url: char.youtubeUrl,
      description: char.description,
    })

    if (error) {
      console.error(`Failed to insert "${char.name}":`, error.message)
      process.exit(1)
    }

    console.log(`  ✓ ${char.name}`)
  }

  console.log(`\nMigration complete — ${characters.length} characters inserted.`)
}

migrate()
