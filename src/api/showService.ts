import Api from './apiService'
export const ShowService = {
  getShows() {
    return Api.get('/shows')
  },
  getShowById(id: string) {
    return Api.get(`/shows/${id}?embed[]=cast&embed[]=episodes`)
  }
}
