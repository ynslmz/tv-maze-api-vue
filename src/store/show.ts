import { ShowService } from '@/api/showService'
import { defineStore } from 'pinia'

export const useShowStore = defineStore('show', {
  state: () => ({
    shows: []
  }),
  getters: {
    getShows(state) {
      return state.shows
    }
  },
  actions: {
    async fetchShows() {
      const response = await ShowService.getShows()
      if (response!.data) {
        this.shows = response!.data
      }
    }
  }
})
