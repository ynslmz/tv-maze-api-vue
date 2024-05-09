import Api from './apiService'
export const ShowService = {
  getShows() {
    return Api.get('/shows')
  }
}
