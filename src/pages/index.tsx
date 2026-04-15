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
        <title>JoJo&apos;s Bizarre Adventure — Characters</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main style={{ maxWidth: '680px', margin: '0 auto', padding: '64px 24px 80px' }}>
        <h1
          style={{
            fontSize: '32px',
            fontWeight: 500,
            lineHeight: 1.2,
            color: 'var(--text-primary)',
            marginBottom: '8px',
          }}
        >
          JoJo&apos;s Bizarre Adventure
        </h1>

        <p
          style={{
            fontSize: '14px',
            color: 'var(--text-secondary)',
            marginBottom: '40px',
          }}
        >
          {loading
            ? 'Loading…'
            : `${filtered.length} character${filtered.length !== 1 ? 's' : ''}${selectedPart !== 'all' ? ` in Part ${selectedPart}` : ''}`}
        </p>

        <Filter selectedPart={selectedPart} onPartChange={setSelectedPart} />

        {error && (
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Error: {error}</p>
        )}

        {!loading && !error && filtered.length === 0 && (
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>No characters found.</p>
        )}

        {!loading && !error && filtered.length > 0 && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '1px',
              background: 'var(--border)',
              border: '1px solid var(--border)',
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
