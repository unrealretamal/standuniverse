import { Character } from '@/lib/types'

interface CharacterCardProps {
  character: Character
}

export default function CharacterCard({ character }: CharacterCardProps) {
  return (
    <div
      style={{
        border: '1px solid #ccc',
        padding: '16px',
        backgroundColor: '#fff',
      }}
    >
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
