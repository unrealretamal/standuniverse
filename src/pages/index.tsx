import { useState, useEffect } from 'react'
import Head from 'next/head'
import { Character } from '@/lib/types'
import CharacterCard from '@/components/CharacterCard'
import Filter from '@/components/Filter'

const WIKI_API = 'https://jojo.fandom.com/api.php'

// Some characters have different wiki page names
function wikiTitle(name: string, part: number): string {
  if (name === 'Dio Brando' && part === 3) return 'DIO'
  return name
}

async function fetchWikiImages(characters: Character[]): Promise<Record<number, string>> {
  const idByTitle: Record<string, number> = {}
  for (const c of characters) {
    idByTitle[wikiTitle(c.name, c.part)] = c.id
  }

  const titles = Object.keys(idByTitle)
  const result: Record<number, string> = {}

  // MediaWiki allows up to 50 titles per request
  for (let i = 0; i < titles.length; i += 50) {
    const batch = titles.slice(i, i + 50)
    const params = new URLSearchParams({
      action: 'query',
      prop: 'pageimages',
      pithumbsize: '300',
      format: 'json',
      origin: '*',
      titles: batch.join('|'),
    })
    try {
      const res = await fetch(`${WIKI_API}?${params}`)
      const data = await res.json()
      for (const page of Object.values(data.query?.pages ?? {}) as Record<string, unknown>[]) {
        const p = page as { title?: string; thumbnail?: { source?: string } }
        if (p.thumbnail?.source && p.title) {
          const id = idByTitle[p.title]
          if (id !== undefined) result[id] = p.thumbnail.source
        }
      }
    } catch {
      // ignore batch failure, images just won't show for this batch
    }
  }

  return result
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

        // Fetch actual image URLs from the wiki in the background
        const wikiImages = await fetchWikiImages(data)
        if (Object.keys(wikiImages).length > 0) {
          setCharacters(
            data.map((c) => ({
              ...c,
              image_url: c.image_url ?? wikiImages[c.id] ?? null,
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
          {loading ? 'Loading…' : `${filtered.length} character${filtered.length !== 1 ? 's' : ''}${selectedPart !== 'all' ? ` in Part ${selectedPart}` : ''}`}
        </p>

        <Filter selectedPart={selectedPart} onPartChange={setSelectedPart} />

        {error && <p style={{ color: 'red' }}>Error: {error}</p>}

        {!loading && !error && filtered.length === 0 && (
          <p>No characters found.</p>
        )}

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
