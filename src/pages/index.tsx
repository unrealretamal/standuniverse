import { useState, useEffect } from 'react'
import Head from 'next/head'
import { Character } from '@/lib/types'
import CharacterCard from '@/components/CharacterCard'
import Filter from '@/components/Filter'

const ANILIST_API = 'https://graphql.anilist.co'

// One request, 5 aliased queries — covers Parts 1-6
const ANILIST_QUERY = `
  query {
    s1: Media(search: "JoJo Bizarre Adventure 2012", type: ANIME) {
      characters(sort: RELEVANCE, perPage: 50) {
        nodes { name { full } image { large } }
      }
    }
    s3: Media(search: "JoJo Stardust Crusaders", type: ANIME) {
      characters(sort: RELEVANCE, perPage: 50) {
        nodes { name { full } image { large } }
      }
    }
    s4: Media(search: "Diamond is Unbreakable", type: ANIME) {
      characters(sort: RELEVANCE, perPage: 50) {
        nodes { name { full } image { large } }
      }
    }
    s5: Media(search: "Golden Wind JoJo", type: ANIME) {
      characters(sort: RELEVANCE, perPage: 50) {
        nodes { name { full } image { large } }
      }
    }
    s6: Media(search: "Stone Ocean JoJo", type: ANIME) {
      characters(sort: RELEVANCE, perPage: 50) {
        nodes { name { full } image { large } }
      }
    }
  }
`

type AniListSeason = {
  characters?: { nodes?: Array<{ name?: { full?: string }; image?: { large?: string } }> }
}

async function fetchAniListImages(): Promise<Map<string, string>> {
  const byName = new Map<string, string>()
  try {
    const res = await fetch(ANILIST_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ query: ANILIST_QUERY }),
    })
    const json = await res.json()
    for (const season of Object.values(json.data ?? {}) as AniListSeason[]) {
      for (const node of season.characters?.nodes ?? []) {
        if (node.name?.full && node.image?.large) {
          byName.set(node.name.full.toLowerCase(), node.image.large)
        }
      }
    }
  } catch { /* ignore */ }
  return byName
}

function matchImage(name: string, byName: Map<string, string>): string | null {
  const key = name.toLowerCase()
  if (byName.has(key)) return byName.get(key)!
  // Try reversed "Last First" → "First Last"
  const parts = key.split(' ')
  if (parts.length === 2) {
    const reversed = `${parts[1]} ${parts[0]}`
    if (byName.has(reversed)) return byName.get(reversed)!
  }
  return null
}

export default function Home() {
  const [characters, setCharacters] = useState<Character[]>([])
  const [selectedPart, setSelectedPart] = useState<string>('all')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/characters')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch characters')
        return res.json()
      })
      .then(async (data: Character[]) => {
        setCharacters(data)
        setLoading(false)

        // Fetch images from AniList in the background
        const byName = await fetchAniListImages()
        if (byName.size > 0) {
          setCharacters(
            data.map((c) => ({
              ...c,
              image_url: c.image_url ?? matchImage(c.name, byName),
            }))
          )
        }
      })
      .catch((err: Error) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  const filtered =
    selectedPart === 'all'
      ? characters
      : characters.filter((c) => c.part === parseInt(selectedPart))

  return (
    <>
      <Head>
        <title>JoJo App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '24px 16px' }}>
        <h1 style={{ marginBottom: '4px' }}>JoJo&apos;s Bizarre Adventure — Characters</h1>
        <p style={{ color: '#555', marginBottom: '20px', marginTop: 0 }}>
          {loading
            ? 'Loading…'
            : `${filtered.length} character${filtered.length !== 1 ? 's' : ''}${selectedPart !== 'all' ? ` in Part ${selectedPart}` : ''}`}
        </p>

        <Filter selectedPart={selectedPart} onPartChange={setSelectedPart} />

        {error && <p style={{ color: 'red' }}>Error: {error}</p>}

        {!loading && !error && filtered.length === 0 && <p>No characters found.</p>}

        {!loading && !error && filtered.length > 0 && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '16px',
              marginTop: '16px',
            }}
          >
            {filtered.map((character) => (
              <CharacterCard key={character.id} character={character} />
            ))}
          </div>
        )}
      </main>
    </>
  )
}
