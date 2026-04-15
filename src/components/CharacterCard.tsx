import { useState } from 'react'
import { Character } from '@/lib/types'

interface CharacterCardProps {
  character: Character
}

const PART_COLORS: Record<number, string> = {
  1: '#6b3fa0',
  2: '#2e7d32',
  3: '#1565c0',
  4: '#ad1457',
  5: '#b8860b',
  6: '#00695c',
  7: '#5d4037',
  8: '#bf360c',
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
  const partColor = PART_COLORS[character.part] ?? '#444'
  const showImage = !!character.image_url && !imgError

  return (
    <div
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        overflow: 'hidden',
      }}
    >
      {showImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={character.image_url!}
          alt={character.name}
          onError={() => setImgError(true)}
          style={{
            width: '100%',
            height: '200px',
            objectFit: 'contain',
            objectPosition: 'top',
            display: 'block',
            background: 'var(--bg)',
          }}
        />
      ) : (
        <div
          style={{
            width: '100%',
            height: '200px',
            background: partColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '42px',
            fontWeight: 500,
            color: 'rgba(255,255,255,0.5)',
            letterSpacing: '2px',
          }}
        >
          {initials(character.name)}
        </div>
      )}

      <div style={{ padding: '14px 16px' }}>
        <h3
          style={{
            fontSize: '15px',
            fontWeight: 500,
            color: 'var(--text-primary)',
            marginBottom: '6px',
            lineHeight: 1.4,
          }}
        >
          {character.name}
        </h3>

        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '4px' }}>
          Part {character.part}
        </p>

        {character.stand && (
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '4px' }}>
            Stand: <span style={{ color: 'var(--text-primary)' }}>{character.stand}</span>
          </p>
        )}

        {character.theme_song && (
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            Theme:{' '}
            {character.youtube_url ? (
              <a
                href={character.youtube_url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--text-primary)' }}
              >
                {character.theme_song}
              </a>
            ) : (
              <span style={{ color: 'var(--text-primary)' }}>{character.theme_song}</span>
            )}
          </p>
        )}
      </div>
    </div>
  )
}
