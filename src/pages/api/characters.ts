import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '@/lib/supabase'

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

  res.status(200).json(data)
}
