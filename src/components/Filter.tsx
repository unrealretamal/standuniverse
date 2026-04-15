interface FilterProps {
  selectedPart: string
  onPartChange: (part: string) => void
}

const PARTS = ['all', '1', '2', '3', '4', '5', '6', '7', '8', '9']

export default function Filter({ selectedPart, onPartChange }: FilterProps) {
  return (
    <div style={{ marginBottom: '16px' }}>
      {PARTS.map((part) => (
        <button
          key={part}
          onClick={() => onPartChange(part)}
          style={{
            marginRight: '8px',
            marginBottom: '8px',
            padding: '5px 12px',
            fontSize: '13px',
            border: '1px solid #333',
            cursor: 'pointer',
            backgroundColor: selectedPart === part ? '#333' : '#fff',
            color: selectedPart === part ? '#fff' : '#333',
          }}
        >
          {part === 'all' ? 'All' : `Part ${part}`}
        </button>
      ))}
    </div>
  )
}
