/**
 * Formats a show's average rating for display as a badge, e.g. `8.4 ⭐️`.
 * Returns an empty string when the rating is missing so callers can hide the
 * badge with a simple truthiness check.
 */
export function formatRating(average: number | null | undefined): string {
  return average != null ? `${average.toFixed(1)} ⭐️` : ''
}
