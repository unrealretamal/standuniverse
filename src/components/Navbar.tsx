import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-yellow-400 border-b-4 border-black shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-2xl font-black tracking-widest text-black uppercase hover:text-purple-800 transition-colors">
          JoJo Universe
        </Link>
        <div className="flex gap-6 text-sm font-bold uppercase tracking-wide">
          <Link href="/" className="text-black hover:text-purple-800 transition-colors">
            Characters
          </Link>
        </div>
      </div>
    </nav>
  );
}
