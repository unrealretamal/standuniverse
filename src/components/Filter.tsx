interface FilterProps {
  selectedPart: number | null;
  onPartChange: (part: number | null) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const PARTS = [1, 2, 3, 4, 5, 6, 7, 8];

export default function Filter({
  selectedPart,
  onPartChange,
  searchQuery,
  onSearchChange,
}: FilterProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center mb-8">
      <input
        type="text"
        placeholder="Search characters..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="border-2 border-black rounded px-3 py-2 text-sm font-medium shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:outline-none focus:ring-2 focus:ring-yellow-400 w-full sm:w-64"
      />

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onPartChange(null)}
          className={`px-3 py-1.5 text-xs font-black uppercase border-2 border-black rounded transition-all ${
            selectedPart === null
              ? 'bg-yellow-400 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
              : 'bg-white hover:bg-yellow-100'
          }`}
        >
          All
        </button>
        {PARTS.map((part) => (
          <button
            key={part}
            onClick={() => onPartChange(part)}
            className={`px-3 py-1.5 text-xs font-black uppercase border-2 border-black rounded transition-all ${
              selectedPart === part
                ? 'bg-purple-500 text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                : 'bg-white hover:bg-purple-100'
            }`}
          >
            Part {part}
          </button>
        ))}
      </div>
    </div>
  );
}
