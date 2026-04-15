import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase';
import { Character } from '@/lib/types';

type ApiResponse =
  | { characters: Character[] }
  | { error: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { part, search } = req.query;

  let query = supabase
    .from('characters')
    .select('*')
    .order('part', { ascending: true })
    .order('name', { ascending: true });

  if (part && !Array.isArray(part)) {
    query = query.eq('part', parseInt(part, 10));
  }

  if (search && !Array.isArray(search)) {
    query = query.ilike('name', `%${search}%`);
  }

  const { data, error } = await query;

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(200).json({ characters: data ?? [] });
}
