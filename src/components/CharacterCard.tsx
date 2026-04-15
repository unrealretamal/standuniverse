import { Character } from '@/lib/types'

interface CharacterCardProps {
  character: Character
}

const PART_SYMBOLS: Record<number, string> = {
  1: '✦', 2: '◆', 3: '★', 4: '♦',
  5: '⚜', 6: '✶', 7: '✪', 8: '❋', 9: '✵',
}

export default function CharacterCard({ character }: CharacterCardProps) {
  const symbol = PART_SYMBOLS[character.part] ?? '•'

  return (
    <div
      style={{
        border: '1px solid #e5e7eb',
        borderRadius: '10px',
        padding: '16px',
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        transition: 'box-shadow 0.15s',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)')}
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'none')}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '11px', fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Part {character.part}
        </span>
        <span style={{ fontSize: '16px' }} title={`Part ${character.part}`}>{symbol}</span>
      </div>

      <h2 style={{ fontSize: '15px', fontWeight: 700, color: '#111827', margin: 0 }}>
        {character.name}
      </h2>

      {character.stand && (
        <p style={{ fontSize: '13px', color: '#7c3aed', margin: 0 }}>
          Stand: <em>{character.stand}</em>
        </p>
      )}

      {character.description && (
        <p style={{
          fontSize: '12px', color: '#6b7280', lineHeight: '1.5', margin: 0,
          display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>
          {character.description}
        </p>
      )}

      {character.theme_song && (
        <p style={{ fontSize: '12px', color: '#9ca3af', margin: 0 }}>
          ♪ {character.theme_song}
        </p>
      )}

      {character.youtube_url && (
        <a
          href={character.youtube_url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            marginTop: '4px',
            fontSize: '12px',
            fontWeight: 600,
            color: '#dc2626',
            textDecoration: 'none',
          }}
        >
          ▶ Watch on YouTube
        </a>
      )}
    </div>
  )
}
