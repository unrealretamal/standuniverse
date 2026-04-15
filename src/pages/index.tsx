import { useState, useEffect } from 'react'
import Head from 'next/head'
import { Character } from '@/lib/types'
import Navbar from '@/components/Navbar'
import CharacterCard from '@/components/CharacterCard'
import Filter from '@/components/Filter'
import Spotify from '@/components/Spotify'

// Replace with a real Spotify track URL to enable the embed
// e.g. https://open.spotify.com/track/4uLU6hMCjMI75M1A2tKUQC
const SPOTIFY_TRACK_URL = ''

export default function Home() {
  const [characters, setCharacters] = useState<Character[]>([])
  const [selectedPart, setSelectedPart] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const url = selectedPart
      ? `/api/characters?part=${selectedPart}`
      : '/api/characters'

    setLoading(true)
    setError(null)

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch')
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
  }, [selectedPart])

  return (
    <>
      <Head>
        <title>JoJo Universe</title>
        <meta name="description" content="JoJo's Bizarre Adventure characters" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
        <Navbar />

        <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 16px' }}>
          <div style={{ marginBottom: '24px' }}>
            <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#111827', margin: 0 }}>
              Characters
            </h1>
            {!loading && (
              <p style={{ fontSize: '13px', color: '#9ca3af', marginTop: '4px' }}>
                {characters.length} character{characters.length !== 1 ? 's' : ''}
                {selectedPart ? ` in Part ${selectedPart}` : ''}
              </p>
            )}
          </div>

          {SPOTIFY_TRACK_URL && (
            <div style={{ marginBottom: '24px', maxWidth: '400px' }}>
              <Spotify trackUrl={SPOTIFY_TRACK_URL} />
            </div>
          )}

          <Filter selectedPart={selectedPart} onPartChange={setSelectedPart} />

          {loading && (
            <p style={{ color: '#9ca3af', fontSize: '14px' }}>Loading characters…</p>
          )}

          {error && (
            <p style={{ color: '#dc2626', fontSize: '14px' }}>Error: {error}</p>
          )}

          {!loading && !error && characters.length === 0 && (
            <p style={{ color: '#9ca3af', fontSize: '14px' }}>No characters found.</p>
          )}

          {!loading && !error && characters.length > 0 && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
              gap: '16px',
            }}>
              {characters.map((character) => (
                <CharacterCard key={character.id} character={character} />
              ))}
            </div>
          )}
        </main>
      </div>
    </>
  )
}
