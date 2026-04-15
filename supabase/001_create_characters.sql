-- Create characters table for JoJo's Bizarre Adventure characters
CREATE TABLE IF NOT EXISTS characters (
  id          BIGSERIAL    PRIMARY KEY,
  name        VARCHAR(255) NOT NULL,
  part        INT          NOT NULL,
  stand       VARCHAR(255),
  theme_song  VARCHAR(255) NOT NULL DEFAULT '',
  youtube_url TEXT         NOT NULL DEFAULT '',
  description TEXT         NOT NULL DEFAULT '',
  created_at  TIMESTAMP    DEFAULT NOW()
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
