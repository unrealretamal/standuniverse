import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '@/lib/supabase'
import type { Character } from '@/lib/types'

const ANILIST_API = 'https://graphql.anilist.co'

// In-memory cache — refreshes every hour across Vercel function instances
let imageCache: Map<string, string> | null = null
let cacheTime = 0

// Each alias targets a specific JoJo season by its unique subtitle
const ANILIST_QUERY = `query {
  s1: Media(search: "JoJo Bizarre Adventure", type: ANIME, format: TV) {
    characters(sort: RELEVANCE, perPage: 50) { nodes { name { full } image { large } } }
  }
  s3: Media(search: "Stardust Crusaders", type: ANIME) {
    characters(sort: RELEVANCE, perPage: 50) { nodes { name { full } image { large } } }
  }
  s4: Media(search: "Diamond is Unbreakable", type: ANIME) {
    characters(sort: RELEVANCE, perPage: 50) { nodes { name { full } image { large } } }
  }
  s5: Media(search: "Golden Wind", type: ANIME) {
    characters(sort: RELEVANCE, perPage: 50) { nodes { name { full } image { large } } }
  }
  s6: Media(search: "Stone Ocean JoJo", type: ANIME) {
    characters(sort: RELEVANCE, perPage: 50) { nodes { name { full } image { large } } }
  }
}`

async function getAniListImages(): Promise<Map<string, string>> {
  if (imageCache && Date.now() - cacheTime < 3_600_000) return imageCache

  const byName = new Map<string, string>()
  try {
    const res = await fetch(ANILIST_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: ANILIST_QUERY }),
    })
    const json = await res.json()
    for (const season of Object.values(json.data ?? {})) {
      const nodes = (season as { characters?: { nodes?: unknown[] } }).characters?.nodes ?? []
      for (const node of nodes as Array<{ name?: { full?: string }; image?: { large?: string } }>) {
        if (node.name?.full && node.image?.large) {
          byName.set(node.name.full.toLowerCase(), node.image.large)
        }
      }
    }
  } catch {
    // AniList unreachable — images fall back to null
  }

  imageCache = byName
  cacheTime = Date.now()
  return byName
}

function matchImage(name: string, byName: Map<string, string>): string | null {
  const key = name.toLowerCase().replace(/\s*\(jjl\)/i, '')
  if (byName.has(key)) return byName.get(key)!
  // Try reversed order (Last First → First Last)
  const parts = key.split(' ')
  if (parts.length === 2) {
    const rev = `${parts[1]} ${parts[0]}`
    if (byName.has(rev)) return byName.get(rev)!
  }
  return null
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { part } = req.query

  let query = supabase.from('characters').select('*')
  if (part && part !== 'all') {
    query = query.eq('part', parseInt(part as string))
  }

  // Fetch DB rows and AniList images in parallel
  const [{ data, error }, aniListImages] = await Promise.all([query, getAniListImages()])

  if (error) return res.status(500).json({ error: error.message })

  const rows = (data ?? []) as Character[]
  const enriched = rows.map((c) => ({
    ...c,
    image_url: c.image_url ?? matchImage(c.name, aniListImages),
  }))

  res.status(200).json(enriched)
}
