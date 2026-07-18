import type { Show, ShowSearchResult } from '@/types/show.type'

/**
 * Lightweight runtime guards for TVMaze responses. The API is untyped over the
 * wire, so we verify the shape at the boundary instead of blindly asserting
 * `as Show`. Malformed entries are dropped (lists) or rejected (single show)
 * rather than propagating `undefined` into the UI.
 */
export function isShow(value: unknown): value is Show {
  if (!value || typeof value !== 'object') return false
  const show = value as Record<string, unknown>
  return (
    typeof show.id === 'number' &&
    typeof show.name === 'string' &&
    Array.isArray(show.genres) &&
    typeof show.rating === 'object' &&
    show.rating !== null
  )
}

export function parseShowList(data: unknown): Show[] {
  if (!Array.isArray(data)) return []
  return data.filter(isShow)
}

export function parseSearchResults(data: unknown): ShowSearchResult[] {
  if (!Array.isArray(data)) return []
  return data.filter(
    (entry): entry is ShowSearchResult =>
      !!entry && typeof entry === 'object' && isShow((entry as ShowSearchResult).show)
  )
}
