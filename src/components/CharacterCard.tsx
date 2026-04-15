import { useState } from 'react'
import { Character } from '@/lib/types'

interface CharacterCardProps {
  character: Character
}

const PART_COLORS: Record<number, string> = {
  1: '#7c3aed',
  2: '#b45309',
  3: '#1d4ed8',
  4: '#be185d',
  5: '#a16207',
  6: '#0e7490',
  7: '#92400e',
  8: '#c2410c',
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
  const partNum = String(character.part).padStart(2, '0')

  return (
    <div className="jj-card">
      {/* Per-part color stripe at top */}
      <div style={{ height: '3px', background: partColor }} />

      {/* Image or initials placeholder */}
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
            fontSize: '52px',
            fontWeight: 700,
            color: 'rgba(255,255,255,0.2)',
            letterSpacing: '4px',
          }}
        >
          {initials(character.name)}
        </div>
      )}

      {/* Ghost part number — purely decorative */}
      <span className="jj-card__ghost">{partNum}</span>

      <div className="jj-card__content">
        <h3
          style={{
            fontSize: '15px',
            fontWeight: 600,
            color: 'var(--text-primary)',
            lineHeight: 1.3,
            marginBottom: '6px',
          }}
        >
          {character.name}
        </h3>

        <p
          style={{
            fontSize: '10px',
            fontWeight: 500,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--text-secondary)',
            marginBottom: '10px',
          }}
        >
          Part {partNum}
        </p>

        {character.stand && (
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '4px' }}>
            <span
              style={{
                fontSize: '9px',
                fontWeight: 500,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--accent)',
                marginRight: '7px',
              }}
            >
              Stand
            </span>
            {character.stand}
          </p>
        )}

        {character.theme_song && (
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            <span
              style={{
                fontSize: '9px',
                fontWeight: 500,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--accent)',
                marginRight: '7px',
              }}
            >
              Theme
            </span>
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
    </div>
  )
}
