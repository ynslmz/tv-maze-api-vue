import { ref } from 'vue'
import { defineStore } from 'pinia'
import { ShowService } from '@/api/showService'
import { isShow, parseSearchResults, parseShowList } from '@/api/validators'
import type { Show, ShowSearchResult } from '@/types/show.type'
import { SHOWS_PAGE_SIZE } from '@/utils/constValues'

export const useShowStore = defineStore('show', () => {
  const shows = ref<Show[]>([])
  const orderedShows = ref<Record<string, Show[]>>({})
  const genres = ref<string[]>([])
  const show = ref<Show | null>(null)
  const searchResults = ref<ShowSearchResult[]>([])
  const page = ref(1)
  const hasMore = ref(true)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const searchError = ref(false)

  /** Rating-sorted shows for a single genre (empty array when unknown). */
  const showsByGenre = (genre: string) => orderedShows.value[genre] ?? []

  function computeOrderedShows(list: Show[]) {
    const grouped: Record<string, Show[]> = {}
    // Copy before sorting so we never mutate the caller's array in place.
    ;[...list]
      .sort((a, b) => (b.rating?.average || 0) - (a.rating?.average || 0)) // rating descending
      .forEach((item) => {
        item.genres.forEach((genre) => {
          if (!grouped[genre]) grouped[genre] = []
          grouped[genre].push(item)
        })
      })

    orderedShows.value = grouped
    genres.value = Object.keys(grouped).sort() // alphabetical
  }

  async function fetchShows(force = false, pageNumber = 1) {
    if (!force && shows.value.length > 0) return // already loaded
    loading.value = true
    error.value = null
    try {
      const response = await ShowService.getShows(pageNumber)
      const raw = response?.data
      const data = parseShowList(raw)
      shows.value = data
      // A short page means the index is exhausted — used to bound pagination.
      hasMore.value = Array.isArray(raw) && raw.length === SHOWS_PAGE_SIZE
      computeOrderedShows(data)
    } catch {
      error.value = 'Unable to load shows. Please try again.'
    } finally {
      loading.value = false
    }
  }

  async function fetchShowById(id: string) {
    if (show.value?.id && show.value.id.toString() === id) return // already loaded
    loading.value = true
    error.value = null
    try {
      const response = await ShowService.getShowById(id)
      if (!isShow(response?.data)) throw new Error('Invalid show response')
      show.value = response.data
    } catch {
      show.value = null
      error.value = 'Unable to load this show.'
    } finally {
      loading.value = false
    }
  }

  async function searchShows(query: string) {
    searchError.value = false
    try {
      const response = await ShowService.searchShows(query)
      searchResults.value = parseSearchResults(response?.data)
    } catch {
      searchResults.value = []
      searchError.value = true
    }
  }

  function clearSearchResults() {
    searchResults.value = []
  }

  function setPage(pageNumber: number) {
    page.value = pageNumber
    fetchShows(true, pageNumber)
  }

  return {
    shows,
    orderedShows,
    genres,
    show,
    searchResults,
    page,
    hasMore,
    loading,
    error,
    searchError,
    showsByGenre,
    computeOrderedShows,
    fetchShows,
    fetchShowById,
    searchShows,
    clearSearchResults,
    setPage
  }
})
