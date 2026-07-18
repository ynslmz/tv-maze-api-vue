import { ShowService } from '@/api/showService'
import { isShow, parseSearchResults, parseShowList } from '@/api/validators'
import type { Show, ShowSearchResult } from '@/types/show.type'
import { SHOWS_PAGE_SIZE } from '@/utils/constValues'
import { defineStore } from 'pinia'

export interface ShowStateModel {
  shows: Show[]
  orderedShows: { [key: string]: Show[] }
  genres: string[]
  show: Show | null
  searchResults: ShowSearchResult[]
  page: number
  hasMore: boolean
  loading: boolean
  error: string | null
  searchError: boolean
}

export const useShowStore = defineStore('show', {
  state: (): ShowStateModel => ({
    shows: [],
    orderedShows: {},
    genres: [],
    show: null,
    searchResults: [],
    page: 1,
    hasMore: true,
    loading: false,
    error: null,
    searchError: false
  }),
  getters: {
    getShows: (state) => state.orderedShows,
    getGenres: (state) => state.genres,
    getShowsByGenre: (state) => {
      return (genre: string) => {
        return state.orderedShows[genre] ?? []
      }
    },
    getShowDetail: (state) => state.show,
    getSearchResults: (state) => state.searchResults,
    getPage: (state) => state.page,
    getHasMore: (state) => state.hasMore,
    getLoading: (state) => state.loading,
    getError: (state) => state.error,
    getSearchError: (state) => state.searchError
  },
  actions: {
    async fetchShows(force = false, page = 1) {
      if (!force && this.shows.length > 0) return // if shows are already fetched, return
      this.loading = true
      this.error = null
      try {
        const response = await ShowService.getShows(page)
        const raw = response?.data
        const data = parseShowList(raw)
        this.shows = data
        // A short page means the index is exhausted — used to bound pagination.
        this.hasMore = Array.isArray(raw) && raw.length === SHOWS_PAGE_SIZE
        this.computeOrderedShows(data)
      } catch {
        this.error = 'Unable to load shows. Please try again.'
      } finally {
        this.loading = false
      }
    },
    computeOrderedShows(shows: Show[]) {
      const orderedShows: { [key: string]: Show[] } = {}
      // Copy before sorting so we never mutate the caller's array in place.
      ;[...shows]
        .sort((a, b) => (b.rating?.average || 0) - (a.rating?.average || 0)) /// sort by rating descending
        .forEach((show) => {
          show.genres.forEach((genre) => {
            // create genre arrays for
            if (!orderedShows[genre]) {
              orderedShows[genre] = []
            }
            orderedShows[genre].push(show)
          })
        })

      this.orderedShows = orderedShows
      this.genres = Object.keys(orderedShows).sort() /// sort genres alphabetically
    },
    async fetchShowById(id: string) {
      if (!!this.show?.id && this.show.id.toString() === id) return // if show is already fetched, return
      this.error = null
      try {
        const response = await ShowService.getShowById(id)
        if (!isShow(response?.data)) throw new Error('Invalid show response')
        this.show = response.data
      } catch {
        this.show = null
        this.error = 'Unable to load this show.'
      }
    },
    async searchShows(query: string) {
      this.searchError = false
      try {
        const response = await ShowService.searchShows(query)
        this.searchResults = parseSearchResults(response?.data)
      } catch {
        this.searchResults = []
        this.searchError = true
      }
    },
    clearSearchResults() {
      this.searchResults = []
    },
    setPage(page: number) {
      this.page = page
      this.fetchShows(true, page)
    }
  }
})
