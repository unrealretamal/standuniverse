interface FilterProps {
  selectedPart: string
  onPartChange: (part: string) => void
}

const PARTS = ['all', '1', '2', '3', '4', '5', '6', '7', '8']

export default function Filter({ selectedPart, onPartChange }: FilterProps) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
      {PARTS.map((part) => {
        const active = selectedPart === part
        return (
          <button
            key={part}
            onClick={() => onPartChange(part)}
            style={{
              padding: '5px 14px',
              fontSize: '13px',
              fontWeight: active ? 500 : 400,
              border: '1px solid var(--border)',
              background: active ? 'var(--accent)' : 'transparent',
              color: active ? 'var(--text-on-accent)' : 'var(--text-secondary)',
              cursor: 'pointer',
            }}
          >
            {part === 'all' ? 'All' : `Part ${part}`}
          </button>
        )
      })}
    </div>
  )
}
