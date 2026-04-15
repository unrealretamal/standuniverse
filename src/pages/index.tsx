import { useState, useMemo } from 'react';
import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import { supabase } from '@/lib/supabase';
import { Character } from '@/lib/types';
import Navbar from '@/components/Navbar';
import CharacterCard from '@/components/CharacterCard';
import Filter from '@/components/Filter';

interface HomeProps {
  characters: Character[];
}

export default function Home({ characters }: HomeProps) {
  const [selectedPart, setSelectedPart] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = useMemo(() => {
    return characters.filter((c) => {
      const matchesPart = selectedPart === null || c.part === selectedPart;
      const matchesSearch =
        searchQuery === '' ||
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (c.stand?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
      return matchesPart && matchesSearch;
    });
  }, [characters, selectedPart, searchQuery]);

  return (
    <>
      <Head>
        <title>JoJo Universe - Characters</title>
        <meta name="description" content="Explore JoJo's Bizarre Adventure characters" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-yellow-50">
        <Navbar />

        <main className="max-w-7xl mx-auto px-4 py-8">
          <div className="mb-6">
            <h1 className="text-4xl font-black uppercase tracking-widest text-black">
              Characters
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              {filtered.length} of {characters.length} characters
            </p>
          </div>

          <Filter
            selectedPart={selectedPart}
            onPartChange={setSelectedPart}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />

          {filtered.length === 0 ? (
            <p className="text-center text-gray-500 py-16 text-lg font-medium">
              No characters found.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {filtered.map((character) => (
                <CharacterCard key={character.id} character={character} />
              ))}
            </div>
          )}
        </main>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data, error } = await supabase
    .from('characters')
    .select('*')
    .order('part', { ascending: true })
    .order('name', { ascending: true });

  if (error) {
    console.error('Supabase fetch error:', error.message);
    return { props: { characters: [] } };
  }

  return { props: { characters: data ?? [] } };
};
