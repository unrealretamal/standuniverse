import { Character } from '@/lib/types';

interface CharacterCardProps {
  character: Character;
}

export default function CharacterCard({ character }: CharacterCardProps) {
  return (
    <div className="bg-white border-2 border-black rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-150 overflow-hidden">
      <div className="bg-gradient-to-r from-yellow-400 to-purple-600 p-3 border-b-2 border-black">
        <span className="text-xs font-black uppercase tracking-widest text-black bg-white px-2 py-0.5 rounded border border-black">
          Part {character.part}
        </span>
      </div>

      <div className="p-4">
        <h2 className="text-lg font-black uppercase tracking-wide text-black mb-1">
          {character.name}
        </h2>

        {character.stand && (
          <p className="text-sm font-bold text-purple-700 mb-2">
            Stand: <span className="italic">{character.stand}</span>
          </p>
        )}

        {character.description && (
          <p className="text-sm text-gray-700 leading-relaxed mb-3 line-clamp-3">
            {character.description}
          </p>
        )}

        {character.theme_song && (
          <p className="text-xs text-gray-500 mb-2">
            Theme: <span className="font-semibold">{character.theme_song}</span>
          </p>
        )}

        {character.youtube_url && (
          <a
            href={character.youtube_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-1 text-xs font-bold text-white bg-red-600 hover:bg-red-700 px-3 py-1 rounded border border-black transition-colors"
          >
            ▶ Theme Song
          </a>
        )}
      </div>
    </div>
  );
}
