import { createClient } from '@supabase/supabase-js'
import characters from '@/data/jojo-characters.json'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

async function migrate() {
  for (const char of characters) {
    await supabase
      .from('characters')
      .insert({
        name: char.name,
        part: char.part,
        stand: char.stand,
        theme_song: char.themeSong,
        youtube_url: char.youtubeUrl,
        description: char.description,
      })
  }
  console.log('Migration complete')
}

migrate()
