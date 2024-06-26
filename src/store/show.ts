import { ShowService } from '@/api/showService'
import type { Show, ShowSearchResult } from '@/types/show.type'
import { defineStore } from 'pinia'

export interface ShowStateModel {
  shows: Show[]
  orderedShows: { [key: string]: Show[] }
  genres: string[]
  show: Show | null
  searchResults: ShowSearchResult[]
  page: number
}

export const useShowStore = defineStore('show', {
  state: (): ShowStateModel => ({
    shows: [],
    orderedShows: {},
    genres: [],
    show: null,
    searchResults: [],
    page: 1
  }),
  getters: {
    getShows: (state) => state.orderedShows,
    getGenres: (state) => state.genres,
    getShowsByGenre: (state) => {
      return (genre: string) => {
        return state.orderedShows[genre]
      }
    },
    getShowDetail: (state) => state.show,
    getSearchResults: (state) => state.searchResults,
    getPage: (state) => state.page
  },
  actions: {
    async fetchShows(force = false, page = 1) {
      if (!force && this.shows.length > 0) return // if shows are already fetched, return
      const response = await ShowService.getShows(page)
      if (response?.data) {
        this.shows = response.data
        this.computeOrderedShows(response.data)
      }
    },
    computeOrderedShows(shows: Show[]) {
      const orderedShows: { [key: string]: Show[] } = {}
      shows
        .sort((a, b) => (b.rating.average || 0) - (a.rating.average || 0)) /// sort by rating descending
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
      const response = await ShowService.getShowById(id)
      if (response?.data) {
        this.show = response.data as Show
      }
    },
    async searchShows(query: string) {
      const response = await ShowService.searchShows(query)
      if (response?.data) {
        this.searchResults = response.data
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
