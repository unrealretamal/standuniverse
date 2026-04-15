interface FilterProps {
  selectedPart: string
  onPartChange: (part: string) => void
}

const PARTS = ['all', '1', '2', '3', '4', '5', '6', '7', '8']

export default function Filter({ selectedPart, onPartChange }: FilterProps) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '32px' }}>
      {PARTS.map((part) => (
        <button
          key={part}
          onClick={() => onPartChange(part)}
          className={`jj-btn${selectedPart === part ? ' jj-btn--active' : ''}`}
        >
          {part === 'all' ? 'All Parts' : `Part ${part.padStart(2, '0')}`}
        </button>
      ))}
    </div>
  )
}
