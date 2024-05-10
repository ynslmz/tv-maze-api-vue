import { ShowService } from '@/api/showService'
import type { Show } from '@/types/show.type'
import { defineStore } from 'pinia'

export interface ShowStateModel {
  shows: Show[]
  orderedShows: { [key: string]: Show[] }
  genres: string[]
}

export const useShowStore = defineStore('show', {
  state: (): ShowStateModel => ({
    shows: [],
    orderedShows: {},
    genres: []
  }),
  getters: {
    getShows: (state) => state.orderedShows,
    getGenres: (state) => state.genres,
    getShowsByGenre: (state) => {
      return (genre: string) => {
        return state.orderedShows[genre]
      }
    }
  },
  actions: {
    async fetchShows() {
      const response = await ShowService.getShows()
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
    }
  }
})
