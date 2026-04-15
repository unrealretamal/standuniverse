import { useState } from 'react'
import Image from 'next/image'
import { Character } from '@/lib/types'

interface CharacterCardProps {
  character: Character
}

const PART_COLORS: Record<number, string> = {
  1: '#6b3fa0',
  2: '#2e7d32',
  3: '#1565c0',
  4: '#ad1457',
  5: '#f9a825',
  6: '#00838f',
  7: '#6d4c41',
  8: '#e65100',
}

function initials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
}

export default function CharacterCard({ character }: CharacterCardProps) {
  const [imgError, setImgError] = useState(false)
  const color = PART_COLORS[character.part] ?? '#333'
  const showImage = character.image_url && !imgError

  return (
    <div style={{ border: '1px solid #ccc', padding: '16px', backgroundColor: '#fff' }}>
      {showImage ? (
        <div style={{ position: 'relative', width: '100%', height: '200px', marginBottom: '10px' }}>
          <Image
            src={character.image_url!}
            alt={character.name}
            fill
            style={{ objectFit: 'contain', objectPosition: 'top' }}
            unoptimized
            onError={() => setImgError(true)}
          />
        </div>
      ) : (
        <div
          style={{
            width: '100%',
            height: '200px',
            marginBottom: '10px',
            backgroundColor: color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '48px',
            fontWeight: 'bold',
            color: 'rgba(255,255,255,0.6)',
            letterSpacing: '2px',
          }}
        >
          {initials(character.name)}
        </div>
      )}

      <h3 style={{ margin: '0 0 8px 0', fontSize: '15px' }}>{character.name}</h3>

      <p style={{ margin: '0 0 4px 0', fontSize: '13px', color: '#555' }}>
        Part: {character.part}
      </p>

      {character.stand && (
        <p style={{ margin: '0 0 4px 0', fontSize: '13px' }}>
          Stand: {character.stand}
        </p>
      )}

      {character.theme_song && (
        <p style={{ margin: '0 0 4px 0', fontSize: '13px' }}>
          Theme:{' '}
          {character.youtube_url ? (
            <a href={character.youtube_url} target="_blank" rel="noopener noreferrer">
              {character.theme_song}
            </a>
          ) : (
            character.theme_song
          )}
        </p>
      )}
    </div>
  )
}
