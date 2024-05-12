import Api from './apiService'
export const ShowService = {
  getShows(page: number) {
    return Api.get('/shows' + (page !== 1 ? `?page=${page}` : ''))
  },
  getShowById(id: string) {
    return Api.get(`/shows/${id}?embed[]=cast&embed[]=episodes`)
  },
  searchShows(query: string) {
    return Api.get(`/search/shows?q=${query}`)
  }
}
