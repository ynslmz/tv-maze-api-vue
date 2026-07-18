// Self-contained SVG placeholder — no external host, so it can never 404 or log
// a network error (the previous via.placeholder.com domain is defunct).
export const noImageUrl =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='210' height='295'%3E%3Crect width='100%25' height='100%25' fill='%23d2d2d2'/%3E%3Ctext x='50%25' y='50%25' fill='%23666' font-family='sans-serif' font-size='16' text-anchor='middle' dominant-baseline='middle'%3ENo image%3C/text%3E%3C/svg%3E"

/** Number of shows the TVMaze "Show index" endpoint returns per page. */
export const SHOWS_PAGE_SIZE = 250
