export interface Character {
  id: number
  name: string
  part: number
  stand: string | null
  theme_song: string | null
  youtube_url: string | null
  description: string | null
  image_url: string | null
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
