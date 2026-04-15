interface SpotifyProps {
  trackUrl: string
  compact?: boolean
}

/**
 * Embeds a Spotify track player.
 * trackUrl should be the full Spotify track URL:
 *   e.g. https://open.spotify.com/track/4uLU6hMCjMI75M1A2tKUQC
 */
export default function Spotify({ trackUrl, compact = true }: SpotifyProps) {
  // Extract track ID from various Spotify URL formats
  const match = trackUrl.match(/track\/([A-Za-z0-9]+)/)
  if (!match) return null

  const trackId = match[1]
  const embedUrl = `https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=0`

  return (
    <iframe
      src={embedUrl}
      width="100%"
      height={compact ? 80 : 352}
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
      className="rounded-xl border-0"
    />
  )
}
