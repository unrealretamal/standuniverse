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

  const countLabel = loading
    ? '...'
    : `${filtered.length} character${filtered.length !== 1 ? 's' : ''}${selectedPart !== 'all' ? ` — Part ${selectedPart.padStart(2, '0')}` : ''}`

  return (
    <>
      <Head>
        <title>JoJo&apos;s Bizarre Adventure — Characters</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main style={{ maxWidth: '880px', margin: '0 auto', padding: '64px 24px 96px' }}>
        {/* Header */}
        <p className="jj-eyebrow">// Character Select</p>

        <h1 className="jj-title">
          JoJo&apos;s Bizarre<br />Adventure
        </h1>

        {/* Decorative divider with count */}
        <div className="jj-divider">
          <span className="jj-divider__accent" />
          <span className="jj-divider__label">{countLabel}</span>
          <span className="jj-divider__line" />
        </div>

        <Filter selectedPart={selectedPart} onPartChange={setSelectedPart} />

        {error && (
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Error: {error}</p>
        )}

        {!loading && !error && filtered.length === 0 && (
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>No characters found.</p>
        )}

        {!loading && !error && filtered.length > 0 && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: '16px',
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
