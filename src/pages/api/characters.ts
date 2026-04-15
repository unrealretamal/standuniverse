import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '@/lib/supabase'
import { getImageUrl } from '@/data/character-images'
import type { Character } from '@/lib/types'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { part } = req.query

  let query = supabase.from('characters').select('*')

  if (part && part !== 'all') {
    query = query.eq('part', parseInt(part as string))
  }

  const { data, error } = await query

  if (error) {
    return res.status(500).json({ error: error.message })
  }

  const rows = (data ?? []) as Character[]
  const enriched = rows.map((c) => ({
    ...c,
    image_url: c.image_url ?? getImageUrl(c.name, c.part),
  }))

  res.status(200).json(enriched)
}
