import { useState, useEffect } from 'react'
import Head from 'next/head'
import { Character } from '@/lib/types'
import CharacterCard from '@/components/CharacterCard'
import Filter from '@/components/Filter'

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
      .then((data: Character[]) => {
        setCharacters(data)
        setLoading(false)
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
