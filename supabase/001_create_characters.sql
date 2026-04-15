-- Create characters table for JoJo's Bizarre Adventure characters
CREATE TABLE IF NOT EXISTS characters (
  id          BIGINT    PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name        TEXT      NOT NULL,
  part        INT       NOT NULL,
  stand       TEXT,
  theme_song  TEXT,
  youtube_url TEXT,
  description TEXT,
  created_at  TIMESTAMP DEFAULT NOW()
);

-- Index for filtering by part number
CREATE INDEX IF NOT EXISTS idx_characters_part ON characters (part);

-- Enable Row Level Security
ALTER TABLE characters ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Public read access"
  ON characters
  FOR SELECT
  USING (true);
