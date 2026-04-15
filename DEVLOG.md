# standuniverse — Dev Log

JoJo's Bizarre Adventure character browser. Next.js 16 + TypeScript + Supabase + Vercel.

---

## Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 16 (Pages Router, Turbopack) |
| Language | TypeScript |
| Database | Supabase (PostgreSQL) |
| Deployment | Vercel (auto-deploy on push to `main`) |
| Styling | CSS custom properties + inline styles |
| Font | Inter 400 / 500 / 700 (Google Fonts) |

---

## Lo que se construyó

### 1. Setup inicial
- Proyecto Next.js 16 + TypeScript desde cero
- Cliente Supabase en `src/lib/supabase.ts`
- Tabla `characters` en Supabase con columnas: `id`, `name`, `part`, `stand`, `theme_song`, `youtube_url`, `description`, `image_url`, `created_at`
- Seed de **59 personajes** vía `supabase/001_create_characters.sql`
- `vercel.json` con build env vars (Supabase URL + anon key) para que Vercel buildee sin `.env`

### 2. API Route — `/api/characters`
- Fetch desde Supabase con filtro opcional por `?part=N`
- Fallback de imágenes: si `image_url` es null en la DB, se enriquece en runtime desde el mapa estático
- Sin AniList, sin llamadas externas — solo Supabase + datos locales

### 3. Imágenes de personajes

**El problema:** La DB tiene `image_url = null` para todos los personajes (migración pendiente).

**Solución:** `src/data/character-images.ts` — mapa estático `"nombre|parte"` → URL de imagen.

**Lo que se intentó antes (todo falló):**
- `Special:FilePath` de Fandom → filenames incorrectos, CDN bloqueaba hotlinks
- Fandom MediaWiki API (`prop=pageimages`, `prop=images`) → bloqueada en dev, sin matches útiles
- AniList GraphQL API (client-side) → CORS issues
- AniList GraphQL API (server-side) → bloqueado en el entorno de dev

**Solución final:** El usuario proporcionó su propio dataset de `diegoramosretamal.info/experiments/jojo` con **56 personajes** y URLs verificadas de `static.jojowiki.com`. Se mapearon manualmente a los nombres exactos de la DB.

Personajes **sin imagen** (muestran placeholder con iniciales):
`Erina Pendleton`, `Rudol von Stroheim`, `N'Doul`, `Mariah`, `Alessi`, `Aya Tsuji`, `Mikitaka Hazekura`, `Risotto Nero`, `Ghiaccio`, `Mountain Tim`, `Pocoloco`, `Norisuke Higashikata IV`

### 4. Design System v1 — Portfolio style
Primera pasada de diseño, inspirada en el portfolio del usuario (`diegoramosretamal.info`):
- 8 tokens CSS semánticos (`--bg`, `--bg-card`, `--text-primary`, `--text-secondary`, `--border`, `--accent`, `--accent-muted`, `--text-on-accent`)
- Dark mode via `data-theme` attribute en `<html>`
- Toggle oscuro/claro persistido en `localStorage`
- Script anti-FOUC en `_document.tsx` (lee localStorage antes del primer paint)
- Inter 400/500, line-height 1.8, max-width 680px
- Cards con borde, sin sombra

### 5. Design System v2 — Persona 3 / Manga style

Rediseño completo inspirado en menús de videojuegos de manga (Persona 3) y portadas de Shueisha.

**Paleta dark** (default): `#07070d` + cyan `#00e5ff`  
**Paleta light**: papel crema `#f0ede6` + índigo `#5b4cde`

**Cards:**
- Esquina diagonal cortada: `clip-path: polygon(0 0, calc(100% - 18px) 0, 100% 18px, 100% 100%, 0 100%)`
- Franja de color por parte (3px, top)
- Número fantasma grande en el fondo (`76px`, color `var(--border)`)
- Labels en uppercase + letter-spacing
- Hover: borde cyan con 45% opacity

**Filtros:**
- Misma esquina angular cortada
- Números zero-padded: `Part 01`, `Part 02`...
- Active state: fondo `var(--accent)`

**Header:**
- Eyebrow: `// CHARACTER SELECT`
- Título: 52px bold, `letter-spacing: -0.03em`
- Línea decorativa con acento + contador de personajes
- Layout: 880px max-width, grid de 3 columnas

---

## Estructura de archivos relevantes

```
src/
├── components/
│   ├── CharacterCard.tsx    # Card con clip-path, stripe de color, ghost number
│   └── Filter.tsx           # Botones angulares de filtro por parte
├── data/
│   └── character-images.ts  # Mapa estático "nombre|parte" → static.jojowiki.com URL
├── lib/
│   ├── supabase.ts          # Cliente Supabase
│   └── types.ts             # Interface Character + Database types
├── pages/
│   ├── _app.tsx             # Dark mode toggle + globals.css
│   ├── _document.tsx        # Anti-FOUC script
│   ├── index.tsx            # Home — fetch + grid + header
│   └── api/
│       └── characters.ts    # GET /api/characters — Supabase + image enrichment
└── styles/
    └── globals.css          # Tokens CSS + clases .jj-card, .jj-btn, .jj-toggle, etc.

supabase/
├── 001_create_characters.sql  # Schema + seed de 59 personajes
└── 002_add_image_urls.sql     # ALTER + UPDATE (pendiente de ejecutar en Supabase)
```

---

## Pendiente

- [ ] Ejecutar `supabase/002_add_image_urls.sql` en Supabase para persistir las URLs en la DB (actualmente se enriquecen en runtime desde el mapa estático)
- [ ] Personajes sin imagen: buscar URLs para los 12 restantes
- [ ] Migración de `image_url` actualizada con URLs de `static.jojowiki.com` en lugar de Fandom
