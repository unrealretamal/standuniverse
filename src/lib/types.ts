export interface Character {
  id: number
  name: string
  part: number
  stand: string | null
  theme_song: string
  youtube_url: string
  description: string
  created_at: string
}

export type Database = {
  public: {
    Tables: {
      characters: {
        Row: Character
        Insert: Omit<Character, 'id' | 'created_at'>
        Update: Partial<Omit<Character, 'id' | 'created_at'>>
      }
    }
  }
}
