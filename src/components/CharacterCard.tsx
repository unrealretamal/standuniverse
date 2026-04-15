import { useState } from 'react'
import Image from 'next/image'
import { Character } from '@/lib/types'

interface CharacterCardProps {
  character: Character
}

export default function CharacterCard({ character }: CharacterCardProps) {
  const [imgError, setImgError] = useState(false)

  return (
    <div
      style={{
        border: '1px solid #ccc',
        padding: '16px',
        backgroundColor: '#fff',
      }}
    >
      {character.image_url && !imgError && (
        <div style={{ position: 'relative', width: '100%', height: '200px', marginBottom: '10px' }}>
          <Image
            src={character.image_url}
            alt={character.name}
            fill
            style={{ objectFit: 'contain', objectPosition: 'top' }}
            unoptimized
            onError={() => setImgError(true)}
          />
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
