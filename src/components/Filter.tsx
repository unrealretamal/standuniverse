interface FilterProps {
  selectedPart: number | null
  onPartChange: (part: number | null) => void
}

const PARTS = [
  { part: 1, symbol: '✦', title: 'Phantom Blood' },
  { part: 2, symbol: '◆', title: 'Battle Tendency' },
  { part: 3, symbol: '★', title: 'Stardust Crusaders' },
  { part: 4, symbol: '♦', title: 'Diamond is Unbreakable' },
  { part: 5, symbol: '⚜', title: 'Golden Wind' },
  { part: 6, symbol: '✶', title: 'Stone Ocean' },
  { part: 7, symbol: '✪', title: 'Steel Ball Run' },
  { part: 8, symbol: '❋', title: 'JoJolion' },
  { part: 9, symbol: '✵', title: 'The JOJOLands' },
]

export default function Filter({ selectedPart, onPartChange }: FilterProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      <button
        onClick={() => onPartChange(null)}
        title="All parts"
        style={{
          padding: '6px 14px',
          fontSize: '13px',
          fontWeight: 600,
          borderRadius: '6px',
          border: '1px solid',
          cursor: 'pointer',
          transition: 'all 0.15s',
          backgroundColor: selectedPart === null ? '#111' : '#fff',
          color: selectedPart === null ? '#fff' : '#111',
          borderColor: selectedPart === null ? '#111' : '#d1d5db',
        }}
      >
        All
      </button>

      {PARTS.map(({ part, symbol, title }) => (
        <button
          key={part}
          onClick={() => onPartChange(part)}
          title={title}
          style={{
            padding: '6px 14px',
            fontSize: '13px',
            fontWeight: 600,
            borderRadius: '6px',
            border: '1px solid',
            cursor: 'pointer',
            transition: 'all 0.15s',
            backgroundColor: selectedPart === part ? '#111' : '#fff',
            color: selectedPart === part ? '#fff' : '#111',
            borderColor: selectedPart === part ? '#111' : '#d1d5db',
          }}
        >
          {symbol} {part}
        </button>
      ))}
    </div>
  )
}
