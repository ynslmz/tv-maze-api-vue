import DOMPurify from 'dompurify'

/**
 * Sanitizes API-supplied HTML (e.g. a show's `summary`) before it is rendered
 * with `v-html`. TVMaze returns HTML we do not control, so this removes any
 * scripts, event handlers or unsafe markup to prevent XSS.
 */
export function sanitizeHtml(html: string | null | undefined): string {
  if (!html) return ''
  return DOMPurify.sanitize(html)
}
