/**
 * Migration script: inserts characters from jojo-characters.json into Supabase.
 *
 * Usage:
 *   1. Copy .env.local.example to .env.local and fill in your keys
 *      (SUPABASE_SERVICE_ROLE_KEY is required to bypass RLS during seed)
 *   2. Place jojo-characters.json in the project root
 *   3. Run:  npx tsx scripts/migrate.ts
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { resolve } from 'path';

// Load env vars (Next.js doesn't auto-load them in scripts)
import { config } from 'dotenv';
config({ path: resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error(
    'Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local'
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false },
});

interface RawCharacter {
  name: string;
  part: number;
  stand?: string;
  theme_song?: string;
  youtube_url?: string;
  description?: string;
}

async function migrate() {
  const jsonPath = resolve(process.cwd(), 'jojo-characters.json');
  let characters: RawCharacter[];

  try {
    const raw = readFileSync(jsonPath, 'utf-8');
    characters = JSON.parse(raw);
  } catch (err) {
    console.error(`Could not read jojo-characters.json at ${jsonPath}:`, err);
    process.exit(1);
  }

  console.log(`Inserting ${characters.length} characters...`);

  const rows = characters.map((c) => ({
    name: c.name,
    part: c.part,
    stand: c.stand ?? null,
    theme_song: c.theme_song ?? null,
    youtube_url: c.youtube_url ?? null,
    description: c.description ?? null,
  }));

  // Upsert in batches of 20
  const BATCH = 20;
  for (let i = 0; i < rows.length; i += BATCH) {
    const batch = rows.slice(i, i + BATCH);
    const { error } = await supabase.from('characters').insert(batch);
    if (error) {
      console.error(`Error inserting batch starting at index ${i}:`, error.message);
      process.exit(1);
    }
    console.log(`  ✓ Inserted ${i + batch.length} / ${rows.length}`);
  }

  console.log('Migration complete.');
}

migrate();
