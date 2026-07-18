import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import type { Show } from '@/types/show.type'
import { getMockShow } from '@/utils/test-data.mock'
import { SHOWS_PAGE_SIZE } from '@/utils/constValues'

// Mock the API layer so the store can be tested in isolation.
vi.mock('@/api/showService', () => ({
  ShowService: {
    getShows: vi.fn(),
    getShowById: vi.fn(),
    searchShows: vi.fn()
  }
}))

import { ShowService } from '@/api/showService'
import { useShowStore } from './show'

/** Build a deterministic show with explicit genres and rating. */
function makeShow(id: number, genres: string[], average: number | null): Show {
  return { ...getMockShow(id), genres, rating: { average } }
}

describe('useShowStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  describe('computeOrderedShows', () => {
    it('groups shows by genre', () => {
      const store = useShowStore()
      const shows = [makeShow(1, ['Drama'], 8), makeShow(2, ['Comedy'], 7)]

      store.computeOrderedShows(shows)

      expect(Object.keys(store.orderedShows).sort()).toEqual(['Comedy', 'Drama'])
      expect(store.orderedShows['Drama'].map((s) => s.id)).toEqual([1])
      expect(store.orderedShows['Comedy'].map((s) => s.id)).toEqual([2])
    })

    it('sorts shows within a genre by rating descending', () => {
      const store = useShowStore()
      const shows = [
        makeShow(1, ['Drama'], 6.5),
        makeShow(2, ['Drama'], 9.1),
        makeShow(3, ['Drama'], 7.8)
      ]

      store.computeOrderedShows(shows)

      expect(store.orderedShows['Drama'].map((s) => s.id)).toEqual([2, 3, 1])
    })

    it('places a multi-genre show in every one of its genres', () => {
      const store = useShowStore()
      const shows = [makeShow(1, ['Drama', 'Comedy'], 8)]

      store.computeOrderedShows(shows)

      expect(store.orderedShows['Drama'].map((s) => s.id)).toEqual([1])
      expect(store.orderedShows['Comedy'].map((s) => s.id)).toEqual([1])
    })

    it('treats a null rating as lowest', () => {
      const store = useShowStore()
      const shows = [
        makeShow(1, ['Drama'], null),
        makeShow(2, ['Drama'], 5),
        makeShow(3, ['Drama'], null)
      ]

      store.computeOrderedShows(shows)

      // The rated show comes first; null-rated shows sink to the bottom.
      expect(store.orderedShows['Drama'][0].id).toBe(2)
      expect(
        store.orderedShows['Drama']
          .map((s) => s.id)
          .slice(1)
          .sort()
      ).toEqual([1, 3])
    })

    it('does not mutate the input array', () => {
      const store = useShowStore()
      const shows = [makeShow(1, ['Drama'], 6), makeShow(2, ['Drama'], 9)]
      const originalOrder = shows.map((s) => s.id)

      store.computeOrderedShows(shows)

      expect(shows.map((s) => s.id)).toEqual(originalOrder)
    })

    it('exposes genres sorted alphabetically', () => {
      const store = useShowStore()
      const shows = [
        makeShow(1, ['Sports'], 8),
        makeShow(2, ['Comedy'], 7),
        makeShow(3, ['Drama'], 9)
      ]

      store.computeOrderedShows(shows)

      expect(store.genres).toEqual(['Comedy', 'Drama', 'Sports'])
    })
  })

  describe('fetchShows', () => {
    it('fetches and computes ordered shows on first call', async () => {
      const store = useShowStore()
      const data = [makeShow(1, ['Drama'], 8)]
      vi.mocked(ShowService.getShows).mockResolvedValue({ data } as never)

      await store.fetchShows()

      expect(ShowService.getShows).toHaveBeenCalledTimes(1)
      expect(store.shows).toHaveLength(1)
      expect(store.orderedShows['Drama']).toBeDefined()
    })

    it('does not refetch when shows are already loaded (cache guard)', async () => {
      const store = useShowStore()
      const data = [makeShow(1, ['Drama'], 8)]
      vi.mocked(ShowService.getShows).mockResolvedValue({ data } as never)

      await store.fetchShows()
      await store.fetchShows()

      expect(ShowService.getShows).toHaveBeenCalledTimes(1)
    })

    it('sets hasMore to false when a short (final) page is returned', async () => {
      const store = useShowStore()
      vi.mocked(ShowService.getShows).mockResolvedValue({
        data: [makeShow(1, ['Drama'], 8)]
      } as never)

      await store.fetchShows()

      expect(store.hasMore).toBe(false)
    })

    it('sets hasMore to true when a full page is returned', async () => {
      const store = useShowStore()
      const fullPage = Array.from({ length: SHOWS_PAGE_SIZE }, (_, i) =>
        makeShow(i + 1, ['Drama'], 8)
      )
      vi.mocked(ShowService.getShows).mockResolvedValue({ data: fullPage } as never)

      await store.fetchShows()

      expect(store.hasMore).toBe(true)
    })

    it('sets an error message when the request fails', async () => {
      const store = useShowStore()
      vi.mocked(ShowService.getShows).mockRejectedValue(new Error('network'))

      await store.fetchShows()

      expect(store.error).toBeTruthy()
      expect(store.loading).toBe(false)
    })

    it('refetches when force is true', async () => {
      const store = useShowStore()
      const data = [makeShow(1, ['Drama'], 8)]
      vi.mocked(ShowService.getShows).mockResolvedValue({ data } as never)

      await store.fetchShows()
      await store.fetchShows(true, 2)

      expect(ShowService.getShows).toHaveBeenCalledTimes(2)
      expect(ShowService.getShows).toHaveBeenLastCalledWith(2)
    })
  })

  describe('fetchShowById', () => {
    it('fetches a show by id', async () => {
      const store = useShowStore()
      const show = makeShow(42, ['Drama'], 8)
      vi.mocked(ShowService.getShowById).mockResolvedValue({ data: show } as never)

      await store.fetchShowById('42')

      expect(ShowService.getShowById).toHaveBeenCalledWith('42')
      expect(store.show?.id).toBe(42)
    })

    it('does not refetch when the same show is already loaded (cache guard)', async () => {
      const store = useShowStore()
      const show = makeShow(42, ['Drama'], 8)
      vi.mocked(ShowService.getShowById).mockResolvedValue({ data: show } as never)

      await store.fetchShowById('42')
      await store.fetchShowById('42')

      expect(ShowService.getShowById).toHaveBeenCalledTimes(1)
    })
  })

  describe('search', () => {
    it('stores search results', async () => {
      const store = useShowStore()
      const results = [{ show: makeShow(1, ['Drama'], 8), score: 0.9 }]
      vi.mocked(ShowService.searchShows).mockResolvedValue({ data: results } as never)

      await store.searchShows('stargate')

      expect(ShowService.searchShows).toHaveBeenCalledWith('stargate')
      expect(store.searchResults).toHaveLength(1)
    })

    it('flags a search error and clears results on failure', async () => {
      const store = useShowStore()
      vi.mocked(ShowService.searchShows).mockRejectedValue(new Error('network'))

      await store.searchShows('stargate')

      expect(store.searchError).toBe(true)
      expect(store.searchResults).toEqual([])
    })

    it('clears search results', async () => {
      const store = useShowStore()
      const results = [{ show: makeShow(1, ['Drama'], 8), score: 0.9 }]
      vi.mocked(ShowService.searchShows).mockResolvedValue({ data: results } as never)

      await store.searchShows('stargate')
      store.clearSearchResults()

      expect(store.searchResults).toEqual([])
    })
  })

  describe('setPage', () => {
    it('updates the page and triggers a forced fetch', async () => {
      const store = useShowStore()
      vi.mocked(ShowService.getShows).mockResolvedValue({ data: [] } as never)

      store.setPage(3)

      expect(store.page).toBe(3)
      expect(ShowService.getShows).toHaveBeenCalledWith(3)
    })
  })
})
